import { Container } from '@/components/ui/Container';
import { Kicker } from '@/components/brand/Kicker';

export function Configurador() {
  return (
    <section id="configurador" className="bg-paper border-y border-rule/40 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <Kicker>EM CONSTRUÇÃO</Kicker>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-ink-deep">
            Configurador de Kit
          </h2>
          <p className="text-ink-soft text-lg">
            Em breve: monte seu kit em 90 segundos e receba a proposta no WhatsApp.
          </p>
        </div>
      </Container>
    </section>
  );
}
