import Image from 'next/image';
import { LinkButton } from '@/components/ui/LinkButton';
import { trackEvent } from '@/lib/analytics';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microcopy?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  microcopy,
  imageSrc,
  imageAlt = '',
}: HeroProps) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-forest text-paper md:min-h-[700px]">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,25,17,0.98)_0%,rgba(8,25,17,0.92)_38%,rgba(8,25,17,0.50)_68%,rgba(8,25,17,0.16)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-forest/15" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#FCFBF7 1px, transparent 1px), linear-gradient(90deg, #FCFBF7 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative mx-auto flex min-h-[620px] max-w-content items-center px-5 py-24 md:min-h-[700px] md:px-8 lg:px-12">
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
