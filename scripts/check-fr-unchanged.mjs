// Compares the built French site with the snapshot taken before the English
// pages existed. Asset hashes are ignored. The only allowed differences on a
// French page are hreflang alternates (real pairs only) and the FR/EN link.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const baselinePath = path.join(root, 'scripts', 'fr-baseline.json')
const write = process.argv.includes('--write')

function read(file) {
  return fs.readFileSync(file, 'utf8')
}

function walkHtml(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    const rel = path.relative(dist, full)
    if (rel === 'en' || rel.startsWith(`en${path.sep}`)) continue
    if (ent.isDirectory()) walkHtml(full, acc)
    else if (ent.name.endsWith('.html')) acc.push(full)
  }
  return acc
}

function routeOf(file) {
  const rel = path.relative(dist, file).split(path.sep).join('/')
  if (rel === 'index.html') return '/'
  if (rel === '404.html') return '__404__'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`
  return `/${rel.replace(/\.html$/, '')}`
}

function seoChunk(html) {
  const start = html.indexOf('<title')
  const end = html.indexOf('<link rel="modulepreload"')
  if (start < 0 || end < 0) return ''
  return html
    .slice(start, end)
    .replace(/<link\b[^>]*\brel="alternate"[^>]*>/g, '')
    .replace(/>\s+</g, '><')
    .trim()
}

function region(html, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const match = re.exec(html)
  return match ? match[1] : ''
}

function stripSwitcher(html) {
  return html.replace(/<a\b[^>]*\bclass="lang-switch"[^>]*>[\s\S]*?<\/a>/g, '')
}

function tight(html) {
  return stripSwitcher(html).replace(/>\s+</g, '><').trim()
}

function hreflangs(html) {
  const head = html.split('</head>')[0]
  const tags = head.match(/<link\b[^>]*\brel="alternate"[^>]*>/g) || []
  return tags.map((tag) => ({
    lang: /hreflang="([^"]*)"/.exec(tag)?.[1] || '',
    href: /href="([^"]*)"/.exec(tag)?.[1] || '',
  })).sort((a, b) => a.lang.localeCompare(b.lang))
}

function switcher(html) {
  const tag = /<a\b[^>]*\bclass="lang-switch"[^>]*>[\s\S]*?<\/a>/.exec(html)
  if (!tag) return null
  return {
    href: /href="([^"]*)"/.exec(tag[0])?.[1] || '',
    text: tag[0].replace(/<[^>]+>/g, '').trim(),
  }
}

function canonical(html) {
  const head = html.split('</head>')[0]
  const tags = head.match(/<link\b[^>]*\brel="canonical"[^>]*>/g) || []
  if (tags.length !== 1) return null
  return /href="([^"]*)"/.exec(tags[0])?.[1] || null
}

function fingerprint(html) {
  return {
    lang: /<html\b[^>]*\blang="([^"]*)"/.exec(html)?.[1] || '',
    skip: /<a class="skip"[^>]*>([^<]*)<\/a>/.exec(html)?.[1] || '',
    noscript: /<p class="noscript">([^<]*)<\/p>/.exec(html)?.[1] || '',
    seo: seoChunk(html),
    header: tight(region(html, 'header')),
    main: tight(region(html, 'main')),
    footer: tight(region(html, 'footer')),
    h1: [...html.matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1]),
  }
}

function sitemapFrenchPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .filter((pathname) => pathname === '/' || !pathname.startsWith('/en'))
    .map((pathname) => (pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname))
    .sort()
}

function frenchSnapshot() {
  const pages = {}
  const urls = []
  for (const file of walkHtml(dist)) {
    const route = routeOf(file)
    pages[route] = fingerprint(read(file))
    if (route !== '__404__') urls.push(route)
  }
  urls.sort()
  const sitemap = sitemapFrenchPaths(read(path.join(dist, 'sitemap.xml')))
  return { urls, sitemap, pages }
}

function stableSeo(chunk) {
  return chunk
    .replace(/<script\b[^>]*\btype="module"[^>]*>\s*<\/script>/g, '')
    .replace(/<link\b[^>]*\brel="(?:modulepreload|stylesheet)"[^>]*>/g, '')
    .replace(/>\s+</g, '><')
    .trim()
}

function snippet(a, b) {
  const n = Math.min(a.length, b.length)
  let i = 0
  while (i < n && a[i] === b[i]) i += 1
  const slice = (s) => s.slice(Math.max(0, i - 60), i + 100)
  return `at ${i}\n  before: ${JSON.stringify(slice(a))}\n  after:  ${JSON.stringify(slice(b))}`
}

if (write) {
  const snap = frenchSnapshot()
  fs.writeFileSync(baselinePath, JSON.stringify(snap))
  console.log(`Wrote ${baselinePath} (${snap.urls.length} French URLs + 404)`)
  process.exit(0)
}

if (!fs.existsSync(baselinePath)) {
  console.error('Missing scripts/fr-baseline.json. Build the French site and run with --write first.')
  process.exit(1)
}

const before = JSON.parse(read(baselinePath))
const after = frenchSnapshot()
const failures = []

function sameList(name, a, b) {
  if (a.join('\n') !== b.join('\n')) {
    const dropped = a.filter((item) => !b.includes(item))
    const added = b.filter((item) => !a.includes(item))
    failures.push(`${name} changed. dropped: ${dropped.join(', ') || '—'}. added: ${added.join(', ') || '—'}`)
  }
}

sameList('French HTML URLs', before.urls, after.urls)
sameList('French sitemap URLs', before.sitemap, after.sitemap)
if (after.urls.join('\n') !== after.sitemap.join('\n')) {
  failures.push('French HTML URLs and French sitemap URLs are not the same set')
}

for (const route of before.urls.concat('__404__')) {
  const oldPage = before.pages[route]
  const newPage = after.pages[route]
  if (!oldPage || !newPage) {
    failures.push(`${route} missing from ${oldPage ? 'the new build' : 'the baseline'}`)
    continue
  }
  for (const key of ['lang', 'skip', 'noscript', 'seo', 'header', 'main', 'footer']) {
    const oldValue = key === 'seo' ? stableSeo(oldPage[key]) : oldPage[key]
    const newValue = key === 'seo' ? stableSeo(newPage[key]) : newPage[key]
    if (oldValue !== newValue) {
      failures.push(`${route} ${key} changed ${snippet(oldValue, newValue)}`)
    }
  }
  if (oldPage.h1.join('|') !== newPage.h1.join('|')) {
    failures.push(`${route} h1 changed: ${JSON.stringify(oldPage.h1)} → ${JSON.stringify(newPage.h1)}`)
  }
  if (newPage.lang !== 'fr') failures.push(`${route} html lang is ${newPage.lang}`)
}

const { pairs, pairFor, switchTarget, isEnglishPath } = await import(pathToFileURL(path.join(root, 'src', 'data', 'enMap.js')).href)
const site = JSON.parse(read(path.join(root, 'src', 'data', 'site.json')))
function pageUrl(routePath) {
  if (!routePath || routePath === '/') return `${site.url}/`
  return `${site.url}${routePath}`
}

const enPaths = new Set(pairs.map((pair) => pair.en))
const frPaths = new Set(pairs.map((pair) => pair.fr))

function expectedHreflang(pair) {
  const fr = pageUrl(pair.fr)
  const en = pageUrl(pair.en)
  return [
    { lang: 'en', href: en },
    { lang: 'fr', href: fr },
    { lang: 'x-default', href: fr },
  ].sort((a, b) => a.lang.localeCompare(b.lang))
}

function fileFor(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html')
  return path.join(dist, routePath.slice(1), 'index.html')
}

for (const route of after.urls.concat('__404__')) {
  const file = route === '__404__' ? path.join(dist, '404.html') : fileFor(route)
  const html = read(file)
  const found = hreflangs(html)
  const pair = pairFor(route === '__404__' ? '/404' : route)
  if (!pair) {
    if (found.length) failures.push(`${route} has hreflang but no English pair: ${JSON.stringify(found)}`)
  } else if (JSON.stringify(found) !== JSON.stringify(expectedHreflang(pair))) {
    failures.push(`${route} hreflang ${JSON.stringify(found)} ≠ ${JSON.stringify(expectedHreflang(pair))}`)
  }
  const link = switcher(html)
  const target = switchTarget(route === '__404__' ? '/404' : route)
  if (!link) failures.push(`${route} is missing the language switcher`)
  else if (link.href !== target || link.text !== 'EN') {
    failures.push(`${route} switcher is ${JSON.stringify(link)}, expected EN → ${target}`)
  }
  if (frPaths.has(route) !== Boolean(pairFor(route))) {
    failures.push(`${route} pair map does not match the French route`)
  }
}

const enHtml = []
function walkEn(dir) {
  if (!fs.existsSync(dir)) return
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walkEn(full)
    else if (ent.name.endsWith('.html')) enHtml.push(full)
  }
}
walkEn(path.join(dist, 'en'))

const builtEn = new Set(enHtml.map((file) => {
  const rel = path.relative(path.join(dist, 'en'), file).split(path.sep).join('/')
  if (rel === 'index.html') return '/en'
  if (rel === '404.html') return '/en/404'
  if (rel.endsWith('/index.html')) return `/en/${rel.slice(0, -'/index.html'.length)}`
  return `/en/${rel.replace(/\.html$/, '')}`
}))

for (const route of enPaths) {
  if (!builtEn.has(route)) failures.push(`${route} was not prerendered`)
}
for (const route of builtEn) {
  if (route === '/en/404') continue
  if (!enPaths.has(route)) failures.push(`${route} is an English page without a French pair`)
}

const sitemap = read(path.join(dist, 'sitemap.xml'))
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/')

for (const pair of pairs) {
  const file = fileFor(pair.en)
  if (!fs.existsSync(file)) continue
  const html = read(file)
  const lang = /<html\b[^>]*\blang="([^"]*)"/.exec(html)?.[1]
  if (lang !== 'en') failures.push(`${pair.en} html lang is ${lang}`)
  const canon = canonical(html)
  if (canon !== pageUrl(pair.en)) failures.push(`${pair.en} canonical ${canon} ≠ ${pageUrl(pair.en)}`)
  const found = hreflangs(html)
  if (JSON.stringify(found) !== JSON.stringify(expectedHreflang(pair))) {
    failures.push(`${pair.en} hreflang ${JSON.stringify(found)}`)
  }
  const link = switcher(html)
  if (!link || link.href !== pair.fr || link.text !== 'FR') {
    failures.push(`${pair.en} switcher ${JSON.stringify(link)}`)
  }
  if (!html.includes('<h1')) failures.push(`${pair.en} has no h1`)
  if (!html.includes('name="description"')) failures.push(`${pair.en} has no description`)
  if (!sitemapPaths.includes(pair.en === '/' ? '/' : pair.en)) failures.push(`${pair.en} missing from sitemap`)
  if (isEnglishPath(pair.fr)) failures.push(`${pair.fr} is marked English`)
  const frFile = pair.fr === '/' ? path.join(dist, 'index.html') : fileFor(pair.fr)
  if (!fs.existsSync(frFile)) failures.push(`French pair missing on disk: ${pair.fr}`)
}

const en404 = path.join(dist, 'en', '404.html')
if (!fs.existsSync(en404)) failures.push('dist/en/404.html is missing')
else {
  const html = read(en404)
  if (!/lang="en"/.test(html)) failures.push('English 404 is not lang=en')
  if (!html.includes('noindex')) failures.push('English 404 is indexable')
  if (sitemap.includes('/en/404')) failures.push('English 404 is in the sitemap')
  if (hreflangs(html).length) failures.push('English 404 has hreflang')
}

if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
  failures.push('sitemap is missing the xhtml namespace')
}

if (failures.length) {
  console.error(failures.join('\n\n'))
  console.error(`\n${failures.length} French/English check failure(s)`)
  process.exit(1)
}

console.log(`French unchanged: ${after.urls.length} URLs match the baseline (hreflang + switcher only). ${pairs.length} English pages prerendered.`)
