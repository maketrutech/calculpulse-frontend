import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo.jsx'
import { routes } from '../data/routes.js'

const groups = ['Pourcentages', 'Commerce et TVA', 'École et maths', 'Maison et mesures', 'Santé', 'Finances', 'Conversions', 'Valeurs converties', 'Informations']

export default function Plan() {
  return (
    <>
      <Seo
        title="Plan du site | CalculPulse"
        description="Toutes les pages de CalculPulse : calculs de pourcentage, TVA, marge, moyenne, produit en croix, IMC, intérêts, conversions d’unités et informations légales."
        path="/plan-du-site"
        crumbs={[{ name: 'Accueil', path: '/' }, { name: 'Plan du site', path: '/plan-du-site' }]}
      />
      <h1>Plan du site</h1>
      <p className="lede">Chaque calculateur et chaque convertisseur a sa propre adresse, y compris les valeurs les plus recherchées comme 55 pouces en cm.</p>
      {groups.map((group) => (
        <section key={group} className="plan">
          <h2>{group}</h2>
          <ul className="plan-grid">
            {routes.filter((route) => route.group === group && route.path !== '/').map((route) => (
              <li key={route.path}><Link to={route.path}>{route.label}</Link></li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
