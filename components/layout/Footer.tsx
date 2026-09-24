import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { company, socialLinks, primaryNav } from '@/content/site';
import { whatsappLinkWith } from '@/lib/contato';

export function Footer() {
  const wa = whatsappLinkWith('Olá! Vim pelo site da Irrigasolar e gostaria de falar com a engenharia.');
  const hasAddress = Boolean(company.address);
  const hasInstitutional = Boolean(
    company.legalName || company.cnpj || hasAddress || company.email || company.phone,
  );

  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Logo inverted />
            <p className="text-sand/70 text-sm leading-relaxed max-w-xs">
              Engenharia de energia para operações críticas do agronegócio: armazenamento em
              baterias, solar e irrigação off-grid.
            </p>
            {company.regionsServed.length > 0 && (
              <p className="text-sand/50 text-xs uppercase tracking-wider">
                Atendimento: {company.regionsServed.join(', ')}
              </p>
            )}
          </div>

          <nav aria-label="Mapa do site" className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-text-inverse">
              Navegação
            </p>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sand/80 text-sm hover:text-paper transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/diagnostico" className="text-sand/80 text-sm hover:text-paper transition-colors">
                  Diagnóstico
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-text-inverse">
              Institucional
            </p>
            <ul className="space-y-2.5 text-sm">
              {hasInstitutional ? (
                <>
                  {company.legalName && <li className="text-sand/80">{company.legalName}</li>}
                  {company.cnpj && <li className="text-sand/80">CNPJ {company.cnpj}</li>}
                  {hasAddress && company.address && (
                    <li className="text-sand/80">
                      {company.address.street}
                      {company.address.district ? `, ${company.address.district}` : ''} —{' '}
                      {company.address.city}/{company.address.state}
                    </li>
                  )}
                  {company.email && (
                    <li>
                      <a href={`mailto:${company.email}`} className="text-sand/80 hover:text-paper">
                        {company.email}
                      </a>
                    </li>
                  )}
                  {company.phone && <li className="text-sand/80">{company.phone}</li>}
                </>
              ) : (
                <li className="text-sand/60 leading-relaxed">
                  Dados institucionais completos em publicação — fale com a engenharia pelo
                  WhatsApp.
                </li>
              )}
              <li>
                <Link href="/sobre" className="text-sand/80 hover:text-paper underline underline-offset-4">
                  Conheça a Sobre
                </Link>
              </li>
              {socialLinks.length > 0 && (
                <li className="flex gap-3 pt-1">
                  {socialLinks.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sand/80 hover:text-paper">
                      {s.label}
                    </a>
                  ))}
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-text-inverse">
              Fale com a engenharia
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-semibold text-forest hover:brightness-95 transition-[filter]"
            >
              Conversar no WhatsApp
            </a>
            <ul className="space-y-2 pt-2 text-sm">
              <li>
                <Link href="/privacidade" className="text-sand/70 hover:text-paper">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sand/70 hover:text-paper">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="/loja" className="text-sand/50 hover:text-sand text-xs">
                  Configurador de kit solar (loja)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-content px-5 py-5 md:px-8 lg:px-12">
          <p className="text-[11px] tracking-wide text-sand/40 leading-relaxed">
            © {new Date().getFullYear()} {company.tradeName}. Todos os direitos reservados.
            Resultados de continuidade, autonomia e economia dependem de estudo técnico da
            operação — nenhum valor é garantido sem dimensionamento.
          </p>
        </div>
      </div>
    </footer>
  );
}
