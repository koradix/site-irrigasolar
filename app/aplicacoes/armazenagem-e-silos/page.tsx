import type { Metadata } from 'next';
import { ApplicationPageTemplate } from '@/components/marketing/ApplicationPageTemplate';

export const metadata: Metadata = {
  title: 'Energia para Silos, Secagem e Armazenagem',
  description: 'Continuidade de energia para ventilação, secagem e movimentação de grãos em silos e unidades de armazenagem.',
  alternates: { canonical: '/aplicacoes/armazenagem-e-silos' },
};

export default function Page() {
  return (
    <ApplicationPageTemplate
      content={{
        slug: 'armazenagem-e-silos',
        eyebrow: 'Aplicação',
        title: 'Silos, secagem e armazenagem',
        subtitle: 'Ventilação e secagem interrompidas no meio do processo colocam em risco o lote inteiro.',
        heroImage: '/assets/visuals/bess-silos-agro.webp',
        heroImageAlt: 'Visual conceitual de armazenagem de grãos integrada a BESS e geração solar',
        challenge: {
          heading: 'Um lote de grãos não espera a energia voltar.',
          body: 'Secadores e sistemas de ventilação de silos operam em ciclos contínuos. Uma parada durante a secagem ou a movimentação pode comprometer a qualidade e o valor de um lote armazenado.',
        },
        approach: {
          heading: 'Cargas críticas isoladas e priorizadas.',
          body: 'O projeto identifica quais equipamentos (ventilação, termometria, transportadores) são realmente críticos durante o ciclo de secagem e armazenagem, para dimensionar continuidade sem superdimensionar o investimento.',
          points: [
            'Levantamento do ciclo de secagem e da potência dos ventiladores',
            'Isolamento das cargas críticas em quadro dedicado',
            'Integração com gerador existente, quando houver',
            'Estratégia operacional para picos de demanda na safra',
          ],
        },
        considerations: {
          heading: 'Sazonalidade importa no dimensionamento.',
          body: 'A demanda de energia em silos costuma ser sazonal, concentrada na safra. Isso influencia diretamente a viabilidade econômica do projeto e é considerado no estudo técnico-econômico.',
        },
      }}
    />
  );
}
