import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { applications } from '@/content/site';

export function ApplicationsSection() {
  return (
    <Section tone="paper" id="aplicacoes">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Aplicações no agro</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            Cada cadeia produtiva tem uma exigência diferente de continuidade.
          </SerifHeading>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((a) => (
            <li key={a.slug}>
              <Link
                href={a.href}
                className="flex h-full flex-col rounded-sm border border-rule bg-sand p-6 transition-colors hover:border-forest"
              >
                <h3 className="font-display text-lg font-semibold text-forest">{a.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/75">{a.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
