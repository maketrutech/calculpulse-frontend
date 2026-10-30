import { rateTable, tvaFaq } from './tva-common.js'

export default {
  tool: 'Tva',
  props: { rate: '20' },
  title: 'Calcul TVA 20 % : HT en TTC et TTC en HT',
  description: 'Calculez la TVA à 20 % : prix TTC à partir du HT, HT à partir du TTC et montant de TVA. Ce qui relève du taux normal, formules et tableau d’exemples.',
  h1: 'Calcul de TVA à 20 %',
  lede: 'Le calculateur est réglé sur le taux normal de 20 %. Saisissez un montant HT ou TTC ; vous pouvez changer de taux à tout moment.',
  sections: [
    { h2: 'À quoi s’applique la TVA à 20 % ?', paragraphs: ['Le taux normal de 20 % s’applique par défaut à tout ce qui ne relève pas d’un taux réduit : vêtements, électroménager, high-tech, mobilier, carburant, prestations de conseil, services numériques, alcool, ou encore la plupart des travaux de construction neuve. C’est de loin le taux le plus courant sur les factures entre entreprises.'] },
    { h2: 'Formules et raccourci', paragraphs: ['TTC = HT × 1,2 et HT = TTC ÷ 1,2. Le montant de TVA vaut HT × 20 ÷ 100. Multiplier par 1,2 donne le TTC ; diviser par 1,2 donne le HT. La TVA représente un sixième du prix TTC : sur 60 € TTC, elle vaut 10 €. Ce raccourci permet de vérifier une facture de tête.'] },
    { h2: 'Exemple concret', paragraphs: ['Un graphiste facture une identité visuelle 2 400 € HT. Le client paie 2 400 × 1,2 = 2 880 € TTC, dont 480 € de TVA que le graphiste reverse, après déduction de la TVA payée sur ses propres achats.', 'Pour une facture qui mélange plusieurs taux, calculez chaque ligne séparément puis additionnez les totaux ; la [[/calcul-tva|page générale du calcul de TVA]] récapitule tous les taux en vigueur.'] },
    { h2: 'Sur la facture et la déclaration', paragraphs: ['Une facture au taux normal doit faire apparaître, pour chaque ligne, le prix unitaire HT, le taux de 20 %, puis le total HT, le montant de TVA et le total TTC. Le vendeur collecte cette TVA pour l’État et la reverse lors de sa déclaration (CA3 mensuelle ou trimestrielle, ou CA12 annuelle selon le régime). L’acheteur professionnel récupère la TVA payée sur ses achats : seule la différence est due. Pour un micro-entrepreneur en franchise en base, aucune TVA n’est facturée et la mention « TVA non applicable, art. 293 B du CGI » remplace le calcul.'] },
    { h2: 'Tableau HT, TVA et TTC', table: rateTable(20) },
  ],
  faqs: [
    ...tvaFaq,
    { q: 'Le taux de 20 % peut-il changer ?', a: 'Les taux et leur champ d’application sont fixés par la loi de finances et évoluent parfois. Vérifiez sur impots.gouv.fr avant d’émettre une facture si vous avez un doute sur un produit.' },
  ],
  related: ['calcul-tva', 'calcul-tva-20', 'calcul-tva-10', 'calcul-tva-5-5', 'calcul-marge'].filter((id) => id !== 'calcul-tva-20'),
}
