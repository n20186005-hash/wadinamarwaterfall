import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
if (!existsSync(dist)) {
  console.error('Production output is missing. Run the production build before preflight.');
  process.exit(2);
}

const forbidden = [
  ['example', '.com'].join(''),
  ['local', 'host'].join(''),
  ['chrome-extension', '://'].join('')
];
const textExt = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.svg']);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });
}

let failed = false;
for (const file of walk(dist)) {
  const ext = file.slice(file.lastIndexOf('.'));
  if (!textExt.has(ext) || statSync(file).size > 2_000_000) continue;
  const content = readFileSync(file, 'utf8');
  for (const needle of forbidden) {
    if (content.includes(needle)) {
      console.error(`Forbidden placeholder/protocol found in ${file}`);
      failed = true;
    }
  }
}

const sitemapCandidates = ['sitemap-index.xml', 'sitemap-0.xml'];
for (const name of sitemapCandidates) {
  const path = join(dist, name);
  if (!existsSync(path)) continue;
  const xml = readFileSync(path, 'utf8');
  if (/<lastmod>/i.test(xml)) {
    console.error(`Unexpected lastmod detected in ${name}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Production preflight passed.');
