# IRRIGASOLAR — Sitemap & Arquitetura da Informação

---

## Princípio Estrutural

O site segue uma arquitetura de **funil de conversão progressivo**:
1. **Atenção** → Hero com proposta de valor imediata
2. **Interesse** → Produto principal (IrrigaBox) com prova visual
3. **Desejo** → Serviços complementares e portfólio
4. **Ação** → Loja e CTAs distribuídos

A navegação é **flat** (sem submenus profundos), priorizando acesso direto e escaneabilidade mobile.

---

## Mapa do Site

```
IRRIGASOLAR.COM
│
├── HOME (landing page principal — single page com seções âncora)
│   ├── #hero ─────────────── Proposta de valor + CTA principal
│   ├── #irrigabox ────────── Produto principal
│   ├── #projeto-irrigacao ── Serviço 1
│   ├── #bombeamento-solar ── Serviço 2
│   ├── #sua-irrigacao ────── Portfólio / Cases / Prova social
│   └── #loja ─────────────── Vitrine de produtos + link para loja completa
│
├── /irrigabox (página dedicada ao produto)
│   ├── Visão geral do produto
│   ├── Galeria de fotos reais (campo, fabricação, instalação)
│   ├── Especificações técnicas
│   ├── Comparativo: antes vs depois (improviso vs IrrigaBox)
│   ├── Benefícios detalhados
│   ├── Modelos e configurações disponíveis
│   ├── Depoimentos / Cases
│   ├── FAQ técnico
│   └── CTA: Solicitar orçamento / Comprar
│
├── /projeto-irrigacao (página de serviço)
│   ├── O que é o serviço
│   ├── Etapas do projeto
│   ├── Tipos de irrigação atendidos
│   ├── Portfólio de projetos executados
│   ├── Resultados / métricas de clientes
│   └── CTA: Solicitar projeto
│
├── /bombeamento-solar (página de serviço)
│   ├── O que é bombeamento solar
│   ├── Como funciona
│   ├── Vantagens vs bombeamento convencional
│   ├── Produtos utilizados (integração com IrrigaBox)
│   ├── Cases de instalação
│   └── CTA: Solicitar orçamento
│
├── /loja (e-commerce ou vitrine)
│   ├── Categorias de produtos
│   │   ├── IrrigaBox (modelos)
│   │   ├── Componentes de irrigação
│   │   ├── Acessórios
│   │   └── Kits
│   ├── Página de produto individual
│   │   ├── Fotos
│   │   ├── Descrição técnica
│   │   ├── Preço / Orçamento
│   │   └── CTA: Comprar / Solicitar
│   └── Carrinho / Checkout (se e-commerce)
│
├── /contato
│   ├── Formulário de contato
│   ├── WhatsApp direto
│   ├── Localização
│   └── Horário de atendimento
│
├── /sobre (opcional — pode ser seção na home)
│   ├── A Irrigasolar
│   ├── Missão e valores
│   └── Equipe / Estrutura
│
└── Elementos globais (presentes em todas as páginas)
    ├── Header
    │   ├── Logo Irrigasolar
    │   ├── Menu: Home | IrrigaBox | Irrigação | Bombeamento | Loja | Contato
    │   ├── CTA header: "Solicitar Orçamento"
    │   └── Indicador WhatsApp
    ├── Footer
    │   ├── Logo
    │   ├── Links rápidos
    │   ├── Dados de contato
    │   ├── Redes sociais
    │   └── Selos / certificações
    └── Floating WhatsApp button
```

---

## Hierarquia de Navegação

| Prioridade | Item          | Tipo              | Objetivo                        |
|------------|---------------|-------------------|---------------------------------|
| 1          | IrrigaBox     | Produto principal | Conversão direta                |
| 2          | Irrigação     | Serviço           | Geração de lead qualificado     |
| 3          | Bombeamento   | Serviço           | Geração de lead qualificado     |
| 4          | Loja          | E-commerce        | Venda direta / catálogo         |
| 5          | Contato       | Suporte           | Canal de conversão alternativo  |

---

## Fluxos de Conversão Previstos

### Fluxo 1 — Compra direta IrrigaBox
```
Hero → Seção IrrigaBox → Página /irrigabox → Galeria + Specs → CTA Comprar/Orçamento
```

### Fluxo 2 — Lead de projeto
```
Hero → Seção Irrigação ou Bombeamento → Página dedicada → Formulário de projeto
```

### Fluxo 3 — Exploração de loja
```
Header "Loja" → Categorias → Produto → Comprar/Orçamento
```

### Fluxo 4 — Contato direto
```
Qualquer página → WhatsApp flutuante → Conversa direta
```

---

## Regras de Arquitetura

1. **Toda seção da home é autossuficiente** — deve conter proposta de valor, prova e CTA próprio
2. **Páginas internas expandem** o que a home resume — nunca duplicam conteúdo
3. **Máximo de 2 cliques** para qualquer ação de conversão
4. **Mobile-first** — toda hierarquia deve funcionar em tela de 375px
5. **Ancoragem por hash** — links do menu na home levam a seções via scroll suave
6. **Sem pop-ups intrusivos** — conversão por persuasão, não por interrupção
