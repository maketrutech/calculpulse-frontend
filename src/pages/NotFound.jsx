import { Link, useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo.jsx'
import { tools } from '../data/catalog.js'
import { isEnglishPath } from '../data/enMap.js'
import { normalizePath } from '../lib/path.js'
import { EnglishNotFound } from './en/NotFound.jsx'

export function NotFound() {
  const { pathname } = useLocation()
  if (isEnglishPath(normalizePath(pathname))) return <EnglishNotFound />
  return (
    <>
      <Seo
        title="Page introuvable | CalculPulse"
        description="Cette adresse ne correspond à aucun outil CalculPulse. Retrouvez les calculatrices et conversions depuis l’accueil."
        path="/404"
        noindex
      />
      <h1>Cette page n’existe pas</h1>
      <p className="lede">Le lien est peut-être ancien. Les calculatrices, elles, sont toujours là.</p>
      <ul className="related-grid">
        {tools.filter((t) => t.featured).slice(0, 6).map((tool) => (
          <li key={tool.id}><Link to={tool.path}><span className="tool-name">{tool.name}</span><span className="tool-blurb">{tool.blurb}</span></Link></li>
        ))}
      </ul>
      <p><Link to="/">Retour à l’accueil</Link></p>
    </>
  )
}
