import type { Project } from './site';

/** Textos baseados no acervo fotográfico; sem métricas de desempenho presumidas. */
export const realProjects: Project[] = [
  {
    slug: 'gustavo-marshesan',
    title: 'Gustavo Marshesan — energia e água no campo',
    segment: 'Energia solar rural',
    city: '', state: '',
    challenge: 'Geração solar, reservação de água e áreas de cultivo vistas no contexto da operação rural.',
    solution: 'As vistas aéreas apresentam o conjunto fotovoltaico e sua relação com o reservatório e as áreas agrícolas. A série também reúne registros de acompanhamento em campo, com a equipe usando a farda da Irrigasolar junto aos módulos solares.',
    scope: ['Conjuntos fotovoltaicos em estruturas de solo', 'Reservatório e contexto agrícola da propriedade', 'Acompanhamento em campo documentado pela equipe'],
    cover: '/assets/portfolio/gustavo-marshesan/01.webp',
    gallery: ['/assets/portfolio/gustavo-marshesan/02.webp', '/assets/portfolio/gustavo-marshesan/03.webp', '/assets/portfolio/gustavo-marshesan/04.webp', '/assets/portfolio/gustavo-marshesan/05.webp'],
    galleryCaptions: ['Vista aérea do conjunto solar e da propriedade.', 'Reservatório registrado no acervo do projeto.', 'Farda Irrigasolar durante acompanhamento em campo.', 'Equipe junto aos módulos solares — registro de campo.'],
  },
  {
    slug: 'alfredo-seixas',
    title: 'Alfredo Seixas — energia solar no campo',
    segment: 'Energia solar rural',
    city: '', state: '',
    challenge: 'Geração solar inserida na paisagem rural, com estruturas de solo e infraestrutura elétrica de apoio.',
    solution: 'O registro fotográfico acompanha diferentes momentos da implantação: a montagem das estruturas, a disposição dos módulos fotovoltaicos e os quadros elétricos. As vistas aéreas mostram a relação entre a instalação e a área agrícola ao redor.',
    scope: ['Módulos fotovoltaicos em estruturas de solo', 'Registros de montagem e da instalação dos painéis', 'Quadros elétricos e infraestrutura de apoio'],
    cover: '/assets/portfolio/alfredo-seixas/01.webp',
    gallery: ['/assets/portfolio/alfredo-seixas/02.webp', '/assets/portfolio/alfredo-seixas/03.webp', '/assets/portfolio/alfredo-seixas/04.webp'],
    galleryCaptions: ['Vista aérea da disposição dos módulos solares.', 'Registro da etapa de montagem das estruturas e módulos.', 'Quadros elétricos da instalação.'],
  },
  {
    slug: 'abilio-nascimento',
    title: 'Abílio Nascimento — infraestrutura no campo',
    segment: 'Infraestrutura hídrica e elétrica',
    city: '', state: '',
    challenge: 'Reservação de água, bombeamento e infraestrutura elétrica no contexto de uma propriedade agrícola.',
    solution: 'Os registros de campo apresentam o reservatório, as áreas de cultivo e os equipamentos de bombeamento e alimentação elétrica da propriedade. As fotografias mostram o contexto hídrico e energético acompanhado no projeto Abílio Nascimento.',
    scope: ['Reservatório e áreas agrícolas registrados em campo', 'Equipamentos de bombeamento', 'Infraestrutura elétrica e transformador da propriedade'],
    cover: '/assets/portfolio/abilio-nascimento/01.webp',
    gallery: ['/assets/portfolio/abilio-nascimento/02.webp', '/assets/portfolio/abilio-nascimento/03.webp', '/assets/portfolio/abilio-nascimento/04.webp'],
    galleryCaptions: ['Vista da propriedade e das áreas de cultivo.', 'Transformador da infraestrutura elétrica fotografada.', 'Equipamento de bombeamento da propriedade.'],
  },
];
