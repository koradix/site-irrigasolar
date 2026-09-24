import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/content/site';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-rule bg-paper transition-colors hover:border-forest"
    >
      {project.cover ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
          <Image
            src={project.cover}
            alt={`Projeto Irrigasolar em ${project.city}/${project.state} — ${project.segment}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] w-full bg-sand" aria-hidden />
      )}
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-copper-text">{project.segment}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-forest">{project.title}</h3>
        <p className="mt-1 text-sm text-graphite/60">
          {project.city}/{project.state}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-graphite/75 line-clamp-3">{project.challenge}</p>
      </div>
    </Link>
  );
}
