/**
 * Import checklist issues from oferta-vs-projekt-orthomedica.csv via GitHub REST API.
 * Used by .github/workflows/oferta-import-issues.yml (GITHUB_TOKEN).
 * Local: GITHUB_TOKEN=ghp_... node scripts/import-oferta-issues.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BATCH = 'oferta/import-batch';
const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY; // owner/repo
const FORCE = process.env.FORCE_IMPORT === 'true' || process.env.FORCE_IMPORT === '1';

if (!TOKEN || !REPO) {
  console.error('Missing GITHUB_TOKEN or GITHUB_REPOSITORY');
  process.exit(1);
}

const [OWNER, REPO_NAME] = REPO.split('/');
const API = 'https://api.github.com';
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function gh(path, opts = {}) {
  const res = await fetch(`${API}${path}`, { ...opts, headers: { ...headers, ...opts.headers } });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const msg = typeof data === 'object' && data?.message ? data.message : text;
    const err = new Error(`${opts.method || 'GET'} ${path} -> ${res.status}: ${msg}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

function parseCSV(content) {
  const rows = [];
  let row = [];
  let field = '';
  let inQ = false;
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (inQ) {
      if (c === '"') {
        if (content[i + 1] === '"') {
          field += '"';
          i++;
        } else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      if (row.some((cell) => cell !== '')) rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') field += c;
  }
  row.push(field);
  if (row.some((cell) => cell !== '')) rows.push(row);
  return rows;
}

function bucket(status) {
  const s = status.trim();
  if (s === 'Gotowe') return 'done';
  if (s.startsWith('Wynik')) return 'biz';
  if (s.startsWith('Do zrob')) return 'todo';
  if (s.length >= 4 && s[2] === '\u0119' && s.endsWith('owo')) return 'partial';
  return 'partial';
}

function labelsForBucket(b) {
  const L = [BATCH];
  if (b === 'done') L.push('oferta/gotowe');
  else if (b === 'todo') L.push('oferta/do-zrobienia');
  else if (b === 'biz') L.push('oferta/wynik-biznesowy');
  else L.push('oferta/czesciowo');
  return L;
}

async function ensureLabel(name, color, description) {
  try {
    await gh(`/repos/${OWNER}/${REPO_NAME}/labels`, {
      method: 'POST',
      body: JSON.stringify({ name, color, description }),
    });
    console.log('Label created:', name);
  } catch (e) {
    if (e.status === 422) console.log('Label exists:', name);
    else throw e;
  }
}

const csvPath = join(__dirname, '..', 'oferta-vs-projekt-orthomedica.csv');
const raw = readFileSync(csvPath, 'utf8');
const table = parseCSV(raw);
const header = table.shift();
if (!header || header[0] !== 'Sekcja') {
  console.error('Unexpected CSV header');
  process.exit(1);
}

const col = {
  sekcja: header.indexOf('Sekcja'),
  nr: header.indexOf('Nr'),
  punkt: header.indexOf('Punkt oferty'),
  status: header.indexOf('Status'),
  uwagi: header.indexOf('Uwagi / stan w repozytorium'),
};

if (col.uwagi < 0) {
  console.error('Missing columns in CSV');
  process.exit(1);
}

if (!FORCE) {
  const existing = await gh(
    `/repos/${OWNER}/${REPO_NAME}/issues?labels=${encodeURIComponent(BATCH)}&state=all&per_page=1`
  );
  if (Array.isArray(existing) && existing.length > 0) {
    console.error(
      `Issues with label ${BATCH} already exist. Re-run workflow with force_import, or delete old issues / labels first.`
    );
    process.exit(1);
  }
}

await ensureLabel('oferta/gotowe', '0E8A16', 'Done in offer review');
await ensureLabel('oferta/czesciowo', 'FBCA04', 'Partial / needs work');
await ensureLabel('oferta/do-zrobienia', 'D73A49', 'Todo');
await ensureLabel('oferta/wynik-biznesowy', '5319E7', 'Business outcome / out of repo');
await ensureLabel(BATCH, '1D76DB', 'Offer checklist import batch');

let n = 0;
for (const cells of table) {
  const sekcja = cells[col.sekcja] ?? '';
  const nr = (cells[col.nr] ?? '').trim();
  const punkt = cells[col.punkt] ?? '';
  const status = cells[col.status] ?? '';
  const uwagi = cells[col.uwagi] ?? '';
  if (!nr) continue;

  const b = bucket(status);
  const title = `[${nr}] ${punkt}`;
  const body = `**Section:** ${sekcja}

**Status:** ${status}

**Notes:** ${uwagi}

---
_From \`oferta-vs-projekt-orthomedica.csv\` — GitHub Projects + labels \`oferta/*\`._
`;

  const issue = await gh(`/repos/${OWNER}/${REPO_NAME}/issues`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      labels: labelsForBucket(b),
    }),
  });

  if (b === 'done' || b === 'biz') {
    await gh(`/repos/${OWNER}/${REPO_NAME}/issues/${issue.number}`, {
      method: 'PATCH',
      body: JSON.stringify({ state: 'closed' }),
    });
    await gh(`/repos/${OWNER}/${REPO_NAME}/issues/${issue.number}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        body: 'Auto-closed: marked done in offer checklist import.',
      }),
    });
  }

  console.log(`#${issue.number} ${title}`);
  n++;
}

console.log(`Done. Created ${n} issues.`);
