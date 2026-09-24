import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { ApplicationsSection } from '@/components/marketing/ApplicationsSection';
import { ArchitectureSection } from '@/components/marketing/ArchitectureSection';
import { FaqSection } from '@/components/marketing/FaqSection';
import { FinalCta } from '@/components/marketing/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { faqForPage } from '@/content/site';
import { GaugeIcon, ShieldIcon, GridIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'BESS para o Agronegócio | Armazenamento de Energia',
  description:
    'BESS (Battery Energy Storage System) para operações críticas do agronegócio: continuidade produtiva, gestão de demanda e integração com solar, rede e gerador.',
  alternates: { canonical: '/bess-agronegocio' },
};

const PROBLEMS = [
  'Quedas de energia que interrompem irrigação, refrigeração ou ventilação em momentos críticos.',
  'Picos de demanda e custo elevado de ponta na tarifa de energia.',
  'Dependência de gerador a diesel como única alternativa de backup.',
  'Geração solar existente sem aproveitamento pleno fora do horário de sol.',
];

const SAFETY = [
  { icon: ShieldIcon, title: 'BMS (sistema de gerenciamento de bateria)', body: 'Monitora tensão, corrente e temperatura das células, protegendo contra sobrecarga e degradação prematura.' },
  { icon: GridIcon, title: 'EMS (sistema de gestão de energia)', body: 'Coordena o fluxo entre rede, solar, BESS e gerador conforme a estratégia operacional definida no projeto.' },
  { icon: GaugeIcon, title: 'Climatização e proteção elétrica', body: 'Ambiente de instalação e dispositivos de proteção dimensionados conforme o equipamento efetivamente especificado — variam por fabricante e projeto.' },
];

export default function BessPage() {
  const faq = faqForPage('bess');

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'BESS para o Agro', path: '/bess-agronegocio' }])} />
      <JsonLd
        data={serviceSchema({
          name: 'BESS para o agronegócio',
          description: 'Projeto e integração de sistemas de armazenamento de energia em baterias para operações críticas do agronegócio.',
          path: '/bess-agronegocio',
        })}
      />

      <Hero
        eyebrow="BESS para o Agro"
        title="Armazenamento de energia para operações que não podem parar."
        subtitle="BESS (Battery Energy Storage System) integra baterias, solar, rede e gerador para proteger cargas críticas, reduzir exposição a falhas de energia e dar mais previsibilidade à operação."
        primaryCta={{ label: 'Solicitar diagnóstico energético', href: '/diagnostico' }}
        secondaryCta={{ label: 'Ver aplicações no agro', href: '#aplicacoes' }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>O que é BESS</Eyebrow>
              <SerifHeading as="h2" size="lg" className="mt-4">
                Um sistema de armazenamento, não uma bateria grande.
              </SerifHeading>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
                BESS é um sistema completo: módulos de bateria, sistema de gerenciamento (BMS),
                inversor/conversor de potência, sistema de gestão de energia (EMS) e, quando
                necessário, climatização e proteção dedicadas. Ele armazena energia da rede e/ou
                da geração solar para entregá-la de volta quando a operação precisar — em uma
                queda de energia, em um pico de demanda ou fora do horário de geração solar.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">
                No agronegócio, o valor não está no equipamento em si, mas no que ele protege:
                continuidade produtiva, previsibilidade de custo e menos dependência de diesel.
              </p>
            </div>
            <div>
              <Eyebrow>Problemas que resolve</Eyebrow>
              <ul className="mt-4 space-y-3">
                {PROBLEMS.map((p) => (
                  <li key={p} className="rounded-sm border border-rule bg-sand p-4 text-[15px] leading-relaxed text-graphite/80">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Card>
              <Eyebrow>Potência × energia</Eyebrow>
              <SerifHeading as="h3" size="sm" className="mt-3">
                kW/MW não é o mesmo que kWh/MWh.
              </SerifHeading>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">
                <strong className="text-forest">Potência (kW ou MW)</strong> é o quanto de energia
                o sistema entrega em um instante — determina quantas e quais cargas críticas podem
                ser atendidas simultaneamente, incluindo a potência de partida de motores e bombas.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-graphite/80">
                <strong className="text-forest">Energia (kWh ou MWh)</strong> é o quanto o sistema
                consegue armazenar e entregar ao longo do tempo — determina a autonomia, ou seja,
                por quantas horas as cargas críticas continuam operando.
              </p>
            </Card>
            <Card>
              <Eyebrow>Autonomia e cargas críticas</Eyebrow>
              <SerifHeading as="h3" size="sm" className="mt-3">
                Autonomia é resultado do levantamento, não uma promessa fixa.
              </SerifHeading>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">
                O número de horas de autonomia depende de quais cargas são consideradas críticas,
                da potência de partida de cada equipamento e da energia realmente disponível no
                sistema. Por isso a abordagem mais comum isola as cargas críticas em um quadro
                dedicado — reduzindo o porte (e o custo) do BESS necessário.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <ApplicationsSection />

      <ArchitectureSection />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Gestão de demanda e continuidade</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Continuidade e controle de custo caminham juntos.
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
              Além de assumir cargas críticas em uma interrupção, um BESS bem projetado pode
              deslocar consumo para reduzir exposição a horários de tarifa mais cara ou a picos de
              demanda contratada — quando o perfil tarifário e a curva de carga da propriedade
              justificam essa estratégia. Essa avaliação é feita no estudo técnico-econômico, não
              prometida de forma genérica.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Segurança e vida útil</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Segurança não é genérica — depende do equipamento especificado.
            </SerifHeading>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY.map((s) => (
              <div key={s.title} className="rounded-sm border border-rule bg-paper p-6">
                <s.icon className="h-6 w-6 text-copper" />
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="forest">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow inverted>Processo</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4 text-paper">
              Estudo técnico-econômico antes de qualquer proposta fechada.
            </SerifHeading>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-2">
            <li className="rounded-sm border border-paper/15 p-6">
              <span className="font-display text-2xl font-semibold text-copper">01</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">Curva de carga e tarifa</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Levantamento do consumo real, demanda contratada e modalidade tarifária da
                propriedade.
              </p>
            </li>
            <li className="rounded-sm border border-paper/15 p-6">
              <span className="font-display text-2xl font-semibold text-copper">02</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">Simulação de cenários</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Comparação de cenários de potência e energia, estratégia operacional e integração
                com geração existente.
              </p>
            </li>
            <li className="rounded-sm border border-paper/15 p-6">
              <span className="font-display text-2xl font-semibold text-copper">03</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">Viabilidade técnico-econômica</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                CAPEX, OPEX estimado e riscos do projeto — sem prometer payback fixo antes do
                dimensionamento.
              </p>
            </li>
            <li className="rounded-sm border border-paper/15 p-6">
              <span className="font-display text-2xl font-semibold text-copper">04</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">Projeto e proposta técnica</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Especificação de equipamento, proteção e estratégia operacional documentadas na
                proposta.
              </p>
            </li>
          </ol>
        </div>
      </Section>

      <FaqSection items={faq} title="Perguntas frequentes sobre BESS" />

      <FinalCta />
    </>
  );
}
