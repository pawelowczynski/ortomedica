# Audyt treści, lokalnego SEO i konwersji — ORTHOMEDICA

Data: 12 lipca 2026
Domena: `https://orthomedica.lubin.pl`
Cel główny: kontakt z rejestracją — telefon, WhatsApp lub formularz.

## 1. Strategia komunikacji

Komunikacja została oparta na spokojnym prowadzeniu pacjenta od potrzeby do kolejnego kroku: rozpoznanie tematu → wyjaśnienie zakresu konsultacji → opis procesu i kwalifikacji → ograniczenie obaw → kontakt z rejestracją. Lokalność wynika z realnego adresu gabinetu w Lubinie, a nie z powtarzania nazw miejscowości. Treści nie diagnozują, nie gwarantują wyniku i jasno wskazują, że metoda, diagnostyka, czas oraz koszt zależą od indywidualnej oceny.

## 2. Przeanalizowane strony i miejsca z treścią

- strona główna wraz z hero, ofertą, ścieżką leczenia, zespołem, cennikiem, FAQ, kontaktem i sekcją lokalną;
- 12 stron usługowych w `src/pages/zabiegi`;
- cennik pełny i skrócony;
- 3 profile lekarzy;
- blog, szablon artykułu i 9 artykułów;
- opis metamorfozy oraz komponent zdjęć przed/po;
- informacje dla pacjentów, polityka prywatności i regulamin;
- strona 404;
- nagłówek, menu, stopka, mobilne CTA i skip-link;
- etykiety, podpowiedzi, błędy i potwierdzenia formularza;
- title, meta description, canonical, Open Graph, nagłówki i JSON-LD;
- atrybuty alt, dane NAP, treści w plikach TypeScript/JavaScript/Markdown/PHP.

## 3. Mapa głównych fraz i intencji

| URL | Cel i odbiorca | Główna intencja | Główna fraza | Oczekiwana akcja |
|---|---|---|---|---|
| `/` | wybór gabinetu; rodzice i dorośli | lokalna/nawigacyjna | ortodonta Lubin | konsultacja lub telefon |
| `/zabiegi/ortodoncja` | młodzież i dorośli | usługowa | ortodoncja dla dorosłych Lubin | konsultacja ortodontyczna |
| `/zabiegi/ortodoncja-dziecieca` | rodzice | usługowa | ortodonta dziecięcy Lubin | ocena zgryzu dziecka |
| `/zabiegi/stomatologia-i-ortodoncja-dziecieca` | rodzice | usługowa | dentysta dla dzieci Lubin | wybór rodzaju wizyty |
| `/zabiegi/leczenie-wad-zgryzu` | osoby z konkretnym problemem | problemowa | wady zgryzu konsultacja Lubin | ocena ortodontyczna |
| `/zabiegi/aparat-ruchomy` | rodzice dzieci w okresie wzrostu | produktowo-usługowa | aparat ruchomy dla dzieci Lubin | kwalifikacja |
| `/zabiegi/aparat-staly-metalowy` | młodzież i dorośli | produktowo-usługowa | aparat metalowy Lubin | porównanie metod |
| `/zabiegi/aparat-staly-ceramiczny` | osoby zainteresowane estetyką | produktowo-usługowa | aparat ceramiczny Lubin | porównanie metod |
| `/zabiegi/przygotowanie-do-aparatu` | pacjenci przed leczeniem | informacyjna | przygotowanie do aparatu | sprawdzenie etapów |
| `/zabiegi/retencja-ortodontyczna` | pacjenci po leczeniu | usługowa/informacyjna | retencja ortodontyczna Lubin | kontrola retencji |
| `/zabiegi/skan-3d-shining` | pacjenci przed diagnostyką | informacyjno-usługowa | skan 3D zębów Lubin | pytanie o badanie |
| `/zabiegi/chirurgia-stomatologiczna` | pacjenci ze wskazaniem do zabiegu | usługowa | chirurgia stomatologiczna Lubin | konsultacja i kwalifikacja |
| `/zabiegi/stomatologia-zachowawcza-i-protetyka` | młodzież i dorośli | usługowa | stomatologia zachowawcza Lubin | konsultacja stomatologiczna |
| `/cennik` | osoby porównujące koszty | cenowa | cennik ortodoncja Lubin | kontakt po ocenę kosztów |
| `/dr-kornelia-rumin` | pacjenci wybierający ortodontę | osobowa/lokalna | Kornelia Rumin ortodonta Lubin | konsultacja |
| `/lek-dent-aleksandra-czerkawska` | pacjenci zachowawczy | osobowa/lokalna | Aleksandra Czerkawska dentysta Lubin | konsultacja |
| `/lek-dent-kamil-wojciechowski` | pacjenci endodontyczni/chirurgiczni | osobowa/lokalna | Kamil Wojciechowski dentysta Lubin | konsultacja |
| `/blog` | edukacja przed decyzją | informacyjna | blog ortodontyczny | przejście do usługi |
| 9 artykułów blogowych | pacjenci i rodzice z konkretnym pytaniem | informacyjna long-tail | pytanie odpowiadające tytułowi | właściwa usługa lub kontakt |
| `/metamorfozy/korekta-glebokiego-zgryzu-i-stloczen` | osoby rozważające leczenie | dowód/edukacja | leczenie głębokiego zgryzu | konsultacja bez gwarancji wyniku |

