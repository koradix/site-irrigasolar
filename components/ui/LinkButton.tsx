import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type LinkButtonVariant = 'primary' | 'secondary' | 'whatsapp';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkButtonVariant;
  external?: boolean;
}

const variantStyles: Record<LinkButtonVariant, string> = {
  primary: 'bg-forest text-paper hover:bg-forest-light',
  secondary: 'bg-transparent text-forest border border-forest hover:bg-forest hover:text-paper',
  whatsapp: 'bg-[#25D366] text-forest hover:brightness-95',
};

export function LinkButton({ href, variant = 'primary', external, className, children, ...props }: LinkButtonProps) {
  const classes = cn(
    'inline-flex min-h-[44px] items-center justify-center rounded-sm px-6 py-3 text-[15px] font-semibold tracking-tight transition-colors',
    variantStyles[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
