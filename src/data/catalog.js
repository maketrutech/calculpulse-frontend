export const tools = [
  { id: 'calcul-pourcentage', path: '/calcul-pourcentage', name: 'Calcul de pourcentage', group: 'Pourcentages', featured: true, blurb: 'X % d’un nombre, part en pourcentage, valeur de départ.' },
  { id: 'calcul-augmentation', path: '/calcul-augmentation', name: 'Augmentation et baisse', group: 'Pourcentages', blurb: 'Ajouter ou retirer un pourcentage, retrouver le prix initial.' },
  { id: 'taux-d-evolution', path: '/taux-d-evolution', name: 'Taux d’évolution', group: 'Pourcentages', blurb: 'Variation en %, coefficient multiplicateur, taux réciproque.' },
  { id: 'calcul-remise', path: '/calcul-remise', name: 'Calcul de remise', group: 'Pourcentages', blurb: 'Prix soldé, remises successives, montant économisé.' },
  { id: 'calcul-tva', path: '/calcul-tva', name: 'Calcul TVA HT ↔ TTC', group: 'Commerce et TVA', featured: true, blurb: 'HT, TTC et montant de TVA aux taux 20 %, 10 %, 5,5 % et 2,1 %.' },
  { id: 'calcul-tva-20', path: '/calcul-tva-20', name: 'TVA à 20 %', group: 'Commerce et TVA', blurb: 'Le taux normal : multiplier par 1,2 ou diviser par 1,2.' },
  { id: 'calcul-tva-10', path: '/calcul-tva-10', name: 'TVA à 10 %', group: 'Commerce et TVA', blurb: 'Restauration, travaux de rénovation, transports.' },
  { id: 'calcul-tva-5-5', path: '/calcul-tva-5-5', name: 'TVA à 5,5 %', group: 'Commerce et TVA', blurb: 'Alimentation, énergie, travaux d’économie d’énergie.' },
  { id: 'calcul-marge', path: '/calcul-marge', name: 'Taux de marge et de marque', group: 'Commerce et TVA', blurb: 'Marge, coefficient et prix de vente depuis le coût d’achat.' },
  { id: 'produit-en-croix', path: '/produit-en-croix', name: 'Produit en croix', group: 'École et maths', featured: true, blurb: 'Règle de trois : la quatrième valeur d’une proportion.' },
  { id: 'calcul-moyenne', path: '/calcul-moyenne', name: 'Calcul de moyenne', group: 'École et maths', featured: true, blurb: 'Moyenne, médiane, minimum et maximum d’une liste.' },
  { id: 'moyenne-ponderee', path: '/moyenne-ponderee', name: 'Moyenne pondérée', group: 'École et maths', blurb: 'Notes et coefficients, moyenne du bulletin ou du bac.' },
  { id: 'note-sur-20', path: '/note-sur-20', name: 'Note sur 20', group: 'École et maths', blurb: 'Ramener une note sur 10, 30, 40 ou 100 à une note sur 20.' },
  { id: 'calcul-ecart-type', path: '/calcul-ecart-type', name: 'Écart type et variance', group: 'École et maths', blurb: 'Écart type de population ou d’échantillon, pas à pas.' },
  { id: 'racine-carree', path: '/racine-carree', name: 'Racine carrée', group: 'École et maths', blurb: 'Valeur décimale et forme simplifiée a√b.' },
  { id: 'chiffres-romains', path: '/chiffres-romains', name: 'Chiffres romains', group: 'École et maths', featured: true, blurb: 'Convertir de 1 à 3 999 dans les deux sens.' },
  { id: 'nombre-en-lettres', path: '/nombre-en-lettres', name: 'Nombre en lettres', group: 'École et maths', blurb: 'Écrire un nombre ou un montant de chèque en toutes lettres.' },
  { id: 'calcul-surface-m2', path: '/calcul-surface-m2', name: 'Calcul de surface en m²', group: 'Maison et mesures', blurb: 'Rectangle, triangle, cercle, trapèze : la surface d’une pièce.' },
  { id: 'calcul-imc', path: '/calcul-imc', name: 'Calcul IMC', group: 'Santé', featured: true, blurb: 'Indice de masse corporelle et repères de l’OMS.' },
  { id: 'calcul-interets', path: '/calcul-interets', name: 'Intérêts simples', group: 'Finances', blurb: 'Intérêts d’un placement ou d’un prêt sur une durée.' },
  { id: 'interets-composes', path: '/interets-composes', name: 'Intérêts composés', group: 'Finances', blurb: 'Capital final avec versements mensuels, année par année.' },
  { id: 'convertir', path: '/convertir', name: 'Conversions d’unités', group: 'Conversions', featured: true, blurb: 'Pouces, miles, livres, gallons, Fahrenheit : 24 convertisseurs.' },
]

export const toolMap = Object.fromEntries(tools.map((t) => [t.id, t]))
export const groups = [...new Set(tools.map((t) => t.group))]

const navIds = ['calcul-pourcentage', 'calcul-tva', 'produit-en-croix', 'calcul-moyenne', 'calcul-imc', 'chiffres-romains', 'calcul-marge', 'convertir']
export const navTools = navIds.map((id) => toolMap[id])
