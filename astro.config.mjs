import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.orthomedica.lubin.pl',
  redirects: {
    '/zabiegi/skan-3d-itero': '/zabiegi/skan-3d-shining',
    '/zabiegi/invisalign-lubin': '/zabiegi/ortodoncja',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});