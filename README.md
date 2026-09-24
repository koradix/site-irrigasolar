# Irrigasolar Engenharia — Site institucional

Site institucional da Irrigasolar Engenharia: engenharia de energia para
operações críticas do agronegócio (BESS, energia solar e irrigação
off-grid), com formulário de diagnóstico consultivo e, como canal
secundário, um configurador de kit solar (`/loja`) com geração automática de
proposta em PDF via WhatsApp.

> Toda alegação factual do site (dados institucionais, credenciais,
> projetos, depoimentos) vem de `content/site.ts`. Nada é inventado — campos
> sem comprovação ficam vazios/`undefined` e o componente correspondente não
> renderiza. Veja a seção **Conteúdo real pendente** abaixo.

## Stack

- **Next.js 14** (App Router) + **TypeScript** estrito
- **Tailwind CSS** — paleta e tipografia definidas em `tailwind.config.ts` / `app/globals.css`
- **react-hook-form** + **Zod** — formulários e validação (diagnóstico e configurador)
- **@supabase/supabase-js** — persistência de leads/diagnósticos/conversas
- **resend** — notificação por e-mail para a equipe
- **@anthropic-ai/sdk** — agente de WhatsApp (fluxo `/loja`)
- **@react-pdf/renderer** — PDF de proposta (fluxo `/loja`)
- **WAHA** (Docker) — WhatsApp HTTP API
- **sharp** — otimização de imagens (script `images:optimize`)
- **Vitest** — testes

## Estrutura

```
app/
├── page.tsx                        # Home institucional
├── bess-agronegocio/                # BESS para o agro
├── irrigacao-solar-off-grid/        # Irrigação solar off-grid
├── engenharia/                      # Método de engenharia
├── projetos/[slug]/                 # Portfólio (dinâmico, vazio até ter projetos reais)
├── sobre/                           # Institucional, equipe, credenciais
├── diagnostico/                     # Formulário consultivo (6 etapas)
├── aplicacoes/*/                    # Páginas por cadeia produtiva
├── privacidade/, termos/            # Políticas
├── loja/                            # Canal secundário: configurador de kit solar
├── obrigado/                        # Pós-envio do configurador de kit
├── api/
│   ├── diagnostico/route.ts         # Captura do diagnóstico + fallback WhatsApp
│   ├── configurador/route.ts        # Captura de lead do configurador de kit
│   ├── proposta/route.ts            # Gatilho protegido de reenvio de proposta
│   └── webhook/whatsapp/route.ts    # Webhook do agente WhatsApp (WAHA)
├── robots.ts, sitemap.ts, manifest.ts, icon.png

content/
└── site.ts                          # Fonte central de conteúdo verdadeiro (ver abaixo)

components/
├── marketing/                       # Seções reutilizáveis (Hero, FAQ, Process, etc.)
├── diagnostico/                     # Formulário de diagnóstico (6 etapas)
├── forms/                           # Inputs acessíveis (TextField, RadioGroupField...)
├── layout/                          # Header, Footer, WhatsAppFloat
├── seo/                             # JsonLd
├── ui/, brand/                      # Primitivos (Button, Card, Section, Logo, Eyebrow...)
└── configurador/                    # Fluxo legado do kit solar (usado só em /loja)

lib/
├── schema.ts, diagnostico-schema.ts, diagnostico-mensagem.ts, diagnostico-email.ts
├── analytics.ts                     # Helper de eventos (window.dataLayer)
├── calcula-kit.ts + tabela-weg.json # Engine de cálculo do kit solar (/loja)
├── pdf-proposta*.ts, proposta*.ts   # Geração de PDF e e-mail (/loja)
├── claude.ts, agente.ts, conversa.ts, waha.ts  # Agente de WhatsApp (/loja)
└── contato.ts, cn.ts, env.ts, supabase.ts

scripts/optimize-images.mjs          # Converte fotos para WebP (sem serviço externo)
public/assets/portfolio/README.md    # Como cadastrar fotos de projetos
next.config.mjs                      # Headers de segurança, incl. CSP
supabase/schema.sql                  # Tabelas leads/diagnosticos/conversations/propostas
__tests__/                           # Testes (schemas, engine de cálculo, PDF)
```

