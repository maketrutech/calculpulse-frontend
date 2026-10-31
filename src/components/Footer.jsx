import { Link } from 'react-router-dom'
import { tools } from '../data/catalog.js'
import { preloadRoute } from '../data/routes.js'
import { useConsent } from '../context/Consent.jsx'
import site from '../data/site.json'

const legal = [
  { path: '/mentions-legales', name: 'Mentions légales' },
  { path: '/politique-de-confidentialite', name: 'Confidentialité' },
  { path: '/cookies', name: 'Cookies' },
  { path: '/cgu', name: 'CGU' },
  { path: '/contact', name: 'Contact' },
  { path: '/plan-du-site', name: 'Plan du site' },
]

const autres = [
  { href: 'https://solarpulse.maketru.com/', label: 'Simulateur solaire gratuit' },
  { href: 'https://waterpulse.maketru.com/', label: 'Calculateur cuve eau de pluie' },
  { href: 'https://docslice.maketru.com/', label: 'Fusionner des PDF' },
  { href: 'https://facturepulse.maketru.com/', label: 'Comparateur facturation électronique' },
  { href: 'https://chronopulse.maketru.com/', label: 'Minuteur et chronomètre en ligne' },
  { href: 'https://outilspulse.maketru.com/', label: 'Outils en ligne' },
]

function Column({ title, children }) {
  return (
    <div>
      <p className="publisher">{title}</p>
      {children}
    </div>
  )
}

function ToolLinks({ items, label }) {
  return (
    <nav aria-label={label}>
      {items.map((tool) => (
        <div key={tool.path}><Link to={tool.path} onMouseEnter={() => preloadRoute(tool.path)} onFocus={() => preloadRoute(tool.path)}>{tool.name}</Link></div>
      ))}
    </nav>
  )
}

const popular = [
  { path: '/convertir/pouce-en-cm', name: 'Pouces en cm' },
  { path: '/convertir/livre-en-kg', name: 'Livres (lbs) en kg' },
  { path: '/convertir/mile-en-km', name: 'Miles en km' },
  { path: '/convertir/gallon-en-litre', name: 'Gallons en litres' },
  { path: '/convertir/fahrenheit-en-celsius', name: 'Fahrenheit en Celsius' },
  { path: '/convertir', name: 'Toutes les conversions' },
]

export function Footer() {
  const { openBanner } = useConsent()
  const pick = (...names) => tools.filter((tool) => names.includes(tool.group))
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <Column title="CalculPulse">
          <p>Édité par {site.publisher}. Calculatrices et convertisseurs gratuits, calculés dans votre navigateur, avec la méthode expliquée.</p>
        </Column>
        <Column title="Pourcentages et TVA">
          <ToolLinks label="Pourcentages et TVA" items={pick('Pourcentages', 'Commerce et TVA')} />
        </Column>
        <Column title="École, santé et finances">
          <ToolLinks label="École, santé et finances" items={pick('École et maths', 'Maison et mesures', 'Santé', 'Finances')} />
        </Column>
        <Column title="Conversions">
          <ToolLinks label="Conversions populaires" items={popular} />
        </Column>
        <Column title="Informations">
          <nav aria-label="Informations">
            {legal.map((item) => (
              <div key={item.path}><Link to={item.path} onMouseEnter={() => preloadRoute(item.path)} onFocus={() => preloadRoute(item.path)}>{item.name}</Link></div>
            ))}
            <div><button type="button" className="linkish" onClick={openBanner}>Gérer les cookies</button></div>
          </nav>
        </Column>
      </div>
      <div className="footer-network">
        <p className="publisher">Autres outils Maketru</p>
        <nav aria-label="Autres outils Maketru">
          {autres.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
