export default {
  tool: 'Interets',
  title: 'Calcul d’intérêts simples : placement et prêt',
  description: 'Calculez les intérêts simples d’un capital selon le taux annuel et la durée en mois ou en jours. Formule, exemples et différence avec les intérêts composés.',
  h1: 'Calcul d’intérêts simples',
  lede: 'Saisissez le capital, le taux annuel et la durée : le montant des intérêts et le capital final s’affichent. Utile pour un prêt entre particuliers, un retard de paiement ou un placement court.',
  sections: [
    { h2: 'La formule des intérêts simples', paragraphs: ['Avec des intérêts simples, les intérêts sont calculés uniquement sur le capital de départ : intérêts = capital × taux × durée en années. Un prêt de 5 000 € à 4 % pendant 18 mois rapporte 5 000 × 0,04 × 1,5 = 300 €.', 'Pour une durée en jours, on divise par 365 (ou 360 dans certains usages bancaires) : 10 000 € à 3 % pendant 90 jours donnent 10 000 × 0,03 × 90 ÷ 365 ≈ 73,97 €.'] },
    { h2: 'Simples ou composés ?', paragraphs: ['Avec les intérêts composés, les intérêts de chaque période s’ajoutent au capital et produisent à leur tour des intérêts. Sur une année, la différence est faible ; sur dix ou vingt ans, elle devient importante.'], table: { caption: '10 000 € placés à 5 % par an', headers: ['Durée', 'Intérêts simples', 'Intérêts composés'], rows: [['1 an', '500 €', '500 €'], ['5 ans', '2 500 €', '2 762,82 €'], ['10 ans', '5 000 €', '6 288,95 €'], ['20 ans', '10 000 €', '16 532,98 €']] } },
    { h2: 'Où rencontre-t-on les intérêts simples ?', list: ['Les pénalités de retard sur une facture entre professionnels, calculées au prorata des jours de retard.', 'Les intérêts légaux dus après une décision de justice.', 'Les prêts entre particuliers, si le contrat le prévoit.', 'Le calcul quinzaine par quinzaine du Livret A : les intérêts de l’année ne sont capitalisés qu’au 31 décembre.'] },
    { h2: 'Taux annuel, mensuel et TAEG', paragraphs: ['Un taux annuel de 6 % correspond à un taux mensuel proportionnel de 0,5 %. Pour un crédit, le chiffre à comparer est le TAEG, qui inclut les frais de dossier et l’assurance obligatoire. Pour un placement sur plusieurs années, utilisez le calcul des [[/interets-composes|intérêts composés]], qui gère aussi les versements mensuels.'] },
  ],
  faqs: [
    { q: 'Comment calculer des intérêts sur un nombre de mois ?', a: 'Divisez le nombre de mois par 12 pour obtenir la durée en années. 8 mois = 0,667 an.' },
    { q: 'Les intérêts sont-ils imposables ?', a: 'En France, les intérêts sont en général soumis au prélèvement forfaitaire unique, sauf pour les livrets réglementés comme le Livret A ou le LDDS. Vérifiez votre situation sur impots.gouv.fr.' },
    { q: 'Pourquoi certaines banques divisent-elles par 360 ?', a: 'C’est une convention de marché (année commerciale) qui majore légèrement les intérêts. Le calculateur utilise 365 jours.' },
  ],
  related: ['interets-composes', 'taux-d-evolution', 'calcul-pourcentage', 'calcul-augmentation'],
}
