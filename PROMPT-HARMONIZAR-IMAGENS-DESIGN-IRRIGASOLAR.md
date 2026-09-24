# Prompt — harmonização visual das imagens no site Irrigasolar

Copie integralmente o conteúdo abaixo para o agente do VS Code, aberto na raiz do projeto.

---

Você está trabalhando no site Next.js da **Irrigasolar Engenharia**. As imagens profissionais já foram geradas e salvas no projeto. Sua tarefa é **refinar a inserção visual delas**, garantindo harmonia perfeita com a tipografia, a paleta, os espaçamentos e a hierarquia editorial existentes.

Não gere novas imagens, não use imagens externas, não altere o posicionamento comercial e não invente projetos ou cases. Trabalhe com os arquivos existentes.

## 1. Leia antes de alterar

Inspecione:

- `app/layout.tsx`
- `app/globals.css`
- `tailwind.config.ts`
- `components/marketing/Hero.tsx`
- `components/marketing/ApplicationsSection.tsx`
- `components/marketing/EngineeringSection.tsx`
- `components/marketing/ApplicationPageTemplate.tsx`
- `components/brand/SerifHeading.tsx`
- `components/brand/Eyebrow.tsx`
- `components/ui/Section.tsx`
- `content/site.ts`
- `app/irrigacao-solar-off-grid/page.tsx`
- `public/assets/visuals/README.md`

O código já possui uma primeira inserção das imagens. **Refine o que existe; não duplique seções ou imagens.**

## 2. Onde buscar as imagens

### Originais de maior resolução — apenas para edição/recorte

Pasta:

`assets-source/visuals/`

Nunca referencie essa pasta no navegador.

Arquivos:

- `hero-energia-agro.png`
- `bess-silos-agro.png`
- `irrigacao-solar-offgrid.png`
- `cadeia-fria-agro.png`
- `leite-ordenha-energia.png`
- `engenharia-campo.png`
- `offgrid-poco-reservatorio.png`
- `offgrid-gotejamento-cafe.png`
- `offgrid-pivo-solar.png`

### Imagens otimizadas para o site

Pasta:

`public/assets/visuals/`

Use no JSX caminhos iniciados por `/assets/visuals/`:

- `/assets/visuals/hero-energia-agro.webp`
- `/assets/visuals/bess-silos-agro.webp`
- `/assets/visuals/irrigacao-solar-offgrid.webp`
- `/assets/visuals/cadeia-fria-agro.webp`
- `/assets/visuals/leite-ordenha-energia.webp`
- `/assets/visuals/engenharia-campo.webp`
- `/assets/visuals/offgrid-poco-reservatorio.webp`
- `/assets/visuals/offgrid-gotejamento-cafe.webp`
- `/assets/visuals/offgrid-pivo-solar.webp`

Não carregue os PNGs no site. Eles são matrizes de alta resolução.

## 3. Sistema tipográfico — preservar

Não troque as fontes atuais. Elas estão corretas para a proposta:

- **Source Serif 4**, pesos 500/600/700: títulos editoriais e headings;
- **Manrope**, pesos 400/500/600/700/800: corpo, navegação, botões, legendas e números.

Objetivo da combinação:

- Source Serif 4 comunica tradição, patrimônio rural e sofisticação;
- Manrope comunica engenharia, clareza e tecnologia;
- as imagens devem criar a ponte entre esses dois territórios.

Regras:

- nunca coloque parágrafos longos sobre áreas visualmente carregadas;
- títulos sobre imagens devem manter `font-display`, peso 600 e `leading-[1.05]` ou `leading-[1.1]`;
- corpo sobre fundo escuro: Manrope, no máximo `text-xl`, `leading-relaxed`;
- legendas abaixo das imagens: Manrope `text-sm`, entre 14 e 15 px, `leading-relaxed`;
- labels/eyebrows: Manrope em caixa alta, 12 px, peso 600, tracking entre `0.20em` e `0.24em`;
- não use texto serifado pequeno sobre fotografia;
- não use texto diretamente sobre cards fotográficos; mantenha título e descrição em área sólida abaixo da foto.

## 4. Paleta e tratamento fotográfico

Preserve os tokens atuais:

- forest `#10271D`;
- forest-light `#244C3A`;
- sand `#F3EFE6`;
- paper `#FCFBF7`;
- graphite `#18201C`;
- copper `#B97832`;
- solar `#E4AD32` apenas como realce.

As imagens já têm verdes, terra, grafite e luz dourada compatíveis. Harmonize com CSS e overlays, sem editar destrutivamente os arquivos:

- heroes: overlay verde profundo, nunca preto puro;
- cards: fotografia natural, sem overlay permanente pesado;
- evitar saturação excessiva;
- bordas `border-rule` e raios discretos `rounded-sm`;
- sombra mínima ou nenhuma; a aparência deve ser editorial, não e-commerce;
- não colocar molduras grossas, gradientes laranja ou glow.

## 5. Hero — composição perfeita

Componente: `components/marketing/Hero.tsx`.

Mantenha uma única imagem full-bleed, sem carrossel.

### Desktop, a partir de 1024 px

- altura visual entre 680 e 740 px;
- texto limitado a aproximadamente 620–680 px;
- texto no lado esquerdo;
- elemento técnico principal da fotografia visível no lado direito;
- gradiente horizontal recomendado:
  - 0%: forest com 97–98% de opacidade;
  - 38%: forest com 88–92%;
  - 68%: forest com 42–52%;
  - 100%: forest com 12–18%;
- adicionar gradiente vertical discreto para integrar header e final do hero;
- grid técnico existente pode continuar, com opacidade máxima de 3,5%;
- não esconder completamente o BESS, o pivô, os painéis ou os silos.

Crie props opcionais no Hero, se necessário:

```ts
imagePosition?: string;
mobileImagePosition?: string;
```

Não crie condicionais específicas por URL dentro do componente.

Posições sugeridas:

- home, `hero-energia-agro.webp`: `object-[62%_center]`;
- BESS, `bess-silos-agro.webp`: `object-[64%_center]`;
- off-grid, `irrigacao-solar-offgrid.webp`: `object-[66%_center]`;
- engenharia/sobre, `engenharia-campo.webp`: `object-[66%_center]`.

### Mobile, 360–430 px

- não simplesmente reduzir o hero desktop;
- preservar uma altura aproximada de 680–760 px, conforme o conteúdo;
- usar `object-position` que mantenha o equipamento relevante visível;
- substituir o gradiente predominantemente horizontal por composição combinada:
  - verde mais forte na parte inferior, onde fica o texto;
  - verde moderado no topo para integração com o header;
- os botões devem ficar empilhados e ocupar a largura disponível;
- impedir que a headline tenha palavra isolada na última linha quando houver ajuste simples de largura/tamanho;
- verificar que nenhum botão ou microcopy encosta no WhatsApp flutuante;
- manter contraste mínimo WCAG AA em todos os pontos da fotografia.

### Mapeamento dos heroes

- Home: `app/page.tsx` → `hero-energia-agro.webp`;
- BESS: `app/bess-agronegocio/page.tsx` → `bess-silos-agro.webp`;
- Off-grid: `app/irrigacao-solar-off-grid/page.tsx` → `irrigacao-solar-offgrid.webp`;
- Engenharia: `app/engenharia/page.tsx` → `engenharia-campo.webp`;
- Sobre: `app/sobre/page.tsx` → `engenharia-campo.webp`;
- Projetos, enquanto não houver fotografia real autorizada: `hero-energia-agro.webp` com alt identificando visual conceitual;
- projeto real: usar `project.cover`, nunca uma imagem conceitual como se fosse obra executada.

## 6. Cards de aplicações da home

Componente: `components/marketing/ApplicationsSection.tsx`.

Use:

- `aspect-[4/3]` em todas as imagens;
- quatro cards com a mesma altura visual;
- imagem ocupando aproximadamente 55–60% da altura do card;
- conteúdo em fundo `sand` abaixo da imagem;
- título Source Serif 4, `text-lg` ou `text-xl`, peso 600;
- descrição Manrope, `text-sm`, `leading-relaxed`;
- hover muito discreto: escala máxima `1.02` ou `1.03`, 400–500 ms;
- não usar overlays com títulos;
- não cortar o equipamento principal.

Mapeamento:

- pivôs/bombas: `irrigacao-solar-offgrid.webp`;
- silos/armazenagem: `bess-silos-agro.webp`;
- cadeia fria: `cadeia-fria-agro.webp`;
- leite/ordenha: `leite-ordenha-energia.webp`.

Use `next/image` com:

```tsx
fill
sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
```

Somente a imagem do hero recebe `priority`.

## 7. Galeria da página off-grid

Página: `app/irrigacao-solar-off-grid/page.tsx`.

Use uma seção editorial logo depois da explicação “Quando faz sentido / Reservação como autonomia” e antes de “Tipos de sistema”.

Estrutura:

- eyebrow: `Aplicações off-grid`;
- título Source Serif 4:
  `A mesma fonte de energia, dimensionada para diferentes formas de irrigar.`
