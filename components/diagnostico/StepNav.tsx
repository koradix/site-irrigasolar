interface StepNavProps {
  onBack?: () => void;
  submitLabel?: string;
}

export function StepNav({ onBack, submitLabel = 'Continuar' }: StepNavProps) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-rule px-6 py-3 text-[15px] font-semibold text-forest hover:border-forest sm:w-auto"
        >
          Voltar
        </button>
      )}
      <button
        type="submit"
        className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-forest px-6 py-3 text-[15px] font-semibold text-paper hover:bg-forest-light sm:w-auto"
      >
        {submitLabel}
      </button>
    </div>
  );
}
