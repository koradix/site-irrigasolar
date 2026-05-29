import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { gerarPropostaPDF, proximoNumeroProposta, type PropostaDados } from '@/lib/pdf-proposta';
import { sendFile } from '@/lib/waha';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const itemSchema = z.object({
  descricao: z.string().min(1),
  quantidade: z.number().positive(),
  valor_unitario: z.number().nonnegative(),
});

const triggerSchema = z.object({
  /** Telefone do cliente (com ou sem máscara/55) */
  phone: z.string().min(8),
  cliente: z.object({
    nome: z.string().min(2),
    empresa: z.string().optional(),
    cidade_uf: z.string().optional(),
  }),
  itens: z.array(itemSchema).min(1),
  validade_dias: z.number().int().positive().default(15),
  observacoes: z.string().optional(),
  aplicacao: z.enum(['pivo', 'poco', 'fazenda', 'multiplo']).optional(),
  dimensao_cv: z.number().optional(),
  caption: z.string().optional(),
  lead_id: z.string().uuid().optional(),
});

type TriggerBody = z.infer<typeof triggerSchema>;

interface TriggerResponse {
  success: boolean;
  numero_proposta?: string;
  message_id?: string;
  error?: string;
}

/**
 * POST /api/proposta — gatilho do site/integração.
 * Autenticado via header X-Trigger-Secret (compara com PROPOSTA_TRIGGER_SECRET).
 *
 * Gera PDF, persiste, envia ao cliente pelo WhatsApp.
 */
export async function POST(request: Request): Promise<NextResponse<TriggerResponse>> {
  // Auth
  const expected = process.env.PROPOSTA_TRIGGER_SECRET;
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'PROPOSTA_TRIGGER_SECRET não configurado' },
      { status: 500 },
    );
  }
  if (request.headers.get('x-trigger-secret') !== expected) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  // Validate
  let body: TriggerBody;
  try {
    body = triggerSchema.parse(await request.json());
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: `Inválido: ${err.issues.map((i) => i.message).join('; ')}` },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: false, error: 'payload inválido' }, { status: 400 });
  }

  // Gera
  try {
    const numero = await proximoNumeroProposta();
    const dados: PropostaDados = {
      numero,
      data: new Date(),
      cliente: { ...body.cliente, whatsapp: body.phone },
      itens: body.itens,
      validade_dias: body.validade_dias,
      observacoes: body.observacoes,
      aplicacao: body.aplicacao,
      dimensao_cv: body.dimensao_cv,
    };

    const { buffer, filename, calculada } = await gerarPropostaPDF(dados);

    // Persiste
    let propostaRowId: string | null = null;
    try {
      const supabase = getSupabaseAdmin();
      const { data } = await supabase
        .from('propostas')
        .insert({
          chat_id: body.phone,
          numero_proposta: numero,
          dados: { ...dados, data: dados.data.toISOString() },
          valor: calculada.total,
          status: 'gerada',
          lead_id: body.lead_id ?? null,
        })
        .select('id')
        .single();
      propostaRowId = data?.id ?? null;
    } catch (err) {
      console.error('[api/proposta] persistir falhou', err);
    }

    // Envia
    const caption =
      body.caption ?? `Proposta ${numero} pronta. Conferimos qualquer detalhe por aqui.`;
    const send = await sendFile(body.phone, buffer, filename, caption);
    if (!send.success) {
      return NextResponse.json(
        { success: false, numero_proposta: numero, error: send.error },
        { status: 502 },
      );
    }

    // Marca enviada
    if (propostaRowId) {
      try {
        const supabase = getSupabaseAdmin();
        await supabase
          .from('propostas')
          .update({ enviada_em: new Date().toISOString(), status: 'enviada' })
          .eq('id', propostaRowId);
      } catch (err) {
        console.error('[api/proposta] update enviada_em falhou', err);
      }
    }

    return NextResponse.json({
      success: true,
      numero_proposta: numero,
      message_id: send.messageId,
    });
  } catch (err) {
    console.error('[api/proposta] erro', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'erro interno' },
      { status: 500 },
    );
  }
}
