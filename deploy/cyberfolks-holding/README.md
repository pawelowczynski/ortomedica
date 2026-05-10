# Strona holdingowa — CyberFolks (`public_html`)

## Automatycznie (zalecane)

W GitHub: **Actions** → **Deploy to CyberFolks** → **Run workflow** → **mode: holding** → Run.

Workflow usuwa zawartość `public_html` i wgrywa pliki z tego katalogu (te same sekrety `CYBERFOLKS_*` co przy pełnym deployu).

## Pełna witryna Astro na CyberFolks

Actions → **Deploy to CyberFolks** → **mode: full_site** (buduje `dist` i wgrywa na serwer — bez czyszczenia katalogu jak dawniej).

## Ręcznie (FTP / panel)

Możesz też skopiować zawartość tego folderu do `domains/orthomedica.lubin.pl/public_html` — wtedy **usuń najpierw stare pliki**, żeby nie zostawały ścieżki z poprzedniej strony.

### Pliki

- `index.html` — „wkrótce”, nazwa, adres i telefon (zgodnie z `src/data/site.ts`).
- `brand-mark.svg` — znak jak favicon witryny.

Opcjonalnie: dorzuć `logo.png` i w `index.html` podmień `<img class="mark" …>` na `./logo.png`.
