import { Link } from 'react-router-dom'
import { useConsent } from '../context/Consent.jsx'
import { enCatalog } from '../data/enMap.js'
import { preloadRoute } from '../data/routes.js'
import site from '../data/site.json'

const legal = [
  { path: '/mentions-legales', name: 'Legal notice' },
  { path: '/politique-de-confidentialite', name: 'Privacy' },
  { path: '/cookies', name: 'Cookies' },
  { path: '/cgu', name: 'Terms' },
  { path: '/contact', name: 'Contact' },
]

const others = [
  { href: 'https://solarpulse.maketru.com/', label: 'SolarPulse' },
  { href: 'https://waterpulse.maketru.com/', label: 'WaterPulse' },
  { href: 'https://docslice.maketru.com/', label: 'DocSlice' },
  { href: 'https://facturepulse.maketru.com/', label: 'FacturePulse' },
  { href: 'https://chronopulse.maketru.com/', label: 'ChronoPulse' },
  { href: 'https://outilspulse.maketru.com/', label: 'OutilsPulse' },
]

function Column({ title, children }) {
  return (
    <div>
      <p className="publisher">{title}</p>
      {children}
    </div>
  )
}

export function FooterEn() {
  const { openBanner } = useConsent()
  const calcs = enCatalog.filter((item) => item.group !== 'Converters')
  const converters = enCatalog.filter((item) => item.path.startsWith('/en/convert'))
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <Column title="CalculPulse">
          <p>Published by {site.publisher}. Free calculators and unit converters. The math runs in your browser, and each page shows the formula.</p>
        </Column>
        <Column title="Calculators">
          <nav aria-label="Calculators">
            {calcs.map((item) => (
              <div key={item.path}><Link to={item.path} onMouseEnter={() => preloadRoute(item.path)} onFocus={() => preloadRoute(item.path)}>{item.name}</Link></div>
            ))}
          </nav>
        </Column>
        <Column title="Converters">
          <nav aria-label="Converters">
            {converters.map((item) => (
              <div key={item.path}><Link to={item.path} onMouseEnter={() => preloadRoute(item.path)} onFocus={() => preloadRoute(item.path)}>{item.name}</Link></div>
            ))}
          </nav>
        </Column>
        <Column title="Information">
          <nav aria-label="Information">
            {legal.map((item) => (
              <div key={item.path}><Link to={item.path}>{item.name}</Link></div>
            ))}
            <div><button type="button" className="linkish" onClick={openBanner}>Manage cookies</button></div>
          </nav>
          <p>Legal pages are published in French.</p>
        </Column>
      </div>
      <div className="footer-network">
        <p className="publisher">Other Maketru tools</p>
        <nav aria-label="Other Maketru tools">
          {others.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
