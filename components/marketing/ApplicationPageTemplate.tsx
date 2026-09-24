import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { FinalCta } from '@/components/marketing/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export interface ApplicationPageContent {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  challenge: { heading: string; body: string };
  approach: { heading: string; body: string; points: string[] };
  considerations: { heading: string; body: string };
}

/**
 * Template compartilhado pelas páginas /aplicacoes/* — cada página passa
 * apenas o conteúdo específico do segmento, sem duplicar estrutura/JSX.
 */
export function ApplicationPageTemplate({ content }: { content: ApplicationPageContent }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Início', path: '/' },
          { name: 'Aplicações', path: '/#aplicacoes' },
          { name: content.title, path: `/aplicacoes/${content.slug}` },
        ])}
      />

      <Hero
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        primaryCta={{ label: 'Solicitar diagnóstico energético', href: '/diagnostico' }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>O desafio</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              {content.challenge.heading}
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">{content.challenge.body}</p>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Como a engenharia aborda</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              {content.approach.heading}
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">{content.approach.body}</p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.approach.points.map((point) => (
              <li key={point} className="rounded-sm border border-rule bg-paper p-4 text-[15px] text-graphite/80">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>O que considerar</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              {content.considerations.heading}
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">{content.considerations.body}</p>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
