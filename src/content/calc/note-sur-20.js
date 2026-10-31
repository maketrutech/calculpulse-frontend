export default {
  tool: 'NoteSur20',
  title: 'Note sur 20 : convertir une note sur 10, 30, 40 ou 100',
  description: 'Convertissez une note sur n’importe quel barème en note sur 20, ou une note sur 20 en pourcentage. Exemples : 15/30, 32/40, 68/100 en note sur 20.',
  h1: 'Convertir une note sur 20',
  lede: 'Entrez la note obtenue et le barème du devoir : la note sur 20, le pourcentage et la note sur 10 s’affichent. Utile pour un QCM, un partiel ou un contrôle noté sur 40.',
  sections: [
    { h2: 'La formule', paragraphs: ['Pour ramener une note sur 20, on la multiplie par 20 puis on la divise par le barème : note sur 20 = note × 20 ÷ barème. Un 27 sur 40 vaut 27 × 20 ÷ 40 = 13,5 sur 20. C’est un [[/produit-en-croix|produit en croix]] : la note est au barème ce que le résultat est à 20.', 'Le pourcentage de réussite se calcule de la même façon avec 100 : 27 ÷ 40 × 100 = 67,5 %.'] },
    { h2: 'Tableau de conversion', table: { caption: 'Correspondances courantes', headers: ['Note', 'Sur 20', 'Pourcentage'], rows: [['7/10', '14', '70 %'], ['15/25', '12', '60 %'], ['18/30', '12', '60 %'], ['32/40', '16', '80 %'], ['35/50', '14', '70 %'], ['48/60', '16', '80 %'], ['68/100', '13,6', '68 %']] } },
    { h2: 'Arrondir une note', paragraphs: ['Les enseignants arrondissent souvent au demi-point ou au quart de point. Le calculateur affiche deux décimales ; à vous de choisir l’arrondi attendu. Attention : arrondir chaque note avant de faire la moyenne peut décaler le résultat final de quelques centièmes.'] },
    { h2: 'Convertir dans l’autre sens', paragraphs: ['Pour passer d’une note sur 20 à un autre barème, on inverse la formule : note = note sur 20 × barème ÷ 20. Un 14 sur 20 correspond à 7 sur 10, 21 sur 30 ou 70 sur 100. C’est utile pour annoncer une note sur 10 à un établissement étranger ou pour comparer avec un résultat en pourcentage. Si le barème comporte des points bonus (par exemple 22 points possibles pour une note sur 20), plafonnez d’abord à 20 ou demandez la règle à l’enseignant.'] },
    { h2: 'Barèmes étrangers', paragraphs: ['Dans d’autres systèmes, la conversion n’est pas toujours proportionnelle. Les notes américaines en lettres (A, B, C) ou le GPA sur 4, et le système allemand de 1 à 6 où 1 est la meilleure note, utilisent des grilles d’équivalence fixées par chaque établissement. Le calculateur suppose un barème linéaire qui commence à 0.'] },
    { h2: 'Et ensuite ?', paragraphs: ['Une fois vos notes ramenées sur 20, calculez votre [[/calcul-moyenne|moyenne]] ou votre [[/moyenne-ponderee|moyenne pondérée avec coefficients]].'] },
  ],
  faqs: [
    { q: 'Comment mettre une note sur 30 en note sur 20 ?', a: 'Multipliez par 2 puis divisez par 3. 21/30 = 14/20.' },
    { q: 'Comment passer d’une note sur 20 à une note sur 100 ?', a: 'Multipliez par 5. 13/20 = 65/100.' },
    { q: 'Une note peut-elle dépasser le barème ?', a: 'Avec des points bonus, oui ; le calculateur l’accepte et affiche une note sur 20 supérieure à 20.' },
  ],
  related: ['calcul-moyenne', 'moyenne-ponderee', 'produit-en-croix', 'calcul-pourcentage'],
}
