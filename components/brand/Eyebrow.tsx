import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  /** Usar sobre fundo escuro (Section tone="forest") — mantém contraste AA. */
  inverted?: boolean;
}

/** Rótulo pequeno em versalete usado acima de títulos de seção. */
export function Eyebrow({ className, inverted = false, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block font-sans text-xs font-semibold uppercase tracking-[0.2em]',
        inverted ? 'text-copper-text-inverse' : 'text-copper-text',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
