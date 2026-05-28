import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { apiPayloadSchema } from '@/lib/configurador-schema';
import { calcularKitCompleto } from '@/lib/calcula-kit';
import { getSupabase } from '@/lib/supabase';
import { sendWhatsApp } from '@/lib/whatsapp';
import { montarMensagemMae } from '@/lib/mensagens';
import type { ConfiguradorResponse, DimensaoDados } from '@/types/lead';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<NextResponse<ConfiguradorResponse>> {
  let payload;
  try {
    const json = await request.json();
    payload = apiPayloadSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: `Dados inválidos: ${err.issues.map((i) => i.message).join('; ')}` },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: 'Payload inválido' },
      { status: 400 },
    );
  }

  // Kit completo com valorBase (NUNCA exposto na LP, só armazenado/enviado ao n8n)
  const kit = calcularKitCompleto({
    ...payload,
    cep: payload.cep ?? undefined,
    cidade: payload.cidade ?? undefined,
    uf: payload.uf ?? undefined,
  });

  const dimensao: DimensaoDados = {
    pocoPotencia: payload.pocoPotencia,
    pocoProfundidade: payload.pocoProfundidade,
    pivoQuantidade: payload.pivoQuantidade,
    pivoPotencia: payload.pivoPotencia,
    fazendaContaMensal: payload.fazendaContaMensal,
    multiploDescricao: payload.multiploDescricao,
  };

  // Insert no Supabase
  let leadId: string;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('leads')
      .insert({
        nome: payload.nome,
        sobrenome: payload.sobrenome,
        whatsapp: payload.whatsapp,
        cep: payload.cep ?? null,
        cidade: payload.cidade ?? null,
        uf: payload.uf ?? null,
        aplicacao: payload.aplicacao,
        dimensao_dados: dimensao,
        urgencia: payload.urgencia ?? null,
        kit_calculado: kit,
        valor_calculado: kit.valorBase,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('[configurador] supabase insert error', error);
      return NextResponse.json(
        { success: false, error: 'Não foi possível salvar o lead. Tente novamente.' },
        { status: 500 },
      );
    }

    leadId = data.id;
  } catch (err) {
    console.error('[configurador] supabase exception', err);
    return NextResponse.json(
      { success: false, error: 'Backend indisponível. Tente novamente.' },
      { status: 500 },
    );
  }

  // Webhook n8n — dispara o restante da régua (M2+ com timing humanizado controlado lá)
  // Best effort: não bloqueia resposta ao cliente
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (webhookUrl) {
    fireAndForget(
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, payload, kit }),
      }),
      '[configurador] webhook n8n',
    );
  }

  // Mensagem-mãe (M1) via Z-API — envio imediato.
  // TODO: mover para n8n se a régua humanizada exigir delay antes da M1.
  if (process.env.ZAPI_INSTANCE && process.env.ZAPI_TOKEN) {
    fireAndForget(
      enviarMensagemMae({
        leadId,
        nome: payload.nome,
        cidade: payload.cidade ?? null,
        whatsapp: payload.whatsapp,
        kit,
      }),
      '[configurador] envio M1',
    );
  }

  return NextResponse.json({ success: true, leadId });
}

async function enviarMensagemMae(args: {
  leadId: string;
  nome: string;
  cidade: string | null;
  whatsapp: string;
  kit: ReturnType<typeof calcularKitCompleto>;
}): Promise<void> {
  const mensagem = montarMensagemMae({
    nome: args.nome,
    cidade: args.cidade,
    kit: args.kit,
  });
  const result = await sendWhatsApp(args.whatsapp, mensagem);

  if (!result.success) {
    console.error('[configurador] M1 Z-API falhou:', result.error);
    return;
  }

  try {
    const supabase = getSupabase();
    await supabase
      .from('leads')
      .update({
        enviado_whatsapp: true,
        enviado_whatsapp_at: new Date().toISOString(),
      })
      .eq('id', args.leadId);
  } catch (err) {
    console.error('[configurador] M1 enviada mas update do lead falhou', err);
  }
}

function fireAndForget(promise: Promise<unknown>, label: string): void {
  promise.catch((err) => console.error(label, err));
}
