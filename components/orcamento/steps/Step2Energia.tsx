'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { StepNav } from '@/components/diagnostico/StepNav';
import { FileUploadField } from '@/components/orcamento/FileUploadField';
import {
  step2Schema,
  REDE,
  REDE_LABELS,
  DEMANDA_CONTRATADA,
  FREQUENCIA_QUEDAS,
  FREQUENCIA_QUEDAS_LABELS,
  type Step2Values,
  type OrcamentoData,
} from '@/lib/orcamento-schema';

interface Props {
  data: OrcamentoData;
  update: (patch: Partial<OrcamentoData>) => void;
  pastaId: string;
  onNext: () => void;
  onBack: () => void;
}

const REDE_OPTIONS = REDE.map((v) => ({ value: v, label: REDE_LABELS[v] }));
const DEMANDA_OPTIONS = DEMANDA_CONTRATADA.map((v) => ({
  value: v,
  label: v === 'sim' ? 'Sim' : v === 'nao' ? 'Não' : 'Não sei',
}));
const UCS_OPTIONS = ['1', '2', '3', '4+'].map((v) => ({ value: v, label: v }));
const FREQUENCIA_OPTIONS = FREQUENCIA_QUEDAS.map((v) => ({ value: v, label: FREQUENCIA_QUEDAS_LABELS[v] }));

export function Step2Energia({ data, update, pastaId, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      rede: data.rede,
      demandaContratada: data.demandaContratada,
      demandaContratadaKw: data.demandaContratadaKw ?? '',
      transformadorKva: data.transformadorKva ?? '',
      ucsMesmoTitular: data.ucsMesmoTitular,
      dieselMensalBrl: data.dieselMensalBrl ?? '',
      geradorKva: data.geradorKva ?? '',
      frequenciaQuedas: data.frequenciaQuedas,
    },
  });

  const rede = watch('rede');
  const demandaContratada = watch('demandaContratada');
  const contaLuzAnexos = data.contaLuzAnexos ?? [];
  const transformadorFoto = data.transformadorFotoAnexo ? [data.transformadorFotoAnexo] : [];

  const onSubmit = (values: Step2Values) => {
    update({ ...values, contaLuzAnexos: data.contaLuzAnexos, transformadorFotoAnexo: data.transformadorFotoAnexo });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Sua energia hoje</h2>
        <p className="mt-1.5 text-sm text-graphite/70">A conta de luz é a base de todo o dimensionamento.</p>
      </header>

      <RadioGroupField
        legend="Tem energia da concessionária no local?"
        name="rede"
        options={REDE_OPTIONS}
        register={register}
      />

      {rede !== 'nao' && (
        <FileUploadField
          label="Foto ou PDF da conta de luz"
          hint="Envie a conta inteira, frente e verso, com o histórico de consumo legível. Se tiver mais de uma unidade consumidora na propriedade, envie todas."
          pastaId={pastaId}
          value={contaLuzAnexos}
          onChange={(anexos) => update({ contaLuzAnexos: anexos })}
          max={6}
        />
      )}

      {rede === 'nao' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Gasto mensal com diesel/gerador (R$)" {...register('dieselMensalBrl')} />
          <TextField label="Potência do gerador (kVA)" {...register('geradorKva')} />
        </div>
      )}

      {data.dorPrincipal === 'falta_energia' && (
        <RadioGroupField
          legend="Com que frequência a energia cai?"
          name="frequenciaQuedas"
          options={FREQUENCIA_OPTIONS}
          register={register}
          columns={1}
        />
      )}

      <RadioGroupField
        legend="Tem demanda contratada? (aparece na conta como 'demanda contratada' em kW)"
        name="demandaContratada"
        options={DEMANDA_OPTIONS}
        register={register}
      />
      <p className="-mt-4 text-xs text-graphite/60">
        Quem tem demanda contratada é atendido em média tensão — isso muda a solução. Se não souber, tudo bem: tiramos da sua
        conta.
      </p>

      {demandaContratada === 'sim' && (
        <div className="space-y-5 rounded-sm border border-rule bg-sand/30 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Demanda contratada (kW)"
              hint="Opcional se a conta foi enviada"
              {...register('demandaContratadaKw')}
            />
            <TextField
              label="Potência do transformador (kVA)"
              hint="Está na plaqueta do transformador no poste ou na subestação. Comum: 45, 75, 112,5, 150, 225, 300, 500."
              {...register('transformadorKva')}
            />
          </div>
          <FileUploadField
            label="Foto da plaqueta do transformador (opcional)"
            pastaId={pastaId}
            value={transformadorFoto}
            onChange={(anexos) => update({ transformadorFotoAnexo: anexos[0] })}
            max={1}
            single
          />
          <RadioGroupField
            legend="Quantas unidades consumidoras (contas) existem na propriedade, no mesmo titular?"
            name="ucsMesmoTitular"
            options={UCS_OPTIONS}
            register={register}
          />
        </div>
      )}

      <StepNav onBack={onBack} />
    </form>
  );
}
