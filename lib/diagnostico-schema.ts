import { z } from 'zod';

export const TIPO_OPERACAO = [
  'irrigacao',
  'armazenagem',
  'cadeia-fria',
  'leite',
  'aves-suinos',
  'beneficiamento',
  'outro',
] as const;
export type TipoOperacao = (typeof TIPO_OPERACAO)[number];

export const TIPO_OPERACAO_LABELS: Record<TipoOperacao, string> = {
  irrigacao: 'Irrigação / bombeamento',
  armazenagem: 'Armazenagem / silos / secagem',
  'cadeia-fria': 'Câmara fria / refrigeração',
  leite: 'Leite / ordenha',
  'aves-suinos': 'Aves / suínos',
  beneficiamento: 'Beneficiamento / processamento',
  outro: 'Outra operação',
};

export const PROBLEMA = [
  'quedas-energia',
  'uso-diesel',
  'ponta-demanda',
  'expansao',
  'rede-fraca',
  'operacao-off-grid',
] as const;
export type Problema = (typeof PROBLEMA)[number];

export const PROBLEMA_LABELS: Record<Problema, string> = {
  'quedas-energia': 'Quedas frequentes de energia',
  'uso-diesel': 'Dependência de gerador a diesel',
  'ponta-demanda': 'Custo de ponta / demanda contratada',
  expansao: 'Expansão da operação exige mais energia',
  'rede-fraca': 'Rede elétrica fraca ou instável',
  'operacao-off-grid': 'Operação sem acesso à rede elétrica',
};

export const FAIXA_CONTA = ['ate-5k', '5k-15k', '15k-40k', 'acima-40k', 'nao-sei'] as const;
export type FaixaConta = (typeof FAIXA_CONTA)[number];

export const FAIXA_CONTA_LABELS: Record<FaixaConta, string> = {
  'ate-5k': 'Até R$ 5 mil/mês',
  '5k-15k': 'R$ 5 mil a R$ 15 mil/mês',
  '15k-40k': 'R$ 15 mil a R$ 40 mil/mês',
  'acima-40k': 'Acima de R$ 40 mil/mês',
  'nao-sei': 'Não sei precisar',
};

export const HORAS_AUTONOMIA = ['1-2h', '2-6h', '6-12h', 'mais-12h', 'nao-sei'] as const;
export type HorasAutonomia = (typeof HORAS_AUTONOMIA)[number];

export const HORAS_AUTONOMIA_LABELS: Record<HorasAutonomia, string> = {
  '1-2h': '1 a 2 horas',
  '2-6h': '2 a 6 horas',
  '6-12h': '6 a 12 horas',
  'mais-12h': 'Mais de 12 horas',
  'nao-sei': 'Ainda não sei',
};

export const step1Schema = z.object({
  tipoOperacao: z.enum(TIPO_OPERACAO, { errorMap: () => ({ message: 'Selecione o tipo de operação' }) }),
  municipio: z.string().min(2, 'Informe o município'),
  uf: z
    .string()
    .length(2, 'Use a sigla do estado (ex.: BA)')
    .transform((v) => v.toUpperCase()),
});
export type Step1Values = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  problemas: z.array(z.enum(PROBLEMA)).min(1, 'Selecione ao menos um problema'),
  relato: z.string().max(600, 'Máximo de 600 caracteres').optional(),
});
export type Step2Values = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  possuiSolar: z.enum(['sim', 'nao']),
  possuiGerador: z.enum(['sim', 'nao']),
  possuiMediaTensao: z.enum(['sim', 'nao', 'nao-sei']),
  cargasCriticas: z.string().max(600, 'Máximo de 600 caracteres').optional(),
});
export type Step3Values = z.infer<typeof step3Schema>;

export const step4Schema = z.object({
  faixaContaMensal: z.enum(FAIXA_CONTA, { errorMap: () => ({ message: 'Selecione uma faixa' }) }),
  demandaContratadaKw: z.string().max(20).optional(),
  horasAutonomiaDesejada: z.enum(HORAS_AUTONOMIA, { errorMap: () => ({ message: 'Selecione uma opção' }) }),
});
export type Step4Values = z.infer<typeof step4Schema>;

export const step5Schema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  empresaFazenda: z.string().min(2, 'Informe o nome da empresa ou propriedade'),
  telefone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Use o formato (00) 00000-0000'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  consentimento: z.literal(true, { errorMap: () => ({ message: 'É necessário aceitar o contato para continuar' }) }),
});
export type Step5Values = z.infer<typeof step5Schema>;

export const diagnosticoSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);
export type DiagnosticoData = Partial<z.infer<typeof diagnosticoSchema>>;

/** Schema completo exigido pelo POST /api/diagnostico. */
export const diagnosticoApiSchema = diagnosticoSchema;
export type DiagnosticoApiPayload = z.infer<typeof diagnosticoApiSchema>;

export const STEP_LABELS = ['Operação', 'Problema', 'Infraestrutura', 'Dimensão', 'Contato', 'Confirmação'] as const;
