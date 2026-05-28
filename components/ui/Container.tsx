import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12', className)}
      {...props}
    >
      {children}
    </div>
  );
}
