import { SITE_URL, SITE_NAME, PHONE_NUMBER } from './utils';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Compare solar panel costs, find top-rated installers, and discover solar incentives in Idaho, California, Texas, and Hawaii.',
    telephone: PHONE_NUMBER,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_NUMBER,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function localBusinessSchema(company: {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': company.website || undefined,
    name: company.name,
    telephone: company.phone,
    url: company.website,
    ...(company.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address,
      },
    }),
    ...(company.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: company.rating,
        reviewCount: company.reviewCount || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

export function itemListSchema(items: { name: string; url: string; position: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/solar-panel-cost/{search_term_string}/`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(state: string, type: 'solar' | 'battery' | 'consultation', city?: string) {
  const location = city ? `${city}, ${state}` : state;
  const configs = {
    solar: {
      name: `Solar Panel Installation in ${location}`,
      description: `Professional residential solar panel installation services in ${location}. Compare quotes from top-rated local installers.`,
      category: 'Solar Panel Installation',
      lowPrice: '8000',
      highPrice: '35000',
    },
    battery: {
      name: `Home Battery Installation in ${location}`,
      description: `Professional home battery storage installation in ${location}. Tesla Powerwall, Enphase, and more.`,
      category: 'Battery Storage Installation',
      lowPrice: '5000',
      highPrice: '20000',
    },
    consultation: {
      name: 'Free Solar Consultation',
      description: 'Get a free, no-obligation solar consultation. Compare quotes from top-rated solar installers in your area.',
      category: 'Solar Consultation',
      lowPrice: '0',
      highPrice: '0',
    },
  };
  const config = configs[type];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.name,
    description: config.description,
    serviceType: config.category,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    areaServed: {
      '@type': 'State',
      name: state,
    },
    ...(type !== 'consultation' && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: config.lowPrice,
        highPrice: config.highPrice,
      },
    }),
  };
}

export function howToSchema(title: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: `${SITE_URL}/about/`,
    description: `Learn about ${SITE_NAME}'s mission to help homeowners save money with solar energy.`,
    mainEntity: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

export function collectionPageSchema(title: string, url: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url: `${SITE_URL}${url}`,
    description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  };
}

export function enhancedLocalBusinessSchema(company: {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  yearFounded?: number;
  certifications?: string[];
  city?: string;
  state?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': company.website || undefined,
    name: company.name,
    telephone: company.phone,
    url: company.website,
    ...(company.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address,
        ...(company.city && { addressLocality: company.city }),
        ...(company.state && { addressRegion: company.state }),
        addressCountry: 'US',
      },
    }),
    ...(!company.address && (company.city || company.state) && {
      address: {
        '@type': 'PostalAddress',
        ...(company.city && { addressLocality: company.city }),
        ...(company.state && { addressRegion: company.state }),
        addressCountry: 'US',
      },
    }),
    ...(company.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: company.rating,
        reviewCount: company.reviewCount || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(company.yearFounded && { foundingDate: String(company.yearFounded) }),
    ...(company.certifications && company.certifications.length > 0 && {
      hasCredential: company.certifications.map((cert) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: cert,
      })),
    }),
  };
}

export function governmentServiceSchema(incentive: {
  name: string;
  description: string;
  value: string;
}, state: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: incentive.name,
    description: incentive.description,
    serviceType: 'Solar Energy Incentive',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'U.S. Department of Energy',
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
    },
    areaServed: {
      '@type': 'State',
      name: state,
    },
  };
}
