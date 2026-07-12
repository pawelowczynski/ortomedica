# Pełny audyt strony ORTHOMEDICA

Data audytu: 11 lipca 2026
Zakres: repozytorium Astro, build statyczny, domena produkcyjna, DNS, UX mobilny i desktopowy, SEO, treści medyczne, dostępność, prywatność, bezpieczeństwo, analityka i proces wdrożenia.

## Status wdrożenia po audycie

Po potwierdzeniu domeny i adresu e-mail wdrożono techniczne poprawki przedpublikacyjne:

- kanoniczna domena została ustawiona na `https://orthomedica.lubin.pl`;
- e-mail został ustawiony na `rejestracja@orthomedica.lubin.pl`;
- naprawiono konflikt i przekierowanie artykułu Shining;
- dodano serwerowe 301, własne 404 i nagłówki ochronne;
- usunięto publiczne placeholdery, puste certyfikaty i robocze stawki;
- tracking GA4/Meta został całkowicie odłączony do czasu zatwierdzenia klienta;
- mapa ładuje się wyłącznie po bezpośrednim kliknięciu użytkownika;
- fonty, ikony i zdjęcia usług są hostowane lokalnie;
- poprawiono formularz, wersję bez JavaScriptu i opcję ortodoncji dorosłych;
- poprawiono fokus menu, taby, suwak, komunikaty formularza i reduced motion;
- skrócono metadane, ujednolicono schema bloga i poprawiono polskie znaki;
- workflow wdrożeniowy otrzymał preflight, wersję zapasową, podmianę paczki i smoke test.

Końcowy build: 31 adresów w sitemapie, 0 błędnych H1, 0 tytułów powyżej 65 znaków, 0 opisów powyżej 160 znaków, 0 błędnych hostów canonical i 0 brakujących lokalnych celów. Nadal wymagane przed publikacją: zatwierdzenie treści medycznych/prawnych przez klienta, test dostarczenia formularza na hostingu oraz późniejsze wdrożenie analityki wraz z właściwym mechanizmem zgód.

## Wniosek zarządczy

Nowa strona ma solidną bazę techniczną: build przechodzi, prawidłowo generuje około 30 indeksowalnych adresów, wszystkie właściwe strony mają pojedynczy H1, obrazy lokalne mają atrybuty `alt`, a wewnętrzne linkowanie jest niemal kompletne. Projekt nie jest jednak gotowy do publikacji.

Najważniejsze blokery:

1. Domena produkcyjna nadal pokazuje stronę „wkrótce”; `robots.txt` i sitemap zwracają 404.
2. Adres e-mail używany w całej stronie i formularzu wskazuje na domenę, która nie istnieje w DNS.
3. W serwisie pozostały widoczne treści robocze, niewypełnione stawki, zdjęcia stockowe i grafiki zastępcze.
4. Jedno z przekierowań blogowych prowadzi do nieistniejącej strony.
5. Mechanizm zgód ma tylko „Akceptuj wszystko”; kliknięcie mapy uruchamia także GA4 i Meta Pixel, bez osobnego odrzucenia lub łatwego wycofania zgody.
6. Statyczne przekierowania Astro będą na typowym hostingu odpowiedziami `200` z meta-refresh, nie prawdziwymi `301`.
7. Formularz nie został sprawdzony end-to-end na hostingu i ma słabą ochronę przed automatycznym spamem.
8. Informacje prawne, medyczne, kwalifikacje, opinie, godziny, parking i zdjęcia „przed/po” wymagają potwierdzenia przez właściciela placówki oraz — w zakresie prawnym — profesjonalnego przeglądu.

Rekomendacja: **nie publikować pełnej strony przed zamknięciem P0**. Po ich zamknięciu można uruchomić witrynę, a zadania P1 realizować w pierwszych 7–14 dniach.

## Stan według obszaru

