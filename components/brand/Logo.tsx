import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  alt?: string;
}

export function Logo({
  className,
  width = 180,
  height = 48,
  priority = false,
  alt = 'Irrigasolar',
}: LogoProps) {
  return (
    <Image
      src="/irrigasolar_logo.png"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn('h-auto w-auto', className)}
    />
  );
}
