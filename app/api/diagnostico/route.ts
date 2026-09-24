import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { diagnosticoApiSchema } from '@/lib/diagnostico-schema';
import { montarMensagemDiagnostico } from '@/lib/diagnostico-mensagem';
import { whatsappLinkWith } from '@/lib/contato';
import { getSupabase } from '@/lib/supabase';
import { sendDiagnosticoEmail } from '@/lib/diagnostico-email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface DiagnosticoResponse {
  success: boolean;
  diagnosticoId?: string;
  whatsappUrl?: string;
  error?: string;
}

/**
 * POST /api/diagnostico — captura o formulário consultivo de diagnóstico
 * energético. Nunca promete orçamento automático: persiste o pedido (best
 * effort) e sempre devolve um link de WhatsApp com a mensagem estruturada,
 * para que o contato funcione mesmo se a infraestrutura de backend
 * (Supabase/e-mail) não estiver configurada no ambiente.
 */
export async function POST(request: Request): Promise<NextResponse<DiagnosticoResponse>> {
  let payload;
  try {
    const json = await request.json();
    payload = diagnosticoApiSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: `Dados inválidos: ${err.issues.map((i) => i.message).join('; ')}` },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: false, error: 'Payload inválido' }, { status: 400 });
  }

  const mensagem = montarMensagemDiagnostico(payload);
  const whatsappUrl = whatsappLinkWith(mensagem);

  let diagnosticoId: string | undefined;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('diagnosticos')
      .insert({
        nome: payload.nome,
        empresa_fazenda: payload.empresaFazenda,
        telefone: payload.telefone,
        email: payload.email || null,
        municipio: payload.municipio,
        uf: payload.uf,
        tipo_operacao: payload.tipoOperacao,
        problemas: payload.problemas,
        relato: payload.relato || null,
        possui_solar: payload.possuiSolar === 'sim',
        possui_gerador: payload.possuiGerador === 'sim',
        possui_media_tensao: payload.possuiMediaTensao,
        cargas_criticas: payload.cargasCriticas || null,
        faixa_conta_mensal: payload.faixaContaMensal,
        demanda_contratada_kw: payload.demandaContratadaKw || null,
        horas_autonomia_desejada: payload.horasAutonomiaDesejada,
      })
      .select('id')
      .single();

    if (!error && data) diagnosticoId = data.id;
    else if (error) console.error('[diagnostico] supabase insert error', error);
  } catch (err) {
    // Supabase não configurado ou indisponível — não bloqueia o fallback de WhatsApp.
    console.error('[diagnostico] supabase indisponível', err);
  }

  if (process.env.RESEND_API_KEY && process.env.EMAIL_TO_EQUIPE) {
    sendDiagnosticoEmail(payload, diagnosticoId).catch((err) =>
      console.error('[diagnostico] envio email falhou', err),
    );
  }

  return NextResponse.json({ success: true, diagnosticoId, whatsappUrl });
}
