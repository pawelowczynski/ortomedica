# ORTHOMEDICA — szczegółowy plan realizacji audytu

Data: 9 września 2026 r.  
Podstawa: [kompletny audyt strony i repozytorium](<C:/Users/Rozz/Documents/orthomedica — kopia/orthomedica/docs/AUDYT-KOMPLETNY-2026-09-09.md>).  
Status: backlog do realizacji; przygotowanie tego dokumentu nie oznacza wdrożenia opisanych zmian.

## 1. Cel i zasady realizacji

Najpierw zapewnić sprawny kontakt pacjenta, czytelność strony i bezpieczne wydawanie zmian. Następnie uporządkować dane, SEO, prywatność i pomiar. Zachować Astro SSG oraz małą ilość JavaScriptu. Obecny zakres nie wymaga SPA, kont pacjentów, bazy danych ani CMS.

Plan obejmuje **43 zadania**, powiązane ze wszystkimi **45 ustaleniami audytu**. Niektóre zadania rozwiązują kilka ustaleń wynikających ze wspólnej przyczyny. Identyfikatory T01–T43 są stałe; kolejność pracy określają etapy i zależności, a nie same numery.

- **P0:** natychmiast ustalić, czy występuje blokada produkcyjna lub osiągalna podatność. W razie potwierdzenia ograniczyć ryzyko przed zwykłymi zmianami.
- **P1:** wymagane przed wydaniem naprawczym, chyba że zadanie weryfikacyjne wykaże brak zastosowania.
- **P2:** kolejna iteracja po przywróceniu podstawowej jakości.
- **P3:** porządkowanie i dopracowanie bez odkładania ważniejszych problemów.

Rozmiary są względne: **XS** — pojedyncza lokalna poprawka; **S** — mała zmiana w jednym obszarze; **M** — kilka elementów wraz z integracją; **L** — kilka warstw lub zależność od infrastruktury; **XL** — temat wymagający dalszego podziału przed realizacją. Nie są to estymacje godzin ani obietnice terminu. Nie sumować ich jak jednostek czasu.

Role wskazane poniżej oznaczają odpowiedzialność, nie konieczność zatrudnienia osobnej osoby do każdego obszaru. Jedna osoba może realizować kilka ról. Zmiany w tym samym komponencie trzeba scalać kolejno i wspólnie sprawdzać.

## 2. Kolejność wykonania

| Etap | Zadania w zalecanej kolejności | Wynik etapu |
|---|---|---|
| **E0. Potwierdzenie sytuacji** | T01 środowiska → T02 triage bezpieczeństwa; T03 punkt odniesienia można wykonać niezależnie | Znany hosting, status formularza i rzeczywisty poziom ryzyka; zapisane pomiary bazowe |
| **E1. Podstawa bezpiecznych zmian** | T04 typy → T05 CI → T06 zależności; T07 endpoint → T08 kontrakt; T12 zaufanie SSH → T13 wydania → T14 holding; T37 sekrety niezależnie | Powtarzalna kontrola zmian, działające środowisko integracyjne, przygotowany bezpieczny mechanizm wydawania |
| **E2. Pierwsze wydanie naprawcze** | T09 antyspam → T10 transport poczty, T11 timeout; T15 menu → T16 kontakt; T17 artykuły → T18 kontrast → T19 hero; T28 ceny; T29 odwołanie prawne; T31 komunikaty | Pacjent widzi ofertę i może wysłać sprawdzalne zgłoszenie; usunięte główne problemy mobile i czytelności |
| **E3. Spójność, dostępność i SEO** | T21 fokus/linki → T22 mapa; T23 obrazy → T24 cache; T25 szablon/schema → T26 profile → T27 blog; T30 prywatność → T36 CSP; T32 kontekst CTA | Spójne dane i treści, poprawne metadane, przewidywalna obsługa klawiatury i zewnętrznych usług |
| **E4. Pomiar i dopracowanie** | T33 materiały zaufania → T34 redakcja; T35 analityka po T30/T31; T20 ikony, T38 nieużywane elementy, T39 skrypty i T40 animacje według dostępności | Zweryfikowane materiały, rzetelny pomiar kontaktu, mniej długu utrzymaniowego |
| **E5. Pełny odbiór i przekazanie** | T41 dokumentacja → T42 pełna regresja → T43 wdrożenie i sprawdzenie produkcji | Dowody odbioru, działająca produkcja, instrukcja utrzymania i właściciele dalszych działań |

**Etapy nie oznaczają jednego dużego wdrożenia na końcu.** Po E2 rekomendowane jest wydanie naprawcze, przechodzące odpowiedni zakres T41–T43. Te same bramki stosuje się przy kolejnych wydaniach. Testy poszczególnych zadań powstają w trakcie ich realizacji; E5 jest odbiorem całości.

Można rozpocząć poprawki interfejsu po T03, podczas ustalania dostępu do infrastruktury. Brak dostępu do poczty nie blokuje naprawy menu, typografii czy kontaktu 320 px. T06 może wymagać dłuższej migracji; decyzja o wcześniejszym wydaniu niezależnych poprawek musi wynikać z udokumentowanego T02 i zastosowanych zabezpieczeń, a nie z samego koloru wyniku skanera.

**Szybkie, niezależne poprawki:** T04, T16, T20, poprawka językowa z T34 i korekta oznaczenia ustawy z T29. Niższy priorytet T20 nie zabrania wykonania go przy pracy nad cennikiem, jeśli nie opóźni problemów P1.

## 3. Zależności i ścieżki krytyczne

| Obszar | Kolejność zależności |
|---|---|
| Wiarygodny kontakt | T01 → T07 → T08 → T09/T10/T11 → T31 → T42 → T43 |
| Bezpieczne wydawanie | T01 → T12 → T13 → T14 → T42 → T43; dodatkowo T04 → T05 |
| Bezpieczeństwo zależności | T02 → T06 → odpowiednia regresja T42; potwierdzone osiągalne zagrożenie blokuje narażone wydanie |
| Czytelność pierwszego ekranu | T03 → T18 → T19 → pomiar i kontrola wizualna T42 |
| Responsywność | T03 → T15/T16 → macierz szerokości T42 |
| Spójne dane | T04 → T28; T08 → T32; T25 → T26; T27 → T34 |
| Mapa i prywatność | T01 → wstępne ustalenia T30; T21 → T22 → finalizacja T30 → T35/T36 |
| Materiały zaufania | Decyzja o prawach do publikacji → T33 → T38 |

Ukośnik w tabeli oznacza niezależne gałęzie, a nie alternatywę, którą można pominąć. W T30 najpierw ustala się zasady przetwarzania potrzebne do backendu, a finalny dokument aktualizuje po ustaleniu rzeczywistego działania T10 i T22.

## 4. Backlog według dziedzin

### A. Infrastruktura, wdrożenia i utrzymanie

#### T01. Potwierdzić środowiska i stan produkcyjnego kontaktu

**P0 · E0 · S · Odpowiedzialny: DevOps + właściciel strony · Audyt: BUG-01, OPS-04; weryfikacja API-01/PERF-03.**

- Ustalić aktywny hosting, domenę kanoniczną, źródło wdrożenia, wersję PHP i rzeczywisty endpoint formularza.
- Odróżnić produkcję, staging i lokalny podgląd. Sprawdzić DNS, TLS, odpowiedzi strony i konfigurację wykonywania PHP z dostępnego środowiska.
- Ustalić testową skrzynkę i sposób weryfikacji odbioru. Zaplanować kontrolowane wysłanie po uzyskaniu upoważnienia do takiej próby.
- Zapisać tabelę środowisk i brakujących dostępów; nie umieszczać w niej haseł.

