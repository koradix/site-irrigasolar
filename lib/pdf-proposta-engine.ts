/**
 * Lógica pura (sem JSX) do gerador de proposta — testável sem JSX runtime.
 * O componente React + render do PDF fica em pdf-proposta.tsx.
 */

import { calcularKitCompleto, type KitCompleto } from './calcula-kit';
import type { Aplicacao, ConfiguradorData } from './configurador-schema';
import { getSupabaseAdmin } from './supabase';

export interface PropostaItem {
  descricao: string;
  quantidade: number;
  valor_unitario: number;
}

export interface PropostaDados {
  numero: string;
  data: Date;
  cliente: {
    nome: string;
    empresa?: string;
    cidade_uf?: string;
    whatsapp?: string;
  };
  itens: PropostaItem[];
  validade_dias: number;
  observacoes?: string;
  /** Se preenchido, sobrescreve itens com kit Irrigasolar via tabela WEG */
  aplicacao?: Aplicacao;
  dimensao_cv?: number;
}

export interface PropostaCalculada extends PropostaDados {
  total: number;
  kit?: KitCompleto;
}

/**
 * Aplica regras de negócio: se aplicacao + dimensao_cv informados, usa o kit
 * Irrigasolar da tabela WEG (sobrescreve itens e total).
 */
export function preparar(dados: PropostaDados): PropostaCalculada {
  let kit: KitCompleto | undefined;
  let itens = dados.itens;

  if (dados.aplicacao && typeof dados.dimensao_cv === 'number') {
    const configuradorData = mapToConfiguradorData(dados.aplicacao, dados.dimensao_cv);
    kit = calcularKitCompleto(configuradorData);
    itens = [
      {
        descricao:
          `Kit ${labelAplicacao(dados.aplicacao)} ${kit.potencia_cv} CV — ${kit.modulos.qtd} módulos ${kit.modulos.wp_unitario} Wp + inversor WEG ${kit.inversor.modelo} + IrrigaBox® inclusa`,
        quantidade: 1,
        valor_unitario: kit.valorBase,
      },
    ];
  }

  const total = itens.reduce((acc, i) => acc + i.quantidade * i.valor_unitario, 0);
  return { ...dados, itens, total, kit };
}

function mapToConfiguradorData(aplicacao: Aplicacao, cv: number): ConfiguradorData {
  switch (aplicacao) {
    case 'poco':
      return { aplicacao, pocoPotencia: cv };
    case 'pivo':
      return { aplicacao, pivoPotencia: cv };
    case 'fazenda':
      // cv aqui é interpretado como conta mensal em milhares
      return { aplicacao, fazendaContaMensal: cv * 1000 };
    case 'multiplo':
      return { aplicacao };
  }
}

function labelAplicacao(a: Aplicacao): string {
  switch (a) {
    case 'pivo':
      return 'Pivô';
    case 'poco':
      return 'Bombeamento Solar';
    case 'fazenda':
      return 'Fazenda Solar';
    case 'multiplo':
      return 'Sistema Combinado';
  }
}

/**
 * Próximo número de proposta no formato IRRI-YYYY-NNNN, baseado na contagem
 * do ano corrente no Supabase. Fallback random quando o DB não está disponível.
 */
export async function proximoNumeroProposta(): Promise<string> {
  const year = new Date().getFullYear();
  const start = `${year}-01-01T00:00:00Z`;
  const end = `${year + 1}-01-01T00:00:00Z`;
  try {
    const supabase = getSupabaseAdmin();
    const { count } = await supabase
      .from('propostas')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', start)
      .lt('created_at', end);
    const seq = (count ?? 0) + 1;
    return `IRRI-${year}-${String(seq).padStart(4, '0')}`;
  } catch {
    const seq = Math.floor(Math.random() * 9000) + 1000;
    return `IRRI-${year}-${seq}`;
  }
}

export function brl(v: number): string {
  return v.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
