import { NextResponse } from 'next/server';
import { processarMensagem } from '@/lib/agente';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook do WAHA — recebe eventos de mensagem do WhatsApp.
 *
 * Configurar no WAHA com WHATSAPP_HOOK_URL apontando pra este endpoint.
 * Eventos filtrados pra type=message via WHATSAPP_HOOK_EVENTS=message.
 *
 * Estratégia: responde 200 imediato e processa async pra não estourar timeout.
 */
export async function POST(request: Request): Promise<NextResponse> {
  // Auth opcional via header (validar apenas se WAHA_API_KEY estiver setada)
  const expectedKey = process.env.WAHA_API_KEY;
  if (expectedKey) {
    const incoming = request.headers.get('x-api-key');
    if (incoming && incoming !== expectedKey) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
    // Se WAHA não enviar header (alguns hooks não enviam), seguimos.
  }

  let body: WahaWebhookPayload;
  try {
    body = (await request.json()) as WahaWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  // Filtra: só eventos de mensagem do cliente (não echo da nossa sessão)
  if (body.event !== 'message') {
    return NextResponse.json({ ok: true, skipped: 'event != message' });
  }
  const payload = body.payload;
  if (!payload) {
    return NextResponse.json({ ok: true, skipped: 'no payload' });
  }
  if (payload.fromMe) {
    return NextResponse.json({ ok: true, skipped: 'fromMe' });
  }
  if (!payload.from || !payload.body) {
    return NextResponse.json({ ok: true, skipped: 'incomplete' });
  }

  // Fire-and-forget: processa em paralelo, responde 200 imediato
  fireAndForget(
    processarMensagem({
      chatId: payload.from,
      text: payload.body,
      customerName: payload.pushName,
    }),
    '[webhook/whatsapp] processarMensagem',
  );

  return NextResponse.json({ ok: true });
}

interface WahaWebhookPayload {
  event?: string;
  session?: string;
  payload?: {
    id?: string;
    from?: string;
    body?: string;
    fromMe?: boolean;
    pushName?: string;
  };
}

function fireAndForget(promise: Promise<unknown>, label: string): void {
  promise.catch((err) => console.error(label, err));
}
