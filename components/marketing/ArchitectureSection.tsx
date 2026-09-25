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

        <div className="mt-12 overflow-hidden rounded-sm border border-rule bg-gradient-to-br from-sand via-paper to-sand/60">
          <div className="p-6 md:p-10 md:pb-4">
            <ArchitectureDiagram />
          </div>

          <div className="flex items-end gap-4 px-6 pb-6 md:gap-6 md:px-10 md:pb-8">
            <div className="relative -mb-2 h-32 w-32 shrink-0 md:h-44 md:w-44">
              <Image
                src="/mascote.webp"
                alt="Mascote Irrigasolar"
                fill
                sizes="(min-width: 768px) 176px, 128px"
                className="object-contain object-bottom"
              />
            </div>
            <p className="relative mb-3 max-w-sm rounded-sm border border-rule/70 bg-paper/90 px-4 py-3 text-sm leading-relaxed text-graphite/80 before:absolute before:-left-2 before:bottom-3 before:h-3 before:w-3 before:rotate-45 before:border-b before:border-l before:border-rule/70 before:bg-paper/90">
              Não precisa decorar as siglas — a engenharia explica cada parte no diagnóstico.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
