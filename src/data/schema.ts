import {
  DEFAULT_OG_IMAGE_URL,
  ENTITY,
  GOOGLE_BUSINESS_REVIEWS_URL,
  PHONE_E164,
  SITE_ORIGIN,
} from './site';

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const postalAddress = {
  '@type': 'PostalAddress' as const,
  streetAddress: ENTITY.clinicStreet,
  addressLocality: ENTITY.clinicCity,
  postalCode: ENTITY.clinicPostalCode,
  addressCountry: 'PL',
};

const geoCoordinates = {
  '@type': 'GeoCoordinates' as const,
  latitude: 51.3884494,
  longitude: 16.2096637,
};

/** Główna encja gabinetu — Dentist + MedicalBusiness z @id */
export function organizationJsonLd() {
  return {
    '@type': ['Dentist', 'MedicalBusiness'],
    '@id': ORGANIZATION_ID,
    name: `${ENTITY.publicBrand} — dr n. med. Kornelia Rumin`,
    alternateName: ENTITY.publicBrand,
    description:
      'Ortodoncja, stomatologia dziecięca, chirurgia stomatologiczna i gnatologia w Lubinie. RTG i skan 3D Shining w gabinecie.',
    image: DEFAULT_OG_IMAGE_URL,
    url: SITE_ORIGIN,
    telephone: PHONE_E164,
    email: ENTITY.email,
    priceRange: 'PLN',
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: GOOGLE_BUSINESS_REVIEWS_URL,
    sameAs: [GOOGLE_BUSINESS_REVIEWS_URL],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    medicalSpecialty: ['Orthodontics', 'Pediatric Dentistry', 'Oral Surgery'],
  };
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: ENTITY.publicBrand,
    url: SITE_ORIGIN,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'pl-PL',
  };
}

export function leadPhysicianJsonLd() {
  return {
    '@type': 'Physician',
    '@id': `${SITE_ORIGIN}/dr-kornelia-rumin#physician`,
    name: 'dr n. med. Kornelia Rumin',
    jobTitle: 'Lekarz ortodonta',
    url: `${SITE_ORIGIN}/dr-kornelia-rumin`,
    worksFor: { '@id': ORGANIZATION_ID },
    medicalSpecialty: 'Orthodontics',
  };
}

export function homepageGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationJsonLd(), websiteJsonLd(), leadPhysicianJsonLd()],
  };
}

export function medicalWebPageJsonLd(opts: {
  name: string;
  url: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@type': 'MedicalTherapy', name: opts.name },
    provider: { '@id': ORGANIZATION_ID },
  };
}

export function medicalProcedureJsonLd(opts: {
  name: string;
  url: string;
  procedureType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: opts.name,
    url: opts.url,
    bodyLocation: 'Zęby',
    procedureType: opts.procedureType ?? 'NonSurgical',
    provider: { '@id': ORGANIZATION_ID },
  };
}

export function blogPostingJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author?: string;
  image?: string;
}) {
  const imageUrl =
    opts.image && opts.image.startsWith('http')
      ? opts.image
      : opts.image
        ? `${SITE_ORIGIN}${opts.image.startsWith('/') ? opts.image : `/${opts.image}`}`
        : DEFAULT_OG_IMAGE_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    author: {
      '@type': 'Person',
      name: opts.author ?? 'dr n. med. Kornelia Rumin',
      url: `${SITE_ORIGIN}/dr-kornelia-rumin`,
    },
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    image: imageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    publisher: {
      '@type': 'Organization',
      name: ENTITY.publicBrand,
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; item: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/** Kanoniczny URL bez trailing slash */
export function canonicalUrl(path: string): string {
  if (path === '/' || path === '') {
    return `${SITE_ORIGIN}/`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized.replace(/\/+$/, '')}`;
}
