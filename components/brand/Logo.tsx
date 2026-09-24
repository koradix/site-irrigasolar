import Link from 'next/link';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Usar sobre fundo escuro (forest) inverte as cores. */
  inverted?: boolean;
}

/**
 * Marca em texto (wordmark), sóbria e tipográfica — substitui o logo
 * ilustrado anterior (estética varejista, fora da paleta) até que a
 * Irrigasolar forneça uma identidade visual revisada.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex flex-col leading-none select-none',
        inverted ? 'text-paper' : 'text-forest',
        className,
      )}
    >
      <span className="font-display font-semibold text-xl md:text-2xl tracking-tight">
        Irrigasolar
      </span>
      <span
        className={cn(
          'font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.28em] mt-0.5',
          inverted ? 'text-sand/70' : 'text-copper-text',
        )}
      >
        Engenharia
      </span>
    </Link>
  );
}
