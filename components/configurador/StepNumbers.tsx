'use client';

import { cn } from '@/lib/cn';
import { STEP_LABELS } from '@/lib/configurador-schema';

interface Props {
  current: number;
  total: number;
  onJump: (i: number) => void;
}

export function StepNumbers({ current, total, onJump }: Props) {
  return (
    <ol className="flex flex-row lg:flex-col gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <li key={i} className="shrink-0">
            <button
              type="button"
              onClick={() => (isDone || isActive ? onJump(i) : undefined)}
              disabled={!isDone && !isActive}
              className={cn(
                'flex flex-col items-start text-left transition-colors',
                (isDone || isActive) && 'cursor-pointer',
                !isDone && !isActive && 'cursor-default',
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={cn(
                  'font-headline leading-none transition-all',
                  isActive
                    ? 'text-ocher text-[72px] lg:text-[96px] font-semibold'
                    : isDone
                      ? 'text-ocher-dark/40 text-3xl'
                      : 'text-rule text-3xl',
                )}
              >
                {i}
              </span>
              <span
                className={cn(
                  'font-label uppercase tracking-[0.18em] text-[10px] mt-1 transition-colors',
                  isActive ? 'text-ocher-dark font-bold' : 'text-ink-soft/60',
                )}
              >
                {STEP_LABELS[i]}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
