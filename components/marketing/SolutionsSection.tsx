import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { BatteryIcon, SunIcon, DropletIcon, ArrowRightIcon } from '@/components/ui/icons';
import { solutions } from '@/content/site';

const ICONS = { battery: BatteryIcon, sun: SunIcon, droplet: DropletIcon };

export function SolutionsSection() {
  return (
    <Section tone="paper" id="solucoes">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Soluções</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            Engenharia de energia para operações que não podem parar.
          </SerifHeading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Link
                key={s.slug}
                href={s.href}
                className={
                  s.featured
                    ? 'group flex flex-col rounded-sm border-2 border-forest bg-forest p-8 text-paper transition-colors lg:col-span-2'
                    : 'group flex flex-col rounded-sm border border-rule bg-paper p-8 transition-colors hover:border-forest'
                }
              >
                <Icon className={s.featured ? 'h-9 w-9 text-copper' : 'h-9 w-9 text-copper'} />
                <h3
                  className={
                    'mt-5 font-display text-2xl font-semibold ' + (s.featured ? 'text-paper' : 'text-forest')
                  }
                >
                  {s.name}
                </h3>
                <p className={'mt-2 text-[15px] leading-relaxed ' + (s.featured ? 'text-sand/85' : 'text-graphite/75')}>
                  {s.tagline}
                </p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div>
                    <dt className={'font-semibold ' + (s.featured ? 'text-copper-text-inverse' : 'text-copper-text')}>Para quem</dt>
                    <dd className={s.featured ? 'text-sand/80' : 'text-graphite/70'}>{s.forWho}</dd>
                  </div>
                </dl>
                <span
                  className={
                    'mt-6 inline-flex items-center gap-2 text-sm font-semibold ' +
                    (s.featured ? 'text-paper' : 'text-forest')
                  }
                >
                  {s.nextStep}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
