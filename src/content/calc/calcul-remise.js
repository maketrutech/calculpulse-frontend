export default {
  tool: 'Remise',
  title: 'Calcul de remise : prix soldé et remises successives',
  description: 'Calculez un prix après remise ou soldes, le montant économisé et l’effet de deux remises successives (ex. −30 % puis −20 %). Formules et exemples.',
  h1: 'Calcul de remise et de prix soldé',
  lede: 'Entrez le prix initial et le pourcentage de remise, puis une éventuelle remise supplémentaire : le prix final, l’économie réalisée et la remise totale équivalente apparaissent.',
  sections: [
    { h2: 'Calculer un prix après remise', paragraphs: ['Un prix remisé de t % s’obtient en multipliant le prix initial par (1 − t ÷ 100). Une veste à 120 € soldée à −30 % coûte 120 × 0,7 = 84 €, et l’économie vaut 36 €.', 'Pour un calcul mental, calculez d’abord 10 % (12 €), multipliez-le par le nombre de dizaines (3 × 12 = 36 €), puis retirez le résultat du prix.'] },
    { h2: 'Deux remises successives', paragraphs: ['Les soldes affichent souvent « −30 % puis −20 % supplémentaires en caisse ». Les deux remises ne s’additionnent pas : la seconde s’applique au prix déjà réduit. 120 € × 0,7 × 0,8 = 67,20 €. La remise totale vaut 44 %, et non 50 %.'], table: { caption: 'Remises successives et remise équivalente', headers: ['Remise 1', 'Remise 2', 'Remise totale'], rows: [['−10 %', '−10 %', '−19 %'], ['−20 %', '−10 %', '−28 %'], ['−30 %', '−20 %', '−44 %'], ['−40 %', '−20 %', '−52 %'], ['−50 %', '−20 %', '−60 %'], ['−50 %', '−50 %', '−75 %']] } },
    { h2: 'Retrouver le pourcentage d’une réduction', paragraphs: ['Si une étiquette passe de 79 € à 59 €, la remise vaut (79 − 59) ÷ 79 × 100 = 25,3 %. C’est un [[/taux-d-evolution|taux d’évolution]] négatif. Méfiez-vous du prix de référence : il doit correspondre au prix le plus bas pratiqué au cours des 30 jours précédant la promotion.'] },
    { h2: 'Remise, rabais et ristourne', list: ['La remise est une réduction accordée sur le prix catalogue, souvent pour quantité ou fidélité.', 'Le rabais compense un défaut de qualité ou un retard de livraison.', 'La ristourne est versée a posteriori, sur un volume d’achats réalisé sur une période.', 'Pour un professionnel, ces réductions figurent sur la facture et diminuent la base de TVA : voir le [[/calcul-tva|calcul de TVA]].'] },
  ],
  faqs: [
    { q: 'Comment calculer 25 % de remise ?', a: 'Multipliez le prix par 0,75, ou divisez-le par 4 et retirez le résultat. 60 € − 25 % = 45 €.' },
    { q: 'Est-ce que −20 % puis −20 % font −40 % ?', a: 'Non, ils font −36 %, car 0,8 × 0,8 = 0,64.' },
    { q: 'L’ordre des remises successives compte-t-il ?', a: 'Non. La multiplication est commutative : −30 % puis −20 % donnent le même prix final que −20 % puis −30 %.' },
  ],
  related: ['calcul-pourcentage', 'calcul-augmentation', 'calcul-marge', 'taux-d-evolution'],
}