- grid de três colunas no desktop, uma coluna no mobile;
- imagens `aspect-[3/2]`;
- legendas em bloco sólido `sand`, nunca sobre a fotografia;
- espaçamento entre cards de 24 px;
- espaço entre título da seção e grid de 40–48 px;
- aviso pequeno ao final informando que são imagens conceituais.

Ordem:

1. `offgrid-poco-reservatorio.webp`
   - título: `Poço solar com reservação`;
   - legenda: `Bombeamento durante o período solar para armazenar água e manter disponibilidade ao longo do dia.`

2. `offgrid-gotejamento-cafe.webp`
   - título: `Irrigação localizada`;
   - legenda: `Energia solar aplicada ao bombeamento e gotejamento em culturas de maior valor agregado.`

3. `offgrid-pivo-solar.webp`
   - título: `Pivô com bombeamento solar`;
   - legenda: `Captação, reservação e geração fotovoltaica dimensionadas como um único sistema de produção.`

Texto de transparência:

`Imagens conceituais. A configuração final depende do levantamento hidráulico, elétrico e da rotina de operação da propriedade.`

## 8. Imagem de engenharia

Componente: `components/marketing/EngineeringSection.tsx`.

- criar composição de duas colunas;
- texto com 40–45% da largura;
- imagem com 55–60%;
- proporção 3:2;
- alinhamento vertical central;
- no mobile, texto primeiro e imagem depois;
- usar `engenharia-campo.webp`;
- evitar cortar capacetes, tablet ou quadro elétrico;
- não colocar texto sobre a imagem.

## 9. Ritmo vertical e harmonia editorial

Não deixe o site virar uma sequência de fotografias.

Ritmo desejado:

1. hero fotográfico;
2. seção textual clara;
3. soluções mais gráficas/técnicas;
4. diagrama;
5. cards fotográficos;
6. processo sobre fundo forest;
7. portfólio real;
8. engenharia com uma fotografia;
9. FAQ e CTA.

Mantenha:

- seções: `py-16 md:py-24 lg:py-28`;
- largura máxima: `max-w-content` de 1280 px;
- gutters: `px-5 md:px-8 lg:px-12`;
- blocos de texto normalmente limitados a `max-w-2xl`;
- espaçamento de 16 px entre eyebrow e heading;
- espaçamento de 20–24 px entre heading e parágrafo;
- espaçamento de 40–48 px antes de grids.

## 10. Veracidade e acessibilidade

- todos os textos alternativos devem começar ou conter `Visual conceitual`;
- não chamar essas imagens de “projeto Irrigasolar”, “obra entregue” ou “cliente”;
- portfólio real permanece em `public/assets/portfolio/`;
- imagens decorativas puras podem ter `alt=""`, mas as imagens que explicam uma aplicação devem ter alt descritivo;
- manter headings em ordem lógica;
- preservar foco visível e navegação por teclado;
- manter contraste WCAG AA;
- respeitar `prefers-reduced-motion`.

## 11. Performance

- usar somente `next/image`;
- `priority` apenas no hero visível;
- `sizes` obrigatório;
- nenhuma imagem abaixo da dobra com eager loading;
- não usar PNG no frontend;
- não converter imagens em base64;
- não usar CSS background para conteúdo informativo;
- evitar filtro CSS caro ou parallax;
- não instalar biblioteca de galeria/carrossel;
- manter CLS abaixo de 0,1;
- buscar LCP abaixo de 2,5 s e Performance Lighthouse móvel acima de 90.

## 12. Validação visual obrigatória

Antes de concluir, execute o site em build de produção e confira, no mínimo:

- 390 × 844 px;
- 768 × 1024 px;
- 1440 × 900 px.

Verifique em cada tamanho:

- corte da imagem;
- legibilidade do título;
- contraste;
- quebras de linha;
- altura dos cards;
- alinhamento das legendas;
- ausência de distorção;
- distância do WhatsApp flutuante;
- ausência de scroll horizontal.

Depois execute:

```bash
npm run typecheck
npm test -- --run
npm run build
```

Rode Lighthouse móvel em build de produção e corrija regressões causadas pelas imagens.

## 13. Entrega esperada

Não encerre com uma sugestão. Faça os ajustes no código, valide visualmente e entregue:

- lista de arquivos modificados;
- mapeamento final de cada imagem;
- resultados de typecheck, testes, build e Lighthouse;
- observações sobre recortes mobile/desktop;
- conteúdo que ainda precisa ser substituído por fotografia real da Irrigasolar.

---

## Fim do prompt