Rozdział intencji ogranicza kanibalizację: strona główna odpowiada na „kto i gdzie”, ortodoncja na proces leczenia młodzieży i dorosłych, ortodoncja dziecięca na rozwój zgryzu, stomatologia dziecięca na pierwszą wizytę i zdrowie zębów, a podstrony aparatów na porównanie konkretnych metod.

## 4. Najważniejsze wdrożone zmiany

- nowy H1, lead, główne CTA i pomocniczy telefon w hero;
- bardziej konkretne opisy czterech głównych obszarów oferty;
- osobne intencje dla ortodoncji dorosłych, ortodoncji dziecięcej i dentysty dla dzieci;
- usunięcie niepotwierdzonych informacji o parkingu, czasie dojazdu, regularnych pacjentach z okolic i „pierwszym wolnym terminie”;
- zastąpienie gwarancyjnych lub kategorycznych sformułowań językiem kwalifikacji i możliwych efektów;
- przepisanie profili lekarzy wyłącznie na podstawie danych profilowych w projekcie;
- poprawienie copy cennika bez zmiany cen;
- poprawienie etykiet, instrukcji, stanów błędów i potwierdzenia formularza;
- dodanie do artykułów informacji, że nie zastępują badania, kontekstowego CTA i powiązanych wpisów według tagów;
- poprawienie hierarchii H1–H3 na stronach usług i blogu;
- naprawienie skip-linku oraz linku w stopce do nieistniejącej sekcji;
- poprawienie błędnego `procedureType: Surgical` dla aparatu ceramicznego.

## 5. Zmienione pliki

Zmiany treści objęły:

- `src/components/Hero.astro`, `OfferGrid.astro`, `ProcessSteps.astro`, `Team.astro`, `ContactSection.astro`, `LocalSEO.astro`, `DoctorProfileLayout.astro`, `footer.astro`, `cennik.data.js`;
- `src/components/blog/BlogCard.astro`;
- `src/data/faq.ts`;
- `src/pages/blog/[slug].astro`, `blog/index.astro`, profile lekarzy oraz wszystkie strony usługowe;
- 9 plików Markdown w `src/content/blog`;
- `src/scripts/main.js` i `public/contact.php`;
- strony informacyjne otrzymały spójny cel skip-linku bez ingerencji w treść dokumentów prawnych.

## 6. Linkowanie wewnętrzne

Wdrożono lub utrzymano następujące ścieżki:

- strona główna → cztery główne obszary oferty → właściwe podstrony usług;
- hub ortodoncji → wady zgryzu, skan 3D, aparaty, przygotowanie i retencja;
- stomatologia dziecięca ↔ ortodoncja dziecięca;
- artykuł blogowy → kontekstowo dopasowana usługa + kontakt;
- artykuł blogowy → wpisy o największej liczbie wspólnych tagów;
- profile lekarzy → kontakt;
- usługi → cennik, powiązane metody i kontakt;
- stopka → informacje dla pacjentów, treści prawne, FAQ i lokalizacja.

## 7. Informacje do uzupełnienia lub potwierdzenia

- [DO UZUPEŁNIENIA: potwierdzić aktualne godziny otwarcia 09:00–18:00 od poniedziałku do piątku i zamknięcie w soboty];
- [DO UZUPEŁNIENIA: potwierdzić realny obszar obsługi wskazany w danych strukturalnych: Polkowice, Legnica i Głogów];
- [DO UZUPEŁNIENIA: potwierdzić aktualność pełnego cennika, jednostek rozliczenia, marek/systemów i przykładowych kalkulacji];
- [DO UZUPEŁNIENIA: potwierdzić zakres protetyki, gnatologii, RTG/CBCT, zabiegów chirurgicznych i endodoncji widoczny w projekcie];
- [DO UZUPEŁNIENIA: potwierdzić kwalifikacje, lata i treści profilu dr n. med. Kornelii Rumin oraz zakres pracy pozostałych lekarzy];
- [DO UZUPEŁNIENIA: potwierdzić prawa do zdjęć zespołu, usług, metamorfozy i zgodę pacjenta na publikację przed/po];
- [DO UZUPEŁNIENIA: potwierdzić dane prawne, status NFZ, monitoring i informacje o dokumentacji medycznej z właścicielem lub prawnikiem];
- [DO UZUPEŁNIENIA: potwierdzić działanie skrzynki `rejestracja@orthomedica.lubin.pl` i dostarczanie formularza na hostingu];
- [DO UZUPEŁNIENIA: dodać prawdziwe informacje o parkingu i komunikacji publicznej dopiero po potwierdzeniu].

## 8. Treści wymagające zatwierdzenia specjalisty

Przed publikacją lekarz powinien zatwierdzić wszystkie strony usługowe, FAQ, 9 artykułów, opisy cennika, profile lekarzy oraz case study metamorfozy. Szczególnej kontroli wymagają: wiek pierwszej konsultacji ortodontycznej, wskazania do aparatów, opis retencji, zalecenia higieniczne, objawy przy bruksizmie, informacje o skanie 3D i RTG, chirurgia, endodoncja, przeciwwskazania oraz zalecenia po zabiegach. Właściciel lub prawnik powinien osobno zatwierdzić politykę prywatności, regulamin i informacje dla pacjentów.

## 9. Dalszy rozwój treści

- po zatwierdzeniu faktów dodać osobne, unikalne strony endodoncji, gnatologii, diagnostyki RTG/CBCT i protetyki, jeśli są strategicznie ważne;
- dodać faktyczne wskazówki dojazdu i parkingu wraz ze zdjęciem wejścia;
- uzupełnić profile lekarzy o zweryfikowane szkolenia i zakres konsultacji;
- dodać datę przeglądu medycznego i osobę zatwierdzającą do artykułów;
- rozbudować poradniki na podstawie pytań z rejestracji i danych Search Console;
- mierzyć kliknięcia telefonu, WhatsApp, formularza, cennika i profili po zatwierdzeniu analityki i zgód.

## 10. Kontrola jakości

- produkcyjny build Astro: PASS — 32 strony wygenerowane;
- unikalne title i meta description: PASS;
- limit 65 znaków dla title i 160 dla description: PASS;
- jeden H1 na każdej właściwej stronie: PASS;
- canonical na `https://orthomedica.lubin.pl`: PASS;
- parsowanie JSON-LD: PASS;
- linki wewnętrzne i fragmenty: PASS po naprawie skip-linku i stopki;
- kontrola wskazanych ryzykownych sformułowań i publicznych placeholderów: PASS;
- test dostarczenia formularza, Rich Results Test, Lighthouse i test na produkcji: niewykonane — wymagają hostingu lub zewnętrznego środowiska.
