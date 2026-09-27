import { Section } from '@/components/ui/Section';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { whatsappLinkWith } from '@/lib/contato';

interface FinalCtaProps {
  title?: string;
  subtitle?: string;
}

export function FinalCta({
  title = 'Sua operação precisa de energia previsível.',
  subtitle = 'Análise inicial por especialista. Cada projeto é dimensionado para a realidade da operação.',
}: FinalCtaProps) {
  const wa = whatsappLinkWith('Olá! Quero solicitar um diagnóstico energético para minha operação.');

  return (
    <Section tone="forest">
      <div className="mx-auto max-w-content px-5 text-center md:px-8 lg:px-12">
        <SerifHeading as="h2" size="xl" className="mx-auto max-w-2xl text-paper">
          {title}
        </SerifHeading>
        <p className="mx-auto mt-4 max-w-xl text-sand/80">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/diagnostico" variant="copper" className="w-full sm:w-auto">
            Solicitar estudo para minha operação
          </LinkButton>
          <LinkButton href={wa} variant="inverse" external className="w-full sm:w-auto">
            Falar com a equipe no WhatsApp
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
