'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { RadioGroupField } from '@/components/forms/RadioGroupField';
import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { StepNav } from '@/components/diagnostico/StepNav';
import { PrecisionMeter } from '@/components/orcamento/PrecisionMeter';
import {
  step4Schema,
  PERFIL,
  PERFIL_LABELS,
  FINANCIAMENTO,
  ATIVIDADE_LABELS,
  DOR_LABELS,
  type Step4Values,
  type OrcamentoData,
} from '@/lib/orcamento-schema';

interface Props {
  data: OrcamentoData;
  update: (patch: Partial<OrcamentoData>) => void;
  onSubmitFinal: (values: Step4Values) => void;
  onBack: () => void;
  submitting: boolean;
}

const PERFIL_OPTIONS = PERFIL.map((v) => ({ value: v, label: PERFIL_LABELS[v] }));
const FINANCIAMENTO_OPTIONS = FINANCIAMENTO.map((v) => ({
  value: v,
  label: v === 'sim' ? 'Sim' : v === 'nao' ? 'Não' : 'Talvez',
}));

export function Step4Dados({ data, update, onSubmitFinal, onBack, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      nome: data.nome ?? '',
      whatsapp: data.whatsapp ?? '',
      email: data.email ?? '',
      propriedade: data.propriedade ?? '',
      perfil: data.perfil,
      outraProposta: data.outraProposta,
      financiamento: data.financiamento,
      consentimentoLgpd: data.consentimentoLgpd ?? undefined,
    },
  });

  const onSubmit = (values: Step4Values) => {
    update(values);
    onSubmitFinal(values);
  };

  const faltando = [
    !data.descricaoCliente?.trim() && 'descrição do problema',
    (data.contaLuzAnexos?.length ?? 0) === 0 && data.rede !== 'nao' && 'foto/PDF da conta de luz',
    (data.motores?.length ?? 0) === 0 && data.temBombeamento === 'sim' && 'potência dos motores',
  ].filter(Boolean) as string[];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Seus dados e envio</h2>
        <p className="mt-1.5 text-sm text-graphite/70">Última etapa — revise abaixo antes de enviar.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Nome" {...register('nome')} error={errors.nome?.message} />
        <TextField
          label="WhatsApp"
          placeholder="(00) 00000-0000"
          {...register('whatsapp')}
          error={errors.whatsapp?.message}
        />
        <TextField label="E-mail (opcional)" type="email" {...register('email')} error={errors.email?.message} />
        <TextField label="Nome da propriedade/empresa (opcional)" {...register('propriedade')} />
      </div>

      <RadioGroupField legend="Você é" name="perfil" options={PERFIL_OPTIONS} register={register} error={errors.perfil?.message} />

      <RadioGroupField
        legend="Já recebeu outra proposta? (opcional)"
        name="outraProposta"
        options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
        register={register}
      />

      <RadioGroupField
        legend="Interesse em financiamento?"
        name="financiamento"
        options={FINANCIAMENTO_OPTIONS}
        register={register}
        error={errors.financiamento?.message}
      />

      <div className="space-y-3 rounded-sm border border-rule bg-sand/30 p-4">
        <p className="text-sm font-semibold text-forest">Resumo</p>
        <dl className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {data.atividade && (
            <div>
              <dt className="inline text-graphite/60">Atividade: </dt>
              <dd className="inline font-medium">{ATIVIDADE_LABELS[data.atividade]}</dd>
            </div>
          )}
          {data.temBombeamento && (
            <div>
              <dt className="inline text-graphite/60">Bombeia água com motor: </dt>
              <dd className="inline font-medium">{data.temBombeamento === 'sim' ? 'Sim' : 'Não'}</dd>
            </div>
          )}
          {data.dorPrincipal && (
            <div>
              <dt className="inline text-graphite/60">Maior dor: </dt>
              <dd className="inline font-medium">{DOR_LABELS[data.dorPrincipal]}</dd>
            </div>
          )}
          {data.municipio && (
            <div>
              <dt className="inline text-graphite/60">Local: </dt>
              <dd className="inline font-medium">
                {data.municipio}/{data.uf}
              </dd>
            </div>
          )}
        </dl>
        <PrecisionMeter data={data} />
        {faltando.length > 0 && (
          <p className="text-xs text-graphite/70">
            Sem {faltando.join(', ')}, a proposta será apenas estimada — mas você já pode enviar assim mesmo.
          </p>
        )}
      </div>

      <ConsentCheckbox
        label="Autorizo a Irrigasolar a usar estes dados e arquivos para elaborar minha proposta e entrar em contato."
        {...register('consentimentoLgpd')}
        error={errors.consentimentoLgpd?.message}
      />

      <StepNav onBack={onBack} submitLabel={submitting ? 'Enviando...' : 'Enviar para a engenharia'} />
    </form>
  );
}
