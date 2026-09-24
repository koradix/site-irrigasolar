import type { Metadata } from 'next';
import { ApplicationPageTemplate } from '@/components/marketing/ApplicationPageTemplate';

export const metadata: Metadata = {
  title: 'Energia para Pivôs, Bombas e Captação',
  description: 'Continuidade de energia para irrigação de alto valor: pivôs, bombas e captação de água.',
  alternates: { canonical: '/aplicacoes/irrigacao' },
};

export default function Page() {
  return (
    <ApplicationPageTemplate
      content={{
        slug: 'irrigacao',
        eyebrow: 'Aplicação',
        title: 'Pivôs, bombas e captação',
        subtitle: 'Irrigação de alto valor depende de energia disponível na janela certa — não no dia seguinte.',
        heroImage: '/assets/visuals/irrigacao-solar-offgrid.webp',
        heroImageAlt: 'Visual conceitual de irrigação, reservatório e bombeamento alimentados por energia solar',
        challenge: {
          heading: 'A janela de irrigação não espera a energia voltar.',
          body: 'Pivôs e bombas de captação têm potência de partida elevada e operam em janelas específicas do ciclo da cultura. Uma interrupção de energia nesse período pode comprometer o resultado da safra, não apenas a operação do dia.',
        },
        approach: {
          heading: 'Continuidade dimensionada para a carga de partida.',
          body: 'O projeto considera a potência de partida real do motor, a rotina de irrigação e a integração com solar e/ou gerador existentes, para decidir se BESS, bombeamento solar ou uma combinação dos dois é a resposta técnica adequada.',
          points: [
            'Levantamento da potência de partida e do ciclo de irrigação',
            'Avaliação de bombeamento solar direto quando não há rede confiável',
            'Dimensionamento de BESS para cargas críticas quando a rede é instável',
            'Integração com geração solar já existente na propriedade',
          ],
        },
        considerations: {
          heading: 'Nem toda irrigação precisa de bateria.',
          body: 'Em muitos casos, bombeamento solar direto com reservação de água já resolve a continuidade. BESS entra quando a operação exige irrigação em horários ou condições que o sistema direto não atende — essa avaliação é feita no diagnóstico técnico.',
        },
      }}
    />
  );
}
