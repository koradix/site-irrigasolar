# Prompt para reestruturação do site Irrigasolar no VS Code

Copie todo o conteúdo abaixo e envie ao Claude/Copilot/agente de código aberto na raiz deste repositório.

---

## PROMPT

Você está trabalhando no repositório existente do site **Irrigasolar**, construído com Next.js 14, TypeScript, Tailwind CSS e React. Sua tarefa é **reestruturar e implementar o site completo**, e não apenas apresentar um plano ou mockup.

Leia primeiro estes arquivos para entender o projeto e o diagnóstico:

- `RELATORIO-AUDITORIA-IRRIGASOLAR-BESS.md`
- `01-SITEMAP.md`
- `02-DESIGN-SYSTEM.md`
- `03-WIREFRAME-HOME.md`
- `04-RACIONAL-ESTRATEGICO.md`
- `05-GUIDELINES-IMAGENS.md`
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- todos os componentes em `components/`
- arquivos relevantes de conteúdo e configuração em `lib/`

Considere o relatório de auditoria como a orientação estratégica mais recente. Quando houver conflito com documentos antigos, **o relatório e este prompt têm prioridade**.

### Resultado esperado

Transformar o site em uma presença digital premium, sóbria, técnica e extremamente confiável para o agronegócio, posicionando a Irrigasolar como empresa de engenharia especializada em:

1. **BESS e continuidade energética para o campo** — solução prioritária e principal vetor de crescimento;
2. **energia solar para irrigação off-grid**;
3. **projetos completos de irrigação e bombeamento solar**;
4. integração entre **bateria, solar, rede, gerador e gestão de energia**;
5. IrrigaBox apenas como tecnologia complementar de proteção/automação, sem seção hero, sem destaque exagerado e sem competir com as soluções principais.

O novo site deve transmitir que a Irrigasolar entende a operação produtiva do agronegócio, não apenas painéis, bombas ou baterias.

### Posicionamento central

Use como território de marca:

> **Irrigasolar Engenharia — Energia confiável para o agro não parar.**

Proposta de valor:

> Projetamos e integramos sistemas de energia para operações críticas do agronegócio, combinando armazenamento em baterias, energia solar, rede e geradores para proteger a produção, reduzir custos e aumentar a autonomia no campo.

Não apresente BESS como uma “bateria grande”. Apresente como infraestrutura de continuidade produtiva, resiliência, controle de demanda e integração energética.

### Regras obrigatórias de veracidade

Não invente dados, números, clientes, cidades, depoimentos, economias, garantias, certificações ou parcerias.

O projeto atual contém informações provisórias que **não podem chegar à produção**, incluindo, entre outras:

- CNPJ `00.000.000/0001-00`;
- endereço `Av. das Lavouras, 000`;
- cases em `lib/cases.ts` sem comprovação;
- imagens `/case-1.jpg`, `/case-2.jpg` e `/case-3.jpg` inexistentes;
- “Parceiro Integrador WEG”;
- “Certificação Pro”;
- “+250 bombas instaladas”;
- garantias, prazos de payback e linhas de financiamento não documentadas.

Remova essas alegações da interface ou faça a renderização depender de dados reais em um arquivo central de conteúdo. Quando um dado não existir, o bloco não deve aparecer. Não use texto fictício visível como se fosse verdadeiro.

Crie um arquivo central, por exemplo `content/site.ts`, para:

- contatos;
- dados institucionais;
- credenciais verificadas;
- soluções;
- projetos/portfólio;
- FAQs;
- links sociais;
- regiões atendidas.

Use tipos TypeScript e permita que campos opcionais não sejam renderizados. Inclua comentários `TODO: preencher somente com informação comprovada` onde necessário.

### Direção visual

Crie uma estética de **engenharia premium aplicada ao agronegócio**, evitando aparência de loja varejista de energia solar.

Princípios:

- sóbrio, rural contemporâneo, técnico e humano;
- grandes áreas de respiro;
- hierarquia tipográfica forte;
- fotografias reais como elemento principal;
- poucos efeitos e animações discretas;
- diagramas claros, dados objetivos e ícones consistentes;
- não usar carrossel no hero;
- não usar fundos excessivamente chamativos ou vários gradientes;
- não usar emojis na interface;
- evitar cards em excesso;
- não usar imagens externas remotas, bancos aleatórios ou imagens geradas por IA;
- utilizar somente assets locais e deixar a substituição das fotos simples.

