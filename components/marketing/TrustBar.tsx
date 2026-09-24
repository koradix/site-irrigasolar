import { credentials } from '@/content/site';

/**
 * Faixa de credenciais verificáveis. Só renderiza quando houver credenciais
 * cadastradas em content/site.ts — nenhum placeholder é exibido.
 */
export function TrustBar() {
  if (credentials.length === 0) return null;

  return (
    <div className="border-y border-rule bg-sand">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 md:px-8 lg:px-12">
        {credentials.map((c) => (
          <span key={c.label} className="text-sm font-semibold uppercase tracking-wide text-forest/80">
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
