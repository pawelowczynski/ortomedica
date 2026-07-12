# Audyt SEO lokalnego — ORTHOMEDICA Lubin

Data audytu: 11 lipca 2026
Domena docelowa: `https://orthomedica.lubin.pl`
Zakres: SEO techniczne, lokalne SEO, architektura informacji, treść, dane strukturalne i plan wdrożenia.

## Werdykt

W repozytorium projekt ma dobrą bazę do lokalnego SEO: 31 stron indeksowalnych, spójne adresy kanoniczne, 15 stron usługowych, blog, dane gabinetu i lokalne sygnały Lubina. Najważniejszy problem jest operacyjny: publiczna domena nadal zwraca stronę holdingową, a `robots.txt`, sitemapę i strony usługowe zwracają 404. Do czasu wdrożenia właściwego buildu nie ma realnej widoczności organicznej.

Po wdrożeniu priorytetem powinno być zbudowanie jednej silnej encji lokalnej (Google Business Profile + strona + spójny NAP), a nie tworzenie wielu cienkich stron typu „ortodonta [miasto]”.

## Dowody i priorytety

| Priorytet | Ustalenie | Wpływ | Zalecenie |
|---|---|---|---|
| P0 | `orthomedica.lubin.pl/` i `www.orthomedica.lubin.pl/` odpowiadają stroną holdingową; wariant www nie przekierowuje do kanonicznego hosta | blokuje indeksację i konsolidację sygnałów | wdrożyć pełny build i wymusić 301 `www` → bez `www` oraz HTTP → HTTPS |
| P0 | Publiczne `/robots.txt`, `/sitemap-index.xml` i `/zabiegi/ortodoncja` zwracają 404 | crawler nie dostaje mapy i nie może wejść w kluczowe landing pages | po deployu sprawdzić status 200, treść, nagłówki i sitemapę w GSC |
| P1 | W kodzie jest 31 stron indeksowalnych; wszystkie mają title, description, canonical i dokładnie jeden H1 | dobra baza techniczna | utrzymać test regresyjny w CI |
| P1 | 4 strony informacyjne/legalne nie mają JSON-LD | mały wpływ na lokalną widoczność | nie dodawać sztucznego schema; opcjonalnie dodać `OfferCatalog` na cenniku |
| P1 | Strony usługowe konkurują o część fraz ortodontycznych | ryzyko kanibalizacji | przypisać jedną intencję do każdego URL i linkować ją z hubu ortodoncji |
| P1 | Brak dostępu do GSC i Google Business Profile | brak danych o zapytaniach, mapach i konwersjach | uzyskać dostęp po akceptacji klienta |
| P2 | Artykuły blogowe są nierówne długością i dowodami | słabsze E-E-A-T/YMYL | rozbudować tylko tematy wspierające usługi i podpisywać przegląd medyczny |

## Mapa intencji lokalnych

| URL | Główna intencja | Fraza główna | Wsparcie i CTA |
|---|---|---|---|
| `/` | gabinet/ortodonta w mieście | ortodonta Lubin, ortodoncja Lubin | adres, dojazd, godziny, „Umów konsultację” |
| `/zabiegi/ortodoncja` | leczenie ortodontyczne dorosłych | ortodoncja Lubin | konsultacja ortodontyczna, aparat, plan leczenia |
| `/zabiegi/ortodoncja-dziecieca` | leczenie dzieci | ortodonta dziecięcy Lubin, ortodoncja dziecięca Lubin | pierwsza wizyta dziecka, wiek, rejestracja |
| `/zabiegi/stomatologia-i-ortodoncja-dziecieca` | stomatologia dziecięca | stomatolog dziecięcy Lubin | profilaktyka, leczenie, przygotowanie dziecka |
| `/zabiegi/aparat-staly-metalowy` | aparat metalowy | aparat stały metalowy Lubin | kwalifikacja, cena z cennika, konsultacja |
| `/zabiegi/aparat-staly-ceramiczny` | aparat estetyczny | aparat ceramiczny Lubin | dla kogo, ograniczenia, konsultacja |
| `/zabiegi/aparat-ruchomy` | aparat ruchomy | aparat ruchomy Lubin | dzieci, retencja, kontrola |
| `/zabiegi/retencja-ortodontyczna` | utrzymanie efektu | retencja ortodontyczna Lubin | kontrole i higiena po leczeniu |
| `/zabiegi/skan-3d-shining` | diagnostyka | skan 3D zębów Lubin | przebieg badania, zastosowanie, bez obietnic efektu |
| `/zabiegi/leczenie-wad-zgryzu` | problem/objaw | leczenie wad zgryzu Lubin | konsultacja i kwalifikacja |
| `/cennik` | cena i decyzja | cennik ortodoncja Lubin | jasne jednostki, aktualność, CTA |

Frazy dla Polkowic, Legnicy, Głogowa, Ścinawy i Chocianowa powinny być używane jako prawdziwy obszar dojazdu w treści, FAQ i GBP — nie jako automatycznie powielane strony miejscowości.

## Kanibalizacja i architektura

Największe ryzyko dotyczy zbliżonych tematów: `ortodoncja`, `ortodoncja-dziecieca`, `stomatologia-i-ortodoncja-dziecieca`, `aparat-ruchomy` i `leczenie-wad-zgryzu`. Każda strona powinna mieć odrębny H1, title, lead, sekcję „dla kogo”, FAQ i link do jednej następnej decyzji. Strona główna powinna odpowiadać na „kto/gdzie”, hub ortodoncji na „jak działa leczenie”, a podstrony aparatów na „jaki wariant”.

