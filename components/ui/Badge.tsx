import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export type BadgeTone = 'ocher' | 'green';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  ocher: 'bg-ocher text-ink-deep',
  green: 'bg-green text-cream',
};

export function Badge({ className, tone = 'ocher', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-label uppercase tracking-[0.15em] text-[11px] px-2.5 py-1 rounded-sm',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
