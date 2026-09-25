import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Usar sobre fundo escuro (forest) — troca para a versão branca do logo. */
  inverted?: boolean;
  priority?: boolean;
}

/**
 * Marca oficial da Irrigasolar (public/assets/img/logo-irrigasolar*.svg).
 * A versão colorida é usada sobre fundos claros (paper/sand); a versão
 * branca, sobre fundos escuros (forest — rodapé).
 */
export function Logo({ className, inverted = false, priority = false }: LogoProps) {
  return (
    <Link href="/" className={cn('inline-flex items-center', className)}>
      {inverted ? (
        <Image
          src="/assets/img/logo-irrigasolar-white.svg"
          alt="Irrigasolar"
          width={216}
          height={90}
          priority={priority}
          className="h-16 w-auto md:h-20"
        />
      ) : (
        <Image
          src="/assets/img/logo-irrigasolar.svg"
          alt="Irrigasolar"
          width={204}
          height={78}
          priority={priority}
          className="h-16 w-auto md:h-20"
        />
      )}
    </Link>
  );
}
