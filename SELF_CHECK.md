# Local verification scope

Normal frozen install from new node_modules passed with exact Node 24.21.0 / pnpm 12.4.0 and the existing lockfile/build policy. Warm package store reused; not a cold Linux native-script audit.

Astro check: 0 errors, warnings and hints. Build: homepage, 36 topic pages and a noindex 404 (38 pages total). Production preflight and pinned default Wrangler dry-run pass. Public source/client JavaScript and generated output are inspected separately from browser interaction.

Topic cluster checks: 36/36 slugs produce HTML, every `related` reference resolves to a published topic with no self-references, all 36 URLs appear in `sitemap-0.xml`, the homepage `#topics` cluster and its 14 internal links resolve, each topic page has a self-referencing canonical and WebPage + BreadcrumbList + FAQPage JSON-LD. `scripts/preflight.mjs` now resolves the project root via `fileURLToPath` so it also runs on Windows.

Language and internationalization review: all 38 HTML pages declare `lang="ar-SA" dir="rtl"` with `og:locale ar_SA`; every indexable page has a self-referencing `hreflang="ar-SA"` (the noindex 404 is excluded), and WebPage JSON-LD carries `inLanguage: ar-SA` on the homepage and all 36 topic pages. No CJK characters and no TODO/placeholder markers remain. Arabic body copy was scanned for stray Latin text: remaining Latin strings are proper nouns and third-party data (`خرائط Google`, `Plus Code`, `HMCH+QV`, `National Park` as a Maps category label, `CC0`, `SVG`), with LTR fragments wrapped in `lang="en" dir="ltr"` or `dir="ltr"`. Two unmarked `Riyadh` tokens embedded in Arabic addresses and one fully English `Plus Code` paragraph were rewritten in Arabic; the 404 page no longer emits an empty `{}` structured-data script.

The coordinator’s historical Cloudflare log shows a successful build followed by deployment failure on absolute _redirects source URLs [100324]. Current source removes those unsupported rules, names the actual project and handles host/protocol redirects in the Worker. This is not an assertion of a successful later deployment.

Final independent review, real responsive browser/RTL/navigation/image/dialog/consent observations, storage reload behavior and official production checks remain required.
