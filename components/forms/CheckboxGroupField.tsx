import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupFieldProps<T extends FieldValues> {
  legend: string;
  name: Path<T>;
  options: Option[];
  register: UseFormRegister<T>;
  error?: string;
}

export function CheckboxGroupField<T extends FieldValues>({
  legend,
  name,
  options,
  register,
  error,
}: CheckboxGroupFieldProps<T>) {
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-3 text-sm font-semibold text-forest">{legend}</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-sm border border-rule bg-paper px-4 py-2.5 text-[15px] text-graphite has-[:checked]:border-forest has-[:checked]:bg-sand has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-forest"
          >
            <input type="checkbox" value={opt.value} className="h-4 w-4 accent-forest" {...register(name)} />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs font-medium text-[#b3261e]">
          {error}
        </p>
      )}
    </fieldset>
  );
}