| Obszar | Stan | Najważniejszy powód |
|---|---|---|
| Produkcja i indeksacja | czerwony | publicznie działa tylko holding page, brak robots i sitemap |
| Kontakt i formularz | czerwony | domena adresu e-mail zwraca NXDOMAIN |
| Gotowość treści | czerwony | teksty robocze, placeholdery, brak danych i weryfikacji |
| Prywatność/cookies | czerwony | brak odrzucenia, kategorii i łatwego wycofania zgody |
| SEO techniczne w buildzie | żółty | dobra baza, ale błędne przekierowanie i zbyt długie metadane |
| UX i konwersja | żółty | dobry CTA, lecz niespójna oferta formularza i bardzo długa strona mobilna |
| Dostępność | żółty | poprawna semantyka bazowa, braki w menu, formularzu, tabach i suwaku |
| Wydajność | żółty | mały kod JS, lecz ciężkie PNG, brak WebP/AVIF i zewnętrzne zasoby |
| Bezpieczeństwo | żółty/czerwony | brak nagłówków ochronnych i ograniczona ochrona formularza |
| Analityka | czerwony | ID są puste w testowym buildzie, brak pomiaru konwersji |

## Metody i dowody

Wykonano:

- analizę wszystkich plików w `src`, `public`, `deploy` i workflow GitHub Actions;
- produkcyjny build Astro 6.4.8;
- analizę 34 wygenerowanych plików HTML, w tym 30 adresów indeksowalnych, 3 strony przekierowań i 404;
- kontrolę tytułów, opisów, canonicali, H1, obrazów i linków wewnętrznych;
- test DNS domeny strony oraz domeny e-mail;
- test statusów HTTP wariantów www/non-www i HTTP/HTTPS;
- lokalne testy przeglądarkowe Edge/Playwright dla 390×844 oraz 1440×1000;
- wizualny przegląd strony głównej na telefonie i desktopie;
- statyczny przegląd formularza PHP, zgód, danych strukturalnych, treści medycznych i mechanizmu wdrożenia.

Ograniczenia:

- brak dostępu do GA4, Google Search Console i panelu Profilu Firmy Google;
- brak opublikowanej pełnej strony, więc nie ma rzeczywistych danych Core Web Vitals ani możliwości testu formularza na produkcji;
- audyt prawny wskazuje ryzyka, ale nie jest opinią kancelarii;
- nie wykonano aktywnego testu penetracyjnego ani testu dostarczalności do prawdziwej skrzynki;
- baza podatności npm nie została sprawdzona: dostępne środowisko nie ma klienta npm, a `pnpm audit` nie obsługuje istniejącego `package-lock.json`.

## P0 — blokery publikacji

### P0.1. Na produkcji nie ma nowej strony

**Dowód:** `https://www.orthomedica.lubin.pl/` zwraca `200` i stronę „ORTHOMEDICA Lubin — wkrótce”. `robots.txt` oraz `sitemap-index.xml` zwracają hostingową stronę 404. Podstrona `/zabiegi/ortodoncja` również zwraca 404.

**Wpływ:** Google nie może indeksować nowej oferty, bloga ani profili lekarzy; użytkownik widzi wyłącznie telefon.

**Naprawa:** publikować dopiero po zamknięciu pozostałych P0. Po wdrożeniu sprawdzić wszystkie trasy, robots, sitemapę, formularz i status 404.

**Kryterium odbioru:** strona główna oraz wszystkie adresy z sitemap zwracają `200`; robots i sitemap są poprawnym tekstem/XML; losowy błędny URL zwraca `404` z własną stroną błędu.

### P0.2. Adres e-mail ma nieistniejącą domenę

W kodzie użyto `rejestracja@orthomedica-lubin.pl` w:

- `src/data/site.ts`;
- `src/components/ContactSection.astro`;
- `public/contact.php`.

**Dowód:** zapytania DNS dla `orthomedica-lubin.pl` zwracają NXDOMAIN. Domena strony `orthomedica.lubin.pl` istnieje i posiada MX `mail.orthomedica.lubin.pl`.

