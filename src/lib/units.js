// Définitions exactes (valeurs légales internationales).
export const UNITS = {
  pouce: { s: 'pouce', p: 'pouces', sym: 'po', base: 'm', f: 0.0254, kind: 'longueur', def: 'Le pouce (inch, symbole in ou ″) vaut exactement 2,54 cm depuis l’accord international de 1959. Il sert aux diagonales d’écran, aux jantes, aux tuyaux et à la quincaillerie anglo-saxonne.' },
  cm: { s: 'centimètre', p: 'centimètres', sym: 'cm', base: 'm', f: 0.01, kind: 'longueur', def: 'Le centimètre est le centième du mètre, l’unité de longueur du Système international.' },
  mm: { s: 'millimètre', p: 'millimètres', sym: 'mm', base: 'm', f: 0.001, kind: 'longueur', def: 'Le millimètre est le millième du mètre, l’unité des plans techniques et de la visserie métrique.' },
  m: { s: 'mètre', p: 'mètres', sym: 'm', base: 'm', f: 1, kind: 'longueur', def: 'Le mètre est l’unité de longueur du Système international, définie depuis 1983 par la vitesse de la lumière.' },
  km: { s: 'kilomètre', p: 'kilomètres', sym: 'km', base: 'm', f: 1000, kind: 'longueur', def: 'Le kilomètre vaut 1 000 mètres. C’est l’unité des distances routières en France et dans presque tous les pays.' },
  mile: { s: 'mile', p: 'miles', sym: 'mi', base: 'm', f: 1609.344, kind: 'longueur', def: 'Le mile terrestre (statute mile) vaut exactement 1 609,344 m, soit 5 280 pieds. Il reste l’unité des distances routières aux États-Unis et au Royaume-Uni.' },
  pied: { s: 'pied', p: 'pieds', sym: 'ft', base: 'm', f: 0.3048, kind: 'longueur', def: 'Le pied (foot, symbole ft ou ′) vaut exactement 30,48 cm, soit 12 pouces. On le rencontre pour les tailles, l’altitude en aviation et les surfaces immobilières américaines.' },
  yard: { s: 'yard', p: 'yards', sym: 'yd', base: 'm', f: 0.9144, kind: 'longueur', def: 'Le yard vaut exactement 0,9144 m, soit 3 pieds ou 36 pouces. Il sert au golf, au football américain et à la mesure des tissus.' },
  livre: { s: 'livre', p: 'livres', sym: 'lb', base: 'kg', f: 0.45359237, kind: 'masse', def: 'La livre avoirdupois (pound, symbole lb ou lbs) vaut exactement 0,453 592 37 kg, soit 16 onces. C’est l’unité de poids courante aux États-Unis.' },
  kg: { s: 'kilogramme', p: 'kilogrammes', sym: 'kg', base: 'kg', f: 1, kind: 'masse', def: 'Le kilogramme est l’unité de masse du Système international, redéfinie en 2019 à partir de la constante de Planck.' },
  g: { s: 'gramme', p: 'grammes', sym: 'g', base: 'kg', f: 0.001, kind: 'masse', def: 'Le gramme est le millième du kilogramme, l’unité des recettes et des étiquettes alimentaires.' },
  once: { s: 'once', p: 'onces', sym: 'oz', base: 'kg', f: 0.028349523125, kind: 'masse', def: 'L’once avoirdupois (ounce, symbole oz) vaut exactement 28,349 523 125 g, soit 1/16 de livre. À ne pas confondre avec l’once troy des métaux précieux (31,103 g) ni avec l’once liquide (fl oz), qui est un volume.' },
  stone: { s: 'stone', p: 'stones', sym: 'st', base: 'kg', f: 6.35029318, kind: 'masse', def: 'Le stone vaut 14 livres, soit exactement 6,350 293 18 kg. Les Britanniques et les Irlandais l’utilisent encore pour le poids d’une personne.' },
  gallon: { s: 'gallon américain', p: 'gallons américains', sym: 'gal', base: 'l', f: 3.785411784, kind: 'volume', def: 'Le gallon américain (US liquid gallon) vaut exactement 3,785 411 784 litres. Le gallon impérial britannique est plus grand : 4,546 09 litres.' },
  litre: { s: 'litre', p: 'litres', sym: 'L', base: 'l', f: 1, kind: 'volume', def: 'Le litre vaut un décimètre cube (1 dm³), soit 1 000 millilitres.' },
  ml: { s: 'millilitre', p: 'millilitres', sym: 'ml', base: 'l', f: 0.001, kind: 'volume', def: 'Le millilitre est le millième du litre, soit 1 cm³.' },
  floz: { s: 'once liquide américaine', p: 'onces liquides américaines', sym: 'fl oz', base: 'l', f: 0.0295735295625, kind: 'volume', def: 'L’once liquide américaine (US fluid ounce, fl oz) vaut 1/128 de gallon américain, soit 29,573 5 ml. L’once liquide impériale vaut 28,413 ml.' },
  tasse: { s: 'tasse (cup)', p: 'tasses (cups)', sym: 'cup', base: 'l', f: 0.2365882365, kind: 'volume', def: 'La tasse américaine des recettes (US cup) vaut 8 onces liquides, soit 236,6 ml. Les recettes australiennes ou canadiennes utilisent souvent une tasse métrique de 250 ml.' },
  cas: { s: 'cuillère à soupe', p: 'cuillères à soupe', sym: 'c. à s.', base: 'l', f: 0.015, kind: 'volume', def: 'En cuisine française, une cuillère à soupe rase vaut 15 ml et une cuillère à café 5 ml. La tablespoon américaine vaut 14,8 ml, une différence négligeable pour une recette.' },
  mph: { s: 'mile par heure', p: 'miles par heure', sym: 'mph', base: 'ms', f: 0.44704, kind: 'vitesse', def: 'Le mile par heure (mph) vaut exactement 1,609 344 km/h. Il s’affiche sur les panneaux et compteurs aux États-Unis et au Royaume-Uni.' },
  kmh: { s: 'kilomètre par heure', p: 'kilomètres par heure', sym: 'km/h', base: 'ms', f: 1 / 3.6, kind: 'vitesse', def: 'Le kilomètre par heure est l’unité de vitesse routière en France. 1 km/h vaut 1/3,6 mètre par seconde.' },
  noeud: { s: 'nœud', p: 'nœuds', sym: 'kn', base: 'ms', f: 1852 / 3600, kind: 'vitesse', def: 'Le nœud vaut un mille marin (1 852 m) par heure, soit exactement 1,852 km/h. C’est l’unité de vitesse en navigation maritime et aérienne et pour le vent.' },
  hectare: { s: 'hectare', p: 'hectares', sym: 'ha', base: 'm2', f: 10000, kind: 'surface', def: 'L’hectare vaut 10 000 m², soit un carré de 100 m de côté. Il sert pour les terrains agricoles, les forêts et les parcelles.' },
  acre: { s: 'acre', p: 'acres', sym: 'ac', base: 'm2', f: 4046.8564224, kind: 'surface', def: 'L’acre internationale vaut exactement 4 046,856 422 4 m², soit environ 0,4047 hectare. Elle sert pour les terrains aux États-Unis, au Royaume-Uni et au Canada.' },
  m2: { s: 'mètre carré', p: 'mètres carrés', sym: 'm²', base: 'm2', f: 1, kind: 'surface', def: 'Le mètre carré est la surface d’un carré d’un mètre de côté.' },
  celsius: { s: 'degré Celsius', p: 'degrés Celsius', sym: '°C', base: 'k', kind: 'température', def: 'Le degré Celsius place 0 °C à la fusion de la glace et 100 °C à l’ébullition de l’eau, sous pression normale.' },
  fahrenheit: { s: 'degré Fahrenheit', p: 'degrés Fahrenheit', sym: '°F', base: 'k', kind: 'température', def: 'Le degré Fahrenheit place la fusion de la glace à 32 °F et l’ébullition de l’eau à 212 °F : 180 degrés Fahrenheit séparent ces deux points, contre 100 degrés Celsius. Il reste l’échelle courante aux États-Unis.' },
}

export function convert(value, from, to) {
  if (!Number.isFinite(value)) return NaN
  if (from === to) return value
  if (from === 'fahrenheit' && to === 'celsius') return ((value - 32) * 5) / 9
  if (from === 'celsius' && to === 'fahrenheit') return (value * 9) / 5 + 32
  const a = UNITS[from]
  const b = UNITS[to]
  if (!a || !b || a.base !== b.base) return NaN
  return (value * a.f) / b.f
}

export function factor(from, to) {
  return convert(1, from, to)
}
