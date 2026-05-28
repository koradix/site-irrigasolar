import tabela from './tabela-weg.json';
import { APLICACAO_LABELS, type Aplicacao, type ConfiguradorData } from './configurador-schema';

/** Linha da tabela WEG */
export interface TabelaRow {
  cv: number;
  kwp_min: number;
  kwp_max: number;
  modulos_qtd: number;
  modulos_wp: number;
  inversor_modelo: string;
  estrutura_default: string;
  vazao_m3h_estimada: number;
  preco_tabela_weg: number;
}

const TABELA = tabela as TabelaRow[];

/** Parâmetros de mercado pra conversão conta→kWp (fazenda) */
const TARIFA_KWH_ESTIMADA = 0.9; // R$/kWh
const HORAS_SOL_DIA = 4.5;
const DIAS_MES = 30;

/** Markup técnico aplicado sobre o preço da tabela WEG */
const FATOR_BASE = 0.429;
const MARKUP_TECNICO = 1.10;

/** Valor fixo da IrrigaBox (sempre inclusa) */
const PRECO_IRRIGABOX = 2880;

/** Cascata de custos aplicada de forma composta sobre o subtotal */
const CUSTOS_COMPOSTOS = [
  { nome: 'acabamento_eletrico', taxa: 0.026 },
  { nome: 'instalacao', taxa: 0.1125 },
  { nome: 'impostos', taxa: 0.0925 },
  { nome: 'comissao', taxa: 0.10 },
  { nome: 'margem', taxa: 0.123 },
];

export interface KitVisual {
  aplicacao: string;
  /** Vazio quando não se aplica (ex: fazenda) */
  potencia_cv: number;
  kwp: number;
  modulos: {
    qtd: number;
    wp_unitario: number;
    total_wp: number;
  };
  inversor: {
    modelo: string;
  };
  estrutura: string;
  vazao_estimada: number;
  area_irrigavel: number;
  incluiIrrigaBox: true;
}

export interface KitCompleto extends KitVisual {
  valorBase: number;
}

/**
 * Retorna a estrutura do kit SEM o valor — usado pelo front (prévia visual).
 */
export function calcularKitVisual(d: ConfiguradorData): KitVisual {
  const row = pickRow(d);
  const aplicacaoLabel = d.aplicacao ? APLICACAO_LABELS[d.aplicacao] : 'A definir';

  if (!row) {
    return {
      aplicacao: aplicacaoLabel,
      potencia_cv: 0,
      kwp: 0,
      modulos: { qtd: 0, wp_unitario: 550, total_wp: 0 },
      inversor: { modelo: 'a dimensionar' },
      estrutura: 'A definir',
      vazao_estimada: 0,
      area_irrigavel: 0,
      incluiIrrigaBox: true,
    };
  }

  const kwp = pickKwp(d, row);
  const areaIrrigavel = computeAreaIrrigavel(d.aplicacao, kwp);

  return {
    aplicacao: aplicacaoLabel,
    potencia_cv: row.cv,
    kwp,
    modulos: {
      qtd: row.modulos_qtd,
      wp_unitario: row.modulos_wp,
      total_wp: row.modulos_qtd * row.modulos_wp,
    },
    inversor: { modelo: row.inversor_modelo },
    estrutura: capitalize(row.estrutura_default),
    vazao_estimada: row.vazao_m3h_estimada,
    area_irrigavel: areaIrrigavel,
    incluiIrrigaBox: true,
  };
}

/**
 * Retorna a estrutura do kit COM o valor — usado no back-end ao gerar a proposta.
 * Nunca exponha esse valor diretamente na LP.
 */
export function calcularKitCompleto(d: ConfiguradorData): KitCompleto {
  const visual = calcularKitVisual(d);
  const row = pickRow(d);
  const valorBase = row ? computeValor(row.preco_tabela_weg) : 0;
  return { ...visual, valorBase };
}

/* ============================================================
   Helpers
   ============================================================ */

function pickRow(d: ConfiguradorData): TabelaRow | undefined {
  switch (d.aplicacao) {
    case 'poco':
      return d.pocoPotencia ? nearestByCv(d.pocoPotencia) : undefined;
    case 'pivo':
      return d.pivoPotencia ? matchByKwp(d.pivoPotencia) : undefined;
    case 'fazenda': {
      if (!d.fazendaContaMensal) return undefined;
      const kwp = contaParaKwp(d.fazendaContaMensal);
      return matchByKwp(kwp);
    }
    case 'multiplo':
      // Sem entrada quantitativa nesse step — sem mapeamento automático.
      return undefined;
    default:
      return undefined;
  }
}

/** Acha a linha cujo CV é mais próximo (com piso preferido pra não superestimar) */
function nearestByCv(cv: number): TabelaRow {
  // tabela ordenada por CV crescente — pega a maior linha cujo CV <= entrada
  let chosen = TABELA[0];
  for (const row of TABELA) {
    if (row.cv <= cv) chosen = row;
    else break;
  }
  // se cv pedido for maior que o teto, usa a última
  if (cv > TABELA[TABELA.length - 1].cv) chosen = TABELA[TABELA.length - 1];
  return chosen;
}

/** Acha a linha cujo intervalo [kwp_min, kwp_max] contém o kWp; senão, vizinho mais próximo */
function matchByKwp(kwp: number): TabelaRow {
  const within = TABELA.find((r) => kwp >= r.kwp_min && kwp <= r.kwp_max);
  if (within) return within;
  // fora dos intervalos — pega o mais próximo do meio do intervalo
  let best = TABELA[0];
  let bestDist = Infinity;
  for (const r of TABELA) {
    const mid = (r.kwp_min + r.kwp_max) / 2;
    const dist = Math.abs(mid - kwp);
    if (dist < bestDist) {
      bestDist = dist;
      best = r;
    }
  }
  return best;
}

/** kWp pra ficha técnica — usa o valor informado quando possível, senão meio do intervalo */
function pickKwp(d: ConfiguradorData, row: TabelaRow): number {
  if (d.aplicacao === 'pivo' && d.pivoPotencia) return d.pivoPotencia;
  if (d.aplicacao === 'fazenda' && d.fazendaContaMensal) {
    return round(contaParaKwp(d.fazendaContaMensal), 1);
  }
  // poço: usa centro do intervalo da tabela
  return round((row.kwp_min + row.kwp_max) / 2, 1);
}

/** Fórmula reversa: conta mensal → kWp necessário */
export function contaParaKwp(contaMensal: number): number {
  const kwhMes = contaMensal / TARIFA_KWH_ESTIMADA;
  const kwhDia = kwhMes / DIAS_MES;
  const kwp = kwhDia / HORAS_SOL_DIA;
  return round(kwp, 2);
}

function computeAreaIrrigavel(aplicacao: Aplicacao | undefined, kwp: number): number {
  if (aplicacao === 'pivo') return round(kwp * 0.9, 1);
  return 0;
}

/** Cálculo do valor final do kit (subtotal + IrrigaBox + cascata) */
export function computeValor(precoTabelaWeg: number): number {
  let subtotal = precoTabelaWeg * FATOR_BASE * MARKUP_TECNICO + PRECO_IRRIGABOX;
  for (const c of CUSTOS_COMPOSTOS) {
    subtotal *= 1 + c.taxa;
  }
  return round(subtotal, 2);
}

function round(v: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(v * f) / f;
}

function capitalize(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}
