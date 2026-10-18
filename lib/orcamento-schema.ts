import { z } from 'zod';

/**
 * Número opcional vindo de um `<input type="number">` do react-hook-form.
 * Campo nunca tocado chega como `""`, não `undefined` — `z.coerce.number()`
 * sozinho transformaria isso em `0` (passando silenciosamente em
 * `.positive()` seria falso, mas em `.min(0)` passaria como se "0" tivesse
 * sido informado, o que é diferente de "não informado" para a triagem).
 * Este helper normaliza `""` para `undefined` antes de validar.
 */
function optionalNumber(schema: z.ZodNumber) {
  return z.preprocess((v) => (v === '' || v === undefined || v === null ? undefined : v), schema.optional());
}

/**
 * Enum opcional preenchido por um grupo de rádio do react-hook-form. Quando
 * nenhuma opção foi marcada, RHF entrega `null` para o grupo (não
 * `undefined`), e `z.enum().optional()` só aceita `undefined` — rejeitando
 * silenciosamente (sem mensagem visível, já que não há `error` ligado a
 * esses campos opcionais) e travando o submit do passo inteiro. Este
 * helper normaliza `null` para `undefined` antes de validar.
 */
function optionalEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess((v) => (v === null ? undefined : v), z.enum(values).optional());
}

// ============================================================
// Vocabulário (seção 7 do prompt de redesign)
// ============================================================

export const ATIVIDADE = [
  'aviario',
  'suinocultura',
  'pecuaria_leite',
  'pecuaria_corte',
  'irrigacao',
  'industria',
  'outra',
] as const;
export type Atividade = (typeof ATIVIDADE)[number];
export const ATIVIDADE_LABELS: Record<Atividade, string> = {
  aviario: 'Aviário',
  suinocultura: 'Suinocultura',
  pecuaria_leite: 'Pecuária leiteira',
  pecuaria_corte: 'Pecuária de corte',
  irrigacao: 'Irrigação',
  industria: 'Indústria / agroindústria',
  outra: 'Outra',
};

/**
 * Internos, nunca perguntados ao cliente (ele não sabe o que é "CFW500" ou
 * "BESS" — correção do proprietário, 18/10/2026). Derivado server-side em
 * `avaliarTriagem` a partir de `temBombeamento` + dados de energia, só para
 * registro interno e para o payload do webhook da engenharia.
 */
export const SOLUCAO_INTERESSE = ['cfw', 'bess', 'ambas'] as const;
export type SolucaoInteresse = (typeof SOLUCAO_INTERESSE)[number];

export const DOR = ['conta_alta', 'falta_energia', 'diesel', 'nao_consegue_crescer', 'outra'] as const;
export type Dor = (typeof DOR)[number];
export const DOR_LABELS: Record<Dor, string> = {
  conta_alta: 'Conta de luz alta',
  falta_energia: 'Falta / queda de energia',
  diesel: 'Gasto com diesel / gerador',
  nao_consegue_crescer: 'Não consigo aumentar a produção',
  outra: 'Outra',
};

/** Pré-marca "você bombeia água com motor?" conforme a atividade — o cliente pode mudar. */
export const ATIVIDADE_BOMBEAMENTO_PADRAO: Record<Atividade, 'sim' | 'nao'> = {
  aviario: 'nao',
  suinocultura: 'nao',
  pecuaria_leite: 'sim',
  pecuaria_corte: 'sim',
  irrigacao: 'sim',
  industria: 'nao',
  outra: 'nao',
};

export const REDE = ['sim', 'nao', 'instavel'] as const;
export type Rede = (typeof REDE)[number];
export const REDE_LABELS: Record<Rede, string> = {
  sim: 'Sim',
  nao: 'Não (sem rede)',
  instavel: 'Rede fraca / instável',
};

export const DEMANDA_CONTRATADA = ['sim', 'nao', 'nao_sei'] as const;
export type DemandaContratada = (typeof DEMANDA_CONTRATADA)[number];

export const FREQUENCIA_QUEDAS = ['algumas-mes', 'toda-semana', 'quase-todo-dia'] as const;
export type FrequenciaQuedas = (typeof FREQUENCIA_QUEDAS)[number];
export const FREQUENCIA_QUEDAS_LABELS: Record<FrequenciaQuedas, string> = {
  'algumas-mes': 'Algumas vezes por mês',
  'toda-semana': 'Toda semana',
  'quase-todo-dia': 'Quase todo dia',
};

export const TENSAO_MOTOR = ['220T', '380T', '440T', 'MONO', 'nao_sei'] as const;
export type TensaoMotor = (typeof TENSAO_MOTOR)[number];
export const TENSAO_MOTOR_LABELS: Record<TensaoMotor, string> = {
  '220T': '220 V trifásico',
  '380T': '380 V trifásico',
  '440T': '440 V trifásico',
  MONO: 'Monofásico',
  nao_sei: 'Não sei',
};

export const TIPO_BOMBA = ['submersa', 'superficie', 'pivo', 'outro'] as const;
export type TipoBomba = (typeof TIPO_BOMBA)[number];
export const TIPO_BOMBA_LABELS: Record<TipoBomba, string> = {
  submersa: 'Bomba submersa (poço)',
  superficie: 'Bomba de superfície (rio/açude/reservatório)',
  pivo: 'Pivô',
  outro: 'Outro',
};

