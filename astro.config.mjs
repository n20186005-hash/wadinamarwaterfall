import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// هذا هو الموضع الوحيد لضبط نطاق الموقع.
const SITE = 'https://wadinamarwaterfall.com';

export default defineConfig({
  site: SITE || undefined,
  integrations: SITE ? [sitemap({filter: (page) => !/\/404(?:\.html|\/)?$/.test(new URL(page).pathname)})] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
