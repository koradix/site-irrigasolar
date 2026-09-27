# Irrigasolar — revisão visual e comercial

Atualizado em 26/09/2026. Avaliação do projeto local; não significa publicação em produção nem revisão realizada pelo Open Design.

## Atualização: publicação autorizada em 26/09/2026

Após a avaliação abaixo, o proprietário autorizou publicar. Versão enviada diretamente pela CLI ao projeto Vercel site-irrigasolar, compilada com ambiente de produção, inicialmente sem promover o domínio. Página inicial e formulário conferidos antes da promoção. A versão foi promovida e confirmada em https://irrigasolar.com.br.

- Deployment atual: dpl_4LNm8Hy8UKc4pD5bCLpYwY5NvWjr — https://site-irrigasolar-9gonjcao7-koradixs-projects.vercel.app.
- Versão anterior preservada para rollback: dpl_AP4EvQ27ohZmy2kYsF386F97vQdV — https://site-irrigasolar-bq3uwppem-koradixs-projects.vercel.app.
- Typecheck, 32 testes e build remoto aprovados. Após promover, retornos HTTP 200 confirmados para início, projetos, Gustavo, Sobre, diagnóstico e imagem de equipe. Conteúdo novo confirmado no domínio.
- .vercelignore exclui originais, curadoria, referências internas, documentação e arquivos de ambiente do envio. Variáveis de produção vêm da configuração Vercel existente.
- Publicação direta do workspace; nenhum commit/push realizado. Sincronizar as alterações de código e imagens aprovadas no Git antes de um futuro deploy automático, para não restaurar conteúdo antigo inadvertidamente.
- Não houve migração de banco nem envio de lead fictício. Entrega comercial de e-mail/CRM não foi validada de ponta a ponta. Não foi realizada observação de métricas por 15 minutos.
- Se houver falha crítica de navegação, imagens ou formulário introduzida por esta versão, restaurar a versão anterior pelo rollback da Vercel. O registro abaixo descreve a revisão anterior à autorização de publicar.

## Objetivo principal

Gerar solicitações qualificadas de estudo ou orçamento para BESS e irrigação solar off-grid. O site deve levar o produtor a entender se a solução atende sua necessidade, confiar na capacidade da equipe e fornecer informações suficientes para uma conversa técnica comercial.

O comprador não é definido por idade ou aparência. Necessidade operacional, escala, infraestrutura, capacidade de investimento, participação na decisão e prazo orientam a qualificação. Não foi definido um ticket mínimo pelo proprietário.

## Parecer

A direção “agro chique” merece ser preservada: Source Serif 4 e Manrope, verde-floresta, areia, papel e detalhes em cobre. A combinação oferece sobriedade sem parecer um catálogo industrial genérico. A prioridade agora é credibilidade e clareza comercial, não trocar fontes ou adicionar efeitos.

A sensação de excesso técnico procede: equipamentos e diagramas explicam a oferta, mas sozinhos não demonstram quem atende o produtor. Fotografias reais da equipe e projetos documentados ajudam a equilibrar isso. O mascote funciona melhor como apoio didático pontual, não como protagonista do argumento de alto ticket.

Não atribuo uma nota geral de conversão sem dados de visitas, envios recebidos e qualidade comercial dos contatos. Também não foi executada uma auditoria Lighthouse nesta rodada.

## Implementado localmente

- Vitrine com Gustavo Marshesan, Alfredo Seixas e Abílio Nascimento. Abel permanece no acervo, fora da seleção pública atual.
- Gustavo em destaque, com vistas amplas, água, instalação e acompanhamento em campo. Legendas distinguem o que a imagem documenta, sem inventar potência, economia, autonomia ou município.
- Imagem real de equipe uniformizada nas seções de engenharia e Sobre. Variante com limpeza editorial de lixo solto; original preservado e usado no registro do projeto. A edição generativa é documentada e não deve servir como evidência técnica pixel a pixel.
- Retrato do responsável técnico em composição editorial ampla, em vez de um cartão isolado em grade vazia. Credenciais vazias não são exibidas.
- Projetos e engenharia antecipados na página inicial, antes do aprofundamento em arquitetura de energia.
- CTA principal da página inicial e encerramento: “Solicitar estudo para minha operação”. Cabeçalho: “Solicitar estudo”. Mantida a rota existente /diagnostico.
- WhatsApp do encerramento com menor destaque visual, como alternativa ao formulário.
- Corrigidos conflitos de classes nos botões sobre fundo verde, com variantes explícitas cobre e contorno claro. WhatsApp flutuante ocultado no formulário para evitar sobreposição com controles.
- Corrigida a promessa imprecisa de “seis perguntas”: são cinco etapas de coleta e uma de revisão. Explicitado que o envio não produz orçamento automático nem substitui estudo técnico.
- Direção visual, regras de autenticidade e briefing compartilhável salvos em referencias/.

