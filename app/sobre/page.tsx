import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { FinalCta } from '@/components/marketing/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { company, team, credentials } from '@/content/site';

export const metadata: Metadata = {
  title: 'Sobre a Irrigasolar Engenharia',
  description:
    'Conheça a Irrigasolar Engenharia: área de atuação, responsabilidade técnica e forma de trabalho em projetos de BESS, energia solar e irrigação para o agronegócio.',
  alternates: { canonical: '/sobre' },
};

export default function SobrePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Sobre', path: '/sobre' }])} />

      <Hero
        eyebrow="Sobre"
        title="Engenharia de energia aplicada à realidade do campo."
        subtitle="A Irrigasolar trabalha na interseção entre energia e produção agropecuária: entender a operação antes de especificar qualquer equipamento."
        imageSrc="/assets/visuals/engenharia-campo.webp"
        imageAlt="Visual conceitual de uma equipe de engenharia trabalhando em uma instalação de energia no campo"
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Área de atuação</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Onde atendemos hoje.
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
              {company.regionsServed.length > 0
                ? `Atendimento com base em ${company.regionsServed.join(', ')}. A logística de cada projeto é confirmada no diagnóstico inicial.`
                : 'A área de atendimento é confirmada no diagnóstico inicial de cada propriedade.'}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Responsabilidade técnica</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Equipe e engenharia responsável.
            </SerifHeading>
          </div>

          {team.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="rounded-sm border border-rule bg-paper p-6">
                  <h3 className="font-display text-lg font-semibold text-forest">{member.name}</h3>
                  <p className="mt-1 text-sm text-graphite/70">{member.role}</p>
                  {member.registration && (
                    <p className="mt-2 text-xs uppercase tracking-wide text-copper">{member.registration}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-graphite/80">
              A publicação de nomes, cargos e registros profissionais (CREA/ART) da equipe técnica
              está em preparação. Cada projeto é acompanhado por responsável técnico, informado
              formalmente na proposta de engenharia.
            </p>
          )}
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Credenciais e parcerias</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Só publicamos o que está documentado.
            </SerifHeading>
          </div>

          {credentials.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-4">
              {credentials.map((c) => (
                <li key={c.label} className="rounded-sm border border-rule bg-sand px-4 py-2 text-sm font-medium text-forest">
                  {c.label}
                  {c.issuer && <span className="text-graphite/50"> · {c.issuer}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-graphite/80">
              Certificações e parcerias com fabricantes serão publicadas aqui assim que houver
              documento comprobatório e autorização de uso da marca — evitamos anunciar qualquer
              selo ou parceria sem essa comprovação.
            </p>
          )}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
