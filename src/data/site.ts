/** Dane witryny i ujawnień prawnych podmiotu */
export const SITE_ORIGIN = 'https://www.orthomedica.lubin.pl';

/** Wizytówka Google (opinie, trasa) — link zewnętrzny */
export const GOOGLE_BUSINESS_REVIEWS_URL =
  'https://www.google.com/maps/place/ORTHOMEDICA+Centrum+Ortodontyczno-Stomatologiczne,+dr+n.+med.+Kornelia+Rumin/@51.3884494,16.2096637,17z/data=!4m8!3m7!1s0x470f6fe7d683d68d:0x6ff7e4a488d769f3!8m2!3d51.3884494!4d16.2096637!9m1!1b1';

export const DEFAULT_OG_IMAGE_URL = `${SITE_ORIGIN}/images/team/kornelia-rumin.jpg`;

export const PHONE_E164 = '+48694731124';
export const PHONE_DISPLAY = '+48 694 731 124';

/**
 * Numer WhatsApp Business (E.164, z prefiksem kraju).
 * Musi być ten sam numer, który masz w WhatsApp Business / Meta Business Suite.
 * Jeśli czat biznesowy jest na innej linii niż telefon rejestracji — wpisz tutaj numer WA, a `PHONE_*` zostaw bez zmian.
 */
export const WHATSAPP_E164 = PHONE_E164;

/** Tekst otwierający czat po kliknięciu „WhatsApp” (parametr `text` w wa.me). Pusty string = bez prefilla. */
export const WHATSAPP_PREFILL_MESSAGE =
  'Dzień dobry, chciałbym/chciałabym umówić wizytę w ORTHOMEDICA w Lubinie.';

/** Link „Kliknij, aby czatować” (WhatsApp Business / wa.me). */
export function whatsAppChatHref(): string {
  const digits = WHATSAPP_E164.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  const msg = WHATSAPP_PREFILL_MESSAGE.trim();
  if (msg === '') {
    return base;
  }
  return `${base}?text=${encodeURIComponent(msg)}`;
}

export const ENTITY = {
  /** Nazwa handlowa / jak widzi pacjent */
  publicBrand: 'ORTHOMEDICA',
  /** Jak w dokumentach prawnych (dopasuj do wpisu CEIDG / umów) */
  legalAdministrator: 'ORTHOMEDICA sp. z o.o.',
  registeredOfficeStreet: 'ul. Piękna 60AF/1',
  registeredOfficePostalCode: '50-506',
  registeredOfficeCity: 'Wrocław-Krzyki',
  clinicStreet: 'ul. Pawia 67',
  clinicPostalCode: '59-300',
  clinicCity: 'Lubin',
  email: 'rejestracja@orthomedica-lubin.pl',
  nip: '8992930722',
  regon: '522554361',
  /** Numer KRS spółki (Krajowy Rejestr Sądowy) — osobno od wpisu w rejestrze medycznym */
  krs: '0000981806',
  /** Numer wpisu w rejestrze podmiotów wykonujących działalność leczniczą (rejestr medyczny) */
  medicalActivityRegistry: '000000276186',
  /** Organ prowadzący rejestr (ustawa o działalności leczniczej) */
  medicalActivityRegistryAuthority: 'Ministerstwo Zdrowia',
} as const;

/** Treści informacyjne — art. 24 ust. 2 ustawy z dnia 15 kwietnia 2011 r. o działalności leczniczej (m.in. pkt 4, 9, 12; art. 23a) */
export const MEDICAL_DISCLOSURE = {
  scopeSummary:
    'Ambulatoryjne świadczenia stomatologiczne: stomatologia zachowawcza i profilaktyka (także dziecięca), endodoncja, chirurgia stomatologiczna, ortodoncja, wybrane zabiegi z zakresu gnatologii, diagnostyka obrazowa (RTG, CBCT) oraz konsultacje specjalistyczne zgodnie z aktualnym zakresem uprawnień zespołu.',

  /** art. 24 ust. 1 pkt 9 — uzupełnij w gabinecie konkretne stawki (zgodnie z art. 28 ustawy o prawach pacjenta i rozporządzeniem) */
  medicalRecordsFeeNote:
    'Wysokość opłaty za udostępnienie dokumentacji medycznej (w tym wydanie kopii na żądanie pacjenta) wynika z ustawy z dnia 6 listopada 2008 r. o prawach pacjenta i Rzeczniku Praw Pacjenta (art. 28) oraz obowiązujących rozporządzeń i nie przekracza ustawowych maksimów. Konkretne stawki (pierwsza strona, kolejne strony, nośnik elektroniczny) są podawane w rejestracji i w regulaminie organizacyjnym gabinetu.',

  nfzNote:
    'Świadczenia są udzielane odpłatnie na zasadach komercyjnych. Gabinet nie zawarł umowy o udzielanie świadczeń opieki zdrowotnej z Narodowym Funduszem Zdrowia w zakresie prezentowanym na tej stronie.',

  /** art. 23a — zmień, jeśli faktycznie stosujecie monitoring */
  cctvNote:
    'W miejscu udzielania świadczeń zdrowotnych nie jest prowadzony monitoring wizyjny. W razie wprowadzenia monitoringu pacjenci zostaną poinformowani na stronie internetowej oraz w gabinecie.',

  patientRightsUrl: 'https://www.gov.pl/web/zdrowie/prawa-pacjenta',
  patientOmbudsmanUrl: 'https://www.rpp.gov.pl/',
} as const;

