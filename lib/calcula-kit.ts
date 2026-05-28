import { APLICACAO_LABELS, type ConfiguradorData } from './configurador-schema';

export type Estrutura = 'Solo' | 'Telhado' | 'Poste' | 'A definir';

export interface KitCalculation {
  aplicacaoLabel: string;
  /** Potência total em kWp já dimensionada (sempre presente, podendo ser estimativa) */
  potenciaKwp: number;
  /** Texto descritivo da potência (CV para bomba, kWp para sistemas) */
  potenciaTexto: string;
  /** Wattagem por módulo padrão */
  wattagemModulo: number;
  modulosQtd: number;
  inversorModelo: string;
  inversorQtd: number;
  estrutura: Estrutura;
  /** Em m³/h. undefined quando aplicação não envolve bomba (fazenda pura) */
  vazaoEstimadaM3h?: number;
  /** Em hectares. undefined quando não faz sentido (poço, fazenda) */
  areaIrrigavelHa?: number;
}

const MODULO_WP = 555;

/** Heurísticas iniciais — engenharia revisa o cálculo final na proposta. */
export function calcularKit(d: ConfiguradorData): KitCalculation {
  const aplicacaoLabel = d.aplicacao ? APLICACAO_LABELS[d.aplicacao] : 'A definir';

  switch (d.aplicacao) {
    case 'poco': {
      const cv = d.pocoPotencia ?? 0;
      const kwp = round(cv * 0.85, 1);
      return {
        aplicacaoLabel,
        potenciaKwp: kwp,
        potenciaTexto: cv ? `${cv} CV` : 'a dimensionar',
        wattagemModulo: MODULO_WP,
        modulosQtd: kwp ? Math.ceil((kwp * 1000) / MODULO_WP) : 0,
        inversorModelo:
          cv <= 15 ? 'WEG CFW500 Solar' : cv <= 50 ? 'WEG CFW900' : 'WEG CFW900 + Boost',
        inversorQtd: cv <= 50 ? 1 : 2,
        estrutura: cv <= 10 ? 'Poste' : 'Solo',
        vazaoEstimadaM3h: cv ? round(cv * 1.8, 1) : undefined,
      };
    }

    case 'pivo': {
      const kwp = d.pivoPotencia ?? 0;
      const pivos = d.pivoQuantidade ?? '1';
      const inversorQtd = Math.max(1, Math.ceil(kwp / 60));
      return {
        aplicacaoLabel,
        potenciaKwp: kwp,
        potenciaTexto: kwp ? `${kwp} kWp` : 'a dimensionar',
        wattagemModulo: MODULO_WP,
        modulosQtd: kwp ? Math.ceil((kwp * 1000) / MODULO_WP) : 0,
        inversorModelo: kwp < 30 ? 'WEG SIW500' : 'WEG SIW600 Trifásico',
        inversorQtd,
        estrutura: 'Solo',
        vazaoEstimadaM3h: kwp ? round(kwp * 2.4, 0) : undefined,
        areaIrrigavelHa: kwp ? round(kwp * 0.9, 1) * pivosMultiplier(pivos) : undefined,
      };
    }

    case 'fazenda': {
      const conta = d.fazendaContaMensal ?? 0;
      const kwp = round(conta / 100, 0);
      return {
        aplicacaoLabel,
        potenciaKwp: kwp,
        potenciaTexto: kwp ? `${kwp} kWp` : 'a dimensionar',
        wattagemModulo: MODULO_WP,
        modulosQtd: kwp ? Math.ceil((kwp * 1000) / MODULO_WP) : 0,
        inversorModelo: kwp < 30 ? 'WEG SIW500' : 'WEG SIW700 Híbrido',
        inversorQtd: Math.max(2, Math.ceil(kwp / 30)),
        estrutura: kwp < 30 ? 'Telhado' : 'Solo',
      };
    }

    case 'multiplo':
      return {
        aplicacaoLabel,
        potenciaKwp: 0,
        potenciaTexto: 'sob medida',
        wattagemModulo: MODULO_WP,
        modulosQtd: 0,
        inversorModelo: 'WEG combinado',
        inversorQtd: 0,
        estrutura: 'A definir',
      };

    default:
      return {
        aplicacaoLabel,
        potenciaKwp: 0,
        potenciaTexto: 'a dimensionar',
        wattagemModulo: MODULO_WP,
        modulosQtd: 0,
        inversorModelo: 'a dimensionar',
        inversorQtd: 0,
        estrutura: 'A definir',
      };
  }
}

function round(v: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(v * f) / f;
}

function pivosMultiplier(p: '1' | '2-3' | '4+'): number {
  switch (p) {
    case '1':
      return 1;
    case '2-3':
      return 2.5;
    case '4+':
      return 4;
  }
}
