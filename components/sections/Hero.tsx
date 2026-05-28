import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background: foto do produtor + placas solares */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/produtor-solar.png"
          alt="Produtor rural com placas solares ao fundo na propriedade"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[65%_center]"
        />
        {/* Overlay verde escuro (estética legacy: gradiente do escuro pro topo) */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              'linear-gradient(to top, rgba(15,26,18,0.95) 0%, rgba(15,26,18,0.55) 50%, rgba(15,26,18,0.25) 100%)',
          }}
        />
      </div>

      {/* Conteúdo */}
      <Container className="relative z-10 py-24 lg:py-0">
        <div className="max-w-2xl space-y-6">
          {/* Badge outlined ocher */}
          <span className="badge-outlined-ocher inline-block font-label uppercase tracking-[0.2em] text-[11px] font-bold px-3 py-1.5 rounded-sm">
            Parceiro Integrador WEG
          </span>

          {/* H1 — sans-serif bold (estética legacy) */}
          <h1 className="font-body font-bold text-white leading-[1.05] tracking-tight text-[40px] md:text-[56px] lg:text-[64px]">
            Sua próxima conta de energia
            <br className="hidden md:block" /> pode ser a última.
          </h1>

          {/* Subheadline */}
          <p className="text-cream/85 text-lg md:text-xl lg:text-[22px] leading-relaxed max-w-xl">
            Engenharia solar WEG para pivôs, poços e fazendas inteiras — kit montado na hora,
            proposta no seu WhatsApp.
          </p>

          {/* CTA com gradiente solar (estética legacy) */}
          <div className="pt-4">
            <a
              href="#configurador"
              className="solar-flare inline-flex items-center justify-center text-[#311400] font-body font-bold uppercase tracking-[0.15em] text-sm px-10 py-5 rounded-md shadow-lg active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ocher focus-visible:ring-offset-2 focus-visible:ring-offset-ink-deep"
            >
              Configurar meu kit
            </a>
          </div>

          {/* Microcopy italic ocre */}
          <p className="italic text-ocher text-sm md:text-[15px]">
            Leva 90 segundos · IrrigaBox<sup>®</sup> de monitoramento inclusa em todo kit
          </p>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
