import type { Project } from './site';

/** Textos baseados no acervo fotográfico; sem métricas de desempenho presumidas. */
export const realProjects: Project[] = [
  {
    slug: 'alfredo-seixas',
    title: 'Alfredo Seixas — energia solar no campo',
    segment: 'Energia solar rural',
    city: 'Aracaju', state: 'SE',
    challenge: 'Geração solar inserida na paisagem rural, com estruturas de solo e infraestrutura elétrica de apoio.',
    solution: 'O registro fotográfico acompanha diferentes momentos da implantação: a montagem das estruturas, a disposição dos módulos fotovoltaicos e os quadros elétricos. As vistas aéreas mostram a relação entre a instalação e a área agrícola ao redor.',
    scope: ['Módulos fotovoltaicos em estruturas de solo', 'Registros de montagem e da instalação dos painéis', 'Quadros elétricos e infraestrutura de apoio'],
    cover: '/assets/portfolio/alfredo-seixas/01.webp',
    gallery: ['/assets/portfolio/alfredo-seixas/02.webp', '/assets/portfolio/alfredo-seixas/03.webp', '/assets/portfolio/alfredo-seixas/04.webp'],
  },
  {
    slug: 'aline-ac-almeida',
    title: 'A. C. de Almeida — solar e infraestrutura hídrica',
    segment: 'Energia solar rural',
    city: '', state: '',
    challenge: 'Painéis solares, reservatório e infraestrutura de campo reunidos em uma mesma propriedade rural.',
    solution: 'As fotografias mostram o conjunto fotovoltaico instalado em solo próximo ao reservatório, além dos equipamentos de apoio e do acompanhamento em campo. O conjunto de imagens apresenta a instalação no contexto real da propriedade.',
    scope: ['Conjunto fotovoltaico em estrutura de solo', 'Infraestrutura elétrica de apoio', 'Registro da implantação junto ao reservatório'],
    cover: '/assets/portfolio/aline-ac-almeida/01.webp',
    gallery: ['/assets/portfolio/aline-ac-almeida/02.webp', '/assets/portfolio/aline-ac-almeida/03.webp', '/assets/portfolio/aline-ac-almeida/04.webp'],
  },
  {
    slug: 'abel-reboucas',
    title: 'Abel Rebouças — geração solar na propriedade',
    segment: 'Energia solar rural',
    city: '', state: '',
    challenge: 'Uma instalação solar de solo integrada ao relevo e à estrutura da propriedade.',
    solution: 'O acervo apresenta os módulos fotovoltaicos sobre suportes metálicos, o ambiente agrícola ao redor e os quadros da instalação. As imagens aproximam o visitante dos detalhes de campo que compõem um projeto de energia rural.',
    scope: ['Módulos fotovoltaicos e suportes metálicos', 'Quadros elétricos da instalação', 'Registro de implantação em ambiente rural'],
    cover: '/assets/portfolio/abel-reboucas/01.webp',
    gallery: ['/assets/portfolio/abel-reboucas/02.webp', '/assets/portfolio/abel-reboucas/03.webp'],
  },
  {
    slug: 'fazenda-alagoa-de-cabaca',
    title: 'Fazenda Alagoa de Cabaca — energia solar rural',
    segment: 'Energia solar rural',
    city: '', state: '',
    challenge: 'Geração fotovoltaica em solo, próxima à rotina e à paisagem da propriedade rural.',
    solution: 'O registro mostra módulos solares sobre estrutura elevada em uma área aberta da fazenda. A fotografia destaca o conjunto instalado e sua integração ao ambiente rural.',
    scope: ['Módulos solares em estrutura de solo', 'Registro fotográfico da instalação na propriedade'],
    cover: '/assets/portfolio/fazenda-alagoa-de-cabaca/01.webp',
  },
];
