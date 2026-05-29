/**
 * Helper compartilhado por /api/proposta (gatilho do site) e /api/configurador
 * (continuação automática do funil): gera PDF da proposta, persiste em
 * propostas, envia ao cliente via WAHA.
 */

import { gerarPropostaPDF, proximoNumeroProposta, type PropostaDados } from './pdf-proposta';
import { sendFile } from './waha';
import { getSupabaseAdmin } from './supabase';

export interface EnviarPropostaInput {
  phone: string;
  cliente: {
    nome: string;
    empresa?: string;
    cidade_uf?: string;
  };
  itens: Array<{ descricao: string; quantidade: number; valor_unitario: number }>;
  validade_dias?: number;
  observacoes?: string;
  aplicacao?: 'pivo' | 'poco' | 'fazenda' | 'multiplo';
  dimensao_cv?: number;
  caption?: string;
  lead_id?: string;
}

export interface EnviarPropostaResult {
  success: boolean;
  numero_proposta?: string;
  message_id?: string;
  error?: string;
}

export async function enviarPropostaCliente(
  input: EnviarPropostaInput,
): Promise<EnviarPropostaResult> {
  try {
    const numero = await proximoNumeroProposta();
    const dados: PropostaDados = {
      numero,
      data: new Date(),
      cliente: { ...input.cliente, whatsapp: input.phone },
      itens: input.itens,
      validade_dias: input.validade_dias ?? 15,
      observacoes: input.observacoes,
      aplicacao: input.aplicacao,
      dimensao_cv: input.dimensao_cv,
    };

    const { buffer, filename, calculada } = await gerarPropostaPDF(dados);

    // Persiste antes do envio
    let propostaRowId: string | null = null;
    try {
      const supabase = getSupabaseAdmin();
      const { data } = await supabase
        .from('propostas')
        .insert({
          chat_id: input.phone,
          numero_proposta: numero,
          dados: { ...dados, data: dados.data.toISOString() },
          valor: calculada.total,
          status: 'gerada',
          lead_id: input.lead_id ?? null,
        })
        .select('id')
        .single();
      propostaRowId = data?.id ?? null;
    } catch (err) {
      console.error('[proposta-sender] persistir falhou', err);
    }

    const caption =
      input.caption ??
      `Proposta ${numero} pronta. Conferimos qualquer detalhe por aqui.`;

    const send = await sendFile(input.phone, buffer, filename, caption);
    if (!send.success) {
      return { success: false, numero_proposta: numero, error: send.error };
    }

    if (propostaRowId) {
      try {
        const supabase = getSupabaseAdmin();
        await supabase
          .from('propostas')
          .update({ enviada_em: new Date().toISOString(), status: 'enviada' })
          .eq('id', propostaRowId);
      } catch (err) {
        console.error('[proposta-sender] update enviada_em falhou', err);
      }
    }

    return { success: true, numero_proposta: numero, message_id: send.messageId };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'erro interno',
    };
  }
}

/** Indica se o ambiente tem WAHA configurada (pra decidir se chama o sender ou não). */
export function wahaConfigurada(): boolean {
  return !!process.env.WAHA_API_KEY;
}
