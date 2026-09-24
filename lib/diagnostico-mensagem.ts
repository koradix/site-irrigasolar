import {
  TIPO_OPERACAO_LABELS,
  PROBLEMA_LABELS,
  FAIXA_CONTA_LABELS,
  HORAS_AUTONOMIA_LABELS,
  type DiagnosticoApiPayload,
} from './diagnostico-schema';

/**
 * Monta a mensagem estruturada de WhatsApp usada como fallback do
 * diagnóstico — sempre disponível, mesmo sem backend configurado.
 */
export function montarMensagemDiagnostico(d: DiagnosticoApiPayload): string {
  const linhas = [
    `Olá! Gostaria de solicitar um diagnóstico energético.`,
    '',
    `*Operação:* ${TIPO_OPERACAO_LABELS[d.tipoOperacao]}`,
    `*Local:* ${d.municipio}/${d.uf}`,
    `*Problemas:* ${d.problemas.map((p) => PROBLEMA_LABELS[p]).join(', ')}`,
  ];

  if (d.relato) linhas.push(`*Relato:* ${d.relato}`);

  linhas.push(
    '',
    `*Solar existente:* ${d.possuiSolar === 'sim' ? 'Sim' : 'Não'}`,
    `*Gerador existente:* ${d.possuiGerador === 'sim' ? 'Sim' : 'Não'}`,
    `*Média tensão:* ${d.possuiMediaTensao === 'sim' ? 'Sim' : d.possuiMediaTensao === 'nao' ? 'Não' : 'Não sei'}`,
  );

  if (d.cargasCriticas) linhas.push(`*Cargas críticas:* ${d.cargasCriticas}`);

  linhas.push(
    '',
    `*Faixa de conta mensal:* ${FAIXA_CONTA_LABELS[d.faixaContaMensal]}`,
    `*Autonomia desejada:* ${HORAS_AUTONOMIA_LABELS[d.horasAutonomiaDesejada]}`,
  );
  if (d.demandaContratadaKw) linhas.push(`*Demanda contratada:* ${d.demandaContratadaKw} kW`);

  linhas.push('', `*Contato:* ${d.nome} — ${d.empresaFazenda}`, `*Telefone:* ${d.telefone}`);
  if (d.email) linhas.push(`*E-mail:* ${d.email}`);

  return linhas.join('\n');
}
