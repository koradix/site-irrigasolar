import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { company } from '@/content/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Irrigasolar Engenharia coleta, usa e protege os dados enviados pelo site.',
  alternates: { canonical: '/privacidade' },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <Section tone="paper">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SerifHeading as="h1" size="xl">
            Política de privacidade
          </SerifHeading>
          <p className="mt-4 text-sm text-graphite/60">Última atualização: setembro de 2026.</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-graphite/85">
            <section>
              <h2 className="font-display text-xl font-semibold text-forest">1. Quais dados coletamos</h2>
              <p className="mt-3">
                Coletamos apenas os dados que você envia voluntariamente pelos formulários do
                site — diagnóstico energético e configurador de kit solar: nome, telefone/WhatsApp,
                e-mail (quando informado), empresa ou propriedade, município/UF e as respostas
                técnicas do formulário (tipo de operação, infraestrutura de energia existente e
                problema relatado). Não coletamos dados sensíveis e não usamos cookies de
                rastreamento de terceiros além do necessário para o funcionamento básico do site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">2. Para que usamos esses dados</h2>
              <p className="mt-3">
                Usamos os dados exclusivamente para: (a) entrar em contato sobre o diagnóstico ou
                orçamento solicitado, por WhatsApp, telefone ou e-mail; (b) elaborar propostas
                técnicas e comerciais; e (c) melhorar o atendimento. Não vendemos, alugamos ou
                compartilhamos seus dados com terceiros para fins de marketing de terceiros.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">3. Onde os dados ficam armazenados</h2>
              <p className="mt-3">
                Os dados enviados pelos formulários são armazenados em banco de dados
                (Supabase) com acesso restrito à equipe da Irrigasolar, e a comunicação de
                acompanhamento pode ocorrer via WhatsApp (WhatsApp Business/WAHA) e e-mail.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">4. Analytics</h2>
              <p className="mt-3">
                O site está preparado para registrar eventos de navegação (ex.: clique em
                &quot;Solicitar diagnóstico&quot;) por meio de uma camada de dados (
                <code>window.dataLayer</code>) somente quando uma ferramenta de analytics estiver
                efetivamente configurada. Nenhuma ferramenta de terceiros é carregada por padrão.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">5. Seus direitos (LGPD)</h2>
              <p className="mt-3">
                Você pode solicitar a qualquer momento a confirmação, o acesso, a correção ou a
                exclusão dos seus dados, pelos canais de contato informados no rodapé do site. Ao
                enviar um formulário, você consente com o uso descrito nesta política para fins de
                contato comercial.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-forest">6. Contato</h2>
              <p className="mt-3">
                Dúvidas sobre esta política podem ser enviadas pelo WhatsApp da{' '}
                {company.tradeName}
                {company.email ? (
                  <>
                    {' '}ou pelo e-mail <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>
                  </>
                ) : null}
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </Section>
  );
}
