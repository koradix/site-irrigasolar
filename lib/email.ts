import { Resend } from 'resend';
import { buildProposalHtml, buildProposalSubject, type PropostaContext } from './proposta';

export interface SendResult {
  success: boolean;
  id?: string;
  error?: string;
}

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('Resend não configurado: defina RESEND_API_KEY no .env.local');
  }
  cached = new Resend(key);
  return cached;
}

/**
 * Envia o email da proposta para o(s) destinatário(s) do time Irrigasolar.
 *
 * Env:
 * - RESEND_API_KEY    — chave do Resend (resend.com/api-keys)
 * - EMAIL_FROM        — remetente verificado no Resend (ou onboarding@resend.dev em dev)
 * - EMAIL_TO_EQUIPE   — destinatário(s), separados por vírgula
 *
 * @returns { success, id?, error? } — não lança em caso de falha de envio.
 */
export async function sendProposalEmail(ctx: PropostaContext): Promise<SendResult> {
  const from = process.env.EMAIL_FROM ?? 'Irrigasolar Leads <onboarding@resend.dev>';
  const toRaw = process.env.EMAIL_TO_EQUIPE;
  if (!toRaw) {
    return { success: false, error: 'EMAIL_TO_EQUIPE ausente no env' };
  }
  const to = toRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const { data, error } = await getResend().emails.send({
      from,
      to,
      replyTo: ctx.whatsapp ? undefined : undefined, // sem reply-to por enquanto
      subject: buildProposalSubject(ctx),
      html: buildProposalHtml(ctx),
    });

    if (error) {
      return { success: false, error: String(error.message ?? error) };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Falha desconhecida no envio',
    };
  }
}
