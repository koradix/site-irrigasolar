/**
 * Fonte central de conteúdo do site Irrigasolar Engenharia.
 *
 * Regra do projeto: nenhum dado exibido aqui pode ser inventado. Campos sem
 * comprovação ficam `undefined` (ou array vazio) e os componentes que
 * consomem este arquivo devem tratar a ausência ocultando o bloco — nunca
 * renderizando texto de exemplo como se fosse real.
 *
 * Para publicar uma informação nova (CNPJ, endereço, certificação, projeto,
 * depoimento, membro de equipe...), edite os campos marcados com
 * "TODO: preencher somente com informação comprovada" e forneça o documento
 * comprobatório correspondente antes do deploy.
 */

// ============================================================
// Tipos
// ============================================================

export interface Address {
  street: string;
  district?: string;
  city: string;
  state: string;
  zip?: string;
}

export interface CompanyInfo {
  tradeName: string;
  /** TODO: preencher somente com informação comprovada (razão social exata do contrato social) */
  legalName?: string;
  /** TODO: preencher somente com informação comprovada (CNPJ ativo na Receita Federal) */
  cnpj?: string;
  /** TODO: preencher somente com informação comprovada */
  address?: Address;
  /** Áreas/regiões de atendimento — apenas as que a empresa efetivamente atende hoje */
  regionsServed: string[];
  whatsappNumber: string;
  /** TODO: preencher somente com informação comprovada (e-mail institucional monitorado) */
  email?: string;
  /** TODO: preencher somente com informação comprovada (telefone fixo/comercial) */
  phone?: string;
  /** Ano de fundação — TODO: preencher somente com informação comprovada */
  foundedYear?: number;
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'youtube' | 'facebook';
  label: string;
  url: string;
}

export interface Credential {
  label: string;
  /** Órgão emissor ou responsável pela verificação */
  issuer?: string;
  /** Nota curta de contexto, ex.: número de registro, quando público */
  note?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Ex.: "CREA-BA nº ..." — TODO: preencher somente com informação comprovada */
  registration?: string;
  photo?: string;
}

export interface Solution {
  slug: string;
  name: string;
  /** Frase curta usada em cards/hero */
  tagline: string;
  /** Problema de negócio que a solução resolve */
  problem: string;
  /** Para quem é indicada */
  forWho: string;
  /** Próximo passo recomendado */
  nextStep: string;
  href: string;
  /** Bloco só decorativo/semântico — não usar ícones de terceiros pesados */
  icon: 'battery' | 'sun' | 'droplet';
  featured?: boolean;
}

