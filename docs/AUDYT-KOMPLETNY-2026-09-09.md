# Kompletny audyt ORTHOMEDICA — 9 września 2026

## A. Executive Summary

**Ocena ogólna: 5,0/10.** Projekt ma sensowną, prostą podstawę techniczną, ale nie jest gotowy do bezwarunkowego zatwierdzenia kolejnego wydania. Największe problemy dotyczą mobilnej rejestracji, czytelności, wydajności pierwszego ekranu i pewności obsługi zgłoszeń. Sam poprawny build oraz wynik SEO 100 w Lighthouse nie wykrywają tych problemów.

1. **Nawigacja wypada poza ekran przy 768 i 1024 px.** Znikają istotne linki i telefon; menu mobilne jest już wtedy ukryte.
2. **Formularz kontaktowy nie mieści się przy 320 px.** Pola sięgają do x=376 px, dokument ma szerokość 384 px.
3. **Blog i opis metamorfozy nie mają działającego formatowania `prose`.** Nagłówki wyglądają jak zwykły tekst, akapity nie mają odstępów, listy tracą punktory.
4. **Kontrast jest systemowym problemem.** Złote teksty i ceny na białym tle mają około 2,88:1. Naruszenia dotyczą treści użytkowych, nie tylko ozdobników.
5. **Hero jest trudne do przeczytania.** Biały opis nakłada się na jasną elewację i szyldy. Widać to na telefonie i desktopie.
6. **Mobilne LCP wyniosło 7,5 s**, przy FCP 3,0 s. Główny obraz PNG waży 836 742 B. Lighthouse oszacował możliwość zaoszczędzenia na nim około 577 kB.
7. **Własny endpoint PHP nie działa automatycznie w statycznym wdrożeniu Vercel.** Repo nie zawiera konfiguracji wykonywalnego backendu dla tej ścieżki. Wysyłka na docelowym hostingu pozostaje niezweryfikowana.
8. **Formularz nie ma timeoutu**, a ochrona przed spamem opiera się na sesji klienta. Dostarczenie e-maila nie jest monitorowane.
9. **`npm audit` zgłosił 13 podatnych pakietów:** 1 critical, 9 high, 2 moderate, 1 low. To klasyfikacja zależności; nie potwierdziłem zdalnego RCE ani innej eksploatacji tej statycznej witryny.
10. **Kontrola typów wykryła 5 błędów w `CennikFull.astro`.** Zwykły build ich nie zatrzymuje.
11. **Metadane medyczne są częściowo błędne:** m.in. aparat metalowy opisany jako `Surgical`, osoba oznaczona typem przedsiębiorstwa, niepoprawne wartości/relacje schema.
12. **Pomiar konwersji nie istnieje.** Obecny kod nie inicjuje GA4/Meta i nie emituje zdarzeń wysłania formularza, telefonu ani WhatsApp.
13. **Proces wydania nie przywraca wersji po nieudanym smoke teście.** Zmiana katalogów nie jest pojedynczą atomową operacją; domyślny tryb wdrożenia to holding.
14. **Dokumentacja opisuje inną implementację niż repo.** Dotyczy analityki, skryptów, fontów i wdrożeń; część komponentów i około 7,47 MB grafik pozostaje poza aktywną witryną.
15. Najlepsze szybkie poprawki: breakpoint nagłówka, `min-width: 0` w kontakcie, formatowanie artykułów, kontrast, optymalizacja hero, sześć brakujących ikon i timeout formularza.

## Zakres, metodologia i granice dowodów

Audyt wykonano dla commita **`392f732` — Update homepage hero and portable Codex instructions**. Początkowy stan śledzonych plików był czysty. Nie zmieniono kodu aplikacji, zależności aplikacji ani konfiguracji wdrożenia. Powstał ten raport oraz odrębne, ignorowane przez Git pliki audytu w `output/audit-2026-09-09/`.

Przejrzano strukturę 144 śledzonych plików, dokumentację, 60 tekstowych plików w `src`, konfigurację, endpoint PHP, integracje, skrypty i zależności. Zależności frameworka analizowano przez lockfile, diagnostykę oraz advisory, a nie przez ręczną inspekcję każdej linii `node_modules`.

Wykonano:

- kontrolny build Astro do osobnego katalogu — **PASS**, około 5 s samego procesu budowania;
- przejście 35 wygenerowanych dokumentów HTML: **31 stron treści + 404 + 3 strony przekierowań**;
- kontrolę wszystkich adresów wewnętrznych i kotwic z wyrenderowanego DOM;
- dodatkowo **288 pomiarów układu**: 32 docelowe strony × 9 szerokości, plus 54 wcześniejsze pomiary reprezentatywnych szablonów;
- szerokości **320, 375, 390, 430, 768, 1024, 1280, 1440 i 1920 px**, oraz landscape 844×390;
- testy Edge/Chromium: menu, zmiana rozmiaru, klawiatura zakładek, FAQ, formularz, double click, offline, back/forward, refresh, bezpośrednie adresy i wariant bez JS;
- testy formularza z lokalnymi atrapami odpowiedzi 400, 429, 500, nie-JSON, sukcesem, potencjalnie niebezpiecznym tekstem i wiszącym żądaniem;
- axe-core na ośmiu reprezentatywnych stronach, osobno na mapie po aktywacji;
- Lighthouse strony głównej ze standardowym profilem mobile i standardowym profilem desktop;
- kontrolę typów Astro i `npm audit`, `npm outdated`, `npm ls`;
- skan wzorców sekretów w aktualnych śledzonych plikach tekstowych, bez ujawniania wartości.

**Ograniczenia:** `orthomedica.lubin.pl` i wariant `www` nie rozwiązywały się przez DNS w środowisku audytu; próba otwarcia przez narzędzie internetowe również się nie powiodła. Nie jest to wystarczający dowód globalnej awarii domeny. Brak PHP w lokalnym środowisku uniemożliwił wykonanie backendu. Nie wysyłano rzeczywistych zgłoszeń, e-maili ani wiadomości WhatsApp. Nie sprawdzono skrzynki odbiorczej, paneli Vercel/CyberFolks, ustawień Apache, konfiguracji DNS/CDN, GSC, logów ani historii sekretów wszystkich commitów. Nie wykonano agresywnych testów bezpieczeństwa ani zmian na produkcji.

Lokalny serwer serwował artefakt statyczny; **nie interpretował PHP ani `.htaccess`**. Wnioski o ich zachowaniu są oznaczone jako analiza kodu lub ryzyko, nie jako test hostingu. Macierz szerokości to automatyczne pomiary geometrii, uzupełnione oględzinami wybranych zrzutów; nie oznacza 288 osobnych, ręcznych przeglądów wizualnych. Nie wykonano testów na fizycznym iPhonie, Safari, NVDA/VoiceOver ani pełnego audytu zgodności WCAG.

`confirmed` oznacza dowód w aktualnym kodzie lub odtworzonym zachowaniu. `highly likely` oznacza mocny dowód przy niezweryfikowanym warunku środowiskowym. `suspected` oznacza hipotezę wymagającą danych. Potwierdzony brak funkcji nie oznacza potwierdzonej wielkości strat biznesowych.

## Architektura i inwentaryzacja

| Element | Stan rzeczywisty |
|---|---|
| Framework | Astro 6.0.3, generowanie statyczne, routing plikowy |
| Style | Tailwind 4.2.1, plugin Vite, konfiguracja JS + globalny CSS |
| JavaScript klienta | Jeden wspólny moduł `src/scripts/main.js`, około 13,7 kB przed kompresją |
| Entry pointy | `src/pages/index.astro`, `src/layouts/layout.astro`, `src/scripts/main.js` |
| Treści | Astro, lokalne dane TS/JS, dziewięć artykułów Markdown; brak CMS |
| Routing | Strona główna, 12 zabiegów, 9 wpisów bloga + listing, 3 lekarzy, cennik, 3 strony informacyjno-prawne, 1 metamorfoza, 404 |
| Backend | Jeden `public/contact.php`, POST formularza → PHP `mail()` |
| Baza danych | Brak; nie ma schematu, migracji, ORM ani zapytań SQL |
| Auth / checkout | Brak logowania, rejestracji kont, koszyka, płatności i resetu hasła; nie są wymaganiami tej witryny |
| Integracje aktywne | Telefon, e-mail, link WhatsApp; Google Maps dopiero po kliknięciu |
| Integracja niepodłączona | Pobieranie opinii Google Places zapisuje JSON, którego witryna nie odczytuje |
| Analytics | Brak działającego GA4, GTM, Meta, TikTok, Hotjar i Clarity w aktywnym kodzie |
| Zmienne | `PUBLIC_GSC_VERIFICATION` używana; GA/FB w `.env.example` nieużywane; klucz Places tylko w skrypcie; `CONTACT_MAIL_TO/FROM` tylko w PHP |
| Hosting | CyberFolks: ręczny workflow; Vercel: integracja zewnętrzna opisana w dokumentacji, bez konfiguracji PHP w repo |
| CI | Ręczne wdrożenie i import Issues; brak bramki jakości uruchamianej dla PR |

