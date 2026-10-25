# ORTHOMEDICA — wdrożenie SEO (25.10.2026)

## Gotowe w repozytorium

- Hero ze zdjęciem LCP, treścią lokalną i dwoma CTA.
- Trzy rozbudowane strony usług; powiązane odnośniki na wszystkich 12 stronach usług.
- Dziewięć rozszerzonych poradników ze źródłami i datą faktycznej aktualizacji redakcyjnej.
- Rozdzielone encje gabinetu i osób, spójne dane usług, okruszki.
- Link do istniejącego opisu leczenia z ortodoncji.
- Responsywne obrazy WebP, preload dopasowany do srcset, cache i kompresja na Apache.
- Pomiar kontaktów za zgodą, bez danych z formularza i nazw odwiedzanych usług.
- Kontrole SEO w GitHub Actions dla produkcyjnego i stagingowego buildu.

## Produkcja i indeksowanie

Docelowy adres: https://orthomedica.lubin.pl/
Staging Vercel ma noindex, nofollow. Workflow CyberFolks jest ręczny; sam push nie publikuje domeny produkcyjnej.
Podczas tej sesji odczyt domeny produkcyjnej blokował błąd rozwiązywania DNS w środowisku wykonawczym. To nie potwierdza awarii witryny.

W Search Console po zalogowaniu na konto gabinetu:
1. Potwierdź właściwość domenową lub prefiks https://orthomedica.lubin.pl/.
2. Dla metody HTML można ustawić PUBLIC_GSC_VERIFICATION z dokładną wartością uzyskaną od Google i wykonać build.
3. Prześlij https://orthomedica.lubin.pl/sitemap-index.xml.
4. Sprawdź stronę główną, ortodoncję, ortodoncję dziecięcą i cennik w Inspekcji URL.
5. Porównaj canonical zadeklarowany i wybrany przez Google oraz status indeksacji.
6. Zapisz bazowe kliknięcia, wyświetlenia i zapytania; porównuj po wdrożeniu, bez obietnic pozycji.

Nie uruchomiono automatycznie ręcznego workflow CyberFolks. Należy ustalić, czy domena ma już przejść z ewentualnego trybu holding na pełną witrynę. Obecny workflow wykonuje również operacje usuwania wcześniejszego backupu; zgodnie z AGENTS.md jego uruchomienie wymaga osobnej decyzji dotyczącej tej operacji.

## GA4 — identyfikator zostanie uzupełniony później

Decyzja użytkownika: uzupełnienie później.
Ustaw PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX w środowisku produkcyjnego buildu.
Bez prawidłowej wartości kod nie pokazuje banera i nie ładuje Google Analytics. Vercel staging również nie uruchamia statystyk.

Przed włączeniem identyfikatora:
- wyłącz Enhanced Measurement (zwłaszcza automatyczne formularze, wyszukiwanie i kliknięcia wychodzące) w ustawieniach strumienia;
- wyłącz funkcje reklamowe i Google Signals; kod dodatkowo ustawia je na false;
- sprawdź retencję w ustawieniach GA4 i uzgodnij ją z administratorem danych;
- sprawdź politykę prywatności dla konfiguracji faktycznie używanej przez gabinet;
- w Realtime/DebugView sprawdź zdarzenia po zgodzie, po odmowie i po wycofaniu zgody.

Zdarzenia:
- contact_click, contact_method=phone: kliknięcie telefonu; nie dowód przeprowadzenia rozmowy;
- contact_click, contact_method=whatsapp: kliknięcie WhatsApp;
- generate_lead, contact_method=form: wyłącznie po odpowiedzi serwera potwierdzającej wysłanie.

W GA4 oznacz generate_lead jako zdarzenie kluczowe. Parametr contact_method można dodać jako wymiar niestandardowy.
Kod nie wysyła imienia, telefonu, tematu formularza, treści zapytania, pełnego adresu odwiedzanej podstrony ani parametrów zapytania.
Rejestracja kontaktu nie oznacza umówionej wizyty. Pomiar zapisów wymaga potwierdzonego procesu rejestracji.

## Profil Firmy w Google

Zmiany wymagają zalogowania do konta zarządzającego profilem; nie zostały wykonane przez kod strony.
- Nazwa zgodna z rzeczywistą nazwą gabinetu; bez dopisywania fraz.
- Adres: ul. Pawia 67, 59-300 Lubin; telefon +48 694 731 124.
- Godziny pon.–pt. 9:00–18:00, osobno godziny świąteczne.
- Kategorie i usługi wyłącznie odpowiadające rzeczywistemu zakresowi.
- Link do domeny produkcyjnej; aktualne zdjęcia gabinetu i zespołu.
- Odpowiedzi na rzeczywiste opinie bez ujawniania danych pacjentów.
- Nie tworzyć drugiej wizytówki tego samego gabinetu.

## Materiały do potwierdzenia przez gabinet

- Rozbudowane treści medyczne: weryfikacja przez właściwego lekarza przed publikacją na produkcji.
- Nie wpisano fikcyjnej daty przeglądu medycznego ani nowych kursów i kwalifikacji.
- Artykuły wskazują autorstwo istniejącego tekstu źródłowego oraz osobną aktualizację redakcyjną.
- Potwierdzić autentyczność materiałów i zgodę pacjenta przy istniejącym opisie leczenia.
- Dostarczyć docelowe zdjęcie hero; aktualny obraz pozostaje plikiem tymczasowym.
- Dane kwalifikacji Aleksandry Czerkawskiej i Kamila Wojciechowskiego uzupełnić dopiero na podstawie dokumentów.

## Weryfikacja przed wydaniem

npm ci
npm run test:analytics
npm run build
npm run check:seo

Dodatkowo build z VERCEL=1 do osobnego katalogu oraz check-seo.mjs --staging.
Sitemap zawiera canonicale; przekierowania, 404 i staging nie są stronami do indeksacji.
FAQ pozostaje treścią pomocniczą; nie obiecujemy wyników rozszerzonych FAQ.

