# IRRIGASOLAR — Wireframe Conceitual da Home Page

---

## Visão Geral

A home é uma **landing page de scroll longo** com 6 seções-âncora obrigatórias.
Cada seção funciona como micro-landing autossuficiente com seu próprio CTA.

**Fluxo narrativo**: Atenção → Problema → Solução → Prova → Serviços → Ação

---

## SEÇÃO 1 — HERO

### Layout Desktop
```
┌──────────────────────────────────────────────────────────────────────┐
│  [HEADER: Logo ← | Menu central | CTA "Orçamento" → ]   fixed/blur│
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                 FOTO REAL: IrrigaBox instalada em campo               │
│                 (full-width, altura ~90vh, overlay escuro 60%)       │
│                                                                      │
│    ┌─────────────────────────────────────────────┐                   │
│    │  Badge: "NOVO — IrrigaBox"                  │                   │
│    │                                              │                   │
│    │  PROTEÇÃO INTELIGENTE                        │  ← --text-hero   │
│    │  PARA SEU INVESTIMENTO                       │     800 weight   │
│    │  NO CAMPO                                    │                   │
│    │                                              │                   │
│    │  Quadro casinha plug and play para            │  ← --text-body-lg│
│    │  inversores solares e convencionais.          │     branco 80%   │
│    │  Pronto para ligar. Projetado para durar.    │                   │
│    │                                              │                   │
│    │  [██ SOLICITAR ORÇAMENTO ██]  [▷ VER PRODUTO]│  ← 2 CTAs       │
│    └─────────────────────────────────────────────┘                   │
│                                                                      │
│   ↓  scroll indicator sutil                                          │
└──────────────────────────────────────────────────────────────────────┘
```

### Layout Mobile (375px)
```
┌────────────────────────────┐
│ Logo     ☰  menu hamburger │
├────────────────────────────┤
│                            │
│  FOTO VERTICAL 9:16        │
│  IrrigaBox em campo        │
│  overlay gradiente bottom  │
│                            │
│  Badge: NOVO               │
│                            │
│  PROTEÇÃO                  │
│  INTELIGENTE               │
│  PARA SEU                  │
│  INVESTIMENTO              │
│                            │
│  Quadro casinha plug and   │
│  play para inversores.     │
│                            │
│  [██ SOLICITAR ORÇAMENTO] │ ← full-width
│  [   VER PRODUTO        ] │ ← full-width outline
│                            │
└────────────────────────────┘
```

### Notas do Hero
- Foto de fundo: IrrigaBox instalada, com paisagem rural ao fundo, luz natural
- Badge "NOVO" em `accent-solar` para criar urgência
- Headline máx 8 palavras — foco no benefício, não no produto
- Sub-headline máx 2 linhas — descreve o que é + diferencial
- 2 CTAs: primário (orçamento) + secundário (ver produto)
- Scroll indicator animado sutil (chevron pulsando)

---

## SEÇÃO 2 — IRRIGABOX (Produto Principal)

