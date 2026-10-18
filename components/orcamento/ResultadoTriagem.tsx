import type { TriagemOutput } from '@/lib/orcamento-triagem';

interface Props {
  pedidoId: string;
  triagem: TriagemOutput;
  whatsappUrl?: string;
}

const PASSOS = [
  'Você envia os dados',
  'Engenharia analisa e monta a proposta',
  'Você recebe a proposta e conversa com o engenheiro',
];

export function ResultadoTriagem({ pedidoId, triagem, whatsappUrl }: Props) {
  return (
    <div className="space-y-6 rounded-sm border border-rule bg-paper p-6 md:p-8">
      <Cabecalho resultado={triagem.resultado} pedidoId={pedidoId} />

      {triagem.motivos.length > 0 && (
        <ul className="space-y-1.5 text-sm text-graphite/75">
          {triagem.motivos.map((m) => (
            <li key={m}>· {m}</li>
          ))}
        </ul>
      )}

      {triagem.resultado === 'B' && triagem.dadosFaltantes.length > 0 && (
        <div className="rounded-sm border border-copper/40 bg-sand/40 p-4">
          <p className="text-sm font-semibold text-forest">Para a proposta ficar precisa, ainda falta:</p>
          <ul className="mt-2 space-y-1 text-sm text-graphite/75">
            {triagem.dadosFaltantes.map((d) => (
              <li key={d}>· {d}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-graphite/60">
            Seu pedido já está registrado (nº {pedidoId}). Você pode nos mandar esses dados a qualquer momento pelo
            WhatsApp, citando esse número.
          </p>
        </div>
      )}

      {(triagem.resultado === 'A' || triagem.resultado === 'B') && triagem.preDimensionamentoCfw && triagem.preDimensionamentoCfw.length > 0 && (
        <div className="rounded-sm border border-rule bg-sand/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-copper-text">
            Pré-dimensionamento — sujeito à validação da engenharia
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {triagem.preDimensionamentoCfw.map((p) => (
              <li key={p.motorIndex} className="font-mono">
                Motor {p.motorIndex + 1} ({p.cv} CV): {p.modulos700w} módulos · ≈ {p.kwp.toFixed(1)} kWp
              </li>
            ))}
          </ul>
        </div>
      )}

      {(triagem.resultado === 'A' || triagem.resultado === 'B') && (
        <ol className="space-y-2 text-sm">
          {PASSOS.map((p, i) => (
            <li key={p} className="flex gap-3">
              <span className="font-mono text-copper-text">{i + 1}</span>
              <span className="text-graphite/80">{p}</span>
            </li>
          ))}
        </ol>
      )}

      {triagem.resultado === 'D' && (
        <p className="text-sm text-graphite/75">
          Quer que avisemos quando passarmos a atender sua faixa de potência? É só mandar essa mensagem pelo WhatsApp
          abaixo.
        </p>
      )}

      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center rounded-sm bg-[#25D366] px-6 text-sm font-semibold text-forest hover:brightness-95"
        >
          {triagem.resultado === 'A'
            ? `Falar com o engenheiro sobre o pedido ${pedidoId}`
            : 'Conversar no WhatsApp'}
        </a>
      )}
    </div>
  );
}

function Cabecalho({ resultado, pedidoId }: { resultado: TriagemOutput['resultado']; pedidoId: string }) {
  const titulo: Record<TriagemOutput['resultado'], string> = {
    A: 'Atendemos. Sua proposta já está em preparo.',
    B: 'Atendemos, mas faltam dados para a proposta ficar precisa.',
    C: 'Seu caso precisa de uma análise da engenharia antes da proposta.',
    D: 'Neste momento não conseguimos atender este pedido.',
  };
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-copper-text">Pedido {pedidoId}</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-forest">{titulo[resultado]}</h2>
    </div>
  );
}
