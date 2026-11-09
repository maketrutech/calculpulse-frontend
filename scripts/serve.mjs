import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import zlib from 'node:zlib'

const root = path.join(process.cwd(), 'dist')
const port = Number(process.env.PORT || 4173)
const hosting = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'firebase.json'), 'utf8')).hosting

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

function headersFor(urlPath) {
  const headers = {}
  for (const rule of hosting.headers || []) {
    const source = rule.source
    const ok = source === '**'
      || (source === '/assets/**' && urlPath.startsWith('/assets/'))
      || (source === '**/*.html' && urlPath.endsWith('.html'))
      || source === urlPath
    if (!ok) continue
    for (const header of rule.headers) {
      if (header.key === 'Content-Security-Policy' && urlPath.startsWith('/')) {
        headers[header.key] = header.value.replace('; upgrade-insecure-requests', '')
      } else if (header.key !== 'Strict-Transport-Security') {
        headers[header.key] = header.value
      }
    }
  }
  return headers
}

function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const relative = clean === '/' ? 'index.html' : clean.replace(/^\//, '')
  const direct = path.join(root, relative)
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return { file: direct, status: 200 }
  const index = path.join(root, relative, 'index.html')
  if (fs.existsSync(index)) return { file: index, status: 200 }
  return { file: path.join(root, '404.html'), status: 404 }
}

const server = http.createServer((req, res) => {
  const found = fileFor(req.url || '/')
  const data = fs.readFileSync(found.file)
  const ext = path.extname(found.file)
  const headers = {
    'Content-Type': types[ext] || 'application/octet-stream',
    ...headersFor(new URL(req.url || '/', 'http://127.0.0.1').pathname === '/' && ext === '.html' && found.status === 200
      ? '/index.html'
      : new URL(req.url || '/', 'http://127.0.0.1').pathname),
  }
  if (found.status === 200 && (req.url || '').endsWith('/') === false && ext === '') {
    headers['Content-Type'] = types['.html']
  }
  const compressible = /\.(html|js|css|svg|xml|txt|json)$/.test(found.file)
  if (compressible && (req.headers['accept-encoding'] || '').includes('gzip')) {
    const gzipped = zlib.gzipSync(data)
    res.writeHead(found.status, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' })
    res.end(gzipped)
    return
  }
  res.writeHead(found.status, headers)
  res.end(data)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`http://127.0.0.1:${port}`)
})
