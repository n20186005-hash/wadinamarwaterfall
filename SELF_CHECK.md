# Delivery self-check status

## Verified locally in the assembly environment
- `package.json` is valid JSON and all direct dependency versions are exact.
- `.node-version` and `engines.node` agree.
- `packageManager` and `engines.pnpm` agree.
- No `pnpm-workspace.yaml` is present (single-package project).
- Website UI is Arabic-only / RTL; the supplied Google Maps embed uses Arabic + Saudi Arabia parameters.
- Logo, favicon SVG, favicon 16/32 and 180px Apple icon are present and use the same visual system.
- Local JavaScript syntax check passes.
- SVG/XML assets parse successfully.
- Source scan contains none of the forbidden placeholder/protocol strings targeted by the production preflight.
- No hand-authored sitemap file is present. Sitemap is conditionally enabled only when `Astro.site` has a real value.

## Not possible to verify in this environment
The current execution environment cannot make outbound connections to the npm registry or the remote image hosts. Therefore these mandatory network-dependent steps could not be executed successfully here:

```bash
rm -rf node_modules dist
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
node scripts/preflight.mjs
```

The photo binaries also could not be downloaded into the archive. The site therefore references real source photographs remotely; see `SOURCES.md`.

## Lockfile warning
The included `pnpm-lock.yaml` contains the exact direct importer pins but could not be regenerated/verified against the registry in this offline environment. Treat it as unverified. Do not represent this archive as having passed `--frozen-lockfile` until the clean-environment commands above complete successfully.
