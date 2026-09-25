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
        eyebrow={[project.segment, [project.city, project.state].filter(Boolean).join('/')].filter(Boolean).join(' · ')}
        title={project.title}
        subtitle={project.challenge}
        imageSrc={project.cover}
        imageAlt={project.cover ? project.title : undefined}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>O projeto</Eyebrow>
              <SerifHeading as="h2" size="md" className="mt-3">
                Energia no contexto da propriedade
              </SerifHeading>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite/80">{project.solution}</p>

              <Eyebrow className="mt-8 block">Detalhes da instalação</Eyebrow>
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
              <div className="grid content-start gap-6 sm:grid-cols-2">
                {project.gallery.map((src, index) => (
                  <figure key={src} className={index === 0 ? 'sm:col-span-2' : ''}>
                    <a href={src} target="_blank" rel="noreferrer" className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest" aria-label={`Ampliar fotografia ${index + 1} de ${project.title}`}>
                      <Image src={src} alt={`${project.title} — registro de campo ${index + 1}`} fill sizes={index === 0 ? '(min-width: 1024px) 45vw, 90vw' : '(min-width: 640px) 25vw, 90vw'} className="object-contain" />
                    </a>
                    <figcaption className="mt-2 text-xs leading-relaxed text-graphite/65">Registro de campo · Acervo Irrigasolar</figcaption>
                  </figure>
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
