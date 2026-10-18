import { describe, it, expect } from 'vitest';
import { avaliarTriagem } from '@/lib/orcamento-triagem';
import type { OrcamentoApiPayload, Motor } from '@/lib/orcamento-schema';

function motor(partial: Partial<Motor>): Motor {
  return {
    cv: 15,
    tensao: '380T',
    tipo: 'submersa',
    quantidade: 1,
    distanciaM: 60,
    ...partial,
  };
}

function basePayload(partial: Partial<OrcamentoApiPayload>): OrcamentoApiPayload {
  return {
    atividade: 'irrigacao',
    temBombeamento: 'sim',
    dorPrincipal: 'conta_alta',
    descricaoCliente: 'A conta de luz está muito alta no período de irrigação.',
    municipio: 'Ibitiba',
    uf: 'BA',
    rede: 'sim',
    contaLuzAnexos: [{ path: 'x/y.pdf', nome: 'conta.pdf', mime: 'application/pdf', bytes: 1000 }],
    demandaContratada: 'nao_sei',
    motores: [motor({})],
    nome: 'Maria Silva',
    whatsapp: '(75) 99999-0288',
    perfil: 'decisor',
    financiamento: 'talvez',
    consentimentoLgpd: true,
    ...partial,
  };
}

describe('avaliarTriagem', () => {
  it('BA 12,5 CV → D (abaixo da faixa, sem sinal de BESS)', () => {
    const r = avaliarTriagem(basePayload({ motores: [motor({ cv: 12.5 })] }));
    expect(r.resultado).toBe('D');
  });

  it('BA 15 CV 380V/60m com conta → A', () => {
    const r = avaliarTriagem(basePayload({ motores: [motor({ cv: 15, distanciaM: 60 })] }));
    expect(r.resultado).toBe('A');
    expect(r.preDimensionamentoCfw?.[0]).toMatchObject({ modulos700w: 42, kwp: 29.4 });
  });

  it('MG 40 CV → D (UF fora da BA, abaixo de 50 CV)', () => {
    const r = avaliarTriagem(basePayload({ uf: 'MG', motores: [motor({ cv: 40 })] }));
    expect(r.resultado).toBe('D');
  });

  it('MG 60 CV 440V/80m com conta → A', () => {
    const r = avaliarTriagem(basePayload({ uf: 'MG', motores: [motor({ cv: 60, tensao: '440T', distanciaM: 80 })] }));
    expect(r.resultado).toBe('A');
  });

  it('GO 75 CV/250m → C (distância exige reator/estudo)', () => {
    const r = avaliarTriagem(basePayload({ uf: 'GO', motores: [motor({ cv: 75, distanciaM: 250 })] }));
    expect(r.resultado).toBe('C');
  });

  it('aviário sem bombeamento + dor falta de energia + conta + demanda "não sei" → A', () => {
    const r = avaliarTriagem(
      basePayload({
        atividade: 'aviario',
        temBombeamento: 'nao',
        dorPrincipal: 'falta_energia',
        motores: [],
        demandaContratada: 'nao_sei',
      }),
    );
    expect(r.resultado).toBe('A');
    expect(r.solucaoInteresse).toBe('bess');
  });

  it('sem bombeamento e sem conta → B', () => {
    const r = avaliarTriagem(basePayload({ temBombeamento: 'nao', motores: [], contaLuzAnexos: [] }));
    expect(r.resultado).toBe('B');
    expect(r.dadosFaltantes).toContain('foto ou PDF da conta de luz');
  });

  it('bombeia água (motor 10 CV na BA, abaixo da faixa) + demanda contratada sim → A para BESS, bombeamento excluído', () => {
    const r = avaliarTriagem(
      basePayload({ temBombeamento: 'sim', motores: [motor({ cv: 10 })], demandaContratada: 'sim' }),
    );
    expect(r.resultado).toBe('A');
    expect(r.bombeamentoExcluido).toBe(true);
    expect(r.solucaoInteresse).toBe('bess');
    expect(r.motivos.some((m) => m.includes('Bombeamento solar não incluído'))).toBe(true);
  });

  it('motor monofásico único, sem sinal de BESS → D', () => {
    const r = avaliarTriagem(basePayload({ motores: [motor({ cv: 30, tensao: 'MONO' })] }));
    expect(r.resultado).toBe('D');
  });

  it('bombeia água e tem demanda contratada → C (combina bombeamento e continuidade, exige arquitetura conjunta)', () => {
    const r = avaliarTriagem(
      basePayload({ temBombeamento: 'sim', motores: [motor({ cv: 20 })], demandaContratada: 'sim' }),
    );
    expect(r.resultado).toBe('C');
    expect(r.solucaoInteresse).toBe('ambas');
  });
});
