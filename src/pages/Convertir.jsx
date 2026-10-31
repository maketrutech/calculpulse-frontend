import { Link } from 'react-router-dom'
import { AdSlot } from '../components/AdSlot.jsx'
import { Article } from '../components/Article.jsx'
import { Breadcrumbs } from '../components/Breadcrumbs.jsx'
import { Faq } from '../components/Faq.jsx'
import { Seo } from '../components/Seo.jsx'
import { pairs, valuePages, convPath, pairMap } from '../data/conversions.js'
import { preloadRoute } from '../data/routes.js'
import { UNITS } from '../lib/units.js'

const kinds = [
  ['longueur', 'Longueurs et distances'],
  ['masse', 'Masses et poids'],
  ['volume', 'Volumes et cuisine'],
  ['température', 'Températures'],
  ['vitesse', 'Vitesses'],
  ['surface', 'Surfaces'],
]

const sections = [
  { h2: 'Des conversions exactes', paragraphs: ['Chaque convertisseur utilise la définition légale de l’unité, pas une valeur arrondie : le pouce vaut exactement 2,54 cm, le pied 30,48 cm, le mile 1 609,344 m et la livre 0,453 592 37 kg, comme le fixe l’accord international de 1959 sur les unités anglo-saxonnes. Le gallon retenu est le gallon américain de 3,785 411 784 litres, le plus courant dans les recettes, les fiches techniques et les prix de carburant.', 'Les résultats s’affichent avec la virgule décimale et jusqu’à six chiffres après la virgule, puis sont arrondis dans les tableaux pour rester lisibles.'] },
  { h2: 'Comment utiliser les convertisseurs', steps: ['Choisissez la paire d’unités dans la liste ci-dessus.', 'Tapez une valeur dans le premier champ ; le second se met à jour pendant la saisie.', 'Pour la conversion inverse, tapez directement dans le second champ, ou suivez le lien « conversion inverse ».', 'Consultez le tableau de la page pour les valeurs les plus fréquentes et l’astuce de calcul mental.'] },
  { h2: 'Pourquoi tant d’unités différentes ?', paragraphs: ['Le système métrique, né en France à la Révolution, est aujourd’hui légal presque partout. Les États-Unis gardent pourtant le système usuel américain (pouces, pieds, miles, livres, gallons, degrés Fahrenheit) et le Royaume-Uni mélange les deux : miles sur les routes, stones pour le poids, pintes au pub. L’aviation et la marine utilisent les pieds, les nœuds et les milles marins dans le monde entier. Les écrans et les jantes sont cotés en pouces même en France. D’où l’utilité d’un convertisseur fiable dès qu’on achète, voyage, cuisine ou bricole avec des références étrangères.'] },
  { h2: 'Et les calculs ?', paragraphs: ['Pour une surface de pièce, voir le [[/calcul-surface-m2|calcul de surface en m²]]. Pour une proportion ou une recette à adapter, le [[/produit-en-croix|produit en croix]] fait le calcul en une ligne.'] },
]

const faqs = [
  { q: 'Les conversions sont-elles arrondies ?', a: 'Le calcul utilise les facteurs exacts. L’affichage est limité à six décimales dans le convertisseur et à trois dans les tableaux.' },
  { q: 'Pourquoi le gallon américain et pas le gallon impérial ?', a: 'Il est le plus fréquent sur les sites et dans les recettes. Le gallon impérial britannique vaut 4,546 litres, soit environ 1,2 gallon américain.' },
  { q: 'Les convertisseurs fonctionnent-ils hors connexion ?', a: 'Une fois la page chargée, oui : le calcul se fait entièrement dans votre navigateur.' },
]

export default function ConvertirHub() {
  const crumbs = [{ name: 'Accueil', path: '/' }, { name: 'Conversions', path: '/convertir' }]
  const items = [...pairs.map((p) => ({ name: p.name, path: convPath(p.slug) })), ...valuePages.map((v) => ({ name: v.slug.replace(/-/g, ' '), path: convPath(v.slug) }))]
  return (
    <>
      <Seo
        title="Conversion d’unités en ligne : pouces, miles, livres, °F | CalculPulse"
        description="Convertisseurs d’unités gratuits : pouce en cm, lbs en kg, mile en km, Fahrenheit en Celsius, gallon en litre, mph en km/h, hectare en m² et plus encore."
        path="/convertir"
        crumbs={crumbs}
        faqs={faqs}
        itemList={items}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Conversions d’unités</h1>
      <p className="lede">24 convertisseurs entre unités anglo-saxonnes et métriques, avec tableaux et astuces. Choisissez une paire : la conversion se fait dans les deux sens.</p>
      <div className="hub-grid">
        {kinds.map(([kind, label]) => (
          <section key={kind} className="hub-card" aria-labelledby={`k-${kind}`}>
            <h2 id={`k-${kind}`}>{label}</h2>
            <ul>
              {pairs.filter((p) => UNITS[p.from].kind === kind).map((p) => (
                <li key={p.slug}><Link to={convPath(p.slug)} onMouseEnter={() => preloadRoute(convPath(p.slug))} onFocus={() => preloadRoute(convPath(p.slug))}>{p.name}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="hub-values" aria-labelledby="k-values">
        <h2 id="k-values">Valeurs les plus recherchées</h2>
        <nav className="chip-row" aria-labelledby="k-values">
          {valuePages.map((v) => {
            const p = pairMap[v.pair]
            return <Link key={v.slug} className="chip" to={convPath(v.slug)}>{v.value} {UNITS[p.from].p} en {UNITS[p.to].sym}</Link>
          })}
        </nav>
      </section>
      <Article sections={sections} />
      <AdSlot placement="content" />
      <Faq items={faqs} />
    </>
  )
}
