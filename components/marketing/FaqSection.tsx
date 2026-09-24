import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/content/site';

export function FaqSection({ items, title = 'Perguntas frequentes' }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;

  return (
    <Section tone="paper" id="faq">
      <JsonLd data={faqSchema(items)} />
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            {title}
          </SerifHeading>
        </div>
        <div className="mt-10 max-w-3xl">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
