import { tvaFaq, tvaTable } from './tva-common.js'

export default {
  tool: 'Tva',
  props: { rate: '20' },
  title: 'Calcul TVA : convertir HT en TTC et TTC en HT',
  description: 'Calculez la TVA en ligne : passez du HT au TTC ou du TTC au HT aux taux de 20 %, 10 %, 5,5 % et 2,1 %. Formules, taux en vigueur et exemples.',
  h1: 'Calcul de la TVA : HT ↔ TTC',
  lede: 'Saisissez un montant hors taxes ou toutes taxes comprises, choisissez le taux : le HT, la TVA et le TTC s’affichent ensemble, au centime près.',
  sections: [
    { h2: 'Calculer le TTC à partir du HT', paragraphs: ['Le prix toutes taxes comprises s’obtient en multipliant le prix hors taxes par (1 + taux de TVA). Avec le taux normal de 20 %, le coefficient vaut 1,2 : un service facturé 850 € HT coûte 850 × 1,2 = 1 020 € TTC, dont 170 € de TVA.'] },
    { h2: 'Calculer le HT à partir du TTC', paragraphs: ['Pour retrouver le hors taxes, on divise le TTC par le même coefficient. Un ordinateur à 1 199 € TTC vaut 1 199 ÷ 1,2 = 999,17 € HT. La TVA incluse se calcule ensuite par différence : 1 199 − 999,17 = 199,83 €. Retenez que la TVA à 20 % représente un sixième du TTC (16,67 %), et non 20 %.'] },
    { h2: 'Les taux de TVA en France', paragraphs: ['Le taux dépend de la nature du bien ou du service vendu, pas de l’acheteur. Chaque taux a sa page avec des exemples : [[/calcul-tva-20|TVA à 20 %]], [[/calcul-tva-10|TVA à 10 %]] et [[/calcul-tva-5-5|TVA à 5,5 %]]. La Corse et les départements d’outre-mer appliquent des taux spécifiques (8,5 % et 2,1 % en Guadeloupe, Martinique et à La Réunion) ; la TVA ne s’applique pas en Guyane ni à Mayotte.'], table: tvaTable },
    { h2: 'Bon à savoir pour les professionnels', list: ['Une entreprise assujettie collecte la TVA sur ses ventes et déduit celle payée sur ses achats ; elle reverse la différence au Trésor.', 'Les micro-entrepreneurs en franchise en base ne facturent pas de TVA et portent la mention « TVA non applicable, art. 293 B du CGI ».', 'Les arrondis se font au centime, en général sur le total de chaque taux de la facture.', 'Pour fixer un prix de vente à partir d’un coût d’achat, voir le [[/calcul-marge|calcul de marge]].'] },
  ],
  faqs: [
    ...tvaFaq,
    { q: 'Quelle TVA appliquer pour un client à l’étranger ?', a: 'Les règles changent selon le pays et le statut du client (particulier ou entreprise). Pour une vente à une entreprise de l’Union européenne, l’autoliquidation s’applique souvent. Vérifiez votre situation sur impots.gouv.fr ou auprès de votre expert-comptable.' },
  ],
  related: ['calcul-tva-20', 'calcul-tva-10', 'calcul-tva-5-5', 'calcul-marge'],
}
