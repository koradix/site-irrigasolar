import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-deep': 'var(--ink-deep)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        ocher: 'var(--ocher)',
        'ocher-dark': 'var(--ocher-dark)',
        terra: 'var(--terra)',
        'terra-deep': 'var(--terra-deep)',
        green: 'var(--green)',
        cream: 'var(--cream)',
        paper: 'var(--paper)',
        rule: 'var(--rule)',
      },
      fontFamily: {
        headline: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        label: ['"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
