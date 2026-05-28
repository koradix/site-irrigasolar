export type LeadStatus = 'novo' | 'contatado' | 'qualificado' | 'fechado' | 'perdido';

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  cidade?: string;
  mensagem?: string;
  origem?: string;
  status: LeadStatus;
  createdAt: string;
}
