import type { Metadata } from 'next';
import Image from 'next/image';
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <Eyebrow>Solicitação de estudo</Eyebrow>
            <SerifHeading as="h1" size="xl" className="mt-4">
              Vamos entender sua operação antes de falar de equipamento.
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
              Conte sobre sua operação, o problema de energia e a infraestrutura existente em cinco
              etapas, seguidas da revisão das respostas. Essas informações orientam a avaliação
              inicial da engenharia e os próximos passos. O envio não gera orçamento automático
              nem substitui o estudo técnico do projeto.
            </p>
          </div>

          <div className="flex items-end gap-4 lg:w-64 lg:shrink-0 lg:flex-col lg:items-center lg:gap-3">
            <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
              <Image
                src="/mascote.webp"
                alt="Mascote Irrigasolar"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <p className="rounded-sm border border-rule bg-paper px-4 py-3 text-sm leading-relaxed text-graphite/80 lg:text-center">
              Só leva alguns minutos — a engenharia revisa cada resposta antes de falar com você.
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <DiagnosticoForm />
        </div>
      </div>
    </Section>
  );
}
