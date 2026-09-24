import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Irrigasolar',
    description: 'Engenharia de energia para o agronegócio: BESS, solar e irrigação off-grid.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFBF7',
    theme_color: '#10271D',
    icons: [{ src: '/icon.png', sizes: '32x32', type: 'image/png' }],
  };
}