Paleta sugerida, ajustável com contraste WCAG AA:

- verde profundo: `#10271D`;
- verde secundário: `#244C3A`;
- areia clara: `#F3EFE6`;
- branco quente: `#FCFBF7`;
- grafite: `#18201C`;
- ocre/cobre para acentos: `#B97832`;
- amarelo solar apenas para pequenos realces: `#E4AD32`.

Revise as fontes. A combinação atual pode ser substituída se necessário. Preferência:

- títulos editoriais: **Source Serif 4**;
- textos, navegação, números e interface: **Manrope**;
- carregar via `next/font/google`, apenas os pesos realmente usados e com `display: swap`.

Se decidir manter as fontes atuais, justifique em um comentário no arquivo de design tokens e garanta aparência técnica, não “luxo de moda”.

### Fotografias e portfólio

O proprietário fornecerá posteriormente fotos reais de sistemas instalados.

Prepare a arquitetura para recebê-las:

- crie `public/assets/portfolio/`;
- adicione um `README.md` nessa pasta explicando nomes, dimensões e proporções recomendadas;
- defina os projetos em um arquivo de conteúdo tipado;
- cada projeto deve aceitar capa, galeria, segmento, município/UF, desafio, solução, escopo técnico, resultado comprovado e depoimento autorizado;
- se não houver projetos reais cadastrados, mostre uma seção institucional enxuta, sem inventar cases;
- não renderize cartões quebrados ou imagens inexistentes;
- use `next/image`, `sizes`, dimensões adequadas e formatos WebP/AVIF quando disponíveis.

As fotos futuras devem mostrar instalações, contexto produtivo, detalhes técnicos, equipe e cliente quando autorizado. Não mascarar fotos reais com overlays fortes.

### Arquitetura do site

Implemente as seguintes rotas:

- `/` — home institucional;
- `/bess-agronegocio` — página principal de BESS;
- `/irrigacao-solar-off-grid` — bombeamento/irrigação solar sem rede;
- `/projetos` — portfólio dinâmico de projetos reais;
- `/engenharia` — método, integração, implantação e O&M;
- `/sobre` — empresa, equipe, responsabilidade técnica e área de atuação;
- `/diagnostico` — formulário de qualificação;
- `/privacidade`;
- `/termos`.

Se for útil para SEO e houver conteúdo suficiente, crie páginas de aplicação reutilizando componentes, sem duplicar texto:

- `/aplicacoes/irrigacao`;
- `/aplicacoes/armazenagem-e-silos`;
- `/aplicacoes/cadeia-fria`;
- `/aplicacoes/leite-aves-suinos`.

Não crie páginas vazias ou com conteúdo genérico apenas para aumentar a quantidade de URLs.

### Navegação principal

Use um cabeçalho limpo, acessível e responsivo:

- Soluções;
- BESS para o Agro;
- Irrigação Solar Off-grid;
- Projetos;
- Engenharia;
- Sobre;
- CTA destacado: **Solicitar diagnóstico**.

Mantenha a loja, se ainda for necessária, apenas como link secundário no rodapé. Ela não deve competir com a oferta de engenharia.

### Estrutura da nova home

#### 1. Hero

Sem carrossel. Uma única mensagem, uma fotografia real/local e dois CTAs.

Headline sugerida:

> **Energia confiável para o agro não parar.**

Subheadline:

> Projetos de armazenamento em baterias, energia solar e irrigação off-grid para proteger operações críticas, reduzir custos e ampliar a autonomia no campo.

CTA principal: **Solicitar diagnóstico energético**  
CTA secundário: **Conhecer as soluções**

Microcopy:

> Análise inicial por especialista. Cada projeto é dimensionado para a realidade da operação.

Evite “zerar conta”, “última conta de energia” ou promessas absolutas.

#### 2. Faixa de autoridade