## Fotografias ainda necessárias

Produzir dois retratos ambientais de produtores reais, com autorização de uso: um por volta de 45 anos e outro por volta de 60, conforme o público desejado. Isso é direção de casting, não comprovação de cliente nem critério de qualificação comercial.

Fotografar expressão espontânea e acolhedora, sem pose publicitária exagerada, em propriedade real. Uma foto horizontal com espaço lateral para texto e uma vertical para celular. Incluir equipe com uniforme oficial, preferencialmente em conversa com o produtor; não apenas equipamento ao fundo. Preservar logotipo, equipamentos de proteção e condições reais de trabalho. Não encenar procedimento inseguro.

Inserção proposta: produtor + engenheiro perto da apresentação do atendimento ou antes do CTA final. Evitar criar mais uma seção longa apenas para acomodar uma fotografia. Não apresentar imagem gerada de fazendeiro como cliente, depoimento ou prova de execução.

## Próximas melhorias propostas, não implementadas

1. Incluir no formulário papel na decisão e prazo desejado, validando campos, armazenamento e notificações de ponta a ponta. Evitar acrescentar perguntas sem uso real pela equipe comercial.
2. Adaptar perguntas ao contexto: uma operação off-grid pode ter gasto com diesel e não possuir conta de energia representativa. “Não sei” deve continuar possível.
3. Confirmar dados dos projetos: localização, escopo efetivamente executado, potência, data e autorização para divulgação. Só então acrescentar fichas e resultados.
4. Medir conversão real: visitas → início do formulário → envio aceito → contato comercial → oportunidade qualificada. Eventos no código não comprovam que uma ferramenta esteja recebendo dados.
5. Validar entrega real do formulário e atendimento com um envio de teste identificado e autorizado. Não foi enviado um lead fictício para produção.

## Publicação e Open Design

Vercel vinculada ao projeto site-irrigasolar, com domínio de produção irrigasolar.com.br. Nenhum push ou deploy foi feito nesta revisão. Antes de publicar, revisar o diff, conferir arquivos internos e confirmar o destino e o mecanismo de deploy.

O plugin Open Design está disponível como instrução, mas não foi encontrado o aplicativo/conector necessário. Portanto, nenhuma avaliação ou geração foi executada por ele. Sua instrução exige autorização antes de abrir a página oficial de download. Essa pendência não foi contornada por instalação automática.

## Verificação

Typecheck, 32 testes e build passaram na primeira rodada. O navegador confirmou imagens carregadas e ausência de rolagem horizontal em oito combinações de página/tela: início (390 e 1440 px), diagnóstico (390 px), projeto Gustavo (390 px), portfólio (1440 px), Sobre (390 e 1440 px) e Engenharia (390 px). Capturas permitiram identificar e corrigir conflitos nos botões. A verificação não equivale a teste completo de acessibilidade ou entrega do formulário. Fotografias conceituais remanescentes não são evidência do portfólio.

Após as últimas correções, typecheck e os 32 testes passaram novamente; o build passou com cache novo, após erro EINVAL na leitura do cache anterior. A pasta gerada anterior foi preservada em .next-backup-design-20260926 e ignorada pelo Git. A captura final do início no celular confirmou o botão cobre e o contorno claro. A repetição integral das oito capturas não concluiu por travamento da automação do navegador; portanto a rodada anterior não é apresentada como validação integral do último estado. Antes de publicar, repetir essa conferência e validar o envio real autorizado do formulário.
