import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/marketing/ProjectCard';
import { LinkButton } from '@/components/ui/LinkButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { projects } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Portfólio de projetos reais de BESS, energia solar e irrigação da Irrigasolar Engenharia.',
  alternates: { canonical: '/projetos' },
};

export default function ProjetosPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Projetos', path: '/projetos' }])} />

      <Hero
        eyebrow="Projetos"
        title="Portfólio real, sem estudo de caso genérico."
        subtitle="Cada projeto listado aqui tem escopo técnico, cliente e resultado verificáveis — nada de números ou depoimentos de exemplo."
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          {projects.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl rounded-sm border border-rule bg-sand p-8 md:p-10">
              <p className="text-[15px] leading-relaxed text-graphite/80">
                Ainda não publicamos projetos com autorização de uso de imagem e dados do cliente.
                Assim que os primeiros cases forem documentados, eles aparecerão aqui com escopo
                técnico, segmento, município e resultado comprovado. Enquanto isso, converse
                diretamente com a engenharia sobre a sua operação.
              </p>
              <div className="mt-6">
                <LinkButton href="/diagnostico">Falar com a engenharia</LinkButton>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