/**
 * Ujawnienia pod ustawę z dnia 15 kwietnia 2011 r. o wyrobach medycznych (m.in. reklama / informacja o wyrobach).
 * Nie zastępują indywidualnej oceny prawnika — służą przejrzystości treści na stronie (zadanie 4.6 checklisty).
 */
export const MEDICAL_DEVICE_ADVERTISING = {
  /** Skrót do stopki / linków */
  footerTeaser:
    'Opisy metod i nazw handlowych wyrobów mają charakter informacyjny — zasady zgodnie z ustawą o wyrobach medycznych:',

  /** Pełny blok na stronę „Informacje dla pacjentów” */
  fullHtmlParagraphs: [
    'Treści na tej stronie dotyczące metod leczenia, nazw handlowych systemów (np. Invisalign®), aparatów ortodontycznych, materiałów i urządzeń używanych w gabinecie mają **charakter ogólnoinformacyjny** i służą przybliżeniu zakresu usług. **Nie zastępują** konsultacji stomatologicznej, badania ani dokumentacji medycznej. Kwalifikacja do leczenia, dobór wyrobu medycznego (w rozumieniu ustawy o wyrobach medycznych) oraz plan terapii ustala **wyłącznie lekarz dentysta** po ocenie stanu zdrowia pacjenta.',

    'Administrator dba, by publikowane informacje **nie wprowadzały w błąd** co do właściwości, działania ani przeznaczenia wyrobów, **nie sugerowały** możliwości zastąpienia konsultacji lub badania u lekarza oraz by były **spójne** z charakterem świadczeń udzielanych w gabinecie — w granicach obowiązujących przepisów, w tym **ustawy z dnia 15 kwietnia 2011 r. o wyrobach medycznych** (tekst jednolity: ISAP / Rządowe Centrum Legislacji).',

    'Zdjęcia „przed / po” (metamorfozy) mają charakter **ilustracyjny**; efekt leczenia zależy od stanu klinicznego, współpracy pacjenta i wielu innych czynników i **nie stanowi gwarancji** identycznego rezultatu u innej osoby.',

    'W sprawach dotyczących charakteru treści marketingowych lub informacyjnych na stronie można kontaktować się z administratorem pod adresem e-mail wskazanym w danych podmiotu udzielającego świadczeń.',
  ] as const,
} as const;

export function formatRegisteredOfficeAddress(): string {
  return `${ENTITY.registeredOfficeStreet}, ${ENTITY.registeredOfficePostalCode} ${ENTITY.registeredOfficeCity}`;
}

export function formatClinicAddress(): string {
  return `${ENTITY.clinicStreet}, ${ENTITY.clinicPostalCode} ${ENTITY.clinicCity}`;
}

export function formatNipLine(): string {
  return ENTITY.nip ? `NIP: ${ENTITY.nip}` : 'NIP: — uzupełnij zgodnie z CEIDG';
}

export function formatRegonLine(): string {
  return ENTITY.regon ? `REGON: ${ENTITY.regon}` : 'REGON: — uzupełnij zgodnie z CEIDG';
}

export function formatKrsLine(): string {
  return ENTITY.krs ? `KRS: ${ENTITY.krs}` : 'KRS: — uzupełnij zgodnie z KRS';
}

export function formatRegistryLine(): string {
  return ENTITY.medicalActivityRegistry
    ? `Wpis w rejestrze działalności leczniczej: ${ENTITY.medicalActivityRegistry}${ENTITY.medicalActivityRegistryAuthority ? ` (${ENTITY.medicalActivityRegistryAuthority})` : ''}`
    : 'Wpis w rejestrze podmiotów wykonujących działalność leczniczą: — uzupełnij (np. numer wpisu, organ)';
}
