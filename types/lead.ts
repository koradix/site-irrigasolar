import type { Aplicacao, Urgencia } from '@/lib/configurador-schema';
import type { KitCompleto } from '@/lib/calcula-kit';

export type LeadStatus =
  | 'novo'
  | 'contatado'
  | 'em-proposta'
  | 'fechado'
  | 'perdido';

/** Tipo espelho da tabela `leads` no Supabase */
export interface Lead {
  id: string;
  created_at: string;

  nome: string;
  sobrenome: string;
  whatsapp: string;
  cep: string | null;
  cidade: string | null;
  uf: string | null;

  aplicacao: Aplicacao;
  dimensao_dados: DimensaoDados | null;
  urgencia: Urgencia | null;

  kit_calculado: KitCompleto | null;
  valor_calculado: number | null;

  status: LeadStatus;
  enviado_whatsapp: boolean;
  enviado_whatsapp_at: string | null;
  responded_at: string | null;
  tags: string[] | null;
}

/** Payload livre por aplicação — armazenado como jsonb em dimensao_dados */
export interface DimensaoDados {
  pocoPotencia?: number;
  pocoProfundidade?: number;
  pivoQuantidade?: '1' | '2-3' | '4+';
  pivoPotencia?: number;
  fazendaContaMensal?: number;
  multiploDescricao?: string;
}

/** Resposta da API de captura */
export interface ConfiguradorResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}
