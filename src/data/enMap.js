import { normalizePath } from '../lib/path.js'

// Real French/English pairs only. French pages that are not listed here
// (VAT, grade-out-of-20, and the rest) get no English alternate.
export const pairs = [
  { id: 'home', fr: '/', en: '/en' },
  { id: 'convert', fr: '/convertir', en: '/en/convert', keyword: 'unit converter', volume: 165000, kd: 24 },
  { id: 'kg-to-lbs', fr: '/convertir/kg-en-livre', en: '/en/convert/kg-to-lbs', keyword: 'kg to lbs', volume: 1220000, kd: 3 },
  { id: 'pounds-to-kg', fr: '/convertir/livre-en-kg', en: '/en/convert/pounds-to-kg', keyword: 'pounds to kg', volume: 246000, kd: 8 },
  { id: 'cm-to-inches', fr: '/convertir/cm-en-pouce', en: '/en/convert/cm-to-inches', keyword: 'cm to inches', volume: 1220000, kd: 8 },
  { id: 'inches-to-cm', fr: '/convertir/pouce-en-cm', en: '/en/convert/inches-to-cm', keyword: 'inches to cm', volume: 550000, kd: 12 },
  { id: 'celsius-to-fahrenheit', fr: '/convertir/celsius-en-fahrenheit', en: '/en/convert/celsius-to-fahrenheit', keyword: 'celsius to fahrenheit', volume: 1000000, kd: 5 },
  { id: 'fahrenheit-to-celsius', fr: '/convertir/fahrenheit-en-celsius', en: '/en/convert/fahrenheit-to-celsius', keyword: 'fahrenheit to celsius', volume: 450000, kd: 10 },
  { id: 'km-to-miles', fr: '/convertir/km-en-mile', en: '/en/convert/km-to-miles', keyword: 'km to miles', volume: 450000, kd: 0 },
  { id: 'miles-to-km', fr: '/convertir/mile-en-km', en: '/en/convert/miles-to-km', keyword: 'miles to km', volume: 301000, kd: 0 },
  { id: 'gallons-to-liters', fr: '/convertir/gallon-en-litre', en: '/en/convert/gallons-to-liters', keyword: 'gallons to liters', volume: 49500, kd: 0 },
  { id: 'liters-to-gallons', fr: '/convertir/litre-en-gallon', en: '/en/convert/liters-to-gallons', keyword: 'liters to gallons' },
  { id: 'percentage', fr: '/calcul-pourcentage', en: '/en/percentage-calculator', keyword: 'percentage calculator', volume: 550000, kd: 32 },
  { id: 'percentage-increase', fr: '/taux-d-evolution', en: '/en/percentage-increase-calculator', keyword: 'percentage increase calculator', volume: 165000, kd: 27 },
  { id: 'square-footage', fr: '/calcul-surface-m2', en: '/en/square-footage-calculator', keyword: 'square footage calculator', volume: 165000, kd: 9 },
  { id: 'proportion', fr: '/produit-en-croix', en: '/en/proportion-calculator', keyword: 'proportion calculator', volume: 135000, kd: 1 },
  { id: 'roman', fr: '/chiffres-romains', en: '/en/roman-numeral-converter', keyword: 'roman numeral converter', volume: 201000, kd: 11 },
  { id: 'margin', fr: '/calcul-marge', en: '/en/margin-calculator', keyword: 'margin calculator', volume: 110000, kd: 25 },
  { id: 'average', fr: '/calcul-moyenne', en: '/en/average-calculator', keyword: 'average calculator', volume: 74000, kd: 6 },
  { id: 'stdev', fr: '/calcul-ecart-type', en: '/en/standard-deviation-calculator', keyword: 'standard deviation calculator', volume: 60500, kd: 10 },
  { id: 'discount', fr: '/calcul-remise', en: '/en/discount-calculator', keyword: 'discount calculator', volume: 33100, kd: 7 },
  { id: 'square-root', fr: '/racine-carree', en: '/en/square-root-calculator', keyword: 'square root calculator', volume: 33100, kd: 17 },
  { id: 'weighted', fr: '/moyenne-ponderee', en: '/en/weighted-average-calculator', keyword: 'weighted average calculator', volume: 9900, kd: 6 },
  { id: 'interest', fr: '/calcul-interets', en: '/en/simple-interest-calculator', keyword: 'simple interest calculator', volume: 22200, kd: 20 },
  { id: 'words', fr: '/nombre-en-lettres', en: '/en/number-to-words', keyword: 'number to words', volume: 9900, kd: 19 },
]

const byPath = new Map()
for (const pair of pairs) {
  byPath.set(pair.fr, pair)
  byPath.set(pair.en, pair)
}

export function isEnglishPath(pathname) {
  const path = normalizePath(pathname)
  return path === '/en' || path.startsWith('/en/')
}

export function pairFor(pathname) {
  return byPath.get(normalizePath(pathname)) || null
}

export function switchTarget(pathname) {
  const path = normalizePath(pathname)
  const pair = byPath.get(path)
  if (isEnglishPath(path)) return pair ? pair.fr : '/'
  return pair ? pair.en : '/en'
}

