import { fmt } from '../lib/num.js'
import { UNITS, convert } from '../lib/units.js'
import { pairMap, pairs, valuePages, convPath } from '../data/conversions.js'

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const unitName = (u, n) => (Math.abs(n) >= 2 ? u.p : u.s)

function formulaText(pair) {
  const a = UNITS[pair.from]
  const b = UNITS[pair.to]
  if (pair.from === 'fahrenheit') return '°C = (°F − 32) × 5 ÷ 9'
  if (pair.from === 'celsius') return '°F = °C × 9 ÷ 5 + 32'
  const k = convert(1, pair.from, pair.to)
  return k >= 1
    ? `${b.sym} = ${a.sym} × ${fmt(k, 6)}`
    : `${b.sym} = ${a.sym} ÷ ${fmt(1 / k, 6)}`
}

function rows(pair, values) {
  return values.map((v) => [`${fmt(v, 3)} ${UNITS[pair.from].sym}`, `${fmt(convert(v, pair.from, pair.to), 3)} ${UNITS[pair.to].sym}`])
}

function reverseOf(pair) {
  return pairs.find((p) => p.from === pair.to && p.to === pair.from) || null
}

function siblings(pair) {
  const kind = UNITS[pair.from].kind
  return pairs.filter((p) => p.slug !== pair.slug && UNITS[p.from].kind === kind).slice(0, 4).map((p) => p.slug)
}


function pouceRow(label, inches) {
  return [label, `${fmt(inches, 1)} po`, `${fmt(inches * 2.54, 3)} cm`]
}

function pouceSections() {
  const diag = Math.sqrt(16 * 16 + 9 * 9)
  const w = fmt(((55 * 16) / diag) * 2.54, 1)
  const h = fmt(((55 * 9) / diag) * 2.54, 1)
  return [
    {
      h2: 'La taille d’un écran en pouces est la diagonale',
      paragraphs: [
        `Un écran annoncé « 55 pouces » ne se mesure pas en largeur. La cote est la diagonale de la dalle, d’un coin intérieur au coin opposé, cadre exclu. 55 × 2,54 = 139,7 cm de diagonale. Au format 16:9, la dalle fait environ ${w} cm de large et ${h} cm de haut. Le pied et les bordures s’ajoutent : la fiche du fabricant prime avant d’acheter un meuble.`,
        'La largeur et la hauteur des tailles les plus demandées sont détaillées sur [[/convertir/20-pouces-en-cm|20 pouces]], [[/convertir/24-pouces-en-cm|24 pouces]], [[/convertir/27-pouces-en-cm|27 pouces]], [[/convertir/32-pouces-en-cm|32 pouces]], [[/convertir/55-pouces-en-cm|55 pouces]] et [[/convertir/65-pouces-en-cm|65 pouces]]. Le sens inverse est sur [[/convertir/cm-en-pouce|cm en pouce]]. Une cote de plomberie ou de foret, en millimètres, est sur [[/convertir/pouce-en-mm|pouce en mm]].',
      ],
    },
    {
      h2: 'Tableau pouce en cm : écrans',
      paragraphs: ['Chaque ligne convertit la diagonale annoncée. La largeur est plus courte et dépend du format (16:9, 16:10 ou 21:9).'],
      table: {
        caption: 'Diagonales d’écran courantes, en pouces et en centimètres',
        headers: ['Appareil', 'Pouces', 'Centimètres'],
        rows: [
          pouceRow('Smartphone', 6.1),
          pouceRow('Grand smartphone', 6.7),
          pouceRow('Ordinateur portable', 13.3),
          pouceRow('Ordinateur portable', 14),
          pouceRow('Ordinateur portable', 15.6),
          pouceRow('Moniteur de bureau', 24),
          pouceRow('Moniteur', 27),
          pouceRow('Téléviseur ou grand moniteur', 32),
          pouceRow('Téléviseur', 43),
          pouceRow('Téléviseur', 55),
          pouceRow('Téléviseur', 65),
          pouceRow('Téléviseur', 75),
        ],
      },
    },
    {
      h2: 'Tableau pouce en cm : jantes et roues',
      paragraphs: [
        'Ici le pouce est un diamètre nominal. Une jante de 17 pouces mesure 17 × 2,54 = 43,18 cm : c’est le diamètre de la jante, pas celui du pneu monté. Une roue de vélo « 29 pouces » se convertit de la même façon, 29 × 2,54 = 73,66 cm, et désigne le diamètre nominal de la roue.',
        'Le diamètre extérieur d’un pneu se lit sur le flanc. Pour un 205/55 R16 : jante 16 × 25,4 = 406,4 mm, flanc 55 % de 205 mm = 112,75 mm, diamètre 406,4 + 2 × 112,75 = 631,9 mm, soit 63,19 cm. Le diamètre de jante correspondant est 16 × 2,54 = 40,64 cm.',
      ],
      table: {
        caption: 'Diamètres nominaux de jantes et de roues',
        headers: ['Usage', 'Pouces', 'Centimètres'],
        rows: [
          pouceRow('Jante de voiture', 15),
          pouceRow('Jante de voiture', 16),
          pouceRow('Jante de voiture', 17),
          pouceRow('Jante de voiture', 18),
          pouceRow('Jante de voiture', 19),
          pouceRow('Roue de vélo enfant', 20),
          pouceRow('Roue de vélo', 26),
          pouceRow('Roue de vélo', 27.5),
          pouceRow('Roue de vélo (29er)', 29),
        ],
      },
    },
  ]
}

