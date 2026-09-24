'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import {
  step4Schema,
  FAIXA_CONTA,
  FAIXA_CONTA_LABELS,
  HORAS_AUTONOMIA,
  HORAS_AUTONOMIA_LABELS,
  type Step4Values,
  type DiagnosticoData,
} from '@/lib/diagnostico-schema';

interface Props {
  data: DiagnosticoData;
  update: (patch: Partial<DiagnosticoData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CONTA_OPTIONS = FAIXA_CONTA.map((v) => ({ value: v, label: FAIXA_CONTA_LABELS[v] }));
const AUTONOMIA_OPTIONS = HORAS_AUTONOMIA.map((v) => ({ value: v, label: HORAS_AUTONOMIA_LABELS[v] }));

export function Step4Dimensao({ data, update, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      faixaContaMensal: data.faixaContaMensal,
      demandaContratadaKw: data.demandaContratadaKw ?? '',
      horasAutonomiaDesejada: data.horasAutonomiaDesejada,
    },
  });

  const onSubmit = (values: Step4Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Dimensão inicial</h2>
        <p className="mt-1.5 text-sm text-graphite/70">
          Só para orientar a conversa — o dimensionamento real vem do estudo técnico.
        </p>
      </header>

      <RadioGroupField legend="Faixa da conta de energia mensal" name="faixaContaMensal" options={CONTA_OPTIONS} register={register} error={errors.faixaContaMensal?.message} />

      <TextField
        label="Demanda contratada (kW) — opcional"
        hint="Se não souber, pode deixar em branco"
        placeholder="Ex.: 75"
        inputMode="numeric"
        {...register('demandaContratadaKw')}
        error={errors.demandaContratadaKw?.message}
      />

      <RadioGroupField legend="Autonomia desejada para as cargas críticas" name="horasAutonomiaDesejada" options={AUTONOMIA_OPTIONS} register={register} error={errors.horasAutonomiaDesejada?.message} />

      <StepNav onBack={onBack} />
    </form>
  );
}
