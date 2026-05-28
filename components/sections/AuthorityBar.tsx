const MESSAGE =
  '// PARCEIRO INTEGRADOR WEG · CERTIFICAÇÃO PRO · ENGENHARIA CREA · IRRIGABOX® · +250 BOMBAS INSTALADAS NA BAHIA/MG/GO //';

export function AuthorityBar() {
  return (
    <div className="bg-ink-deep border-y border-ocher py-3 overflow-hidden">
      <div className="marquee-track flex md:justify-center whitespace-nowrap md:whitespace-normal">
        <span className="font-label italic text-cream text-[13px] tracking-[0.1em] px-8">
          {MESSAGE}
        </span>
        <span
          aria-hidden
          className="font-label italic text-cream text-[13px] tracking-[0.1em] px-8 md:hidden"
        >
          {MESSAGE}
        </span>
      </div>
    </div>
  );
}
