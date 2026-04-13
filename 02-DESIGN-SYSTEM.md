# IRRIGASOLAR — Design System v2.0

> Paleta extraída do protótipo Stitch validado. Sistema de cores Material Design 3.

---

## 1. Fundação Visual

### Conceito
**Agro-Tech Premium** — A interseção entre robustez industrial e sofisticação comercial.
O design transmite: engenharia confiável, campo produtivo, proteção do investimento.

### Personalidade da Marca no Digital
| Atributo       | É                              | Não é                        |
|----------------|--------------------------------|------------------------------|
| Tom            | Técnico e seguro               | Frio ou distante             |
| Estética       | Premium industrial             | Futurista genérico           |
| Comunicação    | Direta e clara                 | Corporativa vazia            |
| Sensação       | Solução pronta e confiável     | Experimental ou artesanal    |
| Visual         | Limpo com peso nos detalhes    | Poluído ou minimalista vazio |

---

## 2. Paleta de Cores (Material Design 3 — Protótipo Stitch)

### Cores Primárias (Verde Irrigasolar)

| Token                        | Hex         | Tailwind Key              | Uso                                                    |
|------------------------------|-------------|---------------------------|---------------------------------------------------------|
| `--color-primary`            | `#01261F`   | `primary`                 | Verde ultra-profundo — texto forte, ícones de seção     |
| `--color-primary-container`  | `#1A3C34`   | `primary-container`       | Header, footer, seções escuras, backgrounds de destaque |
| `--color-on-primary`         | `#FFFFFF`   | `on-primary`              | Texto sobre primário                                    |
| `--color-on-primary-container` | `#83A69C` | `on-primary-container`    | Texto secundário sobre fundo escuro (sage muted)        |
| `--color-primary-fixed`      | `#C5EADF`   | `primary-fixed`           | Badges suaves, backgrounds de avatar, tags leves        |
| `--color-primary-fixed-dim`  | `#AACEC3`   | `primary-fixed-dim`       | Hover em elementos sobre fundo claro                    |
| `--color-inverse-primary`    | `#AACEC3`   | `inverse-primary`         | Primário invertido para contextos escuros                |
| `--color-surface-tint`       | `#43655C`   | `surface-tint`            | Verde médio — links, ícones em contexto claro           |

### Cores Secundárias (Laranja/Terra — Solar)

| Token                          | Hex         | Tailwind Key                | Uso                                                   |
|--------------------------------|-------------|------------------------------|-------------------------------------------------------|
| `--color-secondary`            | `#954900`   | `secondary`                  | Laranja profundo — gradiente solar (ponto inicial)    |
| `--color-secondary-container`  | `#FC820C`   | `secondary-container`        | Laranja vibrante — gradiente solar (ponto final), CTAs quentes |
| `--color-on-secondary`         | `#FFFFFF`   | `on-secondary`               | Texto sobre secundário                                |
| `--color-on-secondary-container` | `#5E2C00` | `on-secondary-container`     | Texto sobre container secundário                      |
| `--color-secondary-fixed`      | `#FFDCC6`   | `secondary-fixed`            | Fundo claro com tom solar — cards de destaque         |
| `--color-secondary-fixed-dim`  | `#FFB786`   | `secondary-fixed-dim`        | Variante dim do solar fixo                            |

### Cores Terciárias (Marrom/Âmbar — Terra)

| Token                          | Hex         | Tailwind Key                | Uso                                                   |
|--------------------------------|-------------|------------------------------|-------------------------------------------------------|
| `--color-tertiary`             | `#391800`   | `tertiary`                   | Marrom ultra-profundo — texto sobre gradiente solar   |
| `--color-tertiary-container`   | `#592900`   | `tertiary-container`         | Container terroso escuro                              |
| `--color-on-tertiary-container`| `#F77E04`   | `on-tertiary-container`      | **Laranja accent principal** — ícones, badges, destaques |
| `--color-tertiary-fixed`       | `#FFDCC6`   | `tertiary-fixed`             | Fundo terciário claro                                 |
| `--color-tertiary-fixed-dim`   | `#FFB786`   | `tertiary-fixed-dim`         | Variante dim do terciário fixo                        |

### Superfícies (Neutras com tom verde)

