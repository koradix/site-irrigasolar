'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaField } from '@/components/forms/TextareaField';
import { CheckboxGroupField } from '@/components/forms/CheckboxGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import { step2Schema, PROBLEMA, PROBLEMA_LABELS, type Step2Values, type DiagnosticoData } from '@/lib/diagnostico-schema';

interface Props {
  data: DiagnosticoData;
  update: (patch: Partial<DiagnosticoData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS = PROBLEMA.map((v) => ({ value: v, label: PROBLEMA_LABELS[v] }));

export function Step2Problema({ data, update, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { problemas: data.problemas ?? [], relato: data.relato ?? '' },
  });

  const onSubmit = (values: Step2Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">O problema de energia</h2>
        <p className="mt-1.5 text-sm text-graphite/70">Pode marcar mais de um.</p>
      </header>

      <CheckboxGroupField
        legend="O que mais afeta a operação hoje"
        name="problemas"
        options={OPTIONS}
        register={register}
        error={errors.problemas?.message}
      />

      <TextareaField
        label="Quer contar mais detalhes?"
        placeholder="Ex.: quedas mais frequentes na época de chuva, gerador ligado quase todo dia..."
        {...register('relato')}
        error={errors.relato?.message}
      />

      <StepNav onBack={onBack} />
    </form>
  );
}
