export default {
  tool: 'Augmentation',
  title: 'Calcul d’augmentation en pourcentage : ajouter ou retirer un %',
  description: 'Calculez une augmentation ou une baisse en pourcentage : nouveau prix, montant de la hausse et prix initial avant augmentation. Formules et exemples.',
  h1: 'Calcul d’une augmentation en pourcentage',
  lede: 'Ajoutez ou retirez un pourcentage à une valeur, ou retrouvez la valeur de départ avant une hausse. Pratique pour un loyer, un salaire, un prix ou un tarif fournisseur.',
  sections: [
    { h2: 'La formule de l’augmentation', paragraphs: ['Augmenter une valeur de t % revient à la multiplier par (1 + t ÷ 100). Un loyer de 850 € qui augmente de 3,5 % passe à 850 × 1,035 = 879,75 €. Le montant de la hausse vaut 850 × 0,035 = 29,75 €.', 'Pour une baisse, on multiplie par (1 − t ÷ 100). Un abonnement de 40 € réduit de 15 % coûte 40 × 0,85 = 34 €. Le nombre 1,035 ou 0,85 s’appelle le coefficient multiplicateur.'] },
    { h2: 'Retrouver la valeur avant augmentation', paragraphs: ['Erreur fréquente : pour annuler une hausse de 10 %, on ne retire pas 10 %. Un prix de 110 € après une hausse de 10 % valait 110 ÷ 1,1 = 100 €, alors que 110 − 10 % donne 99 €. Il faut diviser par le coefficient, et non retirer le même pourcentage.', 'Le mode « Retrouver la valeur initiale » du calculateur fait cette division. Il sert par exemple à retrouver un salaire avant revalorisation ou un tarif de l’année précédente.'] },
    { h2: 'Hausses successives', paragraphs: ['Deux hausses de 5 % ne font pas 10 %, mais 10,25 % : 1,05 × 1,05 = 1,1025. Les pourcentages successifs se multiplient, ils ne s’additionnent pas. Une hausse de 20 % suivie d’une baisse de 20 % fait perdre 4 % : 1,2 × 0,8 = 0,96.'], table: { caption: 'Coefficients multiplicateurs usuels', headers: ['Variation', 'Coefficient', '100 devient'], rows: [['+2 %', '1,02', '102'], ['+5 %', '1,05', '105'], ['+10 %', '1,1', '110'], ['+25 %', '1,25', '125'], ['−10 %', '0,9', '90'], ['−30 %', '0,7', '70'], ['−50 %', '0,5', '50']] } },
    { h2: 'Exemples de la vie courante', list: ['Révision de loyer : le bailleur applique la variation de l’indice de référence des loyers (IRL) publiée par l’Insee.', 'Hausse de tarif : un fournisseur annonce +4 % ; votre prix d’achat de 12,50 € passe à 13 €.', 'Baisse de prix : pour un prix soldé avec plusieurs démarques, voir le [[/calcul-remise|calcul de remise]].'] },
  ],
  faqs: [
    { q: 'Comment ajouter 10 % à un prix ?', a: 'Multipliez le prix par 1,1. 45 € + 10 % = 49,50 €.' },
    { q: 'Comment calculer le pourcentage d’augmentation entre deux prix ?', a: 'Faites (nouveau − ancien) ÷ ancien × 100. Passer de 80 € à 92 € représente une hausse de 15 %. Le [[/taux-d-evolution|calcul du taux d’évolution]] le fait directement.' },
    { q: 'Pourquoi une hausse puis une baisse du même pourcentage ne s’annulent-elles pas ?', a: 'Parce que la baisse s’applique à une valeur déjà augmentée, donc plus grande. +50 % puis −50 % ramènent 100 à 75.' },
  ],
  related: ['taux-d-evolution', 'calcul-pourcentage', 'calcul-remise', 'calcul-marge'],
}
