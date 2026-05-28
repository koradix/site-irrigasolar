'use client';

import { Button } from '@/components/ui/Button';
import {
  APLICACAO_LABELS,
  URGENCIA_LABELS,
  type ConfiguradorData,
} from '@/lib/configurador-schema';

interface Props {
  data: ConfiguradorData;
  onBack: () => void;
}

const WHATSAPP_NUMBER = '5500000000000';

function buildWhatsAppMessage(d: ConfiguradorData): string {
  const linhas: string[] = [
    `*Novo kit configurado — ${d.nome ?? ''} ${d.sobrenome ?? ''}*`,
    '',
    `📱 WhatsApp: ${d.whatsapp ?? '-'}`,
    `📍 ${d.cidade ?? '-'} / ${d.uf ?? '-'} (CEP ${d.cep ?? '-'})`,
    '',
    `*Aplicação:* ${d.aplicacao ? APLICACAO_LABELS[d.aplicacao] : '-'}`,
  ];

  if (d.aplicacao === 'poco') {
    linhas.push(`*Bomba:* ${d.pocoPotencia ?? '-'} CV`);
    linhas.push(`*Profundidade:* ${d.pocoProfundidade ?? '-'} m`);
  } else if (d.aplicacao === 'pivo') {
    linhas.push(`*Pivôs:* ${d.pivoQuantidade ?? '-'}`);
    linhas.push(`*Potência total:* ${d.pivoPotencia ?? '-'} kWp`);
  } else if (d.aplicacao === 'fazenda') {
    const v = d.fazendaContaMensal;
    linhas.push(`*Conta média:* ${v ? `R$ ${v.toLocaleString('pt-BR')}/mês` : '-'}`);
  } else if (d.aplicacao === 'multiplo') {
    linhas.push(`*Descrição:* ${d.multiploDescricao ?? '-'}`);
  }

  linhas.push('');
  linhas.push(`*Prazo:* ${d.urgencia ? URGENCIA_LABELS[d.urgencia] : '-'}`);

  return linhas.join('\n');
}

export function Step4Confirmacao({ data, onBack }: Props) {
  const msg = encodeURIComponent(buildWhatsAppMessage(data));
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h3 className="font-headline text-3xl md:text-4xl font-semibold text-ink-deep leading-tight">
          Tudo certo, {data.nome}?
        </h3>
        <p className="italic text-ocher-dark text-base">
          Conferimos o resumo abaixo. Você abre o WhatsApp e a gente assume daqui.
        </p>
      </header>

      <dl className="bg-white border border-rule rounded-sm divide-y divide-rule">
        <Row label="Nome" value={`${data.nome ?? ''} ${data.sobrenome ?? ''}`} />
        <Row label="WhatsApp" value={data.whatsapp} />
        <Row label="Localização" value={`${data.cidade ?? '-'} / ${data.uf ?? '-'}`} />
        <Row label="Aplicação" value={data.aplicacao ? APLICACAO_LABELS[data.aplicacao] : '-'} />
        <Row label="Prazo" value={data.urgencia ? URGENCIA_LABELS[data.urgencia] : '-'} />
      </dl>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="solar-flare inline-flex w-full items-center justify-center text-[#311400] font-body font-bold uppercase tracking-[0.15em] text-sm px-8 py-5 rounded-sm shadow-lg active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ocher focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        ✓ Enviar meu kit no WhatsApp
      </a>

      <Button type="button" variant="ghost" onClick={onBack} className="w-full">
        ← Revisar respostas
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 px-5 py-3">
      <dt className="font-label uppercase tracking-[0.15em] text-[11px] font-bold text-ink-soft self-center">
        {label}
      </dt>
      <dd className="text-ink text-[15px] text-right">{value || '—'}</dd>
    </div>
  );
}
