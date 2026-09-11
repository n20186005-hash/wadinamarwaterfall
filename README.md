# Wadi Namar Waterfall — Astro single-page site

Arabic-only, RTL, single-page visitor guide for شلال وادي نمار in Riyadh.

## Stack
- Astro 7.3.2
- Tailwind CSS 4.3.3 via `@tailwindcss/vite`
- TypeScript 6.0.3 (kept on the Astro Check-compatible 6.x line)
- pnpm 12.4.0
- Node.js 24.21.0 LTS
- Cloudflare Workers static asset deployment via Wrangler 4.130.0

## Domain configuration — one place only
Edit only `astro.config.mjs` and replace the empty `SITE` string with the final HTTPS origin after the domain has been registered.

All absolute SEO URLs derive from `Astro.site`. When `SITE` is empty:
- canonical and absolute Open Graph URL/image are omitted;
- `@astrojs/sitemap` is not enabled;
- no fallback or placeholder hostname is injected.

## Required clean-environment validation
After the final domain is configured and dependencies can be reached from the npm registry:

```bash
rm -rf node_modules dist
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
node scripts/preflight.mjs
```

## Cloudflare Workers
This is an entirely pre-rendered site, so it is deployed as Worker static assets. `wrangler.jsonc` points `assets.directory` to `./dist`.

## Analytics
GA4 ID: `G-HXM22WWPKP`. The Google Analytics script is not loaded until the visitor explicitly accepts analytics.

## Photographs
The page references real Wadi Namar photographs, not generated imagery. Image sources and reuse notes are in `SOURCES.md`. Because this execution environment cannot reach external hosts, the photo binaries could not be downloaded into `public/images`; the live source URLs remain in the page so the design still uses real photographs. Localize those files before production where reuse rights permit.

## Validation note for this delivered archive
The frozen install, Astro Check and the production build have now been completed on a machine with registry access, after regenerating the stub `pnpm-lock.yaml` that was originally shipped. The photo binaries still could not be downloaded, so the page continues to reference the real source photographs remotely. `SELF_CHECK.md` records what was and was not verified.

`node_modules/` had been committed without a `.gitignore`. It is not needed by the build (pnpm reinstalls from the lockfile), so `.gitignore` now excludes `node_modules/`, `dist/` and `.astro/`, and the previously committed `node_modules` files have been removed from the index (the local folder is untouched).
