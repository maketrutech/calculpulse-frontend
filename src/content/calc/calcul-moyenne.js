export default {
  tool: 'Moyenne',
  title: 'Calcul de moyenne en ligne : moyenne, médiane, min et max',
  description: 'Calculez la moyenne d’une liste de nombres ou de notes : moyenne arithmétique, médiane, somme, minimum et maximum. Collez vos valeurs, le résultat est immédiat.',
  h1: 'Calcul de moyenne',
  lede: 'Collez ou tapez vos valeurs, séparées par des espaces, des points-virgules ou des retours à la ligne. La virgule décimale française est acceptée : 12,5 ; 14 ; 9,75.',
  sections: [
    { h2: 'Comment calculer une moyenne', paragraphs: ['La moyenne arithmétique est la somme des valeurs divisée par leur nombre. Pour les notes 12, 15, 9 et 14 : (12 + 15 + 9 + 14) ÷ 4 = 50 ÷ 4 = 12,5.', 'Si les valeurs n’ont pas toutes le même poids, comme des notes avec coefficients, il faut une [[/moyenne-ponderee|moyenne pondérée]] : chaque valeur est multipliée par son coefficient avant de diviser par la somme des coefficients.'] },
    { h2: 'Moyenne ou médiane ?', paragraphs: ['La médiane est la valeur du milieu une fois la liste triée : la moitié des valeurs est en dessous, l’autre au-dessus. Avec un nombre pair de valeurs, c’est la moyenne des deux valeurs centrales. Pour 9, 12, 14, 15, la médiane vaut (12 + 14) ÷ 2 = 13.', 'La médiane résiste aux valeurs extrêmes. Dans une rue où cinq maisons valent 200 000 € et une sixième 2 millions, la moyenne grimpe à 500 000 € alors que la médiane reste à 200 000 €. C’est pourquoi l’Insee publie le revenu médian plutôt que le revenu moyen.'] },
    { h2: 'Exemple détaillé', table: { caption: 'Notes d’un trimestre', headers: ['Valeurs', 'Somme', 'Nombre', 'Moyenne', 'Médiane'], rows: [['8 ; 11 ; 13 ; 14 ; 19', '65', '5', '13', '13'], ['10 ; 10 ; 12 ; 18', '50', '4', '12,5', '11'], ['4 ; 15 ; 16 ; 16 ; 17', '68', '5', '13,6', '16']] } },
    { h2: 'Autres indicateurs utiles', list: ['L’étendue (maximum − minimum) donne une idée rapide de la dispersion.', 'L’[[/calcul-ecart-type|écart type]] mesure l’éloignement moyen des valeurs par rapport à la moyenne.', 'Pour ramener une note sur un autre barème, utilisez la page [[/note-sur-20|note sur 20]].'] },
    { h2: 'Combien faut-il au prochain contrôle ?', paragraphs: ['Pour atteindre une moyenne visée M après n notes de moyenne m, la note suivante doit valoir M × (n + 1) − m × n. Avec 11 de moyenne sur 4 notes et un objectif de 12, il faut 12 × 5 − 11 × 4 = 16 au cinquième contrôle, à coefficient égal.'] },
  ],
  faqs: [
    { q: 'Comment calculer la moyenne de mes notes ?', a: 'Additionnez les notes et divisez par leur nombre. Si elles ont des coefficients différents, utilisez la moyenne pondérée.' },
    { q: 'Quels séparateurs puis-je utiliser ?', a: 'Espaces, points-virgules, retours à la ligne, ou virgules suivies d’un espace. Une virgule entre deux chiffres est lue comme une virgule décimale.' },
    { q: 'La moyenne de moyennes est-elle juste ?', a: 'Seulement si chaque groupe contient le même nombre de valeurs. Sinon, il faut pondérer chaque moyenne par l’effectif de son groupe.' },
  ],
  related: ['moyenne-ponderee', 'note-sur-20', 'calcul-ecart-type', 'calcul-pourcentage'],
}
