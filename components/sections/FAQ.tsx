'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Kicker } from '@/components/brand/Kicker';
import { faqItems } from '@/lib/faq';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-24 md:py-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <Kicker>RESPOSTAS QUE VOCÊ PROCURA</Kicker>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep mt-4 leading-[1.05] tracking-tight">
              Perguntas frequentes
            </h2>
          </div>

          <ul className="border-t border-rule">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={item.q} className="border-b border-rule">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-6 md:py-7 flex gap-6 items-start justify-between group focus:outline-none focus-visible:bg-cream/40"
                  >
                    <h3 className="font-headline text-xl md:text-2xl font-semibold text-ink-deep leading-snug pr-4 group-hover:text-terra-deep transition-colors">
                      {item.q}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="shrink-0 text-ocher-dark text-3xl leading-none mt-1"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-body text-ink text-[16px] md:text-[17px] leading-relaxed pb-6 md:pb-7 pr-10 max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
