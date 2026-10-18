import { Resend } from 'resend';
import { ATIVIDADE_LABELS, DOR_LABELS, type OrcamentoApiPayload } from './orcamento-schema';
import type { TriagemOutput } from './orcamento-triagem';

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

/** Notifica a equipe por e-mail sobre um novo pedido de orçamento — best effort. */
export async function sendOrcamentoEmail(
  d: OrcamentoApiPayload,
  triagem: TriagemOutput,
  pedidoNumero: string,
): Promise<SendResult> {
  const from = process.env.EMAIL_FROM ?? 'Irrigasolar Orçamento <onboarding@resend.dev>';
  const toRaw = process.env.EMAIL_TO_EQUIPE;
  if (!toRaw) return { success: false, error: 'EMAIL_TO_EQUIPE ausente no env' };
  const to = toRaw.split(',').map((s) => s.trim()).filter(Boolean);

  try {
    const { data, error } = await getResend().emails.send({
      from,
      to,
      subject: `[ORÇAMENTO ${triagem.resultado}] ${pedidoNumero} · ${d.nome} · ${d.municipio}/${d.uf}`,
      html: buildHtml(d, triagem, pedidoNumero),
    });
    if (error) return { success: false, error: String(error.message ?? error) };
    return { success: true, id: data?.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Falha desconhecida no envio' };
  }
}

function buildHtml(d: OrcamentoApiPayload, triagem: TriagemOutput, pedidoNumero: string): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#4A5A4A;">${k}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(v)}</td></tr>`;
  const motores = (d.motores ?? [])
    .map((m) => `${m.quantidade}× ${m.cv} CV · ${m.tensao} · ${m.tipo}${m.distanciaM != null ? ` · ${m.distanciaM} m` : ''}`)
    .join('<br>');

  return /* html */ `<!doctype html>
<html lang="pt-BR"><body style="font-family:sans-serif;color:#18201C;background:#FCFBF7;padding:24px;">
<div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #DDD6C6;border-radius:4px;padding:24px;">
  <p style="text-transform:uppercase;letter-spacing:0.15em;font-size:11px;color:#B97832;font-weight:700;">Novo pedido de orçamento · ${escapeHtml(pedidoNumero)} · Resultado ${escapeHtml(triagem.resultado)}</p>
  <h1 style="font-size:20px;margin:6px 0 16px;">${escapeHtml(d.nome)}${d.propriedade ? ' — ' + escapeHtml(d.propriedade) : ''}</h1>
  <table cellpadding="0" cellspacing="0">
    ${row('Atividade', ATIVIDADE_LABELS[d.atividade])}
    ${row('Bombeia água com motor', d.temBombeamento === 'sim' ? 'Sim' : 'Não')}
    ${row('Solução (derivada)', triagem.solucaoInteresse)}
    ${row('Maior dor', DOR_LABELS[d.dorPrincipal])}
    ${row('Local', `${d.municipio}/${d.uf}`)}
    ${row('WhatsApp', d.whatsapp)}
    ${d.email ? row('E-mail', d.email) : ''}
    ${row('Rede elétrica', d.rede)}
    ${row('Conta de luz anexada', (d.contaLuzAnexos?.length ?? 0) > 0 ? 'Sim' : 'Não')}
  </table>
  ${d.descricaoCliente ? `<p style="margin-top:16px;"><strong>Relato do cliente:</strong><br>${escapeHtml(d.descricaoCliente)}</p>` : ''}
  ${motores ? `<p style="margin-top:16px;"><strong>Motores:</strong><br>${motores}</p>` : ''}
  ${triagem.motivos.length ? `<p style="margin-top:16px;"><strong>Motivos da triagem:</strong><br>${triagem.motivos.map(escapeHtml).join('<br>')}</p>` : ''}
  ${triagem.dadosFaltantes.length ? `<p><strong>Dados faltantes:</strong> ${triagem.dadosFaltantes.map(escapeHtml).join(', ')}</p>` : ''}
</div>
</body></html>`;
}

function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
