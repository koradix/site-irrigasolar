import type { Motor } from './orcamento-schema';

export interface PreDimensionamentoMotor {
  motorIndex: number;
  cv: number;
  modulos700w: number;
  kwp: number;
}

const FATOR_SOBREDIMENSIONAMENTO = 2.0;
const POTENCIA_MODULO_W = 700;
const MULTIPLO_MODULOS = 14;

/**
 * Pré-dimensionamento CFW500 — fórmula confirmada pelo proprietário em
 * `regras-precificacao.md`: módulos = arredondar para o múltiplo de 14
 * imediatamente superior de (CV × 750 × FS ÷ 700); kWp = módulos × 0,7.
 * Mostrado só nos resultados A/B da triagem, rotulado "sujeito à validação
 * da engenharia". Nunca inclui preço, economia, payback ou autonomia.
 */
export function preDimensionarMotor(cv: number): { modulos700w: number; kwp: number } {
  const bruto = (cv * 750 * FATOR_SOBREDIMENSIONAMENTO) / POTENCIA_MODULO_W;
  const modulos700w = Math.ceil(bruto / MULTIPLO_MODULOS) * MULTIPLO_MODULOS;
  const kwp = Math.round(((modulos700w * POTENCIA_MODULO_W) / 1000) * 10) / 10;
  return { modulos700w, kwp };
}

export function preDimensionarMotores(motores: Motor[]): PreDimensionamentoMotor[] {
  return motores.map((m, motorIndex) => ({
    motorIndex,
    cv: m.cv,
    ...preDimensionarMotor(m.cv),
  }));
}

/** Soma de CV da instalação — multiplica cada motor pela quantidade informada. */
export function somaCvInstalacao(motores: Motor[]): number {
  return motores.reduce((total, m) => total + m.cv * (m.quantidade || 1), 0);
}
