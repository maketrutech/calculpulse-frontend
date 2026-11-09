export default {
  tool: 'ChiffresRomains',
  title: 'Chiffres romains : convertisseur en ligne de 1 à 3 999',
  description: 'Convertissez un nombre en chiffres romains ou des chiffres romains en nombre. Règles d’écriture (I, V, X, L, C, D, M), tableau et exemples : siècles, années, rois.',
  h1: 'Convertisseur de chiffres romains',
  lede: 'Tapez un nombre de 1 à 3 999 ou un nombre romain (MMXXVI) : la conversion se fait dans les deux sens, avec vérification de l’écriture.',
  sections: [
    { h2: 'Les sept symboles', table: { caption: 'Valeur des chiffres romains', headers: ['Symbole', 'Valeur'], rows: [['I', '1'], ['V', '5'], ['X', '10'], ['L', '50'], ['C', '100'], ['D', '500'], ['M', '1 000']] } },
    { h2: 'Les règles d’écriture', list: ['On écrit les symboles du plus grand au plus petit et on additionne : CLX = 100 + 50 + 10 = 160.', 'Un symbole placé avant un symbole plus grand se soustrait : IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.', 'Seuls I, X et C se soustraient, et uniquement devant les deux symboles immédiatement supérieurs : 99 s’écrit XCIX et non IC.', 'Un même symbole ne se répète pas plus de trois fois de suite : 4 s’écrit IV et non IIII (sauf sur certains cadrans d’horloge).', 'V, L et D ne se répètent jamais.'], paragraphs: ['Le convertisseur applique ces règles et signale une écriture non canonique, comme IIII ou VX.'] },
    { h2: 'Exemples', table: { caption: 'Nombres courants en chiffres romains', headers: ['Nombre', 'Romain', 'Usage'], rows: [['14', 'XIV', 'Louis XIV'], ['16', 'XVI', 'Benoît XVI'], ['19', 'XIX', 'XIXᵉ siècle'], ['21', 'XXI', 'XXIᵉ siècle'], ['49', 'XLIX', '—'], ['1789', 'MDCCLXXXIX', 'Révolution française'], ['2026', 'MMXXVI', 'Année en cours'], ['3999', 'MMMCMXCIX', 'Plus grand nombre standard']] } },
    { h2: 'Où trouve-t-on des chiffres romains ?', paragraphs: ['En français, on les utilise pour les siècles (le XVIIIᵉ siècle), les noms de souverains et de papes, les numéros de tomes, d’actes et de chapitres, les arrondissements (le XVᵉ arrondissement), les régimes politiques (la Vᵉ République) et les cadrans d’horloge. Les génériques de films et les monuments affichent souvent l’année de création.', 'Il n’existe pas de zéro en chiffres romains. Au-delà de 3 999, les Romains surlignaient les symboles pour les multiplier par 1 000, une notation rarement prise en charge sur ordinateur. Pour écrire un nombre en toutes lettres, utilisez plutôt le [[/nombre-en-lettres|nombre en lettres]].'] },
  ],
  faqs: [
    { q: 'Comment écrire 2026 en chiffres romains ?', a: 'MMXXVI : MM = 2 000, XX = 20, VI = 6.' },
    { q: 'Pourquoi les horloges affichent-elles IIII ?', a: 'Par tradition horlogère, pour l’équilibre visuel du cadran face au VIII. L’écriture standard reste IV.' },
    { q: 'Comment écrire le siècle en chiffres romains ?', a: 'Avec des petites capitales suivies d’un « e » en exposant : XXIᵉ siècle. Le XXIᵉ siècle couvre les années 2001 à 2100.' },
  ],
  related: ['nombre-en-lettres', 'calcul-moyenne', 'racine-carree', 'produit-en-croix'],
}
