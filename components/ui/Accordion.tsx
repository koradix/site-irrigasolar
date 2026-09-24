export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accordion acessível baseado em <details>/<summary> nativos — funciona sem
 * JavaScript, com teclado, leitor de tela e sem custo de bundle.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-rule border-t border-b border-rule">
      {items.map((item) => (
        <details key={item.question} className="group py-5 md:py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 marker:content-none">
            <span className="font-display text-lg md:text-xl font-semibold text-forest leading-snug">
              {item.question}
            </span>
            <span
              aria-hidden
              className="mt-1 shrink-0 text-2xl leading-none text-copper transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-graphite/80">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
