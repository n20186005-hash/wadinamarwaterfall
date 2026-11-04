# Wadi Namar Waterfall visitor guide

Existing Arabic RTL static Astro architecture retained, plus a genuine noindex error page and a data-driven topic cluster. Independent nonprofit tourism and public education information, not an official operator or registered-charity claim.

Exact existing stack: Node 24.21.0, pnpm 12.4.0, Astro 7.3.2, Tailwind 4.3.3, TypeScript 6.0.3, Wrangler 4.130.0. Package versions, lockfile and narrow esbuild/workerd build permissions retained.

Validation commands: `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm run build`, `node scripts/preflight.mjs`, `npx wrangler deploy --dry-run`.

Source project name is wadinamarwaterfall. Small Worker runs before ASSETS for path/query-preserving HTTP/www canonical redirects and real 404 responses. No hosting/domain/security settings changed.

Topic cluster: `src/data/topics.ts` registers 36 Arabic long-tail topics (P0: `opening-hours`, `entry-fee`, `location`, `waterfall`). `src/pages/[topic].astro` prerenders one static page per slug via `getStaticPaths`; `src/components/TopicPage.astro` emits WebPage + BreadcrumbList + FAQPage JSON-LD with a self-referencing canonical, and `src/components/TopicLinks.astro` lists every topic on the homepage (`#topics`). All 36 URLs are included in `sitemap-0.xml`. Topic copy keeps unverified hours, fees, parking and waterfall flow explicitly unconfirmed, and separates free public access (Visit Saudi) from commercial activities. Adding a topic requires only one new entry in `TOPICS`; routing, homepage cluster and sitemap follow automatically.

Maps information is dated and third-party. A 24-hour listing does not prove current access, facilities or waterfall flow. Current official fees were not independently confirmed; no free/paid admission promise. Public sources and their applicability are described on the page.

Published images are kept in place. This repo does not make copyright determinations for existing published images. The current abstract water SVG is served as a site visual and is not a site photograph or a current-condition depiction.

Existing optional Google Analytics controls now apply runtime denial to a loaded library, verify persistence, report failed storage accurately, and handle cross-tab key changes. Retained script/storage fault fixtures do not replace real browser consent/reload acceptance. Google Maps loads independently; optional analytics controls do not control it.

Local checks do not establish official exact-commit deployment, browser layout, native production redirects or production completion.
