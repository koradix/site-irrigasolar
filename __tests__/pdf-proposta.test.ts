import { describe, it, expect } from 'vitest';
import {
  preparar,
  proximoNumeroProposta,
  type PropostaDados,
} from '@/lib/pdf-proposta-engine';

function basePropostaDados(over: Partial<PropostaDados> = {}): PropostaDados {
  return {
    numero: 'IRRI-2026-0001',
    data: new Date('2026-05-29T12:00:00Z'),
    cliente: { nome: 'Cliente Teste' },
    itens: [],
    validade_dias: 15,
    ...over,
  };
}

describe('preparar — itens livres', () => {
  it('mantém os itens informados e calcula total quantidade × valor_unitario', () => {
    const dados = basePropostaDados({
      itens: [
        { descricao: 'Visita técnica', quantidade: 1, valor_unitario: 800 },
        { descricao: 'Cabo solar 6mm (m)', quantidade: 50, valor_unitario: 9.5 },
      ],
    });
    const out = preparar(dados);
    expect(out.itens).toHaveLength(2);
    expect(out.total).toBe(800 + 50 * 9.5);
    expect(out.kit).toBeUndefined();
  });
});

describe('preparar — engine Irrigasolar (aplicacao + dimensao_cv)', () => {
  it('Poço 7.5 CV: sobrescreve itens com o kit calculado + valor da tabela WEG', () => {
    const dados = basePropostaDados({
      aplicacao: 'poco',
      dimensao_cv: 7.5,
      itens: [{ descricao: 'placeholder', quantidade: 1, valor_unitario: 0 }],
    });
    const out = preparar(dados);

    expect(out.kit).toBeDefined();
    expect(out.kit!.inversor.modelo).toBe('CFW500-7CV');
    expect(out.itens).toHaveLength(1);
    expect(out.itens[0].descricao).toContain('CFW500-7CV');
    expect(out.itens[0].descricao).toContain('22 módulos 550');
    expect(out.total).toBe(out.kit!.valorBase);
    expect(out.total).toBeGreaterThan(0);
  });

  it('Pivô 85 kWp: descreve o kit do pivô e usa o valor da engine', () => {
    const dados = basePropostaDados({
      aplicacao: 'pivo',
      dimensao_cv: 85,
      itens: [{ descricao: 'placeholder', quantidade: 1, valor_unitario: 0 }],
    });
    const out = preparar(dados);
    expect(out.kit?.inversor.modelo).toBe('SIW600-75CV');
    expect(out.itens[0].descricao).toContain('Pivô');
    expect(out.total).toBe(out.kit!.valorBase);
  });

  it('Fazenda interpreta dimensao_cv em milhares de R$/mês para a conta', () => {
    const dados = basePropostaDados({
      aplicacao: 'fazenda',
      dimensao_cv: 30, // 30 → R$ 30.000/mês
      itens: [{ descricao: 'placeholder', quantidade: 1, valor_unitario: 0 }],
    });
    const out = preparar(dados);
    expect(out.kit).toBeDefined();
    expect(out.kit?.aplicacao).toContain('Fazenda');
    expect(out.total).toBe(out.kit!.valorBase);
  });
});

describe('proximoNumeroProposta', () => {
  it('retorna IRRI-YYYY-NNNN com 4 dígitos zero-padded mesmo no fallback', async () => {
    const numero = await proximoNumeroProposta();
    const year = new Date().getFullYear();
    expect(numero).toMatch(new RegExp(`^IRRI-${year}-\\d{4}$`));
  });
});
