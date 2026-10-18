import triagemConfig from '@/config/triagem.json';
import type { OrcamentoApiPayload, SolucaoInteresse } from './orcamento-schema';
import { preDimensionarMotores, somaCvInstalacao, type PreDimensionamentoMotor } from './orcamento-dimensionamento';

export type ResultadoTriagem = 'A' | 'B' | 'C' | 'D';

export interface TriagemOutput {
  resultado: ResultadoTriagem;
  motivos: string[];
  dadosFaltantes: string[];
  preDimensionamentoCfw?: PreDimensionamentoMotor[];
  /** true quando havia motor fora da faixa atendida, mas o pedido seguiu só pelo BESS. */
  bombeamentoExcluido?: boolean;
  /** Derivado dos dados (nunca perguntado ao cliente) — só para registro interno e webhook. */
  solucaoInteresse: SolucaoInteresse;
}

interface FaixaCfw {
  uf: string;
  cv_minimo: number;
  inclusivo: boolean;
}

interface TriagemConfig {
  faixas_cfw: FaixaCfw[];
  distancia_reator_m: number;
  distancia_maxima_sem_visita_m: number;
  horas_dia_alerta_cfw: number;
  cv_maximo_resposta_automatica: number | null;
}

const config = triagemConfig as unknown as TriagemConfig;

function faixaParaUf(uf: string): FaixaCfw {
  return config.faixas_cfw.find((f) => f.uf === uf) ?? config.faixas_cfw.find((f) => f.uf === 'OUTRAS')!;
}

function qualificaCv(somaCv: number, faixa: FaixaCfw): boolean {
  return faixa.inclusivo ? somaCv >= faixa.cv_minimo : somaCv > faixa.cv_minimo;
}

function derivarSolucao(viaCfw: boolean, viaBess: boolean): SolucaoInteresse {
  if (viaCfw && viaBess) return 'ambas';
  return viaCfw ? 'cfw' : 'bess';
}

/**
 * Avalia o pedido e devolve um dos quatro resultados da seção 8 do prompt de
 * redesign. Pura e determinística — sem chamadas externas, sem preço, sem
 * promessa de economia/autonomia. Os limites (distância, CV máximo, etc.)
 * vêm de `config/triagem.json`, editável sem mexer neste arquivo.
 *
 * O cliente nunca escolhe "CFW500" ou "BESS" (ele não sabe o que é isso —
 * correção do proprietário, 18/10/2026). `viaCfw` vem de `temBombeamento`
 * (pergunta em linguagem de fazenda) e `viaBess` é avaliado sempre que não
 * há bombeamento, ou mesmo havendo, quando a conta sinaliza demanda
 * contratada — a elegibilidade fina de BESS continua sendo decidida pela
 * engenharia a partir da fatura, nunca filtrada aqui.
 */
