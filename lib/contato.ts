/**
 * Dados de contato comercial da Irrigasolar — fonte única de verdade.
 * Trocar aqui propaga para Footer, /obrigado, Step4 do configurador e qualquer outro lugar.
 */

/** WhatsApp comercial no formato internacional sem máscara (Z-API e wa.me). */
export const WHATSAPP_NUMBER = '5575999590288';

/** Link wa.me pronto pra usar no href dos botões. */
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Constrói um link wa.me com mensagem pré-preenchida. */
export function whatsappLinkWith(message: string): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}
