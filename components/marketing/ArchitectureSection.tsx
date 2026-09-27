import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export function ArchitectureSection() {
  return (
    <Section tone="paper" className="!pt-8 md:!pt-10 lg:!pt-12">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Como o sistema funciona</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            Rede, solar, bateria e gerador — integrados por um único sistema de gestão.
          </SerifHeading>
        </div>

        <div className="mt-12 overflow-hidden rounded-sm border border-rule bg-gradient-to-br from-sand via-paper to-sand/60 p-6 md:p-10">
          <ArchitectureDiagram />
        </div>
      </div>
    </Section>
  );
}
