import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { orcamentoApiSchema } from '@/lib/orcamento-schema';
import { avaliarTriagem, type TriagemOutput } from '@/lib/orcamento-triagem';
import { proximoNumeroPedido } from '@/lib/orcamento-numero';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendOrcamentoEmail } from '@/lib/orcamento-email';
import { dispararWebhookProposta } from '@/lib/orcamento-webhook';
import { whatsappLinkWith } from '@/lib/contato';
import { sendText } from '@/lib/waha';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface OrcamentoResponse {
  success: boolean;
  pedidoId?: string;
  triagem?: TriagemOutput;
  whatsappUrl?: string;
  error?: string;
}

/**
 * POST /api/orcamento — formulário de orçamento com triagem automática
 * (seção 8 do prompt de redesign). Sempre persiste o pedido (best effort) e
 * sempre devolve um resultado de triagem ao visitante, mesmo que a
 * infraestrutura de backend (Supabase/e-mail/webhook/WhatsApp) falhe —
 * nenhuma dessas falhas pode impedir a resposta ao cliente.
 */
export async function POST(request: Request): Promise<NextResponse<OrcamentoResponse>> {
  let payload;
  try {
    const json = await request.json();
    payload = orcamentoApiSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: `Dados inválidos: ${err.issues.map((i) => i.message).join('; ')}` },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: false, error: 'Payload inválido' }, { status: 400 });
  }

  const triagem = avaliarTriagem(payload);
  const pedidoNumero = await proximoNumeroPedido();
  let pedidoId: string | undefined;

  try {
    const { data, error } = await getSupabaseAdmin()
      .from('orcamentos')
      .insert({
        pedido_numero: pedidoNumero,
        nome: payload.nome,
        whatsapp: payload.whatsapp,
        email: payload.email || null,
        municipio: payload.municipio,
        uf: payload.uf,
        atividade: payload.atividade,
        solucao_interesse: triagem.solucaoInteresse,
        dor_principal: payload.dorPrincipal,
        resultado_triagem: triagem.resultado,
        payload,
      })
      .select('id')
      .single();

    if (!error && data) pedidoId = data.id;
    else if (error) console.error('[orcamento] supabase insert error', error);
  } catch (err) {
    console.error('[orcamento] supabase indisponível', err);
  }

  const idParaEfeitosColaterais = pedidoId ?? pedidoNumero;

  if (process.env.RESEND_API_KEY && process.env.EMAIL_TO_EQUIPE) {
    sendOrcamentoEmail(payload, triagem, pedidoNumero).catch((err) =>
      console.error('[orcamento] envio email falhou', err),
    );
  }

  if (process.env.WAHA_API_KEY) {
    const destino = process.env.EMPRESA_WHATSAPP_INTERNO || process.env.WHATSAPP_NOTIFICACAO_INTERNA;
    if (destino) {
      const texto = `Novo pedido de orçamento ${pedidoNumero} (${triagem.resultado})\n${payload.nome} · ${payload.municipio}/${payload.uf}\n${payload.whatsapp}`;
      sendText(destino, texto).catch((err) => console.error('[orcamento] notificação WAHA falhou', err));
    }
  }

  dispararWebhookProposta({ pedidoId: idParaEfeitosColaterais, payload, triagem }).catch((err) =>
    console.error('[orcamento] webhook falhou', err),
  );

  const whatsappUrl =
    triagem.resultado === 'A' || triagem.resultado === 'C' || triagem.resultado === 'D'
      ? whatsappLinkWith(`Olá! Enviei o pedido de orçamento ${pedidoNumero} pelo site e gostaria de falar com a engenharia.`)
      : undefined;

  return NextResponse.json({ success: true, pedidoId: pedidoNumero, triagem, whatsappUrl });
}
