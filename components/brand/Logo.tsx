import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/**
 * Marca oficial da Irrigasolar (Design System, 01-marca-irrigasolar/logo-irrigasolar.png),
 * recortada só nas margens transparentes — sem redesenho. A versão colorida
 * lê bem tanto sobre papel quanto sobre verde-floresta (testado visualmente
 * em 18/10/2026), então não há variante invertida nem placa atrás da marca.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link href="/" aria-label="Irrigasolar — início" className={cn('inline-flex items-center', className)}>
      <Image
        src="/assets/img/logo-irrigasolar-oficial.webp"
        alt="Irrigasolar"
        width={960}
        height={377}
        priority={priority}
        className="h-9 w-auto md:h-11"
      />
    </Link>
  );
}
