export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <span className="label-editorial text-ocher-dark">Irrigasolar — Engenharia</span>
        <h1 className="font-headline text-5xl md:text-6xl font-semibold text-ink-deep leading-tight">
          Bombeamento Solar e Projetos de Irrigação para o Campo
        </h1>
        <p className="text-ink-soft text-lg">
          Água com energia do sol. Projetos sob medida para a sua propriedade.
        </p>
        <div className="h-px w-24 mx-auto bg-rule" />
        <p className="font-label text-ink-soft text-xs">Bootstrap Next.js 14 — em construção</p>
      </div>
    </main>
  );
}