**Zależności:** dostęp do hostingu lub osoby zarządzającej nim. **Odbiór:** każde środowisko ma nazwany runtime i właściciela; status formularza opisany dowodem lub jako nadal niezweryfikowany. Błąd DNS podczas audytu nie jest sam w sobie dowodem globalnej awarii.

#### T12. Zweryfikować i przypiąć tożsamość serwera SSH

**P1 · E1 · S · Odpowiedzialny: DevOps · Audyt: OPS-03.**

- Uzyskać fingerprint przez zaufany kanał niezależny od połączenia wdrożeniowego, np. panel hostingu.
- Umieścić zweryfikowany klucz w chronionej konfiguracji używanej przez wdrożenie.
- Zastąpić bezwarunkowe zaufanie wynikowi bieżącego skanowania hosta; opisać procedurę rotacji klucza.

**Zależności:** T01 i dostęp administracyjny. **Odbiór:** poprawny klucz pozwala się połączyć, podmieniony klucz zatrzymuje wdrożenie przed wysyłką plików. Weryfikacja odbywa się w środowisku testowym.

#### T13. Zapewnić bezpieczne przełączenie wydania i rollback

**P1 · E1 · L · Odpowiedzialny: DevOps · Audyt: OPS-01.**

- Sprawdzić możliwości hostingu: katalogi wydań, symlinki lub inny mechanizm przełączenia bez okresu braku strony.
- Przygotować artefakt i konfigurację przed przełączeniem. Rozdzielić sekrety, dane ogranicznika i logi od katalogu wymienianego przy release.
- Serializować wdrożenia; uniemożliwić anulowanie rozpoczętej sekcji krytycznej przez kolejne uruchomienie.
- Po nieudanym sprawdzeniu zdrowia automatycznie przywracać poprzednie sprawne wydanie i sprawdzać także rollback.
- Zachowywać poprzednie wydania. Nie dodawać automatycznego kasowania w ramach tego zadania.

**Zależności:** T01, T12; scenariusze testowe z T05/T07. **Odbiór:** przećwiczone nieudane przesłanie, błędne wydanie i nieudany smoke; poprzednia strona wraca, a log wskazuje przyczynę. Jeśli hosting nie zapewnia atomowego przełączenia, dokument zawiera rzeczywiste ograniczenie i przetestowany wariant odzyskania.

#### T14. Oddzielić zwykłe wydanie od trybu technicznego

**P1 · E1 · S · Odpowiedzialny: DevOps · Audyt: OPS-02.**

- Domyślnie przygotowywać pełną witrynę; holding uruchamiać przez osobno oznaczoną, świadomą operację.
- Zachować potrzebne przekierowania i nagłówki. Określić właściwe statusy HTTP, zachowanie indeksowania i powrotu z maintenance.
- Usunąć zależność trybu technicznego od zewnętrznych fontów przez zmianę sposobu ich użycia, bez kasowania plików.

**Zależności:** T13. **Odbiór:** zwykłe uruchomienie nie zastępuje strony holdingiem; test trybu technicznego oraz powrotu zachowuje ustalone reguły hostingu. Nie zakładać, że brak sitemap w krótkim maintenance oznacza konieczność publikowania nieaktualnej mapy.

#### T24. Zmierzyć i ustawić cache oraz kompresję

**P2 · E3 · M · Odpowiedzialny: DevOps + frontend · Audyt: PERF-03.**

- Najpierw odczytać rzeczywiste nagłówki hostingu dla HTML, hashowanych zasobów, obrazów i fontów.
- Uzupełnić brakujące reguły: długie przechowywanie zasobów o zmiennej nazwie, rewalidacja HTML, wersjonowanie zmienianych obrazów.
- Włączyć kompresję treści tekstowych tam, gdzie nie zapewnia jej hosting. Wykluczyć odpowiedzi formularza z cache.

**Zależności:** T01, T13, T23. **Odbiór:** pomiar potwierdza reguły, powtórne wejście korzysta z cache, a wdrożenie nowego obrazu i HTML pokazuje nową wersję. Jeśli istniejąca konfiguracja jest prawidłowa, wyniki pomiaru zamykają zadanie bez niepotrzebnej zmiany serwera.

#### T41. Napisać aktualną instrukcję rozwoju i utrzymania

**P1 dla instrukcji wydania, P2 dla całości · E1–E5 · M · Odpowiedzialny: prowadzący techniczny + DevOps · Audyt: OPS-04.**

- Opisać uruchomienie frontendu i backendu, instalację, sprawdzenie typów, testy oraz budowanie artefaktu.
- Udokumentować środowiska, nazwy zmiennych bez ich wartości, dozwolone hosty, transport poczty i miejsce logów.
- Opisać publikację, rollback, tryb techniczny, kontrolę formularza i reagowanie na błąd doręczenia.
- Uaktualnić opis architektury, źródeł danych i narzędzi; wycofać z instrukcji nieaktualne informacje o CDN i nieistniejących plikach.

**Zależności:** wersja minimalna po T01/T07/T13; finalna po zmianach technicznych. **Odbiór:** druga osoba potrafi odtworzyć środowisko i przeprowadzić próbny rollback z samej instrukcji; każdy istotny proces ma właściciela.

#### T43. Wdrożyć odebraną wersję i sprawdzić produkcję

**P1 jako bramka każdego wydania · E2 i E5 · M · Odpowiedzialny: DevOps + QA + rejestracja.**

- Wybrać konkretny sprawdzony artefakt, zapisać jego identyfikator i poprzednie sprawne wydanie.
- Opublikować przez odebrany mechanizm T13, w ramach osobno autoryzowanej realizacji wdrożenia.
- Sprawdzić HTTPS, warianty domeny, przekierowania, prawdziwe 404, nagłówki, najważniejsze strony i zachowanie formularza.
- Po uzgodnieniu wykonać kontrolowane zgłoszenie i potwierdzić odbiór przez rejestrację; nie wystarczy sam komunikat sukcesu.
- Przekazać odpowiedzialność za sprawdzanie błędów poczty, dostępności i regresji wydajności. Ustalić moment ponownej oceny danych rzeczywistych po ich zebraniu.

**Zależności:** T41/T42 dla danego wydania, dostęp i upoważnienie do publikacji/testowej wiadomości. **Odbiór:** protokół zawiera wyniki sprawdzeń produkcji, status dostarczenia testu, aktywne wydanie i drogę rollbacku. Ten plan nie jest potwierdzeniem, że wdrożenie już wykonano.

### B. Bezpieczeństwo

#### T02. Ocenić osiągalność zgłoszonych podatności

**P0 · E0 · S · Odpowiedzialny: developer odpowiedzialny za bezpieczeństwo · Audyt: SEC-01.**

- Odświeżyć wykaz advisory i powiązać je z faktycznie zainstalowanymi wersjami oraz zależnościami przechodnimi.
- Dla każdej grupy określić: produkcja/build/dev, warunek wykorzystania, dostępność niezaufanych danych i sposób ograniczenia ryzyka.
- Szczególnie sprawdzić przetwarzanie niezaufanych obrazów i publiczny dostęp do serwera developerskiego.
- Wyznaczyć wersje docelowe do T06 oraz zabezpieczenia tymczasowe, jeśli migracja wymaga więcej pracy.

**Zależności:** lockfile i informacje o środowisku z T01. **Odbiór:** każda pozycja ma decyzję „naprawić / nieosiągalne w obecnym użyciu z uzasadnieniem / wymaga dalszej weryfikacji”, właściciela i kolejny krok. Liczba advisory nie jest utożsamiana z liczbą możliwych ataków na stronę.

