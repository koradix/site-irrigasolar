'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { calcularKitVisual } from '@/lib/calcula-kit';
import {
  APLICACAO_LABELS,
  URGENCIA_LABELS,
  type ConfiguradorData,
} from '@/lib/configurador-schema';
import type { ConfiguradorResponse } from '@/types/lead';

interface Props {
  data: ConfiguradorData;
  onBack: () => void;
}

export function Step4Confirmacao({ data, onBack }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnviar() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/configurador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as ConfiguradorResponse;

      if (!res.ok || !body.success) {
        setError(body.error ?? 'Não foi possível enviar agora. Tente de novo.');
        setSubmitting(false);
        return;
      }

      // Guarda contexto pra /obrigado renderizar o resumo
      const kit = calcularKitVisual(data);
      sessionStorage.setItem(
        'irrigasolar:obrigado',
        JSON.stringify({
          leadId: body.leadId,
          nome: data.nome,
          whatsapp: data.whatsapp,
          kit,
        }),
      );

      router.push('/obrigado');
    } catch (err) {
      console.error(err);
      setError('Erro de rede. Verifique sua conexão e tente novamente.');
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h3 className="font-headline text-3xl md:text-4xl font-bold text-ink-deep leading-tight">
          Tudo certo, {data.nome}?
        </h3>
        <p className="italic text-ocher-dark text-base">
          Conferimos o resumo abaixo. Você clica e a gente assume daqui — proposta no seu WhatsApp em até 10 minutos.
        </p>
      </header>

      <dl className="bg-white border border-rule rounded-sm divide-y divide-rule">
        <Row label="Nome" value={`${data.nome ?? ''} ${data.sobrenome ?? ''}`} />
        <Row label="WhatsApp" value={data.whatsapp} />
        <Row label="Localização" value={`${data.cidade ?? '-'} / ${data.uf ?? '-'}`} />
        <Row label="Aplicação" value={data.aplicacao ? APLICACAO_LABELS[data.aplicacao] : '-'} />
        <Row label="Prazo" value={data.urgencia ? URGENCIA_LABELS[data.urgencia] : '-'} />
      </dl>

      {error && (
        <p
          role="alert"
          className="bg-terra/10 border border-terra/40 text-terra-deep text-sm px-4 py-3 rounded-sm"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleEnviar}
        disabled={submitting}
        className="solar-flare inline-flex w-full items-center justify-center text-[#311400] font-body font-bold uppercase tracking-[0.15em] text-sm px-8 py-5 rounded-sm shadow-lg active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ocher focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60 disabled:pointer-events-none"
      >
        {submitting ? 'Enviando…' : '✓ Enviar meu kit no WhatsApp'}
      </button>

      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        disabled={submitting}
        className="w-full"
      >
        ← Revisar respostas
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 px-5 py-3">
      <dt className="font-label uppercase tracking-[0.15em] text-[11px] font-bold text-ink-soft self-center">
        {label}
      </dt>
      <dd className="text-ink text-[15px] text-right">{value || '—'}</dd>
    </div>
  );
}
