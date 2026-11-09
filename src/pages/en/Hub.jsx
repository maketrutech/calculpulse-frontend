import { Link } from 'react-router-dom'
import { AdSlot } from '../../components/AdSlot.jsx'
import { Article } from '../../components/Article.jsx'
import { Breadcrumbs } from '../../components/Breadcrumbs.jsx'
import { Faq } from '../../components/Faq.jsx'
import { Seo } from '../../components/Seo.jsx'
import { hub, hubGroups } from '../../content/en/hub.js'
import { preloadRoute } from '../../data/routes.js'

const crumbs = [{ name: 'Home', path: '/en' }, { name: 'Unit converter', path: '/en/convert' }]

export default function EnglishHub() {
  const items = hubGroups.flatMap((group) => group.links.map(([path, name]) => ({ path, name })))
  return (
    <>
      <Seo
        title={hub.title}
        description={hub.description}
        path="/en/convert"
        locale="en"
        crumbs={crumbs}
        faqs={hub.faqs}
        app={{ name: 'Unit converter', description: hub.description }}
        itemList={items}
      />
      <Breadcrumbs items={crumbs} label="Breadcrumb" />
      <h1>{hub.h1}</h1>
      <p className="lede">{hub.lede}</p>
      <div className="hub-grid">
        {hubGroups.map((group) => (
          <section key={group.id} className="hub-card" aria-labelledby={`k-${group.id}`}>
            <h2 id={`k-${group.id}`}>{group.label}</h2>
            <ul>
              {group.links.map(([path, name]) => (
                <li key={path}><Link to={path} onMouseEnter={() => preloadRoute(path)} onFocus={() => preloadRoute(path)}>{name}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <Article sections={hub.sections} />
      <AdSlot placement="content" label="Advertisement" />
      <Faq items={hub.faqs} title="Common questions" />
    </>
  )
}
