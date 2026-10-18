'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { TextareaField } from '@/components/forms/TextareaField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import { FileUploadField } from '@/components/orcamento/FileUploadField';
import {
  step3Schema,
  type Motor,
  type Anexo,
  TENSAO_MOTOR,
  TENSAO_MOTOR_LABELS,
  TIPO_BOMBA,
  TIPO_BOMBA_LABELS,
  CV_RAPIDO_BA,
  CV_RAPIDO_OUTRAS,
  type Step3Values,
  type OrcamentoData,
} from '@/lib/orcamento-schema';
import { cn } from '@/lib/cn';

interface Props {
  data: OrcamentoData;
  update: (patch: Partial<OrcamentoData>) => void;
  pastaId: string;
  onNext: () => void;
  onBack: () => void;
}

/** Anexo de plaqueta é opcional, fica fora do react-hook-form (como no upload da conta de luz) — atualiza direto no estado do passo pai pelo índice do motor. */
function anexarPlaquetaMotor(data: OrcamentoData, update: Props['update'], index: number, anexos: Anexo[]) {
  const motores = [...(data.motores ?? [])];
  if (motores[index]) motores[index] = { ...motores[index], plaquetaAnexo: anexos[0] };
  update({ motores });
}

const TENSAO_OPTIONS = TENSAO_MOTOR.map((v) => ({ value: v, label: TENSAO_MOTOR_LABELS[v] }));
const TIPO_OPTIONS = TIPO_BOMBA.map((v) => ({ value: v, label: TIPO_BOMBA_LABELS[v] }));
// `cv` começa vazio na tela (o usuário escolhe) mas o schema exige número —
// o cast reflete que a validação só roda no submit, não no estado inicial.
const MOTOR_VAZIO = { quantidade: 1 } as unknown as Motor;

export function Step3Motores({ data, update, pastaId, onNext, onBack }: Props) {
  // Deriva do dado real (bombeia água?) em vez de perguntar "CFW ou BESS" —
  // o cliente não sabe o que é isso. Cargas BESS ficam sempre visíveis como
  // opcional: uma fazenda pode ter bomba E cargas críticas (aviário, câmara fria).
  const viaCfw = data.temBombeamento === 'sim';
  const viaBess = true;
  const cvRapido = data.uf === 'BA' ? CV_RAPIDO_BA : CV_RAPIDO_OUTRAS;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      motores: data.motores?.length ? data.motores : viaCfw ? [MOTOR_VAZIO] : [],
      cargasBess: data.cargasBess ?? {},
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'motores' });

  const onSubmit = (values: Step3Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Seus motores e bombas</h2>
        <p className="mt-1.5 text-sm text-graphite/70">
          Cada motor recebe seu próprio conjunto solar e inversor — a potência define o tamanho do sistema.
        </p>
      </header>

      {viaCfw && (
        <div className="space-y-6">
          {fields.map((field, index) => {
            const cvAtual = watch(`motores.${index}.cv` as const);
            return (
              <div key={field.id} className="space-y-4 rounded-sm border border-rule bg-paper p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-forest">Motor {index + 1}</p>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-xs font-semibold text-[#b3261e] hover:underline"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-forest">Potência do motor (CV)</label>
                  <div className="flex flex-wrap gap-2">
                    {cvRapido.map((cv) => (
                      <button
                        key={cv}
                        type="button"
                        onClick={() => setValue(`motores.${index}.cv` as const, cv)}
                        className={cn(
                          'min-h-[40px] rounded-full border px-4 text-sm font-semibold',
                          Number(cvAtual) === cv ? 'border-forest bg-forest text-paper' : 'border-rule text-graphite',
                        )}
                      >
                        {cv} CV
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Outro valor (CV)"
                    className="mt-2 w-full max-w-[200px] min-h-[44px] rounded-sm border border-rule bg-paper px-4 py-2.5 text-[15px]"
                    {...register(`motores.${index}.cv` as const)}
                  />
                  {errors.motores?.[index]?.cv && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[#b3261e]">
                      {errors.motores[index]?.cv?.message}
                    </p>
                  )}
                </div>

                <RadioGroupField
                  legend="Tensão"
                  name={`motores.${index}.tensao` as const}
                  options={TENSAO_OPTIONS}
                  register={register}
                />
                <RadioGroupField
                  legend="Tipo"
                  name={`motores.${index}.tipo` as const}
                  options={TIPO_OPTIONS}
                  register={register}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <TextField
                    label="Quantos iguais a este?"
                    type="number"
                    min={1}
                    {...register(`motores.${index}.quantidade` as const)}
                  />
                  <TextField
                    label="Horas por dia de funcionamento"
                    type="number"
                    step="0.5"
                    {...register(`motores.${index}.horasDia` as const)}
                  />
                  <TextField
                    label="Distância até a bomba (m)"
                    hint="Pode estimar pelo Google Maps (botão direito → medir distância)."
                    type="number"
                    {...register(`motores.${index}.distanciaM` as const)}
                  />
                </div>

                <FileUploadField
                  label="Foto da plaqueta do motor (opcional, recomendado)"
                  pastaId={pastaId}
                  value={data.motores?.[index]?.plaquetaAnexo ? [data.motores[index].plaquetaAnexo!] : []}
                  onChange={(anexos) => anexarPlaquetaMotor(data, update, index, anexos)}
                  max={1}
                  single
                />
              </div>
            );
          })}

          {fields.length < 10 && (
            <button
              type="button"
              onClick={() => append(MOTOR_VAZIO)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-rule px-5 text-sm font-semibold text-forest hover:border-forest"
            >
              + Adicionar motor
            </button>
          )}
        </div>
      )}

      {viaBess && (
        <div className="space-y-5 rounded-sm border border-rule bg-sand/30 p-4">
          <p className="text-sm font-semibold text-forest">
            Outras cargas que não podem ficar sem energia (opcional)
          </p>
          <p className="-mt-3 text-xs text-graphite/60">
            Ex.: ventilação de aviário, câmara fria, resfriador de leite, ordenha.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Potência total aproximada dessas cargas"
              type="number"
              {...register('cargasBess.potenciaCritica')}
              error={errors.cargasBess?.potenciaCritica?.message}
            />
            <RadioGroupField
              legend="Unidade"
              name="cargasBess.unidade"
              options={[{ value: 'kW', label: 'kW' }, { value: 'CV', label: 'CV' }]}
              register={register}
            />
          </div>
          <TextareaField
            label="Quais são as cargas"
            hint="Ex.: ventilação, exaustores, resfriador, bombas, câmara fria"
            rows={3}
            {...register('cargasBess.descricao')}
          />
          <RadioGroupField
            legend="Operam ao mesmo tempo?"
            name="cargasBess.simultaneas"
            options={[
              { value: 'sim', label: 'Sim' },
              { value: 'nao', label: 'Não' },
              { value: 'em-parte', label: 'Em parte' },
            ]}
            register={register}
          />
        </div>
      )}

      <StepNav onBack={onBack} />
    </form>
  );
}
