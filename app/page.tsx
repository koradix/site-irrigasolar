import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { TrustBar } from '@/components/marketing/TrustBar';
import { ProblemSection } from '@/components/marketing/ProblemSection';
import { SolutionsSection } from '@/components/marketing/SolutionsSection';
import { ArchitectureSection } from '@/components/marketing/ArchitectureSection';
import { ApplicationsSection } from '@/components/marketing/ApplicationsSection';
import { ProcessSection } from '@/components/marketing/ProcessSection';
import { PortfolioSection } from '@/components/marketing/PortfolioSection';
import { EngineeringSection } from '@/components/marketing/EngineeringSection';
import { FaqSection } from '@/components/marketing/FaqSection';
import { FinalCta } from '@/components/marketing/FinalCta';
import { faqForPage } from '@/content/site';

export const metadata: Metadata = {
  title: 'Irrigasolar Engenharia | BESS, Energia Solar e Irrigação para o Agro',
  description:
    'Projetamos e integramos sistemas de energia para operações críticas do agronegócio: armazenamento em baterias (BESS), energia solar, rede e geradores.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Irrigasolar Engenharia"
        title="Energia confiável para o agro não parar."
        subtitle="Projetos de armazenamento em baterias, energia solar e irrigação off-grid para proteger operações críticas, reduzir custos e ampliar a autonomia no campo."
        primaryCta={{ label: 'Solicitar diagnóstico energético', href: '/diagnostico' }}
        secondaryCta={{ label: 'Conhecer as soluções', href: '/#solucoes' }}
        microcopy="Análise inicial por especialista. Cada projeto é dimensionado para a realidade da operação."
      />
      <TrustBar />
      <ProblemSection />
      <SolutionsSection />
      <ArchitectureSection />
      <ApplicationsSection />
      <ProcessSection />
      <PortfolioSection />
      <EngineeringSection />
      <FaqSection items={faqForPage('home')} />
      <FinalCta />
    </>
  );
}
