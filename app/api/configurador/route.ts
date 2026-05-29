import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { apiPayloadSchema, type ApiPayload } from '@/lib/configurador-schema';
import { calcularKitCompleto } from '@/lib/calcula-kit';
import { getSupabase } from '@/lib/supabase';
import { sendProposalEmail } from '@/lib/email';
import { enviarPropostaCliente, wahaConfigurada } from '@/lib/proposta-sender';
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
    return NextResponse.json({ success: false, error: 'Payload inválido' }, { status: 400 });
  }

  // Kit completo com valorBase (NUNCA exposto na LP — só no email da equipe e no Supabase)
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

  // Envia proposta no email da equipe Irrigasolar — best effort, não bloqueia resposta
  if (process.env.RESEND_API_KEY && process.env.EMAIL_TO_EQUIPE) {
    fireAndForget(
      sendProposalEmail({
        leadId,
        nome: payload.nome,
        sobrenome: payload.sobrenome,
        whatsapp: payload.whatsapp,
        cidade: payload.cidade ?? null,
        uf: payload.uf ?? null,
        aplicacao: payload.aplicacao,
        urgencia: payload.urgencia ?? null,
        kit,
      }).then((r) => {
        if (!r.success) console.error('[configurador] email falhou:', r.error);
      }),
      '[configurador] envio email',
    );
  }

  // Webhook n8n — best effort, para automações futuras (régua de mensagens, CRM, etc.)
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

  // Envia o PDF da proposta diretamente no WhatsApp do cliente — best effort.
  // Só dispara se WAHA estiver configurada (em dev sem WAHA, esse passo é ignorado).
  if (wahaConfigurada() && payload.aplicacao !== 'multiplo') {
    fireAndForget(
      enviarPropostaCliente({
        phone: payload.whatsapp,
        cliente: {
          nome: `${payload.nome} ${payload.sobrenome}`.trim(),
          cidade_uf:
            payload.cidade && payload.uf ? `${payload.cidade}/${payload.uf}` : undefined,
        },
        itens: [
          {
            descricao: 'Kit Irrigasolar — recalculado pela engine WEG',
            quantidade: 1,
            valor_unitario: 0, // engine sobrescreve com valor da tabela
          },
        ],
        validade_dias: 15,
        aplicacao: payload.aplicacao,
        dimensao_cv: dimensaoParaCv(payload),
        lead_id: leadId,
        caption: `Olá ${payload.nome.split(' ')[0]}! Sua proposta Irrigasolar chegou. Qualquer dúvida, é só me chamar por aqui.`,
      }).then((r) => {
        if (!r.success) console.error('[configurador] envio proposta cliente falhou:', r.error);
      }),
      '[configurador] envia PDF cliente',
    );
  }

  return NextResponse.json({ success: true, leadId });
}

/** Deriva o "CV-equivalente" usado pela engine de cálculo a partir do payload. */
function dimensaoParaCv(p: ApiPayload): number | undefined {
  switch (p.aplicacao) {
    case 'poco':
      return p.pocoPotencia;
    case 'pivo':
      return p.pivoPotencia;
    case 'fazenda':
      return p.fazendaContaMensal ? p.fazendaContaMensal / 1000 : undefined;
    case 'multiplo':
    default:
      return undefined;
  }
}

function fireAndForget(promise: Promise<unknown>, label: string): void {
  promise.catch((err) => console.error(label, err));
}
