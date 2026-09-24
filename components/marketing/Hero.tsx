import { LinkButton } from '@/components/ui/LinkButton';
import { trackEvent } from '@/lib/analytics';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microcopy?: string;
}

/**
 * Hero institucional sem carrossel e sem fotografia — até que a Irrigasolar
 * forneça fotografia real e autorizada da operação (ver README de
 * public/assets/portfolio), o hero usa uma composição tipográfica sóbria em
 * vez de arriscar publicar imagem de banco/IA como se fosse real.
 */
export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta, microcopy }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#FCFBF7 1px, transparent 1px), linear-gradient(90deg, #FCFBF7 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative mx-auto max-w-content px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-36">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-copper-text-inverse">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand/85 md:text-xl">{subtitle}</p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primaryCta && (
                <LinkButton
                  href={primaryCta.href}
                  variant="primary"
                  className="bg-copper text-forest hover:bg-copper/90 sm:w-auto w-full"
                  onClick={() => trackEvent('cta_diagnostico_click', { origem: 'hero' })}
                >
                  {primaryCta.label}
                </LinkButton>
              )}
              {secondaryCta && (
                <LinkButton
                  href={secondaryCta.href}
                  variant="secondary"
                  className="border-paper/40 text-paper hover:bg-paper hover:text-forest sm:w-auto w-full"
                >
                  {secondaryCta.label}
                </LinkButton>
              )}
            </div>
          )}

          {microcopy && <p className="mt-5 text-sm text-sand/60">{microcopy}</p>}
        </div>
      </div>
    </section>
  );
}