function workedExample(pair) {
  const a = UNITS[pair.from]
  const b = UNITS[pair.to]
  const temp = pair.from === 'fahrenheit' || pair.from === 'celsius'
  const picks = [pair.values[1], pair.values[Math.floor(pair.values.length / 2)], pair.values[pair.values.length - 1]].filter((v, i, arr) => v !== undefined && arr.indexOf(v) === i)
  const k = convert(1, pair.from, pair.to)
  const steps = picks.map((v) => {
    const r = convert(v, pair.from, pair.to)
    if (pair.from === 'fahrenheit') return `${fmt(v)} °F : (${fmt(v)} − 32) × 5 ÷ 9 = ${fmt(r, 2)} °C.`
    if (pair.from === 'celsius') return `${fmt(v)} °C : ${fmt(v)} × 9 ÷ 5 + 32 = ${fmt(r, 2)} °F.`
    return k >= 1
      ? `${fmt(v)} ${unitName(a, v)} : ${fmt(v)} × ${fmt(k, 6)} = ${fmt(r, 4)} ${unitName(b, r)}.`
      : `${fmt(v)} ${unitName(a, v)} : ${fmt(v)} ÷ ${fmt(1 / k, 6)} = ${fmt(r, 4)} ${unitName(b, r)}.`
  })
  return [
    { h2: 'Exemples pas à pas', paragraphs: [`Pour passer des ${a.p} aux ${b.p}, on part toujours de la même formule (${formulaText(pair)}) et on remplace la valeur. Voici trois calculs détaillés que vous pouvez vérifier avec le convertisseur ci-dessus :`], list: steps },
    { h2: 'Précision et arrondis', paragraphs: [temp
      ? `Les formules de température sont exactes. Le résultat n’a de décimales que parce que 5 ÷ 9 ne tombe pas juste : arrondir au dixième de degré suffit pour la cuisine, la météo ou la fièvre. Attention au sens : appliquer la formule à l’envers est l’erreur la plus fréquente, d’où le second champ qui fait le calcul inverse sans risque.`
      : `Le facteur ${fmt(k, 6)} est arrondi à six chiffres significatifs, ce qui donne un résultat juste au millième près pour toute valeur courante. Dans la vie de tous les jours, arrondissez au dixième (${fmt(convert(pair.values[1] ?? 1, pair.from, pair.to), 1)} ${b.sym} pour ${fmt(pair.values[1] ?? 1)} ${a.sym}) ; pour un plan, une fiche technique ou une recette précise, gardez deux décimales. L’erreur classique consiste à multiplier au lieu de diviser : si le résultat en ${b.p} paraît ${k >= 1 ? 'plus petit' : 'plus grand'} que la valeur de départ, le calcul a été fait dans le mauvais sens.`] },
  ]
}

