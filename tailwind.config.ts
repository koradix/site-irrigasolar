import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "engenharia premium aplicada ao agronegócio" — ver
        // app/globals.css para o racional de contraste WCAG AA de cada token.
        forest: 'var(--color-forest)',
        'forest-light': 'var(--color-forest-light)',
        sand: 'var(--color-sand)',
        paper: 'var(--color-paper)',
        graphite: 'var(--color-graphite)',
        copper: 'var(--color-copper)',
        'copper-text': 'var(--color-copper-text)',
        'copper-text-inverse': 'var(--color-copper-text-inverse)',
        solar: 'var(--color-solar)',
        rule: 'var(--color-rule)',
        // Alias retido para o fluxo /loja (configurador legado) — evita
        // reescrever aquele fluxo secundário só por causa da paleta.
        ink: 'var(--color-graphite)',

        // ---- Tokens legados usados exclusivamente por /loja (configurador
        // de kit solar) e pela tela /obrigado. Mantidos à parte da paleta
        // premium para não forçar reescrita de um fluxo secundário já
        // testado. Não usar em páginas novas.
        'ink-deep': 'var(--legacy-ink-deep)',
        'ink-soft': 'var(--legacy-ink-soft)',
        ocher: 'var(--legacy-ocher)',
        'ocher-dark': 'var(--legacy-ocher-dark)',
        terra: 'var(--legacy-terra)',
        'terra-deep': 'var(--legacy-terra-deep)',
        green: 'var(--legacy-green)',
        cream: 'var(--legacy-cream)',
      },
      fontFamily: {
        display: ['var(--font-source-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        // Legado — usado só pelo fluxo /loja (configurador) e /obrigado.
        headline: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        label: ['"Courier New"', 'Courier', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 39, 29, 0.06), 0 4px 16px rgba(16, 39, 29, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
