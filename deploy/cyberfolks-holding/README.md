# Strona holdingowa — CyberFolks (`public_html`)

Ogólny opis pipeline’u GitHub / Vercel / CyberFolks: [`docs/deploy-and-hosting.md`](../../docs/deploy-and-hosting.md).

## Automatycznie (zalecane)

W GitHub: **Actions** → **Deploy to CyberFolks** → **Run workflow** → **mode: holding** → Run.

Workflow usuwa zawartość `public_html` i wgrywa pliki z tego katalogu (te same sekrety `CYBERFOLKS_*` co przy pełnym deployu).

## Pełna witryna Astro na CyberFolks

Actions → **Deploy to CyberFolks** → **mode: full_site** (buduje `dist` i wgrywa na serwer — bez czyszczenia katalogu jak dawniej).

## Ręcznie (FTP / panel)

Możesz też skopiować zawartość tego folderu do `domains/orthomedica.lubin.pl/public_html` — wtedy **usuń najpierw stare pliki**, żeby nie zostawały ścieżki z poprzedniej strony.

### Pliki

- `index.html` — komunikat „wkrótce”, adres i telefon (`src/data/site.ts`).
- `logo-podpis.png` — logo źródłowe (projekt: `LOGO-PODPIS.png`).