#### T06. Zaktualizować podatne zależności z kontrolą regresji

**P1; pilność warunkowana T02 · E1 · L · Odpowiedzialny: frontend + osoba ds. bezpieczeństwa · Audyt: SEC-01.**

- Wybrać aktualnie dostępny, wspierany zestaw zgodnych wersji usuwający wskazane zagrożenia; ponownie sprawdzić dokumentację migracji w momencie realizacji.
- Aktualizować w kontrolowanych grupach, zapisując zmiany w konfiguracji i lockfile; nie stosować bezrefleksyjnego wymuszania wszystkich aktualizacji.
- Wyjaśnić potrzebę ustawienia ignorującego konflikty peer dependencies; doprowadzić do świadomie zgodnego zestawu zależności.
- Po zmianach sprawdzić build, typy, generowanie stron, obrazy i krytyczne interakcje.

**Zależności:** T02, T04, T05. **Odbiór:** brak nierozwiązanych osiągalnych podatności o wysokim/krytycznym wpływie; pozostałe mają konkretne uzasadnienie i decyzję. Czysta instalacja odtwarza build. Większa migracja nie wprowadza nowych funkcji produktu.

#### T09. Zabezpieczyć formularz przed obchodzeniem limitu sesją

**P1 · E2 · M · Odpowiedzialny: backend + DevOps · Audyt: SEC-02.**

- Wprowadzić limit niezależny od cookie, odporny na równoczesne żądania i wspólny dla aktywnych procesów.
- Dobrać limit klienta oraz globalny bez arbitralnego blokowania typowego ruchu z jednej sieci. Uwzględnić tylko zweryfikowane nagłówki z zaufanego proxy.
- Liczyć także próby powodujące koszt, a nie wyłącznie udane wysłania; uzgodnić reakcję na niedostępność magazynu limitów.
- Ustalić minimalny zakres identyfikatorów i retencję; miejsce przechowywania musi przeżyć zmianę wydania.

**Zależności:** T07, T08, T13 i wstępne ustalenia prywatności T30. **Odbiór:** test lokalny/staging z nowymi sesjami i równoległymi żądaniami nadal egzekwuje limit; odpowiedź 429 jest czytelna; zwykły pacjent nie otrzymuje fałszywego sukcesu. Bez testów masowej wysyłki na produkcji.

#### T36. Wprowadzić zweryfikowaną politykę CSP

**P2 · E3 · M · Odpowiedzialny: bezpieczeństwo + frontend + DevOps · Audyt: SEC-03.**

- Sprawdzić najpierw nagłówki produkcyjne i rzeczywiste źródła skryptów, stylów, obrazów, formularza i mapy.
- Przygotować możliwie wąską politykę obejmującą m.in. źródła skryptów, `form-action`, `base-uri` i `object-src`.
- Zacząć od trybu raportującego, wyjaśnić naruszenia i dopiero potem wymuszać politykę. Unikać otwierania wszystkich źródeł tylko dla wyciszenia błędów.
- Uzgodnić odbiór i retencję raportów, jeżeli raportowanie opuszcza serwer.

**Zależności:** T01, T22, T30; jeśli w danym wydaniu uruchamiana jest T35, objąć ją testem CSP. **Odbiór:** formularz, mapa po aktywacji i wszystkie potrzebne elementy działają przy egzekwowanej polityce; brak niewyjaśnionych naruszeń. Brak konfiguracji w repo nie jest z góry uznawany za brak nagłówka na hostingu.

#### T37. Uszczelnić ochronę plików środowiskowych i sekretów

**P2 · E1 · S · Odpowiedzialny: developer + DevOps · Audyt: SEC-04.**

- Objąć ignorowaniem lokalne warianty plików środowiskowych, pozostawiając jawny szablon bez sekretów.
- Sprawdzić śledzone pliki i artefakt wynikowy; upewnić się, że sekrety poczty nie trafiają do danych publicznych frontendu.
- Dodać odpowiedni skan do kontroli zmian i opisać postępowanie przy realnym wykryciu sekretu.

**Zależności:** T05 dla integracji CI. **Odbiór:** przykładowy prywatny wariant konfiguracji pozostaje ignorowany, szablon jest dostępny, wynikowy HTML/JS nie zawiera sekretów. Audyt nie stwierdził istniejącego wycieku; rotacja nie jest wykonywana bez potrzeby.

### C. Backend, formularz i dostarczanie zgłoszeń

#### T07. Zapewnić wykonywalny endpoint dla każdego środowiska

**P1; P0 przy potwierdzonej awarii kontaktu · E1 · M · Odpowiedzialny: backend + DevOps · Audyt: BUG-01.**

- Dla potwierdzonego hostingu PHP zachować endpoint i skonfigurować jego runtime. Przy wyborze statycznego hostingu bez PHP zaprojektować rzeczywiście obsługiwaną funkcję lub odrębny backend.
- Skonfigurować adres endpointu i ścisłą listę zaufanych hostów/originów per środowisko; nie otwierać wszystkich originów.
- Przygotować lokalne/stagingowe uruchomienie backendu z testowym transportem wiadomości.
- Zapewnić jednoznaczne odpowiedzi JSON i brak ujawniania kodu PHP jako pobieranego pliku.

**Zależności:** T01. **Odbiór:** poprawny POST wykonuje kod backendu, GET zwraca 405, niedozwolony host/origin 403, dozwolony staging działa. Dokument jasno mówi, czy lokalny podgląd ma prawdziwy backend, czy atrapę testową.

#### T08. Ujednolicić kontrakt i walidację formularza

**P1 · E1 · M · Odpowiedzialny: backend + frontend · Audyt: BUG-03, ARCH-01 — tematy formularza.**

- Ustalić wspólne reguły normalizacji telefonu, minimalnej i maksymalnej liczby cyfr, długości pól i dozwolonych tematów.
- Dopuścić krótkie poprawne imiona i Unicode. Odrzucać same separatory, puste wartości, nadmierne długości i tablice POST bez ostrzeżeń w odpowiedzi.
- Zastąpić ciche obcinanie danych jawnym błędem. Dodać odpowiadające regułom ograniczenia w formularzu.
- Wprowadzić jedno źródło tematów z artefaktem dla PHP lub sprawdzanym kontraktem generowanym podczas buildu. Serwer zachowuje własną walidację.

**Zależności:** T07, T05. **Odbiór:** wspólny zestaw przypadków poprawnych i błędnych daje zgodne wyniki po obu stronach; nieznany temat zwraca kontrolowane 400; zmiana listy tematów nie wymaga ręcznego poprawiania dwóch niezależnych list.

#### T10. Zapewnić kontrolowany transport i obserwowalność poczty

**P2, lecz odbiór kanału obowiązkowy przed wydaniem naprawczym; P1, jeśli T01 nie potwierdzi niezawodnego transportu · E2 · L · Odpowiedzialny: backend + DevOps + rejestracja · Audyt: API-01.**

- Ocenić dostępny transport hostingu; wdrożyć uwierzytelniony SMTP lub usługę pozwalającą śledzić przyjęcie, błąd i — jeśli dostępne — odrzucenie wiadomości.
- Sprawdzić konfigurację domeny nadawcy odpowiednią dla wybranego transportu i możliwość odbioru przez rejestrację.
- Nadać zgłoszeniu techniczny identyfikator. Logować minimum potrzebne do diagnozy, bez treści medycznej, telefonu czy imienia w zwykłych logach aplikacyjnych.
- Rozróżniać przyjęcie przez aplikację, przyjęcie przez transport i dostarczenie. Nie obiecywać użytkownikowi ostatniego stanu bez dowodu.
- Ustalić obsługę błędów i odpowiedzialną osobę. Nie budować pełnego CRM w ramach naprawy formularza.

