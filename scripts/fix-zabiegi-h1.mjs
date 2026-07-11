import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/pages/zabiegi';

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.astro')) continue;
  const p = path.join(dir, file);
  let c = fs.readFileSync(p, 'utf8');
  const orig = c;

  c = c.replaceAll(
    '<h1 class="cinzel text-xs md:text-sm text-gold font-bold tracking-[0.5em] mb-4 uppercase">',
    '<p class="cinzel text-xs md:text-sm text-gold font-bold tracking-[0.5em] mb-4 uppercase">',
  );
  c = c.replaceAll(
    '<h2 class="text-3xl md:text-4xl lg:text-5xl serif mb-6 text-navy">',
    '<h1 class="text-3xl md:text-4xl lg:text-5xl serif mb-6 text-navy">',
  );
  c = c.replaceAll(
    '<h2 class="text-3xl md:text-4xl lg:text-5xl serif mb-4 md:mb-6 text-navy">',
    '<h1 class="text-3xl md:text-4xl lg:text-5xl serif mb-4 md:mb-6 text-navy">',
  );
  c = c.replaceAll(/<\/h1>\s*\n\s*<h1 class="text-3xl/g, '</p>\n        <h1 class="text-3xl');

  const idx = c.search(/<h1 class="text-3xl md:text-4xl lg:text-5xl serif/);
  if (idx !== -1) {
    const after = c.slice(idx);
    const closeH2 = after.search(/<\/h2>/);
    if (closeH2 !== -1) {
      const abs = idx + closeH2;
      const beforeClose = c.slice(0, abs);
      const pIdx = beforeClose.lastIndexOf('<p class="text-[15px]');
      const h3Idx = beforeClose.lastIndexOf('<h3');
      const lastSection = Math.max(pIdx, h3Idx);
      if (lastSection < abs) {
        c = c.slice(0, abs) + '</h1>' + c.slice(abs + 5);
      }
    }
  }

  if (c !== orig) {
    fs.writeFileSync(p, c);
    console.log('updated', file);
  }
}
