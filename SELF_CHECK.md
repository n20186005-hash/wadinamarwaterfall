# Delivery self-check status

## Verified locally in the assembly environment
- `package.json` is valid JSON and all direct dependency versions are exact.
- `.node-version` and `engines.node` agree.
- `packageManager` and `engines.pnpm` agree.
- `pnpm-workspace.yaml` contains only `allowBuilds` entries (`esbuild`, `workerd`) and defines no workspace packages, so the project remains single-package.
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

## Lockfile status
The originally shipped `pnpm-lock.yaml` was a stub: it listed the direct importer pins but contained no resolved `packages`/`snapshots` entries and no `packageManagerDependencies` section. pnpm 12 therefore aborted the Cloudflare build with `ERR_PNPM_FROZEN_LOCKFILE_WITH_OUTDATED_LOCKFILE`.

The lockfile has since been regenerated against the registry with pnpm 12.4.0 and now contains the full resolution in both lockfile documents (package-manager dependencies and project dependencies). `pnpm-workspace.yaml` records the `allowBuilds` approvals for `esbuild` and `workerd`, which pnpm 12 requires in order to run their postinstall scripts instead of failing with `ERR_PNPM_IGNORED_BUILDS`.

Verified after regeneration, in order:
- `pnpm install --frozen-lockfile` — passes with an empty `node_modules`.
- `pnpm check` — 0 errors, 0 warnings, 2 hints.
- `pnpm build` — 1 page built.
- `scripts/preflight.mjs` — its checks were reproduced manually against `dist`: no `example.com` / `localhost` / `chrome-extension://` matches and no sitemap file present, so it passes.

`scripts/preflight.mjs` itself cannot be executed on Windows: line 4 uses `new URL('..', import.meta.url).pathname`, which yields `/C:/...` and makes the `dist` existence check fail with "Production output is missing". On Linux (the Cloudflare build image) the same line is correct.
