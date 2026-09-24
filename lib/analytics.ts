/**
 * Helper de analytics desacoplado. Empurra eventos para `window.dataLayer`
 * somente quando ele existir — o site funciona normalmente sem nenhuma
 * ferramenta de analytics configurada (nenhum ID fictício é usado aqui).
 */

export type AnalyticsEvent =
  | 'cta_diagnostico_click'
  | 'whatsapp_click'
  | 'diagnostico_start'
  | 'diagnostico_step_complete'
  | 'diagnostico_submit'
  | 'project_view'
  | 'solution_view';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    // Analytics nunca deve quebrar a navegação do usuário.
  }
}
