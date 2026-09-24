'use client';

import { Button } from '@/components/ui/Button';
import { Input, FieldLabel } from '@/components/ui/Input';
import { cn } from '@/lib/cn';
import type { ConfiguradorData } from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  update: (patch: Partial<ConfiguradorData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function brl(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function Step2Dimensao({ data, update, onNext, onBack }: Props) {
  const renderForm = () => {
    switch (data.aplicacao) {
      case 'poco':
        return <PocoForm data={data} update={update} />;
      case 'pivo':
        return <PivoForm data={data} update={update} />;
      case 'fazenda':
        return <FazendaForm data={data} update={update} />;
      case 'multiplo':
        return <MultiploForm data={data} update={update} />;
      default:
        return (
          <p className="text-ink-soft italic">
            Volte e escolha uma aplicação para continuar.
          </p>
        );
    }
  };

  const canAdvance = (() => {
    switch (data.aplicacao) {
      case 'poco':
        return !!(data.pocoPotencia && data.pocoProfundidade);
      case 'pivo':
        return !!(data.pivoQuantidade && data.pivoPotencia);
      case 'fazenda':
        return !!data.fazendaContaMensal;
      case 'multiplo':
        return !!(data.multiploDescricao && data.multiploDescricao.length >= 20);
      default:
        return false;
    }
  })();

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h3 className="font-headline text-3xl md:text-4xl font-semibold text-ink-deep leading-tight">
          Qual o tamanho da operação?
        </h3>
        <p className="italic text-ocher-dark text-base">
          Esses dados afinam o dimensionamento do kit — sem chute.
        </p>
      </header>

      {renderForm()}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <Button type="button" disabled={!canAdvance} onClick={onNext} size="lg">
          Próximo →
        </Button>
      </div>
    </div>
  );
}

function PocoForm({
  data,
  update,
}: {
  data: ConfiguradorData;
  update: (p: Partial<ConfiguradorData>) => void;
}) {
  const potencia = data.pocoPotencia ?? 15;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <FieldLabel>Potência da bomba — {potencia} CV</FieldLabel>
        <input
          type="range"
          min={4}
          max={125}
          step={1}
          value={potencia}
          onChange={(e) => update({ pocoPotencia: Number(e.target.value) })}
          className="w-full accent-ocher"
        />
        <div className="flex justify-between text-[11px] font-label text-ink-soft uppercase tracking-wide">
          <span>4 CV</span>
          <span>125 CV</span>
        </div>
      </div>

      <Input
        label="Profundidade do poço (m)"
        type="number"
        min={1}
        max={500}
        value={data.pocoProfundidade ?? ''}
        placeholder="ex: 60"
        onChange={(e) => update({ pocoProfundidade: Number(e.target.value) })}
      />
    </div>
  );
}

function PivoForm({
  data,
  update,
}: {
  data: ConfiguradorData;
  update: (p: Partial<ConfiguradorData>) => void;
}) {
  const opts: Array<'1' | '2-3' | '4+'> = ['1', '2-3', '4+'];
  const potencia = data.pivoPotencia ?? 50;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <FieldLabel>Quantos pivôs?</FieldLabel>
        <div className="grid grid-cols-3 gap-2">
          {opts.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => update({ pivoQuantidade: o })}
              className={cn(
                'py-3 rounded-sm border font-label uppercase tracking-[0.15em] text-sm font-bold transition-colors',
                data.pivoQuantidade === o
                  ? 'border-ocher bg-ocher/10 text-ocher-dark'
                  : 'border-rule bg-white text-ink hover:border-ocher/60',
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <FieldLabel>Potência total estimada — {potencia} kWp</FieldLabel>
        <input
          type="range"
          min={10}
          max={500}
          step={5}
          value={potencia}
          onChange={(e) => update({ pivoPotencia: Number(e.target.value) })}
          className="w-full accent-ocher"
        />
        <div className="flex justify-between text-[11px] font-label text-ink-soft uppercase tracking-wide">
          <span>10 kWp</span>
          <span>500 kWp</span>
        </div>
      </div>
    </div>
  );
}

function FazendaForm({
  data,
  update,
}: {
  data: ConfiguradorData;
  update: (p: Partial<ConfiguradorData>) => void;
}) {
  const FAIXAS = [5000, 15000, 30000, 60000, 100000];
  return (
    <div className="space-y-2">
      <FieldLabel>Conta de luz média mensal</FieldLabel>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {FAIXAS.map((v) => (
          <button
            type="button"
            key={v}
            onClick={() => update({ fazendaContaMensal: v })}
            className={cn(
              'py-3 px-2 rounded-sm border font-label text-[13px] font-bold transition-colors',
              data.fazendaContaMensal === v
                ? 'border-ocher bg-ocher/10 text-ocher-dark'
                : 'border-rule bg-white text-ink hover:border-ocher/60',
            )}
          >
            {brl(v)}
            {v === 100000 && '+'}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiploForm({
  data,
  update,
}: {
  data: ConfiguradorData;
  update: (p: Partial<ConfiguradorData>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FieldLabel>Descreva sua operação</FieldLabel>
        <textarea
          rows={5}
          value={data.multiploDescricao ?? ''}
          onChange={(e) => update({ multiploDescricao: e.target.value })}
          placeholder="Ex: tenho 2 pivôs de 60 ha + casa + curral + 1 poço artesiano de 80m..."
          className="w-full bg-white border border-rule rounded-sm px-4 py-3 text-ink font-body text-[15px] focus:outline-none focus:border-ocher focus:ring-1 focus:ring-ocher transition-colors placeholder:text-ink-soft/50 resize-y"
        />
        <p className="text-xs text-ink-soft">Mínimo 20 caracteres.</p>
      </div>

      <div className="space-y-2">
        <FieldLabel>Conta de luz (opcional — PDF ou foto)</FieldLabel>
        <label
          htmlFor="conta-upload"
          className="block bg-white border border-dashed border-rule hover:border-ocher rounded-sm px-4 py-6 text-center cursor-pointer transition-colors"
        >
          <span className="text-sm text-ink-soft">Clique pra anexar — ajuda no dimensionamento</span>
          <input id="conta-upload" type="file" accept="image/*,application/pdf" className="hidden" />
        </label>
      </div>
    </div>
  );
}
