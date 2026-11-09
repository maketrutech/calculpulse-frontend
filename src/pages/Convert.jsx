import { useLocation } from 'react-router-dom'
import { ToolPage } from '../components/ToolPage.jsx'
import { convertPage } from '../content/convert.js'
import { pairMap, valuePages, convPath } from '../data/conversions.js'
import { normalizePath } from '../lib/path.js'
import { UNITS } from '../lib/units.js'
import { Converter } from '../tools/Converter.jsx'

const kindLabel = { longueur: 'Longueur', masse: 'Masse', volume: 'Volume', vitesse: 'Vitesse', surface: 'Surface', 'température': 'Température' }

function linkItem(slug) {
  const pair = pairMap[slug]
  if (pair) {
    const a = UNITS[pair.from]
    const b = UNITS[pair.to]
    return { path: convPath(slug), name: pair.name, group: kindLabel[a.kind], blurb: `Convertir des ${a.p} (${a.sym}) en ${b.p} (${b.sym}).` }
  }
  const v = valuePages.find((x) => x.slug === slug)
  const p = pairMap[v.pair]
  return { path: convPath(slug), name: `${String(v.value)} ${UNITS[p.from].p} en ${UNITS[p.to].sym}`, group: kindLabel[UNITS[p.from].kind], blurb: 'Résultat détaillé et tableau.' }
}

export default function ConvertPage() {
  const { pathname } = useLocation()
  const page = convertPage(normalizePath(pathname))
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Conversions', path: '/convertir' },
    ...(page.parent ? [page.parent] : []),
    { name: page.crumbName, path: page.path },
  ]
  return (
    <ToolPage
      key={page.path}
      title={page.title}
      description={page.description}
      path={page.path}
      h1={page.h1}
      lede={page.lede}
      appName={`Convertisseur ${page.crumbName.toLowerCase()}`}
      crumbs={crumbs}
      sections={page.sections}
      faqs={page.faqs}
      relatedItems={page.related.map(linkItem)}
    >
      <Converter key={page.path} {...page.converter} />
    </ToolPage>
  )
}