### Layout Desktop
```
┌──────────────────────────────────────────────────────────────────────┐
│  Fundo: --color-white                                                │
│                                                                      │
│              Badge: "PRODUTO PRINCIPAL"                               │
│         A solução que o campo precisava                              │
│                                                                      │
│  ┌──────────────────────┐  ┌──────────────────────────────────────┐  │
│  │                      │  │                                      │  │
│  │   FOTO REAL          │  │  IrrigaBox                           │  │
│  │   IrrigaBox          │  │  Quadro Casinha Plug and Play        │  │
│  │   em ângulo 3/4      │  │                                      │  │
│  │   mostrando           │  │  O primeiro quadro casinha com       │  │
│  │   detalhes do         │  │  controle de temperatura, umidade,   │  │
│  │   produto             │  │  vedação contra insetos e            │  │
│  │                      │  │  iluminação interna. Pronto para      │  │
│  │   aspect 4:3         │  │  ligar no seu inversor.              │  │
│  │                      │  │                                      │  │
│  │                      │  │  ┌────────┐ ┌────────┐ ┌────────┐   │  │
│  │                      │  │  │🌡 Temp │ │💧 Umid │ │🔒 Veda │   │  │
│  │                      │  │  └────────┘ └────────┘ └────────┘   │  │
│  │                      │  │  ┌────────┐ ┌────────┐ ┌────────┐   │  │
│  │                      │  │  │💡 Ilum │ │🔌 P&P  │ │🛡 Prot │   │  │
│  │                      │  │  └────────┘ └────────┘ └────────┘   │  │
│  │                      │  │                                      │  │
│  │                      │  │  [██ QUERO MINHA IRRIGABOX ██]       │  │
│  └──────────────────────┘  └──────────────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  SUB-BLOCO: COMPARATIVO "ANTES vs DEPOIS"                            │
│  Fundo: --color-neutral-100                                          │
│                                                                      │
│  ┌── ANTES (sem IrrigaBox) ──┐  ┌── DEPOIS (com IrrigaBox) ──────┐  │
│  │  borda-top: 3px danger     │  │  borda-top: 3px primary         │  │
│  │                            │  │                                  │  │
│  │  ✕ Improviso em campo     │  │  ✓ Quadro projetado p/ campo   │  │
│  │  ✕ Entrada de insetos     │  │  ✓ Vedação total               │  │
│  │  ✕ Sem controle de temp.  │  │  ✓ Controle de temperatura     │  │
│  │  ✕ Umidade danifica       │  │  ✓ Controle de umidade         │  │
│  │  ✕ Abertura constante     │  │  ✓ Opera sem abrir o quadro    │  │
│  │  ✕ Visual improvisado     │  │  ✓ Estética profissional       │  │
│  │                            │  │                                  │  │
│  │  [FOTO: gambiarra real]   │  │  [FOTO: IrrigaBox instalada]   │  │
│  └────────────────────────────┘  └──────────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  SUB-BLOCO: PREJUÍZO EVITADO                                        │
│  Fundo: --color-primary-900, texto branco                            │
│                                                                      │
│  "Quanto custa perder um inversor de R$ 8.000                        │
│   por falta de proteção adequada?"                                   │
│                                                                      │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                         │
│   │ Inversor │  │ Motor    │  │ Parada   │                         │
│   │ queimado │  │ danific. │  │ irrigação│                         │
│   │ R$ 8.000 │  │ R$ 5.000 │  │ R$ ??/dia│                         │
│   └──────────┘  └──────────┘  └──────────┘                         │
│                                                                      │
│  [██ PROTEJA SEU INVESTIMENTO ██]  ← botão accent-solar            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Notas da Seção IrrigaBox
- Layout split: foto real à esquerda (50%) + conteúdo à direita (50%)
- 6 mini-cards de benefício em grid 3x2 com ícones
- Bloco comparativo usa contraste visual forte (vermelho vs verde)
- Bloco de prejuízo evitado: fundo escuro, números grandes em monospace
- Mobile: foto empilha acima do texto, comparativo vira accordion ou swipe

---

## SEÇÃO 3 — PROJETO DE IRRIGAÇÃO

### Layout Desktop
```
┌──────────────────────────────────────────────────────────────────────┐
│  Fundo: --color-white                                                │
│                                                                      │
│  Badge: "SERVIÇO"                                                    │
│  Projeto de Irrigação                                                │
│  sob medida para sua propriedade                                    │
│                                                                      │
│  ┌─────────────────────────────┐  ┌────────────────────────────────┐ │
│  │                             │  │                                │ │
│  │  Texto descritivo:          │  │  FOTO REAL                     │ │
│  │                             │  │  Projeto de irrigação          │ │
│  │  Da captação à entrega de   │  │  em execução / resultado       │ │
│  │  água na planta. Projetos   │  │                                │ │
│  │  dimensionados para a       │  │  aspect 4:3                    │ │
│  │  realidade do produtor      │  │                                │ │
│  │  brasileiro.                │  │                                │ │
│  │                             │  │                                │ │
│  │  ✓ Dimensionamento técnico │  └────────────────────────────────┘ │
│  │  ✓ Análise de solo e água  │                                     │
│  │  ✓ Seleção de equipamentos │                                     │
│  │  ✓ Acompanhamento          │                                     │
│  │                             │                                     │
│  │  [SOLICITAR PROJETO →]     │                                     │
│  └─────────────────────────────┘                                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Notas
- Layout split invertido (texto esquerda, imagem direita) para quebrar o ritmo visual
- Lista de checkmarks reforça completude do serviço
- CTA de lead generation, não venda direta
- Mobile: imagem vai para cima do texto

