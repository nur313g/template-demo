import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// URL situs diambil dari site.json -> meta.url (WAJIB diisi untuk sitemap & SEO)
const site = JSON.parse(readFileSync(new URL('./src/data/site.json', import.meta.url), 'utf-8'));

// Mode demo ("demo": true di site.json): menambah halaman /coba (form uji coba) dan /preview
// (dirender server di Cloudflare). Situs klien biasa TIDAK memuat halaman ini.
const demo = site.demo === true;
const demoRoutes = {
  name: 'demo-routes',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      injectRoute({ pattern: '/coba', entrypoint: './src/demo/coba.astro', prerender: true });
      injectRoute({ pattern: '/preview', entrypoint: './src/demo/preview.astro', prerender: false });
    },
  },
};
const adapter = demo ? (await import('@astrojs/cloudflare')).default() : undefined;

export default defineConfig({
  site: site.meta?.url || 'https://example.pages.dev',
  integrations: [sitemap(), ...(demo ? [demoRoutes] : [])],
  adapter,
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
