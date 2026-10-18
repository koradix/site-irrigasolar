import { calcularPrecisao } from '@/lib/orcamento-precisao';
import type { OrcamentoData } from '@/lib/orcamento-schema';

export function PrecisionMeter({ data }: { data: OrcamentoData }) {
  const { percentual, mensagem } = calcularPrecisao(data);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-copper-text">
        <span>Precisão da sua proposta</span>
        <span>{percentual}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-rule">
        <div className="h-full rounded-full bg-copper transition-all" style={{ width: `${percentual}%` }} />
      </div>
      <p className="text-xs text-graphite/60">{mensagem}</p>
    </div>
  );
}
