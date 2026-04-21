/**
 * Profile lekarzy — meta SEO, schema, skrót kwalifikacji i miejsce na certyfikaty.
 * Dodatkowe szkolenia uzupełniać po dostarczeniu materiałów przez gabinet.
 */

export type QualificationHighlight = { label: string; value: string };

export type AdditionalTraining = {
  title: string;
  issuer?: string;
  year?: string;
};

export type DoctorProfile = {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  canonical: string;
  displayName: string;
  headline: string;
  roleLabel: string;
  imageSrc: string;
  imageAlt: string;
  schemaJobTitle: string;
  schemaDescription: string;
  /** Skrót najważniejszych kwalifikacji (lista obok treści głównej) */
  qualificationHighlights: QualificationHighlight[];
  /** Kursy, certyfikaty, członkostwa — puste = komunikat o uzupełnieniu */
  additionalTraining: AdditionalTraining[];
};

export const drKorneliaRuminProfile: DoctorProfile = {
  slug: 'dr-kornelia-rumin',
  pageTitle: 'Dr n. med. Kornelia Rumin – Ortodonta w Lubinie | ORTHOMEDICA',
  pageDescription:
    'Profil lekarza: dr n. med. Kornelia Rumin, specjalista ortodonta w gabinecie ORTHOMEDICA w Lubinie. Leczenie wad zgryzu u dzieci i dorosłych.',
  canonical: 'https://www.orthomedica.lubin.pl/dr-kornelia-rumin',
  displayName: 'Dr n. med. Kornelia Rumin',
  headline: 'Dr n. med. Kornelia Rumin – Ortodonta w Lubinie',
  roleLabel: 'Specjalista ortodonta',
  imageSrc: '/images/team/kornelia-rumin.jpg',
  imageAlt: 'Dr n. med. Kornelia Rumin',
  schemaJobTitle: 'Lekarz specjalista ortodonta',
  schemaDescription:
    'Specjalista ortodonta w Lubinie — leczenie wad zgryzu u dzieci i dorosłych, ortodoncja w gabinecie ORTHOMEDICA.',
  qualificationHighlights: [
    {
      label: 'Wykształcenie',
      value:
        'Uniwersytet Medyczny we Wrocławiu, Wydział Lekarsko-Stomatologiczny — ukończenie z wyróżnieniem (2011).',
    },
    {
      label: 'Specjalizacja',
      value:
        'Ortodoncja (2017), Katedra i Zakład Ortopedii Szczękowej i Ortodoncji Uniwersytetu Medycznego we Wrocławiu.',
    },
    {
      label: 'Stopień naukowy',
      value:
        'Dr n. med. (2023) — rozprawa doktorska z zakresu metod skracania czasu leczenia ortodontycznego z wykorzystaniem miniimplantów.',
    },
  ],
  additionalTraining: [],
};

export const kamilWojciechowskiProfile: DoctorProfile = {
  slug: 'lek-dent-kamil-wojciechowski',
  pageTitle: 'Lek. dent. Kamil Wojciechowski – Endodoncja i chirurgia Lubin | ORTHOMEDICA',
  pageDescription:
    'Profil lek. dent. Kamila Wojciechowskiego, lekarza zajmującego się endodoncją i chirurgią stomatologiczną w ORTHOMEDICA w Lubinie.',
  canonical: 'https://www.orthomedica.lubin.pl/lek-dent-kamil-wojciechowski',
  displayName: 'Lek. dent. Kamil Wojciechowski',
  headline: 'Lek. dent. Kamil Wojciechowski',
  roleLabel: 'Endodoncja i chirurgia stomatologiczna',
  imageSrc: '/lek-kamil-wojciechowski.png',
  imageAlt: 'Lek. dent. Kamil Wojciechowski',
  schemaJobTitle: 'Lekarz dentysta — endodoncja i chirurgia stomatologiczna',
  schemaDescription:
    'Endodoncja i chirurgia stomatologiczna w ORTHOMEDICA Lubin — leczenie kanałowe i zabiegi chirurgiczne w obrębie jamy ustnej.',
  qualificationHighlights: [],
  additionalTraining: [],
};

export const aleksandraCzerkawskaProfile: DoctorProfile = {
  slug: 'lek-dent-aleksandra-czerkawska',
  pageTitle: 'Lek. dent. Aleksandra Czerkawska – Stomatologia zachowawcza Lubin | ORTHOMEDICA',
  pageDescription:
    'Profil lek. dent. Aleksandry Czerkawskiej, lekarza stomatologa w ORTHOMEDICA w Lubinie. Stomatologia zachowawcza i przygotowanie do leczenia ortodontycznego.',
  canonical: 'https://www.orthomedica.lubin.pl/lek-dent-aleksandra-czerkawska',
  displayName: 'Lek. dent. Aleksandra Czerkawska',
  headline: 'Lek. dent. Aleksandra Czerkawska',
  roleLabel: 'Stomatologia zachowawcza',
  imageSrc: '/lek-aleksandra-czerkawska.png',
  imageAlt: 'Lek. dent. Aleksandra Czerkawska',
  schemaJobTitle: 'Lekarz dentysta — stomatologia zachowawcza',
  schemaDescription:
    'Stomatologia zachowawcza w ORTHOMEDICA Lubin — profilaktyka, leczenie zachowawcze i przygotowanie do ortodoncji.',
  qualificationHighlights: [],
  additionalTraining: [],
};
