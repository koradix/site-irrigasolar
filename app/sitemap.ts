import type { MetadataRoute } from 'next';
import { SITE_URL, projects } from '@/content/site';

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/bess-agronegocio', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/irrigacao-solar-off-grid', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/engenharia', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/projetos', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/sobre', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/diagnostico', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/aplicacoes/irrigacao', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/aplicacoes/armazenagem-e-silos', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/aplicacoes/cadeia-fria', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/aplicacoes/leite-aves-suinos', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacidade', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/termos', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projetos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...projectEntries];
}
