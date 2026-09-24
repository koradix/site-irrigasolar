import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { ProcessSection } from '@/components/marketing/ProcessSection';
import { EngineeringSection } from '@/components/marketing/EngineeringSection';
import { FinalCta } from '@/components/marketing/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Engenharia e Integração Energética para o Agro',
  description:
    'Método de engenharia da Irrigasolar: diagnóstico, levantamento de carga, estudo técnico-econômico, projeto, implantação, comissionamento e O&M.',
  alternates: { canonical: '/engenharia' },
};

export default function EngenhariaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Engenharia', path: '/engenharia' }])} />

      <Hero
        eyebrow="Engenharia"
        title="Projeto sob medida, da captação de dados à operação em campo."
        subtitle="Cada projeto — BESS, off-grid ou irrigação — segue o mesmo método: entender a operação real antes de especificar qualquer equipamento."
        primaryCta={{ label: 'Solicitar diagnóstico técnico', href: '/diagnostico' }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Projetos de irrigação e bombeamento</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Da captação à entrega de água na operação.
            </SerifHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite/80">
              Dimensionamento técnico da bomba, rede hidráulica e fonte de energia (rede, solar ou
              híbrida) a partir do levantamento real da propriedade — vazão necessária, altura
              manométrica, distância e perfil de uso. O projeto é entregue com escopo técnico
              documentado, não uma estimativa genérica.
            </p>
          </div>
        </div>
      </Section>

      <ProcessSection />
      <EngineeringSection />

      <FinalCta />
    </>
  );
}
