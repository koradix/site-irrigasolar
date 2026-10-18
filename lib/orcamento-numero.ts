import { getSupabaseAdmin } from './supabase';

/** Gera o próximo número de pedido no formato IS-AAAA-NNNNNN (seção 10 do prompt). */
export async function proximoNumeroPedido(): Promise<string> {
  const ano = new Date().getFullYear();
  try {
    const { count, error } = await getSupabaseAdmin()
      .from('orcamentos')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', `${ano}-01-01`);
    if (error || count === null) throw error ?? new Error('contagem indisponível');
    const sequencial = String(count + 1).padStart(6, '0');
    return `IS-${ano}-${sequencial}`;
  } catch {
    // Fallback aleatório — nunca bloqueia o envio do pedido por falha no banco.
    const aleatorio = String(Math.floor(Math.random() * 999999)).padStart(6, '0');
    return `IS-${ano}-${aleatorio}`;
  }
}