Mostre somente credenciais comprovadas presentes no arquivo central de conteúdo. Se não houver credenciais configuradas, omita a seção por completo.

#### 3. Problema de negócio

Título sugerido:

> **Quando a energia para, a produção continua perdendo.**

Apresente quatro contextos de maneira objetiva:

- irrigação e bombeamento;
- armazenamento e secagem;
- refrigeração/cadeia fria;
- granjas, ordenha e beneficiamento.

Não coloque números de prejuízo sem fonte ou informação real do cliente.

#### 4. Soluções principais

Crie três blocos com hierarquia clara:

1. **BESS para o agronegócio** — protagonista;
2. **Irrigação solar off-grid**;
3. **Projetos de irrigação e bombeamento**.

Cada bloco deve explicar o problema resolvido, para quem é indicado e o próximo passo. BESS deve ocupar maior destaque visual, mas sem transformar a home numa página exclusiva de baterias.

#### 5. Arquitetura energética

Crie um diagrama leve e acessível, preferencialmente SVG/CSS, mostrando:

`Rede + Solar + BESS + Gerador + EMS → Cargas críticas da operação`

Inclua texto alternativo/descrição equivalente. Não use uma imagem pesada para esse diagrama.

#### 6. Aplicações no agro

Mostre aplicações prioritárias:

- pivôs, bombas e captação;
- silos, secagem e armazenagem;
- câmaras frias;
- leite e ordenha;
- aves e suínos;
- beneficiamento e microrredes rurais.

#### 7. Método de engenharia

Apresente processo em seis etapas:

1. diagnóstico;
2. levantamento de carga e operação;
3. estudo técnico-econômico;
4. projeto e integração;
5. implantação e comissionamento;
6. monitoramento e O&M.

#### 8. Portfólio real

Renderize apenas projetos cadastrados e comprovados. Caso ainda não existam dados, mostre um bloco curto convidando o usuário a conversar com a engenharia e deixe o componente pronto para receber os projetos.

#### 9. Engenharia, segurança e suporte

Explique, sem alegações não verificadas:

- dimensionamento por curva de carga;
- integração elétrica e de controle;
- proteção e monitoramento;
- estratégia operacional;
- implantação e comissionamento;
- manutenção e suporte conforme contrato.

#### 10. IrrigaBox como coadjuvante

Reduza drasticamente seu destaque. Não use hero, seção em tela cheia ou linguagem de produto principal.

Inclua apenas um bloco compacto dentro da parte de tecnologia/engenharia, com sentido semelhante a:

> **IrrigaBox — proteção e organização para sistemas no campo.**  
> Tecnologia complementar aplicada quando o projeto exige proteção, comando e montagem adequada dos equipamentos.

Não prometa monitoramento ou funcionalidades que não estejam comprovadamente disponíveis no produto atual.

#### 11. FAQ

Inclua perguntas reais de decisão:

- O que é BESS e quando faz sentido no agronegócio?
- BESS substitui o gerador?
- Pode funcionar com energia solar e rede?
- Como é calculada a autonomia?
- É possível alimentar apenas as cargas críticas?
- Como são avaliados segurança e vida útil?
- Irrigação solar off-grid precisa de bateria?
- Como começa o diagnóstico?

As respostas devem ser tecnicamente prudentes, deixando claro quando depende de estudo.

#### 12. CTA final

Título:

> **Sua operação precisa de energia previsível.**

CTA: **Solicitar diagnóstico energético**  
CTA secundário: **Falar com a equipe no WhatsApp**

### Página BESS

A página `/bess-agronegocio` deve conter:

- hero específico;
- definição simples de BESS;
- problemas que resolve;
- aplicações por cadeia produtiva;
- arquitetura de integração;
- diferença entre potência em kW/MW e energia em kWh/MWh;
- autonomia e cargas críticas;
- gerenciamento de demanda e continuidade;
- segurança, BMS, EMS, climatização e proteção — sem afirmar marcas ou especificações ainda não definidas;
- processo de estudo técnico-econômico;
- perguntas frequentes;
- CTA para diagnóstico.

Deixe claro que economia, autonomia e retorno dependem da curva de carga, tarifa, operação, geração existente e dimensionamento.

