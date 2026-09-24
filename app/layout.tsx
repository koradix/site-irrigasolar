import type { Metadata } from 'next';
import { Source_Serif_4, Manrope } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { SITE_URL, SITE_NAME } from '@/content/site';
import './globals.css';

// Fontes: Source Serif 4 (títulos editoriais) + Manrope (interface, corpo,
// navegação e números) — combinação recomendada no prompt de reestruturação.
// Apenas os pesos usados são carregados, com display: swap.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
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
    <html lang="pt-BR" className={`${sourceSerif.variable} ${manrope.variable}`}>
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
