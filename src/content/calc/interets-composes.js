export default {
  tool: 'InteretsComposes',
  title: 'Calcul intérêts composés avec versements mensuels',
  description: 'Simulez un placement à intérêts composés : capital initial, versement mensuel, taux et durée. Capital final, total versé, intérêts gagnés et tableau année par année.',
  h1: 'Calcul d’intérêts composés',
  lede: 'Indiquez votre capital de départ, un éventuel versement mensuel, le taux annuel et la durée : le capital final, les intérêts gagnés et l’évolution année par année s’affichent.',
  sections: [
    { h2: 'Le principe des intérêts composés', paragraphs: ['Les intérêts composés s’ajoutent au capital à la fin de chaque période et produisent à leur tour des intérêts. Un capital C placé à un taux annuel t pendant n années devient C × (1 + t)ⁿ. 10 000 € à 4 % pendant 15 ans deviennent 10 000 × 1,04¹⁵ ≈ 18 009 €.', 'Le simulateur capitalise une fois par an et ajoute vos versements chaque mois ; les sommes versées en cours d’année produisent des intérêts au prorata de leur durée de placement.'] },
    { h2: 'L’effet du temps', paragraphs: ['Plus la durée est longue, plus les intérêts sur les intérêts prennent de place. La « règle de 72 » donne le temps de doublement : 72 ÷ taux. À 6 %, un capital double en environ 12 ans ; à 3 %, en 24 ans.'], table: { caption: '100 € versés chaque mois à 5 % par an', headers: ['Durée', 'Total versé', 'Capital final estimé'], rows: [['5 ans', '6 000 €', '≈ 6 810 €'], ['10 ans', '12 000 €', '≈ 15 500 €'], ['20 ans', '24 000 €', '≈ 40 750 €'], ['30 ans', '36 000 €', '≈ 81 900 €']] } },
    { h2: 'Bien utiliser le simulateur', list: ['Saisissez un taux net de frais : des frais de gestion de 1 % par an réduisent sensiblement le capital final sur vingt ans.', 'Pensez à l’inflation : un rendement de 3 % avec 2 % d’inflation ne fait gagner qu’environ 1 % de pouvoir d’achat.', 'La fiscalité n’est pas prise en compte. Elle dépend de l’enveloppe (livret, assurance vie, PEA, compte-titres) et de votre situation.', 'Un rendement passé ne garantit pas les rendements futurs : pour les placements en actions, le taux annuel moyen cache des années de baisse.'] },
    { h2: 'Taux annuel et taux mensuel équivalent', paragraphs: ['Un taux annuel de 5 % ne correspond pas à 5 ÷ 12 % composés chaque mois : le taux mensuel équivalent vaut (1,05)^(1/12) − 1 ≈ 0,407 %. Pour comparer des performances sur plusieurs années, raisonnez avec le [[/taux-d-evolution|taux d’évolution moyen]]. Pour un calcul sur une seule période, les [[/calcul-interets|intérêts simples]] suffisent.'] },
    { h2: 'Avertissement', paragraphs: ['Ce simulateur donne une estimation pédagogique. Il ne constitue pas un conseil en investissement. Pour un projet important, rapprochez-vous d’un conseiller financier indépendant.'] },
  ],
  faqs: [
    { q: 'Quelle différence entre intérêts simples et composés ?', a: 'Les intérêts simples se calculent toujours sur le capital de départ ; les intérêts composés se calculent aussi sur les intérêts déjà acquis.' },
    { q: 'Le Livret A fonctionne-t-il en intérêts composés ?', a: 'Oui d’une année sur l’autre : les intérêts sont ajoutés au capital chaque 31 décembre, puis rapportent à leur tour l’année suivante.' },
    { q: 'Comment calculer le capital final sans versement ?', a: 'Laissez le versement mensuel à 0 : le simulateur applique alors C × (1 + t)ⁿ.' },
  ],
  related: ['calcul-interets', 'taux-d-evolution', 'calcul-augmentation', 'calcul-pourcentage'],
}
