/**
 * Injeta um bloco JSON-LD. `data` deve ser um objeto serializável simples
 * (schema.org) — nunca HTML/strings vindas de input do usuário sem
 * sanitização, já que o valor é serializado com JSON.stringify (que escapa
 * aspas, mas não `</script>`; por isso substituímos `<` explicitamente).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
