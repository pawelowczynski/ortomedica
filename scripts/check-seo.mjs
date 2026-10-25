import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

const args = process.argv.slice(2);
const dir = path.resolve(args.find(a => a.startsWith('--dir='))?.slice(6) || 'dist');
const staging = args.includes('--staging');
const reportPath = args.find(a => a.startsWith('--report='))?.slice(9);
const origin = 'https://orthomedica.lubin.pl';
const errors = [];
const warnings = [];
const fail = message => errors.push(message);
const attr = (node, name) => node?.attrs?.find(a => a.name === name)?.value;
const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const text = node => node?.nodeName === '#text' ? node.value : (node?.childNodes || []).map(text).join(' ');
const normal = pathname => pathname === '/' ? '/' : pathname.replace(/\/$/, '');
const exists = async file => stat(file).then(s => s.isFile()).catch(() => false);
async function files(directory) {
  const result = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) result.push(...await files(file));
    else if (item.name.endsWith('.html')) result.push(file);
  }
  return result;
}

const pages = [];
for (const file of await files(dir)) {
  const nodes = walk(parse(await readFile(file, 'utf8')));
  const meta = name => attr(nodes.find(n => n.tagName === 'meta' && attr(n, 'name') === name), 'content');
  const route = normal('/' + path.relative(dir, file).replaceAll(path.sep, '/').replace(/index\.html$/, ''));
  const redirect = nodes.some(n => n.tagName === 'meta' && attr(n, 'http-equiv')?.toLowerCase() === 'refresh');
  if (redirect || route === '/404.html') continue;
  const title = text(nodes.find(n => n.tagName === 'title')).trim();
  const description = meta('description');
  const canonical = attr(nodes.find(n => n.tagName === 'link' && attr(n, 'rel') === 'canonical'), 'href');
  const robots = meta('robots') || '';
  const h1 = nodes.filter(n => n.tagName === 'h1');
  const main = nodes.find(n => n.tagName === 'main');
  if (!title || !description) fail(route + ': missing title or description');
  if (h1.length !== 1) fail(route + ': expected one H1, got ' + h1.length);
  if (canonical !== origin + route) fail(route + ': unexpected canonical ' + canonical);
  if (staging ? !/noindex/.test(robots) || !/nofollow/.test(robots) : /noindex/.test(robots)) fail(route + ': incorrect indexing directive');
  if (description?.length > 160) warnings.push(route + ': description exceeds 160 characters');
  const schemas = [];
  for (const node of nodes.filter(n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json')) {
    try { const value = JSON.parse(node.childNodes.map(n => n.value || '').join('')); schemas.push(...(value['@graph'] || [value])); }
    catch { fail(route + ': invalid JSON-LD'); }
  }
  for (const schema of schemas) {
    if (schema['@type'] === 'MedicalSpecialty') fail(route + ': a specialty is not a page type');
    if (schema['@type'] === 'Dentist' && (schema.jobTitle || schema.worksFor)) fail(route + ': person properties on a clinic');
    if (schema.aggregateRating) fail(route + ': review markup requires separate review');
  }
  if (route.startsWith('/zabiegi/') && !schemas.some(s => s['@type'] === 'BreadcrumbList')) fail(route + ': missing service breadcrumbs');
  const ids = new Set(nodes.map(n => attr(n, 'id')).filter(Boolean));
  const mainNodes = new Set(main ? walk(main) : []);
  const links = nodes.filter(n => n.tagName === 'a').map(n => ({ href: attr(n, 'href'), main: mainNodes.has(n) }));
  for (const image of nodes.filter(n => n.tagName === 'img')) {
    if (attr(image, 'alt') === undefined || !attr(image, 'width') || !attr(image, 'height')) fail(route + ': image lacks alt or dimensions');
    const sources = [attr(image, 'src'), ...(attr(image, 'srcset') || '').split(',').map(s => s.trim().split(/\s+/)[0])].filter(Boolean);
    for (const source of sources) if (source.startsWith('/') && !await exists(path.join(dir, decodeURIComponent(source.split('?')[0])))) fail(route + ': missing image ' + source);
  }
  pages.push({ route, title, description, canonical, links, ids, schemas });
}

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const page of pages) {
    if (seen.has(page[key])) fail(page.route + ': duplicate ' + key + ' with ' + seen.get(page[key]));
    seen.set(page[key], page.route);
  }
}
const byRoute = new Map(pages.map(p => [p.route, p]));
const incoming = new Map(pages.map(p => [p.route, new Set()]));
for (const page of pages) for (const link of page.links) {
  if (!link.href || /^(tel:|mailto:|javascript:)/.test(link.href)) continue;
  const url = new URL(link.href, origin + page.route);
  if (url.origin !== origin) continue;
  const route = normal(decodeURIComponent(url.pathname));
  const target = byRoute.get(route);
  if (!target) {
    if (!await exists(path.join(dir, url.pathname))) fail(page.route + ': missing link target ' + route);
    continue;
  }
  if (route !== page.route) incoming.get(route).add(page.route);
  if (url.hash && !target.ids.has(decodeURIComponent(url.hash.slice(1)))) fail(page.route + ': missing anchor ' + link.href);
}
for (const [route, from] of incoming) if (route !== '/' && !from.size) fail(route + ': orphan page');
const sitemap = await readFile(path.join(dir, 'sitemap-0.xml'), 'utf8');
const sitemapRoutes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => normal(new URL(m[1]).pathname));
for (const page of pages) if (!sitemapRoutes.includes(page.route)) fail(page.route + ': absent from sitemap');
for (const route of sitemapRoutes) if (!byRoute.has(route)) fail('Sitemap contains a noncanonical page: ' + route);
const home = pages.find(p => p.route === '/');
if (!home?.schemas.some(s => s['@type'] === 'Dentist')) fail('Homepage: missing clinic entity');
const result = { pages: pages.length, staging, errors, warnings };
if (reportPath) {
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(result, null, 2) + '\n');
}
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;

