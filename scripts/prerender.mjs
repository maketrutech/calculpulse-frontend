import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  console.error('dist/index.html has already been prerendered. Run vite build before prerender.')
  process.exit(1)
}
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'))
const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const { pairFor } = await import(pathToFileURL(path.join(root, 'src', 'data', 'enMap.js')).href)
const site = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'site.json'), 'utf8'))

function collectAssets(id, seen = new Set()) {
  if (!id || seen.has(id) || !manifest[id]) return seen
  seen.add(id)
  for (const dep of manifest[id].imports || []) collectAssets(dep, seen)
  return seen
}

function fontHrefs() {
  const hrefs = new Set()
  for (const item of Object.values(manifest)) {
    for (const css of item.css || []) {
      const file = path.join(dist, css)
      if (!fs.existsSync(file)) continue
      const text = fs.readFileSync(file, 'utf8')
      for (const match of text.matchAll(/url\(([^)]+\.woff2)\)/g)) {
        let href = match[1].replace(/['"]/g, '')
        if (href.startsWith('./')) href = path.posix.join('/', path.posix.dirname(css), href.slice(2))
        if (!href.startsWith('/')) href = `/${href.replace(/^\.\//, '')}`
        hrefs.add(href.split('?')[0])
      }
    }
  }
  return [...hrefs]
}

const fonts = fontHrefs()

function preloadFor(route) {
  const files = new Set()
  const seen = new Set()
  for (const rid of route.ids || [route.id]) collectAssets(rid, seen)
  for (const id of seen) {
    const item = manifest[id]
    if (item?.file) files.add(item.file)
    for (const css of item?.css || []) files.add(css)
  }
  const links = []
  for (const file of files) {
    if (file.endsWith('.css')) continue
    links.push(`<link rel="modulepreload" crossorigin href="/${file}">`)
  }
  for (const href of fonts) {
    const name = href.toLowerCase()
    const wanted = (route.fonts || []).some((family) => name.includes(family))
    if (wanted) links.push(`<link rel="preload" as="font" type="font/woff2" crossorigin href="${href}">`)
  }
  return links.join('\n')
}

function wordCount(html) {
  const match = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)
  if (!match) return 0
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ')
  return text.trim().split(/\s+/).filter(Boolean).length
}

function writeHtml(routePath, html) {
  const file = routePath === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, routePath.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}

function localizeShell(html, routePath) {
  // react-helmet-async prints the React prop name hrefLang. The HTML attribute is hreflang.
  let out = html.replaceAll('hrefLang=', 'hreflang=')
  if (!routePath.startsWith('/en')) return out
  return out
    .replace('<html lang="fr">', '<html lang="en">')
    .replace('>Aller au contenu<', '>Skip to content<')
    .replace(
      'Les outils ont besoin de JavaScript pour défiler. Le texte de la page reste lisible sans script.',
      'These tools need JavaScript to run. The text on the page stays readable without it.',
    )
}

function pageLoc(routePath) {
  return routePath === '/' ? `${site.url}/` : `${site.url}${routePath}`
}

const failures = []
const urls = []

for (const route of server.allRoutes) {
  const rendered = await server.render(route.path)
  const page = localizeShell(template
    .replace('<!--app-head-->', `${rendered.head}\n${preloadFor(route)}`)
    .replace('<!--app-html-->', rendered.html), route.path)
  if (!page.includes('<h1')) failures.push(`${route.path} sans h1`)
  if (!page.includes('rel="canonical"') && !page.includes("rel='canonical'")) failures.push(`${route.path} sans canonique`)
  if (!page.includes('name="description"')) failures.push(`${route.path} sans description`)
  if ((route.kind === 'tool' || route.kind === 'home') && wordCount(page) < 280) {
    failures.push(`${route.path} article court (${wordCount(page)} mots)`)
  }
  const head = page.split('</head>')[0]
  const pair = pairFor(route.path)
  if (pair) {
    for (const lang of ['fr', 'en', 'x-default']) {
      if (!head.includes(`hreflang="${lang}"`)) failures.push(`${route.path} sans hreflang ${lang}`)
    }
    if (!head.includes(`href="${pageLoc(pair.fr)}"`) || !head.includes(`href="${pageLoc(pair.en)}"`)) {
      failures.push(`${route.path} hreflang href incorrect`)
    }
  } else if (/<link\b[^>]*hreflang=/.test(head)) {
    failures.push(`${route.path} hreflang sans paire`)
  }
  if (route.path.startsWith('/en') && !page.includes('<html lang="en">')) failures.push(`${route.path} lang`)
  writeHtml(route.path, page)
  urls.push(route.path)
}

const notFound = await server.render('/page-inexistante-calculpulse')
const notFoundHtml = localizeShell(template
  .replace('<!--app-head-->', notFound.head)
  .replace('<!--app-html-->', notFound.html), '/page-inexistante-calculpulse')
fs.writeFileSync(path.join(dist, '404.html'), notFoundHtml)

const enMissing = await server.render('/en/page-inexistante-calculpulse')
const enNotFoundHtml = localizeShell(template
  .replace('<!--app-head-->', enMissing.head)
  .replace('<!--app-html-->', enMissing.html), '/en/page-inexistante-calculpulse')
fs.mkdirSync(path.join(dist, 'en'), { recursive: true })
fs.writeFileSync(path.join(dist, 'en', '404.html'), enNotFoundHtml)

const today = new Date().toISOString().slice(0, 10)
function priorityFor(routePath) {
  if (routePath === '/') return '1.0'
  if (routePath === '/en') return '0.9'
  return routePath.split('/').length > 2 ? '0.6' : '0.8'
}
function alternates(routePath) {
  const pair = pairFor(routePath)
  if (!pair) return ''
  const fr = pageLoc(pair.fr)
  const en = pageLoc(pair.en)
  return `<xhtml:link rel="alternate" hreflang="fr" href="${fr}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${fr}"/>`
}
const body = urls.map((routePath) => {
  const loc = pageLoc(routePath)
  return `  <url><loc>${loc}</loc>${alternates(routePath)}<lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priorityFor(routePath)}</priority></url>`
}).join('\n')
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`Prerendu ${urls.length} pages + 404.html + sitemap.xml`)
