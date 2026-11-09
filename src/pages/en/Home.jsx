import { Link } from 'react-router-dom'
import { AdSlot } from '../../components/AdSlot.jsx'
import { Article } from '../../components/Article.jsx'
import { Faq } from '../../components/Faq.jsx'
import { Seo } from '../../components/Seo.jsx'
import { home } from '../../content/en/home.js'
import { enCatalog, enGroups } from '../../data/enMap.js'
import { preloadRoute } from '../../data/routes.js'

const chips = [
  ['/en/convert/kg-to-lbs', 'Kg to lbs'],
  ['/en/convert/cm-to-inches', 'Cm to inches'],
  ['/en/convert/celsius-to-fahrenheit', '°C to °F'],
  ['/en/convert/km-to-miles', 'Km to miles'],
  ['/en/convert/gallons-to-liters', 'Gallons to liters'],
  ['/en/percentage-calculator', 'Percentage'],
  ['/en/square-footage-calculator', 'Square footage'],
  ['/en/margin-calculator', 'Margin'],
]

export default function EnglishHome() {
  const tools = enCatalog.filter((item) => item.path !== '/en/convert' && !item.path.startsWith('/en/convert/'))
  return (
    <>
      <Seo
        title={home.title}
        description={home.description}
        path="/en"
        locale="en"
        crumbs={[{ name: 'Home', path: '/en' }]}
        faqs={home.faqs}
        itemList={enCatalog}
      />
      <h1>{home.h1}</h1>
      <p className="lede">{home.lede}</p>
      <ul className="tool-grid">
        {enCatalog.filter((item) => item.featured).map((item) => (
          <li key={item.path} className="featured">
            <Link to={item.path} onMouseEnter={() => preloadRoute(item.path)} onFocus={() => preloadRoute(item.path)}>
              <span className="kicker">{item.group}</span>
              <span className="tool-name">{item.name}</span>
              <span className="tool-blurb">{item.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
      <nav aria-label="Popular converters" className="chip-row home-chips">
        {chips.map(([path, name]) => (
          <Link key={path} className="chip" to={path} onMouseEnter={() => preloadRoute(path)} onFocus={() => preloadRoute(path)}>{name}</Link>
        ))}
      </nav>
      {enGroups.filter((group) => group !== 'Converters').map((group) => (
        <section key={group} className="home-group" aria-labelledby={`g-${group}`}>
          <h2 id={`g-${group}`}>{group}</h2>
          <ul className="mini-grid">
            {tools.filter((item) => item.group === group).map((item) => (
              <li key={item.path}>
                <Link to={item.path} onMouseEnter={() => preloadRoute(item.path)} onFocus={() => preloadRoute(item.path)}>
                  <span className="tool-name">{item.name}</span>
                  <span className="tool-blurb">{item.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Article sections={home.sections} />
      <AdSlot placement="content" label="Advertisement" />
      <Faq items={home.faqs} title="Common questions" />
    </>
  )
}
