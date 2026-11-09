import { enCatalog } from './enMap.js'

const textFonts = ['fraunces', 'outfit']
const toolFonts = ['fraunces', 'outfit', 'fragment']

const loadHome = () => import('../pages/en/Home.jsx')
const loadHub = () => import('../pages/en/Hub.jsx')
const loadConvert = () => import('../pages/en/Convert.jsx')
const loadCalc = () => import('../pages/en/Calc.jsx')

function route(path, label, group, file, kind, load) {
  return {
    path,
    label,
    group,
    id: file,
    ids: [file],
    kind,
    fonts: kind === 'home' ? textFonts : toolFonts,
    load,
  }
}

const calcPaths = new Set([
  '/en/percentage-calculator',
  '/en/percentage-increase-calculator',
  '/en/discount-calculator',
  '/en/proportion-calculator',
  '/en/average-calculator',
  '/en/weighted-average-calculator',
  '/en/standard-deviation-calculator',
  '/en/square-root-calculator',
  '/en/roman-numeral-converter',
  '/en/number-to-words',
  '/en/square-footage-calculator',
  '/en/margin-calculator',
  '/en/simple-interest-calculator',
])

export const enRoutes = [
  route('/en', 'Home', 'Information', 'src/pages/en/Home.jsx', 'home', loadHome),
  ...enCatalog.map((item) => {
    if (item.path === '/en/convert') {
      return route(item.path, item.name, item.group, 'src/pages/en/Hub.jsx', 'tool', loadHub)
    }
    if (calcPaths.has(item.path)) {
      return route(item.path, item.name, item.group, 'src/pages/en/Calc.jsx', 'tool', loadCalc)
    }
    return route(item.path, item.name, item.group, 'src/pages/en/Convert.jsx', 'tool', loadConvert)
  }),
]
