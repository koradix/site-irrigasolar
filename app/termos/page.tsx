import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { company } from '@/content/site';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Termos de uso do site da Irrigasolar Engenharia.',
  alternates: { canonical: '/termos' },
};

export default function TermosPage() {
  return (
    <Section tone="paper">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SerifHeading as="h1" size="xl">
            Termos de uso
          </SerifHeading>
          <p className="mt-4 text-sm text-graphite/60">Última atualização: setembro de 2026.</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-graphite/85">
            <section>
              <h2 className="font-display text-xl font-semibold text-forest">1. Sobre este site</h2>
              <p className="mt-3">
                Este site é mantido por {company.tradeName} para apresentar suas soluções de
                engenharia de energia (BESS, energia solar e irrigação off-grid) e para receber
                solicitações de diagnóstico e orçamento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">2. Natureza informativa do conteúdo</h2>
              <p className="mt-3">
                As informações técnicas publicadas (autonomia, economia, dimensionamento, prazos)
                têm caráter educativo e preliminar. Nenhum valor de economia, prazo de retorno ou
                autonomia é garantido sem estudo técnico específico da propriedade — os resultados
                dependem da curva de carga, do perfil tarifário, da operação e do dimensionamento
                final do projeto.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">3. Formulários e propostas</h2>
              <p className="mt-3">
                O envio de um formulário de diagnóstico ou configuração de kit não gera contrato
                nem obrigação de fornecimento — é uma solicitação de contato. Toda proposta
                comercial formal é enviada separadamente pela equipe de engenharia.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">4. Propriedade intelectual</h2>
              <p className="mt-3">
                Textos, identidade visual e materiais técnicos publicados neste site pertencem à{' '}
                {company.tradeName} e não podem ser reproduzidos sem autorização.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">5. Alterações</h2>
              <p className="mt-3">
                Estes termos podem ser atualizados para refletir mudanças no site ou na operação da
                empresa. A versão vigente é sempre a publicada nesta página.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Section>
  );
}