export const PERFIL = ['decisor', 'gerente', 'tecnico', 'parceiro'] as const;
export type Perfil = (typeof PERFIL)[number];
export const PERFIL_LABELS: Record<Perfil, string> = {
  decisor: 'Proprietário / decisor',
  gerente: 'Gerente / administrador',
  tecnico: 'Técnico / projetista',
  parceiro: 'Indicação / parceiro',
};

export const FINANCIAMENTO = ['sim', 'nao', 'talvez'] as const;
export type Financiamento = (typeof FINANCIAMENTO)[number];

export const CV_RAPIDO_BA = [15, 20, 25, 30, 40, 50, 60, 75, 100] as const;
export const CV_RAPIDO_OUTRAS = [60, 75, 100, 125, 150, 200] as const;

// ============================================================
// Anexos
// ============================================================

export const anexoSchema = z.object({
  path: z.string().min(1),
  nome: z.string().min(1),
  mime: z.string().min(1),
  bytes: z.number().int().positive(),
});
export type Anexo = z.infer<typeof anexoSchema>;

// ============================================================
// Etapa 1 — O que você precisa
// ============================================================

export const step1Schema = z.object({
  atividade: z.enum(ATIVIDADE, { errorMap: () => ({ message: 'Selecione a atividade' }) }),
  /** Pergunta em linguagem de fazenda — nunca nomeia tecnologia (CFW500/BESS). */
  temBombeamento: z.enum(['sim', 'nao'], { errorMap: () => ({ message: 'Selecione uma opção' }) }),
  dorPrincipal: z.enum(DOR, { errorMap: () => ({ message: 'Selecione a maior dor hoje' }) }),
  doresSecundarias: z.array(z.enum(DOR)).optional(),
  descricaoCliente: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
  municipio: z.string().min(2, 'Informe o município'),
  uf: z
    .string()
    .length(2, 'Use a sigla do estado (ex.: BA)')
    .transform((v) => v.toUpperCase()),
});
export type Step1Values = z.infer<typeof step1Schema>;

// ============================================================
// Etapa 2 — Sua energia hoje
// ============================================================

export const step2Schema = z.object({
  rede: z.enum(REDE, { errorMap: () => ({ message: 'Selecione uma opção' }) }),
  contaLuzAnexos: z.array(anexoSchema).max(6).optional(),
  demandaContratada: z.enum(DEMANDA_CONTRATADA, { errorMap: () => ({ message: 'Selecione uma opção' }) }),
  demandaContratadaKw: z.string().max(20).optional(),
  transformadorKva: z.string().max(20).optional(),
  transformadorFotoAnexo: anexoSchema.optional(),
  ucsMesmoTitular: optionalEnum(['1', '2', '3', '4+']),
  dieselMensalBrl: z.string().max(20).optional(),
  geradorKva: z.string().max(20).optional(),
  frequenciaQuedas: optionalEnum(FREQUENCIA_QUEDAS),
});
export type Step2Values = z.infer<typeof step2Schema>;

// ============================================================
// Etapa 3 — Seus motores e bombas (CFW) ou cargas (BESS)
// ============================================================

export const motorSchema = z.object({
  cv: z.coerce.number().positive('Informe a potência em CV'),
  tensao: z.enum(TENSAO_MOTOR, { errorMap: () => ({ message: 'Selecione a tensão' }) }),
  tipo: z.enum(TIPO_BOMBA, { errorMap: () => ({ message: 'Selecione o tipo' }) }),
  quantidade: z.preprocess(
    (v) => (v === '' || v === undefined || v === null ? undefined : v),
    z.coerce.number().int().min(1).max(20).default(1),
  ),
  horasDia: optionalNumber(z.number().min(0).max(24)),
  meses: z.array(z.number().int().min(1).max(12)).optional(),
  distanciaM: optionalNumber(z.number().min(0)),
  plaquetaAnexo: anexoSchema.optional(),
});
export type Motor = z.infer<typeof motorSchema>;

export const cargasBessSchema = z.object({
  potenciaCritica: optionalNumber(z.number().positive()),
  unidade: optionalEnum(['kW', 'CV']),
  descricao: z.string().max(400).optional(),
  simultaneas: optionalEnum(['sim', 'nao', 'em-parte']),
});
export type CargasBess = z.infer<typeof cargasBessSchema>;

export const step3Schema = z.object({
  motores: z.array(motorSchema).max(10).optional(),
  cargasBess: cargasBessSchema.optional(),
});
export type Step3Values = z.infer<typeof step3Schema>;

// ============================================================
// Etapa 4 — Seus dados e envio
// ============================================================

export const step4Schema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  whatsapp: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Use o formato (00) 00000-0000'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  propriedade: z.string().max(120).optional(),
  perfil: z.enum(PERFIL, { errorMap: () => ({ message: 'Selecione uma opção' }) }),
  outraProposta: optionalEnum(['sim', 'nao']),
  financiamento: z.enum(FINANCIAMENTO, { errorMap: () => ({ message: 'Selecione uma opção' }) }),
  consentimentoLgpd: z.literal(true, {
    errorMap: () => ({ message: 'É necessário autorizar o contato para continuar' }),
  }),
});
export type Step4Values = z.infer<typeof step4Schema>;

// ============================================================
// Schema completo
// ============================================================

export const orcamentoSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);
export type OrcamentoData = Partial<z.infer<typeof orcamentoSchema>>;

export const orcamentoApiSchema = orcamentoSchema;
export type OrcamentoApiPayload = z.infer<typeof orcamentoApiSchema>;

export const STEP_LABELS = ['O que você precisa', 'Sua energia hoje', 'Motores e bombas', 'Seus dados'] as const;
