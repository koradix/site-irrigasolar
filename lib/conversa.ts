import { getSupabaseAdmin } from './supabase';

export type ConversaRole = 'user' | 'assistant';

/**
 * Mensagem do histórico, no formato esperado pela API da Anthropic.
 * Content é polimórfico: string ou array de blocos (text, tool_use, tool_result).
 */
export interface ConversaMessage {
  role: ConversaRole;
  content: ConversaContent;
}

export type ConversaContent =
  | string
  | Array<
      | { type: 'text'; text: string }
      | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
      | {
          type: 'tool_result';
          tool_use_id: string;
          content: string | Array<{ type: 'text'; text: string }>;
          is_error?: boolean;
        }
    >;

const TABLE = 'conversations';
const DEFAULT_LIMIT = 30;
const DEFAULT_TTL_HOURS = 24;

/**
 * Adiciona uma mensagem à memória de um chatId.
 * Conteúdo é serializado como jsonb (suporta string ou blocos da Anthropic).
 */
export async function appendMessage(
  chatId: string,
  role: ConversaRole,
  content: ConversaContent,
  ttlHours: number = DEFAULT_TTL_HOURS,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000).toISOString();

  const { error } = await supabase.from(TABLE).insert({
    chat_id: chatId,
    role,
    content,
    expires_at: expiresAt,
  });

  if (error) {
    throw new Error(`Falha ao persistir mensagem (${chatId}): ${error.message}`);
  }
}

/**
 * Carrega o histórico de mensagens de um chatId, em ordem cronológica (mais antiga → mais nova).
 * @param limit — número máximo de mensagens retornadas (default 30, janela suficiente para Claude)
 */
export async function getHistory(
  chatId: string,
  limit: number = DEFAULT_LIMIT,
): Promise<ConversaMessage[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select('role, content, created_at')
    .eq('chat_id', chatId)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Falha ao carregar histórico (${chatId}): ${error.message}`);
  }

  return (data ?? [])
    .reverse()
    .map((row) => ({ role: row.role as ConversaRole, content: row.content as ConversaContent }));
}

/** Apaga todo o histórico de um chatId. Útil para "reiniciar conversa". */
export async function resetConversation(chatId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from(TABLE).delete().eq('chat_id', chatId);
  if (error) {
    throw new Error(`Falha ao resetar conversa (${chatId}): ${error.message}`);
  }
}

/** Remove mensagens já expiradas (cleanup manual; em prod use pg_cron com cleanup_expired_conversations()). */
export async function cleanupExpired(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { error, count } = await supabase
    .from(TABLE)
    .delete({ count: 'exact' })
    .lt('expires_at', new Date().toISOString());

  if (error) {
    throw new Error(`Falha no cleanup: ${error.message}`);
  }
  return count ?? 0;
}
