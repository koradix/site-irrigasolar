import Anthropic from '@anthropic-ai/sdk';
import type {
  MessageParam,
  Tool,
  ContentBlock,
} from '@anthropic-ai/sdk/resources/messages';
import type { ConversaMessage } from './conversa';

let cached: Anthropic | null = null;

function getClient(): Anthropic {
  if (cached) return cached;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Anthropic não configurada: defina ANTHROPIC_API_KEY no .env.local');
  }
  cached = new Anthropic({ apiKey });
  return cached;
}

export function getModel(): string {
  return process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5';
}

/**
 * System prompt do agente comercial Irrigasolar.
 * Define identidade, escopo, tom e regras (não inventar preços, perguntar antes de gerar proposta).
 */
export const SYSTEM_PROMPT = `Você é o assistente comercial da ${process.env.EMPRESA_NOME ?? 'Irrigasolar'}, engenharia solar WEG especializada em bombeamento solar, projetos de irrigação e energia fotovoltaica para o agronegócio brasileiro.

# Quem você atende
Produtores rurais e gestores de fazenda interessados em:
- Bombeamento solar (poço, represa, rio)
- Projetos de irrigação (pivô, gotejamento)
- Energia fotovoltaica para fazenda inteira
- IrrigaBox® — monitoramento de temperatura, umidade e segurança operacional (sempre inclusa nos kits)

# Tom
- Direto, técnico, sem firula corporativa
- Respeita o produtor rural — fala a língua do campo
- Não usa emoji em excesso (1 ou 2 quando faz sentido)
- Mensagens curtas e objetivas (WhatsApp, não email formal)

# Como conduzir a conversa
1. Cumprimente e identifique a necessidade (poço? pivô? fazenda inteira?)
2. Faça perguntas práticas — potência da bomba em CV, profundidade do poço, número de pivôs, conta de luz média mensal, prazo desejado, cidade/UF
3. Quando tiver dados suficientes pra montar uma proposta, **chame a ferramenta gerar_proposta**
4. Após a ferramenta executar, mande uma mensagem curta confirmando o envio do PDF e perguntando sobre próximos passos (visita técnica, cronograma)

# Regras inegociáveis
- NUNCA invente preços ou valores. Quando precisar de valores, sempre use a ferramenta gerar_proposta — ela calcula via tabela WEG oficial
- NUNCA prometa prazos de obra sem antes confirmar com engenharia (responda "a engenharia confirma na proposta")
- Se o cliente pedir desconto, diga que vai consultar e que a equipe retorna — não negocie por conta
- NUNCA afirme prazo de garantia, condição de financiamento (BNDES, FCO etc.) ou payback específico por conta própria — esses pontos são confirmados pela engenharia na proposta formal
- Se não souber algo técnico específico, diga "vou confirmar com o engenheiro e te retorno" — nunca chute

# Quando NÃO chamar a ferramenta gerar_proposta
- Quando faltar nome do cliente
- Quando faltar pelo menos 1 item com descrição/quantidade/valor (a engine calcula automaticamente o kit Irrigasolar quando você informa aplicação + dimensão)
- Quando o cliente ainda está só pesquisando (deixa ele falar mais primeiro)

# Quando CHAMAR a ferramenta gerar_proposta
- Cliente disse o nome, a aplicação (poço/pivô/fazenda) e os números (CV, kWp ou conta mensal)
- Cliente pediu explicitamente proposta/orçamento e você já tem o mínimo
- Ao chamar, preencha 'itens' com a descrição do kit Irrigasolar (ex: "Kit Bombeamento Solar 7.5 CV WEG + IrrigaBox") e deixe 'valor_unitario' como 0 — a engine sobrescreve com o cálculo da tabela WEG`;

/**
 * Definição da tool gerar_proposta no formato Anthropic Tool Use.
 * O backend implementa a execução real (gera PDF + envia WhatsApp).
 */
