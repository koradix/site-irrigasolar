'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaField } from '@/components/forms/TextareaField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import { step3Schema, type Step3Values, type DiagnosticoData } from '@/lib/diagnostico-schema';

interface Props {
  data: DiagnosticoData;
  update: (patch: Partial<DiagnosticoData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SIM_NAO = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

const SIM_NAO_NAOSEI = [...SIM_NAO, { value: 'nao-sei', label: 'Não sei' }];

export function Step3Infraestrutura({ data, update, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      possuiSolar: data.possuiSolar,
      possuiGerador: data.possuiGerador,
      possuiMediaTensao: data.possuiMediaTensao,
      cargasCriticas: data.cargasCriticas ?? '',
    },
  });

  const onSubmit = (values: Step3Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Infraestrutura existente</h2>
        <p className="mt-1.5 text-sm text-graphite/70">O que já existe na propriedade hoje.</p>
      </header>

      <RadioGroupField legend="Já possui energia solar" name="possuiSolar" options={SIM_NAO} register={register} error={errors.possuiSolar?.message} />
      <RadioGroupField legend="Já possui gerador" name="possuiGerador" options={SIM_NAO} register={register} error={errors.possuiGerador?.message} />
      <RadioGroupField
        legend="A propriedade tem ligação em média tensão"
        name="possuiMediaTensao"
        options={SIM_NAO_NAOSEI}
        register={register}
        error={errors.possuiMediaTensao?.message}
        columns={1}
      />

      <TextareaField
        label="Quais cargas não podem parar"
        hint="Ex.: bomba do pivô, câmara fria, ventilação do aviário..."
        {...register('cargasCriticas')}
        error={errors.cargasCriticas?.message}
      />

      <StepNav onBack={onBack} />
    </form>
  );
}
