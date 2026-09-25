interface SourceIconProps {
  x: number;
  y: number;
}

/** Ícones inline (mesmo traço de components/ui/icons.tsx) posicionados dentro do SVG do diagrama. */
function GridGlyph({ x, y }: SourceIconProps) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#B97832" strokeWidth={1.4} fill="none" strokeLinecap="round">
      <path d="M10 2v5M10 13v5M4 6l5 3M13 11l5 3M16 6l-5 3M9 11l-5 3" />
      <circle cx="10" cy="10" r="1.8" fill="#B97832" />
    </g>
  );
}

function SunGlyph({ x, y }: SourceIconProps) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#B97832" strokeWidth={1.4} fill="none" strokeLinecap="round">
      <circle cx="10" cy="10" r="3.4" />
      <path d="M10 1.5v2.5M10 16v2.5M2.5 10h2.5M15 10h2.5M4.4 4.4l1.8 1.8M13.8 13.8l1.8 1.8M4.4 15.6l1.8-1.8M13.8 6.2l1.8-1.8" />
    </g>
  );
}

function BatteryGlyph({ x, y }: SourceIconProps) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#B97832" strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="14.5" height="9" rx="1.3" />
      <path d="M17.5 8v3" />
      <path d="M6 8l-1.3 2.5H7L5.7 13" />
    </g>
  );
}

function GeneratorGlyph({ x, y }: SourceIconProps) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#B97832" strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="6" width="11" height="8" rx="0.8" />
      <circle cx="15.8" cy="10" r="2.2" />
      <path d="M4.5 6V4.5h4V6" />
    </g>
  );
}

function GearGlyph({ x, y }: SourceIconProps) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#F3EFE6" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="2.6" />
      <path d="M9 1.8v2M9 14.2v2M1.8 9h2M14.2 9h2M3.8 3.8l1.4 1.4M12.8 12.8l1.4 1.4M3.8 14.2l1.4-1.4M12.8 5.2l1.4-1.4" />
    </g>
  );
}

const SOURCES = [
  { label: 'Rede elétrica', Icon: GridGlyph },
  { label: 'Energia solar', Icon: SunGlyph },
  { label: 'BESS (baterias)', Icon: BatteryGlyph },
  { label: 'Gerador', Icon: GeneratorGlyph },
];

/**
 * Diagrama leve (SVG inline) da arquitetura energética integrada. Sem
 * imagem pesada — texto, ícones e formas nativas, com título/descrição
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
              <rect x={x + 10} y={y + 10} width={30} height={30} rx={3} fill="#FCFBF7" stroke="#DDD6C6" />
              <s.Icon x={x + 15} y={y + 15} />
              <text x={x + 52} y={y + 30} textAnchor="start" fontSize="14" fontWeight={600} fill="#18201C">
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
        <GearGlyph x={742} y={122} />
        <text x={670} y={150} textAnchor="middle" fontSize="14" fontWeight={700} fill="#FCFBF7">
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
