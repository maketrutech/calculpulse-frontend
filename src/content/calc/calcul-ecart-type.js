export default {
  tool: 'EcartType',
  title: 'Calcul écart type et variance en ligne, pas à pas',
  description: 'Calculez l’écart type et la variance d’une série de valeurs, pour une population ou un échantillon (n − 1). Moyenne, formules et exemple détaillé.',
  h1: 'Calcul de l’écart type et de la variance',
  lede: 'Collez une série de nombres : la moyenne, la variance et l’écart type s’affichent, avec le choix entre population entière et échantillon.',
  sections: [
    { h2: 'Ce que mesure l’écart type', paragraphs: ['L’écart type indique de combien les valeurs s’éloignent en moyenne de leur moyenne. Deux classes peuvent avoir 12 de moyenne : l’une avec des notes de 11 à 13 (écart type faible), l’autre de 4 à 19 (écart type élevé). Il s’exprime dans la même unité que les données, ce qui le rend plus parlant que la variance.'] },
    { h2: 'Les formules', steps: ['Calculez la moyenne m des n valeurs.', 'Pour chaque valeur, calculez l’écart à la moyenne et élevez-le au carré.', 'Additionnez ces carrés.', 'Divisez par n (population) ou par n − 1 (échantillon) : c’est la variance.', 'Prenez la racine carrée de la variance : c’est l’écart type.'] },
    { h2: 'Exemple détaillé', paragraphs: ['Série : 4, 8, 6, 5, 7. La moyenne vaut 30 ÷ 5 = 6. Les écarts au carré valent 4, 4, 0, 1 et 1, soit une somme de 10. Variance de population : 10 ÷ 5 = 2 ; écart type : √2 ≈ 1,414. Variance d’échantillon : 10 ÷ 4 = 2,5 ; écart type : √2,5 ≈ 1,581.'], table: { caption: 'Détail du calcul', headers: ['Valeur', 'Écart à 6', 'Carré'], rows: [['4', '−2', '4'], ['8', '2', '4'], ['6', '0', '0'], ['5', '−1', '1'], ['7', '1', '1']] } },
    { h2: 'Population ou échantillon ?', paragraphs: ['Utilisez la population quand vos données couvrent tout le groupe étudié (toutes les notes d’une classe). Utilisez l’échantillon (division par n − 1, correction de Bessel) quand vos données ne sont qu’une partie d’un ensemble plus grand et que vous voulez estimer sa dispersion. Les calculatrices notent souvent σ pour la population et s pour l’échantillon. Dans un tableur, ce sont les fonctions ECARTYPE.PEARSON et ECARTYPE.STANDARD.'] },
    { h2: 'Interpréter le résultat', paragraphs: ['Pour une distribution en cloche, environ 68 % des valeurs se trouvent à moins d’un écart type de la moyenne et 95 % à moins de deux. Le coefficient de variation (écart type ÷ moyenne) permet de comparer la dispersion de séries d’ordres de grandeur différents. Pour la moyenne et la médiane seules, voir le [[/calcul-moyenne|calcul de moyenne]].'] },
  ],
  faqs: [
    { q: 'Quelle différence entre variance et écart type ?', a: 'L’écart type est la racine carrée de la variance. La variance est exprimée dans l’unité au carré, l’écart type dans l’unité d’origine.' },
    { q: 'Un écart type peut-il être négatif ?', a: 'Non. Il est nul quand toutes les valeurs sont identiques et positif sinon.' },
    { q: 'Combien de valeurs faut-il ?', a: 'Au moins une pour la population et au moins deux pour l’échantillon.' },
  ],
  related: ['calcul-moyenne', 'moyenne-ponderee', 'racine-carree', 'note-sur-20'],
}