**Wpływ:** formularz może przyjąć zgłoszenie, lecz wiadomość nie będzie miała gdzie zostać dostarczona; link `mailto:` jest bezużyteczny.

**Naprawa:** właściciel musi potwierdzić właściwy adres. Nie zmieniać automatycznie na podstawie podobieństwa nazw. Następnie zaktualizować jedno centralne źródło danych i konfigurację hostingu, a odbiorcę formularza pobierać wyłącznie z bezpiecznej konfiguracji serwera.

**Kryterium odbioru:** domena ma MX, skrzynka przyjmuje wiadomość testową, formularz dostarcza e-mail, a SPF/DKIM/DMARC i adres koperty nadawcy przechodzą test dostarczalności.

### P0.3. Widoczne treści robocze i brakujące dane

Przed publikacją trzeba usunąć lub uzupełnić:

- komunikat o zdjęciach stockowych w `ClinicGallery.astro`;
- „miejsce na wykaz szkoleń i certyfikatów” w `DoctorProfileLayout.astro`;
- stawki `- zl (uzupelnij)` w `informacje-dla-pacjentow.astro`;
- grafiki `placehold.co` w sześciu artykułach;
- brak polskich znaków w znacznej części strony „Informacje dla pacjentów”;
- ogólne zdjęcia Unsplash używane jako wnętrze gabinetu i wielokrotnie jako grafika bloga.

**Wpływ:** utrata zaufania, wrażenie niedokończonego serwisu, ryzyko błędnej informacji prawnej.

**Kryterium odbioru:** wyszukiwanie repozytorium po `uzupelnij`, `uzupełnić`, `placeholder`, `placehold.co`, `stock` i „miejsce na” nie znajduje treści przeznaczonych dla zespołu wdrożeniowego; wszystkie materiały są zatwierdzone przez placówkę.

### P0.4. Zepsute przekierowanie artykułu o skanerze

`astro.config.mjs` przekierowuje:

`/blog/skan-3d-itero-co-daje-pacjentowi` → `/blog/skan-3d-shining-co-daje-pacjentowi`

Docelowy artykuł nie istnieje. Jednocześnie źródłowy plik nadal ma starą nazwę, dlatego build zgłasza konflikt trasy i generuje przekierowanie do 404.

**Naprawa:** zmienić nazwę pliku i canonical na wersję `shining`, poprawić linki, a stary adres obsłużyć prawdziwym 301.

**Kryterium odbioru:** build bez ostrzeżeń; cel istnieje i zwraca 200; stary adres zwraca 301; oba adresy nie są jednocześnie w sitemapie.

### P0.5. Mechanizm zgód wymaga przebudowy

Obecnie:

- dostępny jest tylko przycisk „Akceptuj wszystko”;
- nie ma równie łatwego „Odrzuć opcjonalne”;
- nie ma osobnych kategorii analityka/marketing/treści zewnętrzne;
- użytkownik nie ma widocznego mechanizmu ponownego otwarcia ustawień;
- kliknięcie „Załaduj mapę” wywołuje `acceptCookies()`, czyli jednocześnie uruchamia mapę, GA4 i Meta Pixel;
- zgoda jest bezterminowym Booleanem w `localStorage`;
- Google Fonts oraz Lucide z unpkg są pobierane przed zgodą; później ładowane obrazy z Unsplash i placehold.co również ujawniają połączenie zewnętrznym dostawcom;
- polityka prywatności opisuje brak opcji odrzucenia zamiast rozwiązywać problem.

**Naprawa:** wdrożyć zgodę granularną z domyślnym odrzuceniem zasobów opcjonalnych, równorzędnymi przyciskami, zapisem wersji i daty zgody oraz stałym linkiem „Ustawienia prywatności”. Kliknięcie mapy ma akceptować tylko kategorię mapy. Fonty, ikony i obrazy najlepiej hostować lokalnie.

