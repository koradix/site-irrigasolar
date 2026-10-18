import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { salvarAnexo, AnexoInvalidoError } from '@/lib/orcamento-storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface UploadResponse {
  success: boolean;
  anexo?: { path: string; nome: string; mime: string; bytes: number };
  error?: string;
}

/**
 * POST /api/orcamento/upload — recebe um arquivo por vez (multipart/form-data,
 * campo "file") e salva no bucket privado de anexos. Devolve só o caminho
 * interno (nunca uma URL pública) para o cliente guardar no estado do
 * formulário e enviar junto no POST /api/orcamento final.
 */
export async function POST(request: Request): Promise<NextResponse<UploadResponse>> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: 'Corpo inválido' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  // Pasta por sessão do navegador, enviada pelo cliente (um pedido ainda sem
  // id de banco) — mantém os anexos de um mesmo preenchimento agrupados.
  const pastaIdRaw = form.get('pastaId');
  const pastaId = typeof pastaIdRaw === 'string' && /^[a-zA-Z0-9-]{8,80}$/.test(pastaIdRaw) ? pastaIdRaw : randomUUID();

  try {
    const anexo = await salvarAnexo(file, pastaId);
    return NextResponse.json({ success: true, anexo });
  } catch (err) {
    if (err instanceof AnexoInvalidoError) {
      return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
    console.error('[orcamento/upload] falha', err);
    return NextResponse.json({ success: false, error: 'Falha ao salvar o arquivo' }, { status: 500 });
  }
}
