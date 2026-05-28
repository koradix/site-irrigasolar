'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Kicker } from '@/components/brand/Kicker';
import { StepNumbers } from './StepNumbers';
import { PreviaKit } from './PreviaKit';
import { Step0Contato } from './steps/Step0Contato';
import { Step1Aplicacao } from './steps/Step1Aplicacao';
import { Step2Dimensao } from './steps/Step2Dimensao';
import { Step3Urgencia } from './steps/Step3Urgencia';
import { Step4Confirmacao } from './steps/Step4Confirmacao';
import { STEP_LABELS, type ConfiguradorData } from '@/lib/configurador-schema';

const TOTAL_STEPS = STEP_LABELS.length;

export function Configurador() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ConfiguradorData>({});

  const update = useCallback((patch: Partial<ConfiguradorData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const jump = useCallback((i: number) => setStep(i), []);

  return (
    <section id="configurador" className="bg-paper border-y border-rule/50 py-20 md:py-28">
      <Container>
        <div className="max-w-2xl mb-12 md:mb-16">
          <Kicker>CONFIGURE SEU KIT EM 90 SEGUNDOS</Kicker>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep mt-4 leading-[1.05] tracking-tight">
            Monte seu kit Irrigasolar.
          </h2>
          <p className="text-ink-soft text-lg mt-4 max-w-xl">
            Sem cadastro chato. A engenharia revisa e a proposta cai no seu WhatsApp em até 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
          {/* LEFT: numbers + form */}
          <div className="flex gap-6 md:gap-10">
            <div className="hidden lg:block shrink-0 w-[120px]">
              <StepNumbers current={step} total={TOTAL_STEPS} onJump={jump} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Mobile/tablet step indicator */}
              <div className="lg:hidden mb-6">
                <StepNumbers current={step} total={TOTAL_STEPS} onJump={jump} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 && <Step0Contato data={data} update={update} onNext={next} />}
                  {step === 1 && (
                    <Step1Aplicacao data={data} update={update} onNext={next} onBack={back} />
                  )}
                  {step === 2 && (
                    <Step2Dimensao data={data} update={update} onNext={next} onBack={back} />
                  )}
                  {step === 3 && (
                    <Step3Urgencia data={data} update={update} onNext={next} onBack={back} />
                  )}
                  {step === 4 && <Step4Confirmacao data={data} onBack={back} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: preview */}
          <div>
            <PreviaKit data={data} step={step} />
          </div>
        </div>
      </Container>
    </section>
  );
}
