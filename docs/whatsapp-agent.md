# Agente de WhatsApp + Geração de Propostas

> Atende clientes pelo WhatsApp, qualifica, mantém contexto e envia propostas em PDF automaticamente.
> Backend Next.js + WAHA (Docker) + Claude (Anthropic) + Supabase.

---

## Arquitetura

```
 Cliente no WhatsApp              Site (form / configurador / botão)
        │                                       │
        ▼                                       ▼
     WAHA (Docker) ──webhook──►  Next.js API  ◄── POST /api/proposta (gatilho)
        ▲                            │
        │                            ├─► Supabase (conversations + leads + propostas)
        │                            ├─► Claude API (system prompt + tool use)
        │                            └─► PDF generator (@react-pdf/renderer)
        │                                       │
        └──────  WAHA sendText / sendFile  ◄────┘
```

**Dois caminhos, mesma engine de PDF:**

1. **Conversacional (WhatsApp):** cliente conversa → Claude qualifica → ferramenta `gerar_proposta` é chamada quando há dados suficientes → PDF + mensagem de fechamento
2. **Gatilho do site (`POST /api/proposta`):** payload estruturado → PDF → envio direto via WAHA, sem conversa
3. **Configurador integrado:** quando o cliente termina os 5 steps, o backend também chama o sender em fire-and-forget → PDF cai no WhatsApp dele

---

## Stack escolhida (e por quê)

| Componente | Tech | Justificativa |
|---|---|---|
| Cliente WhatsApp | **WAHA Core** (Docker, grátis) | Self-hosted, sem custo, controle total |
| Cérebro | **Claude Haiku 4.5** via `@anthropic-ai/sdk` | Default barato, configurável via `ANTHROPIC_MODEL` |
| Memória | **Supabase tabela `conversations`** | Já estava no stack, TTL via coluna, sem Redis novo |
| PDF | **`@react-pdf/renderer`** | Funciona em Next.js Node runtime, API React, gera Buffer direto |
| Webhook async | `Promise + fire-and-forget` | Next.js retorna 200 imediato, processamento continua em background |

---

## Arquivos chave

```
docker-compose.yml                          ← serviço WAHA
supabase/schema.sql                         ← tabelas conversations + propostas
.env.example                                ← novas vars (ANTHROPIC_*, WAHA_*, etc.)

lib/
├── claude.ts                               ← SYSTEM_PROMPT + tool definition + runTurn()
├── conversa.ts                             ← appendMessage / getHistory / cleanup
├── waha.ts                                 ← sendText / sendFile / sessionStatus
├── pdf-proposta-engine.ts                  ← preparar() + proximoNumeroProposta() (puro, testável)
├── pdf-proposta.tsx                        ← componente DocumentProposta + gerarPropostaPDF()
├── proposta-sender.ts                      ← wrapper compartilhado: gera + persiste + envia
└── agente.ts                               ← orquestrador: loop runTurn ↔ tool_use ↔ tool_result

app/api/
├── webhook/whatsapp/route.ts               ← POST do WAHA (filtra event + fromMe, dispara async)
├── proposta/route.ts                       ← gatilho protegido por X-Trigger-Secret
└── configurador/route.ts                   ← chama proposta-sender ao salvar lead
```

---

## Setup do zero

### 1. Subir WAHA

```bash
# preencha .env.local com WAHA_API_KEY antes (qualquer string forte)
docker compose up -d waha
```

Abra **http://localhost:3000/dashboard**, escaneie o QR Code com o WhatsApp Business da Irrigasolar (número `5575999590288`). A sessão fica gravada no volume `irrigasolar_waha_sessions`.

### 2. Expor o backend pra WAHA (em dev)

WAHA precisa alcançar o `/api/webhook/whatsapp`. Em dev:

```bash
# escolha um:
ngrok http 3001
# OU
cloudflared tunnel --url http://localhost:3001
```

Cole a URL `https://...` no `.env.local` em `WEBHOOK_PUBLIC_URL` (sem barra final). Reinicie o container WAHA pra ele pegar o webhook:

```bash
docker compose restart waha
```

Em produção, basta apontar pro domínio do site (`https://irrigasolar.com.br`).

### 3. Rodar o backend

```bash
npm run dev    # localhost:3001
```

### 4. Testar o fluxo conversacional

De **OUTRO** número WhatsApp (não pode ser o da sessão), mande "Oi, gostaria de orçamento pra um poço artesiano". Acompanhe o log do Next.js — você verá:

```
[webhook/whatsapp] processarMensagem
[Claude] turno 1 (sem tool_use)
[WAHA] sendText 200
```

Conforme você fornecer dados (nome, CV, profundidade), o Claude decide chamar `gerar_proposta` → PDF é gerado → enviado via `sendFile` → mensagem de fechamento.

### 5. Testar o gatilho do site

