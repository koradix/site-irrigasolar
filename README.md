# Irrigasolar — Landing Page + Agente Comercial

Site institucional / landing page da Irrigasolar com:

- **Configurador interativo** de kit solar (5 steps, ramificação por aplicação)
- **Engine de cálculo** baseada na tabela WEG (poço CV / pivô kWp / fazenda R$ mensal)
- **API de captura de leads** com persistência Supabase + email pra equipe via Resend
- **Agente de WhatsApp com Claude** que atende clientes, qualifica e envia propostas em PDF automaticamente
- **Geração de PDF profissional** da proposta com a paleta editorial Irrigasolar
- **Dois gatilhos** pra envio de proposta: conversa no WhatsApp ou trigger do site

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** com paleta customizada Irrigasolar (CSS vars + tokens)
- **Framer Motion** — animações sutis e transições do configurador
- **react-hook-form** + **Zod** — formulários e validação
- **@tanstack/react-query** — fetching reativo
- **@anthropic-ai/sdk** — Claude (agente WhatsApp, com tool use)
- **@react-pdf/renderer** — PDF da proposta
- **@supabase/supabase-js** — banco (leads, conversations, propostas)
- **resend** — email pro time
- **WAHA** (Docker, gratuito) — WhatsApp HTTP API
- **Vitest** — testes (19 specs)

## Estrutura

```
app/
├── page.tsx                              # LP completa
├── obrigado/                             # tela pós-envio do configurador
├── api/
│   ├── configurador/route.ts             # captura de lead + email + PDF WhatsApp
│   ├── proposta/route.ts                 # gatilho do site (X-Trigger-Secret)
│   └── webhook/whatsapp/route.ts         # webhook WAHA → agente Claude
└── globals.css

components/
├── sections/                             # Hero, AuthorityBar, ProvaSocial, IrrigaBox, FAQ, Footer
├── configurador/                         # 5 steps + StepNumbers + PreviaKit reativo
├── ui/                                   # Container, Button, Badge, Card, Section, Input
└── brand/                                # Logo, Kicker, SerifHeading

lib/
├── calcula-kit.ts + tabela-weg.json      # engine de cálculo do kit
├── configurador-schema.ts                # Zod schemas (front + API payload)
├── claude.ts                             # SYSTEM_PROMPT + tool gerar_proposta + runTurn
├── conversa.ts                           # memória persistida no Supabase
├── waha.ts                               # cliente WhatsApp HTTP API
├── pdf-proposta-engine.ts                # lógica pura (preparar, número sequencial)
├── pdf-proposta.tsx                      # componente DocumentProposta + render PDF
├── proposta-sender.ts                    # gera + persiste + envia (compartilhado)
├── agente.ts                             # orquestrador conversacional
├── email.ts + proposta.ts                # HTML email pro time (Resend)
├── supabase.ts                           # getSupabase (anon) + getSupabaseAdmin (service_role)
├── contato.ts                            # WhatsApp comercial centralizado
└── cn.ts, env.ts, mensagens.ts, etc.

supabase/schema.sql                       # tabelas leads + conversations + propostas
docker-compose.yml                        # serviço WAHA (porta 3000)
docs/
├── n8n-setup.md                          # workflows futuros
└── whatsapp-agent.md                     # setup detalhado do agente

__tests__/                                # 19 specs (calcula-kit + pdf-proposta)
```

## Como rodar

### Modo simples (só LP, sem agente)

```bash
npm install
cp .env.example .env.local
# preencha SUPABASE_*, RESEND_*, EMAIL_TO_EQUIPE
npm run dev
```

Abre em [http://localhost:3001](http://localhost:3001).

### Modo completo (LP + agente WhatsApp + PDF)

Configure as variáveis extras no `.env.local`:

```
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-haiku-4-5
WAHA_BASE_URL=http://localhost:3000
WAHA_SESSION=default
WAHA_API_KEY=defina-uma-chave-forte-aqui
WEBHOOK_PUBLIC_URL=https://seu-ngrok.ngrok-free.app
PROPOSTA_TRIGGER_SECRET=outra-chave-forte
```

Suba a infraestrutura:

```bash
# 1. SQL no Supabase (cole supabase/schema.sql no SQL Editor)
# 2. Docker WAHA
docker compose up -d waha
# 3. Em outro terminal: expõe o backend
ngrok http 3001
# atualize WEBHOOK_PUBLIC_URL no .env.local com a URL ngrok
docker compose restart waha
# 4. Next.js
npm run dev
```

Escaneie o QR Code em [http://localhost:3000/dashboard](http://localhost:3000/dashboard) com o WhatsApp Business.

Detalhes em [docs/whatsapp-agent.md](docs/whatsapp-agent.md).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server (port 3001) |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run typecheck` | TypeScript sem emitir |
| `npm test` | Vitest run (19 specs) |
| `npm run test:watch` | Vitest watch mode |

## Documentos relacionados

- [docs/whatsapp-agent.md](docs/whatsapp-agent.md) — setup, arquitetura e custos do agente
- [docs/n8n-setup.md](docs/n8n-setup.md) — workflows n8n (régua de follow-up)
- [supabase/schema.sql](supabase/schema.sql) — tabelas leads/conversations/propostas
- `01-SITEMAP.md` até `05-GUIDELINES-IMAGENS.md` — design e estratégia

Protótipo HTML/Vite anterior em `legacy/` (referência visual).
