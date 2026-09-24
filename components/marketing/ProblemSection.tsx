import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { DropletIcon, SnowflakeIcon, BarnIcon, BoxIcon } from '@/components/ui/icons';

const SCENARIOS = [
  {
    icon: DropletIcon,
    title: 'Irrigação e bombeamento',
    body: 'Uma queda de energia na janela certa de irrigação compromete o ciclo da lavoura, não só o dia da parada.',
  },
  {
    icon: BoxIcon,
    title: 'Armazenagem e secagem',
    body: 'Ventilação e secagem de grãos param no meio do processo, colocando em risco o lote armazenado.',
  },
  {
    icon: SnowflakeIcon,
    title: 'Refrigeração e cadeia fria',
    body: 'Perda de temperatura em câmara fria ou resfriador afeta diretamente a qualidade do produto.',
  },
  {
    icon: BarnIcon,
    title: 'Granjas, ordenha e beneficiamento',
    body: 'Ventilação, climatização e ordenha dependem de energia contínua para não comprometer o bem-estar animal e a produção.',
  },
];

export function ProblemSection() {
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>O custo de parar</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            Quando a energia para, a produção continua perdendo.
          </SerifHeading>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s) => (
            <div key={s.title} className="rounded-sm border border-rule bg-paper p-6">
              <s.icon className="h-7 w-7 text-copper" />
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite/75">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
