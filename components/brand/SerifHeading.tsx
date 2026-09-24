import { cn } from '@/lib/cn';
import type { HTMLAttributes, ElementType } from 'react';

interface SerifHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-4xl md:text-6xl',
} as const;

export function SerifHeading({ className, as: Tag = 'h2', size = 'lg', children, ...props }: SerifHeadingProps) {
  return (
    <Tag className={cn('font-display font-semibold text-forest leading-[1.1] tracking-tight', sizeStyles[size], className)} {...props}>
      {children}
    </Tag>
  );
}