export interface Application {
  slug: string;
  name: string;
  description: string;
  href: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface Project {
  slug: string;
  title: string;
  segment: string;
  city: string;
  state: string;
  challenge: string;
  solution: string;
  /** Escopo técnico resumido — apenas itens efetivamente entregues */
  scope: string[];
  /** Resultado comprovado — omitir se não houver medição real */
  result?: string;
  testimonial?: ProjectTestimonial;
  cover?: string;
  gallery?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  pages: Array<'home' | 'bess' | 'offgrid' | 'diagnostico'>;
}

export interface NavItem {
  label: string;
  href: string;
}

// ============================================================
// Dados institucionais
// ============================================================

export const company: CompanyInfo = {
  tradeName: 'Irrigasolar Engenharia',
  // legalName, cnpj, address, email, phone e foundedYear seguem indefinidos
  // até que a Irrigasolar forneça a documentação comprobatória.
  regionsServed: ['Bahia'],
  whatsappNumber: '5575999590288',
};

export const socialLinks: SocialLink[] = [
  // TODO: preencher somente com informação comprovada (perfis oficiais ativos)
];

/**
 * Credenciais verificáveis exibidas na faixa de autoridade da home e na
 * página Sobre. Mantenha vazio até haver documento comprobatório — a seção
 * que consome esta lista deve ser omitida por completo quando o array
 * estiver vazio.
 */
export const credentials: Credential[] = [];

/** TODO: preencher somente com informação comprovada (nome, cargo e registro profissional real) */
export const team: TeamMember[] = [];

// ============================================================
// Soluções
// ============================================================

export const solutions: Solution[] = [
  {
    slug: 'bess-agronegocio',
    name: 'BESS para o agronegócio',
    tagline: 'Armazenamento em baterias para operações que não podem parar.',
    problem:
      'Quedas de energia, picos de demanda e dependência de diesel interrompem operações críticas e geram perdas difíceis de recuperar.',
    forWho:
      'Operações com cargas críticas: irrigação de alto valor, armazenagem, cadeia fria, granjas e beneficiamento.',
    nextStep: 'Solicitar diagnóstico de continuidade energética.',
    href: '/bess-agronegocio',
    icon: 'battery',
    featured: true,
  },
  {
    slug: 'irrigacao-solar-off-grid',
    name: 'Irrigação solar off-grid',
    tagline: 'Bombeamento solar para captação sem depender da rede elétrica.',
    problem:
      'Propriedades distantes da rede ou com rede fraca têm dificuldade para operar bombeamento de forma previsível.',
    forWho: 'Poços, rios, represas e reservatórios em propriedades sem rede confiável.',
    nextStep: 'Solicitar avaliação técnica do ponto de captação.',
    href: '/irrigacao-solar-off-grid',
    icon: 'sun',
  },
  {
    slug: 'projetos-irrigacao-bombeamento',
    name: 'Projetos de irrigação e bombeamento',
    tagline: 'Engenharia completa, da captação à entrega de água na operação.',
    problem:
      'Dimensionamento incorreto de bombeamento e irrigação gera desperdício de energia, água e investimento.',
    forWho: 'Produtores que precisam de projeto técnico dimensionado para a operação real.',
    nextStep: 'Solicitar diagnóstico técnico da propriedade.',
    href: '/engenharia',
    icon: 'droplet',
  },
];

// ============================================================
// Aplicações no agro
// ============================================================

export const applications: Application[] = [
  {
    slug: 'irrigacao',
    name: 'Pivôs, bombas e captação',
    description:
      'Continuidade de energia para irrigação de alto valor e cargas de partida elevada.',
    href: '/aplicacoes/irrigacao',
  },
  {
    slug: 'armazenagem-e-silos',
    name: 'Silos, secagem e armazenagem',
    description: 'Proteção de ventilação, secagem e movimentação de grãos contra paradas de energia.',
    href: '/aplicacoes/armazenagem-e-silos',
  },
  {
    slug: 'cadeia-fria',
    name: 'Câmaras frias',
    description: 'Backup de cargas críticas para preservar temperatura e evitar perda de produto.',
    href: '/aplicacoes/cadeia-fria',
  },
  {
    slug: 'leite-aves-suinos',
    name: 'Leite, aves e suínos',
    description: 'Continuidade para ordenha, resfriamento, ventilação e climatização de granjas.',
    href: '/aplicacoes/leite-aves-suinos',
  },
];

// ============================================================
// Projetos / portfólio
// ============================================================

/**
 * Nenhum projeto real está cadastrado ainda. A página /projetos e os blocos
 * de portfólio na home devem exibir o estado institucional enxuto (sem
 * inventar cases) enquanto este array estiver vazio.
 */
export const projects: Project[] = [];

// ============================================================
// FAQ
// ============================================================

export const faqItems: FaqItem[] = [
  {
    question: 'O que é BESS e quando faz sentido no agronegócio?',
    answer:
      'BESS (Battery Energy Storage System) é um sistema de armazenamento de energia em baterias, integrado a rede, solar e/ou gerador. Faz sentido quando a interrupção de energia tem custo operacional relevante — irrigação em janela crítica, refrigeração, ventilação de granjas ou secagem de grãos, por exemplo. A viabilidade depende de estudo da curva de carga e do perfil tarifário da propriedade.',
    pages: ['home', 'bess'],
  },
  {
    question: 'BESS substitui o gerador?',
    answer:
      'Depende do projeto. Em muitos casos o BESS assume as cargas críticas nos primeiros minutos de uma queda e o gerador entra como reforço para autonomia mais longa — os dois podem operar de forma integrada. Não recomendamos substituir gerador por bateria sem um estudo técnico-econômico específico.',
    pages: ['home', 'bess'],
  },
  {
    question: 'Pode funcionar com energia solar e rede ao mesmo tempo?',
    answer:
      'Sim. A arquitetura típica integra rede, geração solar existente, BESS e, quando houver, gerador — coordenados por um sistema de gestão de energia (EMS) que decide de onde vem a energia em cada momento.',
    pages: ['home', 'bess'],
  },
  {
    question: 'Como é calculada a autonomia do sistema?',
    answer:
      'A autonomia (horas de operação das cargas críticas) é resultado do levantamento de carga da propriedade — quais equipamentos precisam continuar operando, por quanto tempo e com qual potência de partida. Não indicamos horas de autonomia sem esse levantamento.',
    pages: ['home', 'bess'],
  },
  {
    question: 'É possível alimentar apenas as cargas críticas, não a propriedade inteira?',
    answer:
      'Sim, e é a abordagem mais comum: o projeto isola as cargas críticas (bombas, resfriadores, ventilação) em um quadro dedicado, dimensionando o BESS para essas cargas em vez de toda a instalação — o que reduz custo e complexidade.',
    pages: ['home', 'bess'],
  },
  {
    question: 'Como são avaliados segurança e vida útil das baterias?',
    answer:
      'Segurança e vida útil dependem da química da bateria, do sistema de gerenciamento (BMS), da climatização do ambiente de instalação e das condições de operação — esses parâmetros são definidos caso a caso no projeto técnico, conforme o equipamento efetivamente especificado.',
    pages: ['home', 'bess'],
  },
  {
    question: 'Irrigação solar off-grid precisa de bateria?',
    answer:
      'Não necessariamente. O bombeamento solar direto opera sem bateria, aproveitando a energia do sol para bombear água para um reservatório — a própria reservação de água já funciona como forma de autonomia. Bateria entra quando a operação exige bombeamento fora do horário solar.',
    pages: ['home', 'offgrid'],
  },
  {
    question: 'Como começa o diagnóstico?',
    answer:
      'Pelo formulário de diagnóstico ou pelo WhatsApp: levantamos o tipo de operação, os problemas enfrentados e a infraestrutura de energia existente. A partir daí um engenheiro avalia se o caso é elegível para estudo técnico-econômico — não fechamos projeto sem esse estudo.',
    pages: ['home', 'bess', 'offgrid', 'diagnostico'],
  },
];

export function faqForPage(page: FaqItem['pages'][number]): FaqItem[] {
  return faqItems.filter((item) => item.pages.includes(page));
}

// ============================================================
// Navegação
// ============================================================

export const primaryNav: NavItem[] = [
  { label: 'Soluções', href: '/#solucoes' },
  { label: 'BESS para o Agro', href: '/bess-agronegocio' },
  { label: 'Irrigação Solar Off-grid', href: '/irrigacao-solar-off-grid' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Engenharia', href: '/engenharia' },
  { label: 'Sobre', href: '/sobre' },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: 'Diagnóstico', href: '/diagnostico' },
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Termos de uso', href: '/termos' },
];

// ============================================================
// SEO
// ============================================================

export const SITE_URL = 'https://irrigasolar.com.br';
export const SITE_NAME = 'Irrigasolar Engenharia';
