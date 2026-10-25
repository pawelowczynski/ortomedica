export const serviceLinks = [
  { slug: 'ortodoncja', name: 'Ortodoncja dla młodzieży i dorosłych' },
  { slug: 'ortodoncja-dziecieca', name: 'Ortodoncja dziecięca' },
  { slug: 'stomatologia-i-ortodoncja-dziecieca', name: 'Dentysta dla dzieci' },
  { slug: 'aparat-staly-metalowy', name: 'Aparat stały metalowy' },
  { slug: 'aparat-staly-ceramiczny', name: 'Aparat stały ceramiczny' },
  { slug: 'aparat-ruchomy', name: 'Aparat ruchomy' },
  { slug: 'leczenie-wad-zgryzu', name: 'Leczenie wad zgryzu' },
  { slug: 'skan-3d-shining', name: 'Skan 3D Shining' },
  { slug: 'przygotowanie-do-aparatu', name: 'Przygotowanie do aparatu' },
  { slug: 'retencja-ortodontyczna', name: 'Retencja ortodontyczna' },
  { slug: 'chirurgia-stomatologiczna', name: 'Chirurgia stomatologiczna' },
  { slug: 'stomatologia-zachowawcza-i-protetyka', name: 'Stomatologia zachowawcza i protetyka' },
];

