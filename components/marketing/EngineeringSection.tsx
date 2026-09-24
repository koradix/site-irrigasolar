import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';
import { GaugeIcon, GridIcon, ShieldIcon, GeneratorIcon, BoxIcon, CheckIcon } from '@/components/ui/icons';

const TOPICS = [
  { icon: GaugeIcon, title: 'Dimensionamento por curva de carga', body: 'O projeto parte do levantamento real de consumo e potência de partida — não de estimativas genéricas.' },
  { icon: GridIcon, title: 'Integração elétrica e de controle', body: 'Rede, solar, BESS e gerador coordenados por lógica de controle e proteção dedicada.' },
  { icon: ShieldIcon, title: 'Proteção e monitoramento', body: 'Dispositivos de proteção elétrica e monitoramento definidos conforme o equipamento efetivamente especificado em projeto.' },
  { icon: GeneratorIcon, title: 'Estratégia operacional', body: 'Regras de operação definidas para cada fonte de energia, priorizando as cargas críticas da operação.' },
  { icon: CheckIcon, title: 'Implantação e comissionamento', body: 'Instalação e testes de comissionamento antes da entrada em operação do sistema.' },
  { icon: BoxIcon, title: 'Manutenção e suporte', body: 'Acompanhamento e manutenção conforme o contrato de O&M firmado com cada cliente.' },
];

export function EngineeringSection() {
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Engenharia, segurança e suporte</Eyebrow>
            <SerifHeading as="h2" size="lg" className="mt-4">
              Cada decisão técnica é justificada pelo projeto, não por padrão de mercado.
            </SerifHeading>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-forest/10">
            <Image
              src="/assets/visuals/engenharia-campo.webp"
              alt="Visual conceitual de engenheiros avaliando uma instalação de energia solar no campo"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-sm border border-rule bg-paper p-6">
              <t.icon className="h-6 w-6 text-copper" />
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite/75">{t.body}</p>
            </div>
          ))}
        </div>

        <IrrigaBoxNote />
      </div>
    </Section>
  );
}

/**
 * Bloco compacto do IrrigaBox — coadjuvante técnico, sem hero, sem
 * competir com BESS/off-grid/projetos. Apenas o que é comprovadamente
 * oferecido hoje: proteção e organização do quadro elétrico.
 */
function IrrigaBoxNote() {
  return (
    <div className="mt-10 flex flex-col gap-4 rounded-sm border border-rule bg-paper p-6 md:flex-row md:items-center md:gap-8">
      <div className="shrink-0">
        <BoxIcon className="h-8 w-8 text-copper" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-forest">
          IrrigaBox — proteção e organização para sistemas no campo
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-graphite/75">
          Tecnologia complementar aplicada quando o projeto exige proteção, comando e montagem
          adequada dos equipamentos elétricos — não é um produto de monitoramento remoto nem
          substitui o dimensionamento de BESS ou solar.
        </p>
      </div>
    </div>
  );
}
