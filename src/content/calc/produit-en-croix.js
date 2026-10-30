export default {
  tool: 'ProduitEnCroix',
  title: 'Produit en croix : calcul de la règle de trois en ligne',
  description: 'Calculez la quatrième proportionnelle avec le produit en croix (règle de trois). Saisissez trois valeurs, le résultat et le détail du calcul s’affichent.',
  h1: 'Produit en croix (règle de trois)',
  lede: 'Saisissez trois valeurs d’un tableau de proportionnalité : la quatrième est calculée instantanément, avec l’opération écrite en clair.',
  sections: [
    { h2: 'Le principe du produit en croix', paragraphs: ['Dans un tableau de proportionnalité à deux lignes et deux colonnes, les produits en diagonale sont égaux : si a/b = c/d, alors a × d = b × c. Quand on connaît trois valeurs, on trouve la quatrième en multipliant les deux valeurs de la diagonale complète, puis en divisant par la valeur restante.', 'Exemple : 3 kg de pommes coûtent 7,20 €. Combien coûtent 5 kg ? x = 5 × 7,20 ÷ 3 = 12 €.'] },
    { h2: 'La règle de trois, pas à pas', steps: ['Repérez les deux grandeurs proportionnelles (masse et prix, distance et temps à vitesse constante…).', 'Placez-les dans un tableau : une grandeur par ligne, une situation par colonne.', 'Multipliez les deux nombres de la diagonale complète.', 'Divisez par le troisième nombre : vous obtenez la valeur manquante.'], paragraphs: ['La « règle de trois » de l’école primaire passe par l’unité : 3 kg coûtent 7,20 €, donc 1 kg coûte 2,40 €, donc 5 kg coûtent 12 €. Le produit en croix fait le même calcul en une seule ligne.'] },
    { h2: 'Exemples d’utilisation', list: ['Recette : pour 4 personnes il faut 250 g de farine ; pour 6 personnes, 6 × 250 ÷ 4 = 375 g.', 'Échelle de carte : 1 cm représente 25 000 cm ; 7,5 cm représentent 1,875 km.', 'Pourcentage : 18 bonnes réponses sur 24 correspondent à 18 × 100 ÷ 24 = 75 %, voir le [[/calcul-pourcentage|calcul de pourcentage]].', 'Note : 13 sur 25 vaut 13 × 20 ÷ 25 = 10,4 sur 20, voir la [[/note-sur-20|conversion de note sur 20]].', 'Conversion : si 1 pouce vaut 2,54 cm, 55 pouces valent 139,7 cm, voir [[/convertir/pouce-en-cm|pouce en cm]].'] },
    { h2: 'Quand le produit en croix ne marche pas', paragraphs: ['Il suppose une vraie proportionnalité. Le prix d’un taxi (prise en charge plus tarif au kilomètre), la surface d’un carré selon son côté, ou un tarif dégressif ne sont pas proportionnels : doubler l’un ne double pas l’autre. Dans le cas d’une proportionnalité inverse, comme le temps de travail selon le nombre d’ouvriers, on multiplie en ligne au lieu de la diagonale : 6 ouvriers pour 10 jours font 60 jours-ouvrier, donc 4 ouvriers mettent 15 jours.'] },
  ],
  faqs: [
    { q: 'Produit en croix et règle de trois, c’est pareil ?', a: 'Oui pour le résultat. La règle de trois passe par la valeur pour une unité ; le produit en croix applique directement l’égalité des produits en diagonale.' },
    { q: 'Comment vérifier un tableau de proportionnalité ?', a: 'Les quotients de chaque colonne doivent être égaux, ou de façon équivalente les produits en croix.' },
    { q: 'Que faire si une valeur vaut zéro ?', a: 'Si la valeur par laquelle on divise est nulle, le calcul est impossible : le tableau n’est pas une proportion valable.' },
  ],
  related: ['calcul-pourcentage', 'note-sur-20', 'calcul-moyenne', 'convertir'],
}
