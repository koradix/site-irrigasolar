import type { KitCompleto } from './calcula-kit';

export interface MensagemContext {
  nome: string;
  cidade?: string | null;
  kit: KitCompleto;
}

function brl(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? nome;
}

/**
 * Mensagem-mãe (M1) enviada por WhatsApp logo após a configuração do kit.
 * Variáveis interpoladas a partir do contexto do lead + kit calculado.
 */
export function montarMensagemMae(ctx: MensagemContext): string {
  const { nome, kit } = ctx;
  const cidade = ctx.cidade?.trim() || 'sua propriedade';

  return [
    `Olá, ${primeiroNome(nome)}. Aqui é da engenharia da Irrigasolar.`,
    '',
    `Montei o kit que você configurou em ${cidade}:`,
    '',
    '🔧 SEU KIT IRRIGASOLAR',
    `• ${kit.modulos.qtd} módulos ${kit.modulos.wp_unitario}Wp`,
    `• Inversor WEG ${kit.inversor.modelo}`,
    `• Vazão estimada: ${kit.vazao_estimada} m³/h`,
    `• Potência total: ${kit.kwp} kWp`,
    '• ✓ IrrigaBox® de monitoramento (temperatura, umidade, segurança)',
    '• Garantia WEG 10 anos + 18 meses de serviço estendido',
    '',
    `💰 Investimento turn-key chave em mão: *${brl(kit.valorBase)}*`,
    'Incluso: equipamento + IrrigaBox + acabamento elétrico + instalação.',
    '',
    'Qual a melhor hora pra gente conversar sobre cronograma e visita técnica?',
  ].join('\n');
}
