import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { apiPayloadSchema } from '@/lib/configurador-schema';
import { calcularKitCompleto } from '@/lib/calcula-kit';
import { getSupabase } from '@/lib/supabase';
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

  // Webhook n8n — best effort, não bloqueia resposta ao cliente
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

  return NextResponse.json({ success: true, leadId });
}

function fireAndForget(promise: Promise<unknown>, label: string): void {
  promise.catch((err) => console.error(label, err));
}
