import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-paper border border-rule rounded-sm shadow-card p-6 md:p-7', className)}
      {...props}
    >
      {children}
    </div>
  );
}
