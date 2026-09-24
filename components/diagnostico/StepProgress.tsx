import { STEP_LABELS } from '@/lib/diagnostico-schema';
import { cn } from '@/lib/cn';

interface StepProgressProps {
  current: number;
  onJump: (index: number) => void;
}

export function StepProgress({ current, onJump }: StepProgressProps) {
  return (
    <nav aria-label="Etapas do diagnóstico">
      <ol className="flex flex-wrap gap-2">
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          const reachable = i <= current;
          return (
            <li key={label}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onJump(i)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex min-h-[36px] items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  active && 'border-forest bg-forest text-paper',
                  done && !active && 'border-forest/40 bg-sand text-forest',
                  !done && !active && 'border-rule text-graphite/50',
                  !reachable && 'cursor-not-allowed',
                )}
              >
                <span aria-hidden>{i + 1}</span>
                {label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
