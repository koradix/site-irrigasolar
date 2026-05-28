import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: 'paper' | 'cream';
  as?: 'section' | 'div' | 'article';
}

const toneStyles = {
  paper: 'bg-paper',
  cream: 'bg-cream',
} as const;

export function Section({
  className,
  tone = 'paper',
  as: Tag = 'section',
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn('py-20 md:py-28 lg:py-32', toneStyles[tone], className)} {...props}>
      {children}
    </Tag>
  );
}
