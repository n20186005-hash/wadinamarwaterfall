import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// هذا هو الموضع الوحيد لضبط نطاق الموقع. اتركه فارغاً حتى يتم اختيار النطاق النهائي.
const SITE = '';

export default defineConfig({
  site: SITE || undefined,
  integrations: SITE ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
