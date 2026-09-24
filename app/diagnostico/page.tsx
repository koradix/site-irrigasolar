import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { DiagnosticoForm } from '@/components/diagnostico/DiagnosticoForm';

export const metadata: Metadata = {
  title: 'Diagnóstico energético',
  description:
    'Solicite um diagnóstico consultivo de continuidade energética para sua operação — sem orçamento automático.',
  alternates: { canonical: '/diagnostico' },
};

export default function DiagnosticoPage() {
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Diagnóstico</Eyebrow>
          <SerifHeading as="h1" size="xl" className="mt-4">
            Vamos entender sua operação antes de falar de equipamento.
          </SerifHeading>
          <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
            Seis perguntas rápidas sobre a operação, o problema de energia e a infraestrutura
            existente. Um engenheiro avalia o caso e retorna com os próximos passos — não geramos
            orçamento automático de BESS.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <DiagnosticoForm />
        </div>
      </div>
    </Section>
  );
}
