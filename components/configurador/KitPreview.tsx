'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  APLICACAO_LABELS,
  type ConfiguradorData,
} from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  step: number;
}

export function KitPreview({ data, step }: Props) {
  const isPreContato = step === 0;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="bg-white border border-rule rounded-sm shadow-[0_4px_24px_rgba(15,26,18,0.08)] overflow-hidden">
        {isPreContato ? <PreContato /> : <KitCard data={data} />}
      </div>
    </aside>
  );
}

function PreContato() {
  return (
    <div className="p-8 md:p-10 flex flex-col items-center text-center gap-5 min-h-[420px] justify-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-32 h-32 md:w-40 md:h-40"
      >
        <Image
          src="/mascote.png"
          alt="Mascote Irrigasolar"
          fill
          sizes="160px"
          className="object-contain"
        />
      </motion.div>
      <p className="font-label uppercase tracking-[0.18em] text-xs text-ocher-dark font-bold">
        // Aguarde
      </p>
      <h4 className="font-headline text-2xl md:text-3xl font-semibold text-ink-deep leading-tight">
        Vamos montar seu kit
      </h4>
      <p className="text-ink-soft text-sm max-w-xs">
        Preencha os dados ao lado e veja seu kit Irrigasolar se desenhar em tempo real.
      </p>
    </div>
  );
}

function KitCard({ data }: { data: ConfiguradorData }) {
  return (
    <div>
      {/* Header */}
      <div className="bg-ink-deep text-cream px-6 py-4 flex items-center justify-between">
        <p className="font-label uppercase tracking-[0.18em] text-[11px] font-bold">
          // SEU KIT IRRIGASOLAR
        </p>
        {data.aplicacao && (
          <span className="bg-ocher text-ink-deep font-label uppercase tracking-[0.15em] text-[10px] font-bold px-2.5 py-1 rounded-sm">
            {APLICACAO_LABELS[data.aplicacao]}
          </span>
        )}
      </div>

      {/* Imagem inversor */}
      <div className="relative aspect-[4/3] bg-paper border-b border-rule">
        <Image
          src="/inversor-weg.png"
          alt="Inversor WEG"
          fill
          sizes="(min-width: 1024px) 35vw, 100vw"
          className="object-contain p-6"
        />
      </div>

      {/* Specs */}
      <dl className="px-6 py-5 space-y-2.5 border-b border-rule">
        <SpecRow k="Marca" v="WEG" />
        <SpecRow k="Modelo" v={inferModelo(data)} />
        <SpecRow k="Potência" v={inferPotencia(data)} />
        <SpecRow k="Placas" v={inferPlacas(data)} />
        <SpecRow k="Inversores" v={inferInversores(data)} />
      </dl>

      {/* IrrigaBox seal */}
      <div className="bg-cream px-6 py-4 border-b border-rule flex gap-3 items-start">
        <span className="text-ocher-dark text-lg font-bold shrink-0" aria-hidden>
          ✓
        </span>
        <p className="text-[13px] leading-snug text-ink">
          <span className="font-bold">IrrigaBox® de monitoramento</span> (temperatura, umidade,
          segurança) —{' '}
          <span className="font-label uppercase tracking-[0.1em] text-[11px] font-bold text-ocher-dark">
            INCLUSA
          </span>
        </p>
      </div>

      {/* Garantia WEG */}
      <div className="bg-ink-deep text-cream px-6 py-4 flex gap-3 items-center">
        <span className="text-ocher text-lg font-bold shrink-0" aria-hidden>
          ✓
        </span>
        <p className="text-[13px] leading-snug">
          <span className="font-label uppercase tracking-[0.15em] text-[10px] font-bold text-ocher block">
            GARANTIA WEG
          </span>
          10 anos no equipamento + 18 meses de serviço estendido
        </p>
      </div>
    </div>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 text-[13px]">
      <dt className="font-label uppercase tracking-[0.12em] text-[10px] font-bold text-ink-soft self-center">
        {k}
      </dt>
      <dd className="text-ink text-right font-medium">{v}</dd>
    </div>
  );
}

/* Heurísticas simples para preview — ajustar quando a engenharia validar */
function inferPotencia(d: ConfiguradorData): string {
  if (d.aplicacao === 'pivo' && d.pivoPotencia) return `${d.pivoPotencia} kWp`;
  if (d.aplicacao === 'poco' && d.pocoPotencia) return `${d.pocoPotencia} CV`;
  if (d.aplicacao === 'fazenda' && d.fazendaContaMensal) {
    const est = Math.round(d.fazendaContaMensal / 100);
    return `~${est} kWp`;
  }
  return 'a dimensionar';
}

function inferPlacas(d: ConfiguradorData): string {
  if (d.aplicacao === 'pivo' && d.pivoPotencia) return `${Math.round(d.pivoPotencia * 1.7)} unidades`;
  if (d.aplicacao === 'fazenda' && d.fazendaContaMensal)
    return `~${Math.round(d.fazendaContaMensal / 60)} unidades`;
  if (d.aplicacao === 'poco' && d.pocoPotencia) return `${Math.round(d.pocoPotencia * 1.5)} unidades`;
  return 'a dimensionar';
}

function inferInversores(d: ConfiguradorData): string {
  if (d.aplicacao === 'pivo' && d.pivoPotencia) return `${Math.max(1, Math.ceil(d.pivoPotencia / 15))} × WEG`;
  if (d.aplicacao === 'poco') return '1 × WEG CFW500';
  if (d.aplicacao === 'fazenda' && d.fazendaContaMensal)
    return `${Math.max(2, Math.ceil(d.fazendaContaMensal / 15000))} × WEG`;
  return 'a dimensionar';
}

function inferModelo(d: ConfiguradorData): string {
  switch (d.aplicacao) {
    case 'poco':
      return 'WEG CFW500 Solar';
    case 'pivo':
      return 'WEG SIW600 Trifásico';
    case 'fazenda':
      return 'WEG SIW700 + Híbrido';
    case 'multiplo':
      return 'WEG combinado';
    default:
      return 'a dimensionar';
  }
}
