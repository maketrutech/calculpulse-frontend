export default {
  tool: 'MoyennePonderee',
  title: 'Moyenne pondérée : calcul de moyenne avec coefficients',
  description: 'Calculez une moyenne pondérée avec coefficients : moyenne du bulletin, du bac ou du brevet, note de partiel. Ajoutez vos lignes, le résultat est immédiat.',
  h1: 'Calcul de moyenne pondérée',
  lede: 'Une ligne par note avec son coefficient. Ajoutez ou supprimez des lignes : la somme des points, la somme des coefficients et la moyenne pondérée se mettent à jour.',
  sections: [
    { h2: 'La formule de la moyenne pondérée', paragraphs: ['La moyenne pondérée est la somme des produits « valeur × coefficient » divisée par la somme des coefficients. Avec 14 en maths coefficient 4, 11 en français coefficient 3 et 16 en anglais coefficient 2 : (14 × 4 + 11 × 3 + 16 × 2) ÷ (4 + 3 + 2) = (56 + 33 + 32) ÷ 9 = 121 ÷ 9 ≈ 13,44.', 'Un coefficient élevé rapproche la moyenne de la note concernée. Avec des coefficients tous égaux, on retrouve la [[/calcul-moyenne|moyenne simple]].'] },
    { h2: 'Exemples scolaires', list: ['Bulletin : chaque devoir a un coefficient (1 pour une interrogation, 2 ou 3 pour un devoir surveillé).', 'Université : chaque unité d’enseignement a un nombre de crédits ECTS qui sert de coefficient.', 'Brevet et baccalauréat : les épreuves écrites, orales et le contrôle continu ont des coefficients fixés par les textes officiels ; vérifiez-les sur le site de l’Éducation nationale pour votre session.', 'Notes sur des barèmes différents : convertissez-les d’abord en [[/note-sur-20|notes sur 20]].'] },
    { h2: 'Tableau d’exemple', table: { caption: 'Moyenne pondérée d’un semestre', headers: ['Matière', 'Note', 'Coefficient', 'Points'], rows: [['Mathématiques', '14', '4', '56'], ['Français', '11', '3', '33'], ['Anglais', '16', '2', '32'], ['Total', '—', '9', '121 → 13,44']] } },
    { h2: 'Les erreurs à éviter', list: ['Diviser par le nombre de matières au lieu de la somme des coefficients : avec l’exemple ci-dessus, 121 ÷ 3 donnerait 40,3, un résultat absurde.', 'Mélanger des notes sur 10 et sur 20 sans les convertir : un 8 sur 10 vaut 16 sur 20, pas 8.', 'Oublier une matière à coefficient élevé : c’est elle qui pèse le plus sur le résultat.', 'Arrondir chaque produit avant d’additionner : gardez les décimales jusqu’à la division finale.'] },
    { h2: 'Hors de l’école', paragraphs: ['La moyenne pondérée sert aussi pour un prix moyen d’achat (des actions achetées en plusieurs fois, pondérées par la quantité), un taux moyen de plusieurs crédits pondérés par leur capital, ou une note moyenne d’avis clients pondérée par le nombre d’avis. Le principe ne change pas : chaque valeur compte autant que son poids.'] },
  ],
  faqs: [
    { q: 'Les coefficients peuvent-ils être décimaux ?', a: 'Oui : 0,5 ou 1,5 sont acceptés, avec la virgule ou le point.' },
    { q: 'Que se passe-t-il si un coefficient vaut 0 ?', a: 'La note ne compte pas. Si tous les coefficients valent 0, la moyenne ne peut pas être calculée.' },
    { q: 'Mes notes sont sur 10 et sur 20, comment faire ?', a: 'Ramenez-les toutes au même barème avant de les pondérer : 7 sur 10 devient 14 sur 20.' },
  ],
  related: ['calcul-moyenne', 'note-sur-20', 'calcul-ecart-type', 'produit-en-croix'],
}
