import { z } from 'zod';

export type Aplicacao = 'pivo' | 'poco' | 'fazenda' | 'multiplo';
export type Urgencia = 'este-mes' | '3-meses' | 'pesquisando';

export interface ConfiguradorData {
  // Step 0 — Contato
  nome?: string;
  sobrenome?: string;
  whatsapp?: string;
  cep?: string;
  cidade?: string;
  uf?: string;

  // Step 1 — Aplicação
  aplicacao?: Aplicacao;

  // Step 2 — Dimensão (ramificado por aplicação)
  pocoPotencia?: number;
  pocoProfundidade?: number;
  pivoQuantidade?: '1' | '2-3' | '4+';
  pivoPotencia?: number;
  fazendaContaMensal?: number;
  multiploDescricao?: string;

  // Step 3 — Urgência
  urgencia?: Urgencia;
}

export const STEP_LABELS = ['Contato', 'Aplicação', 'Dimensão', 'Urgência', 'Confirmação'] as const;

export const APLICACAO_LABELS: Record<Aplicacao, string> = {
  pivo: 'Pivô central',
  poco: 'Poço artesiano',
  fazenda: 'Fazenda inteira',
  multiplo: 'Múltiplas aplicações',
};

export const URGENCIA_LABELS: Record<Urgencia, string> = {
  'este-mes': 'Este mês',
  '3-meses': 'Próximos 3 meses',
  pesquisando: 'Só pesquisando',
};

/** Validação Step 0 */
export const step0Schema = z.object({
  nome: z.string().min(2, 'Mínimo 2 letras'),
  sobrenome: z.string().min(2, 'Mínimo 2 letras'),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Use o formato (00) 00000-0000'),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
});
export type Step0Values = z.infer<typeof step0Schema>;

/** Step 1 */
export const step1Schema = z.object({
  aplicacao: z.enum(['pivo', 'poco', 'fazenda', 'multiplo'], {
    errorMap: () => ({ message: 'Selecione uma aplicação' }),
  }),
});
export type Step1Values = z.infer<typeof step1Schema>;

/** Step 2 — schemas separados por aplicação */
export const step2PocoSchema = z.object({
  pocoPotencia: z.number().min(4).max(125),
  pocoProfundidade: z.number().min(1).max(500),
});
export const step2PivoSchema = z.object({
  pivoQuantidade: z.enum(['1', '2-3', '4+']),
  pivoPotencia: z.number().min(10).max(500),
});
export const step2FazendaSchema = z.object({
  fazendaContaMensal: z.number().min(5000),
});
export const step2MultiploSchema = z.object({
  multiploDescricao: z.string().min(20, 'Conte um pouco mais sobre sua operação (min. 20 caracteres)'),
});

/** Step 3 */
export const step3Schema = z.object({
  urgencia: z.enum(['este-mes', '3-meses', 'pesquisando'], {
    errorMap: () => ({ message: 'Selecione um prazo' }),
  }),
});
export type Step3Values = z.infer<typeof step3Schema>;

/** Helpers */
export function maskWhatsapp(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function maskCEP(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}
