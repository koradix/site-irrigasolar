'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { Aplicacao, ConfiguradorData } from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  update: (patch: Partial<ConfiguradorData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS: { value: Aplicacao; title: string; sub: string; icon: string }[] = [
  { value: 'pivo', title: 'PIVÔ', sub: 'Pivôs centrais e laterais', icon: '◉' },
  { value: 'poco', title: 'POÇO', sub: 'Poço artesiano ou semi', icon: '◎' },
  { value: 'fazenda', title: 'FAZENDA', sub: 'Casa, currais e infra', icon: '▣' },
  { value: 'multiplo', title: 'MÚLTIPLO', sub: 'Combinação dos anteriores', icon: '✦' },
];

export function Step1Aplicacao({ data, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h3 className="font-headline text-3xl md:text-4xl font-semibold text-ink-deep leading-tight">
          Onde você quer aplicar?
        </h3>
        <p className="italic text-ocher-dark text-base">
          Escolha onde o sistema vai trabalhar — pode mudar de ideia depois.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const selected = data.aplicacao === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ aplicacao: opt.value })}
              className={cn(
                'text-left p-5 rounded-sm border transition-all',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ocher',
                selected
                  ? 'border-ocher bg-ocher/10 shadow-[inset_0_0_0_1px_var(--ocher)]'
                  : 'border-rule bg-white hover:border-ocher/60',
              )}
              aria-pressed={selected}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'font-headline text-2xl leading-none',
                    selected ? 'text-ocher-dark' : 'text-ink-soft/60',
                  )}
                  aria-hidden
                >
                  {opt.icon}
                </span>
                <div className="flex-1">
                  <p
                    className={cn(
                      'font-label uppercase tracking-[0.18em] text-[12px] font-bold',
                      selected ? 'text-ocher-dark' : 'text-ink',
                    )}
                  >
                    {opt.title}
                  </p>
                  <p className="text-ink-soft text-sm mt-1">{opt.sub}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <Button type="button" disabled={!data.aplicacao} onClick={onNext} size="lg">
          Próximo →
        </Button>
      </div>
    </div>
  );
}
