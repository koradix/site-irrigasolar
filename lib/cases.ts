export interface CaseStudy {
  id: string;
  image: string;
  tag: 'PIVÔ' | 'POÇO' | 'FAZENDA';
  economia: string;
  tecnica: string;
  citacao: string;
  cliente: string;
  cidade: string;
  data: string;
}

export const cases: CaseStudy[] = [
  {
    id: 'paulo-ibitiba',
    image: '/case-1.jpg',
    tag: 'PIVÔ',
    economia: 'R$ 84.000/ano economizados',
    tecnica: '64 kWp · 105 placas · 5 inversores WEG',
    citacao:
      'Antes eu olhava o céu pra saber se ia chover. Agora olho o app.',
    cliente: 'Paulo R.',
    cidade: 'Ibitiba/BA',
    data: '05/2026',
  },
  {
    id: 'marcela-uberlandia',
    image: '/case-2.jpg',
    tag: 'POÇO',
    economia: 'R$ 38.000/ano economizados',
    tecnica: '22 kWp · 36 placas · 2 inversores WEG',
    citacao:
      'Meu poço artesiano roda direto, sem conta de luz e sem dor de cabeça.',
    cliente: 'Marcela A.',
    cidade: 'Uberlândia/MG',
    data: '03/2026',
  },
  {
    id: 'joao-rio-verde',
    image: '/case-3.jpg',
    tag: 'FAZENDA',
    economia: 'R$ 152.000/ano economizados',
    tecnica: '120 kWp · 196 placas · 8 inversores WEG',
    citacao:
      'A fazenda inteira virou autossuficiente. Foi a melhor decisão que tomei.',
    cliente: 'João P.',
    cidade: 'Rio Verde/GO',
    data: '02/2026',
  },
];