export function pairPage(slug) {
  const pair = pairMap[slug]
  const a = UNITS[pair.from]
  const b = UNITS[pair.to]
  const rev = reverseOf(pair)
  const one = convert(1, pair.from, pair.to)
  const kw = pair.name.toLowerCase()
  const values = valuePages.filter((v) => v.pair === slug)
  const sections = [
    { h2: `Combien vaut 1 ${a.s} en ${b.p} ?`, paragraphs: [pair.from === 'fahrenheit' || pair.from === 'celsius' ? `1 ${a.s} correspond à ${fmt(one, 4)} ${b.sym}. Les échelles de température n’ont pas le même zéro : on ne convertit donc pas avec un simple coefficient, mais avec la formule ${formulaText(pair)}.` : `1 ${a.s} vaut ${fmt(one, 6)} ${unitName(b, one)}. Pour convertir, on applique la formule ${formulaText(pair)}.`, a.def, b.def] },
    { h2: 'À quoi sert cette conversion ?', paragraphs: [pair.uses] },
    ...(pair.slug === 'pouce-en-cm' ? pouceSections() : []),
    { h2: 'Astuce de calcul mental', paragraphs: [pair.tip] },
    ...workedExample(pair),
    { h2: `Tableau de conversion ${kw}`, table: { caption: `${cap(a.p)} en ${b.p}`, headers: [cap(a.p), cap(b.p)], rows: rows(pair, pair.values) } },
    ...(values.length ? [{ h2: 'Valeurs détaillées', list: values.map((v) => `[[${convPath(v.slug)}|${fmt(v.value)} ${unitName(a, v.value)} en ${b.sym}]]`) }] : []),
  ]
  return {
    path: convPath(slug),
    kind: 'pair',
    title: pair.title || `Convertir ${kw} : convertisseur ${a.sym} → ${b.sym} et tableau`,
    description: pair.description || `Convertissez des ${a.p} en ${b.p} (${a.sym} en ${b.sym}) instantanément. Formule exacte, tableau des valeurs courantes, astuce de calcul mental et exemples.`,
    h1: pair.h1 || `Convertir ${kw}`,
    lede: pair.lede || `Tapez une valeur dans l’un des deux champs : la conversion entre ${a.p} et ${b.p} se fait dans les deux sens, avec la virgule décimale.`,
    converter: { from: pair.from, to: pair.to, initial: pair.initial ?? 1, reversePath: rev ? convPath(rev.slug) : null, presets: pair.presets },
    crumbName: pair.name,
    sections,
    faqs: [
      ...pair.faq,
      { q: `Comment convertir des ${b.p} en ${a.p} ?`, a: rev ? `Utilisez le convertisseur inverse : [[${convPath(rev.slug)}|${rev.name.toLowerCase()}]], ou tapez directement la valeur dans le second champ ci-dessus.` : `Tapez la valeur dans le second champ du convertisseur : le calcul se fait dans les deux sens.` },
    ],
    related: pair.related || [...(rev ? [rev.slug] : []), ...siblings(pair).filter((s) => s !== rev?.slug)].slice(0, 4),
  }
}

const DIAG = Math.sqrt(16 * 16 + 9 * 9)

