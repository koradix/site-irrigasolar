import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/**
 * Retorna o cliente Supabase singleton (server-side).
 * Usa SUPABASE_URL + SUPABASE_ANON_KEY do .env.local.
 *
 * RLS deve liberar INSERT para `anon` na tabela `leads`
 * (ver supabase/schema.sql).
 */
export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase não configurado: defina SUPABASE_URL e SUPABASE_ANON_KEY no .env.local',
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}