Wewnętrzne linkowanie: z homepage i hubu usług linkować do wszystkich usług komercyjnych; z artykułów linkować do jednej usługi i cennika; z każdej usługi linkować do kontaktu, zespołu i informacji dla pacjenta. Breadcrumbs powinny być widoczne i zgodne ze schema.

## Lokalne SEO i NAP

Do utrzymania w każdej publikacji:

- ORTHOMEDICA;
- ul. Pawia 67, 59-300 Lubin;
- +48 694 731 124;
- `rejestracja@orthomedica.lubin.pl`;
- godziny 09:00–18:00 pon.–pt. — tylko jeśli są aktualne.

Wizytówka Google powinna mieć dokładnie tę nazwę (bez dopisywania słów kluczowych), właściwą kategorię główną, usługi, zdjęcia zespołu i gabinetu, godziny świąteczne, opis z Lubinem, link kanoniczny bez `www`, pytania i odpowiedzi oraz regularne odpowiedzi na opinie. Należy zweryfikować, czy podany link Maps jest aktualnym profilem i czy dane NAP są identyczne.

Opinie widoczne na stronie powinny mieć prawdziwe daty albo nie powinny sugerować aktualności typu „tydzień temu”. Nie dodawać `AggregateRating`, dopóki ocena i liczba opinii nie są zweryfikowane oraz zgodne z zasadami Google.

## Dane strukturalne

Obecny model `Dentist` + `MedicalBusiness` zawiera adres, geo, telefon, e-mail, mapę, godziny i specjalizacje — to dobry fundament. Do dopracowania po weryfikacji właściciela:

1. dodać `areaServed` tylko dla realnie obsługiwanego obszaru;
2. dodać `contactPoint` dla rejestracji;
3. po uzyskaniu prawidłowych profili uzupełnić `sameAs` (GBP, social), nie wpisywać fikcyjnych adresów;
4. rozważyć `OfferCatalog`/`Offer` na cenniku, bez oznaczania niepotwierdzonych cen;
5. testować JSON-LD w Rich Results Test i Schema Markup Validator.

## Treść i E-E-A-T

Największy potencjał mają treści odpowiadające na lokalne pytania pacjentów: pierwsza wizyta dziecka, koszt i etapy leczenia, aparat stały vs ceramiczny, retencja, higiena, skan 3D i dojazd/parking przy Pawiej 67. Każdy materiał medyczny powinien mieć autora, datę aktualizacji, krótką notę o przeglądzie przez lekarza i źródła, gdy omawia zalecenia zdrowotne.

Nie tworzyć artykułów wyłącznie dla fraz „Lubin” ani doorway pages dla okolicznych miast. Lepiej rozbudować istniejący blog i usługowe landing pages o lokalny kontekst, dowody kompetencji i jasne CTA.

## Plan 30/60/90 dni

### 0–30 dni — odblokowanie indeksacji

- wdrożyć build na domenę docelową;
- sprawdzić 301 hostów, HTTPS, `robots.txt`, sitemapę, canonicale i 404;
- zweryfikować NAP w stopce, kontakcie, informacjach prawnych i GBP;
- skonfigurować GSC i przesłać sitemapę;
- uzupełnić profil GBP: kategorie, usługi, zdjęcia, godziny i opis;
- ustalić jedną osobę zatwierdzającą treści medyczne.

### 31–60 dni — lokalna relewancja i konwersja

- wdrożyć mapę intencji i linkowanie wewnętrzne;
- rozbudować 5–6 stron o najwyższej wartości komercyjnej;
- opublikować 3–4 artykuły odpowiadające na pytania pacjentów;
- pozyskać kilka jakościowych, lokalnie uzasadnionych wzmianek/linków;
- rozpocząć proces pozyskiwania opinii bez incentivów i z poszanowaniem prywatności.

### 61–90 dni — pomiar i iteracja

- porównać zapytania, strony i CTR w GSC;
- monitorować widoczność lokalną z ustalonych lokalizacji oraz działania w GBP;
- poprawić title/lead/CTA stron z wyświetleniami, ale niskim CTR;
- wdrożyć analitykę dopiero po akceptacji klienta: GA4/GTM za zgodą, zdarzenia formularza/telefonu/WhatsApp oraz UTM dla GBP.

## Kryteria odbioru po wdrożeniu

Status 200 dla strony głównej, robots, sitemap index, wszystkich URL-i z sitemap; 301 z `www` i HTTP; brak niezamierzonych noindex; poprawne canonicale; jedna wersja NAP; walidacja JSON-LD; GSC bez błędów krytycznych; test formularza i telefonów; raport bazowy fraz lokalnych i konwersji.

## Ograniczenia audytu

Nie miałem dostępu do Google Search Console, Google Business Profile, Google Analytics ani danych konkurencji. Google ogranicza automatyczne odczyty wyników, dlatego nie podaję rzekomych pozycji. Ocena publicznego stanu opiera się na bezpośrednich odpowiedziach HTTP domeny; przed raportem końcowym po wdrożeniu należy powtórzyć crawl i sprawdzić dane właściciela GBP.

## Zmiany wdrożone w kodzie — 11 lipca 2026

- rozszerzono schema gabinetu o `areaServed` dla Lubina i najbliższego obszaru oraz `ContactPoint` rejestracji;
- dodano `OfferCatalog` do strony cennika;
- doprecyzowano lokalny lead o ortodoncję dzieci i dorosłych;
- utrzymano kanoniczny host bez `www`, lokalne assety, lokalną sitemapę/robots i brak analityki przed akceptacją klienta.

Build Astro należy uruchomić w środowisku wdrożeniowym z zainstalowanymi zależnościami projektu; w bieżącym sandboxie lokalny `node_modules` nie jest dostępny.