| Token                            | Hex         | Tailwind Key                  | Uso                                               |
|----------------------------------|-------------|-------------------------------|----------------------------------------------------|
| `--color-surface`                | `#F8FAF9`   | `surface`                     | Fundo principal do site                            |
| `--color-surface-dim`            | `#D8DAD9`   | `surface-dim`                 | Superfície escurecida — dividers, borders          |
| `--color-surface-bright`         | `#F8FAF9`   | `surface-bright`              | Superfície clara                                   |
| `--color-surface-container-lowest` | `#FFFFFF` | `surface-container-lowest`    | Cards elevados, superfícies mais claras            |
| `--color-surface-container-low`  | `#F2F4F3`   | `surface-container-low`       | Fundos de seção alternados (tom 1)                 |
| `--color-surface-container`      | `#ECEEED`   | `surface-container`           | Fundos de seção alternados (tom 2)                 |
| `--color-surface-container-high` | `#E6E9E8`   | `surface-container-high`      | Cards de ícone, backgrounds de badges              |
| `--color-surface-container-highest` | `#E1E3E2` | `surface-container-highest` | Superfícies de maior elevação em fundo claro       |
| `--color-surface-variant`        | `#E1E3E2`   | `surface-variant`             | Variante de superfície para contraste sutil        |
| `--color-on-surface`             | `#191C1C`   | `on-surface`                  | Texto principal sobre superfície                   |
| `--color-on-surface-variant`     | `#414846`   | `on-surface-variant`          | Texto secundário/descrições                        |
| `--color-inverse-surface`        | `#2E3131`   | `inverse-surface`             | Tooltips, snackbars — fundo escuro contextual      |
| `--color-inverse-on-surface`     | `#EFF1F0`   | `inverse-on-surface`          | Texto sobre superfície invertida                   |

### Outline / Bordas

| Token                  | Hex         | Tailwind Key        | Uso                                    |
|------------------------|-------------|---------------------|-----------------------------------------|
| `--color-outline`      | `#717976`   | `outline`           | Bordas de inputs, divisores visíveis   |
| `--color-outline-variant` | `#C1C8C4` | `outline-variant`  | Bordas sutis, separadores leves        |

### Cores de Erro / Funcionais

| Token                      | Hex         | Tailwind Key          | Uso                                    |
|----------------------------|-------------|------------------------|----------------------------------------|
| `--color-error`            | `#BA1A1A`   | `error`               | Erros, estados de perigo, "antes"      |
| `--color-on-error`         | `#FFFFFF`   | `on-error`            | Texto sobre erro                       |
| `--color-error-container`  | `#FFDAD6`   | `error-container`     | Background de mensagens de erro        |
| `--color-on-error-container` | `#93000A` | `on-error-container`  | Texto sobre container de erro          |

### Gradiente Solar (Signature)

```css
.solar-flare {
    background: linear-gradient(135deg, #954900 0%, #FC820C 100%);
}
/* Texto sobre solar-flare: #311400 (tertiary deep) */
```

> Este gradiente é a **assinatura visual** da marca no digital. Usado em:
> - CTA principal do hero
> - Bloco de CTA final
> - Badges de destaque máximo
> - **Nunca** em textos corridos ou backgrounds de seção inteira (exceto CTA final)