**Zależności:** T07–T09, dostęp do poczty i wstępne T30. **Odbiór:** kontrolowany test trafia na testową skrzynkę, wymuszony błąd transportu jest widoczny technicznie, a komunikat nie udaje sukcesu. Zapisane zasady logowania i retencji. Sama wartość zwrotna `mail()` nie zamyka zadania.

#### T11. Obsłużyć timeout i niejednoznaczny wynik wysyłki

**P1 · E2 · S · Odpowiedzialny: frontend · Audyt: BUG-02.**

- Dodać termin zakończenia całej operacji, obejmujący także odczyt treści odpowiedzi, oraz anulowanie oczekiwania po jego przekroczeniu.
- Przywracać możliwość działania i zachowywać wpisane dane po błędzie, offline, niepoprawnym JSON i timeout.
- Informować, że po przerwaniu oczekiwania wynik może być nieznany; przerwanie po stronie przeglądarki nie dowodzi anulowania wysyłki na serwerze.
- Nie dodawać automatycznego ponawiania POST. Jeśli później będzie potrzebne, najpierw zapewnić deduplikację po stronie serwera.

**Zależności:** T08 i uzgodnione odpowiedzi endpointu. **Odbiór:** wolne nagłówki i wiszące body nie blokują przycisku bez końca; podwójne kliknięcie nadal powoduje jedno zwykłe wysłanie; złośliwy tekst błędu jest wyświetlany jako tekst.

### D. Frontend, UX/UI, mobile i dostępność

#### T15. Naprawić nawigację i pełny cykl życia menu mobilnego

**P1 · E2 · M · Odpowiedzialny: frontend · Audyt: MOB-01, MOB-03, UX-04.**

- Dobrać przełączenie wariantu nagłówka do rzeczywistej szerokości logo, linków i telefonu; uwzględnić tablet i orientację poziomą.
- Przy przejściu do wariantu desktop zamykać menu, przywracać przewijanie i aktualizować atrybuty dostępności.
- Zapewnić spójny cykl fokusu obejmujący zamknięcie, obsługę Escape i poprawny powrót fokusu. Nie przenosić go do przycisku ukrytego po zmianie szerokości.

**Zależności:** T03. **Odbiór:** wszystkie pozycje i telefon dostępne w dziewięciu szerokościach audytu i 844×390; otwarcie przy 390 px i przejście do desktopu nie pozostawia blokady scrolla; obsługa samą klawiaturą jest kompletna.

#### T16. Usunąć przepełnienie kontaktu przy 320 px

**P1 · E2 · S · Odpowiedzialny: frontend · Audyt: MOB-02.**

- Nadać siatce kontaktu jawną jedną kolumnę na małym ekranie i dopuścić kurczenie jej dzieci.
- Ustawić łamanie długiego adresu e-mail oraz dopasowanie pól i listy tematów do dostępnej szerokości.
- Sprawdzić również komunikaty walidacji i status wysyłki, nie tylko pusty formularz.

**Zależności:** T03; uzgodnić wspólne zmiany z T08. **Odbiór:** przy 320 px wszystkie etykiety, pola, komunikaty i przyciski mieszczą się w ekranie; naprawa działa bez maskowania problemu globalnym ukrywaniem poziomego overflow.

#### T17. Przywrócić czytelną typografię treści długich

**P1 · E2 · M · Odpowiedzialny: frontend + osoba odpowiedzialna za treści · Audyt: UX-01.**

- Wybrać jeden sposób stylowania treści artykułowej: odpowiednio skonfigurowany plugin lub własne, ograniczone do artykułu style.
- Ustalić wygląd nagłówków, akapitów, list, linków, cytatów i odstępów. Zachować hierarchię semantyczną.
- Objąć wszystkie dziewięć artykułów oraz opis metamorfozy, sprawdzić długość wiersza i mobile.

**Zależności:** T03; przy dołączeniu zależności uzgodnić wersję z T06. **Odbiór:** rzeczywiste style odróżniają H2/H3 od akapitów, listy mają widoczną strukturę, a treść nie tworzy zbitego bloku. Kontrola obejmuje wszystkie istniejące artykuły, nie tylko jeden przykładowy.

#### T18. Naprawić kontrast systemowo

**P1 · E2 · M · Odpowiedzialny: UI + frontend · Audyt: A11Y-01.**

- Zdefiniować kolory użytkowe osobno dla tekstu, linków, przycisków i dekoracji.
- Poprawić ceny, karty oferty, przyciski, stopkę i WhatsApp; sprawdzić także hover, focus i stany nieaktywne tam, gdzie wymagają czytelności.
- Zachować rozpoznawalną estetykę bez stosowania jasnego złota jako drobnego tekstu na jasnym tle.

**Zależności:** T03. **Odbiór:** zwykły tekst osiąga co najmniej 4,5:1, duży tekst 3:1, a istotne elementy nietekstowe odpowiedni kontrast 3:1 tam, gdzie ma zastosowanie. Wyniki zawierają konkretne pary kolorów; logotypów nie traktuje się automatycznie jak tekstu użytkowego.

#### T19. Poprawić czytelność i szybkość hero

**P1 · E2 · M · Odpowiedzialny: UI + frontend · Audyt: UX-02, PERF-01.**

- Zaprojektować stabilne tło tekstu: wystarczająco ciemny lokalny podkład lub jednolity panel, niezależny od jasnych fragmentów fotografii.
- Przygotować responsywne warianty obrazu w odpowiednim formacie i z poprawnym kadrem. Zachować istniejący plik źródłowy.
- Dopasować preload/priorytet do rzeczywiście pobieranego wariantu, eliminując podwójny transfer i pobieranie dużego PNG na telefonie.
- Sprawdzić układ również przed załadowaniem zdjęcia i przy jego błędzie.

**Zależności:** T03, T18; konfiguracja obrazów zgodna z T06. **Odbiór:** nagłówek, opis i CTA czytelne przy wszystkich kadrach; brak regresji CLS. Cel: mobilne LCP <2,5 s w ustalonym profilu, potwierdzone medianą trzech porównywalnych prób. Jeśli cel nieosiągnięty, zapisać pozostały czynnik i następne działanie — sama zmiana rozszerzenia nie zamyka celu wydajnościowego.

#### T20. Uzupełnić sześć brakujących ikon cennika

**P3 · E4 lub przy T04/T28 · XS · Odpowiedzialny: frontend · Audyt: BUG-04.**

- Dodać tylko używane ikony do zestawu lub renderować je jako SVG podczas buildu.
- Zachować spójny rozmiar i sposób oznaczania ikon dekoracyjnych.

**Zależności:** brak; skoordynować z cennikiem. **Odbiór:** sześć brakujących symboli jest widocznych, konsola nie zgłasza ich braku, nie dołączono całego katalogu ikon. Wystarczy przegląd widoku i konsoli; osobny rozbudowany zestaw testów nie jest potrzebny.

#### T21. Dopracować widoczność fokusu i rozpoznawalność linków

**P1 dla linków polityki, P3 dla kosmetyki fokusu · E3 · S · Odpowiedzialny: frontend · Audyt: A11Y-03, A11Y-04.**

- Przywrócić spójny, wyraźny fokus pól i kontrolek zamiast tłumienia go lokalną regułą.
- Nadać linkom w polityce prywatności rozpoznawalność niezależną od koloru, np. trwałe podkreślenie.
- Sprawdzić formularz, menu, FAQ i cennik klawiaturą, także przy powiększeniu.

