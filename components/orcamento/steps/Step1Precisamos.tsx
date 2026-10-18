'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { TextareaField } from '@/components/forms/TextareaField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { CheckboxGroupField } from '@/components/forms/CheckboxGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import {
  step1Schema,
  ATIVIDADE,
  ATIVIDADE_LABELS,
  ATIVIDADE_BOMBEAMENTO_PADRAO,
  DOR,
  DOR_LABELS,
  type Step1Values,
  type OrcamentoData,
} from '@/lib/orcamento-schema';

interface Props {
  data: OrcamentoData;
  update: (patch: Partial<OrcamentoData>) => void;
  onNext: () => void;
}

const ATIVIDADE_OPTIONS = ATIVIDADE.map((v) => ({ value: v, label: ATIVIDADE_LABELS[v] }));
const DOR_OPTIONS = DOR.map((v) => ({ value: v, label: DOR_LABELS[v] }));
const BOMBEAMENTO_OPTIONS = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

export function Step1Precisamos({ data, update, onNext }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      atividade: data.atividade,
      temBombeamento: data.temBombeamento,
      dorPrincipal: data.dorPrincipal,
      doresSecundarias: data.doresSecundarias ?? [],
      descricaoCliente: data.descricaoCliente ?? '',
      municipio: data.municipio ?? '',
      uf: data.uf ?? '',
    },
  });

  // Registrado de verdade (não só `setValue`) para o valor entrar na
  // validação/submissão de forma confiável; o onChange do register ainda
  // roda, só acrescentamos o padrão inteligente de temBombeamento por cima.
  const atividadeField = register('atividade');

  const onSubmit = (values: Step1Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">O que você precisa</h2>
        <p className="mt-1.5 text-sm text-graphite/70">Comece pela sua atividade e pelo problema — a técnica vem depois.</p>
      </header>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-forest">Sua atividade</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {ATIVIDADE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-sm border border-rule bg-paper px-4 py-2.5 text-[15px] text-graphite has-[:checked]:border-forest has-[:checked]:bg-sand"
            >
              <input
                type="radio"
                value={opt.value}
                className="h-4 w-4 accent-forest"
                {...atividadeField}
                onChange={(e) => {
                  atividadeField.onChange(e);
                  // Padrão inteligente (5.3): pré-marca a resposta provável,
                  // mas o cliente pode mudar livremente depois.
                  setValue('temBombeamento', ATIVIDADE_BOMBEAMENTO_PADRAO[opt.value]);
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.atividade && (
          <p role="alert" className="mt-2 text-xs font-medium text-[#b3261e]">
            {errors.atividade.message}
          </p>
        )}
      </fieldset>

      <RadioGroupField
        legend="Você bombeia água com motor ou bomba? (poço, rio, açude, pivô)"
        name="temBombeamento"
        options={BOMBEAMENTO_OPTIONS}
        register={register}
        error={errors.temBombeamento?.message}
      />

      <RadioGroupField
        legend="Qual é a sua maior dor hoje?"
        name="dorPrincipal"
        options={DOR_OPTIONS}
        register={register}
        error={errors.dorPrincipal?.message}
      />

      <CheckboxGroupField
        legend="Tem mais alguma? (opcional)"
        name="doresSecundarias"
        options={DOR_OPTIONS}
        register={register}
      />

      <TextareaField
        label="Conte com suas palavras o que está acontecendo"
        hint="É a sua dor que define a solução. Quanto melhor você descrever, mais certeira fica a proposta."
        maxLength={1000}
        {...register('descricaoCliente')}
        error={errors.descricaoCliente?.message}
      />

      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <TextField label="Município" placeholder="Ex.: Ibitiba" {...register('municipio')} error={errors.municipio?.message} />
        <TextField label="UF" placeholder="BA" maxLength={2} {...register('uf')} error={errors.uf?.message} />
      </div>

      <StepNav />
    </form>
  );
}