### Regras de Aplicação de Cor
- **Fundo do site**: `surface` (#F8FAF9) — off-white com tom esverdeado sutil
- **Seções alternadas**: alternar entre `surface-container-lowest` (#FFF) e `surface-container-low` (#F2F4F3)
- **Seções de destaque**: `primary-container` (#1A3C34) com texto branco
- **Accent principal**: `on-tertiary-container` (#F77E04) — laranja vibrante para ícones e badges
- **Gradiente solar-flare**: reservado para CTAs de alta conversão
- **Verde primário #01261F**: texto de títulos fortes em cards e seções
- **Texto principal**: `on-surface` (#191C1C) 
- **Texto secundário**: `on-surface-variant` (#414846)
- **Texto sobre fundo escuro**: branco (#FFF) ou `on-primary-container` (#83A69C)
- **Contraste mínimo**: todo texto deve ter ratio ≥ 4.5:1 (WCAG AA)
- **Máximo de 3 cores por viewport visível** — primário + accent solar + neutras

---

## 3. Tipografia

### Família Tipográfica

| Função       | Fonte                | Pesos        | Fallback                        | Justificativa                                     |
|--------------|----------------------|--------------|---------------------------------|---------------------------------------------------|
| Headlines    | **Space Grotesk**    | 300, 500, 700 | system-ui, sans-serif           | Geométrica com personalidade técnica — peso visual forte em títulos |
| Corpo        | **Inter**            | 400, 500, 600 | system-ui, sans-serif           | Máxima legibilidade em texto corrido e mobile      |
| Labels/Tags  | **Space Grotesk**    | 500, 700      | system-ui, sans-serif           | Coerência com headlines em elementos compactos     |
| Dados/Specs  | **JetBrains Mono**   | 400, 500      | monospace                       | Cara técnica para specs e dados numéricos          |

> **Google Fonts import:**
> ```
> Inter:wght@400;500;600 & Space+Grotesk:wght@300;500;700
> ```
>
> **Tailwind config:**
> ```js
> fontFamily: {
>   headline: ["Space Grotesk"],
>   body: ["Inter"],
>   label: ["Space Grotesk"]
> }
> ```

### Escala Tipográfica

| Token           | Desktop        | Mobile         | Peso     | Uso                           |
|-----------------|----------------|----------------|----------|-------------------------------|
| `--text-hero`   | 56px / 1.1     | 36px / 1.15    | 800      | Título principal do hero      |
| `--text-h1`     | 44px / 1.15    | 30px / 1.2     | 700      | Título de seção               |
| `--text-h2`     | 32px / 1.2     | 24px / 1.25    | 700      | Subtítulo de seção            |
| `--text-h3`     | 24px / 1.3     | 20px / 1.3     | 600      | Título de card / bloco        |
| `--text-h4`     | 20px / 1.3     | 18px / 1.35    | 600      | Título menor                  |
| `--text-body`   | 16px / 1.6     | 16px / 1.6     | 400      | Texto corrido                 |
| `--text-body-lg`| 18px / 1.6     | 17px / 1.6     | 400      | Lead / intro de seção         |
| `--text-small`  | 14px / 1.5     | 14px / 1.5     | 400      | Captions, labels, metadata    |
| `--text-micro`  | 12px / 1.4     | 12px / 1.4     | 500      | Tags, badges, notas           |
| `--text-data`   | 14px / 1.4     | 13px / 1.4     | 400 mono | Especificações técnicas       |

### Regras Tipográficas
- **Headlines**: Space Grotesk, tracking-tight — transmite engenharia e peso visual
- **Labels/badges**: Space Grotesk, uppercase, tracking-widest — identidade industrial
- **Corpo de texto**: Inter — legibilidade máxima, especialmente mobile
- **Máximo 65-75 caracteres por linha** no corpo de texto
- **Títulos de card**: Space Grotesk, bold, uppercase, tracking-wide, cor primary
- **Números e dados**: sempre em `JetBrains Mono` para leitura técnica
- **Sem itálico** em textos de conversão — itálico reduz percepção de confiança
- **Citações/depoimentos**: Space Grotesk, italic, 20px — exceção ao no-italic

### Border Radius (Tailwind config customizado)

```js
borderRadius: {
    DEFAULT: "0.125rem",  // 2px — reto, industrial
    lg: "0.25rem",        // 4px — cards de ícone
    xl: "0.5rem",         // 8px — cards de serviço, imagens
    full: "0.75rem"       // 12px — bottom nav top corners, avatars
}
```
> O border-radius é **propositalmente pequeno**. O estilo da IrrigaBox é industrial, robusto — cantos arredondados demais suavizam e enfraquecem a personalidade técnica.

---

## 4. Espaçamento

### Escala de Spacing

| Token           | Valor  | Uso                                    |
|-----------------|--------|----------------------------------------|
| `--space-2xs`   | 4px    | Gaps mínimos internos                  |
| `--space-xs`    | 8px    | Padding interno de tags/badges         |
| `--space-sm`    | 12px   | Gap entre ícone e texto                |
| `--space-md`    | 16px   | Padding interno de cards               |
| `--space-lg`    | 24px   | Gap entre cards, margens internas      |
| `--space-xl`    | 32px   | Separação entre blocos dentro da seção |
| `--space-2xl`   | 48px   | Margem entre título e conteúdo da seção|
| `--space-3xl`   | 64px   | Separação entre seções (mobile)        |
| `--space-4xl`   | 96px   | Separação entre seções (desktop)       |
| `--space-5xl`   | 128px  | Padding vertical do hero               |

### Grid

| Propriedade      | Desktop        | Tablet         | Mobile         |
|------------------|----------------|----------------|----------------|
| Colunas          | 12              | 8              | 4              |
| Gutter           | 24px           | 20px           | 16px           |
| Margem lateral   | 80px           | 40px           | 20px           |
| Container max    | 1200px         | 100%           | 100%           |

---

## 5. Componentes

### 5.1 Botões

#### Solar Flare (CTA de máxima conversão)
```
Fundo:        linear-gradient(135deg, #954900 0%, #FC820C 100%)
Texto:        #311400 (tertiary deep)
Font:         Space Grotesk, bold, uppercase, tracking-wider
Padding:      16px 32px
Border-radius: 6px (rounded-md)
Shadow:       0 4px 16px rgba(252, 130, 12, 0.3)
Active:       scale(0.95), transition-transform
```
> Uso: CTA principal do hero, bloco final de conversão. **Máximo 2 por página.**

#### Primário (CTA de suporte forte)
```
Fundo:        #1A3C34 (primary-container)
Texto:        #FFFFFF
Font:         Space Grotesk, bold, uppercase, tracking-widest
Padding:      20px 40px
Border-radius: 6px
Shadow:       0 8px 32px rgba(1, 38, 31, 0.3)
Active:       scale(0.95)
```

#### Secundário (Outline)
```
Fundo:        transparent
Borda:        2px solid #1A3C34
Texto:        #01261F (primary)
Padding:      12px 28px
Border-radius: 6px
Hover:        fundo #1A3C34, texto #FFFFFF
```

#### Ghost (links de ação)
```
Fundo:        transparent
Texto:        #43655C (surface-tint)
Padding:      8px 0
Borda:        none
Decoração:    underline offset 4px
Hover:        #01261F (primary)
```

#### Botão WhatsApp
```
Fundo:        #25D366
Texto:        #FFFFFF
Ícone:        WhatsApp (à esquerda)
Border-radius: 50px (pill shape)
Shadow:       0 4px 12px rgba(37, 211, 102, 0.3)
```

#### Regras de Botão
- Máximo de **2 CTAs por viewport visível** — 1 solar-flare + 1 primário ou outline
- Texto de botão sempre em **ação clara**: "QUERO MINHA IRRIGABOX", "SOLICITAR ORÇAMENTO"
- Font sempre **Space Grotesk**, uppercase, tracking-wider
- Nunca usar "Clique aqui" ou "Saiba mais" genérico
- Em mobile: botões ocupam **100% da largura** em contextos de conversão
- **Active state**: sempre `scale(0.95)` com `transition-transform` — feedback tátil

---

### 5.2 Cards

#### Card de Risco / Benefício (padrão borda lateral)
```
Fundo:        surface-container-lowest (#FFFFFF)
Padding:      24px
Border-left:  4px solid primary (#01261F)
Shadow:       sm (sutil)
Layout:       flex row — ícone container + conteúdo

Ícone container:
  Fundo:      surface-container-high (#E6E9E8)
  Padding:    12px
  Radius:     2px (rounded-sm)
  Cor ícone:  primary (#01261F)

Título:       Space Grotesk, bold, uppercase, tracking-wide, cor primary
Descrição:    Inter, 14px, cor on-surface-variant (#414846)
```
> Padrão usado nos cards de "Riscos Operacionais" e "Benefícios IrrigaBox"

#### Card de Serviço (com imagem)
```
Fundo:        surface-container-lowest (#FFFFFF)
Border-radius: 8px (rounded-lg)
Imagem:       h-64, object-cover, rounded-lg, overflow-hidden, margin-bottom 24px
Título:       Space Grotesk, 24px, bold, cor primary
Descrição:    Inter, 16px, cor on-surface-variant
```

#### Card de Produto (Loja)
```
Fundo:        surface-container-lowest (#FFFFFF)
Border-radius: 12px
Shadow:       0 1px 3px rgba(0,0,0,0.08)
Padding:      0 (imagem sangra no topo)
Imagem:       aspect-ratio 4:3, object-fit cover, border-radius 12px 12px 0 0
Conteúdo:     padding 24px
Hover:        shadow aumenta, translateY(-2px)
```

#### Card de Comparação (Antes x Depois)
```
Layout:       2 colunas lado a lado
Coluna "Antes":
  - Fundo: surface-container (#ECEEED)
  - Borda topo: 3px solid error (#BA1A1A)
  - Ícone: ✕ em vermelho
  - Título: "Sem proteção adequada"
Coluna "Depois":
  - Fundo: surface-container-lowest (#FFFFFF)
  - Borda topo: 3px solid primary (#01261F)
  - Ícone: ✓ em verde
  - Título: "Com IrrigaBox"
  - Shadow: elevação maior que o "antes"
```

---

### 5.3 Badges e Tags

```
Padding:      4px 12px
Border-radius: 2px (rounded-sm) — NÃO pill, seguindo estilo técnico/industrial
Font:         Space Grotesk, 10-12px, bold, uppercase, tracking-widest
Variantes:
  - Accent:   fundo on-tertiary-container/20% (#F77E04/20), borda #F77E04/30, texto #F77E04
  - Primário: fundo primary-fixed (#C5EADF), texto primary (#01261F)
  - Técnico:  fundo surface-container-high (#E6E9E8), texto on-surface-variant (#414846)
```
> Os badges seguem o estilo do protótipo: cantos retos (não pill), transmitindo identidade técnica/industrial.

---

### 5.4 Seções

#### Padrão de Seção
```
Padding vertical: --space-4xl (desktop) / --space-3xl (mobile)
Container:        max-width 1200px, centralizado
Título:           --text-h1, centralizado ou left-aligned
Subtítulo:        --text-body-lg, cor --color-neutral-700, max-width 600px
Gap título→conteúdo: --space-2xl
```

#### Seção com Fundo Escuro (hero, destaque)
```
Fundo:        gradiente de --color-primary-dark para --color-primary
Texto:        --color-white
Overlay:      imagem de fundo com overlay escuro 60-70%
CTA:          botão com fundo branco, texto --color-primary (invertido)
```

---

### 5.5 Header / Navegação

```
Posição:      sticky top-0 z-50
Fundo:        primary-container (#1A3C34), opacity 95%, backdrop-blur-md
Layout:       flex justify-between items-center
Padding:      16px 24px
Font logo:    Space Grotesk, 20px, bold, uppercase, tracking-widest, branco
Ícone marca:  Material Symbols "memory", cor #F77E04 (accent solar)
Menu mobile:  hamburger icon branco/80%, active scale(0.95)
Menu desktop: links centralizados, Space Grotesk, 14px, tracking-wide, branco/80 hover branco
CTA header:   botão outline branco, compacto
```
> O header **não muda de cor** no scroll — permanece verde escuro sólido com blur. Transmite solidez constante.

---

### 5.6 Footer

```
Fundo:        primary-container (#1A3C34)
Padding:      48px 32px
Layout:       flex col (mobile) → flex row justify-between (desktop)

Logo:         Space Grotesk, 18px, bold, uppercase, branco
Descrição:    Inter, 14px, branco/70%, max-width 320px

Links:        Inter, 14px, branco/60%, hover branco, transition-opacity
Gap links:    16px vertical

Divider:      border-t branco/10%, padding-top 32px, full-width
Copyright:    Inter, 10px, branco/40%, tracking-widest, uppercase
```

### 5.7 Bottom Navigation Bar (Mobile Only)

```
Posição:      fixed bottom-0, z-50
Fundo:        surface (#F8FAF9), opacity 90%, backdrop-blur-lg
Borda top:    primary/10%
Shadow:       0 -10px 30px rgba(25,28,28,0.06)
Radius top:   12px (rounded-t-xl)
Altura:       64px
Layout:       flex justify-around items-center

Item ativo:   cor #F77E04, ícone FILL 1
Item normal:  cor primary (#1A3C34), opacity 60%, hover bg surface-container
Label:        Space Grotesk, 10px, uppercase, tracking-wider, weight 500
Ícone:        Material Symbols Outlined, 24px
```
> A bottom nav substitui o menu principal em mobile. Máximo 3-4 itens: IrrigaBox, Serviços, Orçamento, (Loja).

---

## 6. Iconografia

### Biblioteca
**Google Material Symbols Outlined** — variável, consistente, ampla, renderizada como fonte.

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" rel="stylesheet" />
```

### Configuração base
```css
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

### Variações
- **Outline (padrão)**: `FILL 0` — para ícones em cards, listas, features
- **Filled (destaque)**: `FILL 1` — para ícone ativo na nav, ícones de citação, features da seção de solução
- **Cor accent**: `#F77E04` — ícones de features na seção escura, quotes, nav ativa
- **Cor primary**: `#01261F` — ícones em cards sobre fundo claro

### Tamanhos
- 20px: inline com texto
- 24px: cards, listas, nav
- 32px: features, benefícios
- 48px: destaques de seção (quote icon = `text-5xl`)

### Ícones Específicos do Projeto
| Conceito              | Material Symbol            | Contexto de uso                        |
|-----------------------|----------------------------|----------------------------------------|
| Proteção              | `shield_with_house`        | Feature IrrigaBox — proteção IP65      |
| Temperatura           | `ac_unit`                  | Feature IrrigaBox — controle térmico   |
| Umidade               | `water_drop`               | Feature IrrigaBox — anti-umidade       |
| Insetos               | `bug_report`               | Card de risco — invasão de fauna       |
| Vedação               | `security`                 | Feature IrrigaBox — vedação total      |
| Operação remota       | `settings_remote`          | Feature IrrigaBox — opera sem abrir    |
| Alerta / Risco        | `report_problem`           | Cards de risco operacional             |
| Citação               | `format_quote`             | Bloco de depoimento (FILL 1)           |
| Marca / Chip          | `memory`                   | Ícone do logo no header                |
| IrrigaBox (nav)       | `settings_input_component` | Bottom nav — item IrrigaBox            |
| Serviços (nav)        | `engineering`              | Bottom nav — item Serviços             |
| Orçamento (nav)       | `request_quote`            | Bottom nav — item Orçamentos           |
| Pessoa                | `person`                   | Avatar em depoimentos                  |
| Engenharia            | `precision_manufacturing`  | Serviços de projeto                    |
| Solar                 | `solar_power`              | Bombeamento solar                      |

---

## 7. Imagens e Fotografia

### Tratamento de Imagens
- **Fotos reais** são prioritárias sobre ilustrações ou stock
- Fotos devem ter tratamento de cor leve: leve aumento de contraste, balanço de brancos consistente
- Não aplicar filtros pesados — a autenticidade é a prova
- Border-radius em fotos: `12px` em cards, `0` quando sangram na seção

### Aspect Ratios Padrão
| Contexto          | Ratio   |
|-------------------|---------|
| Hero background   | 16:9    |
| Card de produto   | 4:3     |
| Galeria           | 1:1     |
| Detalhe técnico   | 3:2     |
| Thumbnail         | 1:1     |

*(Guidelines completas de fotografia no documento 05-GUIDELINES-IMAGENS.md)*

---

## 8. Motion / Animação

### Princípios
- Animações são **funcionais**, não decorativas
- Duração: 200-300ms para micro-interações, 400-600ms para transições de seção
- Easing: `ease-out` para entradas, `ease-in-out` para transições

### Animações Previstas
| Elemento              | Tipo                    | Trigger          |
|-----------------------|-------------------------|------------------|
| Cards                 | Fade-up + scale(0.98→1) | Scroll into view |
| Botões                | Scale(1.02) + shadow    | Hover            |
| Header                | Blur-in do fundo        | Scroll > 100px   |
| Números/métricas      | Count-up                | Scroll into view |
| Comparativo antes/depois | Slide horizontal     | Interação        |
| Galeria IrrigaBox     | Fade crossfade          | Click/swipe      |

---

## 9. Responsividade — Breakpoints

| Token          | Valor   | Referência                    |
|----------------|---------|-------------------------------|
| `--bp-mobile`  | 0-639px | Smartphones                   |
| `--bp-tablet`  | 640-1023px | Tablets                    |
| `--bp-desktop` | 1024-1439px | Laptops e desktops         |
| `--bp-wide`    | 1440px+ | Telas grandes                 |

### Comportamentos por Breakpoint
- **Mobile**: stack vertical, botões full-width, menu hamburger, hero compacto
- **Tablet**: grid 2 colunas, menu visível parcial
- **Desktop**: grid 3-4 colunas, layout completo, espaçamentos generosos
- **Wide**: container max 1200px centralizado, fundos expandem full-width

---

## 10. Acessibilidade

- Contraste mínimo WCAG AA (4.5:1 para texto, 3:1 para elementos grandes)
- Focus states visíveis em todos os interativos (outline 2px `--color-primary`)
- Alt text obrigatório em todas as imagens do produto
- Textos de botão descritivos (nunca apenas ícone sem label)
- Navegação por teclado funcional
- Sem animações que causem motion sickness (respeitar `prefers-reduced-motion`)