export function valuePage(slug) {
  const v = valuePages.find((x) => x.slug === slug)
  const pair = pairMap[v.pair]
  const a = UNITS[pair.from]
  const b = UNITS[pair.to]
  const res = convert(v.value, pair.from, pair.to)
  const label = `${fmt(v.value)} ${unitName(a, v.value)}`
  const sections = [
    { h2: `${cap(label)} en ${b.sym} : le calcul`, paragraphs: [`${cap(label)} = ${fmt(v.value)} × ${fmt(convert(1, pair.from, pair.to), 6)} = ${fmt(res, 3)} ${b.sym}. ${a.def}`, v.context] },
  ]
  if (v.screen) {
    const w = (v.value * 16) / DIAG
    const h = (v.value * 9) / DIAG
    sections.push({
      h2: `Dimensions d’un écran de ${v.value} pouces`,
      paragraphs: [`La taille d’un écran est sa diagonale. Pour un format 16:9, la largeur vaut diagonale × 16 ÷ √(16² + 9²) et la hauteur diagonale × 9 ÷ √(16² + 9²). Un écran de ${v.value} pouces mesure donc environ ${fmt(w * 2.54, 1)} cm de large et ${fmt(h * 2.54, 1)} cm de haut, cadre non compris. Comptez 1 à 3 cm de plus de chaque côté selon la finesse des bordures, et vérifiez les dimensions exactes sur la fiche du fabricant avant d’acheter un meuble.`],
      table: { caption: `Écran ${v.value} pouces au format 16:9`, headers: ['Mesure', 'Pouces', 'Centimètres'], rows: [['Diagonale', fmt(v.value, 2), fmt(v.value * 2.54, 1)], ['Largeur', fmt(w, 2), fmt(w * 2.54, 1)], ['Hauteur', fmt(h, 2), fmt(h * 2.54, 1)], ['Surface', '—', `${fmt((w * h * 6.4516) / 10000, 3)} m²`]] },
    })
    sections.push({ h2: 'Comparer avec les tailles voisines', table: { caption: 'Diagonale et largeur des tailles proches', headers: ['Taille', 'Diagonale', 'Largeur 16:9'], rows: [v.value - 5, v.value - 2, v.value, v.value + 3, v.value + 10].filter((n) => n > 0).map((n) => [`${n} pouces`, `${fmt(n * 2.54, 1)} cm`, `${fmt(((n * 16) / DIAG) * 2.54, 1)} cm`]) } })
  } else if (v.height) {
    sections.push({ h2: `Tailles de ${v.height}′0″ à ${v.height}′11″ en cm`, paragraphs: ['Une taille en pieds et pouces se convertit en additionnant les deux : pieds × 30,48 + pouces × 2,54.'], table: { caption: `Tailles de ${v.height} pieds en centimètres`, headers: ['Taille', 'Centimètres', 'Mètres'], rows: Array.from({ length: 12 }, (_, i) => { const cm = v.height * 30.48 + i * 2.54; return [`${v.height}′${i}″`, `${fmt(cm, 1)} cm`, `${fmt(cm / 100, 2)} m`] }) } })
  } else {
    sections.push({ h2: 'Distances proches', table: { caption: 'Miles et kilomètres', headers: ['Miles', 'Kilomètres'], rows: [10, 25, 50, 75, 100, 150, 200, 250, 500].map((n) => [`${fmt(n)} mi`, `${fmt(convert(n, 'mile', 'km'), 2)} km`]) }, paragraphs: [`À 110 km/h de moyenne, 100 miles (${fmt(res, 1)} km) se parcourent en environ 1 h 28. Un coureur d’ultra-trail met en général entre 20 et 30 heures. Les panneaux routiers britanniques et américains sont en miles : retenez qu’un mile vaut un peu plus d’un kilomètre et demi.`] })
  }
  sections.push({ h2: 'Arrondir le résultat', paragraphs: [`Selon l’usage, on n’a pas besoin de la même précision. Au centième : ${fmt(res, 2)} ${b.sym}. Au dixième : ${fmt(res, 1)} ${b.sym}. À l’unité : ${fmt(Math.round(res))} ${b.sym}. Pour comparer des produits ou une fiche technique, le dixième suffit largement ; pour découper, percer ou commander une pièce sur mesure, gardez le centième et mesurez deux fois. Le convertisseur affiche jusqu’à six décimales et accepte aussi bien la virgule que le point.`] })
  sections.push({ h2: 'Pour une autre valeur', paragraphs: [`Le convertisseur ci-dessus accepte n’importe quelle valeur. Pour la méthode générale, l’astuce de calcul mental et un tableau complet, voir la page [[${convPath(pair.slug)}|${pair.name.toLowerCase()}]]. ${pair.tip}`] })
  return {
    path: convPath(v.slug),
    kind: 'value',
    title: `${cap(label)} en ${b.sym} : ${fmt(res, 2)} ${b.sym}${v.screen ? ', largeur et hauteur' : ''}`,
    description: `${cap(label)} font ${fmt(res, 2)} ${b.sym}.${v.screen ? ` Largeur et hauteur d’un écran ${v.value} pouces 16:9 en cm,` : ''} calcul détaillé, tableau et convertisseur ${a.sym} → ${b.sym}.`,
    h1: `${cap(label)} en ${b.sym}`,
    lede: `${cap(label)} = ${fmt(res, 3)} ${b.sym}. Modifiez la valeur pour convertir une autre mesure.`,
    converter: { from: pair.from, to: pair.to, initial: v.value, reversePath: null },
    crumbName: `${fmt(v.value)} ${a.sym} en ${b.sym}`,
    parent: { name: pair.name, path: convPath(pair.slug) },
    sections,
    faqs: [
      { q: `Combien font ${label} en ${b.p} ?`, a: `${cap(label)} font exactement ${fmt(res, 4)} ${b.p}, que l’on arrondit à ${fmt(res, 1)} ${b.sym}.` },
      ...pair.faq.slice(0, 1),
    ],
    related: [pair.slug, ...valuePages.filter((x) => x.pair === pair.slug && x.slug !== v.slug).map((x) => x.slug)].slice(0, 4),
  }
}

export function convertPage(path) {
  const slug = path.replace('/convertir/', '')
  if (pairMap[slug]) return pairPage(slug)
  return valuePage(slug)
}

export const convertPaths = [...pairs.map((p) => convPath(p.slug)), ...valuePages.map((v) => convPath(v.slug))]
