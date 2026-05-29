import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedAnon: SupabaseClient | null = null;
let cachedAdmin: SupabaseClient | null = null;

/**
 * Cliente Supabase com a anon key. Sujeito a RLS.
 * Use para inserts da LP que têm policy explícita (ex.: leads).
 */
export function getSupabase(): SupabaseClient {
  if (cachedAnon) return cachedAnon;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase não configurado: defina SUPABASE_URL e SUPABASE_ANON_KEY no .env.local',
    );
  }

  cachedAnon = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cachedAnon;
}

/**
 * Cliente Supabase com service_role (bypassa RLS).
 * Use APENAS em rotas de servidor (webhook do WhatsApp, jobs, etc.).
 * Nunca exponha service_role no front.
 *
 * Fallback para anon quando SUPABASE_SERVICE_ROLE_KEY não está definida
 * (útil em dev sem RLS ativa).
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cachedAdmin) return cachedAdmin;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error('SUPABASE_URL ausente');
  }

  if (!serviceKey) {
    // Fallback: usa anon — só funciona se as policies permitirem.
    return getSupabase();
  }

  cachedAdmin = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  return cachedAdmin;
}
