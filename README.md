# Irrigasolar — Landing Page

Site institucional e landing page da Irrigasolar (engenharia de irrigação e bombeamento solar), construído em Next.js 14 com App Router.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** com paleta customizada Irrigasolar
- **Framer Motion** — animações
- **react-hook-form** + **Zod** — formulários e validação
- **@tanstack/react-query** — fetching e cache
- **ESLint** + **Prettier** com `prettier-plugin-tailwindcss`

## Estrutura

```
app/         — rotas (App Router)
components/  — componentes React reutilizáveis
lib/         — utilitários, integrações, helpers
types/       — tipos TypeScript compartilhados
public/      — assets estáticos
legacy/      — protótipo Vite/HTML anterior (referência de design)
```

## Como rodar

```bash
# instalar deps
npm install

# copiar variáveis de ambiente
cp .env.example .env.local
# preencher .env.local

# rodar em dev
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

## Scripts

| Script             | O que faz                          |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Dev server                         |
| `npm run build`    | Build de produção                  |
| `npm run start`    | Serve o build                      |
| `npm run lint`     | ESLint                             |
| `npm run format`   | Prettier (write)                   |
| `npm run typecheck`| TypeScript sem emitir              |

## Variáveis de ambiente

Veja `.env.example`. Necessário ao integrar Supabase, Z-API, n8n e pixels de tracking.

## Design

Documentos de design e estratégia ficam na raiz:

- `01-SITEMAP.md`
- `02-DESIGN-SYSTEM.md`
- `03-WIREFRAME-HOME.md`
- `04-RACIONAL-ESTRATEGICO.md`
- `05-GUIDELINES-IMAGENS.md`

Protótipo HTML/Vite anterior está em `legacy/` para referência visual.
