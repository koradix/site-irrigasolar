import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const SITE_URL = 'https://irrigasolar.com.br';
const OG_IMAGE = '/images/og/irrigasolar.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Irrigasolar — Engenharia solar WEG para o agronegócio',
  description:
    'Engenharia solar WEG para o agronegócio: bombeamento solar, projetos de irrigação e soluções fotovoltaicas sob medida para o produtor brasileiro.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Irrigasolar',
    title: 'Irrigasolar — Engenharia solar WEG para o agronegócio',
    description:
      'Bombeamento solar, irrigação e energia fotovoltaica com engenharia WEG para o campo.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Irrigasolar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irrigasolar — Engenharia solar WEG para o agronegócio',
    description:
      'Bombeamento solar, irrigação e energia fotovoltaica com engenharia WEG para o campo.',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
