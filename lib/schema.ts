import { company, socialLinks, SITE_URL, SITE_NAME, type FaqItem } from '@/content/site';

export function organizationSchema() {
  const sameAs = socialLinks.map((s) => s.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.tradeName,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    url: SITE_URL,
    ...(company.email ? { email: company.email } : {}),
    ...(company.phone ? { telephone: company.phone } : {}),
    ...(company.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: company.address.street,
            addressLocality: company.address.city,
            addressRegion: company.address.state,
            ...(company.address.zip ? { postalCode: company.address.zip } : {}),
            addressCountry: 'BR',
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'pt-BR',
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    provider: {
      '@type': 'Organization',
      name: company.tradeName,
    },
    areaServed: company.regionsServed,
  };
}
