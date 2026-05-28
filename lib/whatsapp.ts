/**
 * Cliente Z-API para envio de mensagens WhatsApp.
 *
 * Configuração via env:
 * - ZAPI_INSTANCE  (obrigatório)
 * - ZAPI_TOKEN     (obrigatório)
 * - ZAPI_CLIENT_TOKEN (opcional — header de segurança da Z-API)
 *
 * Z-API exige número no formato internacional sem máscara (ex: 5511999999999).
 */

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const ZAPI_BASE = 'https://api.z-api.io/instances';

function zapiUrl(endpoint: 'send-text' | 'send-image'): string {
  const instance = process.env.ZAPI_INSTANCE;
  const token = process.env.ZAPI_TOKEN;
  if (!instance || !token) {
    throw new Error('Z-API não configurada: defina ZAPI_INSTANCE e ZAPI_TOKEN');
  }
  return `${ZAPI_BASE}/${instance}/token/${token}/${endpoint}`;
}

function zapiHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const clientToken = process.env.ZAPI_CLIENT_TOKEN;
  if (clientToken) headers['Client-Token'] = clientToken;
  return headers;
}

/**
 * Normaliza um telefone BR para o formato exigido pela Z-API.
 * Remove caracteres não numéricos e prefixa 55 se ausente.
 */
export function normalizarTelefoneBr(numero: string): string {
  const digits = numero.replace(/\D/g, '');
  if (digits.startsWith('55')) return digits;
  return `55${digits}`;
}

/**
 * Envia mensagem WhatsApp via Z-API.
 *
 * @param numero — telefone (com ou sem máscara/55); será normalizado.
 * @param mensagem — texto da mensagem (markdown WhatsApp).
 * @param anexoUrl — URL de imagem/PDF para envio como mídia. Quando presente, usa /send-image.
 */
export async function sendWhatsApp(
  numero: string,
  mensagem: string,
  anexoUrl?: string,
): Promise<SendResult> {
  const phone = normalizarTelefoneBr(numero);
  const endpoint: 'send-text' | 'send-image' = anexoUrl ? 'send-image' : 'send-text';

  const body = anexoUrl
    ? { phone, image: anexoUrl, caption: mensagem }
    : { phone, message: mensagem };

  try {
    const res = await fetch(zapiUrl(endpoint), {
      method: 'POST',
      headers: zapiHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return {
        success: false,
        error: `Z-API ${res.status}: ${text || res.statusText}`,
      };
    }

    const json = (await res.json().catch(() => ({}))) as {
      messageId?: string;
      id?: string;
    };
    return { success: true, messageId: json.messageId ?? json.id };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Falha desconhecida no envio Z-API',
    };
  }
}