## Como rodar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre em [http://localhost:3001](http://localhost:3001) (ou 3000 conforme sua config local).

O site funciona sem nenhuma variável de ambiente configurada: os formulários
sempre devolvem um link de WhatsApp com a mensagem estruturada como
fallback. Preencha `SUPABASE_*` e `RESEND_*`/`EMAIL_TO_EQUIPE` para persistir
os envios e notificar a equipe por e-mail.

Para o fluxo completo de `/loja` (agente de WhatsApp + PDF automático), veja
[docs/whatsapp-agent.md](docs/whatsapp-agent.md).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem emitir |
| `npm test` | Vitest run |
| `npm run images:optimize -- <pasta-ou-arquivo>` | Converte PNG/JPG para WebP |

## Conteúdo real pendente

Estes pontos precisam de informação comprovada do proprietário antes de
serem publicados — os campos correspondentes em `content/site.ts` estão
vazios de propósito:

- **Dados institucionais**: razão social, CNPJ, endereço, e-mail e telefone
  (`content/site.ts` → `company`).
- **Equipe e responsabilidade técnica**: nomes, cargos e registros (CREA/ART)
  (`content/site.ts` → `team`).
- **Credenciais e parcerias**: certificações e parcerias com fabricantes,
  apenas com documento comprobatório (`content/site.ts` → `credentials`).
- **Projetos reais**: cases com escopo técnico, cliente e resultado
  verificável (`content/site.ts` → `projects`); ver
  [public/assets/portfolio/README.md](public/assets/portfolio/README.md)
  para como organizar as fotos.
- **Redes sociais**: perfis oficiais ativos (`content/site.ts` → `socialLinks`).

### Como cadastrar um projeto novo

1. Fotografe a instalação (real, sem banco de imagens/IA) e otimize com
   `npm run images:optimize -- public/assets/portfolio/<slug-do-projeto>`.
2. Adicione um objeto ao array `projects` em `content/site.ts` com o
   `slug`, título, segmento, cidade/UF, desafio, solução, escopo técnico e,
   quando houver, resultado comprovado e depoimento autorizado.
3. Rode `npm run build` para confirmar que `/projetos/<slug>` foi gerada.

### Como preencher credenciais/dados institucionais

Edite diretamente os campos de `company`, `team` e `credentials` em
`content/site.ts` — cada campo tem um comentário `TODO: preencher somente
com informação comprovada` indicando o que é esperado. Assim que um campo é
preenchido, o bloco correspondente (rodapé, página Sobre, faixa de
credenciais da home) passa a renderizar automaticamente.

### Como trocar fotografias

Todas as imagens do site vêm de `public/assets/`. Para trocar uma foto,
basta substituir o arquivo referenciado em `content/site.ts` (projetos) ou
no componente correspondente, mantendo o mesmo nome de arquivo ou
atualizando a referência. Use sempre `npm run images:optimize` para gerar a
versão WebP antes de publicar.

## Variáveis de ambiente

Veja `.env.example` para a lista completa. Nenhuma é obrigatória para rodar
o site — todas habilitam integrações opcionais (Supabase, e-mail, WhatsApp,
agente Claude, analytics).

## Documentos relacionados

- [docs/whatsapp-agent.md](docs/whatsapp-agent.md) — setup do agente de WhatsApp (`/loja`)
- [docs/n8n-setup.md](docs/n8n-setup.md) — automações n8n
- [supabase/schema.sql](supabase/schema.sql) — tabelas do banco
- [public/assets/portfolio/README.md](public/assets/portfolio/README.md) — cadastro de fotos de projetos
- `RELATORIO-AUDITORIA-IRRIGASOLAR-BESS.md` — auditoria estratégica que orientou esta reestruturação

Protótipo HTML/Vite anterior em `legacy/` (referência visual histórica).