### Irrigação solar off-grid

A página `/irrigacao-solar-off-grid` deve explicar:

- quando o bombeamento direto solar faz sentido;
- reservação de água como forma de autonomia operacional;
- diferenças entre sistema direto, híbrido e sistema com bateria;
- captação em poços, rios, represas e reservatórios;
- importância do dimensionamento hidráulico e elétrico;
- limitações e condições de operação;
- CTA para avaliação técnica.

Não use a afirmação genérica “energia grátis” ou “custo zero”.

### Formulário de diagnóstico

Reestruture o configurador atual para um diagnóstico consultivo. Não prometa orçamento instantâneo de BESS.

Fluxo recomendado:

1. **Operação** — tipo de atividade e município/UF;
2. **Problema** — quedas, diesel, ponta/demanda, expansão, rede fraca, operação off-grid;
3. **Infraestrutura** — solar existente, gerador, rede, média tensão, cargas críticas;
4. **Dimensão inicial** — conta média/faixa, demanda conhecida, horas desejadas ou “não sei”;
5. **Contato** — nome, empresa/fazenda, telefone, e-mail e consentimento LGPD;
6. **Confirmação** — resumo e próximos passos realistas.

O formulário precisa:

- funcionar com teclado e leitores de tela;
- ter mensagens de erro claras;
- preservar os dados ao avançar/voltar;
- não coletar mais dados do que o necessário;
- exigir consentimento explícito para contato;
- ter estado de envio, sucesso e erro;
- usar as rotas/API existentes quando adequado, ajustando schemas e testes;
- gerar mensagem de WhatsApp estruturada como fallback;
- nunca expor chaves ou segredos no cliente.

### Confiança institucional

Na página Sobre e no rodapé, renderize apenas dados configurados e verdadeiros:

- razão social e nome comercial;
- CNPJ;
- endereço/área de atendimento;
- telefone e e-mail;
- engenheiros e registros profissionais;
- fabricantes/parcerias e natureza exata da relação;
- certificações;
- políticas e termos.

Se um campo não estiver preenchido, não mostre placeholder público.

### SEO

Implemente:

- metadata única por rota;
- canonical;
- Open Graph e Twitter Cards;
- `app/robots.ts`;
- `app/sitemap.ts`;
- ícones e manifest quando os assets estiverem disponíveis;
- JSON-LD para `Organization`, `WebSite`, `Service`, `BreadcrumbList` e `FAQPage` somente nas páginas adequadas;
- headings em ordem lógica, com apenas um H1 por página;
- links internos entre soluções, aplicações, projetos e diagnóstico;
- textos alternativos descritivos;
- URLs e conteúdo em português brasileiro;
- nenhuma keyword stuffing.

Sugestões de títulos:

- Home: `Irrigasolar Engenharia | BESS, Energia Solar e Irrigação para o Agro`
- BESS: `BESS para o Agronegócio | Armazenamento de Energia — Irrigasolar`
- Off-grid: `Irrigação Solar Off-grid e Bombeamento Solar | Irrigasolar`
- Engenharia: `Engenharia e Integração Energética para o Agro | Irrigasolar`

### Performance

O site público atual tem LCP muito alto e imagens de até aproximadamente 6,3 MB. Corrija isso estruturalmente.

Metas em Lighthouse móvel, executado em build de produção:

- Performance: **95 ou mais**;
- Acessibilidade: **100** ou o mais próximo possível, nunca abaixo de 95;
- Best Practices: **100** ou no mínimo 95;
- SEO: **100**;
- LCP: abaixo de **2,5 s**;
- CLS: abaixo de **0,1**;
- TBT: abaixo de **200 ms**.

Implemente:

- `next/image` em todas as imagens relevantes;
- `priority` apenas na imagem LCP;
- `sizes` correto;
- dimensões explícitas;
- imagens responsivas e otimizadas;
- remoção de assets remotos atuais;
- carregamento mínimo de fontes;
- animações respeitando `prefers-reduced-motion`;
- componentes client somente quando realmente necessários;
- lazy loading para conteúdo abaixo da dobra;
- evitar bibliotecas grandes para recursos simples;
- nenhuma imagem decorativa multimilionária em bytes.