**Kryterium odbioru:** przed zgodą brak requestów do Google Analytics, Meta, Google Maps i innych opcjonalnych dostawców; odrzucenie nie pogarsza podstawowej funkcjonalności; wycofanie zgody jest dostępne z każdej strony.

### P0.6. Brak serwerowych przekierowań i konfiguracji kanonicznej domeny

Astro generuje pliki meta-refresh. Bez reguł LiteSpeed/Apache są one odpowiedziami `200`, nie `301`. Nie ma publicznego `.htaccess` ani równoważnej konfiguracji. Produkcja zwraca `200` zarówno dla `https://orthomedica.lubin.pl/`, jak i `https://www.orthomedica.lubin.pl/`, chociaż canonicale wskazują na www.

**Naprawa:** dodać reguły serwera dla:

- HTTP → HTTPS;
- non-www → www (lub odwrotnie, jeśli właściciel wybierze inną wersję);
- trzech starych adresów → aktualne adresy;
- własnej strony 404;
- blokady listowania katalogów.

**Kryterium odbioru:** każdy wariant hosta kończy się jednym 301 na wybranej domenie; stare URL zwracają 301; nie występują łańcuchy ani pętle.

### P0.7. Formularz wymaga testu i wzmocnienia

Pozytywy: walidacja serwerowa, ograniczenie długości, whitelist tematów, ochrona nagłówków e-mail i honeypot.

Ryzyka:

- błędna domena odbiorcy;
- `mail()` potwierdza przyjęcie przez lokalny serwer, nie dostarczenie;
- limit sesyjny można ominąć nową sesją;
- brak tokenu CSRF;
- brak skutecznego limitu IP/urządzenia i monitoringu nadużyć;
- brak zdarzeń analitycznych sukcesu/błędu;
- komunikat formularza nie ma `role="status"`/`aria-live`;
- cel wizyty może ujawniać informację o zdrowiu, więc zakres, retencja i podstawa przetwarzania wymagają zatwierdzenia.

**Kryterium odbioru:** test poprawnego wysłania, błędów 400/405/429/500, spamu, odświeżenia sesji i braku JS; wiadomość faktycznie dociera; błędy są dostępne dla czytnika ekranu; log nie przechowuje nadmiarowych danych.

### P0.8. Weryfikacja faktów, uprawnień i zgód

Przed publikacją właściciel powinien pisemnie zatwierdzić:

- wszystkie usługi: RTG, CBCT, gnatologia, chirurgia, protetyka i leczenie dzieci;
- godziny otwarcia, adres, telefon, poprawny e-mail, NIP, REGON, KRS i numer rejestru medycznego;
- kwalifikacje i zakres pracy każdego lekarza;
- cennik i informacje o opłatach za dokumentację;
- twierdzenia o parkingu, czasie dojazdu i pacjentach z innych miast;
- treść oraz aktualność cytowanych opinii Google;
- pisemną zgodę na każde zdjęcie metamorfozy i zakres użycia;
- możliwość używania nazw handlowych i materiałów dotyczących wyrobów medycznych;
- treści polityki prywatności i informacji dla pacjentów.

## P1 — pierwsze 7–14 dni

### SEO i struktura

1. Skrócić metadane. Przy konserwatywnym progu 65 znaków dla title i 160 dla description do przeglądu jest 21 stron. Największe wartości: metamorfoza 91/165, artykuł o bólu 81/145, przygotowanie do aparatu 81/123, profil Aleksandry 79/157.
2. Ustawić unikalne obrazy OG 1200×630. Obecny domyślny obraz ma 615×900 i jest portretem lekarza, więc będzie źle kadrowany na większości platform.
3. Ujednolicić generowanie schema. Blog tworzy własny `BlogPosting`, mimo że istnieje helper w `src/data/schema.ts`.
4. Dodać breadcrumbs schema do profili i głównych stron usługowych.
5. Dodać `dateModified`, stronę autora oraz realne źródła medyczne do artykułów.
6. Po wdrożeniu zgłosić sitemapę w Search Console i sprawdzić indeksowanie wszystkich adresów.

