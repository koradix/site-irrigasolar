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
        <div className="mt-12 rounded-sm border border-rule bg-paper p-6 md:p-10">
          <ArchitectureDiagram />
        </div>
      </div>
    </Section>
  );
}
