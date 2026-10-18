import type { OrcamentoData } from './orcamento-schema';

/**
 * Medidor de "precisão da proposta" (seção 5.6 do prompt) — sobe conforme os
 * dados críticos vão sendo preenchidos. Puramente informativo para o
 * visitante; não decide o resultado da triagem (isso é `avaliarTriagem`).
 */
export function calcularPrecisao(data: OrcamentoData): { percentual: number; mensagem: string } {
  const criterios: boolean[] = [
    Boolean(data.descricaoCliente?.trim()),
    (data.contaLuzAnexos?.length ?? 0) > 0 || data.rede === 'nao',
    (data.motores?.length ?? 0) > 0 || Boolean(data.cargasBess?.potenciaCritica),
    (data.motores ?? []).every((m) => typeof m.distanciaM === 'number') && (data.motores?.length ?? 0) > 0,
    Boolean(data.nome && data.whatsapp),
  ];
  const preenchidos = criterios.filter(Boolean).length;
  const percentual = Math.round((preenchidos / criterios.length) * 100);

  const mensagem =
    percentual >= 80
      ? 'Com esses dados, nossa engenharia consegue dimensionar sem visita inicial.'
      : 'Quanto mais completo, mais certeira fica a proposta — a conta de luz e a potência do motor pesam mais.';

  return { percentual, mensagem };
}
