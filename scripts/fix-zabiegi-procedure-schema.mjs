import fs from 'node:fs';
import path from 'node:path';

const files = [
  'aparat-ruchomy.astro',
  'aparat-staly-ceramiczny.astro',
  'aparat-staly-metalowy.astro',
  'leczenie-wad-zgryzu.astro',
  'ortodoncja-dziecieca.astro',
  'retencja-ortodontyczna.astro',
];

for (const file of files) {
  const p = path.join('src/pages/zabiegi', file);
  let c = fs.readFileSync(p, 'utf8');
  const slug = file.replace('.astro', '');

  c = c.replace(
    "import Footer from '../../components/footer.astro';",
    "import Footer from '../../components/footer.astro';\nimport { canonicalUrl, medicalProcedureJsonLd } from '../../data/schema';",
  );

  const canonicalInline = new RegExp(
    `canonical="https://www\\.orthomedica\\.lubin\\.pl/zabiegi/${slug}"`,
  );
  c = c.replace(
    canonicalInline,
    `canonical={canonicalUrl('/zabiegi/${slug}')}`,
  );

  if (!c.includes(`const canonical = canonicalUrl`)) {
    c = c.replace(
      "import { canonicalUrl, medicalProcedureJsonLd } from '../../data/schema';",
      "import { canonicalUrl, medicalProcedureJsonLd } from '../../data/schema';\n\nconst canonical = canonicalUrl('/zabiegi/" +
        slug +
        "');",
    );
    c = c.replace(
      `canonical={canonicalUrl('/zabiegi/${slug}')}`,
      'canonical={canonical}',
    );
  }

  const nameMatch = c.match(/"name": "([^"]+)"/);
  const pageName = nameMatch?.[1] ?? slug;

  const ldJsonBlock =
    /  <script slot="head" type="application\/ld\+json" set:html=\{JSON\.stringify\(\{[\s\S]*?\}\)\} \/>/;

  c = c.replace(
    ldJsonBlock,
    `  <script slot="head" type="application/ld+json" set:html={JSON.stringify(medicalProcedureJsonLd({
    name: ${JSON.stringify(pageName)},
    url: canonical,
  }))} />`,
  );

  fs.writeFileSync(p, c);
  console.log('fixed', file);
}
