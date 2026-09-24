'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import { step1Schema, TIPO_OPERACAO, TIPO_OPERACAO_LABELS, type Step1Values } from '@/lib/diagnostico-schema';
import type { DiagnosticoData } from '@/lib/diagnostico-schema';

interface Props {
  data: DiagnosticoData;
  update: (patch: Partial<DiagnosticoData>) => void;
  onNext: () => void;
}

const OPTIONS = TIPO_OPERACAO.map((v) => ({ value: v, label: TIPO_OPERACAO_LABELS[v] }));

export function Step1Operacao({ data, update, onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      tipoOperacao: data.tipoOperacao,
      municipio: data.municipio ?? '',
      uf: data.uf ?? '',
    },
  });

  const onSubmit = (values: Step1Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Sobre a operação</h2>
        <p className="mt-1.5 text-sm text-graphite/70">Para entender o contexto antes de falar de energia.</p>
      </header>

      <RadioGroupField
        legend="Tipo de operação"
        name="tipoOperacao"
        options={OPTIONS}
        register={register}
        error={errors.tipoOperacao?.message}
      />

      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <TextField label="Município" placeholder="Ex.: Ibitiba" {...register('municipio')} error={errors.municipio?.message} />
        <TextField label="UF" placeholder="BA" maxLength={2} {...register('uf')} error={errors.uf?.message} />
      </div>

      <StepNav />
    </form>
  );
}
