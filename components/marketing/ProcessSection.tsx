import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { SerifHeading } from '@/components/brand/SerifHeading';

const STEPS = [
  { n: '01', title: 'Diagnóstico', body: 'Levantamento inicial da operação, dos problemas de energia e da infraestrutura existente.' },
  { n: '02', title: 'Levantamento de carga e operação', body: 'Mapeamento das cargas críticas, potência de partida e rotina real de uso.' },
  { n: '03', title: 'Estudo técnico-econômico', body: 'Simulação de cenários de potência e energia, estratégia operacional e viabilidade.' },
  { n: '04', title: 'Projeto e integração', body: 'Engenharia elétrica, proteção e integração entre rede, solar, BESS e gerador.' },
  { n: '05', title: 'Implantação e comissionamento', body: 'Fornecimento, instalação e testes de comissionamento antes da entrada em operação.' },
  { n: '06', title: 'Monitoramento e O&M', body: 'Acompanhamento e manutenção conforme o contrato de suporte definido.' },
];

export function ProcessSection() {
  return (
    <Section tone="forest">
      <div className="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Eyebrow inverted>Método de engenharia</Eyebrow>
          <SerifHeading as="h2" size="lg" className="mt-4 text-paper">
            Seis etapas, do diagnóstico ao suporte contínuo.
          </SerifHeading>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-sm border border-paper/15 p-6">
              <span className="font-display text-3xl font-semibold text-copper">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
