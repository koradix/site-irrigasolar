import { createHmac } from 'node:crypto';
import type { OrcamentoApiPayload } from './orcamento-schema';
import type { TriagemOutput } from './orcamento-triagem';
import { assinarUrlAnexo } from './orcamento-storage';

export interface WebhookPayloadInput {
  pedidoId: string;
  payload: OrcamentoApiPayload;
  triagem: TriagemOutput;
  origemUtm?: Record<string, string>;
}

/**
 * Monta o payload JSON da seção 10 do prompt de redesign e dispara um POST
 * assinado (HMAC, header X-Irrigasolar-Signature) para WEBHOOK_PROPOSTA_URL
 * — reaproveita a variável N8N_WEBHOOK_URL já usada pelo configurador
 * legado, em vez de inventar um novo nome. Best effort: nunca lança, nunca
 * bloqueia a resposta ao cliente. O destino (n8n/agente manual) roda o
 * PROMPT_MESTRE_PROPOSTAS_IRRIGASOLAR.md — não é responsabilidade do site.
 */
export async function dispararWebhookProposta(input: WebhookPayloadInput): Promise<{ enviado: boolean; erro?: string }> {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return { enviado: false, erro: 'N8N_WEBHOOK_URL ausente' };

  try {
    const body = await montarPayload(input);
    const json = JSON.stringify(body);
    const secret = process.env.WEBHOOK_PROPOSTA_HMAC_SECRET;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (secret) {
      headers['X-Irrigasolar-Signature'] = createHmac('sha256', secret).update(json).digest('hex');
    }

    const res = await fetch(url, { method: 'POST', headers, body: json });
    if (!res.ok) return { enviado: false, erro: `Webhook respondeu ${res.status}` };
    return { enviado: true };
  } catch (err) {
    return { enviado: false, erro: err instanceof Error ? err.message : 'Falha desconhecida' };
  }
}

interface AnexoWebhook {
  tipo: 'conta_luz' | 'plaqueta_transformador' | 'plaqueta_motor';
  url_assinada: string | null;
  mime: string;
  bytes: number;
}

async function montarPayload({ pedidoId, payload, triagem, origemUtm }: WebhookPayloadInput) {
  const anexos: AnexoWebhook[] = await Promise.all(
    (payload.contaLuzAnexos ?? []).map(async (a) => ({
      tipo: 'conta_luz' as const,
      url_assinada: await assinarUrlAnexo(a.path),
      mime: a.mime,
      bytes: a.bytes,
    })),
  );
  if (payload.transformadorFotoAnexo) {
    anexos.push({
      tipo: 'plaqueta_transformador' as const,
      url_assinada: await assinarUrlAnexo(payload.transformadorFotoAnexo.path),
      mime: payload.transformadorFotoAnexo.mime,
      bytes: payload.transformadorFotoAnexo.bytes,
    });
  }
  for (const m of payload.motores ?? []) {
    if (m.plaquetaAnexo) {
      anexos.push({
        tipo: 'plaqueta_motor' as const,
        url_assinada: await assinarUrlAnexo(m.plaquetaAnexo.path),
        mime: m.plaquetaAnexo.mime,
        bytes: m.plaquetaAnexo.bytes,
      });
    }
  }

  return {
    pedido_id: pedidoId,
    criado_em: new Date().toISOString(),
    origem: { pagina: '/orcamento', utm: origemUtm ?? {} },
    triagem: {
      resultado: triagem.resultado,
      motivos: triagem.motivos,
      dados_faltantes: triagem.dadosFaltantes,
    },
    cliente: {
      nome: payload.nome,
      whatsapp: payload.whatsapp,
      email: payload.email || null,
      perfil: payload.perfil,
      propriedade: payload.propriedade || null,
      municipio: payload.municipio,
      uf: payload.uf,
    },
    atividade: payload.atividade,
    tem_bombeamento: payload.temBombeamento,
    solucao_interesse: triagem.solucaoInteresse,
    dor_principal: payload.dorPrincipal,
    dores_secundarias: payload.doresSecundarias ?? [],
    descricao_cliente: payload.descricaoCliente || null,
    energia: {
      rede: payload.rede,
      demanda_contratada: payload.demandaContratada,
      demanda_kw: payload.demandaContratadaKw || null,
      transformador_kva: payload.transformadorKva || null,
      ucs_mesmo_titular: payload.ucsMesmoTitular || null,
      diesel_mensal_brl: payload.dieselMensalBrl || null,
      gerador_kva: payload.geradorKva || null,
      frequencia_quedas: payload.frequenciaQuedas || null,
    },
    motores: (payload.motores ?? []).map((m) => ({
      cv: m.cv,
      tensao: m.tensao,
      tipo: m.tipo,
      quantidade: m.quantidade,
      horas_dia: m.horasDia ?? null,
      meses: m.meses ?? null,
      distancia_area_bomba_m: m.distanciaM ?? null,
    })),
    cargas_bess: payload.cargasBess ?? null,
    comercial: {
      outra_proposta: payload.outraProposta ?? null,
      financiamento: payload.financiamento,
    },
    pre_dimensionamento_cfw:
      triagem.preDimensionamentoCfw?.map((p) => ({ motor_index: p.motorIndex, modulos_700w: p.modulos700w, kwp: p.kwp })) ?? [],
    anexos,
    consentimento_lgpd: { aceito: true, texto_versao: 'v1', em: new Date().toISOString() },
  };
}
