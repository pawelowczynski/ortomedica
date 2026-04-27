# Kompatybilnosc macOS w Top 500 Steam

Autor: Rozz  
Data analizy: 22.04.2026  
Zrodlo danych: SteamSpy + Steam Store API

---

## Cel badania

- Sprawdzic, jaki odsetek najpopularniejszych gier na Steam dziala na macOS.
- Opracowac wynik oparty na aktualnych danych z API, a nie na szacunkach.

---

## Metodologia

1. Pobranie listy Top 500 po CCU z `steamspy.com/api.php?request=all`.
2. Dla kazdego `appid` zapytanie do `store.steampowered.com/api/appdetails`.
3. Odczyt pola `platforms.mac` (`True` / `False`).
4. Agregacja wynikow do pliku `steam_top500_macos.csv`.

---

## Zakres i jakosc danych

- Liczba gier w probie: **500**
- Gry z dostepnymi danymi platform: **499**
- Rekordy niejednoznaczne / niedostepne: **1**
- Ograniczenie techniczne: API Store dla pojedynczych tytulow bywa czasem niepelne

---

## Wynik glowny

- Gry ze wsparciem macOS: **171 / 499**
- Udzial gier ze wsparciem macOS: **34.27%**
- Gry bez wsparcia macOS: **328 / 499** (**65.73%**)

Wniosek: wsparcie macOS w Top 500 jest istotne, ale nadal mniejszosciowe.

---

## Wynik na wykresie (do odtworzenia na slajdzie)

- macOS: **34.27%**
- Bez macOS: **65.73%**

Sugerowany wykres:
- kolowy (2 segmenty) lub slupkowy (2 slupki)
- podpisy bezwzgledne: 171 i 328

---

## Najpopularniejsze gry z macOS (Top 10 po CCU)

1. Rust
2. Baldur's Gate 3
3. Stardew Valley
4. War Thunder
5. Hearts of Iron IV
6. Don't Starve Together
7. Geometry Dash
8. Sid Meier's Civilization VI
9. Terraria
10. Project Zomboid

---

## Najpopularniejsze gry bez macOS (Top 10 po CCU)

1. Counter-Strike: Global Offensive
2. PUBG: BATTLEGROUNDS
3. ELDEN RING NIGHTREIGN
4. Apex Legends
5. Wallpaper Engine
6. Grand Theft Auto V Legacy
7. Call of Duty: Modern Warfare II
8. NARAKA: BLADEPOINT
9. HELLDIVERS 2
10. Tom Clancy's Rainbow Six Siege

---

## Interpretacja biznesowa

- Ekosystem macOS pokrywa okolo **1/3** topowych tytulow Steam.
- Brak wsparcia dotyczy glownie najwiekszych gier sieciowych i tytulow AAA.
- Dla produktu kierowanego do graczy macOS warto stawiac na:
  - gry indie i strategiczne,
  - tytuly single-player i cross-platform.

---

## Rekomendacje i kolejne kroki

- Powtarzac pomiar cyklicznie (np. co miesiac), bo ranking CCU szybko sie zmienia.
- Rozszerzyc analize o:
  - wsparcie Apple Silicon natywne vs Rosetta 2,
  - podzial gatunkowy,
  - trendy miesieczne i kwartalne.
- Stworzyc dashboard (CSV -> BI) do monitorowania zmian.

---

## Podsumowanie

- Teza badawcza potwierdzona danymi: macOS ma realne, ale ograniczone pokrycie w Top 500 Steam.
- Aktualny wynik: **34.27% gier z deklarowanym wsparciem macOS**.
