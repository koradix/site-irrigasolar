import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Kicker({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-block font-label uppercase tracking-[0.18em] text-xs text-ocher-dark',
        className,
      )}
      {...props}
    >
      {typeof children === 'string' && !children.startsWith('//') ? `// ${children}` : children}
    </span>
  );
}
