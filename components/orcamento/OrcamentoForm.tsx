'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StepProgress } from './StepProgress';
import { Step1Precisamos } from './steps/Step1Precisamos';
import { Step2Energia } from './steps/Step2Energia';
import { Step3Motores } from './steps/Step3Motores';
import { Step4Dados } from './steps/Step4Dados';
import { ResultadoTriagem } from './ResultadoTriagem';
import { STEP_LABELS, type OrcamentoData, type Step4Values } from '@/lib/orcamento-schema';
import type { OrcamentoResponse } from '@/app/api/orcamento/route';
import type { TriagemOutput } from '@/lib/orcamento-triagem';
import { trackEvent } from '@/lib/analytics';

const RASCUNHO_KEY = 'irrigasolar-orcamento-rascunho';
const TOTAL_STEPS = STEP_LABELS.length;
const ETAPA_EVENTS = ['orcamento_etapa_1', 'orcamento_etapa_2', 'orcamento_etapa_3', 'orcamento_etapa_4'] as const;

function gerarPastaId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `p${Date.now()}${Math.random().toString(36).slice(2)}`;
  }
}

function lerRascunho(): OrcamentoData {
  try {
    const raw = localStorage.getItem(RASCUNHO_KEY);
    return raw ? (JSON.parse(raw) as OrcamentoData) : {};
  } catch {
    return {};
  }
}

interface Props {
  atividadeInicial?: string;
}

export function OrcamentoForm({ atividadeInicial }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OrcamentoData>({});
  const [pastaId] = useState(gerarPastaId);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{ pedidoId: string; triagem: TriagemOutput; whatsappUrl?: string } | null>(
    null,
  );
  const started = useRef(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rascunho = lerRascunho();
    setData((prev) => ({
      ...prev,
      ...rascunho,
      ...(atividadeInicial ? { atividade: atividadeInicial as OrcamentoData['atividade'] } : {}),
    }));
    if (!started.current) {
      started.current = true;
      trackEvent('orcamento_inicio');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resultado) return;
    try {
      localStorage.setItem(RASCUNHO_KEY, JSON.stringify(data));
    } catch {
      // Rascunho é conveniência — nunca deve quebrar o formulário.
    }
  }, [data, resultado]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, resultado]);

  const update = useCallback((patch: Partial<OrcamentoData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const next = useCallback(() => {
    setStep((s) => {
      trackEvent(ETAPA_EVENTS[s]);
      return Math.min(s + 1, TOTAL_STEPS - 1);
    });
  }, []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const jump = useCallback((i: number) => setStep(i), []);

  const onSubmitFinal = useCallback(
    async (values: Step4Values) => {
      const payload = { ...data, ...values };
      setSubmitting(true);
      setSubmitError(null);
      try {
        const res = await fetch('/api/orcamento', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as OrcamentoResponse;
        if (!json.success || !json.triagem || !json.pedidoId) {
          setSubmitError(json.error ?? 'Não foi possível enviar seu pedido. Tente novamente.');
          return;
        }
        trackEvent('orcamento_envio');
        trackEvent(`orcamento_resultado_${json.triagem.resultado.toLowerCase()}` as 'orcamento_resultado_a');
        try {
          localStorage.removeItem(RASCUNHO_KEY);
        } catch {
          // ok
        }
        setResultado({ pedidoId: json.pedidoId, triagem: json.triagem, whatsappUrl: json.whatsappUrl });
      } catch {
        setSubmitError('Falha de conexão. Verifique sua internet e tente novamente.');
      } finally {
        setSubmitting(false);
      }
    },
    [data],
  );

  if (resultado) {
    return (
      <div ref={headingRef} tabIndex={-1} className="outline-none">
        <ResultadoTriagem pedidoId={resultado.pedidoId} triagem={resultado.triagem} whatsappUrl={resultado.whatsappUrl} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StepProgress labels={STEP_LABELS} current={step} onJump={jump} />

      <div ref={headingRef} tabIndex={-1} className="rounded-sm border border-rule bg-paper p-6 outline-none md:p-8">
        {step === 0 && <Step1Precisamos data={data} update={update} onNext={next} />}
        {step === 1 && <Step2Energia data={data} update={update} pastaId={pastaId} onNext={next} onBack={back} />}
        {step === 2 && <Step3Motores data={data} update={update} pastaId={pastaId} onNext={next} onBack={back} />}
        {step === 3 && (
          <Step4Dados data={data} update={update} onSubmitFinal={onSubmitFinal} onBack={back} submitting={submitting} />
        )}
        {submitError && (
          <p role="alert" className="mt-4 text-sm font-medium text-[#b3261e]">
            {submitError}
          </p>
        )}
      </div>
    </div>
  );
}
