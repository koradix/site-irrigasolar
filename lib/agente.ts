/**
 * Orquestrador do agente comercial Irrigasolar.
 *
 * - Carrega histórico do chatId
 * - Roda turno do Claude (com tool use)
 * - Quando Claude chama gerar_proposta, executa o tool (PDF + envio WhatsApp)
 *   e devolve o tool_result pro próximo turno
 * - Persiste cada mensagem na tabela conversations
 * - Envia a resposta de texto final pelo WAHA
 */

import { appendMessage, getHistory } from './conversa';
import { runTurn } from './claude';
import { sendText, sendFile } from './waha';
import { gerarPropostaPDF, proximoNumeroProposta, type PropostaDados } from './pdf-proposta';
import { getSupabaseAdmin } from './supabase';

const MAX_TOOL_LOOPS = 3;

export interface IncomingMessage {
  chatId: string; // ex: "5575999590288@c.us" ou só dígitos
  text: string;
  customerName?: string;
}

/**
 * Processa uma mensagem inbound. Roda até o agente terminar (stop_reason != 'tool_use')
 * ou bater MAX_TOOL_LOOPS.
 */
export async function processarMensagem(msg: IncomingMessage): Promise<void> {
  // 1) Persiste a mensagem do usuário
  await appendMessage(msg.chatId, 'user', msg.text);

  let loop = 0;
  while (loop < MAX_TOOL_LOOPS) {
    loop++;
    const history = await getHistory(msg.chatId);
    const turn = await runTurn(history);

    // Persiste a resposta do assistant (com possíveis tool_uses)
    if (turn.toolUses.length > 0 || turn.text) {
      const assistantContent = (turn.raw.content as unknown) as Parameters<
        typeof appendMessage
      >[2];
      await appendMessage(msg.chatId, 'assistant', assistantContent);
    }

    // Sem tool_use → envia texto final e encerra
    if (turn.stopReason !== 'tool_use' || turn.toolUses.length === 0) {
      if (turn.text) {
        await sendText(msg.chatId, turn.text);
      }
      return;
    }

    // Executa cada tool_use e prepara tool_results
    const toolResults: Array<{
      type: 'tool_result';
      tool_use_id: string;
      content: string;
      is_error?: boolean;
    }> = [];

    for (const tu of turn.toolUses) {
      if (tu.name === 'gerar_proposta') {
        const result = await executarGerarProposta(msg.chatId, tu.input);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: tu.id,
          content: result.success
            ? `PDF da proposta ${result.numero} gerado e enviado ao cliente pelo WhatsApp. Total: ${result.totalFormatado}.`
            : `Falha ao gerar/enviar proposta: ${result.error}`,
          is_error: !result.success,
        });
      } else {
        toolResults.push({
          type: 'tool_result',
          tool_use_id: tu.id,
          content: `Ferramenta desconhecida: ${tu.name}`,
          is_error: true,
        });
      }
    }

    // Mensagem do "usuário" com os tool_results, pra o próximo turno
    await appendMessage(msg.chatId, 'user', toolResults);
  }

  // Hard stop por segurança
  await sendText(
    msg.chatId,
    'Desculpa, estou tendo dificuldade técnica agora. Um engenheiro vai te chamar em instantes.',
  );
}

interface ToolResult {
  success: boolean;
  numero?: string;
  totalFormatado?: string;
  error?: string;
}

/**
 * Executa a tool gerar_proposta: monta dados, gera PDF, envia WhatsApp,
 * persiste em propostas.
 */
async function executarGerarProposta(
  chatId: string,
  input: Record<string, unknown>,
): Promise<ToolResult> {
  try {
    const numero = await proximoNumeroProposta();
    const itens = (input.itens as PropostaDados['itens']) ?? [];
    const dados: PropostaDados = {
      numero,
      data: new Date(),
      cliente: {
        nome: String(input.nome_cliente),
        empresa: input.empresa ? String(input.empresa) : undefined,
        cidade_uf: input.cidade_uf ? String(input.cidade_uf) : undefined,
        whatsapp: chatId,
      },
      itens,
      validade_dias: Number(input.validade_dias) || 15,
      observacoes: input.observacoes ? String(input.observacoes) : undefined,
      aplicacao: input.aplicacao as PropostaDados['aplicacao'],
      dimensao_cv:
        typeof input.dimensao_cv === 'number' ? (input.dimensao_cv as number) : undefined,
    };

    const { buffer, filename, calculada } = await gerarPropostaPDF(dados);

    // Persiste antes do envio — garante registro mesmo se WhatsApp falhar
    let propostaRowId: string | null = null;
    try {
      const supabase = getSupabaseAdmin();
      const { data } = await supabase
        .from('propostas')
        .insert({
          chat_id: chatId,
          numero_proposta: numero,
          dados: { ...dados, data: dados.data.toISOString() },
          valor: calculada.total,
          status: 'gerada',
        })
        .select('id')
        .single();
      propostaRowId = data?.id ?? null;
    } catch (err) {
      console.error('[agente] persistir proposta falhou', err);
    }

    const send = await sendFile(
      chatId,
      buffer,
      filename,
      `Proposta ${numero} pronta. Conferimos qualquer detalhe por aqui.`,
    );

    if (!send.success) {
      return { success: false, error: send.error };
    }

    if (propostaRowId) {
      try {
        const supabase = getSupabaseAdmin();
        await supabase
          .from('propostas')
          .update({ enviada_em: new Date().toISOString(), status: 'enviada' })
          .eq('id', propostaRowId);
      } catch (err) {
        console.error('[agente] update enviada_em falhou', err);
      }
    }

    const totalFormatado = calculada.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });

    return { success: true, numero, totalFormatado };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'erro desconhecido',
    };
  }
}
