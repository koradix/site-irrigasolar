# Fotografias de portfólio — Irrigasolar

Esta pasta guarda as fotos reais dos projetos executados. Nenhuma imagem de
banco, mockup 3D ou gerada por IA deve ser colocada aqui — apenas fotografia
real e autorizada da instalação, da equipe e/ou do cliente.

## Organização de pastas

Crie uma subpasta por projeto, usando o mesmo `slug` cadastrado em
`content/site.ts` (array `projects`):

```
public/assets/portfolio/
  fazenda-boa-vista-bess/
    capa.webp
    galeria-01.webp
    galeria-02.webp
    galeria-03.webp
```

## Como cadastrar um projeto novo

1. Colete as fotos autorizadas (ver seção "Autorização" abaixo).
2. Converta para WebP e redimensione com o script já incluído no projeto:
   ```bash
   npm run images:optimize -- public/assets/portfolio/fazenda-boa-vista-bess
   ```
   Isso gera um `.webp` ao lado de cada `.png`/`.jpg` — depois apague os
   originais pesados se não precisar mais deles.
3. Edite `content/site.ts` e adicione um objeto ao array `projects`, com:
   - `slug` (igual ao nome da subpasta);
   - `title`, `segment`, `city`, `state`;
   - `challenge`, `solution`, `scope` (lista do que foi entregue);
   - `result` — **apenas se houver medição real**; se não houver, omita o
     campo (não invente número);
   - `testimonial` — **apenas com autorização explícita** do cliente para uso
     do nome/depoimento;
   - `cover: '/assets/portfolio/fazenda-boa-vista-bess/capa.webp'`;
   - `gallery: ['/assets/portfolio/fazenda-boa-vista-bess/galeria-01.webp', ...]`.
4. Rode `npm run build` para confirmar que a página `/projetos/[slug]` foi
   gerada sem erro.

Enquanto um projeto não tiver `cover`/`gallery`, os componentes tratam a
ausência normalmente (não quebram nem mostram imagem faltando) — mas o ideal
é sempre ter ao menos a foto de capa.

## Dimensões e proporções recomendadas

| Uso | Proporção | Largura recomendada |
|---|---|---|
| Capa do card de projeto | 4:3 | 1200px |
| Item de galeria | 1:1 | 800px |
| Hero de página (se aplicável) | 16:9 | 1920px |

## Autorização

Antes de publicar qualquer foto que mostre propriedade, equipamento
identificável ou pessoas:

- confirme por escrito (WhatsApp ou e-mail já serve como registro) que o
  cliente autoriza o uso da imagem e do relato no site;
- para depoimentos, guarde o texto exatamente como autorizado — não
  parafraseie de forma que mude o sentido;
- se a autorização for revogada, remova a foto e o texto imediatamente.

## O que NÃO fazer

- Não usar fotos de banco de imagens, Unsplash, etc.
- Não usar imagens geradas por IA.
- Não usar renders/mockups 3D como se fossem instalação real.
- Não publicar cliente, cidade ou número sem confirmação.
