import { cn } from '@/lib/cn';
import type { HTMLAttributes, ElementType } from 'react';

interface SerifHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles = {
  sm: 'text-3xl md:text-4xl',
  md: 'text-4xl md:text-5xl',
  lg: 'text-5xl md:text-6xl',
  xl: 'text-5xl md:text-7xl lg:text-8xl',
} as const;

export function SerifHeading({
  className,
  as: Tag = 'h1',
  size = 'lg',
  children,
  ...props
}: SerifHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-headline font-semibold text-ink-deep leading-[1.05] tracking-tight',
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