---

## SEÇÃO 4 — BOMBEAMENTO SOLAR

### Layout Desktop
```
┌──────────────────────────────────────────────────────────────────────┐
│  Fundo: --color-neutral-100                                          │
│                                                                      │
│  Badge: "SERVIÇO"                                                    │
│  Bombeamento Solar                                                   │
│  Água de graça com energia do sol                                   │
│                                                                      │
│  ┌────────────────────────────┐  ┌──────────────────────────────┐   │
│  │                            │  │                              │   │
│  │  FOTO REAL                 │  │  O bombeamento solar elimina │   │
│  │  Sistema de bombeamento    │  │  o custo de energia elétrica │   │
│  │  solar instalado           │  │  na captação de água.        │   │
│  │                            │  │                              │   │
│  │  aspect 4:3                │  │  Ideal para:                 │   │
│  │                            │  │  • Poços artesianos          │   │
│  │                            │  │  • Represas                  │   │
│  │                            │  │  • Rios e córregos           │   │
│  │                            │  │  • Cisternas                 │   │
│  │                            │  │                              │   │
│  │                            │  │  ┌─────────┐ ┌────────────┐ │   │
│  │                            │  │  │ 0 custo │ │ Funciona   │ │   │
│  │                            │  │  │ energia │ │ sem rede   │ │   │
│  │                            │  │  └─────────┘ └────────────┘ │   │
│  │                            │  │                              │   │
│  │                            │  │  [SOLICITAR ORÇAMENTO →]    │   │
│  └────────────────────────────┘  └──────────────────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Notas
- Fundo `neutral-100` para alternar com a seção anterior (branca)
- Layout split: foto esquerda + conteúdo direita
- Dados de impacto (custo zero, off-grid) em mini-cards destacados
- Conexão com IrrigaBox como complemento natural

---

## SEÇÃO 5 — SUA IRRIGAÇÃO (Prova Social / Portfólio)

### Layout Desktop
```
┌──────────────────────────────────────────────────────────────────────┐
│  Fundo: --color-white                                                │
│                                                                      │
│  Badge: "RESULTADOS"                                                 │
│  Sua irrigação funcionando                                          │
│  como deveria funcionar                                             │
│                                                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│  │         │ │         │ │         │ │         │                   │
│  │  CASE 1 │ │  CASE 2 │ │  CASE 3 │ │  CASE 4 │  ← carrossel    │
│  │  Foto   │ │  Foto   │ │  Foto   │ │  Foto   │                   │
│  │  real   │ │  real   │ │  real   │ │  real   │                   │
│  │         │ │         │ │         │ │         │                   │
│  │ Local   │ │ Local   │ │ Local   │ │ Local   │                   │
│  │ Tipo    │ │ Tipo    │ │ Tipo    │ │ Tipo    │                   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                   │
│                                                                      │
│  ──────────── DEPOIMENTOS ────────────                               │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                                                                  │ │
│  │  "Texto do depoimento de um produtor rural                      │ │
│  │   que perdeu um inversor antes e agora usa IrrigaBox."          │ │
│  │                                                                  │ │
│  │  ── João da Silva, Fazenda Boa Vista, Uberaba/MG               │ │
│  │                                                                  │ │
│  │         ◄  ●  ○  ○  ►   ← dots de navegação                    │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                          │
│  │  +150    │  │  +50     │  │  12      │  ← métricas counter-up   │
│  │  projetos│  │  cidades │  │  anos    │                          │
│  │  entregues│  │  atendidas│  │  mercado │                          │
│  └──────────┘  └──────────┘  └──────────┘                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Notas
- Grid de 4 cards de cases com fotos reais (scroll horizontal em mobile)
- Carrossel de depoimentos com nome real + localização
- Métricas com animação count-up ao entrar no viewport
- Prova social máxima: fotos reais, nomes reais, locais reais

