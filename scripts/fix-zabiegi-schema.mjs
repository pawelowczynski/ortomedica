import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/pages/zabiegi';

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.astro')) continue;
  const p = path.join(dir, file);
  let c = fs.readFileSync(p, 'utf8');

  if (c.includes('medicalWebPageJsonLd')) continue;

  const slug = file.replace('.astro', '');
  const canonicalMatch = c.match(/const canonical = '([^']+)'/);
  if (!canonicalMatch) {
    console.warn('skip (no canonical):', file);
    continue;
  }

  const nameMatch = c.match(/"name": "([^"]+)"/);
  const pageName = nameMatch?.[1] ?? slug;

  if (!c.includes("from '../../data/schema'")) {
    c = c.replace(
      "import Footer from '../../components/footer.astro';",
      "import Footer from '../../components/footer.astro';\nimport { canonicalUrl, medicalWebPageJsonLd } from '../../data/schema';",
    );
  }

  c = c.replace(
    /const canonical = 'https:\/\/www\.orthomedica\.lubin\.pl\/[^']+';/,
    `const canonical = canonicalUrl('/zabiegi/${slug}');`,
  );

  const ldJsonBlock =
    /  <script slot="head" type="application\/ld\+json" set:html=\{JSON\.stringify\(\{[\s\S]*?\}\)\} \/>/;

  c = c.replace(
    ldJsonBlock,
    `  <script slot="head" type="application/ld+json" set:html={JSON.stringify(medicalWebPageJsonLd({
    name: ${JSON.stringify(pageName)},
    url: canonical,
  }))} />`,
  );

  fs.writeFileSync(p, c);
  console.log('schema updated', file);
}
