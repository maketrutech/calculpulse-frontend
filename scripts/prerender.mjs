import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'))
const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
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

const failures = []
const urls = []

for (const route of server.routes) {
  const rendered = await server.render(route.path)
  const page = template
    .replace('<!--app-head-->', `${rendered.head}\n${preloadFor(route)}`)
    .replace('<!--app-html-->', rendered.html)
  if (!page.includes('<h1')) failures.push(`${route.path} sans h1`)
  if (!page.includes('rel="canonical"') && !page.includes("rel='canonical'")) failures.push(`${route.path} sans canonique`)
  if (!page.includes('name="description"')) failures.push(`${route.path} sans description`)
  if ((route.kind === 'tool' || route.kind === 'home') && wordCount(page) < 280) {
    failures.push(`${route.path} article court (${wordCount(page)} mots)`)
  }
  writeHtml(route.path, page)
  urls.push(route.path)
}

const notFound = await server.render('/page-inexistante-calculpulse')
const notFoundHtml = template
  .replace('<!--app-head-->', notFound.head)
  .replace('<!--app-html-->', notFound.html)
fs.writeFileSync(path.join(dist, '404.html'), notFoundHtml)

const today = new Date().toISOString().slice(0, 10)
const body = urls.map((routePath) => {
  const loc = routePath === '/' ? `${site.url}/` : `${site.url}${routePath}`
  const priority = routePath === '/' ? '1.0' : routePath.split('/').length > 2 ? '0.6' : '0.8'
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
}).join('\n')
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`Prerendu ${urls.length} pages + 404.html + sitemap.xml`)