export function avaliarTriagem(payload: OrcamentoApiPayload): TriagemOutput {
  const motivos: string[] = [];
  const dadosFaltantes: string[] = [];

  let viaCfw = payload.temBombeamento === 'sim';
  const viaBess = payload.temBombeamento === 'nao' || payload.demandaContratada === 'sim';
  let bombeamentoExcluido = false;

  const motores = payload.motores ?? [];
  const faixa = faixaParaUf(payload.uf);

  // ---- Elegibilidade de escopo do CFW (pode render D, ou excluir o CFW do pedido) ----
  if (viaCfw && motores.length > 0) {
    const somaCv = somaCvInstalacao(motores);
    const qualifica = qualificaCv(somaCv, faixa);
    const monofasicoUnico = motores.length === 1 && motores[0].tensao === 'MONO';

    if (!qualifica || monofasicoUnico) {
      if (!viaBess) {
        return {
          resultado: 'D',
          motivos: monofasicoUnico
            ? ['Motor monofásico como única carga — fora do escopo de bombeamento solar com CFW500 no momento.']
            : [
                `Potência somada dos motores (${somaCv} CV) abaixo da faixa atendida para ${payload.uf} (mínimo ${faixa.cv_minimo} CV${faixa.inclusivo ? ', inclusive' : ''}).`,
              ],
          dadosFaltantes: [],
          solucaoInteresse: 'cfw',
        };
      }
      // Há sinal de BESS (demanda contratada) — bombeamento sai, BESS segue.
      viaCfw = false;
      bombeamentoExcluido = true;
      motivos.push(
        `Bombeamento solar não incluído nesta proposta: potência somada dos motores (${somaCv} CV) abaixo da faixa atendida para ${payload.uf}. Seguimos com o BESS.`,
      );
    }
  }

  // ---- Gatilhos de "exige estudo" (resultado C) ----
  const cTriggers: string[] = [];

  if (viaCfw) {
    if (motores.length === 0) {
      // Sem motor nenhum informado isso é dado faltante (B), não C — tratado abaixo.
    } else {
      const distancias = motores.map((m) => m.distanciaM).filter((d): d is number => typeof d === 'number');
      const maxDistancia = distancias.length > 0 ? Math.max(...distancias) : undefined;

      if (maxDistancia !== undefined && maxDistancia > config.distancia_reator_m) {
        cTriggers.push(
          `Distância até a bomba (${maxDistancia} m) acima de ${config.distancia_reator_m} m — exige reator de saída e cabo dimensionado, avaliado pela engenharia.`,
        );
      }
      if (maxDistancia !== undefined && maxDistancia > config.distancia_maxima_sem_visita_m) {
        cTriggers.push(
          `Distância até a bomba (${maxDistancia} m) acima do limite para proposta sem visita (${config.distancia_maxima_sem_visita_m} m).`,
        );
      }
      const horasAltas = motores.some((m) => typeof m.horasDia === 'number' && m.horasDia > config.horas_dia_alerta_cfw);
      if (horasAltas) {
        cTriggers.push(
          `Operação acima de ${config.horas_dia_alerta_cfw} h/dia informada — o complemento (madrugada ou BESS) exige estudo da engenharia.`,
        );
      }
      if (config.cv_maximo_resposta_automatica !== null) {
        const somaCv = somaCvInstalacao(motores);
        if (somaCv > config.cv_maximo_resposta_automatica) {
          cTriggers.push(`Potência somada (${somaCv} CV) acima do teto para resposta automática.`);
        }
      }
    }
  }

  if (payload.ucsMesmoTitular && payload.ucsMesmoTitular !== '1') {
    cTriggers.push('Mais de uma unidade consumidora do mesmo titular — vale avaliar unificação antes de fechar a proposta.');
  }

  if (viaBess && payload.rede === 'nao') {
    cTriggers.push('BESS para operação isolada/ilhada (sem rede) exige estudo específico de arquitetura.');
  }

  if (viaCfw && viaBess) {
    cTriggers.push('Pedido combina bombeamento solar e BESS — a engenharia define a arquitetura conjunta.');
  }

  if (cTriggers.length > 0) {
    return {
      resultado: 'C',
      motivos: [...motivos, ...cTriggers],
      dadosFaltantes: [],
      bombeamentoExcluido,
      solucaoInteresse: derivarSolucao(viaCfw, viaBess),
    };
  }

  // ---- Dados críticos faltantes (resultado B) ----
  if (!payload.descricaoCliente?.trim()) {
    dadosFaltantes.push('descrição do problema com suas palavras');
  }

  const contaAnexada = (payload.contaLuzAnexos?.length ?? 0) > 0;
  if (payload.rede !== 'nao' && !contaAnexada) {
    dadosFaltantes.push('foto ou PDF da conta de luz');
  }
  if (payload.rede === 'nao' && !payload.dieselMensalBrl && !payload.geradorKva) {
    dadosFaltantes.push('gasto mensal com diesel/gerador');
  }

  if (viaCfw) {
    if (motores.length === 0) {
      dadosFaltantes.push('potência dos motores (CV)');
    } else {
      if (motores.some((m) => m.tensao === 'nao_sei')) dadosFaltantes.push('tensão dos motores');
      if (motores.some((m) => typeof m.distanciaM !== 'number')) dadosFaltantes.push('distância até a bomba');
    }
  }

  if (dadosFaltantes.length > 0) {
    return { resultado: 'B', motivos, dadosFaltantes, bombeamentoExcluido, solucaoInteresse: derivarSolucao(viaCfw, viaBess) };
  }

  // ---- Resultado A ----
  const preDimensionamentoCfw = viaCfw && motores.length > 0 ? preDimensionarMotores(motores) : undefined;
  return {
    resultado: 'A',
    motivos,
    dadosFaltantes: [],
    preDimensionamentoCfw,
    bombeamentoExcluido,
    solucaoInteresse: derivarSolucao(viaCfw, viaBess),
  };
}
