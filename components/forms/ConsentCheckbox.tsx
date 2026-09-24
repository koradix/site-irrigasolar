import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface ConsentCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = `${fieldId}-error`;

    return (
      <div>
        <label htmlFor={fieldId} className="flex cursor-pointer items-start gap-3">
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn('mt-0.5 h-5 w-5 shrink-0 accent-forest', className)}
            {...props}
          />
          <span className="text-sm leading-relaxed text-graphite/85">{label}</span>
        </label>
        {error && (
          <p id={errorId} role="alert" className="mt-2 text-xs font-medium text-[#b3261e]">
            {error}
          </p>
        )}
      </div>
    );
  },
);
ConsentCheckbox.displayName = 'ConsentCheckbox';
