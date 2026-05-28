import { montarMensagemMae } from './mensagens';
import type { KitCompleto } from './calcula-kit';
import { APLICACAO_LABELS, URGENCIA_LABELS, type Aplicacao, type Urgencia } from './configurador-schema';

export interface PropostaContext {
  leadId: string;
  nome: string;
  sobrenome: string;
  whatsapp: string;
  cidade?: string | null;
  uf?: string | null;
  aplicacao: Aplicacao;
  urgencia?: Urgencia | null;
  kit: KitCompleto;
}

function brl(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, '');
}

function waLink(numero: string): string {
  const d = digitsOnly(numero);
  const phone = d.startsWith('55') ? d : `55${d}`;
  return `https://wa.me/${phone}`;
}

/**
 * Monta o subject do email com nome + cidade + urgência, pro time triar rápido.
 */
export function buildProposalSubject(ctx: PropostaContext): string {
  const cidade = ctx.cidade ? `${ctx.cidade}/${ctx.uf ?? '?'}` : 's/cidade';
  const urg = ctx.urgencia ? URGENCIA_LABELS[ctx.urgencia] : 's/prazo';
  return `[LEAD] ${ctx.nome} ${ctx.sobrenome} · ${cidade} · ${urg}`;
}

/**
 * HTML do email enviado ao time da Irrigasolar.
 * Foco: ser legível, fácil de copiar pro WhatsApp do cliente.
 */
export function buildProposalHtml(ctx: PropostaContext): string {
  const { nome, sobrenome, whatsapp, cidade, uf, aplicacao, urgencia, kit } = ctx;
  const cidadeFmt = cidade ? `${cidade} / ${uf ?? ''}`.trim() : '—';
  const mensagemPraColar = montarMensagemMae({ nome, cidade, kit });
  const wa = waLink(whatsapp);

  return /* html */ `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1A2A1F; background: #FBF7EC; margin: 0; padding: 24px; }
  .card { max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #B8A878; border-radius: 4px; overflow: hidden; }
  .head { background: #0F1A12; color: #F8F2E0; padding: 20px 24px; }
  .kicker { font-family: "Courier New", monospace; letter-spacing: 0.2em; font-size: 11px; color: #C99B3F; text-transform: uppercase; }
  .h1 { font-size: 22px; font-weight: 700; margin: 6px 0 0; }
  .section { padding: 20px 24px; border-bottom: 1px solid #E8E0C8; }
  .section:last-child { border-bottom: none; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.12em; color: #8A6B22; margin: 0 0 12px; font-family: "Courier New", monospace; font-weight: 700; }
  table.spec { width: 100%; border-collapse: collapse; }
  table.spec td { padding: 6px 0; font-size: 14px; vertical-align: top; }
  table.spec td.k { color: #4A5A4A; width: 40%; }
  table.spec td.v { color: #1A2A1F; font-weight: 600; }
  .valor { background: #C99B3F; color: #0F1A12; padding: 16px 20px; border-radius: 4px; margin-top: 12px; }
  .valor .label { font-family: "Courier New", monospace; text-transform: uppercase; letter-spacing: 0.15em; font-size: 11px; font-weight: 700; }
  .valor .num { font-size: 28px; font-weight: 700; margin-top: 4px; }
  .cta { display: inline-block; background: #25D366; color: #0F1A12; text-decoration: none; font-weight: 700; padding: 12px 20px; border-radius: 4px; margin: 4px 0; }
  pre.msg { background: #F8F2E0; border: 1px dashed #B8A878; padding: 16px; border-radius: 4px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; white-space: pre-wrap; word-wrap: break-word; color: #1A2A1F; line-height: 1.5; }
  .meta { font-size: 12px; color: #4A5A4A; font-family: "Courier New", monospace; }
  .pill { display: inline-block; background: #C99B3F; color: #0F1A12; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-family: "Courier New", monospace; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700; }
</style>
</head>
<body>
<div class="card">

  <div class="head">
    <div class="kicker">// Novo lead — Configurador</div>
    <div class="h1">${escapeHtml(nome)} ${escapeHtml(sobrenome)}</div>
    <div style="margin-top:6px; font-size:13px; color:#C99B3F;">${escapeHtml(cidadeFmt)} · ${urgencia ? escapeHtml(URGENCIA_LABELS[urgencia]) : 's/ prazo informado'}</div>
  </div>

  <div class="section">
    <h2>// Contato</h2>
    <table class="spec">
      <tr><td class="k">WhatsApp</td><td class="v"><a href="${wa}" style="color:#8A4530;">${escapeHtml(whatsapp)}</a></td></tr>
      <tr><td class="k">Cidade / UF</td><td class="v">${escapeHtml(cidadeFmt)}</td></tr>
      <tr><td class="k">Aplicação</td><td class="v"><span class="pill">${escapeHtml(APLICACAO_LABELS[aplicacao])}</span></td></tr>
    </table>
    <a class="cta" href="${wa}" style="margin-top:16px;">📱 Abrir WhatsApp do cliente</a>
  </div>

  <div class="section">
    <h2>// Kit calculado</h2>
    <table class="spec">
      <tr><td class="k">Potência</td><td class="v">${kit.kwp} kWp</td></tr>
      <tr><td class="k">Potência (CV)</td><td class="v">${kit.potencia_cv} CV</td></tr>
      <tr><td class="k">Módulos</td><td class="v">${kit.modulos.qtd} × ${kit.modulos.wp_unitario} Wp (${kit.modulos.total_wp} Wp)</td></tr>
      <tr><td class="k">Inversor WEG</td><td class="v">${escapeHtml(kit.inversor.modelo)}</td></tr>
      <tr><td class="k">Estrutura</td><td class="v">${escapeHtml(kit.estrutura)}</td></tr>
      ${kit.vazao_estimada > 0 ? `<tr><td class="k">Vazão estimada</td><td class="v">${kit.vazao_estimada} m³/h</td></tr>` : ''}
      ${kit.area_irrigavel > 0 ? `<tr><td class="k">Área irrigável</td><td class="v">${kit.area_irrigavel} ha</td></tr>` : ''}
      <tr><td class="k">IrrigaBox</td><td class="v">✓ Inclusa (sempre)</td></tr>
    </table>

    <div class="valor">
      <div class="label">Investimento turn-key calculado</div>
      <div class="num">${brl(kit.valorBase)}</div>
    </div>
  </div>

  <div class="section">
    <h2>// Mensagem pronta pra colar no WhatsApp</h2>
    <pre class="msg">${escapeHtml(mensagemPraColar)}</pre>
    <p class="meta">Confira o cálculo antes de enviar. Edita o que precisar e cola na conversa do cliente.</p>
  </div>

  <div class="section">
    <p class="meta">Lead ID: ${escapeHtml(ctx.leadId)} · Gerado por irrigasolar.com.br/configurador</p>
  </div>
</div>
</body>
</html>`;
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