**Zależności:** T18; menu po T15. **Odbiór:** użytkownik widzi bieżący fokus i rozpoznaje link w tekście bez polegania tylko na barwie. Poprawkę linków P1 włączyć do pierwszego wydania, nawet jeśli pozostała część zadania trafi do E3.

#### T22. Zapewnić dostępną mapę z możliwością wyłączenia

**P1 dla dostępności, P2 dla pełnej kontroli mapy · E3 · M · Odpowiedzialny: frontend + osoba ds. prywatności · Audyt: A11Y-02, PRI-01.**

- Zachować brak połączenia z Google przed świadomą aktywacją; jasno opisać skutki włączenia mapy.
- Dodać iframe opisowy tytuł oraz trwałą kontrolkę wyłączenia i zwykły link dojazdu.
- Nie gubić fokusu podczas zastępowania placeholdera. Zapewnić logiczną obsługę włączenia i wyłączenia klawiaturą.
- Świadomie ustalić zakres zapamiętywania wyboru; nie zakładać, że musi on obowiązywać bezterminowo.

**Zależności:** T21, wstępne T30. **Odbiór:** przed aktywacją brak żądań mapy, po niej dostępny iframe i kontrolka; wyłączenie usuwa iframe i nie generuje nowych żądań mapy. Tekst nie sugeruje cofnięcia danych już wysłanych. Część dostępności P1 odebrać przed pierwszym wydaniem.

#### T23. Wprowadzić warianty rozmiarów pozostałych obrazów

**P2 · E3 · M · Odpowiedzialny: frontend · Audyt: PERF-02.**

- Objąć logo, miniatury zespołu, portrety i obrazy zabiegów doborem rozmiaru do miejsca wyświetlenia oraz DPR.
- Wprowadzić prawidłowe `srcset/sizes`, wymiary zapobiegające przesunięciom i lazy loading poza pierwszym ekranem.
- Sprawdzić kadry i jakość przy małej oraz dużej szerokości. Zachować pliki źródłowe do dalszej obróbki.

**Zależności:** T19 i wybrany mechanizm obrazów po T06. **Odbiór:** miniatura nie pobiera pełnego portretu, przeglądarka wybiera odpowiedni wariant, brak zniekształceń i nowych przesunięć układu. Raport transferu porównuje rzeczywiście pobrane pliki, a nie cały katalog obrazów.

#### T40. Ograniczyć stałe animowanie CTA

**P3 · E4 · S · Odpowiedzialny: UI + frontend · Audyt: PERF-04.**

- Sprawdzić, które animacje powodują ciągłe malowanie i czy mają uzasadnioną funkcję.
- Zastąpić zbędne nieskończone pulsowanie krótką animacją lub stanem hover/focus; zachować czytelność akcji bez ruchu.
- Zachować istniejącą obsługę preferencji ograniczonego ruchu.

**Zależności:** T18/T19. **Odbiór:** CTA pozostają widoczne, strona nie animuje stale wielu cieni w bezczynności, reduced motion działa. Nie deklarować poprawy baterii bez pomiaru.

### E. Architektura, dane i techniczne SEO

#### T25. Ujednolicić szablon zabiegów i semantykę danych

**P2 · E3 · L · Odpowiedzialny: frontend + techniczne SEO · Audyt: SEO-01, SEO-02, ARCH-01 — szablony i dane placówki.**

- Zdefiniować wspólne dane placówki i stabilne identyfikatory encji; używać ich w treści i danych strukturalnych.
- Zbudować wspólny model/szablon zabiegu bez narzucania identycznej treści wszystkim usługom.
- Wybrać semantykę zgodną z aktualną dokumentacją schema.org: strona medyczna, właściwy opis terapii/procedury i prawidłowe powiązanie z placówką.
- Zastąpić kopie inline schema, błędne typy zabiegów i nieobsługiwane wartości/właściwości. Ujednolicić lekarzy jako osoby powiązane z placówką.

**Zależności:** T05, T06. **Odbiór:** wszystkie 12 stron zabiegów zachowują treść, adresy, nagłówki i CTA; schema jest poprawne semantycznie, nie tylko jako JSON; placówka i lekarze mają spójne `@id`. Nie ma równoległej starej i nowej definicji tej samej encji o sprzecznym znaczeniu.

#### T26. Poprawić profile lekarzy i ich podglądy udostępniania

**P2 · E3 · S · Odpowiedzialny: frontend + SEO · Audyt: SEO-02, SEO-03.**

- Zastosować wspólny model osoby z T25 na stronie głównej i profilach.
- Przekazywać właściwe zdjęcie i opis do metadanych każdego profilu; przygotować odpowiedni kadr udostępniania, jeśli potrzebny.
- Sprawdzić tytuły, canonical i absolutne adresy obrazów w wygenerowanym HTML.

**Zależności:** T25; warianty obrazów skoordynować z T23. **Odbiór:** każdy z trzech profili opisuje i pokazuje właściwego lekarza, a podgląd Aleksandry lub Kamila nie korzysta z domyślnego portretu Kornelii.

#### T27. Walidować treści bloga i daty

**P2 · E3 · M · Odpowiedzialny: frontend + SEO · Audyt: SEO-05.**

- Wprowadzić schemat treści obejmujący wymagane pola, poprawny slug, datę publikacji i opcjonalną rzeczywistą datę aktualizacji.
- Dobierać wpis przez dokładny identyfikator; usunąć możliwość przypadkowego dopasowania końcówki innego sluga.
- Nie zastępować brakującej daty dniem buildu. Zachować obecne adresy wpisów.
- Przygotować kontrolowane zachowanie dla brakującego wpisu oraz listy bez wpisów, z jednym i wieloma wpisami.

**Zależności:** T05/T06. **Odbiór:** nieprawidłowe dane zatrzymują build z czytelnym wskazaniem wpisu; wszystkie dziewięć wpisów przechodzi walidację; przebudowa nie zmienia dat publikacji; obcy slug nie pokazuje innego artykułu.

#### T28. Uporządkować ceny i opis kosztu leczenia

**P1 dla rzetelnego opisu kosztu, P2 dla pełnej centralizacji · E2 · M · Odpowiedzialny: frontend + właściciel cennika · Audyt: UX-03, ARCH-01 — ceny.**

- Wyprowadzić skrót cen i pełny cennik z tych samych typowanych rekordów.
- Nie zmieniać kwot bez potwierdzenia właściciela; ustalić aktualność stawek i zakres poszczególnych pozycji.
- Zmienić opis przykładu na koszt aparatu i kontroli albo wyliczyć rzeczywisty zakres całości po uzyskaniu wszystkich składników i założeń.
- Jawnie wskazać, co wchodzi w przykład, co jest dodatkowe i od czego zależy indywidualna wycena.

**Zależności:** T04; pełne wyliczenie wymaga decyzji gabinetu. **Odbiór:** przykład nie sugeruje pełnego kosztu, gdy pomija diagnostykę, demontaż lub retencję; jedna zmiana rekordu aktualizuje wszystkie jego widoki. Sama korekta nazwy subtotalu może wejść wcześniej i nie czeka na centralizację.

#### T39. Zabezpieczyć stare skrypty migracyjne

**P3 · E4 · S · Odpowiedzialny: developer · Audyt: CODE-03.**

- Oznaczyć skrypty przeznaczone wyłącznie dla historycznego stanu repo i wyłączyć je z zalecanej ścieżki utrzymania.
- Jeśli któryś ma być używany ponownie, dodać warunki wejściowe, tryb podglądu oraz bezpieczną transformację bez powielania importów.
- Nie uruchamiać migracji na aktualnym kodzie tylko w celu sprawdzenia jej zachowania.