### Treści i E-E-A-T

Artykuły blogowe mają tylko około 98–143 słów treści i zero zewnętrznych źródeł. Jak na treści zdrowotne są to szkice, nie pełne materiały eksperckie.

Każdy artykuł powinien otrzymać:

- zakres 600–1200 słów zależnie od tematu;
- autora i weryfikatora medycznego;
- datę publikacji i aktualizacji;
- źródła towarzystw naukowych, wytycznych albo publikacji;
- jasne sygnały alarmowe i informację, kiedy skontaktować się z lekarzem;
- powiązanie z odpowiednią usługą, lekarzem i cennikiem;
- własną, zatwierdzoną grafikę;
- redakcję językową — występują błędy typu „Mow”, „omówzenie” oraz brak znaków diakrytycznych.

### Konwersja i UX

1. Formularz mówi „stomatologia dla dzieci”, a strona promuje także dorosłych.
2. Opcja „Ortodoncja dziecko lub młodzież” wyklucza dorosłych mimo H1 „dla dzieci i dorosłych”.
3. CTA z profilu lekarza nie przekazuje wybranego lekarza ani źródła wejścia.
4. Homepage jest bardzo długi na 390 px; kontakt znajduje się po ofercie, procesie, zespole, galerii, cenniku i FAQ. Sticky CTA łagodzi problem, lecz warto przetestować skróconą ścieżkę.
5. Opinie zawierają względne daty „tydzień temu”, które szybko staną się nieprawdziwe. Zapisywać datę absolutną albo nie pokazywać wieku opinii.
6. Powiązane artykuły są pierwszymi trzema wpisami, a nie rzeczywiście powiązanymi tagami.

### Dostępność WCAG 2.2 AA

Do poprawy:

- dodać link „Przejdź do treści”; nie każda podstrona ma spójne `id` głównej treści;
- po otwarciu menu przenieść fokus do panelu, uwięzić go w menu, po zamknięciu zwrócić na przycisk i usunąć ukryte linki z kolejności tabulatora;
- nadać tabom role `tablist`, `tab`, `tabpanel`, kontrolować `tabindex` i obsłużyć strzałki;
- suwak „przed/po” udostępnić klawiaturą jako kontrolkę o opisanej wartości albo zapewnić równoważny statyczny widok;
- dodać `aria-live`/`role=status` do komunikatów formularza oraz powiązać błędy z polami;
- przy błędnej walidacji przenieść fokus do pierwszego błędnego pola;
- zapewnić widoczny focus dla wszystkich linków i przycisków, nie tylko wybranych;
- zweryfikować kontrasty automatycznie i ręcznie;
- respektować `prefers-reduced-motion` także przy `window.scrollTo({behavior:'smooth'})`;
- sprawdzić 200%/400% zoom, NVDA i VoiceOver.

Pozytywy: pojedyncze H1, etykiety formularza, natywne `details/summary`, `alt` dla obrazów i podstawowa obsługa Escape w menu.

### Wydajność

Build zawiera 3,37 MB, z czego obrazy lokalne to 2,61 MB. Nie ma WebP ani AVIF. Największe zasoby:

- `logo.png` — 608 KB, 1080×1080;
- `hero-bg.jpg` — 382 KB, 2070×1552;
- zdjęcie Aleksandry — 381 KB;
- `renata-rumin.png` — 326 KB;
- `sylwia-szych.png` — 273 KB.

Test pierwszego widoku wykazał około 457 KB transferu, 7 zasobów i brak błędów konsoli. Zewnętrzne requesty przed zgodą trafiały do Google Fonts oraz unpkg.

Zalecenia:

