# Prompt para o Claude — redesenhar o diagrama com o mascote integrado

Use como referência visual este mockup:

`assets-source/mockups/arquitetura-energia-mascote-conceito.png`

O mascote original está em:

`public/mascote.webp`

Copie integralmente o prompt abaixo para o Claude no VS Code.

---

Você está trabalhando no site Next.js da Irrigasolar. Redesenhe a seção “Como o sistema funciona” com base no mockup visual:

`assets-source/mockups/arquitetura-energia-mascote-conceito.png`

Não use o mockup inteiro como uma imagem no site. Reproduza a composição com HTML, Tailwind CSS, SVG e `next/image`, preservando responsividade, acessibilidade, SEO e performance.

## Arquivos existentes

Inspecione e modifique principalmente:

- `components/marketing/ArchitectureDiagram.tsx`
- `components/marketing/ArchitectureSection.tsx`
- `components/ui/icons.tsx`
- `app/globals.css`, somente se necessário

Mascote real:

- `public/mascote.webp`

Design system:

- títulos: Source Serif 4;
- textos e interface: Manrope;
- forest: `#10271D`;
- forest-light: `#244C3A`;
- sand: `#F3EFE6`;
- paper: `#FCFBF7`;
- graphite: `#18201C`;
- copper: `#B97832`;
- rule: `#DDD6C6`.

## Objetivo visual

O mascote atualmente aparece isolado em uma faixa abaixo do diagrama. Isso gera uma área vazia grande e faz o personagem parecer colado à seção.

Integre o mascote ao fluxo principal:

- fontes de energia à esquerda;
- EMS no centro;
- cargas críticas à direita;
- mascote imediatamente ao lado das cargas críticas;
- balão explicativo ligado visualmente ao mascote;
- tudo dentro de um único painel editorial.

O resultado deve parecer premium, técnico e amigável — não infantil.

## Título da seção

Mantenha fora do painel, acima do diagrama:

- eyebrow: `Como o sistema funciona`;
- título: `Rede, solar, bateria e gerador — integrados por um único sistema de gestão.`

Não use dentro do painel o título grande do mockup “Engenharia que mantém o agro em movimento”, pois ele competiria com o heading real da página.

## Estrutura do painel no desktop

Crie uma área de aproximadamente 1100–1200 px úteis, organizada em quatro zonas:

1. **Fontes de energia — 28%**
2. **EMS — 22%**
3. **Cargas críticas — 30%**
4. **Mascote e mensagem — 20%**

Use uma grade semelhante a:

```css
grid-template-columns: minmax(210px, 1.1fr) minmax(190px, .9fr) minmax(250px, 1.2fr) minmax(170px, .8fr);
```

O painel deve ter:

- fundo `paper`;
- borda fina `border-rule`;
- `rounded-sm` ou raio máximo de 12 px;
- textura técnica muito discreta, com grid de no máximo 3% de opacidade;
- padding entre 32 e 48 px;
- sem sombra forte;
- linha de paisagem ou detalhe agrícola muito sutil apenas se for implementado em CSS/SVG leve.

## Fontes de energia

Mostrar quatro módulos empilhados:

- `Rede elétrica`;
- `Energia solar`;
- `BESS`;
- `Gerador`.

Cada módulo deve conter:

- ícone simples do conjunto existente ou SVG local;
- label Manrope, 15–16 px, peso 600;
- fundo `sand` ou `paper`;
- borda `rule`;
- altura consistente;
- sem fotografias, para manter o diagrama leve e evitar excesso visual.

Use linhas cor cobre conectando os quatro módulos ao EMS. As linhas devem ser desenhadas em SVG responsivo atrás dos cards, sem interceptar textos.

Não use “BESS (baterias)” — use apenas `BESS`, porque a página já explica a sigla.

## Bloco EMS

O EMS deve ser o centro visual e parecer o “cérebro” do sistema:

- fundo `forest`;
- texto `paper`;
- detalhe/borda cobre discreta;
- título `EMS` em Source Serif 4 ou Manrope forte, entre 28 e 38 px;
- subtítulo: `Gestão inteligente da energia`;
- pequenos pontos ou conectores laterais em cobre;
- ícone abstrato de controle/energia opcional;
- nada de aparência futurista ou neon.

## Cargas críticas

Criar um card maior em `forest-light`, contendo:

- título: `Cargas críticas`;
- subtítulo: `Bombas, resfriadores e ventilação`;
- ícone técnico simples;
- uma área visual inferior opcional usando CSS/SVG ou a imagem local já existente mais adequada, desde que leve e sem fingir ser case real.

Uma seta cobre deve sair do EMS e entrar nesse card.

Não usar reticências ou texto pequeno demais.

## Mascote integrado

Use exatamente:

```tsx
<Image src="/mascote.webp" ... />
```

Regras:

- preservar o mascote completo, sem cortar chapéu, botas ou mão;
- não alterar cores, rosto, roupa ou logotipo;
- altura aproximada no desktop: 260–340 px, conforme o painel;
- posicionar ao lado direito do card de cargas críticas;
- alinhar as botas ao limite inferior do painel;
- permitir pequena sobreposição visual com a área das cargas, mas nunca cobrir textos;
- usar `object-contain` e `object-bottom`;
- sem animação contínua, bounce ou efeito infantil;
- opcional: entrada discreta respeitando `prefers-reduced-motion`.

## Balão de mensagem

O balão deve parecer parte do design editorial, não um balão de história em quadrinhos.

Texto exato:

`A engenharia conecta cada parte para a operação não parar.`

Estilo:

- fundo `paper`;
- borda cobre fina;
- texto Source Serif 4 ou Manrope, conforme melhor legibilidade;
- 16–20 px;
- largura máxima de 260–310 px;
- pequena ponta apontando para o mascote;
- posicionado acima ou ligeiramente à esquerda da cabeça;
- não deixar o balão encostar na borda do painel.

Remova a mensagem atual:

`Não precisa decorar as siglas — a engenharia explica cada parte no diagnóstico.`

## Figcaption

Mantenha abaixo do diagrama, dentro ou imediatamente após o painel:

`Rede, energia solar, BESS e gerador se integram por meio de um sistema de gestão de energia (EMS), que direciona o fornecimento para as cargas críticas da operação conforme a estratégia definida em projeto.`

Use Manrope `text-sm`, `leading-relaxed`, `text-graphite/70`, largura máxima de aproximadamente 760 px.

## Responsividade

### Desktop ≥ 1024 px

- diagrama horizontal completo;
- nenhum scroll horizontal;
- mascote integrado na quarta coluna;
- linhas SVG alinhadas com os módulos.

### Tablet 768–1023 px

- fontes em duas colunas ou lista compacta no topo;
- EMS abaixo/ao centro;
- cargas críticas e mascote lado a lado na parte inferior;
- balão acima do mascote;
- nenhuma fonte ou seta deve ficar minúscula.

### Mobile 360–430 px

Não reduza o diagrama desktop nem use `min-w-[640px]` com scroll horizontal.

Crie um fluxo vertical:

1. grid 2×2 das quatro fontes;
2. indicador/seta vertical;
3. bloco EMS;
4. indicador/seta vertical;
5. bloco de cargas críticas;
6. mascote ao lado ou parcialmente sobreposto à base do card;
7. balão em largura total acima do mascote.

No mobile:

- mascote com aproximadamente 130–170 px de altura;
- textos nunca menores que 14 px;
- alvos de toque, se existirem, mínimo 44 px;
- sem scroll horizontal;
- não esconder o mascote.

## Acessibilidade

Mantenha o diagrama semântico:

- `<figure>` e `<figcaption>`;
- SVG decorativo com `aria-hidden="true"` se a estrutura textual HTML já explicar tudo;
- grupos de fontes em lista `<ul>`;
- sequência lógica no DOM: fontes → EMS → cargas → explicação;
- alt do mascote: `Mascote da Irrigasolar apresentando a integração do sistema de energia`;
- contraste WCAG AA;
- não depender apenas das linhas ou da cor para comunicar o fluxo.

Inclua uma descrição acessível equivalente:

`Rede elétrica, energia solar, BESS e gerador são coordenados pelo EMS para alimentar as cargas críticas da operação.`

## Performance

- não carregar o mockup PNG na página;
- usar somente `public/mascote.webp` como raster nessa composição;
- usar SVG e CSS para linhas, setas, ícones e formas;
- não instalar biblioteca de diagramas;
- imagem do mascote abaixo da dobra sem `priority`;
- fornecer `sizes` correto;
- não adicionar JavaScript cliente se CSS e SVG forem suficientes.

## Critérios de aceite

1. O mascote deve parecer parte natural do diagrama.
2. Não deve existir a coluna vazia vista na versão anterior.
3. O fluxo fontes → EMS → cargas deve ser compreendido em menos de cinco segundos.
4. Source Serif 4 e Manrope devem permanecer coerentes com o resto do site.
5. O painel deve parecer técnico e premium, não infantil.
6. Desktop, tablet e celular não podem ter scroll horizontal.
7. Nenhum texto pode ficar sobre o mascote ou sobre linhas.
8. O build deve passar.

Execute ao final:

```bash
npm run typecheck
npm test -- --run
npm run build
```

Confira visualmente em 390 × 844, 768 × 1024 e 1440 × 900. Informe os arquivos alterados e descreva como o layout responde em cada breakpoint.

---

