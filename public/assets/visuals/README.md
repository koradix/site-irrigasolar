# Visuais conceituais — Irrigasolar

Estas imagens foram geradas com a ferramenta integrada de geração de imagens do Codex em 24/09/2026 e são usadas como **comunicação visual conceitual**. Elas não devem ser apresentadas como fotografias de projetos executados pela Irrigasolar.

| Arquivo usado pelo site | Aplicação |
|---|---|
| `hero-energia-agro.webp` | Hero da home e abertura temporária do portfólio |
| `bess-silos-agro.webp` | Página BESS, silos e armazenagem |
| `irrigacao-solar-offgrid.webp` | Página off-grid, pivôs, bombas e captação |
| `cadeia-fria-agro.webp` | Aplicação de cadeia fria |
| `leite-ordenha-energia.webp` | Aplicação de leite, aves e suínos |
| `engenharia-campo.webp` | Seções e páginas de engenharia/sobre |
| `offgrid-poco-reservatorio.webp` | Galeria off-grid: poço e reservação elevada |
| `offgrid-gotejamento-cafe.webp` | Galeria off-grid: irrigação localizada em cultivo de maior valor |
| `offgrid-pivo-solar.webp` | Galeria off-grid: bombeamento solar para pivô central |

Os arquivos `.webp` desta pasta são as versões otimizadas utilizadas no site. Os originais `.png` de alta resolução ficam fora da pasta pública, em `assets-source/visuals/`, para não aumentar desnecessariamente o deploy.

## Direção de arte aplicada

- fotografia editorial agrícola/industrial premium;
- paisagem e contexto produtivo brasileiros;
- verde profundo, terra, grafite e luz cobre;
- equipamentos tecnicamente plausíveis;
- sem marcas, textos ou logotipos;
- sem estética futurista ou de banco de imagens;
- áreas de respiro compatíveis com títulos do site.

## Prompts finais

1. **Hero integrado:** fazenda brasileira de alto valor com BESS conteinerizado, solar e pivô, amanhecer, composição 16:9, espaço escuro à esquerda para texto, equipamentos à direita, fotografia editorial realista.
2. **BESS e silos:** sistema BESS, PCS e infraestrutura elétrica atendendo silos e processamento de grãos, golden hour, composição 16:9, engenharia industrial realista.
3. **Irrigação off-grid:** painéis solares, reservatório, casa de bombas e pivô em operação, paisagem agrícola brasileira, amanhecer, composição 16:9.
4. **Cadeia fria:** unidade agrícola refrigerada com docas, carga de hortifrúti, cobertura solar e armazenamento energético, fotografia industrial limpa em formato horizontal.
5. **Leite e ordenha:** fazenda leiteira moderna com ventilação, ordenha, resfriamento e solar, condições adequadas de bem-estar animal, fotografia editorial horizontal.
6. **Engenharia em campo:** dois engenheiros com EPI revisando instalação elétrica, tablet e projeto ao lado de solar e irrigação, vistos de costas/lado, fotografia documental horizontal.

## Substituição por fotos reais

Quando houver uma fotografia real melhor, guarde o original em `assets-source/visuals/`, gere a versão pública mantendo o mesmo nome-base e proporção aproximada e execute:

```bash
npm run images:optimize -- assets-source/visuals --max-width=1920 --quality=82
```

Depois copie somente o `.webp` resultante para `public/assets/visuals/`.

O portfólio de projetos reais continua separado em `public/assets/portfolio/`.
