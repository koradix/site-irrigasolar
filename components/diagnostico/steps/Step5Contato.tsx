'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/forms/TextField';
import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { StepNav } from '@/components/diagnostico/StepNav';
import { maskWhatsapp } from '@/lib/configurador-schema';
import { step5Schema, type Step5Values, type DiagnosticoData } from '@/lib/diagnostico-schema';

interface Props {
  data: DiagnosticoData;
  update: (patch: Partial<DiagnosticoData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Contato({ data, update, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5Values>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      nome: data.nome ?? '',
      empresaFazenda: data.empresaFazenda ?? '',
      telefone: data.telefone ?? '',
      email: data.email ?? '',
      consentimento: data.consentimento ?? undefined,
    },
  });

  const onSubmit = (values: Step5Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <header>
        <h2 className="font-display text-2xl font-semibold text-forest">Seus dados de contato</h2>
        <p className="mt-1.5 text-sm text-graphite/70">Só o necessário para a engenharia entrar em contato.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Nome" placeholder="Seu nome" {...register('nome')} error={errors.nome?.message} />
        <TextField label="Empresa ou propriedade" placeholder="Nome da fazenda ou empresa" {...register('empresaFazenda')} error={errors.empresaFazenda?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Telefone / WhatsApp"
          placeholder="(00) 00000-0000"
          inputMode="tel"
          {...register('telefone', { onChange: (e) => { e.target.value = maskWhatsapp(e.target.value); } })}
          error={errors.telefone?.message}
        />
        <TextField label="E-mail — opcional" placeholder="voce@exemplo.com" type="email" {...register('email')} error={errors.email?.message} />
      </div>

      <ConsentCheckbox
        label="Autorizo a Irrigasolar a entrar em contato comigo por WhatsApp, telefone ou e-mail sobre este diagnóstico, conforme a política de privacidade."
        {...register('consentimento')}
        error={errors.consentimento?.message}
      />

      <StepNav onBack={onBack} submitLabel="Revisar e enviar" />
    </form>
  );
}
