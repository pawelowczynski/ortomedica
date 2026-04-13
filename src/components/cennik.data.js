export const cennikTabs = [
  {
    id: 'ortodoncja',
    label: 'Ortodoncja',
    icon: 'orbit',
    featured: true,
    type: 'orthodontics',
    intro:
      'Kompleksowe leczenie ortodontyczne dla dzieci i dorosłych — od diagnostyki, przez aparaty stałe i nakładkowe, po stabilną retencję.',
    subTabs: [
      {
        id: 'ort-diagnostyka',
        label: 'Diagnostyka',
        type: 'cards',
        intro:
          'Badania diagnostyczne wymagane do zaplanowania leczenia ortodontycznego. RTG panoramiczne i skan 3D to standard przed aparatem stałym lub nakładkami.',
        items: [
          {
            name: 'RTG punktowe',
            desc: 'Badanie jednego zęba',
            price: '50 zł',
            unit: null,
          },
          {
            name: 'RTG panoramiczne / cefalometryczne',
            desc: 'Zdjęcie całego łuku lub profil czaszki',
            price: '150 zł',
            unit: null,
          },
          {
            name: 'Konsultacja z diagnostyką ortodontyczną',
            desc: 'Analiza skanów, RTG, fotografii — pełny plan leczenia',
            price: 'od 400 zł',
            unit: null,
          },
        ],
      },
      {
        id: 'ort-dzieci',
        label: 'Ortodoncja dziecięca',
        type: 'cards',
        intro:
          'Pierwsze badanie ortodontyczne zalecamy w wieku 7 lat. Wczesna diagnostyka pozwala uniknąć skomplikowanego leczenia stałego w przyszłości.',
        items: [
          {
            name: 'Konsultacja dziecięca',
            desc: 'Wywiad, badanie zgryzu, omówienie z rodzicem',
            price: '250 – 300 zł',
            unit: 'jednorazowo',
          },
          {
            name: 'Aparat Twin Block',
            desc: 'Wysuwanie żuchwy i korekcja zębów tylnych — aparaty ruchome',
            price: 'od 3 000 zł',
            unit: null,
          },
          {
            name: 'Aparat Herbsta',
            desc: 'Wysuwanie żuchwy obustronnie — alternatywa dla Twin Block',
            price: 'od 6 000 zł',
            unit: null,
          },
          {
            name: 'Rozszerzenie szczęki (śruba Hyrax)',
            desc: 'Poszerzanie łuku, tworzenie miejsca dla zębów stałych',
            price: '2 200 – 3 500 zł',
            unit: null,
          },
          {
            name: 'Maska twarzowa',
            desc: 'Korekcja cofniętej szczęki — stosowana w fazie wzrostu',
            price: 'od 800 zł',
            unit: null,
          },
          {
            name: 'Wyciąg zewnątrzustny (headgear)',
            desc: 'Hamowanie wzrostu szczęki przy zgryzach prognatycznych',
            price: 'od 1 500 zł',
            unit: null,
          },
          {
            name: 'Kontrola aparatu ruchomego',
            desc: 'Wizyty kontrolne podczas leczenia aparatem dziecięcym',
            price: '250 – 300 zł',
            unit: 'za wizytę',
          },
        ],
      },
      {
        id: 'ort-aparat-staly',
        label: 'Aparat stały',
        type: 'cards',
        intro:
          'Aparaty stałe dla młodzieży i dorosłych. Ceny podane są za jeden łuk (górny lub dolny). Do kosztu aparatu dochodzą wizyty kontrolne co 6–8 tygodni.',
        items: [
          {
            name: 'Metalowy — klasyczny',
            desc: 'Sprawdzona, skuteczna metoda dla każdego wieku',
            price: 'od 3 000 zł',
            unit: 'za łuk',
          },
          {
            name: 'Metalowy — kolor jasnego złota',
            desc: 'Delikatne złocenie zamków — subtelny detal',
            price: 'od 3 500 zł',
            unit: 'za łuk',
          },
          {
            name: 'Estetyczny (ceramika / szafir)',
            desc: 'Zamki w kolorze zębów — dyskretniejszy wygląd',
            price: 'od 4 000 zł',
            unit: 'za łuk',
          },
          {
            name: 'Metalowy — system niskiego tarcia',
            desc: 'Samoligaturujące zamki, mniej wizyt kontrolnych',
            price: 'od 4 000 zł',
            unit: 'za łuk',
          },
          {
            name: 'Estetyczny — system niskiego tarcia',
            desc: 'Połączenie dyskrecji i komfortu leczenia',
            price: 'od 4 500 zł',
            unit: 'za łuk',
          },
          {
            name: 'Kontrola aparatu stałego',
            desc: 'Wizyta co 6–8 tygodni przez cały czas leczenia',
            price: '300 – 400 zł',
            unit: 'za wizytę',
          },
        ],
        infoBox: {
          title: 'Przykładowy całkowity koszt leczenia',
          content:
            'Aparat metalowy na oba łuki (18 miesięcy, wizyty co ~7 tygodni) to ok. 6 000 zł za aparaty + ~10 wizyt × 350 zł. Aparat ceramiczny na oba łuki to zazwyczaj 8 000–9 000 zł + wizyty kontrolne. Dokładny plan kosztów otrzymasz na konsultacji.',
        },
      },
      {
        id: 'ort-nakladki',
        label: 'Leczenie nakładkowe',
        type: 'cards',
        intro:
          'Przezroczyste nakładki prostujące zęby dla dorosłych i nastolatków. Zdejmujesz je do jedzenia, a leczenie planujemy w oparciu o cyfrową symulację 3D.',
        items: [
          {
            name: 'Invisalign Lite',
            desc: 'Niewielkie stłoczenia i drobne korekty kosmetyczne',
            price: 'od 9 000 zł',
            unit: 'całe leczenie',
            tag: null,
          },
          {
            name: 'Invisalign Comprehensive',
            desc: 'Większość dorosłych przypadków wad zgryzu — najpopularniejszy wybór',
            price: 'ok. 14 000 zł',
            unit: 'typowy przypadek dorosłego',
            tag: 'Najpopularniejszy',
            note:
              'Zakres 12 000–18 000 zł zależy od stopnia skomplikowania — ustalamy po diagnostyce.',
          },
          {
            name: 'Once Aligner',
            desc: 'Nakładkowy system alternatywny w konkurencyjnej cenie',
            price: 'od 8 000 zł',
            unit: 'całe leczenie',
            tag: null,
          },
          {
            name: 'Clear Aligner — 1 etap / 1 szczęka',
            desc: '3 alignery, rozwiązanie etapowe',
            price: '1 500 – 2 000 zł',
            unit: 'za etap',
            tag: null,
          },
          {
            name: 'Wizualizacja ClinCheck (plan 3D)',
            desc: 'Symulacja efektów — wliczona w cenę każdego pakietu Invisalign',
            price: '0 zł',
            unit: 'w pakiecie Invisalign',
            tag: null,
          },
        ],
      },
      {
        id: 'ort-retencja',
        label: 'Retencja',
        type: 'cards',
        intro:
          'Retencja to obowiązkowy, ostatni etap leczenia ortodontycznego. Bez niej zęby mają tendencję do powrotu na poprzednie pozycje.',
        items: [
          {
            name: 'Szyna retencyjna (zdejmowana)',
            desc: 'Noszona nocami — niewidoczna w ciągu dnia',
            price: '500 – 800 zł',
            unit: 'za szynę',
          },
          {
            name: 'Retainer stały górny lub dolny',
            desc: 'Drucik przyklejony od wewnątrz — całkowicie niewidoczny',
            price: '600 – 800 zł',
            unit: 'za łuk',
          },
          {
            name: 'Kontrola retencji',
            desc: 'Wizyta sprawdzająca stan retainerów',
            price: '150 – 250 zł',
            unit: 'za wizytę',
          },
          {
            name: 'Demontaż retainera',
            desc: null,
            price: 'od 200 zł',
            unit: null,
          },
          {
            name: 'Demontaż aparatu stałego',
            desc: 'Usunięcie zamków po zakończeniu leczenia',
            price: '250 zł / 500 zł',
            unit: '1 łuk / 2 łuki',
          },
        ],
      },
    ],
  },
  {
    id: 'zachowawcza',
    label: 'Stomatologia',
    icon: 'smile',
    type: 'groups',
    intro:
      'Leczenie ubytków próchnicowych i odbudowa zębów — dbamy o funkcję i estetykę przed, w trakcie i po leczeniu ortodontycznym.',
    groups: [
      {
        groupName: 'Wypełnienia',
        items: [
          { name: 'Wypełnienie zęba stałego', price: '350 – 800 zł' },
          { name: 'Wypełnienie zęba mlecznego', price: 'od 350 zł' },
          { name: 'Wypełnienie tymczasowe — ząb stały', price: 'od 250 zł' },
          { name: 'Wypełnienie tymczasowe — ząb mleczny', price: 'od 200 zł' },
        ],
      },
      {
        groupName: 'Konsultacje i pilne wizyty',
        items: [
          { name: 'Przegląd stomatologiczny', price: '150 – 200 zł' },
          { name: 'Konsultacja z planem leczenia', price: '200 – 400 zł' },
          { name: 'Wizyta bólowa (pierwsza pomoc)', price: '350 – 500 zł' },
          { name: 'Wizyta adaptacyjna (dzieci)', price: '250 zł' },
        ],
      },
    ],
  },
  {
    id: 'endodoncja',
    label: 'Endodoncja',
    icon: 'circle-dot',
    type: 'groups',
    intro:
      'Nowoczesne leczenie kanałowe pod powiększeniem, przygotowujące zęby do dalszego leczenia protetycznego lub ortodontycznego.',
    groups: [
      {
        groupName: 'Leczenie kanałowe',
        items: [
          { name: '1 kanał', price: 'od 1 000 zł' },
          { name: '2 kanały', price: 'od 1 200 zł' },
          { name: '3 kanały', price: 'od 1 400 zł' },
          { name: '4 kanały', price: 'od 1 600 zł' },
          { name: 'Ponowne leczenie kanałowe', price: 'wycena indywidualna' },
        ],
      },
    ],
  },
  {
    id: 'chirurgia',
    label: 'Chirurgia',
    icon: 'scissors',
    type: 'groups',
    intro:
      'Zabiegi chirurgiczne wykonywane w znieczuleniu miejscowym, niezbędne m.in. przed leczeniem ortodontycznym i protetycznym.',
    groups: [
      {
        groupName: 'Ekstrakcje',
        items: [
          { name: 'Ząb mleczny', price: 'od 300 zł' },
          { name: 'Ząb przedni stały', price: '300 – 600 zł' },
          { name: 'Ząb boczny stały', price: '400 – 900 zł' },
          { name: 'Ząb zatrzymany (trzonowy)', price: 'od 1 000 zł' },
        ],
      },
    ],
  },
  {
    id: 'gnatologia',
    label: 'Gnatologia',
    icon: 'activity',
    type: 'cards',
    intro:
      'Diagnozujemy i leczymy zaburzenia stawów skroniowo-żuchwowych oraz mięśni żucia, które często towarzyszą wadom zgryzu.',
    items: [
      {
        name: 'Konsultacja gnatologiczna',
        desc: 'Ocena stawów skroniowo-żuchwowych i mięśni żucia',
        price: '250 – 350 zł',
        unit: null,
      },
    ],
  },
  {
    id: 'profilaktyka',
    label: 'Profilaktyka',
    icon: 'sparkles',
    type: 'cards',
    intro:
      'Zabiegi higienizacyjne i profilaktyczne, które przygotowują do leczenia ortodontycznego i pomagają utrzymać zdrowe zęby.',
    items: [
      {
        name: 'Scaling + piaskowanie + polerowanie + fluoryzacja',
        desc: 'Kompleksowe oczyszczenie — zalecane przed aparatem',
        price: 'od 400 zł',
        unit: 'oba łuki',
        tag: 'Rekomendowane przed leczeniem',
      },
      {
        name: 'Higienizacja dziecięca',
        desc: 'Scaling + polerowanie + fluoryzacja + instruktaż higieny',
        price: 'od 250 zł',
        unit: null,
      },
      {
        name: 'Lakowanie zęba stałego',
        desc: 'Uszczelnianie bruzd — profilaktyka próchnicy',
        price: '150 zł',
        unit: 'za ząb',
      },
      {
        name: 'Lakowanie zęba mlecznego',
        desc: null,
        price: '100 zł',
        unit: 'za ząb',
      },
      {
        name: 'Fluoryzacja',
        desc: 'Wzmocnienie szkliwa po higienizacji',
        price: '150 zł',
        unit: 'oba łuki',
      },
      {
        name: 'ICON — infiltracja próchnicy',
        desc: 'Leczenie wczesnych zmian próchniczych bez wiercenia',
        price: 'od 400 zł',
        unit: 'za ząb',
      },
      {
        name: 'Znoszenie nadwrażliwości',
        desc: null,
        price: '50 zł',
        unit: 'za ząb',
      },
    ],
  },
  {
    id: 'obrazowe',
    label: 'Diagnostyka obrazowa',
    icon: 'scan-line',
    type: 'cards',
    intro:
      'Nowoczesna diagnostyka obrazowa — RTG i tomografia CBCT, które wykorzystujemy do planowania leczenia ortodontycznego, chirurgicznego i zachowawczego.',
    items: [
      {
        name: 'RTG punktowe',
        desc: 'Badanie jednego zęba',
        price: '50 zł',
        unit: null,
      },
      {
        name: 'RTG panoramiczne / cefalometryczne',
        desc: 'Zdjęcie całego łuku lub profil czaszki',
        price: '150 zł',
        unit: null,
      },
      {
        name: 'CBCT 3D — szczęka lub żuchwa',
        desc: 'Tomografia objętościowa jednego łuku',
        price: '250 zł',
        unit: null,
      },
      {
        name: 'CBCT 3D — szczęka i żuchwa',
        desc: 'Pełna tomografia obu łuków',
        price: '400 zł',
        unit: null,
      },
      {
        name: 'CBCT 3D — szczęka, żuchwa i stawy skroniowo-żuchwowe',
        desc: 'Rozszerzone badanie z analizą stawów TMJ',
        price: '450 zł',
        unit: null,
      },
      {
        name: 'Fragment szczęki',
        desc: 'CBCT ograniczony do jednego obszaru',
        price: '150 zł',
        unit: null,
      },
    ],
  },
];

/** Skrócona lista na stronie głównej (#cennik) — ceny zgodne z pełnym cennikiem */
export const cennikPreview = [
  {
    name: 'Aparat stały (metalowy, 1 łuk)',
    price: 'od 3 000 zł',
  },
  {
    name: 'Aparat ruchomy (np. Twin Block)',
    detail: 'leczenie dziecięce — inne modele wg wyceny',
    price: 'od 3 000 zł',
  },
  {
    name: 'Konsultacja z diagnostyką ortodontyczną',
    price: 'od 400 zł',
  },
  {
    name: 'Przegląd stomatologiczny',
    price: '150 – 200 zł',
  },
  {
    name: 'RTG panoramiczne / cefalometryczne',
    price: '150 zł',
  },
  {
    name: 'Higienizacja (scaling, piaskowanie, fluoryzacja)',
    detail: 'oba łuki',
    price: 'od 400 zł',
  },
  {
    name: 'Ekstrakcje zębów',
    detail: 'mleczne i stałe — cena zależy od zęba',
    price: 'od 300 zł',
  },
];