Crie um script ou documentação curta para converter as fotos futuras para WebP/AVIF em dimensões apropriadas, sem depender de serviço externo.

### Acessibilidade

Atenda WCAG 2.2 AA:

- contraste mínimo adequado;
- foco visível;
- skip link;
- navegação completa por teclado;
- menu mobile acessível, com `aria-expanded` e controle de foco;
- alvos de toque com pelo menos 44 × 44 px;
- landmarks semânticos;
- labels reais em formulários;
- erros associados aos campos;
- accordions acessíveis;
- motion reduzido;
- não depender apenas de cor para comunicar estado.

### Segurança e privacidade

- adicione headers em `next.config.mjs` quando compatíveis: CSP prudente, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e proteção de frames;
- não use `unsafe-inline` na CSP sem necessidade/justificativa;
- valide dados de API no servidor com Zod;
- aplique limites básicos contra abuso nas rotas públicas, quando viável na arquitetura atual;
- não exponha variáveis privadas;
- inclua política de privacidade coerente com os dados realmente coletados;
- não carregue analytics/cookies não essenciais antes do consentimento, caso sejam adicionados.

### Analytics e conversão

Prepare eventos desacoplados, sem inserir IDs fictícios:

- `cta_diagnostico_click`;
- `whatsapp_click`;
- `diagnostico_start`;
- `diagnostico_step_complete`;
- `diagnostico_submit`;
- `project_view`;
- `solution_view`.

Implemente um helper que use `window.dataLayer` somente quando disponível. Não quebre o site se nenhuma ferramenta de analytics estiver configurada.

### Correções obrigatórias no projeto atual

Antes de encerrar:

- corrija todos os erros de lint que atualmente bloqueiam `next build`;
- remova imports/variáveis não utilizados;
- elimine referências a imagens inexistentes;
- corrija CTAs com `href="#"`;
- remova ou substitua qualquer conteúdo fictício;
- preserve funcionalidades válidas das APIs atuais, adaptando-as ao novo fluxo;
- atualize os testes existentes e adicione testes para schemas/formulário/rotas críticas;
- mantenha TypeScript estrito e não use `any` como atalho;
- verifique responsividade em 360, 390, 768, 1024 e 1440 px.

### Critérios de aceite

O trabalho só está concluído quando:

1. a home e as rotas essenciais estiverem implementadas;
2. BESS for a solução protagonista e IrrigaBox estiver claramente como coadjuvante;
3. nenhum dado fictício ou não comprovado estiver visível;
4. não houver imagens externas aleatórias;
5. o formulário de diagnóstico funcionar ponta a ponta;
6. os CTAs tiverem destino válido;
7. `npm test` passar;
8. `npm run typecheck` passar;
9. `npm run build` passar sem erros;
10. a auditoria Lighthouse de produção atingir as metas ou, se houver limitação objetiva, ela for documentada com o resultado medido e a causa;
11. não houver erros relevantes no console;
12. o site estiver acessível por teclado e responsivo;
13. robots, sitemap, metadata, canonical e JSON-LD estiverem válidos;
14. o README incluir instruções para cadastrar projetos, trocar fotografias e preencher credenciais reais.

### Forma de trabalho

1. Inspecione o repositório e preserve integrações úteis.
2. Registre brevemente a arquitetura que será adotada.
3. Implemente as mudanças diretamente nos arquivos.
4. Não pare depois de criar apenas componentes ou uma página estática.
5. Execute testes, typecheck, build e Lighthouse em produção.
6. Corrija os problemas encontrados.
7. Ao final, entregue um resumo contendo:
   - arquivos e rotas criados/alterados;
   - decisões visuais e técnicas;
   - conteúdo real ainda necessário do proprietário;
   - resultados dos testes e do Lighthouse;
   - instruções exatas para inserir as fotos do portfólio;
   - qualquer variável de ambiente necessária.

Faça escolhas razoáveis sem interromper o desenvolvimento por detalhes menores. Pergunte apenas se faltar uma informação que possa causar publicação de dado falso, perda de funcionalidade crítica ou decisão comercial irreversível.

---

## FIM DO PROMPT

