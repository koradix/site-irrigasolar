# Irrigasolar — orientação de trabalho

## Direção atual

- Leia `referencias/direcao-visual.md` e `referencias/projetos-confirmados.md` antes de mudar páginas institucionais.
- Fonte de verdade visual: `app/globals.css`, `tailwind.config.ts` e `app/layout.tsx`. Source Serif 4 + Manrope; verde-floresta, areia, papel e cobre. Documentos antigos não substituem esses tokens.
- Posicionamento: engenharia para agronegócio, BESS e irrigação solar off-grid. IrrigaBox é complementar.
- Use fotos reais da empresa para pessoas e portfólio; fotos conceituais não comprovam execução.
- Não invente potência, autonomia, economia, município, depoimentos ou certificações.
- Preserve originais e rastreie cada derivado. Limpeza estética pode remover lixo solto, mas não condições técnicas, equipamentos ou detalhes de segurança. Confira logotipos e pessoas após edição generativa.
- Não comite materiais internos de curadoria, documentos de clientes, credenciais ou segredos. O repositório é público. Respeite `.gitignore`.
- Preserve alterações existentes. Não publique automaticamente em produção por concluir uma revisão visual.

## Verificação

- Para alterações de código, execute `npm run typecheck`, os testes relevantes e `npm run build`.
- Para layout/fotos, confira desktop e celular no navegador: imagens carregadas, sem rolagem horizontal, texto legível e pessoas bem enquadradas.
- Registre no relatório o que foi implementado, o que foi apenas proposto e o que depende de dados do cliente.
- Confirme o destino e o mecanismo de deploy antes de uma publicação. Nunca force push.
