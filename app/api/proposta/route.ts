import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import {
  enviarPropostaCliente,
  type EnviarPropostaResult,
} from '@/lib/proposta-sender';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const itemSchema = z.object({
  descricao: z.string().min(1),
  quantidade: z.number().positive(),
  valor_unitario: z.number().nonnegative(),
});

const triggerSchema = z.object({
  phone: z.string().min(8),
  cliente: z.object({
    nome: z.string().min(2),
    empresa: z.string().optional(),
    cidade_uf: z.string().optional(),
  }),
  itens: z.array(itemSchema).min(1),
  validade_dias: z.number().int().positive().default(15),
  observacoes: z.string().optional(),
  aplicacao: z.enum(['pivo', 'poco', 'fazenda', 'multiplo']).optional(),
  dimensao_cv: z.number().optional(),
  caption: z.string().optional(),
  lead_id: z.string().uuid().optional(),
});

/**
 * POST /api/proposta — gatilho protegido por header X-Trigger-Secret.
 * Gera PDF + envia pelo WhatsApp do cliente.
 */
export async function POST(request: Request): Promise<NextResponse<EnviarPropostaResult>> {
  const expected = process.env.PROPOSTA_TRIGGER_SECRET;
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'PROPOSTA_TRIGGER_SECRET não configurado' },
      { status: 500 },
    );
  }
  if (request.headers.get('x-trigger-secret') !== expected) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = triggerSchema.parse(await request.json());
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: `Inválido: ${err.issues.map((i) => i.message).join('; ')}` },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: false, error: 'payload inválido' }, { status: 400 });
  }

  const result = await enviarPropostaCliente(body);
  const status = result.success ? 200 : 502;
  return NextResponse.json(result, { status });
}
