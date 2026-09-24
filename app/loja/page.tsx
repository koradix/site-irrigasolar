import type { Metadata } from 'next';
import { Configurador } from '@/components/configurador/Configurador';

export const metadata: Metadata = {
  title: 'Loja — Configurador de kit solar',
  description:
    'Configure um kit solar Irrigasolar para poço, pivô ou fazenda e receba a proposta técnica pela engenharia.',
  alternates: { canonical: '/loja' },
  robots: { index: false, follow: true },
};

/**
 * Canal secundário de venda direta de kit solar (catálogo WEG), separado da
 * frente institucional de engenharia (BESS, off-grid, projetos). Acessível
 * apenas pelo link discreto no rodapé — não compete com o menu principal.
 */
export default function LojaPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-content px-5 pt-14 pb-2 md:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocher-dark">Loja</p>
        <h1 className="mt-3 font-headline text-3xl md:text-4xl font-semibold text-ink-deep">
          Configurador de kit solar
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Canal de venda direta de kit fotovoltaico para poço, pivô ou fazenda. Para projetos de
          continuidade energética (BESS) ou irrigação off-grid, use o{' '}
          <a href="/diagnostico" className="underline underline-offset-4 hover:text-ink-deep">
            diagnóstico de engenharia
          </a>
          .
        </p>
      </div>
      <Configurador />
    </div>
  );
}
