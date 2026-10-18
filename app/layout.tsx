import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { SITE_URL, SITE_NAME } from '@/content/site';
import './globals.css';

// Fontes: Archivo (títulos, condensada/semi-condensada) + IBM Plex Sans
// (interface, corpo, navegação) + IBM Plex Mono (números técnicos: CV, kVA,
// kW, m) — opção A aprovada pelo proprietário em 18/10/2026 para a web,
// substituindo Source Serif 4 + Manrope (mantidas como padrão canônico só
// para documentos/propostas, fora do escopo deste site). Apenas os pesos
// usados são carregados, com display: swap.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | BESS, Energia Solar e Irrigação para o Agro`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Engenharia de energia para operações críticas do agronegócio: armazenamento em baterias (BESS), energia solar e irrigação off-grid, projetados sob medida para cada propriedade.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Energia confiável para o agro não parar`,
    description:
      'Projetos de armazenamento em baterias, energia solar e irrigação off-grid para proteger operações críticas do agronegócio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Energia confiável para o agro não parar`,
    description:
      'Projetos de armazenamento em baterias, energia solar e irrigação off-grid para proteger operações críticas do agronegócio.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-graphite font-sans antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo-principal">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
