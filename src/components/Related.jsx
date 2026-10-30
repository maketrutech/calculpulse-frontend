import { Link } from 'react-router-dom'
import { toolMap } from '../data/catalog.js'
import { preloadRoute } from '../data/routes.js'

export function Related({ ids, items: given }) {
  const items = given || (ids || []).map((id) => toolMap[id]).filter(Boolean)
  if (!items.length) return null
  return (
    <section aria-labelledby="related-title">
      <h2 id="related-title">Outils associés</h2>
      <ul className="related-grid">
        {items.map((tool) => (
          <li key={tool.path}>
            <Link to={tool.path} onMouseEnter={() => preloadRoute(tool.path)} onFocus={() => preloadRoute(tool.path)}>
              <span className="kicker">{tool.group}</span>
              <span className="tool-name">{tool.name}</span>
              <span className="tool-blurb">{tool.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
