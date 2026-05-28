import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white border border-rule rounded-sm shadow-[0_1px_3px_rgba(15,26,18,0.06),0_1px_2px_rgba(15,26,18,0.04)] p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