---

## SEÇÃO 6 — LOJA (Vitrine)

### Layout Desktop
```
┌──────────────────────────────────────────────────────────────────────┐
│  Fundo: --color-neutral-100                                          │
│                                                                      │
│  Badge: "LOJA"                                                       │
│  Produtos para sua irrigação                                        │
│                                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │  PRODUTO │ │  PRODUTO │ │  PRODUTO │ │  PRODUTO │               │
│  │  foto    │ │  foto    │ │  foto    │ │  foto    │               │
│  │          │ │          │ │          │ │          │               │
│  │  Nome    │ │  Nome    │ │  Nome    │ │  Nome    │               │
│  │  Preço   │ │  Preço   │ │  Preço   │ │  Preço   │               │
│  │  [VER →] │ │  [VER →] │ │  [VER →] │ │  [VER →] │               │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│                                                                      │
│  [██ VER TODOS OS PRODUTOS ██]  ← link para /loja completa         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  BLOCO FINAL CTA — fundo --color-primary-900                        │
│                                                                      │
│  Pronto para proteger seu investimento no campo?                    │
│                                                                      │
│  [██ FALE COM UM ESPECIALISTA ██]   [📱 CHAMAR NO WHATSAPP]        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
│                                                                      │
│  FOOTER                                                              │
│  [Logo] [Links] [Serviços] [Contato/Redes]                         │
│  ─────────────────────────────────────────                           │
│  © Irrigasolar — Todos os direitos reservados                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Notas
- Grid de 4 produtos em destaque (curadoria, não catálogo completo)
- IrrigaBox deve ser o primeiro item da vitrine
- CTA para loja completa ao final
- Bloco final de conversão: fundo escuro, 2 CTAs (formulário + WhatsApp)
- Footer segue imediatamente

---

## Elementos Flutuantes (Globais)

```
┌─────────────────────┐
│  WhatsApp Button     │  Posição: fixed, bottom-right
│  Circular 56px       │  Cor: #25D366
│  Shadow: lg          │  Sempre visível
│  Pulso sutil a       │  Z-index alto
│  cada 30s            │
└─────────────────────┘
```

---

## Fluxo Visual de Scroll (Resumo)

```
HERO ────────────── Atenção (proposta de valor imediata)
  │
  ▼
IRRIGABOX ───────── Interesse (produto principal + benefícios)
  │ └── Comparativo: improviso vs solução
  │ └── Prejuízo evitado (ancoragem de valor)
  ▼
IRRIGAÇÃO ───────── Expansão (serviço complementar 1)
  │
  ▼
BOMBEAMENTO ─────── Expansão (serviço complementar 2)
  │
  ▼
SUA IRRIGAÇÃO ───── Prova (cases + depoimentos + números)
  │
  ▼
LOJA ────────────── Ação (vitrine + CTA final)
  │
  ▼
FOOTER ──────────── Navegação + contato + credibilidade
```

---

## Direção de UI: Desktop vs Mobile

### Desktop
- Layouts split (50/50 ou 60/40) com imagens grandes
- Hover effects em cards e botões
- Header fixo com menu completo visível
- Espaçamentos generosos (`space-4xl` entre seções)
- Grid de 3-4 colunas para cards

### Mobile
- Stack vertical completo
- Imagens full-width com texto abaixo
- Botões full-width em contextos de conversão
- Menu hamburger com drawer
- Carrossel horizontal para cards (swipe)
- Espaçamentos reduzidos (`space-3xl` entre seções)
- WhatsApp button sempre visível
- CTAs sticky no bottom em páginas de produto
- Touch targets mínimo 44px
