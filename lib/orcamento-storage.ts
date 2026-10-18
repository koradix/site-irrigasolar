import { randomUUID } from 'node:crypto';
import { getSupabaseAdmin } from './supabase';

export const ORCAMENTOS_BUCKET = 'orcamentos-anexos';

const TIPOS_ACEITOS = new Set(['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'application/pdf']);
const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024; // 10 MB

export interface AnexoSalvo {
  path: string;
  nome: string;
  mime: string;
  bytes: number;
}

export class AnexoInvalidoError extends Error {}

/**
 * Sobe um anexo (conta de luz, plaqueta) para o bucket privado
 * `orcamentos-anexos`. O arquivo nunca fica público — leitura exige URL
 * assinada gerada no servidor (ver `assinarUrlAnexo`).
 */
export async function salvarAnexo(file: File, pastaId: string): Promise<AnexoSalvo> {
  if (!TIPOS_ACEITOS.has(file.type)) {
    throw new AnexoInvalidoError(`Tipo de arquivo não aceito: ${file.type || 'desconhecido'}`);
  }
  if (file.size > TAMANHO_MAXIMO_BYTES) {
    throw new AnexoInvalidoError('Arquivo acima de 10 MB');
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const path = `${pastaId}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await getSupabaseAdmin()
    .storage.from(ORCAMENTOS_BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Falha ao salvar anexo: ${error.message}`);

  return { path, nome: file.name, mime: file.type, bytes: file.size };
}

/** Gera uma URL assinada de leitura (expira) para um anexo já salvo — usada no e-mail interno e no payload do webhook. */
export async function assinarUrlAnexo(path: string, expiresInSeconds = 60 * 60 * 24 * 7): Promise<string | null> {
  const { data, error } = await getSupabaseAdmin()
    .storage.from(ORCAMENTOS_BUCKET)
    .createSignedUrl(path, expiresInSeconds);
  if (error || !data) return null;
  return data.signedUrl;
}
