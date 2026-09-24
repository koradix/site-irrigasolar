'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StepProgress } from './StepProgress';
import { Step1Operacao } from './steps/Step1Operacao';
import { Step2Problema } from './steps/Step2Problema';
import { Step3Infraestrutura } from './steps/Step3Infraestrutura';
import { Step4Dimensao } from './steps/Step4Dimensao';
import { Step5Contato } from './steps/Step5Contato';
import { Step6Confirmacao } from './steps/Step6Confirmacao';
import { STEP_LABELS, type DiagnosticoData } from '@/lib/diagnostico-schema';
import { trackEvent } from '@/lib/analytics';

const TOTAL_STEPS = STEP_LABELS.length;

export function DiagnosticoForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DiagnosticoData>({});
  const started = useRef(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackEvent('diagnostico_start');
    }
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const update = useCallback((patch: Partial<DiagnosticoData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const next = useCallback(() => {
    setStep((s) => {
      trackEvent('diagnostico_step_complete', { step: s });
      return Math.min(s + 1, TOTAL_STEPS - 1);
    });
  }, []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const jump = useCallback((i: number) => setStep(i), []);

  return (
    <div className="space-y-8">
      <StepProgress current={step} onJump={jump} />

      {/* Foco move para o topo do passo a cada troca — navegação por teclado/leitor de tela. */}
      <div ref={headingRef} tabIndex={-1} className="rounded-sm border border-rule bg-paper p-6 outline-none md:p-8">
        {step === 0 && <Step1Operacao data={data} update={update} onNext={next} />}
        {step === 1 && <Step2Problema data={data} update={update} onNext={next} onBack={back} />}
        {step === 2 && <Step3Infraestrutura data={data} update={update} onNext={next} onBack={back} />}
        {step === 3 && <Step4Dimensao data={data} update={update} onNext={next} onBack={back} />}
        {step === 4 && <Step5Contato data={data} update={update} onNext={next} onBack={back} />}
        {step === 5 && <Step6Confirmacao data={data} onBack={back} />}
      </div>
    </div>
  );
}
