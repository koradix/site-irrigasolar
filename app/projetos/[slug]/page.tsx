import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { FinalCta } from '@/components/marketing/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { projects } from '@/content/site';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.challenge,
    alternates: { canonical: `/projetos/${project.slug}` },
  };
}

export default function ProjetoPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Início', path: '/' },
          { name: 'Projetos', path: '/projetos' },
          { name: project.title, path: `/projetos/${project.slug}` },
        ])}
      />

      <Hero
        eyebrow={`${project.segment} · ${project.city}/${project.state}`}
        title={project.title}
        subtitle={project.challenge}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Solução</Eyebrow>
              <SerifHeading as="h2" size="md" className="mt-3">
                O que foi projetado
              </SerifHeading>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">{project.solution}</p>

              <Eyebrow className="mt-8 block">Escopo técnico</Eyebrow>
              <ul className="mt-4 space-y-2">
                {project.scope.map((item) => (
                  <li key={item} className="text-[15px] text-graphite/80">
                    · {item}
                  </li>
                ))}
              </ul>

              {project.result && (
                <>
                  <Eyebrow className="mt-8 block">Resultado</Eyebrow>
                  <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">{project.result}</p>
                </>
              )}

              {project.testimonial && (
                <blockquote className="mt-8 border-l-2 border-copper pl-5 text-[15px] italic leading-relaxed text-graphite/80">
                  “{project.testimonial.quote}”
                  <footer className="mt-2 not-italic text-sm text-graphite/60">
                    {project.testimonial.author}
                    {project.testimonial.role ? ` — ${project.testimonial.role}` : ''}
                  </footer>
                </blockquote>
              )}
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-sm bg-sand">
                    <Image src={src} alt={`Galeria — ${project.title}`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
