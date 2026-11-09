export default {
  tool: 'Evolution',
  title: 'Taux d’évolution : calcul du pourcentage de variation',
  description: 'Calculez le taux d’évolution entre deux valeurs, le coefficient multiplicateur et le taux réciproque. Formule, exemples et taux moyen sur plusieurs périodes.',
  h1: 'Calcul du taux d’évolution',
  lede: 'Entrez une valeur de départ et une valeur d’arrivée : le pourcentage de hausse ou de baisse, le coefficient multiplicateur et le taux qui ramènerait à la valeur de départ s’affichent.',
  sections: [
    { h2: 'La formule du taux d’évolution', paragraphs: ['Le taux d’évolution entre une valeur de départ V₀ et une valeur d’arrivée V₁ vaut (V₁ − V₀) ÷ V₀ × 100. Un chiffre d’affaires qui passe de 48 000 € à 54 000 € progresse de (54 000 − 48 000) ÷ 48 000 × 100 = 12,5 %.', 'Le résultat est positif pour une hausse et négatif pour une baisse. Une audience qui tombe de 2 500 à 2 000 visiteurs recule de 20 %. La valeur de départ sert toujours de référence : c’est elle qui est au dénominateur.'] },
    { h2: 'Coefficient multiplicateur', paragraphs: ['Le coefficient multiplicateur CM = V₁ ÷ V₀ indique par combien on a multiplié la valeur de départ. Un CM de 1,125 correspond à +12,5 % ; un CM de 0,8 à −20 %. On passe de l’un à l’autre avec t = (CM − 1) × 100.'] },
    { h2: 'Le taux réciproque', paragraphs: ['Le taux réciproque est l’évolution qui ramène V₁ à V₀. Après une baisse de 20 %, il faut une hausse de 25 % pour revenir au point de départ, car 0,8 × 1,25 = 1. La formule est t′ = (1 ÷ CM − 1) × 100. Plus la baisse est forte, plus la hausse nécessaire est grande : après −50 %, il faut +100 %.'], table: { caption: 'Baisses et hausses réciproques', headers: ['Baisse', 'Hausse pour revenir'], rows: [['−10 %', '+11,11 %'], ['−20 %', '+25 %'], ['−25 %', '+33,33 %'], ['−33,33 %', '+50 %'], ['−50 %', '+100 %'], ['−75 %', '+300 %']] } },
    { h2: 'Taux d’évolution moyen', paragraphs: ['Quand une valeur évolue sur plusieurs années, le taux annuel moyen n’est pas la moyenne des taux. Si une population passe de 10 000 à 12 100 habitants en deux ans, le taux global vaut +21 %, et le taux annuel moyen +10 %, car 1,1 × 1,1 = 1,21. On calcule CM^(1/n) − 1, où n est le nombre de périodes. Ce raisonnement est aussi celui des [[/interets-composes|intérêts composés]].'] },
  ],
  faqs: [
    { q: 'Quelle différence entre taux d’évolution et pourcentage ?', a: 'Un pourcentage décrit une part d’un total. Un taux d’évolution décrit un changement relatif entre deux valeurs dans le temps, exprimé en pourcentage.' },
    { q: 'Peut-on calculer un taux d’évolution depuis zéro ?', a: 'Non. Avec une valeur de départ nulle, la division est impossible : on donne alors la variation en valeur absolue.' },
    { q: 'Comment calculer une évolution en points ?', a: 'Pour comparer deux taux (un taux de chômage de 7,1 % puis 7,4 %), faites la simple différence : +0,3 point. Le taux d’évolution, lui, serait de +4,2 %.' },
  ],
  related: ['calcul-augmentation', 'calcul-pourcentage', 'interets-composes', 'calcul-remise'],
}