**Zależności:** T25. **Odbiór:** instrukcja nie sugeruje ponownego uruchamiania historycznych skryptów; narzędzie zachowane do dalszego użycia dwukrotnie uruchomione na kopii testowej daje ten sam wynik i nie zmienia niepasujących plików.

### F. Treść medyczna, prywatność i redakcja

#### T29. Poprawić odwołanie prawne i zweryfikować jego kontekst

**P1 · E2 · S · Odpowiedzialny: redakcja + osoba odpowiedzialna za treści prawne · Audyt: CONTENT-01.**

- Sprawdzić aktualne oficjalne brzmienie i właściwy akt dla intencji danego zdania; poprawić pomyloną nazwę/datę ustawy.
- Skontrolować wszystkie wystąpienia tej informacji w danych i renderowanych stronach.
- Przekazać cały blok informacyjny do merytorycznej akceptacji, jeśli formułuje szersze zapewnienia dotyczące materiałów medycznych.

**Zależności:** oficjalne źródło w momencie realizacji; kontekst do zatwierdzenia przez właściciela treści. **Odbiór:** poprawny tytuł, data i odsyłacz odpowiadają znaczeniu zdania; brak sprzecznych kopii. Poprawka odwołania nie jest przedstawiana jako certyfikat zgodności całej witryny.

#### T30. Dopasować opis prywatności do rzeczywistego procesu

**P2 · rozpoczęcie E1, zakończenie E3 · M · Odpowiedzialny: właściciel danych/osoba ds. prywatności + backend · Audyt: PRI-02; powiązanie PRI-01.**

- Spisać przepływ zapytania: formularz, poczta, dostęp rejestracji, logi, antyspam, Google Maps i WhatsApp.
- Ustalić potrzebę przetwarzania IP, zakres logów i rzeczywiste okresy lub kryteria przechowywania zapytań, które nie stają się dokumentacją pacjenta.
- Ustalić role dostawców i procedurę obsługi danych; ograniczyć zbędne dane w implementacji.
- Zaktualizować politykę i informację przy formularzu zgodnie z zaakceptowanym procesem. Nie dodawać automatycznie checkboxa marketingowego do prośby o kontakt.

**Zależności:** T01; najpierw decyzje dla T09/T10, potem finalny opis po T10/T22. **Odbiór:** dokument odpowiada faktycznym polom, odbiorcom, kanałom i retencji; właściciel potwierdza możliwość realizacji opisanych zasad. Wymyślony okres przechowywania nie jest kryterium zamknięcia.

#### T34. Poprawić redakcję i rozdzielić intencje poradników

**P3; korekta językowa XS, całość M · E4 · Odpowiedzialny: redakcja medyczna + SEO · Audyt: CONTENT-02.**

- Poprawić odmianę „polityką prywatności” przy formularzu bez czekania na analizę bloga.
- Porównać dwa poradniki higieniczne i — jeśli są dostępne — dane Search Console. Nadać im odrębne pytania czytelnika i zakresy.
- Ustalić autora/przegląd merytoryczny oraz adekwatne źródła porad; nie wpisywać fikcyjnej daty recenzji.
- Ewentualne połączenie wpisów opracować osobno z docelowym adresem i przekierowaniem; nie usuwać materiałów w ramach bieżącego planu.

**Zależności:** T27 dla modelu treści; dane GSC są pomocne, nie wymagane do korekty języka. **Odbiór:** brak błędu przy formularzu, każdy artykuł ma określoną intencję i sprawdzony zakres; bez danych nie stwierdza się kanibalizacji jako faktu.

### G. Konwersja i analityka

#### T31. Wyjaśnić pacjentowi dalszy przebieg kontaktu

**P1 dla uczciwego komunikatu wysyłki, P2 dla uzgodnionego czasu odpowiedzi · E2 · S · Odpowiedzialny: rejestracja + UX writing + frontend · Audyt: CONV-01.**

- Uzgodnić, kto odpowiada, w jakich godzinach i jaki czas odpowiedzi zespół faktycznie może zapewnić.
- Dopasować opis przed wysłaniem oraz komunikaty sukcesu, błędu i nieznanego wyniku.
- Jasno odróżnić prośbę o kontakt od rezerwacji terminu; wskazać alternatywny dostępny kanał przy problemie technicznym.

**Zależności:** T08/T10/T11 i decyzja rejestracji. **Odbiór:** komunikaty odzwierciedlają stan techniczny oraz realny proces. Jeśli SLA nie jest ustalone, nie pojawia się wymyślona obietnica czasu odpowiedzi.

#### T32. Przenosić kontekst zabiegu do formularza

**P2 · E3 · S · Odpowiedzialny: frontend · Audyt: CONV-02 — kontekst CTA.**

- Powiązać CTA poszczególnych zabiegów z poprawnym tematem ze wspólnego kontraktu.
- Po przejściu do formularza zaznaczać właściwy temat z możliwością jego zmiany przez pacjenta.
- Obsłużyć nieznany parametr bez błędu i bez umieszczania w adresie danych osobowych lub swobodnego opisu zdrowia.

**Zależności:** T08, T25 dla wspólnego szablonu. **Odbiór:** każda z 12 usług prowadzi do zgodnego tematu, zwykłe wejście na kontakt działa jak wcześniej, nieznana wartość nie trafia bez walidacji do backendu.

#### T33. Uporządkować publikację opinii i metamorfozy

**P2 · E4 · M · Odpowiedzialny: właściciel treści + frontend + SEO · Audyt: CONV-02 — zaufanie, SEO-04; część CODE-02.**

- Zweryfikować pochodzenie opinii, prawa i zakres zgód na publikację materiałów pacjentów.
- Zdecydować, które istniejące materiały są zatwierdzone. Zastąpić statyczne określenia „tydzień temu” rzeczywistymi datami lub rzetelną prezentacją bez względnego czasu.
- Dla zatwierdzonej metamorfozy dodać sensowne linkowanie ze strony głównej/usługi. Brak praw oznacza odrębną decyzję publikacyjną, a nie automatyczne podłączenie.
- Wybrać jedno źródło opinii; nie utrzymywać pozornego automatycznego zasilania, którego widok nie używa.

**Zależności:** decyzje właściciela, T17/T25. **Odbiór:** opublikowane materiały są zatwierdzone i osiągalne z interfejsu, daty są prawdziwe, a liczby ocen nie są wymyślone. Jeśli publikacja nie jest zatwierdzona, zapisana decyzja i dalszy los materiału zastępują realizację funkcji, ale nie oznaczają osiągnięcia celu konwersyjnego.

#### T35. Wdrożyć minimalny pomiar kontaktu

**P2 · E4 · M · Odpowiedzialny: analityka + frontend/backend + osoba ds. prywatności · Audyt: ANA-01.**

- Najpierw zdefiniować pytania biznesowe i narzędzie adekwatne do skali; nie traktować obecnych zmiennych GA4/Meta jako decyzji o uruchomieniu obu usług.
- Opisać zdarzenia: rozpoczęcie/próba formularza według potrzeby, przyjęcie potwierdzone przez backend, błąd techniczny, klik telefonu i klik WhatsApp.
- Oddzielić zdarzenie przyjęcia zgłoszenia od dostarczenia wiadomości i od kontaktu zakończonego rozmową.
- Nie wysyłać do narzędzi marketingowych imienia, telefonu, treści ani wrażliwej kategorii zapytania. Uwzględnić adresy stron/parametry i automatycznie zbierane dane.
- Wdrożyć wymagany dla wybranego rozwiązania model prywatności; nie dodawać banera bez ustalenia, do czego miałby służyć.