export const serviceSections: Record<string, { title: string; paragraphs: string[] }[]> = {
  ortodoncja: [
    { title: 'Pierwsza konsultacja ortodontyczna w Lubinie', paragraphs: [
      'Podczas zapisu powiedz, czy chodzi o pierwszą ocenę zgryzu, rozpoczęcie leczenia czy kontynuację terapii prowadzonej wcześniej. Przygotuj pytania o ustawienie zębów, dotychczasowe leczenie i oczekiwania. Jeśli masz wcześniejszą dokumentację, zapytaj rejestrację, co zabrać na wizytę.',
      'Konsultacje ortodontyczne prowadzi dr n. med. Kornelia Rumin, specjalista ortodonta. Gabinet znajduje się przy ul. Pawiej 67 w Lubinie. Termin ustalisz z rejestracją pod numerem +48 694 731 124, od poniedziałku do piątku w godzinach 9:00–18:00.',
    ] },
    { title: 'Diagnostyka, aparat i plan leczenia', paragraphs: [
      'W gabinecie dostępne są skan 3D Shining i RTG. Lekarz określa, jakie badania są potrzebne w danym przypadku. Skan przedstawia powierzchnie zębów i zgryz; nie zastępuje wszystkich informacji uzyskiwanych z badania klinicznego i diagnostyki rentgenowskiej.',
      'Wybór aparatu poprzedza ocena zgryzu i omówienie planu. Na stronie znajdziesz osobne informacje o aparacie metalowym, ceramicznym i ruchomym. Zapytaj, jakie rozwiązania mogą być rozważane w Twoim przypadku, jak wyglądają wizyty kontrolne oraz jaki jest plan retencji po zakończeniu aktywnego leczenia.',
    ] },
    { title: 'Koszty konsultacji i kolejnych etapów', paragraphs: [
      'W cenniku konsultacja z diagnostyką ortodontyczną jest wskazana od 400 zł. Szczegółowy zakres wizyty, potrzebne badania i koszty kolejnych etapów ustal z gabinetem. Cena aparatu nie opisuje automatycznie całego kosztu leczenia.',
      'Przed decyzją zapytaj o przygotowanie stomatologiczne, założenie aparatu, kontrole, zakończenie terapii i retencję. Wiążący kosztorys i harmonogram są omawiane po badaniu; orientacyjne stawki znajdują się na stronie cennika.',
    ] },
  ],
  'chirurgia-stomatologiczna': [
    { title: 'Jak przygotować się do konsultacji chirurgicznej?', paragraphs: [
      'Przy zapisie opisz krótko powód wizyty: ból, zalecenie usunięcia zęba albo przygotowanie do innego leczenia. Zabierz posiadaną dokumentację i przygotuj informacje o stosowanych lekach oraz przebytym leczeniu. O potrzebie nowego RTG i kwalifikacji do zabiegu decyduje lekarz.',
      'W zespole ORTHOMEDICA konsultacjami z zakresu endodoncji i chirurgii stomatologicznej zajmuje się lek. dent. Kamil Wojciechowski. Podczas rejestracji ustalisz właściwy rodzaj wizyty i dostępny termin w gabinecie przy ul. Pawiej 67 w Lubinie.',
    ] },
    { title: 'Zabieg jako część szerszego planu leczenia', paragraphs: [
      'Zabieg chirurgiczny może być elementem przygotowania do ortodoncji lub protetyki. Warto zapytać o kolejność etapów, potrzebną dokumentację i to, kiedy należy wrócić do lekarza prowadzącego. Samo skierowanie lub opis dolegliwości nie zastępują kwalifikacji po badaniu.',
      'Na konsultacji omów zakres procedury, możliwe ryzyka, przygotowanie i sposób kontaktu po leczeniu. Zalecenia po konkretnym zabiegu otrzymasz od lekarza. Nie odstawiaj samodzielnie leków i nie zastępuj indywidualnych zaleceń ogólną informacją znalezioną w internecie.',
    ] },
    { title: 'Cena i kontakt po zabiegu', paragraphs: [
      'Koszt zależy od rodzaju procedury i sytuacji klinicznej. W aktualnym cenniku znajdziesz orientacyjne stawki; o wycenę konkretnego leczenia zapytaj po kwalifikacji. Rejestracja pomoże ustalić termin i przekaże, jak skontaktować się z gabinetem.',
      'Przed wyjściem upewnij się, że wiesz, czy potrzebna jest kontrola, jakie objawy wymagają kontaktu i jak postępować poza godzinami pracy gabinetu. Formularz kontaktowy służy do zapytań organizacyjnych i nie jest kanałem pilnej pomocy.',
    ] },
  ],
  'stomatologia-zachowawcza-i-protetyka': [
    { title: 'Od badania do planu odbudowy zębów', paragraphs: [
      'Pierwszym krokiem jest ocena stanu zębów i omówienie potrzeb. W gabinecie zakres obejmuje leczenie próchnicy, odbudowy kompozytowe oraz rozwiązania protetyczne wskazane po konsultacji. Lekarz wyjaśni, które zęby wymagają leczenia i jak można zaplanować kolejne wizyty.',
      'Przy zapisie powiedz, czy potrzebujesz przeglądu, leczenia konkretnego zęba czy konsultacji dotyczącej odbudowy. Jeśli masz dotychczasową dokumentację, zapytaj, co zabrać. Nie można dobrać korony, mostu ani innej metody wyłącznie na podstawie opisu problemu.',
    ] },
    { title: 'Przygotowanie stomatologiczne do aparatu', paragraphs: [
      'Leczenie zachowawcze może poprzedzać terapię ortodontyczną. Zakres przygotowania wynika z badania, stanu uzębienia i planu ustalonego z ortodontą. Warto uzgodnić, które etapy należy wykonać przed założeniem aparatu i jak prowadzić kontrole w czasie jego noszenia.',
      'Lek. dent. Aleksandra Czerkawska zajmuje się stomatologią zachowawczą i oceną przygotowania jamy ustnej do ortodoncji. Kwalifikacje i zakres pracy zespołu są opisane na stronach lekarzy. Szczegóły ortodoncji i przygotowania do aparatu znajdziesz na powiązanych podstronach.',
    ] },
    { title: 'Protetyka: o co zapytać na konsultacji?', paragraphs: [
      'Przy planowaniu koron lub mostów zapytaj o proponowane rozwiązanie, kolejność etapów, potrzebę wcześniejszego leczenia zębów i sposób późniejszych kontroli. Harmonogram zależy od uzgodnionego planu i warunków klinicznych.',
      'Orientacyjne ceny są dostępne w cenniku. Ostateczna wycena jest ustalana po badaniu i określeniu zakresu pracy. Konsultację w ORTHOMEDICA przy ul. Pawiej 67 w Lubinie umówisz telefonicznie lub przez formularz rejestracji.',
    ] },
  ],
};

export function relatedServices(slug: string) {
  const children = ['aparat-ruchomy', 'ortodoncja-dziecieca', 'stomatologia-i-ortodoncja-dziecieca'];
  const family = children.includes(slug)
    ? ['ortodoncja-dziecieca', 'stomatologia-i-ortodoncja-dziecieca', 'aparat-ruchomy']
    : ['ortodoncja', 'aparat-staly-metalowy', 'aparat-staly-ceramiczny', 'skan-3d-shining', 'przygotowanie-do-aparatu', 'retencja-ortodontyczna'];
  return serviceLinks.filter(item => item.slug !== slug && family.includes(item.slug));
}

