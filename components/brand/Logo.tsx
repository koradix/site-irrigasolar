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
 * Marca oficial da Irrigasolar, recomposta em layout horizontal de uma
 * linha (public/assets/img/logo-irrigasolar-horizontal*.svg) — mesmos
 * elementos, cores e tipografia do arquivo original
 * (logo-irrigasolar.svg), só sem a inclinação de -10° e sem a palavra
 * "solar" sobrepor a borda do oval, que ficavam desalinhadas em qualquer
 * tamanho de cabeçalho. A versão colorida é usada sobre fundos claros
 * (paper/sand); a branca, sobre fundos escuros (forest — rodapé).
 */
export function Logo({ className, inverted = false, priority = false }: LogoProps) {
  return (
    <Link href="/" className={cn('inline-flex items-center', className)}>
      {inverted ? (
        <Image
          src="/assets/img/logo-irrigasolar-horizontal-white.svg"
          alt="Irrigasolar"
          width={320}
          height={80}
          priority={priority}
          className="h-10 w-auto md:h-12"
        />
      ) : (
        <Image
          src="/assets/img/logo-irrigasolar-horizontal.svg"
          alt="Irrigasolar"
          width={320}
          height={80}
          priority={priority}
          className="h-10 w-auto md:h-12"
        />
      )}
    </Link>
  );
}
