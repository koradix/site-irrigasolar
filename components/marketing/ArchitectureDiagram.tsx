const SOURCES = [
  { label: 'Rede elétrica' },
  { label: 'Energia solar' },
  { label: 'BESS (baterias)' },
  { label: 'Gerador' },
];

/**
 * Diagrama leve (SVG inline) da arquitetura energética integrada. Sem
 * imagem pesada — texto e formas nativas, com título/descrição
 * equivalentes para leitores de tela.
 */
export function ArchitectureDiagram() {
  return (
    <figure className="w-full">
      {/* Em telas estreitas o SVG rola horizontalmente em vez de encolher —
          encolher junto com a largura deixaria o texto ilegível no celular. */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          role="img"
          aria-labelledby="arch-diagram-title arch-diagram-desc"
          className="h-auto w-full min-w-[640px]"
        >
        <title id="arch-diagram-title">Arquitetura energética integrada</title>
        <desc id="arch-diagram-desc">
          Rede elétrica, energia solar, BESS e gerador se conectam a um sistema de gestão de
          energia (EMS), que decide de onde vem a energia a cada momento para alimentar as cargas
          críticas da operação.
        </desc>

        {SOURCES.map((s, i) => {
          const x = 40;
          const y = 20 + i * 70;
          return (
            <g key={s.label}>
              <rect x={x} y={y} width={190} height={50} rx={4} fill="#F3EFE6" stroke="#DDD6C6" />
              <text x={x + 95} y={y + 30} textAnchor="middle" fontSize="15" fontWeight={600} fill="#18201C">
                {s.label}
              </text>
              <line x1={x + 190} y1={y + 25} x2={340} y2={160} stroke="#B97832" strokeWidth={1.5} />
            </g>
          );
        })}

        {/* EMS central */}
        <rect x={340} y={125} width={140} height={70} rx={4} fill="#10271D" />
        <text x={410} y={155} textAnchor="middle" fontSize="14" fontWeight={700} fill="#FCFBF7">
          EMS
        </text>
        <text x={410} y={175} textAnchor="middle" fontSize="11" fill="#F3EFE6">
          Gestão de energia
        </text>

        <line x1={480} y1={160} x2={600} y2={160} stroke="#B97832" strokeWidth={2} markerEnd="url(#arrow)" />

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#B97832" />
          </marker>
        </defs>

        <rect x={600} y={110} width={170} height={100} rx={4} fill="#244C3A" />
        <text x={685} y={150} textAnchor="middle" fontSize="14" fontWeight={700} fill="#FCFBF7">
          Cargas críticas
        </text>
        <text x={685} y={170} textAnchor="middle" fontSize="11" fill="#F3EFE6">
          da operação
        </text>
        <text x={685} y={188} textAnchor="middle" fontSize="11" fill="#F3EFE6">
          (bombas, resfriadores,
        </text>
        <text x={685} y={202} textAnchor="middle" fontSize="11" fill="#F3EFE6">
          ventilação...)
        </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-sm text-graphite/70 max-w-2xl">
        Rede, energia solar, BESS e gerador se integram por meio de um sistema de gestão de
        energia (EMS), que direciona o fornecimento para as cargas críticas da operação conforme a
        estratégia definida em projeto.
      </figcaption>
    </figure>
  );
}
