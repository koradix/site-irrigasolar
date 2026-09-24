import { describe, it, expect } from 'vitest';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  diagnosticoApiSchema,
  type DiagnosticoApiPayload,
} from '@/lib/diagnostico-schema';
import { montarMensagemDiagnostico } from '@/lib/diagnostico-mensagem';

function validPayload(): DiagnosticoApiPayload {
  return {
    tipoOperacao: 'irrigacao',
    municipio: 'Ibitiba',
    uf: 'BA',
    problemas: ['quedas-energia', 'uso-diesel'],
    relato: 'Quedas frequentes na época de chuva.',
    possuiSolar: 'sim',
    possuiGerador: 'nao',
    possuiMediaTensao: 'nao-sei',
    cargasCriticas: 'Bomba do pivô e câmara fria',
    faixaContaMensal: '15k-40k',
    demandaContratadaKw: '75',
    horasAutonomiaDesejada: '2-6h',
    nome: 'Maria Silva',
    empresaFazenda: 'Fazenda Boa Vista',
    telefone: '(75) 99999-0288',
    email: 'maria@exemplo.com',
    consentimento: true,
  };
}

describe('step1Schema', () => {
  it('aceita dados válidos e normaliza UF para maiúsculas', () => {
    const result = step1Schema.parse({ tipoOperacao: 'irrigacao', municipio: 'Ibitiba', uf: 'ba' });
    expect(result.uf).toBe('BA');
  });

  it('rejeita UF com tamanho diferente de 2', () => {
    expect(() => step1Schema.parse({ tipoOperacao: 'irrigacao', municipio: 'Ibitiba', uf: 'BAH' })).toThrow();
  });
});

describe('step2Schema', () => {
  it('exige ao menos um problema selecionado', () => {
    expect(() => step2Schema.parse({ problemas: [] })).toThrow();
  });

  it('aceita relato ausente (campo opcional)', () => {
    const result = step2Schema.parse({ problemas: ['quedas-energia'] });
    expect(result.relato).toBeUndefined();
  });
});

describe('step3Schema', () => {
  it('aceita as três opções de média tensão', () => {
    for (const v of ['sim', 'nao', 'nao-sei'] as const) {
      expect(() => step3Schema.parse({ possuiSolar: 'sim', possuiGerador: 'nao', possuiMediaTensao: v })).not.toThrow();
    }
  });
});

describe('step4Schema', () => {
  it('valida faixa de conta e autonomia', () => {
    const result = step4Schema.parse({ faixaContaMensal: 'nao-sei', horasAutonomiaDesejada: 'nao-sei' });
    expect(result.faixaContaMensal).toBe('nao-sei');
  });
});

describe('step5Schema', () => {
  it('exige consentimento explícito (true)', () => {
    expect(() =>
      step5Schema.parse({
        nome: 'Maria',
        empresaFazenda: 'Fazenda Boa Vista',
        telefone: '(75) 99999-0288',
        consentimento: false,
      }),
    ).toThrow();
  });

  it('rejeita telefone fora do formato mascarado', () => {
    expect(() =>
      step5Schema.parse({
        nome: 'Maria',
        empresaFazenda: 'Fazenda Boa Vista',
        telefone: '75999990288',
        consentimento: true,
      }),
    ).toThrow();
  });

  it('aceita e-mail vazio (opcional)', () => {
    const result = step5Schema.parse({
      nome: 'Maria',
      empresaFazenda: 'Fazenda Boa Vista',
      telefone: '(75) 99999-0288',
      email: '',
      consentimento: true,
    });
    expect(result.email).toBe('');
  });
});

describe('diagnosticoApiSchema', () => {
  it('valida o payload completo', () => {
    expect(() => diagnosticoApiSchema.parse(validPayload())).not.toThrow();
  });

  it('rejeita payload sem consentimento', () => {
    const payload = { ...validPayload(), consentimento: false as unknown as true };
    expect(() => diagnosticoApiSchema.parse(payload)).toThrow();
  });
});

describe('montarMensagemDiagnostico', () => {
  it('inclui operação, local e contato na mensagem', () => {
    const msg = montarMensagemDiagnostico(validPayload());
    expect(msg).toContain('Ibitiba/BA');
    expect(msg).toContain('Maria Silva');
    expect(msg).toContain('Fazenda Boa Vista');
    expect(msg).not.toContain('undefined');
  });

  it('omite campos opcionais ausentes sem quebrar', () => {
    const payload = validPayload();
    delete payload.relato;
    delete payload.cargasCriticas;
    delete payload.demandaContratadaKw;
    payload.email = '';
    const msg = montarMensagemDiagnostico(payload);
    expect(msg).not.toContain('Relato:');
    expect(msg).not.toContain('undefined');
  });
});
