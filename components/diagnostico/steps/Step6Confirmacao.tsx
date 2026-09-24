'use client';

import { useState } from 'react';
import {
  TIPO_OPERACAO_LABELS,
  PROBLEMA_LABELS,
  FAIXA_CONTA_LABELS,
  HORAS_AUTONOMIA_LABELS,
  diagnosticoApiSchema,
  type DiagnosticoData,
} from '@/lib/diagnostico-schema';
import type { DiagnosticoResponse } from '@/app/api/diagnostico/route';
import { trackEvent } from '@/lib/analytics';

interface Props {
  data: DiagnosticoData;
  onBack: () => void;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function Step6Confirmacao({ data, onBack }: Props) {
  const [state, setState] = useState<SubmitState>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit() {
    const parsed = diagnosticoApiSchema.safeParse(data);
    if (!parsed.success) {
      setState('error');
      setErrorMsg('Alguns dados obrigatórios estão faltando. Volte e revise as etapas anteriores.');
      return;
    }

    setState('loading');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const json: DiagnosticoResponse = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? 'Não foi possível enviar. Tente novamente.');
      }
      setWhatsappUrl(json.whatsappUrl ?? null);
      setState('success');
      trackEvent('diagnostico_submit', { tipoOperacao: parsed.data.tipoOperacao });
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Não foi possível enviar. Tente novamente.');
    }
  }

  if (state === 'success') {
    return (
      <div className="space-y-6" role="status">
        <header>
          <h2 className="font-display text-2xl font-semibold text-forest">Diagnóstico recebido</h2>
          <p className="mt-1.5 text-sm text-graphite/70">
            Registramos sua solicitação. Para agilizar, você também pode enviar o resumo direto no
            WhatsApp da nossa equipe.
          </p>
        </header>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-[#25D366] px-6 py-3 text-[15px] font-semibold text-forest hover:brightness-95"
          >
            Enviar resumo pelo WhatsApp
          </a>
        )}
        <p className="text-sm text-graphite/60">
          Um engenheiro avalia o caso e retorna com os próximos passos — sem orçamento automático.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Confirme os dados</h2>
        <p className="mt-1.5 text-sm text-graphite/70">Revise antes de enviar para a engenharia.</p>
      </header>

      <dl className="grid gap-x-6 gap-y-4 rounded-sm border border-rule bg-sand p-6 text-sm sm:grid-cols-2">
        <Item label="Operação" value={data.tipoOperacao ? TIPO_OPERACAO_LABELS[data.tipoOperacao] : '—'} />
        <Item label="Local" value={data.municipio && data.uf ? `${data.municipio}/${data.uf}` : '—'} />
        <Item
          label="Problemas"
          value={data.problemas?.length ? data.problemas.map((p) => PROBLEMA_LABELS[p]).join(', ') : '—'}
        />
        <Item label="Solar existente" value={data.possuiSolar === 'sim' ? 'Sim' : 'Não'} />
        <Item label="Gerador existente" value={data.possuiGerador === 'sim' ? 'Sim' : 'Não'} />
        <Item
          label="Faixa de conta mensal"
          value={data.faixaContaMensal ? FAIXA_CONTA_LABELS[data.faixaContaMensal] : '—'}
        />
        <Item
          label="Autonomia desejada"
          value={data.horasAutonomiaDesejada ? HORAS_AUTONOMIA_LABELS[data.horasAutonomiaDesejada] : '—'}
        />
        <Item label="Contato" value={data.nome && data.empresaFazenda ? `${data.nome} — ${data.empresaFazenda}` : '—'} />
        <Item label="Telefone" value={data.telefone ?? '—'} />
      </dl>

      {state === 'error' && errorMsg && (
        <p role="alert" className="rounded-sm border border-[#b3261e]/40 bg-[#b3261e]/5 px-4 py-3 text-sm font-medium text-[#b3261e]">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-rule px-6 py-3 text-[15px] font-semibold text-forest hover:border-forest sm:w-auto"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={state === 'loading'}
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-forest px-6 py-3 text-[15px] font-semibold text-paper hover:bg-forest-light disabled:opacity-60 sm:w-auto"
        >
          {state === 'loading' ? 'Enviando…' : 'Enviar diagnóstico'}
        </button>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-copper-text">{label}</dt>
      <dd className="mt-0.5 text-graphite">{value}</dd>
    </div>
  );
}
