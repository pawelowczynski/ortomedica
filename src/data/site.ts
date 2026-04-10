/** Dane witryny i ujawnień prawnych — uzupełnij NIP, REGON, wpis do rejestru wg CEIDG / mpwiz.gov.pl */
export const SITE_ORIGIN = 'https://orthomedica-lubin.pl';

export const DEFAULT_OG_IMAGE_URL = `${SITE_ORIGIN}/images/team/kornelia-rumin.jpg`;

export const PHONE_E164 = '+48694731124';
export const WHATSAPP_E164 = PHONE_E164;
export const PHONE_DISPLAY = '+48 694 731 124';

export const ENTITY = {
  /** Nazwa handlowa / jak widzi pacjent */
  publicBrand: 'ORTHOMEDICA',
  /** Jak w dokumentach prawnych (dopasuj do wpisu CEIDG / umów) */
  legalAdministrator: 'ORTHOMEDICA – dr n. med. Kornelia Rumin',
  street: 'ul. Pawia 67',
  postalCode: '59-300',
  city: 'Lubin',
  email: 'rejestracja@orthomedica-lubin.pl',
  nip: '',
  regon: '',
  /** Numer wpisu / identyfikacja w rejestrze podmiotów wykonujących działalność leczniczą (jeśli dotyczy) */
  medicalActivityRegistry: '',
  /** Organ prowadzący rejestr (np. właściwa okręgowa rada lekarska) — jeśli dotyczy */
  medicalActivityRegistryAuthority: '',
} as const;

/** Treści informacyjne — art. 24 ust. 2 ustawy z dnia 15 kwietnia 2011 r. o działalności leczniczej (m.in. pkt 4, 9, 12; art. 23a) */
export const MEDICAL_DISCLOSURE = {
  scopeSummary:
    'Ambulatoryjne świadczenia stomatologiczne: stomatologia zachowawcza i profilaktyka (także dziecięca), endodoncja, chirurgia stomatologiczna, ortodoncja, wybrane zabiegi z zakresu gnatologii, diagnostyka obrazowa (RTG, CBCT) oraz konsultacje specjalistyczne zgodnie z aktualnym zakresem uprawnień zespołu.',

  /** art. 24 ust. 1 pkt 9 — uzupełnij w gabinecie konkretne stawki (zgodnie z art. 28 ustawy o prawach pacjenta i rozporządzeniem) */
  medicalRecordsFeeNote:
    'Wysokość opłaty za udostępnienie dokumentacji medycznej (w tym wydanie kopii na żądanie pacjenta) wynika z ustawy z dnia 6 listopada 2008 r. o prawach pacjenta i Rzeczniku Praw Pacjenta (art. 28) oraz obowiązujących rozporządzeń i nie przekracza ustawowych maksimów. Konkretne stawki (pierwsza strona, kolejne strony, nośnik elektroniczny) są podawane w rejestracji i w regulaminie organizacyjnym gabinetu.',

  nfzNote:
    'Świadczenia są udzielane odpłatnie na zasadach komercyjnych. Gabinet nie zawarł umowy o udzielanie świadczeń opieki zdrowotnej z Narodowym Funduszem Zdrowia w zakresie prezentowanym na tej stronie (jeśli udzielacie świadczeń NFZ — zastąp tę treść).',

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

export function formatEntityAddress(): string {
  return `${ENTITY.street}, ${ENTITY.postalCode} ${ENTITY.city}`;
}

export function formatNipLine(): string {
  return ENTITY.nip ? `NIP: ${ENTITY.nip}` : 'NIP: — uzupełnij zgodnie z CEIDG';
}

export function formatRegonLine(): string {
  return ENTITY.regon ? `REGON: ${ENTITY.regon}` : 'REGON: — uzupełnij zgodnie z CEIDG';
}

export function formatRegistryLine(): string {
  return ENTITY.medicalActivityRegistry
    ? `Wpis w rejestrze działalności leczniczej: ${ENTITY.medicalActivityRegistry}${ENTITY.medicalActivityRegistryAuthority ? ` (${ENTITY.medicalActivityRegistryAuthority})` : ''}`
    : 'Wpis w rejestrze podmiotów wykonujących działalność leczniczą: — uzupełnij (np. numer wpisu, organ)';
}
