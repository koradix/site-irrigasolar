import type { Metadata } from 'next';
import { ApplicationPageTemplate } from '@/components/marketing/ApplicationPageTemplate';

export const metadata: Metadata = {
  title: 'Energia para Leite, Aves e Suínos',
  description: 'Continuidade de energia para ordenha, resfriamento, ventilação e climatização de granjas.',
  alternates: { canonical: '/aplicacoes/leite-aves-suinos' },
};

export default function Page() {
  return (
    <ApplicationPageTemplate
      content={{
        slug: 'leite-aves-suinos',
        eyebrow: 'Aplicação',
        title: 'Leite, aves e suínos',
        subtitle: 'Ordenha, resfriamento e climatização de granjas dependem de energia constante para não comprometer produção e bem-estar animal.',
        challenge: {
          heading: 'Ventilação e climatização são vitais, não conveniência.',
          body: 'Em granjas de aves e suínos, ventilação e climatização mantêm o ambiente dentro de limites seguros para os animais. Na pecuária leiteira, a interrupção da ordenha e do resfriamento do leite tem efeito direto sobre a produção e a qualidade do produto.',
        },
        approach: {
          heading: 'Resiliência para a rotina diária da granja.',
          body: 'O projeto identifica as cargas realmente vitais — ventilação, climatização, ordenha, resfriamento — e avalia a melhor combinação entre BESS, solar e gerador para garantir que essas cargas continuem operando.',
          points: [
            'Levantamento das cargas vitais por tipo de criação',
            'Estratégia de transição entre fontes até a entrada do gerador, quando houver',
            'Avaliação de geração solar para reduzir custo operacional contínuo',
            'Dimensionamento de resposta rápida para climatização crítica',
          ],
        },
        considerations: {
          heading: 'Cada tipo de criação tem uma tolerância diferente.',
          body: 'O tempo tolerável sem climatização ou resfriamento varia por espécie, fase de criação e condição climática local — por isso o dimensionamento é sempre específico para a operação, não um padrão genérico de mercado.',
        },
      }}
    />
  );
}