export const GERAR_PROPOSTA_TOOL: Tool = {
  name: 'gerar_proposta',
  description:
    'Gera proposta comercial em PDF e envia ao cliente pelo WhatsApp. Use SOMENTE quando você tiver TODOS os dados obrigatórios (nome do cliente, ao menos um item, validade em dias). Se faltar qualquer dado obrigatório, pergunte ao cliente antes de chamar.',
  input_schema: {
    type: 'object',
    properties: {
      nome_cliente: {
        type: 'string',
        description: 'Nome completo do cliente que aparecerá no cabeçalho do PDF',
      },
      empresa: {
        type: 'string',
        description: 'Nome da empresa do cliente (se ele for PJ). Opcional.',
      },
      cidade_uf: {
        type: 'string',
        description: 'Cidade/UF da propriedade do cliente (ex: "Ibitiba/BA"). Opcional, mas útil.',
      },
      aplicacao: {
        type: 'string',
        enum: ['pivo', 'poco', 'fazenda', 'multiplo'],
        description:
          'Aplicação do kit. Quando informada junto com dimensão, a engine calcula automaticamente o kit Irrigasolar da tabela WEG e sobrescreve os preços de itens.',
      },
      dimensao_cv: {
        type: 'number',
        description:
          'Potência em CV (para poço) ou kWp (para pivô/fazenda). Necessário se aplicacao for informada.',
      },
      itens: {
        type: 'array',
        description:
          'Itens da proposta. Para kits Irrigasolar, basta 1 item descritivo com valor 0 — a engine recalcula. Para itens avulsos, informe valores reais.',
        items: {
          type: 'object',
          properties: {
            descricao: { type: 'string' },
            quantidade: { type: 'number' },
            valor_unitario: { type: 'number', description: 'em reais; 0 quando for engine Irrigasolar' },
          },
          required: ['descricao', 'quantidade', 'valor_unitario'],
        },
      },
      validade_dias: {
        type: 'number',
        description: 'Validade da proposta em dias (default 15)',
      },
      observacoes: {
        type: 'string',
        description: 'Observações livres a incluir no rodapé do PDF',
      },
    },
    required: ['nome_cliente', 'itens', 'validade_dias'],
  },
};

export interface GerarPropostaInput {
  nome_cliente: string;
  empresa?: string;
  cidade_uf?: string;
  aplicacao?: 'pivo' | 'poco' | 'fazenda' | 'multiplo';
  dimensao_cv?: number;
  itens: Array<{ descricao: string; quantidade: number; valor_unitario: number }>;
  validade_dias: number;
  observacoes?: string;
}

export interface ClaudeTurn {
  /** Resposta bruta da Anthropic — útil pra logging */
  raw: import('@anthropic-ai/sdk/resources/messages').Message;
  /** Blocos de texto concatenados */
  text: string;
  /** Chamadas de ferramenta no turno (geralmente 0 ou 1 para o nosso caso) */
  toolUses: Array<{ id: string; name: string; input: Record<string, unknown> }>;
  /** stop_reason ("end_turn" | "tool_use" | "max_tokens" | ...) */
  stopReason: string | null;
}

/**
 * Converte ConversaMessage[] (nosso formato persistido) pra MessageParam[] da Anthropic.
 */
function toMessageParams(history: ConversaMessage[]): MessageParam[] {
  return history.map((m) => ({
    role: m.role,
    content: m.content as MessageParam['content'],
  }));
}

/**
 * Roda um turno do agente.
 * Caller é responsável por persistir as mensagens (user antes, assistant depois)
 * e por executar tool_use → tool_result em loop se necessário.
 */
export async function runTurn(history: ConversaMessage[]): Promise<ClaudeTurn> {
  const client = getClient();
  const messages = toMessageParams(history);

  const response = await client.messages.create({
    model: getModel(),
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: [GERAR_PROPOSTA_TOOL],
    messages,
  });

  const textBlocks: string[] = [];
  const toolUses: ClaudeTurn['toolUses'] = [];

  for (const block of response.content as ContentBlock[]) {
    if (block.type === 'text') {
      textBlocks.push(block.text);
    } else if (block.type === 'tool_use') {
      toolUses.push({
        id: block.id,
        name: block.name,
        input: block.input as Record<string, unknown>,
      });
    }
  }

  return {
    raw: response,
    text: textBlocks.join('\n\n').trim(),
    toolUses,
    stopReason: response.stop_reason,
  };
}
