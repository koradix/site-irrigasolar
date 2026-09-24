import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, label, error, hint, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;

    return (
      <div className="space-y-1.5">
        <label htmlFor={fieldId} className="block text-sm font-semibold text-forest">
          {label}
          <span className="ml-1.5 font-normal text-graphite/50">(opcional)</span>
        </label>
        {hint && (
          <p id={hintId} className="text-xs text-graphite/60">
            {hint}
          </p>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            'w-full rounded-sm border border-rule bg-paper px-4 py-2.5 text-[15px] text-graphite placeholder:text-graphite/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest',
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
TextareaField.displayName = 'TextareaField';
