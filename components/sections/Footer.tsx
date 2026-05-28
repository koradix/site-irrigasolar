import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { WHATSAPP_LINK } from '@/lib/contato';

const navLinks = [
  { label: 'Bombeamento', href: '#bombeamento' },
  { label: 'Irrigação', href: '#irrigacao' },
  { label: 'IrrigaBox®', href: '#irrigabox' },
  { label: 'Casos reais', href: '#prova-social' },
  { label: 'Perguntas', href: '#faq' },
  { label: 'Configurar kit', href: '#configurador' },
];

export function Footer() {
  return (
    <footer className="bg-ink-deep text-cream">
      <Container className="py-20 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Coluna 1 — institucional */}
          <div className="space-y-5">
            <Image
              src="/assets/img/logo-irrigasolar-white.svg"
              alt="Irrigasolar"
              width={180}
              height={56}
              className="h-12 w-auto"
            />
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
              Engenharia solar WEG para o agronegócio brasileiro. Bombeamento, irrigação e
              monitoramento sob medida pra sua propriedade.
            </p>
            <div className="font-label text-xs tracking-wide text-cream/60 space-y-1 pt-2">
              <p>CNPJ 00.000.000/0001-00</p>
              <p>Av. das Lavouras, 000 · Centro · Ibitiba/BA</p>
              <p>CREA-BA · Engenharia certificada</p>
            </div>
          </div>

          {/* Coluna 2 — links rápidos */}
          <div className="space-y-5">
            <p className="font-label uppercase tracking-[0.18em] text-xs text-ocher">
              // NAVEGAÇÃO
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-cream/85 hover:text-ocher transition-colors text-[15px]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — fale com engenheiro */}
          <div className="space-y-5">
            <p className="font-label uppercase tracking-[0.18em] text-xs text-ocher">
              // FALE COM ENGENHEIRO
            </p>
            <p className="text-cream/85 text-[15px] leading-relaxed">
              Resposta em até 24h por engenheiro responsável. Sem call center, sem robô.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-ink-deep font-body font-bold tracking-wide px-6 py-4 rounded-sm transition-colors w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ocher focus-visible:ring-offset-2 focus-visible:ring-offset-ink-deep"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-1.001 3.656 3.98-.615z" />
              </svg>
              Falar com engenheiro agora
            </a>
          </div>
        </div>
      </Container>

      {/* Disclaimer */}
      <div className="border-t border-cream/10">
        <Container className="py-6">
          <p className="font-label text-[11px] tracking-wide text-cream/40 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Irrigasolar Engenharia. Todos os direitos reservados.
            IrrigaBox® é marca registrada. Especificações sujeitas a dimensionamento conforme demanda
            hídrica e condições da propriedade.
          </p>
        </Container>
      </div>
    </footer>
  );
}