```bash
curl -X POST http://localhost:3001/api/proposta \
  -H "Content-Type: application/json" \
  -H "X-Trigger-Secret: $PROPOSTA_TRIGGER_SECRET" \
  -d '{
    "phone": "5575999590288",
    "cliente": { "nome": "Marcus Teste", "cidade_uf": "Ibitiba/BA" },
    "itens": [{ "descricao": "placeholder", "quantidade": 1, "valor_unitario": 0 }],
    "aplicacao": "poco",
    "dimensao_cv": 7.5,
    "validade_dias": 15
  }'
```

Deve retornar `{ success: true, numero_proposta: "IRRI-2026-XXXX", message_id: "..." }`. O PDF cai no WhatsApp `5575999590288`.

### 6. Configurador integrado

Quando o cliente termina o configurador na LP, o backend dispara automaticamente o sender (best-effort). Não precisa de configuração extra — basta ter WAHA rodando + `WAHA_API_KEY` no `.env.local`.

---

## Variáveis de ambiente

| Var | Obrigatória | O quê |
|---|---|---|
| `ANTHROPIC_API_KEY` | sim (agente) | console.anthropic.com |
| `ANTHROPIC_MODEL` | não | default `claude-haiku-4-5` |
| `WAHA_BASE_URL` | sim (agente) | `http://localhost:3000` em dev |
| `WAHA_SESSION` | sim (agente) | default `default` |
| `WAHA_API_KEY` | sim (agente) | header X-Api-Key, qualquer string forte |
| `WEBHOOK_PUBLIC_URL` | sim em dev | URL ngrok/cloudflared |
| `WAHA_WEBHOOK_HMAC` | opcional | header X-Webhook-Hmac (futuro) |
| `PROPOSTA_TRIGGER_SECRET` | sim p/ /api/proposta | qualquer string forte |
| `SUPABASE_URL` | sim | supabase.com/projects |
| `SUPABASE_ANON_KEY` | sim | dashboard Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | recomendado | bypassa RLS pra conversations |
| `EMPRESA_NOME` | não | default "Irrigasolar" |
| `EMPRESA_LOGO_PATH` | não | placeholder (PDF ainda usa só texto) |

---

## System prompt e ferramenta

Definidos em [lib/claude.ts](../lib/claude.ts):

- **`SYSTEM_PROMPT`** — identidade, tom, escopo Irrigasolar, regras inegociáveis (nunca inventar preços, sempre tool, nunca afirmar garantia/financiamento por conta própria, prazo "engenharia confirma").
- **`GERAR_PROPOSTA_TOOL`** — schema da ferramenta. Aceita `itens` livres OU (`aplicacao` + `dimensao_cv`) para a engine WEG recalcular tudo automaticamente.

Pra ajustar o tom do agente, edite o `SYSTEM_PROMPT`. Pra adicionar uma nova ferramenta (consultar CRM, agendar visita), defina ela como `Tool` e adicione no array passado a `messages.create`.

---

## Memória de conversa

Tabela `conversations` no Supabase:
- `chat_id` — `5575999590288@c.us`
- `role` — `user` ou `assistant`
- `content` — jsonb (string OU blocos da Anthropic com `text`/`tool_use`/`tool_result`)
- `expires_at` — TTL default 24h

Funções em [lib/conversa.ts](../lib/conversa.ts):
- `appendMessage(chatId, role, content)`
- `getHistory(chatId, limit = 30)` — só não-expiradas
- `resetConversation(chatId)` — apaga tudo
- `cleanupExpired()` — manual; em prod use `pg_cron` chamando a função `cleanup_expired_conversations()` do schema

---

## Testes

```bash
npm test
```

Cobertura atual:
- `__tests__/calcula-kit.test.ts` — engine de cálculo WEG (14 specs)
- `__tests__/pdf-proposta.test.ts` — `preparar()` (itens livres vs engine WEG) + formato do número da proposta (5 specs)

---

## Checklist de go-live

- [ ] Conta Anthropic com chave válida
- [ ] Conta Supabase com schema.sql rodado
- [ ] `EMAIL_TO_EQUIPE` configurado pra equipe
- [ ] Docker rodando WAHA + sessão escaneada
- [ ] Webhook do WAHA apontando pra URL pública do backend
- [ ] `.env.local` com todas as obrigatórias
- [ ] Teste manual de outro número → mensagem → resposta
- [ ] Teste manual com pedido de proposta → PDF chega
- [ ] Teste manual `curl /api/proposta` com `X-Trigger-Secret`
- [ ] Teste end-to-end via configurador → PDF cai no WhatsApp do cliente
- [ ] `pg_cron` rodando `cleanup_expired_conversations()` periodicamente

---

## Custos estimados (em volume baixo)

Para ~100 conversas/dia, médias:

| | Quantidade | Custo |
|---|---|---|
| Claude Haiku 4.5 | ~100 turns × 2k tokens in / 500 out | ~US$ 0.30/dia |
| WAHA Core | self-hosted | R$ 0 |
| Supabase | leve | free tier |
| **Total** | | **~R$ 50/mês** |

Pra usar Sonnet 4.6 (mais inteligente): ~5× isso.
