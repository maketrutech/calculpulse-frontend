import { tools } from './catalog.js'
import { convertPaths } from '../content/convert.js'
import { getCached, setCached } from '../lib/routeCache.js'
import { normalizePath } from '../lib/path.js'

const contents = import.meta.glob(['../content/calc/*.js', '!../content/calc/tva-common.js'])

const pages = {
  'src/pages/Home.jsx': () => import('../pages/Home.jsx'),
  'src/pages/Convert.jsx': () => import('../pages/Convert.jsx'),
  'src/pages/Convertir.jsx': () => import('../pages/Convertir.jsx'),
  'src/pages/Legal.jsx': () => import('../pages/Legal.jsx'),
  'src/pages/Plan.jsx': () => import('../pages/Plan.jsx'),
}

const textFonts = ['fraunces', 'outfit']
const toolFonts = ['fraunces', 'outfit', 'fragment']

function route(path, label, group, file, kind, extra = {}) {
  return { path, label, group, id: file, ids: [file], kind, fonts: kind === 'tool' ? toolFonts : textFonts, load: pages[file], ...extra }
}

function calcRoute(tool) {
  const contentKey = `../content/calc/${tool.id}.js`
  const contentId = `src/content/calc/${tool.id}.js`
  return {
    path: tool.path,
    label: tool.name,
    group: tool.group,
    id: 'src/pages/Calc.jsx',
    ids: ['src/pages/Calc.jsx', contentId],
    kind: 'tool',
    fonts: toolFonts,
    load: () => Promise.all([import('../pages/Calc.jsx'), contents[contentKey]()]).then(([page, content]) => ({ default: page.makeCalc(tool.id, content.default) })),
  }
}

export const routes = [
  route('/', 'Accueil', 'Informations', 'src/pages/Home.jsx', 'home'),
  ...tools.filter((t) => t.id !== 'convertir').map(calcRoute),
  route('/convertir', 'Toutes les conversions', 'Conversions', 'src/pages/Convertir.jsx', 'tool'),
  ...convertPaths.map((path) => {
    const slug = path.slice('/convertir/'.length)
    const value = /^\d/.test(slug)
    return route(path, slug.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()).replace(' m2', ' m²').replace('kmh', 'km/h'), value ? 'Valeurs converties' : 'Conversions', 'src/pages/Convert.jsx', 'tool')
  }),
  route('/plan-du-site', 'Plan du site', 'Informations', 'src/pages/Plan.jsx', 'utility'),
  route('/mentions-legales', 'Mentions légales', 'Informations', 'src/pages/Legal.jsx', 'legal'),
  route('/politique-de-confidentialite', 'Politique de confidentialité', 'Informations', 'src/pages/Legal.jsx', 'legal'),
  route('/cookies', 'Cookies', 'Informations', 'src/pages/Legal.jsx', 'legal'),
  route('/cgu', 'Conditions d’utilisation', 'Informations', 'src/pages/Legal.jsx', 'legal'),
  route('/contact', 'Contact', 'Informations', 'src/pages/Legal.jsx', 'legal'),
]

export function matchRoute(pathname) {
  const path = normalizePath(pathname)
  return routes.find((item) => item.path === path) || null
}

export async function preloadRoute(pathname) {
  const item = matchRoute(pathname)
  if (!item) return null
  const cached = getCached(item.path)
  if (cached) return cached
  const mod = await item.load()
  setCached(item.path, mod.default)
  return mod.default
}
