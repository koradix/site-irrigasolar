import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { OrcamentoForm } from '@/components/orcamento/OrcamentoForm';

export const metadata: Metadata = {
  title: 'Pedir orçamento',
  description:
    'Envie os dados da sua operação e receba uma proposta de engenharia para bombeamento solar ou BESS — sem orçamento automático.',
  alternates: { canonical: '/orcamento' },
};

interface PageProps {
  searchParams: { atividade?: string };
}

export default function OrcamentoPage({ searchParams }: PageProps) {
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Pedido de orçamento</Eyebrow>
          <SerifHeading as="h1" size="xl" className="mt-4">
            A proposta é feita com os dados que você enviar.
          </SerifHeading>
          <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
            Quanto mais claros, mais precisa ela fica — e menos idas e vindas. Leva cerca de 3 minutos. O envio não gera
            orçamento automático nem substitui o estudo técnico do projeto.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <OrcamentoForm atividadeInicial={searchParams.atividade} />
        </div>
      </div>
    </Section>
  );
}
