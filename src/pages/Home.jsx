import { Link } from 'react-router-dom'
import { AdSlot } from '../components/AdSlot.jsx'
import { Article } from '../components/Article.jsx'
import { Faq } from '../components/Faq.jsx'
import { Seo } from '../components/Seo.jsx'
import { home } from '../content/home.js'
import { groups, tools } from '../data/catalog.js'
import { preloadRoute } from '../data/routes.js'

const popular = [
  ['/convertir/pouce-en-cm', 'Pouce en cm'],
  ['/convertir/livre-en-kg', 'Lbs en kg'],
  ['/convertir/mile-en-km', 'Mile en km'],
  ['/convertir/55-pouces-en-cm', '55 pouces en cm'],
  ['/convertir/fahrenheit-en-celsius', '°F en °C'],
  ['/convertir/gallon-en-litre', 'Gallon en litre'],
  ['/convertir/mph-en-kmh', 'Mph en km/h'],
  ['/convertir/hectare-en-m2', 'Hectare en m²'],
]

export default function HomePage() {
  return (
    <>
      <Seo
        title={home.title}
        description={home.description}
        path="/"
        crumbs={[{ name: 'Accueil', path: '/' }]}
        faqs={home.faqs}
        itemList={tools}
      />
      <h1>{home.h1}</h1>
      <p className="lede">{home.lede}</p>
      <ul className="tool-grid">
        {tools.filter((t) => t.featured).map((tool) => (
          <li key={tool.id} className="featured">
            <Link to={tool.path} onMouseEnter={() => preloadRoute(tool.path)} onFocus={() => preloadRoute(tool.path)}>
              <span className="kicker">{tool.group}</span>
              <span className="tool-name">{tool.name}</span>
              <span className="tool-blurb">{tool.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
      <nav aria-label="Conversions populaires" className="chip-row home-chips">
        {popular.map(([path, name]) => (
          <Link key={path} className="chip" to={path} onMouseEnter={() => preloadRoute(path)} onFocus={() => preloadRoute(path)}>{name}</Link>
        ))}
      </nav>
      {groups.filter((g) => g !== 'Conversions').map((group) => (
        <section key={group} className="home-group" aria-labelledby={`g-${group}`}>
          <h2 id={`g-${group}`}>{group}</h2>
          <ul className="mini-grid">
            {tools.filter((t) => t.group === group).map((tool) => (
              <li key={tool.id}>
                <Link to={tool.path} onMouseEnter={() => preloadRoute(tool.path)} onFocus={() => preloadRoute(tool.path)}>
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-blurb">{tool.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Article sections={home.sections} />
      <AdSlot placement="content" />
      <Faq items={home.faqs} />
    </>
  )
}
