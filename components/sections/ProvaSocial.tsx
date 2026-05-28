import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Kicker } from '@/components/brand/Kicker';
import { cases } from '@/lib/cases';

export function ProvaSocial() {
  return (
    <section id="prova-social" className="bg-paper py-24 md:py-32">
      <Container>
        <div className="max-w-2xl mb-14 md:mb-20">
          <Kicker>FAZENDAS QUE JÁ ZERARAM A CONTA</Kicker>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep mt-4 leading-[1.05] tracking-tight">
            Casos reais. Números reais.
          </h2>
        </div>

        {/* Grid desktop / scroll mobile */}
        <div className="-mx-5 md:mx-0">
          <ul className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-5 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cases.map((c) => (
              <li
                key={c.id}
                className="bg-white border border-rule rounded-sm shadow-[0_1px_3px_rgba(15,26,18,0.06)] shrink-0 w-[85%] md:w-auto snap-center flex flex-col"
              >
                {/* Foto */}
                <div className="relative aspect-[4/3] bg-ink-soft/10 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`Projeto Irrigasolar — ${c.cliente}, ${c.cidade}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 85vw"
                    className="object-cover"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                  <span className="font-label uppercase tracking-[0.2em] text-[11px] font-bold text-ocher-dark">
                    {c.tag}
                  </span>

                  <h3 className="font-headline text-2xl md:text-3xl font-semibold text-ink-deep leading-tight">
                    {c.economia}
                  </h3>

                  <p className="font-label text-xs tracking-wide text-ink-soft uppercase">
                    {c.tecnica}
                  </p>

                  <blockquote className="italic text-ink text-[15px] leading-relaxed border-l-2 border-ocher pl-4 mt-2">
                    “{c.citacao}”
                  </blockquote>

                  <footer className="text-sm text-ink-soft mt-auto pt-3 border-t border-rule/50">
                    {c.cliente} · {c.cidade} · {c.data}
                  </footer>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
