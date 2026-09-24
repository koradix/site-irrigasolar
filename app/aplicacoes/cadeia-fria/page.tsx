import type { Metadata } from 'next';
import { ApplicationPageTemplate } from '@/components/marketing/ApplicationPageTemplate';

export const metadata: Metadata = {
  title: 'Energia para Câmaras Frias',
  description: 'Backup de cargas críticas para preservar temperatura e evitar perda de produto em câmaras frias.',
  alternates: { canonical: '/aplicacoes/cadeia-fria' },
};

export default function Page() {
  return (
    <ApplicationPageTemplate
      content={{
        slug: 'cadeia-fria',
        eyebrow: 'Aplicação',
        title: 'Câmaras frias',
        subtitle: 'Minutos sem refrigeração podem significar a perda de um lote inteiro de produto.',
        heroImage: '/assets/visuals/cadeia-fria-agro.webp',
        heroImageAlt: 'Visual conceitual de uma operação de cadeia fria agrícola com infraestrutura de energia',
        challenge: {
          heading: 'A temperatura não perdoa interrupção.',
          body: 'Câmaras frias e resfriadores dependem de energia contínua para manter a temperatura dentro da faixa segura. Uma queda de poucos minutos, dependendo da carga térmica e do isolamento, já pode comprometer o produto armazenado.',
        },
        approach: {
          heading: 'Resposta rápida para a carga crítica.',
          body: 'O projeto avalia o tempo de tolerância térmica da câmara (quanto tempo a temperatura se mantém segura sem energia) para dimensionar a resposta necessária do BESS e a integração com gerador, quando aplicável.',
          points: [
            'Levantamento da carga térmica e do tempo de tolerância da câmara',
            'Dimensionamento de BESS para resposta imediata a quedas de energia',
            'Integração com gerador para autonomia estendida',
            'Monitoramento da estratégia operacional definida em projeto',
          ],
        },
        considerations: {
          heading: 'Qualidade de energia também importa.',
          body: 'Além de quedas totais, variações de tensão podem afetar compressores e sistemas de refrigeração. Esse ponto é avaliado no diagnóstico técnico junto com a necessidade de autonomia.',
        },
      }}
    />
  );
}
