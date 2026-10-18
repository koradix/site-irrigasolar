'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { primaryNav } from '@/content/site';
import { trackEvent } from '@/lib/analytics';
import { whatsappLinkWith } from '@/lib/contato';
import { cn } from '@/lib/cn';

const CTA_WHATSAPP = whatsappLinkWith('Olá! Vim pelo site da Irrigasolar e quero solicitar um estudo para minha operação.');

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Home: cabeçalho flutua transparente sobre o hero (mais premium) e vira
  // sólido assim que o visitante rola a página — demais rotas não têm hero
  // de imagem cheia no topo, então mantêm o cabeçalho sólido sempre.
  const isHome = pathname === '/';
  const overHero = isHome && !scrolled;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        'z-50 transition-colors duration-300',
        overHero
          ? 'absolute inset-x-0 top-0 bg-gradient-to-b from-forest/55 via-forest/15 to-transparent'
          : 'sticky top-0 bg-paper/95 backdrop-blur border-b border-rule',
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3 md:px-8 lg:px-12">
        <Logo priority />

        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-[14px] font-medium transition-colors',
                overHero ? 'text-paper/90 hover:text-paper' : 'text-graphite/80 hover:text-forest',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_diagnostico_click', { origem: 'header' })}
            className="inline-flex items-center justify-center rounded-sm bg-forest px-5 py-2.5 text-[14px] font-semibold text-paper hover:bg-forest-light transition-colors min-h-[44px]"
          >
            Falar com a engenharia
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm border',
            overHero ? 'border-paper/50 text-paper' : 'border-rule text-forest',
          )}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={menuRef}
        className={cn(
          'lg:hidden overflow-hidden transition-[max-height] duration-300 bg-paper',
          open ? 'max-h-[520px]' : 'max-h-0',
        )}
      >
        <nav aria-label="Navegação mobile" className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-[44px] flex items-center text-[16px] font-medium text-graphite border-b border-rule/70"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_diagnostico_click', { origem: 'header_mobile' })}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-sm bg-forest px-5 py-3 text-[15px] font-semibold text-paper"
          >
            Falar com a engenharia
          </a>
        </nav>
      </div>
    </header>
  );
}
