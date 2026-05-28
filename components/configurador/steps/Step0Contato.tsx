'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  step0Schema,
  maskWhatsapp,
  maskCEP,
  type Step0Values,
  type ConfiguradorData,
} from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  update: (patch: Partial<ConfiguradorData>) => void;
  onNext: () => void;
}

export function Step0Contato({ data, update, onNext }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step0Values>({
    resolver: zodResolver(step0Schema),
    defaultValues: {
      nome: data.nome ?? '',
      sobrenome: data.sobrenome ?? '',
      whatsapp: data.whatsapp ?? '',
      cep: data.cep ?? '',
    },
    mode: 'onBlur',
  });

  const cep = watch('cep');

  // ViaCEP auto-fill
  useEffect(() => {
    const clean = cep?.replace(/\D/g, '');
    if (clean?.length !== 8) return;
    let aborted = false;
    fetch(`https://viacep.com.br/ws/${clean}/json/`)
      .then((r) => r.json())
      .then((res) => {
        if (aborted || res.erro) return;
        update({ cidade: res.localidade, uf: res.uf });
      })
      .catch(() => {});
    return () => {
      aborted = true;
    };
  }, [cep, update]);

  const onSubmit = (values: Step0Values) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <header className="space-y-3">
        <h3 className="font-headline text-3xl md:text-4xl font-semibold text-ink-deep leading-tight">
          Quem é você?
        </h3>
        <p className="italic text-ocher-dark text-base">
          Pra te chamar pelo nome e mandar a proposta no seu WhatsApp.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="nome"
          label="Nome"
          placeholder="Maria"
          {...register('nome')}
          error={errors.nome?.message}
        />
        <Input
          id="sobrenome"
          label="Sobrenome"
          placeholder="Silva"
          {...register('sobrenome')}
          error={errors.sobrenome?.message}
        />
      </div>

      <Input
        id="whatsapp"
        label="WhatsApp"
        placeholder="(00) 00000-0000"
        inputMode="tel"
        {...register('whatsapp', {
          onChange: (e) => {
            e.target.value = maskWhatsapp(e.target.value);
          },
        })}
        error={errors.whatsapp?.message}
      />

      <Input
        id="cep"
        label="CEP"
        placeholder="00000-000"
        inputMode="numeric"
        {...register('cep', {
          onChange: (e) => {
            e.target.value = maskCEP(e.target.value);
          },
        })}
        error={errors.cep?.message}
      />

      {data.cidade && data.uf && (
        <p className="font-label text-xs uppercase tracking-wide text-ocher-dark">
          ↳ {data.cidade} / {data.uf}
        </p>
      )}

      <div className="pt-4">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Próximo →
        </Button>
      </div>
    </form>
  );
}
