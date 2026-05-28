'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { ConfiguradorData, Urgencia } from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  update: (patch: Partial<ConfiguradorData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS: { value: Urgencia; title: string; sub: string }[] = [
  {
    value: 'este-mes',
    title: 'ESTE MÊS',
    sub: 'Quero fechar agora — passa pro engenheiro hoje.',
  },
  {
    value: '3-meses',
    title: 'PRÓXIMOS 3 MESES',
    sub: 'Estou planejando — proposta firme com prazo.',
  },
  {
    value: 'pesquisando',
    title: 'AINDA PESQUISANDO',
    sub: 'Quero entender melhor antes de decidir.',
  },
];

export function Step3Urgencia({ data, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h3 className="font-headline text-3xl md:text-4xl font-semibold text-ink-deep leading-tight">
          Pra quando você quer rodar?
        </h3>
        <p className="italic text-ocher-dark text-base">
          Sem pressão de venda — isso só ajuda a priorizar a proposta.
        </p>
      </header>

      <div className="space-y-3">
        {OPTIONS.map((opt) => {
          const selected = data.urgencia === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => update({ urgencia: opt.value })}
              className={cn(
                'w-full text-left p-5 rounded-sm border transition-all',
                selected
                  ? 'border-ocher bg-ocher/10'
                  : 'border-rule bg-white hover:border-ocher/60',
              )}
              aria-pressed={selected}
            >
              <p
                className={cn(
                  'font-label uppercase tracking-[0.18em] text-[12px] font-bold',
                  selected ? 'text-ocher-dark' : 'text-ink',
                )}
              >
                {opt.title}
              </p>
              <p className="text-ink-soft text-sm mt-1">{opt.sub}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <Button type="button" disabled={!data.urgencia} onClick={onNext} size="lg">
          Próximo →
        </Button>
      </div>
    </div>
  );
}
