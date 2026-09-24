'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { calcularKitVisual } from '@/lib/calcula-kit';
import type { ConfiguradorData } from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  step: number;
}

export function PreviaKit({ data, step }: Props) {
  const showPlaceholder = step < 1;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="relative bg-white border border-rule rounded-sm shadow-[0_4px_24px_rgba(15,26,18,0.08)] overflow-hidden">
        {showPlaceholder ? <Placeholder /> : <KitCard data={data} />}
      </div>
    </aside>
  );
}

function Placeholder() {
  return (
    <div className="p-8 md:p-10 flex flex-col items-center text-center gap-5 min-h-[420px] justify-center">
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-32 h-32 md:w-40 md:h-40"
      >
        <Image
          src="/mascote.webp"
          alt="Mascote Irrigasolar"
          fill
          sizes="160px"
          className="object-contain"
        />
      </motion.div>
      <p className="font-label uppercase tracking-[0.18em] text-xs text-ocher-dark font-bold">
        {'// Aguarde'}
      </p>
      <h4 className="font-headline text-2xl md:text-3xl font-semibold text-ink-deep leading-tight max-w-xs">
        Vamos montar seu kit em 90 segundos
      </h4>
    </div>
  );
}

function KitCard({ data }: { data: ConfiguradorData }) {
  const kit = calcularKitVisual(data);

  return (
    <div>
      {/* Header */}
      <header className="px-6 md:px-7 pt-6 pb-5 border-b border-rule space-y-2">
        <span className="font-label uppercase tracking-[0.2em] text-[11px] font-bold text-ocher-dark">
          {kit.aplicacao}
        </span>
        <h3 className="font-headline text-3xl md:text-4xl font-semibold text-ink-deep leading-tight">
          Seu Kit Irrigasolar
        </h3>
        <p className="italic text-ink-soft text-sm">
          Engenharia WEG · IrrigaBox<sup>®</sup> inclusa
        </p>
      </header>

      {/* Ficha do inversor selecionado (sem foto — modelo real confirmado na proposta) */}
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-cream border-b border-rule px-6 text-center">
        <span className="font-label uppercase tracking-[0.15em] text-[11px] font-bold text-ink-soft">
          Inversor selecionado
        </span>
        <span className="font-headline text-2xl font-semibold text-ink-deep">
          {kit.inversor.modelo}
        </span>
      </div>

      {/* Ficha técnica */}
      <dl className="px-6 md:px-7 py-5 grid grid-cols-2 gap-x-6 gap-y-3 border-b border-rule">
        <Spec k="Aplicação" v={kit.aplicacao} />
        <Spec
          k="Potência"
          v={
            kit.kwp ? (
              <>
                <CountUp value={kit.kwp} decimals={1} /> kWp
              </>
            ) : (
              'a dimensionar'
            )
          }
        />
        <Spec
          k="Módulos solares"
          v={
            kit.modulos.qtd ? (
              <>
                <CountUp value={kit.modulos.qtd} /> × {kit.modulos.wp_unitario} Wp
              </>
            ) : (
              'a dimensionar'
            )
          }
        />
        <Spec k="Inversor WEG" v={<AnimatedText value={kit.inversor.modelo} />} />
        <Spec k="Estrutura" v={kit.estrutura} />
        {kit.vazao_estimada > 0 && (
          <Spec
            k="Vazão estimada"
            v={
              <>
                <CountUp value={kit.vazao_estimada} /> m³/h
              </>
            }
          />
        )}
        {kit.area_irrigavel > 0 && (
          <Spec
            k="Área irrigável"
            v={
              <>
                <CountUp value={kit.area_irrigavel} decimals={1} /> ha
              </>
            }
          />
        )}
      </dl>

      {/* IrrigaBox box — destaque */}
      <div className="bg-ocher-dark/10 border-l-4 border-ocher px-5 py-4 mx-5 my-5 rounded-sm">
        <p className="font-bold text-ink-deep text-[14px] flex items-center gap-2">
          <span className="text-ocher-dark text-base" aria-hidden>
            ✓
          </span>
          IrrigaBox<sup>®</sup> inclusa em todo kit
        </p>
        <p className="text-ink-soft text-[12px] mt-1.5 leading-relaxed">
          Controle de temperatura · umidade · segurança operacional
        </p>
      </div>

      <p className="px-5 pb-5 text-right text-[11px] text-ink-soft/70">
        Garantia e condições de pagamento confirmadas pela engenharia na proposta.
      </p>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-label uppercase tracking-[0.12em] text-[10px] font-bold text-ink-soft">
        {k}
      </dt>
      <dd className="text-ink text-[14px] font-semibold tabular-nums">{v}</dd>
    </div>
  );
}

/** Animação suave de número (count-up) usando rAF */
function CountUp({
  value,
  duration = 450,
  decimals = 0,
}: {
  value: number;
  duration?: number;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    if (start === end) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (end - start) * eased;
      setDisplay(v);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        prev.current = end;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display.toFixed(decimals)}</>;
}

/** Fade rápido pra valores textuais quando mudam (ex: "15 CV" → "22 CV") */
function AnimatedText({ value }: { value: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
}