- konwersja zdjęć do WebP/AVIF i generowanie kilku rozmiarów;
- lokalne hostowanie i subset fontów;
- usunięcie globalnego `unpkg.com/lucide@latest`; użyć zainstalowanego pakietu i bundla z przypiętą wersją;
- `fetchpriority="high"`/preload dla obrazu LCP;
- nie używać `loading="lazy"` dla głównego zdjęcia artykułu lub lekarza, jeśli znajduje się nad foldem;
- cache immutable dla fingerprintowanych plików oraz rozsądny cache dla obrazów;
- po wdrożeniu wykonać Lighthouse i zebrać 28 dni danych CrUX/Search Console.

### Bezpieczeństwo i wdrożenie

1. Dodać nagłówki: HSTS po potwierdzeniu HTTPS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` i ochronę przed osadzaniem strony.
2. Usunąć zależność od `unpkg.com/lucide@latest`; to ryzyko łańcucha dostaw i utraty dostępności ikon.
3. Workflow `full_site` nie czyści katalogu docelowego, więc stare pliki mogą pozostać po wdrożeniu.
4. Wdrożenie nie jest atomowe i nie tworzy backupu przed podmianą.
5. Brakuje automatycznego CI na pull request: build, kontrola linków, metadanych i placeholderów.
6. Dodać smoke test po deployu i automatyczny rollback przy błędzie krytycznym.
7. Skonfigurować monitoring dostępności strony oraz formularza.

### Analityka

Testowy build miał puste `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_FB_PIXEL_ID` i weryfikację GSC. Po uzyskaniu prawidłowej zgody wdrożyć:

- `phone_click`;
- `whatsapp_click`;
- `contact_form_start`;
- `contact_form_submit`;
- `contact_form_error` bez treści danych osobowych;
- `map_click`;
- `price_list_view`;
- `doctor_profile_view`;
- źródło CTA, usługę i lekarza jako niesensytywne parametry biznesowe;
- filtrowanie ruchu wewnętrznego i testowego;
- połączenie GA4 z Search Console.

## P2 — rozwój po stabilizacji

1. Rozbudować architekturę treści według intencji: ortodoncja dziecięca, aparaty, retencja, chirurgia, diagnostyka i pierwsza wizyta.
2. Zbudować klastry artykuł → usługa → lekarz → CTA, bez sztucznych stron lokalizacyjnych.
3. Dodać własne zdjęcia gabinetu, zespołu, parkingu i diagnostyki.
4. Wdrożyć automatyczną aktualizację opinii z datą pobrania i kontrolą redakcyjną.
5. Testować A/B kolejność CTA, długość homepage, wariant telefonu/WhatsApp/formularz i mikrocopy.
6. Monitorować zapytania lokalne w Search Console oraz pozycje Profilu Firmy Google.
7. Co kwartał przeglądać treści medyczne, ceny, profile lekarzy, dane prawne i zgody na zdjęcia.

## Roadmapa dostosowana do modelu 5.6 Sol

Założenie: model pracuje najlepiej na małych, jednoznacznych paczkach. Nie łączyć zmian prawnych, UX, deployu i treści medycznych w jednym przebiegu. Każda paczka powinna kończyć się buildem, testem i krótkim diffem.

### Etap 0 — decyzje człowieka, bez kodowania

Właściciel dostarcza:

1. poprawny e-mail i potwierdzenie działającej skrzynki;
2. zatwierdzone dane firmy, godziny, usługi i cennik;
3. stawki lub zatwierdzoną treść o dokumentacji medycznej;
4. zdjęcia gabinetu i grafiki blogowe wraz z prawami użycia;
5. kwalifikacje lekarzy albo decyzję o całkowitym ukryciu pustej sekcji;
6. potwierdzenie zgód na metamorfozy i opinie;
7. decyzję: domena kanoniczna www czy non-www;
8. ID GSC/GA4/Meta i decyzję o zakresie marketingu;
9. zaakceptowaną przez prawnika specyfikację zgód.

### Paczka SOL-1 — blokery treści i kontaktu

**Zakres:** `site.ts`, `ContactSection.astro`, `contactForm.ts`, `contact.php`, `informacje-dla-pacjentow.astro`, `DoctorProfileLayout.astro`, `ClinicGallery.astro`.

**Polecenie dla modelu:** „Usuń wszystkie publiczne placeholdery i treści robocze. Użyj wyłącznie zatwierdzonych danych z załączonej tabeli. Scentralizuj e-mail i listę tematów formularza tak, aby klient i PHP nie rozjeżdżały się. Nie dopisuj brakujących faktów. Dodaj test wyszukiwania fraz roboczych i uruchom build.”

**Odbiór:** zero placeholderów, poprawne polskie znaki, poprawny e-mail w każdym miejscu, build bez nowych ostrzeżeń.

### Paczka SOL-2 — routing, domena i deploy

**Zakres:** `astro.config.mjs`, nazwa artykułu Shining, `public/.htaccess`, workflow deploy.

**Polecenie:** „Napraw konflikt artykułu Shining i wszystkie stare URL. Dodaj prawdziwe 301, kanoniczny host, własne 404, nagłówki bazowe oraz bezpieczne wdrożenie do katalogu wersjonowanego/symlink lub wariant z backupem i synchronizacją usuwającą stare pliki. Dodaj smoke test.”

**Odbiór:** czysty build, prawdziwe 301, brak łańcuchów, brak starego contentu po deployu.

### Paczka SOL-3 — prywatność i zasoby zewnętrzne

**Zakres:** `footer.astro`, `main.js`, `layout.astro`, polityka prywatności.

**Polecenie:** „Wdroż granularny mechanizm zgód: niezbędne, analityka, marketing i mapa. Dodaj Akceptuj, Odrzuć opcjonalne, Ustawienia oraz stałe ponowne otwarcie panelu. Kliknięcie mapy może zaakceptować wyłącznie mapę. Zapisuj wersję i datę zgody. Przed zgodą nie wykonuj opcjonalnych requestów. Nie twórz samodzielnie treści prawnej — użyj dostarczonego tekstu.”

**Odbiór:** test sieci przed/po każdej decyzji; cofnięcie działa; brak requestów marketingowych przed zgodą.

### Paczka SOL-4 — formularz i pomiar konwersji

**Zakres:** formularz Astro, `main.js`, `contact.php`.

**Polecenie:** „Wzmocnij formularz o dostępne komunikaty, fokus na błąd, token CSRF, limit nadużyć niezależny od samej sesji i bezpieczne zdarzenia analityczne bez danych osobowych. Dodaj dorosłą ortodoncję oraz przekazywanie wybranego lekarza/źródła CTA. Zachowaj walidację serwerową i whitelistę.”

**Odbiór:** testy 200/400/405/429/500, test klawiatury i czytnika, faktycznie dostarczony e-mail.

### Paczka SOL-5 — obrazy i wydajność

**Zakres:** katalog obrazów, Hero, profile, galeria, blog cards/layout.

**Polecenie:** „Przenieś zatwierdzone obrazy do lokalnych zasobów, wygeneruj WebP/AVIF i rozmiary responsywne, ustaw width/height, loading oraz fetchpriority zależnie od położenia. Zbundluj Lucide lokalnie i ogranicz fonty. Nie zmieniaj tekstów ani layoutu poza koniecznymi poprawkami CLS.”

**Odbiór:** brak unpkg/Unsplash/placehold; obraz LCP zoptymalizowany; brak CLS; Lighthouse mobile do uzgodnionego budżetu.

### Paczka SOL-6 — SEO i schema

**Zakres:** layout, schema helpers, wszystkie strony i frontmatter bloga.

**Polecenie:** „Skróć title/description zgodnie z przekazaną macierzą fraz. Ujednolić canonical, OG i JSON-LD przez helpery. Dodaj breadcrumbs, dateModified i poprawne obrazy 1200×630. Nie zmieniaj medycznego znaczenia treści.”

**Odbiór:** unikalne metadane, poprawny canonical, walidacja schema, brak stron noindex w sitemapie.

### Paczka SOL-7 — dostępność

**Zakres:** header, footer, ProcessSteps, Metamorphoses, ContactSection, main.js, CSS.

**Polecenie:** „Napraw wskazane naruszenia WCAG 2.2 AA: skip link, fokus menu, taby, suwak, formularz, reduced motion i widoczny focus. Zachowaj wygląd. Dodaj testy klawiatury Playwright.”

**Odbiór:** pełna obsługa klawiaturą, brak pułapki fokusu, poprawny odczyt formularza, test 200%/400%.

### Paczka SOL-8 — treści eksperckie

Każdy artykuł jako osobne zadanie modelu. Model otrzymuje:

- zatwierdzony brief frazy i intencji;
- źródła wskazane przez lekarza;
- listę faktów, których wolno użyć;
- docelowe CTA i linki wewnętrzne;
- zakaz dopisywania porad, diagnoz i obietnic bez źródła.

Po każdym artykule wymagany jest przegląd lekarza i data zatwierdzenia. Dopiero wtedy publikacja.

### Paczka SOL-9 — finalny preflight i publikacja

**Polecenie:** „Nie zmieniaj treści. Wykonaj build, crawl, kontrolę linków, canonicali, sitemap, robots, schema, placeholderów, rozmiarów obrazów, nagłówków i formularza. Przygotuj listę PASS/FAIL. Nie wdrażaj, jeśli występuje FAIL P0.”

Po akceptacji człowieka wykonać `full_site`, smoke test i zgłoszenie sitemap w GSC.

## Harmonogram 30/60/90 dni

### 0–7 dni

- decyzje Etapu 0;
- SOL-1 do SOL-4;
- zatwierdzenie prawne i medyczne;
- SOL-9 i publikacja;
- monitoring formularza i błędów.

### 8–30 dni

- SOL-5 do SOL-7;
- GSC, GA4 i dashboard konwersji;
- poprawki z danych produkcyjnych;
- własne zdjęcia i social cards;
- pierwsze 2–3 pełne artykuły po weryfikacji lekarza.

### 31–60 dni

- pozostałe artykuły eksperckie;
- klastry linkowania;
- przegląd widoczności lokalnej i Profilu Firmy Google;
- optymalizacja stron o największych wyświetleniach i niskim CTR.

### 61–90 dni

- test kolejności sekcji i CTA;
- analiza konwersji telefon/WhatsApp/formularz;
- przegląd Core Web Vitals na danych rzeczywistych;
- aktualizacja roadmapy na podstawie leadów, nie samych odsłon.

## Checklista publikacyjna

- [ ] poprawny e-mail potwierdzony testem dostarczenia;
- [ ] wszystkie P0 zamknięte;
- [ ] brak placeholderów i instrukcji dla administratora;
- [ ] dane oraz ceny zatwierdzone przez gabinet;
- [ ] treści prawne zatwierdzone;
- [ ] zgody na zdjęcia i opinie udokumentowane;
- [ ] build bez ostrzeżeń;
- [ ] prawdziwe 301 i jeden host kanoniczny;
- [ ] robots i sitemap zwracają 200;
- [ ] wszystkie URL z sitemap zwracają 200;
- [ ] losowy URL zwraca własne 404;
- [ ] formularz dostarcza wiadomość;
- [ ] zgody działają w wariancie accept/reject/settings/withdraw;
- [ ] brak trackerów przed zgodą;
- [ ] test klawiatury, zoomu i czytnika ekranu;
- [ ] test mobile/desktop Safari, Chrome i Firefox;
- [ ] smoke test po wdrożeniu;
- [ ] GSC i monitoring uruchomione.
