import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;

    return (
      <div className="space-y-1.5">
        <label htmlFor={fieldId} className="block text-sm font-semibold text-forest">
          {label}
        </label>
        {hint && (
          <p id={hintId} className="text-xs text-graphite/60">
            {hint}
          </p>
        )}
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            'w-full min-h-[44px] rounded-sm border border-rule bg-paper px-4 py-2.5 text-[15px] text-graphite placeholder:text-graphite/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest',
            error && 'border-[#b3261e] focus:border-[#b3261e] focus:ring-[#b3261e]',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs font-medium text-[#b3261e]">
            {error}
          </p>
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';
