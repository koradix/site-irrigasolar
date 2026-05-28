import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Kicker } from '@/components/brand/Kicker';

const features = [
  {
    icon: '🌡️',
    title: 'CONTROLE DE TEMPERATURA',
    body: 'Monitora aquecimento de bomba e inversor, alerta antes da falha.',
  },
  {
    icon: '💧',
    title: 'CONTROLE DE UMIDADE',
    body: 'Leitura em tempo real para decisão precisa de irrigação.',
  },
  {
    icon: '🛡️',
    title: 'SEGURANÇA OPERACIONAL',
    body: 'Detecta micro-anomalias; garantia de serviço estendida para 18 meses.',
  },
];

export function IrrigaBox() {
  return (
    <section id="irrigabox" className="bg-cream py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Imagem */}
          <div className="relative aspect-square lg:aspect-[4/5] bg-paper border border-rule rounded-sm overflow-hidden shadow-[0_2px_8px_rgba(15,26,18,0.08)]">
            <Image
              src="/assets/img/irrigabox-aberta.png"
              alt="IrrigaBox® — dispositivo de monitoramento e controle"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8"
            />
          </div>

          {/* Texto */}
          <div className="space-y-7">
            <div>
              <Kicker>INCLUSA EM TODO KIT IRRIGASOLAR</Kicker>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep mt-4 leading-[1.05] tracking-tight">
                IrrigaBox<sup className="text-2xl">®</sup>
                <br />
                controle total da sua operação
              </h2>
              <p className="text-ink-soft text-lg md:text-xl mt-5 leading-relaxed">
                Temperatura, umidade e segurança operacional monitorados 24h.
              </p>
            </div>

            {/* Pontos-chave */}
            <ul className="space-y-3">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="bg-white border border-rule rounded-sm p-5 flex gap-4 items-start"
                >
                  <span className="text-2xl shrink-0" aria-hidden>
                    {f.icon}
                  </span>
                  <div className="flex-1">
                    <p className="font-label text-[11px] font-bold tracking-[0.18em] text-ocher-dark uppercase">
                      {f.title}
                    </p>
                    <p className="text-ink text-[15px] mt-1.5 leading-relaxed">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Selo de garantia */}
            <div className="bg-ink-deep text-cream rounded-sm p-5 flex gap-4 items-start border-l-4 border-ocher">
              <span className="text-2xl shrink-0" aria-hidden>
                ✓
              </span>
              <p className="text-[15px] leading-relaxed">
                <span className="font-label uppercase tracking-[0.15em] text-ocher text-xs block mb-1">
                  Garantia
                </span>
                <span className="font-headline text-lg block">
                  10 anos no equipamento WEG + 18 meses de serviço estendido pela IrrigaBox®
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