### Co działa i czego nie należy zgłaszać jako błędu

- Wszystkie docelowe strony mają pojedynczy H1, tytuł, opis, canonical i `lang="pl"`; JSON-LD daje się sparsować.
- Nie znaleziono niedziałających wewnętrznych linków ani nieistniejących kotwic. Obrazy referencjonowane przez stronę istnieją. `naturalWidth=0` przy niezaładowanych zdjęciach lazy poza ekranem nie jest dowodem uszkodzenia obrazu.
- Sitemap zawiera 31 stron treści i pomija 404 oraz stare przekierowywane ścieżki. `robots.txt` wskazuje właściwy plik sitemap-index.
- Treść jest obecna w HTML. Nie ma kosztownej hydratacji Reacta ani pobierania treści z API przed pokazaniem strony.
- Standardowe numery `500600700`, `500 600 700`, `+48 500 600 700` przechodzą walidację.
- Zwykły double click przycisku wysyłki daje jedno żądanie. Powtórzenie eventu programowo daje dwa, ale **nie opisuję tego jako potwierdzonego błędu zwykłego double click**.
- Odpowiedzi 400/429/500 i nie-JSON pokazują błąd, przycisk wraca do działania, pola zachowują treść. Sukces resetuje formularz. Offline daje zrozumiały komunikat.
- Potencjalny HTML w komunikacie serwera jest escapowany; test nie stworzył elementu `<img>` ani nie wykonał skryptu.
- Zakładki reagują na strzałki; FAQ po obsłużeniu zdarzenia `toggle` pozostawia jedno otwarte pytanie. Escape zamyka menu, a Tab krąży po jego linkach.
- Jest skip link, etykiety pól, `aria-live`, duże główne CTA i obsługa `prefers-reduced-motion` dla pulsowania przycisków.
- Nie było żądań do podmiotów trzecich przed interakcją. **Sam brak banera cookies nie jest tutaj potwierdzonym błędem**, skoro opcjonalne trackery nie działają.
- PHP ma whitelistę tematów i hostów, kontrolę Origin, walidację odbiorców e-mail, usuwanie CR/LF, honeypot i cookie sesji z HttpOnly/SameSite. Brak dowodu SQL injection, SSRF, IDOR lub błędu autoryzacji — odpowiednie mechanizmy nie występują w tej aplikacji.
- W aktualnych tekstowych plikach śledzonych nie znaleziono dopasowań do badanych wzorców sekretów. To nie jest certyfikat braku sekretów w całej historii.

## B. Critical Issues — najważniejsze problemy

Nie potwierdzono incydentu o poziomie BLOCKER/CRITICAL w działającej produkcji. Poniższe HIGH powinny zatrzymać bezwarunkową akceptację wydania; krytyczny advisory pakietu opisano oddzielnie od dowodu eksploatacji.

| ID | Problem | Severity | Area | Location | Impact | Recommended Fix |
|---|---|---|---|---|---|---|
| MOB-01 | Ucięta nawigacja przy 768/1024 px | HIGH | Mobile / conversion | `src/components/header.astro:21` | Znikają Kontakt i telefon | Przesunąć pełną nawigację do breakpointu mieszczącego zawartość |
| MOB-02 | Kontakt szerszy od ekranu 320 px | HIGH | Mobile / forms | `src/components/ContactSection.astro:10` | Ucięte pola i treść | Jawna jedna kolumna `minmax(0,1fr)`, `min-w-0`, łamanie e-maila |
| UX-01 | Brak działającej typografii artykułów | HIGH | UX / content | `src/pages/blog/[slug].astro:169` | Treść jest zbitym blokiem | Podłączyć Typography albo własne style artykułu |
| A11Y-01 | Za niski kontrast cen, linków i CTA | HIGH | Accessibility | `src/styles/global.css:82`, `footer.astro:74` | Trudność czytania i wyboru akcji | Oddzielić złoto dekoracyjne od kolorów tekstu i przycisków |
| UX-02 | Słabo czytelny opis na zdjęciu hero | HIGH | UX / conversion | `src/styles/global.css:455` | Oferta nieczytelna na pierwszym ekranie | Mocniejszy lokalny podkład lub osobny panel tekstowy |
| PERF-01 | Mobilne LCP 7,5 s | HIGH | Performance | `src/styles/global.css:463` | Opóźnione pokazanie pierwszego ekranu | Responsywny WebP/AVIF i odpowiedni preload |
| BUG-01 | Brak backendu PHP dla statycznego Vercela | HIGH | Backend / release | `public/contact.php`, `astro.config.mjs` | Formularz może nie wysyłać zgłoszeń | Zapewnić wykonywalny endpoint i test kontraktu per środowisko |
| SEC-01 | 13 podatnych zależności | HIGH | Security / maintenance | `package-lock.json` | Ryzyka build/dev i przyszłych funkcji | Aktualizacja z analizą osiągalności i migracji |
| SEC-02 | Limit antyspamowy zależny od sesji | HIGH | API / abuse | `public/contact.php:45` | Bot omija limit nową sesją | Limit niezależny od cookie, kontrola globalnej liczby wysyłek |
| OPS-01 | Niepełna transakcja wdrożenia i rollback | HIGH | DevOps | `.github/workflows/deploy-cyberfolks.yml:101` | Nieudane wydanie może pozostać aktywne | Wersjonowane wydania, bezpieczne przełączenie i rollback po smoke |
| TEST-01 | Brak automatycznych testów krytycznych flow | HIGH | Testing | `package.json`, `.github/workflows/` | Regresje trafiają do wydania | PR checks: build, typy, kontakt, mobile, linki |

## C–D. Wszystkie znalezione problemy

### 1. Bugs

