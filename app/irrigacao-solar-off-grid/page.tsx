import type { Metadata } from 'next';
import Image from 'next/image';
import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { FaqSection } from '@/components/marketing/FaqSection';
import { FinalCta } from '@/components/marketing/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { faqForPage } from '@/content/site';
import { DropletIcon, SunIcon, BatteryIcon, GaugeIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Irrigação Solar Off-grid e Bombeamento Solar',
  description:
    'Bombeamento solar off-grid para captação em poços, rios e represas — sem depender da rede elétrica, com reservação de água como estratégia de autonomia.',
  alternates: { canonical: '/irrigacao-solar-off-grid' },
};

const SYSTEMS = [
  {
    icon: SunIcon,
    title: 'Sistema direto',
    body: 'Bombeia enquanto há sol, para um reservatório. Mais simples e sem bateria — a autonomia vem da água já reservada.',
  },
  {
    icon: GaugeIcon,
    title: 'Sistema híbrido',
    body: 'Combina solar com rede ou gerador para complementar o bombeamento fora do horário solar, quando a operação exige.',
  },
  {
    icon: BatteryIcon,
    title: 'Sistema com bateria',
    body: 'Adiciona armazenamento para bombear em horários específicos ou manter pressão contínua — avaliado caso a caso.',
  },
];

const CAPTACOES = ['Poços artesianos e semiartesianos', 'Rios e córregos', 'Represas', 'Reservatórios e cisternas'];

const OFFGRID_VISUALS = [
  {
    src: '/assets/visuals/offgrid-poco-reservatorio.webp',
    title: 'Poço solar com reservação',
    description: 'Bombeamento durante o período solar para armazenar água e manter disponibilidade ao longo do dia.',
    alt: 'Visual conceitual de poço com bombeamento solar e reservatório elevado em propriedade rural',
  },
  {
    src: '/assets/visuals/offgrid-gotejamento-cafe.webp',
    title: 'Irrigação localizada',
    description: 'Energia solar aplicada ao bombeamento e gotejamento em culturas de maior valor agregado.',
    alt: 'Visual conceitual de irrigação por gotejamento e bombeamento solar em cultivo de café',
  },
  {
    src: '/assets/visuals/offgrid-pivo-solar.webp',
    title: 'Pivô com bombeamento solar',
    description: 'Captação, reservação e geração fotovoltaica dimensionadas como um único sistema de produção.',
    alt: 'Visual conceitual de pivô irrigando uma lavoura com bombeamento solar off-grid',
  },
];

export default function OffGridPage() {
  const faq = faqForPage('offgrid');

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Irrigação Solar Off-grid', path: '/irrigacao-solar-off-grid' }])} />
      <JsonLd
        data={serviceSchema({
          name: 'Irrigação solar off-grid',
          description: 'Projeto de bombeamento solar para captação de água sem depender da rede elétrica.',
          path: '/irrigacao-solar-off-grid',
        })}
      />

      <Hero
        eyebrow="Irrigação Solar Off-grid"
        title="Bombeamento solar para captar água sem depender da rede."
        subtitle="Para propriedades sem rede confiável, o bombeamento solar aproveita a energia do sol para levar água a um reservatório — a própria reservação já funciona como estratégia de autonomia da operação."
        primaryCta={{ label: 'Solicitar avaliação técnica', href: '/diagnostico' }}
        secondaryCta={{ label: 'Ver tipos de sistema', href: '#sistemas' }}
        imageSrc="/assets/visuals/irrigacao-solar-offgrid.webp"
        imageAlt="Visual conceitual de bombeamento solar off-grid com reservatório e pivô de irrigação"
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Quando faz sentido</Eyebrow>
              <SerifHeading as="h2" size="lg" className="mt-4">
                Quando a rede está longe, fraca ou é cara demais para manter.
              </SerifHeading>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
                O bombeamento solar direto é indicado para propriedades distantes da rede elétrica
                ou com fornecimento instável, onde estender ou reforçar a rede tem custo elevado.
                A energia do sol substitui a energia da concessionária na captação — não é energia
                sem custo de implantação, mas reduz a dependência de conta de luz e de diesel para
                bombear água.
              </p>
            </div>
            <div>
              <Eyebrow>Reservação como autonomia</Eyebrow>
              <SerifHeading as="h2" size="lg" className="mt-4">
                A água reservada é a autonomia do sistema.
              </SerifHeading>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
                Como o sistema direto bombeia apenas enquanto há sol, o dimensionamento do
                reservatório é tão importante quanto o dimensionamento da bomba: é ele que garante
                água disponível durante a noite ou em dias de menor radiação solar.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Aplicações off-grid</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              A mesma fonte de energia, dimensionada para diferentes formas de irrigar.
            </SerifHeading>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {OFFGRID_VISUALS.map((visual) => (
              <figure key={visual.src} className="overflow-hidden rounded-sm border border-rule bg-sand">
                <div className="relative aspect-[3/2] overflow-hidden bg-forest/10">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="p-6">
                  <h3 className="font-display text-xl font-semibold text-forest">{visual.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite/75">{visual.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-graphite/55">
            Imagens conceituais. A configuração final depende do levantamento hidráulico, elétrico e da rotina de operação da propriedade.
          </p>
        </div>
      </Section>

      <Section tone="sand" id="sistemas">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Tipos de sistema</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Direto, híbrido ou com bateria — a escolha depende da operação.
            </SerifHeading>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SYSTEMS.map((s) => (
              <div key={s.title} className="rounded-sm border border-rule bg-paper p-6">
                <s.icon className="h-7 w-7 text-copper" />
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Pontos de captação</Eyebrow>
              <SerifHeading as="h2" size="lg" className="mt-4">
                Poço, rio, represa ou reservatório.
              </SerifHeading>
              <ul className="mt-5 space-y-2.5">
                {CAPTACOES.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[15px] text-graphite/80">
                    <DropletIcon className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <Eyebrow>Dimensionamento</Eyebrow>
              <SerifHeading as="h3" size="sm" className="mt-3">
                Hidráulico e elétrico andam juntos.
              </SerifHeading>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">
                A vazão necessária, a altura manométrica e a distância até o reservatório definem o
                dimensionamento hidráulico. A partir daí, a potência da bomba e do gerador
                fotovoltaico são calculadas para entregar essa vazão dentro da janela de sol
                disponível na região. Um dimensionamento incorreto de qualquer uma das duas partes
                compromete o sistema inteiro.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Limitações</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              O que o bombeamento solar direto não resolve sozinho.
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
              Em dias de baixa radiação solar a vazão cai proporcionalmente — por isso o
              reservatório precisa de folga sobre o consumo diário. Operações que exigem
              bombeamento contínuo à noite ou pressão constante independente do clima normalmente
              precisam de um sistema híbrido ou com bateria, avaliado no diagnóstico técnico.
            </p>
          </div>
        </div>
      </Section>

      <FaqSection items={faq} title="Perguntas frequentes sobre irrigação off-grid" />

      <FinalCta
        title="Vamos avaliar o seu ponto de captação?"
        subtitle="A avaliação técnica considera vazão necessária, altura manométrica e radiação solar disponível na sua região."
      />
    </>
  );
}
