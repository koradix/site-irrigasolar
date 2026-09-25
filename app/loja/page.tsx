import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Configurador } from '@/components/configurador/Configurador';

export const metadata: Metadata = {
  title: 'Loja — Configurador de kit solar',
  description:
    'Configure um kit solar Irrigasolar para poço, pivô ou fazenda e receba a proposta técnica pela engenharia.',
  alternates: { canonical: '/loja' },
  robots: { index: false, follow: false },
};

/**
 * Loja desativada temporariamente — foco comercial atual é 100% em
 * projeto/solução de engenharia (diagnóstico, BESS, off-grid). O código
 * do configurador de kit solar fica pronto aqui, só oculto: quando a loja
 * voltar a ficar no ar, basta trocar LOJA_HABILITADA para true (e devolver
 * o link no rodapé).
 */
const LOJA_HABILITADA = false;

/**
 * Canal secundário de venda direta de kit solar (catálogo WEG), separado da
 * frente institucional de engenharia (BESS, off-grid, projetos).
 */
export default function LojaPage() {
  if (!LOJA_HABILITADA) notFound();

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
