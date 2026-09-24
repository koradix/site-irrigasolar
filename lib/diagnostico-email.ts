import { Resend } from 'resend';
import {
  TIPO_OPERACAO_LABELS,
  PROBLEMA_LABELS,
  FAIXA_CONTA_LABELS,
  HORAS_AUTONOMIA_LABELS,
  type DiagnosticoApiPayload,
} from './diagnostico-schema';

export interface SendResult {
  success: boolean;
  id?: string;
  error?: string;
}

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('Resend não configurado: defina RESEND_API_KEY no .env.local');
  cached = new Resend(key);
  return cached;
}

/** Notifica a equipe por e-mail sobre um novo diagnóstico solicitado — best effort. */
export async function sendDiagnosticoEmail(d: DiagnosticoApiPayload, diagnosticoId?: string): Promise<SendResult> {
  const from = process.env.EMAIL_FROM ?? 'Irrigasolar Diagnóstico <onboarding@resend.dev>';
  const toRaw = process.env.EMAIL_TO_EQUIPE;
  if (!toRaw) return { success: false, error: 'EMAIL_TO_EQUIPE ausente no env' };
  const to = toRaw.split(',').map((s) => s.trim()).filter(Boolean);

  try {
    const { data, error } = await getResend().emails.send({
      from,
      to,
      subject: `[DIAGNÓSTICO] ${d.nome} · ${d.empresaFazenda} · ${d.municipio}/${d.uf}`,
      html: buildHtml(d, diagnosticoId),
    });
    if (error) return { success: false, error: String(error.message ?? error) };
    return { success: true, id: data?.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Falha desconhecida no envio' };
  }
}

function buildHtml(d: DiagnosticoApiPayload, diagnosticoId?: string): string {
  const row = (k: string, v: string) => `<tr><td style="padding:4px 12px 4px 0;color:#4A5A4A;">${k}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(v)}</td></tr>`;
  return /* html */ `<!doctype html>
<html lang="pt-BR"><body style="font-family:sans-serif;color:#18201C;background:#FCFBF7;padding:24px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #DDD6C6;border-radius:4px;padding:24px;">
  <p style="text-transform:uppercase;letter-spacing:0.15em;font-size:11px;color:#B97832;font-weight:700;">Novo diagnóstico energético</p>
  <h1 style="font-size:20px;margin:6px 0 16px;">${escapeHtml(d.nome)} — ${escapeHtml(d.empresaFazenda)}</h1>
  <table cellpadding="0" cellspacing="0">
    ${row('Operação', TIPO_OPERACAO_LABELS[d.tipoOperacao])}
    ${row('Local', `${d.municipio}/${d.uf}`)}
    ${row('Problemas', d.problemas.map((p) => PROBLEMA_LABELS[p]).join(', '))}
    ${row('Solar existente', d.possuiSolar === 'sim' ? 'Sim' : 'Não')}
    ${row('Gerador existente', d.possuiGerador === 'sim' ? 'Sim' : 'Não')}
    ${row('Média tensão', d.possuiMediaTensao)}
    ${row('Faixa de conta mensal', FAIXA_CONTA_LABELS[d.faixaContaMensal])}
    ${row('Autonomia desejada', HORAS_AUTONOMIA_LABELS[d.horasAutonomiaDesejada])}
    ${row('Telefone', d.telefone)}
    ${d.email ? row('E-mail', d.email) : ''}
  </table>
  ${d.relato ? `<p style="margin-top:16px;"><strong>Relato:</strong> ${escapeHtml(d.relato)}</p>` : ''}
  ${d.cargasCriticas ? `<p><strong>Cargas críticas:</strong> ${escapeHtml(d.cargasCriticas)}</p>` : ''}
  ${diagnosticoId ? `<p style="margin-top:16px;font-size:12px;color:#4A5A4A;">ID: ${escapeHtml(diagnosticoId)}</p>` : ''}
</div>
</body></html>`;
}

function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