export const enCatalog = [
  { path: '/en/percentage-calculator', name: 'Percentage calculator', short: 'Percentage', group: 'Percentages', blurb: 'What is X% of a number, and what percent one number is of another.', featured: true },
  { path: '/en/percentage-increase-calculator', name: 'Percentage increase calculator', short: 'Increase', group: 'Percentages', blurb: 'Percent change between two numbers, or apply a percent increase.', featured: true },
  { path: '/en/discount-calculator', name: 'Discount calculator', short: 'Discount', group: 'Percentages', blurb: 'Sale price, amount saved, and stacked percent-off discounts.', featured: false },
  { path: '/en/proportion-calculator', name: 'Proportion calculator', short: 'Proportion', group: 'Math', blurb: 'Solve a ratio: A is to B as C is to X.', featured: true },
  { path: '/en/average-calculator', name: 'Average calculator', short: 'Average', group: 'Math', blurb: 'Mean, median, sum, minimum, and maximum of a list.', featured: true },
  { path: '/en/weighted-average-calculator', name: 'Weighted average calculator', short: 'Weighted', group: 'Math', blurb: 'Average when each value has its own weight or credit.', featured: false },
  { path: '/en/standard-deviation-calculator', name: 'Standard deviation calculator', short: 'Std dev', group: 'Math', blurb: 'Population or sample standard deviation and variance.', featured: false },
  { path: '/en/square-root-calculator', name: 'Square root calculator', short: 'Square root', group: 'Math', blurb: 'Square root, simplified radical, and cube root.', featured: false },
  { path: '/en/roman-numeral-converter', name: 'Roman numeral converter', short: 'Roman', group: 'Math', blurb: 'Convert between Roman numerals and numbers from 1 to 3,999.', featured: true },
  { path: '/en/number-to-words', name: 'Number to words', short: 'Words', group: 'Math', blurb: 'Spell a number or a dollar amount in American English.', featured: false },
  { path: '/en/square-footage-calculator', name: 'Square footage calculator', short: 'Sq ft', group: 'Home and money', blurb: 'Room area in square feet, square yards, and square meters.', featured: true },
  { path: '/en/margin-calculator', name: 'Margin calculator', short: 'Margin', group: 'Home and money', blurb: 'Profit, margin on price, and markup on cost.', featured: true },
  { path: '/en/simple-interest-calculator', name: 'Simple interest calculator', short: 'Interest', group: 'Home and money', blurb: 'Interest on a principal for a number of years.', featured: false },
  { path: '/en/convert', name: 'Unit converter', short: 'Convert', group: 'Converters', blurb: 'Kilograms, inches, miles, Fahrenheit, and US gallons.', featured: true },
  { path: '/en/convert/kg-to-lbs', name: 'Kg to lbs', short: 'Kg to lbs', group: 'Converters', blurb: 'Convert kilograms to pounds.', featured: false },
  { path: '/en/convert/pounds-to-kg', name: 'Pounds to kg', short: 'Lbs to kg', group: 'Converters', blurb: 'Convert pounds to kilograms.', featured: false },
  { path: '/en/convert/cm-to-inches', name: 'Cm to inches', short: 'Cm to in', group: 'Converters', blurb: 'Convert centimeters to inches.', featured: false },
  { path: '/en/convert/inches-to-cm', name: 'Inches to cm', short: 'In to cm', group: 'Converters', blurb: 'Convert inches to centimeters.', featured: false },
  { path: '/en/convert/celsius-to-fahrenheit', name: 'Celsius to Fahrenheit', short: '°C to °F', group: 'Converters', blurb: 'Convert Celsius to Fahrenheit.', featured: false },
  { path: '/en/convert/fahrenheit-to-celsius', name: 'Fahrenheit to Celsius', short: '°F to °C', group: 'Converters', blurb: 'Convert Fahrenheit to Celsius.', featured: false },
  { path: '/en/convert/km-to-miles', name: 'Km to miles', short: 'Km to mi', group: 'Converters', blurb: 'Convert kilometers to miles.', featured: false },
  { path: '/en/convert/miles-to-km', name: 'Miles to km', short: 'Mi to km', group: 'Converters', blurb: 'Convert miles to kilometers.', featured: false },
  { path: '/en/convert/gallons-to-liters', name: 'Gallons to liters', short: 'Gal to L', group: 'Converters', blurb: 'Convert US gallons to liters.', featured: false },
  { path: '/en/convert/liters-to-gallons', name: 'Liters to gallons', short: 'L to gal', group: 'Converters', blurb: 'Convert liters to US gallons.', featured: false },
]

export const enNav = [
  '/en/percentage-calculator',
  '/en/percentage-increase-calculator',
  '/en/proportion-calculator',
  '/en/average-calculator',
  '/en/roman-numeral-converter',
  '/en/margin-calculator',
  '/en/square-footage-calculator',
  '/en/convert',
].map((path) => enCatalog.find((item) => item.path === path))

const catalogByPath = new Map(enCatalog.map((item) => [item.path, item]))

export function enLink(path) {
  return catalogByPath.get(path) || null
}

export const enGroups = ['Percentages', 'Math', 'Home and money', 'Converters']
