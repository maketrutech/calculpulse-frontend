export default {
  tool: 'Augmentation',
  title: 'Calcul pourcentage d’augmentation : +x % et entre deux valeurs',
  description: 'Nouvelle valeur après une hausse de x %, ou pourcentage d’augmentation entre deux montants. Formules, exemples de salaire et de prix.',
  h1: 'Pourcentage d’augmentation : après +x % ou entre deux valeurs',
  lede: 'Deux calculs distincts : la valeur obtenue en ajoutant x %, et le pourcentage d’augmentation qu’il y a entre une ancienne valeur et une nouvelle.',
  sections: [
    {
      h2: 'Nouvelle valeur après une augmentation de x %',
      paragraphs: [
        'Augmenter une valeur V de t % revient à la multiplier par (1 + t ÷ 100). La nouvelle valeur est V × (1 + t ÷ 100). Le montant ajouté est V × t ÷ 100.',
        'Salaire : 2 400 € augmentés de 5 % passent à 2 400 × 1,05 = 2 520 €. La hausse est de 120 €. Prix : un article à 80 € qui prend 15 % coûte 80 × 1,15 = 92 €, soit 12 € de plus.',
        'Une baisse utilise le même coefficient avec un moins : retirer 15 % multiplie par 0,85. Le premier bloc du calculateur applique la hausse ou la baisse et affiche l’écart.',
      ],
    },
    {
      h2: 'Quel pourcentage d’augmentation entre deux valeurs ?',
      paragraphs: [
        'Quand les deux montants sont connus, le pourcentage d’augmentation est (nouvelle − ancienne) ÷ ancienne × 100. L’ancienne valeur est toujours au dénominateur.',
        'Un loyer qui passe de 740 € à 762,20 € augmente de (762,20 − 740) ÷ 740 × 100 = 3 %. Un prix qui passe de 48 € à 42 € évolue de (42 − 48) ÷ 48 × 100 = −12,5 % : le signe moins indique une baisse. Le second bloc du calculateur fait cette division.',
        'Le coefficient multiplicateur, le taux qui annule une évolution et le taux annuel moyen sur plusieurs années sont sur la page [[/taux-d-evolution|taux d’évolution]]. Pour obtenir seulement « 15 % de 80 » sans l’ajouter au prix, le [[/calcul-pourcentage|calcul de pourcentage]] suffit.',
      ],
    },
    {
      h2: 'Deux calculs qui ne se font pas à l’envers',
      paragraphs: [
        'Revenir avant une hausse ne consiste pas à retirer le même pourcentage. Après +10 %, 110 € venaient de 110 ÷ 1,10 = 100 €. Retirer 10 % de 110 € donne 99 €. On divise par le coefficient (1 + t ÷ 100).',
        'Deux hausses de suite ne s’additionnent pas. +5 % puis +5 % font 1,05 × 1,05 = 1,1025, soit +10,25 %. Une hausse de 20 % suivie d’une baisse de 20 % laisse 1,20 × 0,80 = 0,96, c’est-à-dire une valeur finale inférieure de 4 % à la valeur de départ.',
      ],
      table: {
        caption: 'Coefficients pour appliquer un pourcentage',
        headers: ['Variation', 'Coefficient', '100 devient'],
        rows: [['+2 %', '1,02', '102'], ['+5 %', '1,05', '105'], ['+10 %', '1,1', '110'], ['+25 %', '1,25', '125'], ['−10 %', '0,9', '90'], ['−30 %', '0,7', '70'], ['−50 %', '0,5', '50']],
      },
    },
  ],
  faqs: [
    { q: 'Comment calculer la valeur après une augmentation de 8 % ?', a: 'Multipliez par 1,08. Un abonnement de 25 € augmenté de 8 % coûte 25 × 1,08 = 27 €. Le montant ajouté est 2 €.' },
    { q: 'Comment trouver le pourcentage d’augmentation entre deux prix ?', a: 'Faites (nouveau − ancien) ÷ ancien × 100. De 64 € à 72 € : (72 − 64) ÷ 64 × 100 = 12,5 %.' },
    { q: 'Pourquoi +10 % puis −10 % ne ramènent-ils pas au départ ?', a: 'La baisse de 10 % s’applique au montant déjà augmenté. 100 × 1,10 × 0,90 = 99. Il reste un écart de 1 %.' },
    { q: 'Quelle page pour un taux d’évolution ou un simple pourcentage ?', a: 'Le [[/taux-d-evolution|taux d’évolution]] compare deux valeurs et enchaîne plusieurs périodes. Le [[/calcul-pourcentage|calcul de pourcentage]] donne x % d’un nombre, sans l’ajouter.' },
  ],
  related: ['taux-d-evolution', 'calcul-pourcentage', 'calcul-remise', 'calcul-marge'],
}
