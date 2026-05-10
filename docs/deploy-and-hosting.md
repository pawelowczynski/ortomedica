# Deploy i hosting — GitHub, Vercel, CyberFolks

Dokument dla kolejnych agentów / deweloperów: **co dokładnie triggeruje build**, **gdzie ląduje artefakt**, **jakie są sekrety i gałęzie**.

Repozytorium GitHub (znane z kontekstu projektu): `pawelowczynski/ortomedica`. Kod aplikacji w katalogu projektu Astro (root z `package.json`, `astro.config.mjs`).

---

## 1. Trzy niezależne ścieżki

| Ścieżka | Trigger | Wynik |
|--------|---------|--------|
| **Vercel** | Push / merge na gałąź podpiętą w ustawieniach projektu Vercel (zwykle `master` lub `main` — **sprawdź w panelu**) | Build Astro na infrastrukturze Vercel; URL `*.vercel.app` (+ opcjonalnie Custom Domain w panelu Vercel) |
| **CyberFolks — holding** | Ręcznie: GitHub Actions → workflow **Deploy to CyberFolks** → input **mode = holding** | Usunięcie zawartości `public_html`, wgranie [`deploy/cyberfolks-holding/`](../deploy/cyberfolks-holding/) |
| **CyberFolks — pełna strona** | Ręcznie: ten sam workflow → **mode = full_site** | `npm ci` → `npm run build` → tar całego `dist/` na serwer (bez masowego czyszczenia katalogu przed tar) |

**Ważne:** push na GitHub **nie** uruchamia już automatycznego deployu na CyberFolks. Jedyny automatyczny deploy „przy każdym commicie” jest po stronie **Vercela** (jeśli tak jest skonfigurowany projekt).

---

## 2. GitHub

### 2.1 Gałęzie

- Historycznie **domyślna gałąź na GitHubie to `master`** (Actions i ustawienia Vercel mogą się do niej odnosić).
- Pracować można na `main`; przed wdrożeniem workflow CyberFolks lub przed poleganiem na „ostatnim commicie na domyślnej gałęzi” **upewnij się**, że zmiany są na **`master`** (merge / fast-forward), jeśli runner checkoutuje `master`.

### 2.2 Workflow CyberFolks

- Plik: [`.github/workflows/deploy-cyberfolks.yml`](../.github/workflows/deploy-cyberfolks.yml).
- Zdarzenie: **`workflow_dispatch`** wyłącznie (brak `push`).
- Input **`mode`**:
  - **`holding`** — na serwerze: `find "$REMOTE_DIR" -mindepth 1 -delete`, potem rozpakowanie tarballa z **`deploy/cyberfolks-holding/`** do `public_html`.
  - **`full_site`** — kroki Node (22): `npm ci`, `npm run build`; upload tarballa z **`dist/`** (nadpisuje/plikuje jak klasyczny deploy statyczny — **nie** czyści wcześniej całego `public_html` jak `holding`).
- **Zdalny katalog:** `domains/orthomedica.lubin.pl/public_html` (na hoście SSH z sekretów).
- **Concurrency:** `group: deploy-cyberfolks` — równoległe uruchomienia się wykluczają (`cancel-in-progress: true`).

### 2.3 Sekrety GitHub (CyberFolks)

W ustawieniach repo → **Secrets and variables** → **Actions**:

| Sekret | Znaczenie |
|--------|-----------|
| `CYBERFOLKS_HOST` | Host SSH |
| `CYBERFOLKS_USER` | Użytkownik SSH |
| `CYBERFOLKS_PORT` | Port SSH (np. `22`) |
| `CYBERFOLKS_SSH_KEY` | Prywatny klucz deploy (w sekrecie często CRLF — workflow normalizuje newline w Pythonie) |

Brak któregokolwiek sekretu → krok SSH się wywali.

### 2.4 Ręczne uruchomienie deployu CyberFolks

1. GitHub → **Actions** → **Deploy to CyberFolks**.
2. **Run workflow** → wybierz gałąź (zwykle `master`).
3. Wybierz **mode**: `holding` lub `full_site` → **Run workflow**.

Alternatywa (CLI, przy zalogowanym `gh`):  
`gh workflow run "Deploy to CyberFolks" -f mode=holding --repo pawelowczynski/ortomedica`

---

## 3. Vercel

### 3.1 Konfiguracja w repo

- W tym projekcie **nie ma** commitowanego `vercel.json` (domyślne zachowanie Vercela dla frameworka wykrytego z buildu).
- Build: standardowy dla Astro (`npm run build` / ustawienia wykryte przez Vercel).

### 3.2 Konfiguracja poza repo (panel Vercel)

- **Połączenie z GitHubem:** które repo i która **Production Branch** oraz **Preview** dla PR — to jest źródło prawdy dla „co się buduje po pushu”.
- **Zmienne środowiskowe** (np. `PUBLIC_*`) ustawiane w panelu Vercel; nie są opisane w tym dokumencie — patrz [`.env.example`](../.env.example) i kod.

### 3.3 Relacja do CyberFolks

- **Vercel i CyberFolks nie dzielą jednego workflow GitHub Actions** dla aplikacji Astro — Vercel woła własny build po webhooku od GitHuba.
- Zmiana wyłącznie workflow CyberFolks **nie** wyłącza Vercela.

---

## 4. Statyczna strona „holding” (CyberFolks)

- Katalog: [`deploy/cyberfolks-holding/`](../deploy/cyberfolks-holding/README.md) (`index.html`, `logo-podpis.png`, itd.).
- Deploy **`holding`** usuwa **wszystko** w `public_html` — nie zostawia starych ścieżek z poprzedniej pełnej witryny.

---

## 5. Typowe problemy (skrót dla agenta)

| Objaw | Co sprawdzić |
|--------|----------------|
| Workflow CyberFolks nie ma nowych opcji / failuje `inputs` | Czy zmiany w YAML są na gałęzi domyślnej używanej przez Actions (`master` vs `main`). |
| SSH „permission denied” | Sekrety, format klucza, port, `IdentitiesOnly` (workflow wyłącza `SSH_AUTH_SOCK`). |
| Po `holding` dziwne pliki na serwerze | Nie powinny — `holding` czyści `public_html`. Jeśli są, czy na pewno odpalono **holding**, a nie ręczny FTP częściowy. |
| Vercel nie buduje po pushu | Branch w Vercel vs branch pushu; ustawienia Git Integration; limity konta. |

---

## 6. Powiązane pliki

- Workflow: [`.github/workflows/deploy-cyberfolks.yml`](../.github/workflows/deploy-cyberfolks.yml)
- Holding: [`deploy/cyberfolks-holding/README.md`](../deploy/cyberfolks-holding/README.md)
- Kontekst produktu / stack: [`docs/project-context.md`](./project-context.md)