**Zależności:** T10/T11/T30/T31; współpraca z T36. **Odbiór:** zdarzenie sukcesu pojawia się raz po właściwym potwierdzeniu, błędne wysłanie go nie emituje, klik telefonu nie jest raportowany jako rozmowa. Przechwycony payload nie zawiera wykluczonych danych. Powstaje prosty opis miar i ich ograniczeń.

### H. Jakość kodu, testy i porządkowanie

#### T03. Zapisać powtarzalny punkt odniesienia

**P1 · E0 · S · Odpowiedzialny: QA + frontend · Audyt: TEST-01.**

- Zapisać rewizję, wersje runtime, sposób uruchomienia i listę stron; zachować dowody pierwotnego audytu.
- Wybrać reprezentantów szablonów i przypadki odtwarzające potwierdzone błędy, w tym kontakt 320 px i menu 768/1024 px.
- Ustalić profil Lighthouse, zimny cache i sposób porównania mediany trzech prób. Rozróżnić pomiary lokalne od produkcyjnych.

**Zależności:** repo i raport; nie wymaga hostingu. **Odbiór:** druga osoba potrafi odtworzyć najważniejsze usterki i pomiar. Bazowe wyniki audytu: mobilne LCP 7,5 s, performance 70; desktop 96 w poprawnym profilu; nie porównywać różnych profili jak tego samego testu.

#### T04. Naprawić pięć błędów typów cennika

**P1 jako zależność CI · E1 · S · Odpowiedzialny: frontend · Audyt: CODE-01.**

- Zdefiniować typy wariantów sekcji i pozycji cennika, w tym świadomie opcjonalne pola.
- Typować formatowanie cen i użycie danych bez maskowania błędów przez `any` lub wyłączenia kontroli.
- Zachować obecne kwoty, kolejność i widok.

**Zależności:** brak. **Odbiór:** kontrola typów kończy się powodzeniem, produkcyjny build działa, cennik nie zmienił treści. To przesunięcie z P2 audytu do początku wynika z potrzeby uruchomienia wiarygodnej bramki CI.

#### T05. Uruchomić mały zestaw kontroli zmian w CI

**P1 · E1 · M · Odpowiedzialny: QA + developer + DevOps · Audyt: TEST-01.**

- Wprowadzić czystą instalację z lockfile, build i kontrolę typów dla zmian w repo.
- Dodać sprawdzanie tras/linków/metadanych oraz najważniejszych interakcji: menu, kontakt, FAQ i błędy formularza.
- Zapewnić uruchamianie testów kontraktu z rzeczywistym PHP i atrapą transportu; mock frontendu nie zastępuje integracji backendu.
- Dołączać regresje przy realizacji T08–T19. Zestaw ma sprawdzać zachowanie użytkowe, nie odtwarzać struktury implementacji.
- Przy dostępie administracyjnym powiązać checks z zasadami scalania i publikacji; zapisywać dowody błędów jako artefakty.

**Zależności:** T03/T04; część backendowa po T07/T08. **Odbiór:** wadliwa zmiana przerywa właściwy check, poprawna przechodzi powtarzalnie; nie ma wymogu rzeczywistego wysyłania poczty dla każdego PR. Nie czekać z uruchomieniem build/typecheck na ukończenie całego zestawu testów.

#### T38. Rozstrzygnąć los nieużywanych komponentów i zasobów

**P3 · E4 · S · Odpowiedzialny: prowadzący techniczny + właściciel treści · Audyt: CODE-02.**

- Ponownie sprawdzić osiągalność po T33; odróżnić źródła, elementy celowo odłożone i zasoby kopiowane bez użycia.
- Sporządzić listę „używane / zachować jako źródło / kandydat do archiwizacji” z uzasadnieniem i wpływem na artefakt.
- Dla nieużywanego pobierania opinii ustalić utrzymanie albo świadome wyłączenie z procesu.
- Ewentualne przeniesienie wykonać dopiero jako osobno zatwierdzoną operację zgodną z zasadami repo. Plan nie przewiduje kasowania plików.

**Zależności:** T23/T33. **Odbiór:** istnieje zatwierdzona decyzja dla każdego elementu, brak przypadkowo odłączonej funkcji. 7,47 MB niewykorzystywanych obrazów z audytu nie jest przedstawiane jako transfer oszczędzany przy każdym wejściu.

#### T42. Przeprowadzić pełny odbiór regresji

**P1 jako bramka wydania · E2 i E5 · L · Odpowiedzialny: QA, wsparcie frontend/backend/DevOps.**

- Uruchomić wymagane kontrole dla dokładnego artefaktu wydania; po zmianie kodu powtórzyć adekwatną część sprawdzeń.
- Sprawdzić wszystkie strony i przekierowania oraz pełne przepływy kontaktu w testowym środowisku PHP/poczty.
- Obejrzeć reprezentantów szablonów, wykonać pełną macierz geometrii i ręczne sprawdzenie klawiatury, zoomu i czytnika ekranu.
- Powtórzyć pomiary wydajności, metadanych, kontrastu i połączeń zewnętrznych. Przećwiczyć rollback.
- Sporządzić protokół PASS/FAIL/NIEZWERYFIKOWANE z dowodem i właścicielem każdego pozostawionego problemu.

**Zależności:** zadania objęte danym wydaniem oraz jego dokumentacja T41. **Odbiór:** spełnione bramki z następnej sekcji. Nie używać wyniku Lighthouse 100 jako zamiennika odbioru formularza, dostępności czy produkcji.

## 5. Bramki odbioru i publikacji

### G1 — gotowość techniczna każdej zmiany

- Czysta instalacja, build i kontrola typów przechodzą.
- Testy adekwatne do zmienianego zachowania przechodzą; lokalna poprawka ikony lub języka nie wymaga osobnego rozbudowanego projektu testowego.
- W zestawie zmian nie ma niezamierzonych zmian cen, treści medycznych, adresów i sekretów.
- Ustalenia bezpieczeństwa dla wydania są rozstrzygnięte; osiągalne poważne zagrożenie nie pozostaje bez naprawy lub skutecznego ograniczenia ryzyka.

### G2 — gotowość pierwszego wydania naprawczego

Wymagane: T01–T05, rozstrzygnięcie T06 zgodne z T02, T07–T09, odebrany kanał pocztowy z T10, T11–T19, część P1 T21/T22/T28/T29/T31, instrukcja i odbiór T41/T42.

- Formularz: poprawny kontakt, Unicode/krótkie imię, błędny telefon, nieznany temat, wartości tablicowe i za długie dane; kontrolowane kody 400/403/405/429/500.
- Sieć: offline, wiszące nagłówki, wiszące body, HTML zamiast JSON, podwójne kliknięcie; brak utraty danych i fałszywego zapewnienia o dostarczeniu.
- Antyspam: nowa sesja nie zeruje skutecznej ochrony; testy odbywają się poza produkcją.
- Layout: 320, 375, 390, 430, 768, 1024, 1280, 1440 i 1920 px; dodatkowo 844×390. Brak uciętej nawigacji i pól.
- Menu: otwarcie, zamknięcie, Escape, Tab, przejście między wariantami szerokości, poprawne przewijanie i fokus.
- Czytelność: poprawna typografia wszystkich artykułów, stabilne tło hero, właściwe kolory tekstu i CTA.
- Wdrożenie: znany artefakt, sprawdzona tożsamość serwera, nieanulowalna sekcja krytyczna i przećwiczony rollback.

