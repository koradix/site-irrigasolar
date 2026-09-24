# Prompt para inserir e validar as imagens da Irrigasolar

Copie o conteúdo abaixo para o agente do VS Code aberto na raiz do projeto.

---

Você está trabalhando no projeto Next.js da Irrigasolar. Insira ou valide as imagens profissionais já existentes, sem gerar novas imagens e sem duplicar componentes.

## Organização obrigatória

- Originais PNG de alta resolução: `assets-source/visuals/`
- Versões WebP carregadas pelo site: `public/assets/visuals/`
- Nunca referencie `assets-source/` no código do navegador.
- Use exclusivamente os arquivos WebP em `public/assets/visuals/`.
- Não mova essas imagens para `public/assets/portfolio/`: elas são visuais conceituais, não fotografias de projetos executados.

## Mapeamento exato

1. `public/assets/visuals/hero-energia-agro.webp`
   - Home, componente `Hero` em `app/page.tsx`.
   - Também pode ser usado provisoriamente na abertura de `/projetos`, sem apresentá-lo como case real.
   - Alt: `Visual conceitual de uma operação agrícola integrada a energia solar, armazenamento em baterias e irrigação`.

2. `public/assets/visuals/bess-silos-agro.webp`
   - Hero de `app/bess-agronegocio/page.tsx`.
   - Card e hero da aplicação de silos/armazenagem.
   - Alt: `Visual conceitual de sistema BESS integrado a silos e geração solar no agronegócio`.

3. `public/assets/visuals/irrigacao-solar-offgrid.webp`
   - Hero de `app/irrigacao-solar-off-grid/page.tsx`.
   - Card e hero da aplicação de pivôs, bombas e captação.
   - Alt: `Visual conceitual de bombeamento solar off-grid com reservatório e pivô de irrigação`.

4. `public/assets/visuals/cadeia-fria-agro.webp`
   - Card e hero de `/aplicacoes/cadeia-fria`.
   - Alt: `Visual conceitual de infraestrutura energética para cadeia fria agrícola`.

5. `public/assets/visuals/leite-ordenha-energia.webp`
   - Card e hero de `/aplicacoes/leite-aves-suinos`.
   - Alt: `Visual conceitual de ordenha e resfriamento de leite integrados à energia solar`.

6. `public/assets/visuals/engenharia-campo.webp`
   - Imagem da seção de engenharia da home.
   - Hero das páginas `/engenharia` e `/sobre`.
   - Alt: `Visual conceitual de engenheiros avaliando uma instalação de energia no campo`.

7. Galeria editorial de `/irrigacao-solar-off-grid`:
   - `offgrid-poco-reservatorio.webp`: poço solar e reservatório elevado;
   - `offgrid-gotejamento-cafe.webp`: bombeamento solar e irrigação localizada;
   - `offgrid-pivo-solar.webp`: pivô abastecido por bombeamento solar.
   - Exibir as três imagens abaixo da explicação sobre reservação, em grid responsivo 3:2, com legendas técnicas e aviso de que são imagens conceituais.

## Implementação

- Use `next/image` em todas as ocorrências.
- O componente `components/marketing/Hero.tsx` deve aceitar `imageSrc` e `imageAlt` opcionais.
- Para o hero, use `fill`, `priority`, `sizes="100vw"` e `object-cover`.
- Aplique gradiente escuro da esquerda para a direita para preservar contraste do texto, mantendo os equipamentos visíveis na direita.
- Reserve `priority` somente para a imagem do hero/LCP.
- Nos cards, use `fill`, proporção `aspect-[4/3]`, `sizes` responsivo e lazy loading padrão.
- Cadastre as imagens dos cards em `content/site.ts`, junto aos dados das aplicações.
- Na seção de engenharia use proporção aproximada de 3:2.
- Nas páginas futuras de projetos reais, use `project.cover` no hero e `project.gallery` na galeria. Não reutilize imagens conceituais como se fossem obras da empresa.
- Mantenha texto alternativo honesto usando a expressão “Visual conceitual”.
- Não acrescente logos ou textos sobre as fotografias.

## Performance

- Não carregue os PNGs originais no site.
- Não marque imagens abaixo da dobra como `priority`.
- Não use CSS `background-image` para conteúdo relevante.
- Não aumente as imagens além da resolução original.
- Preserve as versões WebP atuais, que têm entre aproximadamente 171 KB e 295 KB.

## Validação obrigatória

Após implementar ou conferir o que já está pronto:

1. execute `npm run typecheck`;
2. execute `npm test -- --run`;
3. execute `npm run build`;
4. confira home, BESS, off-grid, as quatro aplicações, Engenharia e Sobre em desktop e mobile;
5. confirme que não há 404 de imagem nem erro no console;
6. rode Lighthouse móvel em build de produção;
7. mantenha Accessibility, Best Practices e SEO próximos de 100 e Performance acima de 90;
8. não faça alterações de conteúdo comercial fora do escopo das imagens.

Ao final, informe quais arquivos foram modificados, onde cada imagem foi aplicada e os resultados dos testes.

---

