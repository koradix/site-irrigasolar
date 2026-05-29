/**
 * Cliente WAHA (WhatsApp HTTP API) — self-hosted via Docker.
 * Docs: https://waha.devlike.pro
 *
 * Env:
 * - WAHA_BASE_URL  (ex: http://localhost:3000)
 * - WAHA_SESSION   (ex: default)
 * - WAHA_API_KEY   (header X-Api-Key)
 */

export interface WahaResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function wahaConfig(): { baseUrl: string; session: string; headers: HeadersInit } {
  const baseUrl = process.env.WAHA_BASE_URL ?? 'http://localhost:3000';
  const session = process.env.WAHA_SESSION ?? 'default';
  const apiKey = process.env.WAHA_API_KEY;
  if (!apiKey) {
    throw new Error('WAHA não configurada: defina WAHA_API_KEY no .env.local');
  }
  return {
    baseUrl: baseUrl.replace(/\/$/, ''),
    session,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
  };
}

/**
 * Normaliza um chatId (vem do webhook como "5575999590288@c.us" ou só dígitos).
 * Z-API/WAHA aceitam o formato com sufixo "@c.us".
 */
export function toWahaChatId(numero: string): string {
  if (numero.includes('@')) return numero;
  const digits = numero.replace(/\D/g, '');
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  return `${withCountry}@c.us`;
}

/**
 * Envia texto via WAHA.
 * Endpoint: POST /api/sendText
 */
export async function sendText(chatId: string, text: string): Promise<WahaResult> {
  const { baseUrl, session, headers } = wahaConfig();
  try {
    const res = await fetch(`${baseUrl}/api/sendText`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        session,
        chatId: toWahaChatId(chatId),
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { success: false, error: `WAHA ${res.status}: ${body || res.statusText}` };
    }
    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { success: true, messageId: json.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Erro WAHA sendText' };
  }
}

/**
 * Envia arquivo (PDF, imagem, etc.) via WAHA.
 * Endpoint: POST /api/sendFile  (aceita base64 inline OU URL)
 *
 * @param chatId — destino
 * @param file — Buffer (vira base64) ou URL pública do arquivo
 * @param filename — nome a exibir no WhatsApp
 * @param caption — legenda opcional
 * @param mimetype — default application/pdf
 */
export async function sendFile(
  chatId: string,
  file: Buffer | string,
  filename: string,
  caption?: string,
  mimetype = 'application/pdf',
): Promise<WahaResult> {
  const { baseUrl, session, headers } = wahaConfig();

  const fileField =
    typeof file === 'string'
      ? { url: file, mimetype, filename }
      : { data: file.toString('base64'), mimetype, filename };

  try {
    const res = await fetch(`${baseUrl}/api/sendFile`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        session,
        chatId: toWahaChatId(chatId),
        file: fileField,
        caption,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { success: false, error: `WAHA ${res.status}: ${body || res.statusText}` };
    }
    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { success: true, messageId: json.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Erro WAHA sendFile' };
  }
}

/** Verifica status da sessão WAHA (útil pra healthcheck). */
export async function sessionStatus(): Promise<{ ok: boolean; status?: string; error?: string }> {
  const { baseUrl, session, headers } = wahaConfig();
  try {
    const res = await fetch(`${baseUrl}/api/sessions/${session}`, { headers });
    if (!res.ok) return { ok: false, error: `WAHA ${res.status}` };
    const json = (await res.json()) as { status?: string };
    return { ok: true, status: json.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'erro' };
  }
}
