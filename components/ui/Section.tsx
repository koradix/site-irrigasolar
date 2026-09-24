import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: 'paper' | 'sand' | 'forest';
  as?: 'section' | 'div';
}

const toneStyles = {
  paper: 'bg-paper text-graphite',
  sand: 'bg-sand text-graphite',
  forest: 'bg-forest text-paper',
} as const;

export function Section({ className, tone = 'paper', as: Tag = 'section', children, ...props }: SectionProps) {
  return (
    <Tag className={cn('py-16 md:py-24 lg:py-28', toneStyles[tone], className)} {...props}>
      {children}
    </Tag>
  );
}