**BUG-01 — Formularz zależny od hostingu PHP. HIGH; confirmed dla braku konfiguracji, highly likely dla awarii na opisanym statycznym Vercelu.** Lokalizacja: `public/contact.php:1`, `src/scripts/main.js:409`, `astro.config.mjs:5`, `docs/deploy-and-hosting.md:70` i sekcja Vercel. Build kopiuje PHP jako zasób; nie tworzy funkcji serwerowej. W repo nie ma adaptera/funkcji obsługującej POST ani konfiguracji community runtime PHP. Ponadto whitelisty backendu dopuszczają tylko domeny produkcyjne, więc nawet uruchomienie PHP pod localhost/staging bez zmiany konfiguracji skończy się 403. Konsekwencja: wygląd formularza nie dowodzi możliwości kontaktu. Zapewnić właściwy endpoint dla każdego środowiska, jawnie skonfigurować dozwolone hosty i przeprowadzić test dostarczenia na skrzynkę testową. Nie dopisywać wszystkich originów przez `*`. [Dokumentacja runtime Vercela](https://vercel.com/docs/functions/runtimes).

**BUG-02 — Brak granicy oczekiwania na wysyłkę. MEDIUM; confirmed.** Lokalizacja: `src/scripts/main.js:395–448`, handler submit i `fetch`. Żądanie bez odpowiedzi utrzymuje wyłączony przycisk „Wysyłanie...”; nie ma `AbortController`, limitu czasu ani anulowania. Próba z wiszącą odpowiedzią potwierdziła stan. Dodać deadline i informację, że wynik wysyłki może być nieznany; nie ponawiać automatycznie bez deduplikacji po stronie serwera.

**BUG-03 — Niespójna walidacja imienia i telefonu. MEDIUM; confirmed.** Lokalizacja: `src/components/ContactSection.astro:102,120`, `public/contact.php:59–103`. Telefon liczy znaki dopuszczonego formatu, serwer liczy cyfry. `---------` przechodzi przeglądarkę, ale zostanie odrzucone przez PHP. Imię krótsze niż trzy znaki, np. „Li”, jest bez uzasadnienia blokowane. Nie ma `maxlength`; serwer po cichu przycina wartości i nie ogranicza telefonu do rozsądnej maksymalnej liczby cyfr. Ujednolicić normalizację, limity i komunikaty; poprawny kontakt nie powinien zależeć od długości imienia. Obsługiwać nietypowe znaki Unicode. Tablicowe parametry POST należy jawnie odrzucać przed rzutowaniem na string; obecny kod może generować ostrzeżenia PHP — ich ekspozycja zależy od ustawień serwera.

**BUG-04 — Sześć pustych ikon cennika. LOW; confirmed.** Lokalizacja: `src/components/CennikFull.astro:36`, `src/components/cennik.data.js`, `src/scripts/main.js:27`. Cennik żąda `orbit`, `smile`, `circle-dot`, `scissors`, `activity`, `sparkles`, których nie ma w `iconSet`. Konsola zgłasza każde pominięcie. Dodać brakujące importy albo renderować ikonę SVG podczas buildu. Nie importować całego katalogu ikon.

### 2. UX/UI

**UX-01 — Klasy `prose` bez pluginu lub odpowiednich własnych stylów. HIGH; confirmed.** Lokalizacja: `src/pages/blog/[slug].astro:169`, blok artykułu w `src/pages/metamorfozy/korekta-glebokiego-zgryzu-i-stloczen.astro`, `package.json`, `tailwind.config.mjs`. Pomiar: H2 i P mają 16 px/400/margin 0; UL ma `list-style: none`. Dotyczy wszystkich dziewięciu artykułów oraz nienadpisanych elementów opisu metamorfozy. Czytelnik traci hierarchię i strukturę porad. Podłączyć i skonfigurować `@tailwindcss/typography` albo zdefiniować `.article-body`. Samo dodanie klas nie wystarcza. [Dokumentacja rozwiązania Tailwind](https://tailwindcss.com/blog/tailwindcss-typography).

**UX-02 — Treść hero zlewa się ze zdjęciem. HIGH; confirmed wizualnie.** Lokalizacja: `src/components/Hero.astro`, `src/styles/global.css:455–475`; dowód: `home-390.png`, `home-768.png`, `home-1440.png`. Gradient ciemnieje tylko do 26% z lewej, a biały akapit trafia na jasny budynek i jego napisy. `text-shadow` nie daje stabilnego tła. Zastosować wystarczająco ciemny obszar pod tekstem albo przenieść tekst na jednolity panel. Ocenę czytelności potwierdzają oględziny; nie przypisuję całemu zdjęciu jednego wyliczonego współczynnika kontrastu.

**UX-03 — „Całkowity koszt leczenia” pomija składniki. MEDIUM; confirmed.** Lokalizacja: `src/components/cennik.data.js:134–136`. Przykład obejmuje aparat i kontrole, mimo że w tym samym cenniku płatne są diagnostyka, demontaż i retencja. Pacjent może uznać subtotal za pełny koszt. Zmienić tytuł na „Przykład kosztu aparatu i kontroli” lub podać zakres obejmujący wszystkie wymienione etapy, z jawnymi założeniami. Bez obietnicy sztywnej ceny przed badaniem.

**UX-04 — Zamknięcie menu przyciskiem jest poza pętlą Tab. LOW; confirmed.** Lokalizacja: `src/scripts/main.js:144–160`, `src/components/header.astro:38,48`. Fokus krąży po sześciu linkach panelu; X znajduje się poza tym zbiorem. Escape działa, więc nie jest to potwierdzona pułapka klawiaturowa WCAG. Dodać widoczny przycisk zamknięcia w panelu lub uwzględnić przycisk otwierający w spójnym modelu fokusu.

### 3. Mobile

**MOB-01 — Desktopowe menu włącza się za wcześnie. HIGH; confirmed.** Lokalizacja: `src/components/header.astro:11–40`. Przy 768 px lista linków zajmuje x≈414–909, a telefon znajduje się jeszcze dalej. Przy 1024 px telefon sięga x≈1133. W landscape 844×390 ikona menu ma `display:none`, telefon sięga x≈1122. Przyczyną jest przełączenie przez `md:*` mimo stałej szerokości logo, linków, odstępów i telefonu. Dostosować breakpoint do rzeczywistej szerokości treści, np. pełny wariant od 1280 px, albo zaprojektować kompaktowy wariant pośredni. Samo `overflow-x:hidden` maskuje ucięcie.

**MOB-02 — Brak ograniczenia minimalnej szerokości gridu kontaktu. HIGH; confirmed.** Lokalizacja: `src/components/ContactSection.astro:10–11,132`, `src/styles/global.css:502`. Przy 320 px kolumna przyjmuje około 352 px; pola zaczynają się na x=24 i kończą x=376. Źródłem jest automatyczna minimalna szerokość siatki, długi adres e-mail i kontrolka select. Dodać `grid-cols-1`, `min-w-0` do obu dzieci oraz łamanie długiego e-maila. Zweryfikować bez globalnego maskowania overflow. Przy 375–430 px pomiar treści nie wykazał tego ucięcia.

**MOB-03 — Resize pozostawia blokadę przewijania. MEDIUM; confirmed.** Lokalizacja: `src/scripts/main.js:99–120`, `src/components/header.astro:46`. Otworzyć menu przy 390 px, poszerzyć do 1280 px: menu znika przez CSS, `aria-expanded` nadal wynosi true, a body ma `overflow-y:hidden`. Dodać listener zmiany breakpointu wywołujący pełne zamknięcie menu i przywrócenie stanu, z unikaniem fokusu na ukrytym przycisku.

| Szerokość | Wynik pomiarów |
|---:|---|
| 320 | Ucięty kontakt/formularz; osobno sprawdzony screenshot |
| 375 / 390 / 430 | Brak wykrytego overflow treści; problemy kontrastu i hero nadal występują |
| 768 | Nawigacja wychodzi poza ekran na wszystkich wspólnych szablonach |
| 1024 | Przycisk telefonu w nagłówku częściowo poza ekranem |
| 1280 / 1440 / 1920 | Brak wykrytego overflow treści w badanej macierzy |
| Landscape 844×390 | Ten sam błąd pośredniego breakpointu nagłówka |

Dekoracyjne koło w `ProcessSteps` celowo wykracza poza własny obszar i jest przycięte przez rodzica; **nie liczę go jako błędu responsywności**. Powiększenie tekstu/zoom wymaga dodatkowej kontroli na Safari i technologiach asystujących; 320 px sprawdza reflow, ale nie zastępuje wszystkich testów zoomu.

### 4. Performance

**PERF-01 — Za ciężki obraz LCP. HIGH; confirmed.** Lokalizacja: `src/styles/global.css:463`, `src/pages/index.astro:34`, `public/images/orthomedica-hero-building.png`. Plik ma 836 742 B i jest pobierany także na telefonie. Preload istnieje — problemem nie jest jego brak. Zastosować warianty szerokości i nowoczesny format; zachować priorytet tylko właściwego wariantu. Docelowe kryterium odbioru: mobilne LCP <2,5 s w uzgodnionym profilu pomiarowym, następnie kontrola danych rzeczywistych.

**PERF-02 — Niewłaściwa rozdzielczość części obrazów i brak `srcset`. MEDIUM; confirmed.** Lokalizacja: `src/components/header.astro:12`, `src/components/Team.astro`, `src/components/DoctorProfileLayout.astro:68`, obrazy w `src/pages/zabiegi/*`. Logo zębów ma 716×533 i 48 121 B, choć zajmuje około 43×32 CSS px; zdjęcie Aleksandry WebP ma 293 684 B. Występują WebP i lazy loading, lecz nie ma systematycznego doboru wariantu do rozmiaru/DPR. Generować rozmiary podczas buildu i przekazywać `srcset/sizes`; miniatury nie powinny pobierać pełnego portretu.

**PERF-03 — Brak polityki cache i kompresji w repo. MEDIUM; confirmed jako brak konfiguracji, suspected jako problem produkcyjny.** Lokalizacja: `public/.htaccess`, `docs/deploy-and-hosting.md`. Są nagłówki bezpieczeństwa, lecz nie ma jawnych reguł Cache-Control dla hashowanych assetów, fontów i HTML ani konfiguracji kompresji. Hosting może zapewniać to globalnie — nie zmierzono jego odpowiedzi. Ustalić caching `_astro` z `immutable`, krótsze/revalidowane HTML i wersjonowanie obrazów; włączyć kompresję tekstu tam, gdzie brakuje. Ostrzeżenia lokalnego Lighthouse o braku cache i kompresji wynikają również z serwera audytowego i **nie są dowodem błędu CyberFolks**.

**PERF-04 — Stałe animowanie wszystkich głównych przycisków. LOW; confirmed mechanizm, suspected istotny wpływ na baterię.** Lokalizacja: `src/styles/global.css:243–435`. Animowane są tło, cień i pierścień, także dla wielu CTA poniżej pierwszego ekranu. To dodatkowe malowanie bez mierzalnego uzasadnienia biznesowego. Ograniczyć animację do krótkiego, jednorazowego sygnału lub hover/focus. Reduced motion działa; nie zgłaszam braku tej obsługi. Brak dowodu znaczących problemów INP czy memory leak.

### Wyniki wydajności

| Metryka | Mobile — standard | Desktop — standard |
|---|---:|---:|
| Lighthouse Performance | 70/100 | 96/100 |
| FCP | 3,0 s | 0,7 s |
| LCP | 7,5 s | 1,4 s |
| CLS | 0,006 | 0,003 |
| TBT | 0 ms | 0 ms |
| Lighthouse Accessibility | 97/100 | 97/100 |
| Lighthouse SEO | 100/100 | 100/100 |
| Lighthouse Best Practices | 100/100 | 100/100 |

To pojedyncze pomiary laboratoryjne lokalnego artefaktu, nie Core Web Vitals produkcji. Mobile: symulacja RTT 150 ms, przepustowość 1638,4 kb/s, CPU ×4. Desktop: standardowa konfiguracja desktopowa Lighthouse. Wstępny plik `lighthouse-desktop.json` zachował mobilne throttling i został **wyłączony z oceny**; właściwy wynik jest w `lighthouse-desktop-standard.json`.

CSS: **56 019 B**, gzip **10 619 B**. JavaScript: **13 680 B**, gzip **5 609 B**. To mały frontend, więc przepisanie go na inny framework nie rozwiąże głównego problemu. Łańcuch HTML → CSS → lokalne fonty obejmuje trzy rodziny; najpierw poprawić obrazy, potem dobrać ewentualny preload potrzebnych fontów. Brak CDN zewnętrznych fontów/ikon w aktywnej witrynie. Brak realnego pomiaru TTFB hostingu, API latency i INP; TBT=0 nie dowodzi dobrego INP użytkowników. Ostrzeżenie BFCache pochodziło z flag przeglądarki testowej i nie zostało zgłoszone jako błąd kodu.

### 5. SEO

**SEO-01 — Niespójne i błędne dane procedur. MEDIUM; confirmed.** Lokalizacja: `src/pages/zabiegi/aparat-staly-metalowy.astro:18` oraz pozostałe inline JSON-LD w sześciu starszych szablonach; `src/data/schema.ts:99–130`. Aparat metalowy ma `procedureType: "Surgical"`; helper używa nieistniejącej wartości `NonSurgical`. `provider` nie jest właściwością typu MedicalProcedure w jego aktualnej definicji. Sam poprawny JSON nie oznacza poprawnej semantyki. Ujednolicić model MedicalWebPage/terapii, poprawnie łączyć placówkę i używać właściwych enumów, np. URL `https://schema.org/NoninvasiveProcedure` tam, gdzie odpowiada opisowi. [MedicalProcedure](https://schema.org/MedicalProcedure), [MedicalProcedureType](https://schema.org/MedicalProcedureType). Nie obiecuję wzrostu rankingu od samej poprawki schema.

**SEO-02 — Profil osoby oznaczony jako firma. MEDIUM; confirmed.** Lokalizacja: `src/components/DoctorProfileLayout.astro:16–36`, `src/data/schema.ts:81–90`. `Dentist` oznacza encję biznesową/placówkę, podczas gdy `jobTitle` i `worksFor` opisują osobę. Główna strona dodatkowo tworzy lekarza jako `Physician`, bez spójnego odwołania w profilu. Użyć `Person` dla lekarza z właściwym `@id`, a placówki jako `Dentist`; połączyć je przez `worksFor`. [Definicja Dentist](https://schema.org/Dentist).

**SEO-03 — Udostępnienie profilu może pokazać innego lekarza. MEDIUM; confirmed.** Lokalizacja: `src/components/DoctorProfileLayout.astro:42`, `src/layouts/layout.astro:25`, `src/data/site.ts:8`. Layout profilu nie przekazuje `image={absoluteImage}`, więc profile Kamila i Aleksandry dziedziczą zdjęcie Kornelii w Open Graph/Twitter. Dodać obraz właściwej osoby i docelowy format social; brak `og:image:width/height` jest drobnym ulepszeniem, nie blockerem.

**SEO-04 — Osierocona metamorfoza. MEDIUM; confirmed.** Lokalizacja: `src/pages/index.astro:41–52`, `src/components/ProcessMetamorphosesWrapper.astro`, trasa `/metamorfozy/korekta-glebokiego-zgryzu-i-stloczen`. Strona jest w sitemap, ale graf linków osiągalny ze strony głównej do niej nie prowadzi. Samo istnienie pliku komponentu niczego nie renderuje. Po weryfikacji zgody i praw do materiału dodać kontekstowy odnośnik z oferty/leczenia albo świadomie określić status publikacji. Nie zgłaszam jej jako 404 ani strony nieindeksowalnej.

**SEO-05 — Daty i model bloga nie walidują treści. LOW; confirmed mechanizm, highly likely przyszła regresja.** Lokalizacja: `src/pages/blog/index.astro:32`, `src/pages/blog/[slug].astro:44–52`, `src/data/schema.ts:159`. Brak daty jest w listingu zastępowany datą buildu, podczas gdy artykuł używa oryginalnej wartości; `dateModified` zawsze równa się publikacji. Brak schematu treści może dopuścić wadliwe tagi/datę, a wyszukiwanie przez `endsWith(slug + '.md')` pozwala na przyszłe kolizje sufiksów. Aktualne dziewięć wpisów buduje się poprawnie. Wprowadzić walidowane kolekcje treści, dokładną identyfikację slugów i osobne pole aktualizacji, bez sztucznego odświeżania dat.

Canonical i sitemap są zasadniczo spójne, język jest jeden — brak `hreflang` nie jest problemem. Przekierowania 301 istnieją w `.htaccess`, ale faktycznych statusów serwera nie zweryfikowano. Artefakty przekierowań Astro nie zastępują testu 301 na hostingu. Brak danych GSC/CrUX uniemożliwia ocenę faktycznego indeksowania i kanibalizacji zapytań.

### 6. Accessibility

**A11Y-01 — Systemowe naruszenia kontrastu. HIGH; confirmed.** Lokalizacja: `src/styles/global.css:82,243`, `src/components/CennikFull.astro:64–68`, `src/components/OfferGrid.astro`, `src/components/footer.astro:74–78`, małe teksty kontaktu. Złoto `#b2945e` na bieli ma około **2,88:1**, na jasnym tle oferty **2,73:1**; biały tekst WhatsApp na `#25D366` około **1,98:1**. Wymóg dla zwykłego tekstu wynosi 4,5:1; dla odpowiednio dużego 3:1. Przykłady cen mają 18 px i nie spełniają nawet 3:1. Poprawić paletę tekstów, jasność CTA i kontrast drobnych opisów. Kolor logo jest objęty wyjątkiem — automatycznych wskazań dotyczących logotypu nie traktuję jako naruszenia. [WCAG 2.2, kontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum).

**A11Y-02 — Iframe mapy bez nazwy. MEDIUM; confirmed.** Lokalizacja: `src/scripts/main.js:183–188`, `loadGoogleMap`. Po kliknięciu mapa nie ma `title`; axe zgłasza `frame-title`. Dodać np. `title="Mapa dojazdu do ORTHOMEDICA, ul. Pawia 67 w Lubinie"`. Usunięcie klikniętego przycisku przenosi fokus na BODY — zapewnić sensowne miejsce fokusu lub zachować kontrolkę obok mapy.

**A11Y-03 — Linki rozróżniane wyłącznie słabą zmianą koloru. MEDIUM; confirmed.** Lokalizacja: `src/pages/polityka-prywatnosci.astro:111,152`. Linki do Google i UODO nie są podkreślone, a kontrast między kolorem linku a otaczającym tekstem jest około 1,44:1. Axe zgłasza `link-in-text-block`. Podkreślenie w stanie podstawowym rozwiązuje problem identyfikacji linku. W obrębie artykułów efekt zależy również od UX-01.

**A11Y-04 — Globalny focus jest nadpisywany w polach. LOW; confirmed implementacja, niepotwierdzone samodzielne naruszenie AA.** Lokalizacja: `src/styles/global.css:109,502–516`. `.input-field { outline:none }` wygrywa ze wspólną regułą `:focus-visible`. Pole pokazuje tylko zmianę cienkiej ramki na niebieską. Kontrolny test potwierdził focus i kolor ramki po zakończeniu animacji. Przywrócić wyraźny outline zgodny z resztą systemu. Nie zgłaszam całkowitego braku widocznego fokusu, bo ramka się zmienia.

Wynik Lighthouse Accessibility 97 nie oznacza zgodności WCAG AA. Sprawdzono automatycznie kontrast i strukturę, częściowo klawiaturę; pozostaje ręczny test czytnikami ekranu, pełny zoom 200/400%, target spacing, fokus przy sticky elementach i zachowanie Safari. Mały font 9–10 px jest problemem czytelności, ale WCAG nie narzuca prostego minimum typu „16 px dla każdego tekstu”.

### 7. Security

**SEC-01 — Podatne wersje narzędzi i zależności. HIGH; confirmed wersje i advisory; brak potwierdzenia eksploatacji.** Lokalizacja: `package-lock.json`; dowód: `npm-audit.json`. Zgłoszenia obejmują Astro, defu, devalue, esbuild, h3, js-yaml, nanoid, picomatch, postcss, sharp, smol-toml, svgo i vite. Advisory RCE Astro dotyczy przetwarzania niezaufanego AVIF przez Sharp/libheif. Aktualna aplikacja nie oferuje uploadu ani serwerowej optymalizacji obrazów użytkownika, więc nie ma dowodu takiej drogi wejścia. Vite dotyczy przede wszystkim serwera developerskiego. Aktualizować lockfile i sprawdzić cały łańcuch; obecny zakres `^6.0.3` nie przechodzi sam do Astro 7, podczas gdy wskazana poprawka AVIF jest w 7.2.8/Sharp 0.35.4. Nie wykonywać ślepo `audit fix --force`. [Advisory projektu Astro](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2).

**SEC-02 — Ochrona antyspamowa nie jest limitem per napastnik. HIGH; confirmed konstrukcja, highly likely skuteczność obejścia.** Lokalizacja: `public/contact.php:45–51,176`. `contact_last` jest przechowywane wyłącznie w PHPSESSION; klient nieutrzymujący cookie dostaje nową sesję. Brak osobnego limitu IP/globalnego i limit naliczany dopiero po udanej wysyłce. Honeypot nie powstrzyma klienta znającego endpoint. Dodać limity po stronie serwera/proxy, ograniczyć budżet e-maili, logować anomalie bez nadmiaru danych osobowych. Nie przeprowadzano spamowania produkcji.

**SEC-03 — Brak CSP. LOW; confirmed w repo, niezweryfikowane nagłówki produkcji.** Lokalizacja: `public/.htaccess:25–32`. HSTS, nosniff, Referrer-Policy, Permissions-Policy i X-Frame-Options są skonfigurowane, ale CSP brak. To luka w ochronie warstwowej, nie odkryta podatność XSS. Zacząć od Report-Only, uwzględnić zaufane źródła skryptów/stylów, osadzaną mapę, `form-action`, `base-uri` i `object-src`; dopiero po analizie raportów wymuszać politykę.

**SEC-04 — Niepełne ignorowanie plików env. LOW; confirmed.** Lokalizacja: `.gitignore:21–23`. Ignorowane są `.env` i `.env.production`, ale nie `.env.local`, `.env.development`, `.env.staging` itd. Nie znaleziono w nich obecnego wycieku; to ryzyko przyszłego commita. Przyjąć `.env*` z wyjątkiem `.env.example` oraz secret scanning w CI. Publiczne identyfikatory analytics/GSC nie są sekretami.

### 8. Privacy

**PRI-01 — Aktywowanej mapy nie można wyłączyć w interfejsie. MEDIUM; confirmed.** Lokalizacja: `src/scripts/main.js:186–193`, `src/components/ContactSection.astro:167–184`. Kliknięcie niszczy placeholder i uruchamia iframe, ale nie zostawia przełącznika wyłączenia. Nie ma zapamiętanej zgody — po przejściu na nową stronę mapa ponownie jest zablokowana. Dodać jawną informację o połączeniu z Google, kontrolkę „Wyłącz mapę” oraz alternatywny link dojazdu. Usunięcie iframe ogranicza dalsze połączenia; nie usuwa danych już przekazanych Google. Brak oceny prawnej, że sam ten mechanizm przesądza o niezgodności RODO.

**PRI-02 — Nieprecyzyjny opis retencji i kanałów kontaktu. MEDIUM; confirmed treść, highly likely luka operacyjna.** Lokalizacja: `src/pages/polityka-prywatnosci.astro:96–138`, `public/contact.php:139–150`. Dokument mówi ogólnie o dokumentacji medycznej, logach „zwykle krótszych” i mapie; endpoint wysyła również IP, telefon i kategorię wizyty e-mailem. Brak jasnego okresu/kryterium dla nieprzekształconych w pacjenta zapytań i opisu roli WhatsApp. Uzgodnić faktyczną retencję skrzynki, dostęp pracowników i dostawców; dopasować dokument do rzeczywistych procesów. Nie wymyślać obowiązkowego checkboxa marketingowego dla zwykłej prośby o kontakt.

### 9. Analytics

**ANA-01 — Brak mierzalnego lejka kontaktu. MEDIUM; confirmed brak, nieoszacowana strata.** Lokalizacja: `src/scripts/main.js:340–448`, `src/layouts/layout.astro:17`, `.env.example:2–3`. Nie ma inicjalizacji GA4/Meta ani zdarzeń lead, tel, WhatsApp, błędów formularza. Zmienne PUBLIC_GA/PUBLIC_FB niczego nie włączają. Nie znaleziono duplikowanych zdarzeń, ponieważ zdarzeń brak. Zaprojektować minimalny pomiar dopiero z właściwym modelem prywatności: sukces potwierdzony przez backend, błąd, klik tel i WhatsApp; bez imienia, numeru ani wrażliwej kategorii wizyty w narzędziach marketingowych. Kliknięcie numeru nie oznacza odebranej rozmowy; kliknięcie WhatsApp nie oznacza wysłanej wiadomości.

### 10. Code quality

**CODE-01 — Pięć błędów kontroli typów. MEDIUM; confirmed.** Lokalizacja: `src/components/CennikFull.astro:4,53,55,60`; dane w `src/components/cennik.data.js`. Parametr `price` ma implicit any, a niejednorodna tablica nie gwarantuje właściwości `tag` i `note`. Build przechodzi, kontrola typów kończy się kodem 1. Zdefiniować dyskryminowane typy sekcji i wspólny typ pozycji z polami opcjonalnymi; dołączyć kontrolę typów do CI. Nie przykrywać problemu `any`.

**CODE-02 — Nieużywane komponenty, dane i zasoby. LOW; confirmed dla osiągalności obecnej witryny.** Lokalizacja: `src/components/Testimonials.astro`, `ProcessMetamorphosesWrapper.astro`, pośrednio `Metamorphoses.astro`, `src/data/googleReviews.ts`, `scripts/fetch-google-reviews.mjs:73`. Wrapper nie jest importowany przez stronę; Testimonials również. Plik generowany przez Places nie jest używany nawet przez niepodłączony Testimonials. Dwanaście obrazów o łącznym rozmiarze około 7,47 MB nie ma referencji w aktualnym zbudowanym HTML/CSS/JS. Nie są pobierane na zwykłym wejściu — zwiększają artefakt, nie bieżący transfer strony. Ustalić archiwizację lub przywrócenie funkcji; **niczego nie usunięto**.

**CODE-03 — Stare skrypty migracyjne nie są bezpieczne do ponownego użycia. LOW; confirmed z analizy.** Lokalizacja: `scripts/fix-zabiegi-procedure-schema.mjs:18–38`, `scripts/fix-zabiegi-schema.mjs:13–20`. Zastępowanie importu Footer może dodać kolejny import przy ponownym uruchomieniu, a część dopasowań wymaga starego hosta `www` lub poprzedniej postaci canonical. Skrypt może częściowo zmienić plik albo go pominąć. Oznaczyć je jako jednorazowe migracje, dodać preconditions/dry-run lub zastąpić transformacją AST przed dalszym użyciem. Podczas audytu ich nie uruchamiano.

### 11. Architecture

**ARCH-01 — Dane i szablony są częściowo scentralizowane, częściowo kopiowane. MEDIUM; confirmed.** Lokalizacja: `src/data/site.ts`, `src/data/schema.ts`, inline schema w `src/pages/zabiegi/*`, `src/components/cennik.data.js:411`, `src/data/contactForm.ts`, `public/contact.php:79`. Telefony/adresy i schema nadal występują w wielu kopiach; skrót cen jest odrębną tablicą, a enum formularza trzeba ręcznie synchronizować z PHP. Skutkiem już są rozbieżne modele schema; przyszłe zmiany cen mogą się rozjechać. Wprowadzić wspólny szablon zabiegu, generowany kontrakt tematów i skrót cen wyprowadzany z tych samych rekordów. Zachować Astro SSG — nie ma uzasadnienia dla pełnego SPA, rozbudowanego auth ani bazy danych tylko dla strony informacyjnej.

### 12. Backend/API

**API-01 — Sukces `mail()` nie dowodzi dostarczenia zgłoszenia. MEDIUM; confirmed mechanizm, niepotwierdzona utrata zgłoszeń.** Lokalizacja: `public/contact.php:165–178`. `@mail` ukrywa ostrzeżenia, brak identyfikatora wiadomości, trwałego statusu i kontroli bounce. Użytkownik dostaje sukces po przyjęciu do lokalnej wysyłki, a nie po dostarczeniu do rejestracji. Dodać kontrolowany transport SMTP/usługę pocztową, minimalny log techniczny i monitoring błędów; ustalić bezpieczną retencję. Nie gromadzić dodatkowo danych medycznych bez potrzeby. [Dokumentacja PHP mail](https://www.php.net/manual/en/function.mail.php).

Endpoint zwraca 405 dla innych metod, 403 dla niedozwolonego hosta/originu, 400 dla walidacji, 429 dla odstępu sesyjnego, 500 dla błędu konfiguracji lub `mail`. Frontend obsługuje te odpowiedzi. Brakuje limitu czasu i ochrony niezależnej od sesji — BUG-02 i SEC-02. Automatyczne retry POST bez idempotencji byłoby ryzykowne. Autoryzacja, N+1, paginacja API i SQL nie mają zastosowania.

### 13. Database

**Nie dotyczy.** Nie znaleziono bazy ani schematu. Nie należy tworzyć fikcyjnych ustaleń o indeksach czy migracjach. Sesja PHP i skrzynka e-mail to rzeczywiste miejsca utrwalania danych; potrzebują polityki operacyjnej, ale nie audytu SQL.

### 14. Testing

**TEST-01 — Brak ochrony regresyjnej. HIGH; confirmed w repo.** Lokalizacja: `package.json:8–14`, `.github/workflows/`. Nie ma projektu unit/integration/E2E, skryptu testów, lint/typecheck w procesie PR ani budżetu performance. Ręczny workflow sprawdza istnienie kilku artefaktów i podstawowe GET-y. To nie wykryje nieobsługiwanego PHP, overflow, kontrastu, błędów typów ani braku ikon. Wprowadzić mały zestaw testów opisany dalej; unikać testów odtwarzających wyłącznie implementację.

### 15. DevOps

**OPS-01 — Wdrożenie nie gwarantuje odtworzenia sprawnej wersji. HIGH; confirmed konstrukcja, highly likely awaria przy przerwaniu.** Lokalizacja: `.github/workflows/deploy-cyberfolks.yml:24,90–114`. Obecny workflow tworzy release i backup — dokumentacja nie oddaje tej poprawy. Jednak najpierw usuwa poprzedni backup, następnie przenosi `public_html`, potem release. Między operacjami katalog produkcyjny nie istnieje; cancellation może przerwać sekwencję. Nieudany późniejszy smoke test nie uruchamia rollbacku. Dodać wersjonowane katalogi i pojedyncze przełączenie tam, gdzie hosting to obsługuje; wyłączyć anulowanie krytycznej sekcji i przywracać wersję po nieudanym smoke. Zachować ostatnie sprawne wydania według jawnej retencji.

**OPS-02 — Domyślne wdrożenie zastępuje stronę holdingiem. MEDIUM; confirmed konfiguracja, suspected pomyłka operatora.** Lokalizacja: `.github/workflows/deploy-cyberfolks.yml:13–17`, `deploy/cyberfolks-holding/index.html`. `holding` jest pierwszą/domyslną opcją. Ten pakiet nie zawiera `.htaccess`, robots ani sitemap, a korzysta z zewnętrznych Google Fonts. Jego uruchomienie zastępuje pełny katalog; tracone są też reguły redirectów i nagłówki z tego katalogu, o ile nie zapewnia ich hosting. Rozdzielić awaryjny holding od normalnego wydania, jasno oznaczyć produkcyjne środowisko, określić statusy maintenance i zachowanie SEO. Brak dowodu, że obecnie holding jest wdrożony.

**OPS-03 — Tożsamość serwera SSH pobierana w chwili deploymentu. MEDIUM; confirmed.** Lokalizacja: `.github/workflows/deploy-cyberfolks.yml:85–91`. `ssh-keyscan` zasila known_hosts bez porównania z wcześniej zaufanym fingerprintem; `accept-new` nie usuwa ryzyka pierwszego połączenia. Przypiąć uprzednio zweryfikowany klucz hosta w chronionej konfiguracji. Nie wykryto ataku MITM; to naprawa sposobu ustanawiania zaufania.

**OPS-04 — Dokumentacja nie nadaje się do pewnego odtworzenia wdrożenia. MEDIUM; confirmed.** Lokalizacja: `README.md`, `docs/project-context.md`, `docs/deploy-and-hosting.md`. README pozostaje starterem Astro z niezwiązanym skryptem Steam; kontekst wskazuje nieistniejący `public/main.js`, CDN Lucide/Google Fonts oraz consent analytics, których aktywny kod nie ma. Opis deployu mówi o czyszczeniu/nadpisywaniu starego katalogu, podczas gdy workflow operuje na release/backup. Zaktualizować instrukcję do faktycznego kodu, ustalić PHP, host, branch, zmienne, rollback i test poczty. Ustawienia branch protection, alertów i stagingu poza repo pozostają nieznane — nie twierdzę, że na pewno ich nie ma.

### 16. Content

**CONTENT-01 — Nieprawidłowe oznaczenie ustawy. MEDIUM; confirmed.** Lokalizacja: `src/data/site.ts:75,87`, renderowane przez `src/pages/informacje-dla-pacjentow.astro:82`. Tekst wskazuje „ustawę z dnia 15 kwietnia 2011 r. o wyrobach medycznych”. Właściwy akt o wyrobach medycznych ma datę **7 kwietnia 2022 r.**; 15 kwietnia 2011 dotyczy działalności leczniczej. Poprawić odwołanie i zweryfikować cały blok z osobą odpowiedzialną za treści prawne. Nie traktować ogólnego zapewnienia o informacyjnym charakterze strony jako dowodu zgodności wszystkich reklam i materiałów. [ELI — ustawa o wyrobach medycznych](https://eli.gov.pl/eli/DU/2022/974/ogl).

**CONTENT-02 — Drobny błąd językowy i powtarzalne poradniki. LOW; confirmed błąd, suspected efekt SEO.** Lokalizacja: `src/components/ContactSection.astro:157–160`; `src/content/blog/aparat-staly-jak-dbac-o-zeby.md` i `higiena-zebow-z-aparatem-stalym-10-zasad.md`. Po „zapoznanie się z” powinno być „polityką prywatności”. Dwa krótkie artykuły o higienie mają zbliżoną intencję i powtarzają porady, ale nie są identycznymi dokumentami. Nadać im różne zadania redakcyjne albo rozważyć połączenie z redirectem po analizie GSC; bez danych nie można potwierdzić kanibalizacji. Brak bibliografii i informacji o przeglądzie medycznym osłabia możliwość weryfikacji, nie dowodzi fałszywości porad.

### 17. Conversion

**CONV-01 — Pacjent nie dowiaduje się, kiedy nastąpi odpowiedź. MEDIUM; confirmed brak, suspected spadek konwersji.** Lokalizacja: `src/components/ContactSection.astro:14–15,77–79`, komunikat sukcesu `public/contact.php:178`. Są godziny pracy i informacja, że rejestracja sprawdzi terminy, lecz brak uzgodnionego czasu odpowiedzi i jasnego następnego kroku po wysłaniu. Dodać konkretną, prawdziwą informację operacyjną: kto oddzwoni, w jakich godzinach i że wysłanie nie rezerwuje terminu. Nie wymyślać SLA bez uzgodnienia z rejestracją.

**CONV-02 — Niewykorzystane dowody zaufania i kontekst zapytania. MEDIUM; confirmed brak funkcji, suspected skala wpływu.** Lokalizacja: `src/pages/index.astro:41–52`, `src/components/Testimonials.astro`, `src/pages/zabiegi/*` i `src/components/ContactSection.astro:132`. Istnieją profile lekarzy, adres i cennik, ale opinie nie są pokazywane, metamorfoza nie jest dostępna z aktywnej nawigacji, a CTA zabiegu wraca do ogólnego formularza bez ustawienia tematu. Dodać zweryfikowane materiały zaufania i przenieść kontekst wybranej usługi do formularza; nie dopisywać fikcyjnych ocen ani przypadków. Niepodłączone opinie mają ponadto daty „tydzień temu”/„2 miesiące temu” zapisane na stałe — poprawić je przed ponowną publikacją.

### Perspektywa nowego pacjenta

| Myśl użytkownika | Konkretne miejsce | Odpowiedź projektowa |
|---|---|---|
| „Nie rozumiem” | Opis na jasnym zdjęciu; nieostylowane artykuły | Czytelne hero i prawdziwa hierarchia tekstu |
| „Nie ufam temu” | Błędny akt prawny; brak widocznych opinii; inny lekarz w podglądzie linku | Poprawne dane i materiały z podanym źródłem |
| „Nie wiem co dalej” | Sukces formularza bez ram odpowiedzi | Wyjaśnić kontakt zwrotny i potwierdzenie terminu |
| „To chyba nie dla mnie” | Ogólny formularz po wejściu z konkretnego zabiegu | Ustawić temat i krótkie przypomnienie usługi |
| „Za dużo roboty” | Tablet bez Kontakt/telefonu; kontakt ucięty na 320 px | Naprawić układ przed dodawaniem nowych funkcji |
| „Nie widzę wartości” | Cennik opisuje „całość”, ale pomija etapy | Przejrzysty zakres ceny i spójna ścieżka leczenia |

## Audyt design systemu

System istnieje częściowo: wspólne kolory, Montserrat/Cinzel/Playfair, utility spacing, `.btn-gold`, `.input-field` oraz wspólny nagłówek/stopka. Brakuje semantycznych tokenów rozdzielających kolor dekoracji, tekstu, ceny, CTA i informacji pomocniczych. Kolory są kopiowane w Tailwind, CSS i inline hex. Promienie przechodzą od `rounded-lg` przez `rounded-3xl`, `rounded-[2rem]` do `rounded-full`; różne użycia nie są same w sobie błędem, ale brakuje spisanej reguły ich doboru.

Priorytet systemowy: zdefiniować dostępne pary kolorów, jeden komponent CTA z wariantami, wspólny focus, styl treści artykułowej i stabilne breakpointy nagłówka. Globalna zmiana font-weight na złotym tekście nie rozwiązuje kontrastu. Nie ma potrzeby budować rozbudowanego systemu modali, bo strona ich obecnie nie ma.

## Martwy i zbędny kod — rozróżnienie

| Element | Dowód / status | Zalecenie |
|---|---|---|
| Testimonials + googleReviews | Nieosiągalne z aktywnych stron | Zdecydować o publikacji po weryfikacji źródła |
| ProcessMetamorphosesWrapper → Metamorphoses | Wrapper nieimportowany przez strony | Przywrócić świadomie albo archiwizować |
| Kod slidera w main.js | Brak aktywnego `.ba-container` w renderowanych stronach | Wyprowadzić do komponentu, jeżeli wróci |
| `Number(aria-valuenow) || 50` w sliderze | Dla wartości 0 następna strzałka liczy od 50 | Użyć `Number.isFinite`; błąd uśpiony, nie obecna awaria pacjenta |
| `medicalProcedureJsonLd` | Brak użycia w aktywnych stronach; pozostały inline kopie | Ujednolicić model zamiast utrzymywać dwa warianty |
| PUBLIC_GA / PUBLIC_FB | Obecne tylko jako deklaracje/dokumentacja | Usunąć mylące instrukcje lub wdrożyć świadomy pomiar |
| 12 nieużywanych obrazów | Brak referencji w wynikowym HTML/CSS/JS | Archiwizacja po akceptacji; nie kasowano |
| Skrypt Steam i jego raporty/CSV | Niezwiązane z witryną, nie trafiają do standardowego buildu | Przenieść do odpowiedniego projektu po ustaleniu właściciela |
| Stare audyty / oferta CSV / import Issues | Materiały operacyjne, nie kod runtime | Nie usuwać jako „martwy kod” |

Nieużywane obrazy: `hero-bg.jpg`, `hero-bg.webp`, `hero-kids.svg`, `orthomedica-building-hero-sunny.png`, `orthomedica-hero-building-clean.png`, PNG dwóch lekarzy, `logo.png`, PNG przed/po, `renata-rumin.png`, `sylwia-szych.png`. Brak referencji nie wyklucza zewnętrznych hotlinków lub przyszłych planów publikacji.

## Zależności

| Główna zależność | Zainstalowana | Wanted / latest w dniu audytu | Ocena |
|---|---:|---|---|
| Astro | 6.0.3 | 6.4.8 / 7.3.2 | Potrzebna; wymaga zaplanowanej aktualizacji bezpieczeństwa |
| @astrojs/sitemap | 3.7.2 | 3.7.4 / 3.7.4 | Potrzebna, aktualizacja zgodna z zakresem |
| Tailwind | 4.2.1 | 4.3.3 / 4.3.3 | Potrzebna; brak Typography w obecnej konfiguracji |
| @tailwindcss/vite | 4.2.1 | 4.3.3 / 4.3.3 | Potrzebna; aktualizować razem z Tailwind |
| Lucide | 0.577.0 | 0.577.0 / 1.43.0 | Mały wynikowy bundle; naprawić whitelistę ikon, sprawdzić migrację API |

Nie znaleziono oznaczeń `deprecated` w lockfile. Nie ma podstaw do uznania wszystkich głównych bibliotek za zbędne lub nieutrzymywane. `npm ls` wykazał dwa dodatkowe lokalne pakiety extraneous (`@emnapi/runtime`, `tslib`), co wskazuje na różnicę między instalacją roboczą a deklaracją; nie jest dowodem podwójnego JS dla pacjenta. `.npmrc` ustawia `legacy-peer-deps=true`, dlatego konflikty peer dependencies są ignorowane; przy aktualizacji najpierw ustalić, czy to obejście wciąż jest potrzebne. Wyniki wersji i advisory są migawką, nie stałą rekomendacją na przyszłość.

## E. Quick wins

| Fix | Effort | Impact | Priority |
|---|---:|---:|---:|
| Poprawić breakpoint nagłówka | S | Very High | P1 |
| Ograniczyć grid kontaktu i łamać długi e-mail | XS | Very High | P1 |
| Przywrócić style artykułów | S | High | P1 |
| Poprawić kontrast złota i WhatsApp | S | Very High | P1 |
| Zoptymalizować hero i jego wariant mobilny | S | Very High | P1 |
| Dodać timeout + jasny błąd wysyłki | S | High | P1 |
| Dodać 6 brakujących ikon | XS | Medium | P2 |
| Zamykać menu po zmianie breakpointu | XS | Medium | P1 |
| Naprawić OG obrazów lekarzy | XS | Medium | P2 |
| Poprawić nazwę ustawy i odmianę „polityką” | XS | Medium | P1/P3 |
| Dodać title iframe i podkreślenia linków | XS | Medium | P1 |
| Zmienić tytuł niepełnego „całkowitego kosztu” | XS | High | P1 |
| Naprawić model typów cennika | S | Medium | P2 |
| Uaktualnić dokumentację operacyjną | S | High | P1 |

XS/S/M/L/XL oznaczają względny zakres, nie czas. Aktualizacja głównego frameworka, transport poczty i przebudowa wydania wymagają osobnego planu i nie powinny być sprzedawane jako proste automatyczne „fix all”.

## F. Priorytetyzacja

### P0 — natychmiastowa weryfikacja blokad wydania

- Potwierdzić dostępność domeny z niezależnego środowiska i aktualny docelowy hosting. Jeśli domena rzeczywiście nie rozwiązuje się publicznie, to BLOCKER do przywrócenia DNS; obecny audyt nie rozstrzyga tego globalnie.
- Potwierdzić wykonanie PHP i odbiór kontrolnego zgłoszenia na skrzynce testowej. Jeżeli użytkownicy trafiają na statyczny Vercel bez endpointu, przywrócić sprawny kanał formularza przed wydaniem.
- Przeprowadzić triage SEC-01; niezaufane obrazy lub publicznie wystawiony dev server podnoszą pilność. Nie zatwierdzać nowych funkcji używających zagrożonych ścieżek bez aktualizacji.
- Zabezpieczyć możliwość powrotu do sprawnej wersji przed kolejnym deploymentem.

### P1 — przed kolejnym releasem

MOB-01/02/03, UX-01/02/03, A11Y-01/02/03, PERF-01, BUG-01/02, SEC-02, OPS-01/02, podstawowe TEST-01, CONTENT-01 oraz instrukcja obsługi środowisk. To zestaw przywracający czytelny i sprawdzalny kontakt.

### P2 — najbliższe iteracje

CODE-01, ARCH-01, SEO-01/02/03/04/05, PERF-02/03, SEC-03/04, PRI-01/02, ANA-01, API-01, OPS-03, dopracowanie komunikatu sukcesu i kontekstu CTA. Część tematów, np. kontrakt backendu i rollback, należy rozpocząć już w P1.

### P3 — polish i porządkowanie

BUG-04, UX-04, A11Y-04, PERF-04, CODE-02/03, drobna redakcja i archiwizacja materiałów. Archiwizacja/usuwanie wymaga osobnej decyzji zgodnie z zasadami repo.

## G. Roadmapa napraw

| Etap | Zakres | Rozmiar | Kryterium zakończenia |
|---|---|---|---|
| 1. Critical fixes | Środowiska, endpoint i odbiór wiadomości, triage podatności, limit antyspamowy, bezpieczne wydanie | L | Udokumentowany hosting, test poczty i przećwiczony rollback |
| 2. UX / performance / conversion | Nawigacja, kontakt 320 px, blog, hero, kontrast, timeout, koszty i następny krok | M | Brak clippingu w macierzy; czytelny kontakt; poprawa LCP potwierdzona pomiarem |
| 3. Code cleanup / architecture | Typy cennika, wspólny szablon usług, kontrakt PHP, model treści, testy PR, dokumentacja | L | Typecheck i testy krytyczne przechodzą; jedno źródło cen i tematów |
| 4. SEO / accessibility / polish | Schema, OG, linkowanie metamorfozy, mapa, czytniki ekranu, aktualizacja treści, świadomy pomiar | M | Poprawne dane, ręczny odbiór dostępności, rzetelne zdarzenia kontaktowe |

Kontrast i dostępność krytycznych akcji są już częścią etapu 2; nie należy odkładać ich do końcowego „polish”. Fundamentalna zmiana powinna dotyczyć obsługi leadów i procesu wydania, nie zamiany Astro na cięższy framework.

## H. Najważniejsze scenariusze testowe

| Scenariusz | Oczekiwany wynik | Warstwa |
|---|---|---|
| Build + typy + wszystkie trasy | Brak błędów, 31 stron treści i prawidłowe redirecty | CI |
| Formularz na rzeczywistym stagingu | Poprawny JSON i wiadomość w skrzynce testowej | Integracja PHP/SMTP |
| Standardowe formaty telefonu, krótkie imię, Unicode | Spójne reguły klienta i serwera, bez niepotrzebnej odmowy | Unit + integracja |
| Same myślniki, same spacje, zbyt długie wartości, parametry tablicowe | Kontrolowane 400; brak warningów w odpowiedzi | API |
| Nieznany temat / pusty temat | Kontrolowane 400 | API |
| GET, zły Host/Origin | Odpowiednio 405/403; dozwolony staging działa | API |
| Dwa szybkie kliknięcia | Jedno zgłoszenie; bez utraty stanu | E2E |
| Timeout, offline, 500, HTML zamiast JSON | Przycisk wraca do działania, treść zachowana, jasny komunikat | E2E |
| Tekst błędu zawierający HTML | Wyświetlenie jako tekst, bez wykonania | E2E |
| Brak cookie / wiele nowych sesji | Limit nadal chroni wysyłkę | Integracja, wyłącznie lokalnie/staging |
| 320–1920 px, zwłaszcza 768/1024 | Nawigacja i cały kontakt widoczne | E2E geometry + visual |
| Otwarcie menu i zmiana breakpointu | Przywrócone przewijanie, fokus, aria | E2E |
| Menu, zakładki, FAQ wyłącznie klawiaturą | Logiczny fokus i stan kontrolek | E2E + ręcznie |
| Mapa przed/po aktywacji i wyłączeniu | Brak połączeń przed aktywacją, title, możliwość wyłączenia | E2E |
| Chrome + Safari/iOS + czytnik ekranu | Brak utraty treści i funkcji, zoom 200/400% | Ręcznie |
| Blog: H2, akapity, listy, linki | Rzeczywista hierarchia wizualna | Visual |
| Brak/awaria zdjęcia i wolny obraz | Tekst i CTA pozostają czytelne | E2E |
| WWW/HTTP/trailing slash/stare adresy | Docelowy URL po prawdziwym 301, bez pętli | Hosting |
| Nieistniejąca trasa | Rzeczywisty status 404 z użyteczną stroną | Hosting |
| Canonical/OG/JSON-LD | Właściwa strona i właściwy lekarz | Statyczne |
| Nieudany smoke test po release | Automatyczny, zweryfikowany rollback | Staging/DevOps |
| Lighthouse mobile + budżet obrazu | Brak regresji LCP, rozmiaru transferu i CLS | CI/lab |

Testy tysięcy wyników, wygasłej sesji użytkownika, checkoutu, uploadu i paginacji nie mają zastosowania do obecnych funkcji. Dla rozwoju bloga potrzebne będą przypadki 0/1/wielu wpisów i walidacja danych; obecna strona nie posiada filtrów ani wyszukiwarki.

## I. Scoring

Oceny są ekspercką oceną aktualnej implementacji, nie wynikiem automatycznego kalkulatora ani certyfikacją produkcji.

| Obszar | Ocena /10 | Uzasadnienie |
|---|---:|---|
| Functionality | 6 | Strony działają, ale backend hostingu niepotwierdzony i brak timeoutu |
| UX | 5 | Jasna podstawowa oferta, słaba czytelność hero i artykułów |
| UI consistency | 5 | Wspólna estetyka, niespójne zachowanie typografii i kolorów |
| Mobile | 4 | Dwa istotne zakresy szerokości psują kluczowe flow |
| Performance | 5 | Mały JS i niski CLS; mobilne LCP zdecydowanie zbyt wysokie |
| SEO | 7 | Dobry SSG/meta/sitemap, błędy semantyki i osierocony materiał |
| Accessibility | 4 | Dobre podstawy semantyki, systemowe problemy kontrastu |
| Security | 5 | Mała powierzchnia aplikacji, zależności i antyspam do poprawy |
| Code quality | 5 | Czytelny kod, błędy typów, kopie danych i uśpione fragmenty |
| Architecture | 6 | Odpowiednie SSG; niespójny kontrakt frontend/backend |
| Maintainability | 5 | Mały projekt, lecz dokumentacja i źródła danych się rozchodzą |
| Testing | 1 | Brak istniejących automatycznych testów kluczowych ścieżek |
| Conversion readiness | 5 | Są kanały kontaktu i ceny, ale mobile, czytelność i pomiar zawodzą |
| Production readiness | 4 | Brak dowodu doręczeń i pełnego odbioru hostingu/rollbacku |

**Overall score: 5,0/10.** Największą poprawę da usunięcie kilku systemowych usterek, a nie dodawanie nowych sekcji czy technologii. Ocena produkcji jest warunkowa do chwili sprawdzenia domeny, PHP, poczty i rzeczywistych nagłówków.

## J. Dowody i odtwarzalność

Wszystkie ścieżki poniżej są względem głównego katalogu repozytorium. Dowody pozostawiono lokalnie w ignorowanym `output/audit-2026-09-09/`:

- `runtime.json` — trasy, linki, obrazy, konsola, 54 pierwsze pomiary szerokości;
- `deep-runtime.json` — scenariusze formularza, 288 pomiarów, axe i testy interakcji;
- `verification.json` — stabilna weryfikacja FAQ, double click, kontaktu 320 px, fokusu i cennika;
- `static-analysis.json` — lokalizacje kodu, osiągalność stron, nieużywane komponenty, wynik skanu wzorców sekretów;
- `astro-check.txt` — pięć błędów typów w kodzie aplikacji;
- `npm-audit.json`, `npm-outdated.json` — migawka zależności i advisory;
- `lighthouse-mobile.json`, `lighthouse-desktop-standard.json` — właściwe pomiary wydajności;
- `home-320.png`, `home-390.png`, `home-768.png`, `home-1024.png`, `home-1440.png`, `contact-320.png`, `blog-1280.png` — zrzuty dowodowe;
- `probe.cjs`, `deep-probe.cjs`, `verify.cjs`, `static-probe.cjs` — pomocnicze skrypty odtworzenia audytu, bez zmian w źródłach produktu.

Wstępny odczyt FAQ z `deep-runtime.json` nastąpił przed obsługą asynchronicznego `toggle`; późniejsza stabilna weryfikacja wykazała **jedno** otwarte pytanie. Wstępne pomiary kotwicy/fokusu w trakcie przejść również nie zostały użyte jako dowód błędu. Automatyczne wskazania kontrastu mogą obejmować wyjątki logotypu i przejściowe kolory — raport opiera się na powtarzalnych przykładach tekstu użytkowego. Żadnego z tych szumów pomiarowych nie doliczono do listy awarii.

Linki zewnętrzne do praw pacjenta, Google Privacy i UODO dały się odczytać. `www.rpp.gov.pl` zakończyło próbę timeoutem — wymaga ponownej kontroli, nie zostało zaklasyfikowane jako potwierdzony broken link. Konstrukcja `tel:`, `mailto:` i `wa.me` jest poprawna składniowo; rejestracji numeru WhatsApp i faktycznego odbioru kontaktu nie potwierdzono.
