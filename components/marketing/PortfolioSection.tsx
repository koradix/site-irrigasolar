import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/content/site';

export function PortfolioSection() {
  const featured = projects.slice(0, 3);

  return (
    <Section tone="paper">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow>Projetos</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4">
            Portfólio real, com escopo técnico verificável.
          </SerifHeading>
        </div>

        {featured.length > 0 ? (
          <>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {featured.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="mt-10">
              <LinkButton href="/projetos" variant="secondary">
                Ver todos os projetos
              </LinkButton>
            </div>
          </>
        ) : (
          <div className="mt-12 rounded-sm border border-rule bg-sand p-8 md:p-10 max-w-2xl">
            <p className="text-[15px] leading-relaxed text-graphite/80">
              Estamos organizando o portfólio com projetos reais, escopo técnico e resultado
              verificável de cada operação — sem estudos de caso genéricos. Enquanto isso, converse
              diretamente com a engenharia sobre o seu caso.
            </p>
            <div className="mt-6">
              <LinkButton href="/diagnostico" variant="primary">
                Falar com a engenharia
              </LinkButton>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
