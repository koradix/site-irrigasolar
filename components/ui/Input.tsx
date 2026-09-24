import { cn } from '@/lib/cn';
import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="font-label uppercase tracking-[0.15em] text-[11px] font-bold text-ink-soft block"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full bg-white border border-rule rounded-sm px-4 py-3 text-ink font-body text-[15px] focus:outline-none focus:border-ocher focus:ring-1 focus:ring-ocher transition-colors placeholder:text-ink-soft/50',
          error && 'border-terra focus:border-terra focus:ring-terra',
          className,
        )}
        {...props}
      />
      {error && <p className="text-terra text-xs font-label">{error}</p>}
    </div>
  ),
);
Input.displayName = 'Input';

type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function FieldLabel({ className, children, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn(
        'font-label uppercase tracking-[0.15em] text-[11px] font-bold text-ink-soft block',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
