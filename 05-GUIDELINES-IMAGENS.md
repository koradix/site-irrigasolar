# IRRIGASOLAR — Guidelines para Uso de Imagens Reais da IrrigaBox

---

## 1. Princípio Central

> **Autenticidade é a arma comercial mais forte.**
> A IrrigaBox é um produto real, instalado em campo real, para clientes reais.
> Toda imagem usada no site deve reforçar isso — nunca comprometer.

---

## 2. Categorias de Imagem

### 2.1 Produto Isolado (Studio/Controlado)
**Uso**: cards de produto, loja, specs técnicas, comparativos

| Critério | Diretriz |
|----------|----------|
| Fundo | Branco puro (#FFF) ou cinza neutro claro (#F5F5F5) |
| Iluminação | Suave, difusa, sem sombras duras |
| Ângulos obrigatórios | Frontal, 3/4 (ângulo principal), lateral, porta aberta, detalhe interno |
| Resolução mínima | 2000px no lado maior |
| Formato | WebP (primário) + JPG (fallback) |
| Tratamento | Nenhum filtro. Ajuste fino de balanço de brancos apenas |
| Foco | Produto inteiro nítido — sem bokeh excessivo |
| Marca visível | Logo Irrigasolar no produto deve estar legível |

### 2.2 Produto em Contexto de Campo (Instalação)
**Uso**: hero, seções de destaque, galeria, prova visual

| Critério | Diretriz |
|----------|----------|
| Cenário | Propriedade rural real — pivô, lavoura, pasto, poço, represa |
| Horário ideal | Golden hour (início da manhã ou fim da tarde) — luz quente natural |
| Composição | IrrigaBox como sujeito principal, paisagem como contexto |
| Regra dos terços | Produto posicionado em intersecção de terços, nunca centralizado |
| Pessoas | Opcional — técnico ou produtor interagindo com o produto valoriza |
| Equipamento visível | Cabos, inversores, painéis solares no entorno contextualizam |
| Tratamento | Contraste +5-10%, saturação +5% max. Nunca HDR artificial |
| Resolução mínima | 3000px no lado maior (será usada em hero fullwidth) |
| Céu | Deve aparecer — transmite amplitude, campo aberto, produtividade |

### 2.3 Produto em Fabricação (Processo)
**Uso**: página sobre, detalhes de engenharia, confiança na qualidade

| Critério | Diretriz |
|----------|----------|
| Cenário | Oficina/fábrica da Irrigasolar |
| Foco | Detalhes de soldagem, montagem, fiação, acabamento |
| Iluminação | Ambiente real da oficina — pode ser mais crua, transmite autenticidade |
| Equipamentos de segurança | Se pessoas aparecem, devem estar com EPI |
| Tratamento | Mínimo — autenticidade do processo é o objetivo |
| Resolução | 1500px+ no lado maior |

### 2.4 Detalhes Técnicos (Close-up)
**Uso**: specs, features, comparativos, página de produto

| Critério | Diretriz |
|----------|----------|
| O que fotografar | Ventilação, vedação, painel de controle, interior do quadro, conectores, iluminação interna, fechamento da porta |
| Foco | Shallow depth of field (bokeh) para isolar o detalhe |
| Escala | Incluir referência de escala quando relevante (mão, chave de fenda) |
| Tratamento | Nítido, sem filtros, cores fiéis |
| Resolução | 1500px+ |

---

## 3. O que NÃO Fazer com Imagens

| Proibido | Por quê |
|----------|---------|
| Filtros Instagram (sépia, P&B, saturação extrema) | Descaracteriza o produto e a marca |
| Fotos de banco de imagens genéricas | Destroem credibilidade — o visitante percebe |
| Mockups 3D ou renders | A IrrigaBox é real — render parece que o produto não existe |
| Marca d'água sobre o produto | Polui visualmente, transmite insegurança |
| Fotos de má qualidade (celular sem cuidado) | Melhor não ter foto do que ter foto ruim |
| Fundos transparentes com recorte mal feito | Halo branco/serrilhado compromete toda a percepção |
| Distorção de proporções | Nunca esticar ou comprimir a imagem para encaixar |
| Texto sobre áreas de detalhe do produto | O produto deve ser visível — texto vai em áreas de respiro |

---

## 4. Posicionamento Visual por Seção

### Hero
```
Imagem: IrrigaBox instalada em campo aberto, golden hour
Posição: full-width background, object-position center
Overlay: gradiente linear-gradient(135deg, rgba(13,59,19,0.75) 0%, rgba(13,59,19,0.3) 100%)
Texto: sobre o overlay, lado esquerdo
Produto: visível na metade direita, não coberto pelo overlay denso
```

### Seção IrrigaBox — Apresentação
```
Imagem: produto em ângulo 3/4, fundo limpo ou campo desfocado
Posição: lado esquerdo do layout split (50%)
Tamanho: contain, nunca cortar o produto
Sombra: drop-shadow sutil para dar volume (se fundo branco)
```

### Seção IrrigaBox — Comparativo
```
Coluna "Antes": foto real de instalação improvisada (quadro aberto, fios expostos, gambiarra)
Coluna "Depois": foto real de IrrigaBox instalada (limpa, fechada, profissional)
Aspect ratio: ambas 4:3, mesma proporção
Tratamento: "Antes" pode ter leve dessaturação para reforçar contraste emocional
```

### Seção Irrigação / Bombeamento
```
Imagens: projetos reais executados pela Irrigasolar
Posição: lado direito ou esquerdo (alternando entre seções)
Aspect ratio: 4:3
Destaque: sistema completo visível (painéis + bomba + IrrigaBox se houver)
```

### Seção Prova Social (Cases)
```
Imagens: fotos de projetos entregues em diferentes propriedades
Formato: cards com aspect ratio 16:10 (horizontal, respira)
Variedade: mostrar diferentes regiões, culturas, tamanhos de propriedade
Caption: sempre com localização (Cidade/UF)
```

### Loja
```
Imagens: produto isolado em fundo branco
Formato: 1:1 (quadrado) para grid uniforme
Consistência: todas as fotos da loja devem ter mesmo fundo, iluminação e estilo
Zoom: hover pode mostrar close-up do produto
```

---

## 5. Otimização Técnica

### Formatos e Compressão

| Contexto | Formato | Qualidade | Max Width |
|----------|---------|-----------|-----------|
| Hero background | WebP | 80% | 1920px |
| Cards de produto | WebP | 85% | 800px |
| Thumbnails loja | WebP | 85% | 400px |
| Galeria fullscreen | WebP | 90% | 1600px |
| Fallback universal | JPG | 85% | mesmo do WebP |

### Lazy Loading
- Hero: `loading="eager"` — carrega imediatamente
- Tudo abaixo do fold: `loading="lazy"`
- Usar `srcset` para servir tamanhos diferentes por viewport

### Placeholder
- Usar LQIP (Low Quality Image Placeholder) — thumbnail de 20px com blur
- Transição suave do placeholder para imagem final (fade 300ms)

---

## 6. Banco de Imagens Necessário (Shot List)

### Prioridade Alta (necessário antes do lançamento)
- [ ] IrrigaBox — ângulo 3/4, fundo branco (produto hero)
- [ ] IrrigaBox — frontal, porta fechada, fundo branco
- [ ] IrrigaBox — porta aberta, interior visível, fundo branco
- [ ] IrrigaBox — instalada em campo, golden hour, paisagem visível
- [ ] IrrigaBox — detalhe da vedação
- [ ] IrrigaBox — detalhe da ventilação/controle de temperatura
- [ ] IrrigaBox — detalhe da iluminação interna
- [ ] IrrigaBox — detalhe do painel de controle/operação externa
- [ ] Instalação "antes" — quadro improvisado, fios expostos (para comparativo)
- [ ] Sistema de bombeamento solar completo instalado
- [ ] Projeto de irrigação em funcionamento (pivô ou gotejo)

### Prioridade Média (ideal para lançamento)
- [ ] IrrigaBox — múltiplos modelos lado a lado
- [ ] Técnico instalando IrrigaBox (com EPI)
- [ ] Produtor rural ao lado do equipamento (satisfação)
- [ ] Vista aérea (drone) de propriedade com sistema instalado
- [ ] Fabricação — soldagem ou montagem em oficina
- [ ] Placa de identificação / etiqueta técnica

### Prioridade Baixa (pode ser adicionado após lançamento)
- [ ] Vídeo curto (15-30s) de abertura da IrrigaBox mostrando interior
- [ ] Timelapse de instalação
- [ ] Fotos de diferentes regiões/culturas
- [ ] Fotos noturnas com iluminação interna acesa

---

## 7. Consistência de Marca nas Imagens

### Elementos que devem aparecer naturalmente
- Logo Irrigasolar no produto (nunca adicionada em pós-produção)
- Cor verde da marca no contexto (produto, etiquetas, uniformes)
- Paisagem brasileira real (não americana, não europeia)

### Estilo fotográfico resumido
```
Autêntico → não fabricado
Técnico → não casual
Rural → não urbano
Brasileiro → não importado
Profissional → não amador
Limpo → não poluído
```

### Tom da fotografia
A fotografia da Irrigasolar deve comunicar: **"isso foi feito com cuidado, por gente que entende de campo."**
