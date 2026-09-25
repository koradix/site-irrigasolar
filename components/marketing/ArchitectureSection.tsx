import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export function ArchitectureSection() {
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Como o sistema funciona</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            Rede, solar, bateria e gerador — integrados por um único sistema de gestão.
          </SerifHeading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="rounded-sm border border-rule bg-paper p-6 md:p-10">
            <ArchitectureDiagram />
          </div>

          <div className="flex items-center gap-4 lg:w-52 lg:flex-col lg:gap-3 lg:text-center">
            <div className="relative h-24 w-24 shrink-0 lg:h-32 lg:w-32">
              <Image
                src="/mascote.webp"
                alt="Mascote Irrigasolar"
                fill
                sizes="(min-width: 1024px) 128px, 96px"
                className="object-contain"
              />
            </div>
            <p className="rounded-sm border border-rule bg-paper px-4 py-3 text-sm leading-relaxed text-graphite/75">
              Não precisa decorar as siglas — a engenharia explica cada parte no diagnóstico.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
