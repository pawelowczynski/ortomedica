import {
  DEFAULT_OG_IMAGE_URL,
  ENTITY,
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

/** Główna encja gabinetu — wyłącznie potwierdzone dane placówki. */
export function organizationJsonLd() {
  return {
    '@type': 'Dentist',
    '@id': ORGANIZATION_ID,
    name: ENTITY.publicBrand,
    url: `${SITE_ORIGIN}/`,
    telephone: PHONE_E164,
    email: ENTITY.email,
    address: postalAddress,
    image: `${SITE_ORIGIN}/images/orthomedica-pawia-67.webp`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
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
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/dr-kornelia-rumin#person`,
    name: 'dr n. med. Kornelia Rumin',
    jobTitle: 'Lekarz ortodonta',
    url: `${SITE_ORIGIN}/dr-kornelia-rumin`,
    worksFor: { '@id': ORGANIZATION_ID },
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
  dateModified?: string;
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
    author: opts.dateModified
      ? { '@type': 'Organization', '@id': ORGANIZATION_ID, name: ENTITY.publicBrand, url: SITE_ORIGIN + '/' }
      : {
          '@type': 'Person',
          '@id': `${SITE_ORIGIN}/dr-kornelia-rumin#person`,
          name: opts.author ?? 'dr n. med. Kornelia Rumin',
          url: `${SITE_ORIGIN}/dr-kornelia-rumin`,
        },
    ...(opts.dateModified && opts.author ? {
      contributor: { '@type': 'Person', '@id': `${SITE_ORIGIN}/dr-kornelia-rumin#person`,
        name: opts.author, url: `${SITE_ORIGIN}/dr-kornelia-rumin` },
    } : {}),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: imageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    publisher: {
      '@type': 'Organization',
      name: ENTITY.publicBrand,
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.webp`,
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

/** One connected graph per service page; business and clinician are distinct entities. */
export function serviceGraphJsonLd(name: string, url: string, description: string) {
  const serviceId = `${url}#service`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd(),
      websiteJsonLd(),
      { '@type': 'MedicalWebPage', '@id': url, url, name, description,
        inLanguage: 'pl-PL', isPartOf: { '@id': WEBSITE_ID }, mainEntity: { '@id': serviceId } },
      { '@type': 'Service', '@id': serviceId, name, url, description,
        provider: { '@id': ORGANIZATION_ID }, areaServed: { '@type': 'City', name: 'Lubin' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name, item: url },
      ] },
    ],
  };
}