Jeżeli nowe źródło poczty z T10 jest jeszcze w przygotowaniu, wcześniejsze wydanie niezależnych poprawek wymaga dowodu działania obecnego kanału oraz jawnego pozostawienia T10 jako otwartego. Nie oznacza to pełnego zamknięcia audytu backendu.

### G3 — odbiór całego programu

- Wszystkie 45 ustaleń ma wynik i dowód: naprawione, zweryfikowane jako nieaktualne/niezastosowane albo jawnie odroczone z uzasadnieniem. Odroczenie nie jest naprawą.
- Automatyczna geometria obejmuje 32 strony audytu × 9 szerokości, aktualizowane w razie świadomej zmiany liczby stron; osobno trzy przekierowania. Ręcznie obejrzane są wszystkie typy szablonów i miejsca napraw.
- Sprawdzone rzeczywiste 404, 301, warianty HTTP/WWW i kanonikalizacja na hostingu.
- Chrome oraz Safari/iOS lub reprezentatywne urządzenie: formularz, menu, długie treści; dodatkowo klawiatura, zoom 200/400% i podstawowy przepływ z czytnikiem ekranu.
- Wszystkie profile i zabiegi mają zgodne dane strukturalne oraz właściwe obrazy udostępniania; blog zachowuje adresy i prawdziwe daty.
- Mapa i ewentualna analityka zachowują przyjęte zasady prywatności; brak danych osobowych i wrażliwych w payloadach marketingowych.
- Mobilny cel laboratoryjny LCP <2,5 s, CLS ≤0,1, bez pogorszenia interakcji; wynik oparty na porównywalnym profilu i medianie trzech prób. Dane terenowe ocenić osobno po uzyskaniu odpowiedniej próbki, bez obietnicy natychmiastowego wyniku.
- Dokumentacja, logowanie i odpowiedzialność za pocztę, hosting oraz przyszłe aktualizacje są przekazane właścicielowi.

## 6. Informacje potrzebne od właściciela — bez blokowania niezależnych prac

| Potrzebna informacja/decyzja | Do kiedy | Blokowane zadania | Co można robić wcześniej |
|---|---|---|---|
| Rzeczywisty hosting, aktywna domena, dostęp do konfiguracji | E0 | Potwierdzenie T01, realizacja T07/T12–T14/T24/T43 | T03–T05, analiza T02, poprawki interfejsu |
| Staging, testowa skrzynka, parametry transportu i upoważnienie do testowego wysłania | Przed odbiorem backendu E2 | Rzeczywisty odbiór T10/T42/T43 | Kontrakt, walidacja i testy z atrapą poczty |
| Zweryfikowany fingerprint i uprawnienia do ustawień repo | E1 | T12 i administracyjna część T05 | Przygotowanie konfiguracji oraz lokalne kontrole |
| Aktualność cen i znaczenie składników przykładu | E2 | Pełne wyliczenie w T28 | Typy, wspólne źródło danych bez zmiany kwot, uczciwa nazwa subtotalu |
| Faktyczny proces oddzwaniania i ewentualny czas odpowiedzi | E2 | Deklaracja czasu w T31 | Komunikaty błędu/timeoutu i wyjaśnienie braku rezerwacji |
| Retencja zapytań/logów, dostawcy, dostęp rejestracji, odpowiedzialność za dane | Wstępnie E1, finalnie E3 | Polityka T30, produkcyjne ustawienia T09/T10, analityka T35 | Ograniczenie nadmiarowych danych i przygotowanie wariantów technicznych |
| Prawa do opinii i materiałów metamorfozy | E4 | T33 i decyzje w T38 | Techniczny przegląd źródeł i model prezentacji |
| Cel pomiaru i wybór narzędzia; dostęp do istniejącego GSC, jeśli jest | E3–E4 | Uruchomienie T35; analiza danych w T34 | Specyfikacja zdarzeń, korekta języka, rozdzielenie tematów treści |

Te pozycje są zależnościami planu, a nie prośbą o przekazanie haseł w rozmowie. Sekrety należy wprowadzać właściwym mechanizmem konfiguracji. Planowanie nie uruchamia publikacji, wysyłki wiadomości ani kasowania plików.

## 7. Sposób prowadzenia pracy i statusów

Każde zadanie prowadzić ze statusem: **do wykonania → w realizacji → do odbioru → zakończone**. Osobno dopuszczalne: **oczekuje na dane** oraz **odroczone z decyzją**. Na dzień utworzenia tego planu zadania nie zostały wdrożone.

W opisie wykonania zapisywać: odpowiedzialnego, zależności, zmianę, dowód testu, identyfikator wydania i pozostawione ograniczenia. Gdy zadanie zawiera szybką część P1 i większą P2/P3, można wydzielić podzadania zachowujące odwołanie do głównego identyfikatora. Nie oznaczać całego zadania jako zakończone po wykonaniu wyłącznie szybkiej części.

Zalecane małe zestawy zmian: typy i CI; formularz/kontrakt; nawigacja/kontakt; typografia/kontrast; hero/obrazy; wdrożenia; schema/szablony; treści/prywatność; analityka. Aktualizacji zależności nie łączyć bez potrzeby z przebudową wyglądu, ponieważ utrudnia to rozpoznanie źródła regresji.

Przy pracy jednej osoby kolejność startowa: **T01/T02/T03 → T04/T05 → T07/T08 → T15/T16/T17 → T18/T19**, przeplatając zadania wymagające dostępu z pracą lokalną. Przed pierwszą publikacją domknąć wymagania G2, w szczególności antyspam, pocztę i rollback. Pozostałe zadania realizować według E3–E5 oraz ich zależności.

## 8. Pełne powiązanie z audytem

| Ustalenie audytu | Zadanie planu |
|---|---|
| BUG-01 | T01, T07 |
| BUG-02 | T11 |
| BUG-03 | T08 |
| BUG-04 | T20 |
| UX-01 | T17 |
| UX-02 | T19 |
| UX-03 | T28 |
| UX-04 | T15 |
| MOB-01 | T15 |
| MOB-02 | T16 |
| MOB-03 | T15 |
| PERF-01 | T19 |
| PERF-02 | T23 |
| PERF-03 | T24 |
| PERF-04 | T40 |
| SEO-01 | T25 |
| SEO-02 | T25, T26 |
| SEO-03 | T26 |
| SEO-04 | T33 |
| SEO-05 | T27 |
| A11Y-01 | T18 |
| A11Y-02 | T22 |
| A11Y-03 | T21 |
| A11Y-04 | T21 |
| SEC-01 | T02, T06 |
| SEC-02 | T09 |
| SEC-03 | T36 |
| SEC-04 | T37 |
| PRI-01 | T22, T30 |
| PRI-02 | T30 |
| ANA-01 | T35 |
| CODE-01 | T04 |
| CODE-02 | T33, T38 |
| CODE-03 | T39 |
| ARCH-01 | T08, T25, T28 |
| API-01 | T10 |
| TEST-01 | T03, T05, T42 |
| OPS-01 | T13 |
| OPS-02 | T14 |
| OPS-03 | T12 |
| OPS-04 | T01, T41 |
| CONTENT-01 | T29 |
| CONTENT-02 | T34 |
| CONV-01 | T31 |
| CONV-02 | T32, T33 |

T43 zamyka odbiór operacyjny wydania i weryfikuje skutki wielu ustaleń, dlatego nie jest przypisane wyłącznie do jednego błędu. Dokument audytu pozostaje źródłem lokalizacji kodu i dowodów; niniejszy plan określa zakres wykonania, kolejność i warunki zamknięcia.
