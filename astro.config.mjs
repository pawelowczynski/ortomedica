import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.orthomedica.lubin.pl',
  trailingSlash: 'never',
  redirects: {
    '/zabiegi/skan-3d-itero': '/zabiegi/skan-3d-shining',
    '/zabiegi/invisalign-lubin': '/zabiegi/ortodoncja',
    '/blog/skan-3d-itero-co-daje-pacjentowi': '/blog/skan-3d-shining-co-daje-pacjentowi',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});