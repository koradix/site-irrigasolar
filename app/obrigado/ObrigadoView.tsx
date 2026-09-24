'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { WHATSAPP_LINK } from '@/lib/contato';
import type { KitVisual } from '@/lib/calcula-kit';

interface ObrigadoContext {
  leadId?: string;
  nome?: string;
  whatsapp?: string;
  kit?: KitVisual;
}

export function ObrigadoView() {
  const [ctx, setCtx] = useState<ObrigadoContext | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('irrigasolar:obrigado');
      if (raw) setCtx(JSON.parse(raw) as ObrigadoContext);
      else setCtx({});
    } catch {
      setCtx({});
    }
  }, []);

  if (ctx === null) {
    return <div className="min-h-screen bg-paper" />;
  }

  const primeiroNome = ctx.nome?.trim().split(/\s+/)[0];
  const kit = ctx.kit;

  return (
    <main className="min-h-screen bg-paper py-20 md:py-28">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Mascote acenando */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ rotate: [-6, 12, -6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originY: 1, originX: 0.3 }}
              className="relative w-32 h-32 md:w-40 md:h-40"
            >
              <Image
                src="/mascote.webp"
                alt="Mascote Irrigasolar acenando"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <p className="font-label uppercase tracking-[0.2em] text-xs text-ocher-dark font-bold">
              {'// Recebido pela engenharia'}
            </p>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-ink-deep leading-[1.05]">
              {primeiroNome ? `Pronto, ${primeiroNome}!` : 'Pronto!'}
            </h1>
            <p className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Sua proposta com kit completo chega no WhatsApp em até{' '}
              <span className="text-ink-deep font-bold">10 minutos</span>.
            </p>
          </div>

          {/* Resumo do kit (sem preço) */}
          {kit && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-rule rounded-sm shadow-[0_2px_12px_rgba(15,26,18,0.06)] p-6 md:p-8 text-left"
            >
              <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-rule">
                <h2 className="font-headline text-2xl font-bold text-ink-deep">
                  Seu Kit Irrigasolar
                </h2>
                <span className="font-label uppercase tracking-[0.18em] text-[11px] font-bold text-ocher-dark">
                  {kit.aplicacao}
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                <Spec k="Potência" v={kit.kwp ? `${kit.kwp} kWp` : 'a dimensionar'} />
                <Spec
                  k="Módulos"
                  v={
                    kit.modulos.qtd
                      ? `${kit.modulos.qtd} × ${kit.modulos.wp_unitario} Wp`
                      : 'a dimensionar'
                  }
                />
                <Spec k="Inversor WEG" v={kit.inversor.modelo} />
                <Spec k="Estrutura" v={kit.estrutura} />
                {kit.vazao_estimada > 0 && (
                  <Spec k="Vazão estimada" v={`${kit.vazao_estimada} m³/h`} />
                )}
                {kit.area_irrigavel > 0 && (
                  <Spec k="Área irrigável" v={`${kit.area_irrigavel} ha`} />
                )}
              </dl>

              <div className="mt-5 pt-4 border-t border-rule bg-ocher-dark/10 border-l-4 border-ocher px-4 py-3 -mx-2">
                <p className="text-[13px] text-ink-deep font-bold">
                  ✓ IrrigaBox<sup>®</sup> inclusa · garantia e condições confirmadas na proposta
                </p>
              </div>
            </motion.div>
          )}

          {/* CTA WhatsApp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-ink-deep font-body font-bold tracking-wide px-8 py-4 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ocher focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-1.001 3.656 3.98-.615z" />
              </svg>
              Abrir conversa no WhatsApp agora
            </a>
            <p className="text-xs text-ink-soft/70">
              Quem responde é engenheiro responsável — sem call center.
            </p>
          </motion.div>

          <Link
            href="/"
            className="inline-block text-sm text-ink-soft hover:text-ink-deep underline underline-offset-4 transition-colors"
          >
            ← Voltar para o início
          </Link>
        </div>
      </Container>
    </main>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-label uppercase tracking-[0.12em] text-[10px] font-bold text-ink-soft">
        {k}
      </dt>
      <dd className="text-ink text-[14px] font-semibold tabular-nums">{v}</dd>
    </div>
  );
}
