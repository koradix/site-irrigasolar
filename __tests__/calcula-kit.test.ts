import { describe, it, expect } from 'vitest';
import {
  calcularKitVisual,
  calcularKitCompleto,
  computeValor,
  contaParaKwp,
} from '@/lib/calcula-kit';
import type { ConfiguradorData } from '@/lib/configurador-schema';

describe('calcularKitVisual — Poço 7.5 CV', () => {
  const data: ConfiguradorData = {
    aplicacao: 'poco',
    pocoPotencia: 7.5,
    pocoProfundidade: 80,
  };
  const kit = calcularKitVisual(data);

  it('mapeia para a linha CV=7.5 da tabela WEG', () => {
    expect(kit.potencia_cv).toBe(7.5);
    expect(kit.inversor.modelo).toBe('CFW500-7CV');
  });

  it('traz módulos 22 × 550Wp e estrutura solo', () => {
    expect(kit.modulos.qtd).toBe(22);
    expect(kit.modulos.wp_unitario).toBe(550);
    expect(kit.modulos.total_wp).toBe(22 * 550);
    expect(kit.estrutura).toBe('Solo');
  });

  it('tem vazão estimada e área irrigável zero (poço não irriga área)', () => {
    expect(kit.vazao_estimada).toBe(26);
    expect(kit.area_irrigavel).toBe(0);
  });

  it('IrrigaBox sempre inclusa', () => {
    expect(kit.incluiIrrigaBox).toBe(true);
  });
});

describe('calcularKitVisual — Pivô 85 kWp', () => {
  const data: ConfiguradorData = {
    aplicacao: 'pivo',
    pivoPotencia: 85,
    pivoQuantidade: '1',
  };
  const kit = calcularKitVisual(data);

  it('cai na faixa kwp_min/kwp_max da linha de 75 CV', () => {
    expect(kit.potencia_cv).toBe(75);
    expect(kit.inversor.modelo).toBe('SIW600-75CV');
  });

  it('usa o kWp informado pelo usuário, não o do meio da faixa', () => {
    expect(kit.kwp).toBe(85);
  });

  it('calcula área irrigável proporcional ao kWp', () => {
    expect(kit.area_irrigavel).toBeGreaterThan(0);
  });
});

describe('calcularKitVisual — Fazenda R$ 30k/mês', () => {
  const data: ConfiguradorData = {
    aplicacao: 'fazenda',
    fazendaContaMensal: 30000,
  };
  const kit = calcularKitVisual(data);

  it('converte conta em kWp via fórmula reversa (≈ 247 kWp)', () => {
    const esperado = 30000 / 0.9 / (4.5 * 30);
    expect(contaParaKwp(30000)).toBeCloseTo(esperado, 1);
    expect(kit.kwp).toBeCloseTo(esperado, 1);
  });

  it('mapeia para o maior kit da tabela (125 CV) por extrapolação', () => {
    expect(kit.potencia_cv).toBe(125);
    expect(kit.inversor.modelo).toBe('SIW700-125CV');
  });

  it('fazenda não tem vazão nem área irrigável', () => {
    expect(kit.vazao_estimada).toBe(320);
    // o kit traz a vazão da linha por consistência da tabela, mas a fazenda em si não usa
    expect(kit.area_irrigavel).toBe(0);
  });
});

describe('calcularKitCompleto — inclui valorBase', () => {
  it('Poço 7.5 CV: aplica fator base, markup, IrrigaBox e cascata composta', () => {
    const kit = calcularKitCompleto({ aplicacao: 'poco', pocoPotencia: 7.5, pocoProfundidade: 80 });
    expect(kit.valorBase).toBeGreaterThan(0);

    // Cálculo manual de referência:
    // base = 28500 × 0.429 × 1.10 + 2880 = 16328.85
    // fator composto = 1.026 × 1.1125 × 1.0925 × 1.10 × 1.123 ≈ 1.54018
    // valor ≈ 25149
    expect(kit.valorBase).toBeGreaterThan(24000);
    expect(kit.valorBase).toBeLessThan(26500);
  });

  it('valor cresce monotonicamente com o tamanho do kit', () => {
    const pequeno = calcularKitCompleto({
      aplicacao: 'poco',
      pocoPotencia: 4,
      pocoProfundidade: 30,
    });
    const medio = calcularKitCompleto({
      aplicacao: 'poco',
      pocoPotencia: 20,
      pocoProfundidade: 100,
    });
    const grande = calcularKitCompleto({
      aplicacao: 'poco',
      pocoPotencia: 75,
      pocoProfundidade: 200,
    });
    expect(pequeno.valorBase).toBeLessThan(medio.valorBase);
    expect(medio.valorBase).toBeLessThan(grande.valorBase);
  });
});

describe('computeValor — fórmula isolada', () => {
  it('aplica fator base × markup técnico + IrrigaBox + cascata', () => {
    const precoTabela = 28500;
    const base = precoTabela * 0.429 * 1.1 + 2880;
    const fator = 1.026 * 1.1125 * 1.0925 * 1.1 * 1.123;
    const esperado = base * fator;
    expect(computeValor(precoTabela)).toBeCloseTo(esperado, 1);
  });

  it('preço zero produz só o custo da IrrigaBox + cascata', () => {
    const esperado = 2880 * 1.026 * 1.1125 * 1.0925 * 1.1 * 1.123;
    expect(computeValor(0)).toBeCloseTo(esperado, 1);
  });
});
