import { rateTable, tvaFaq } from './tva-common.js'

export default {
  tool: 'Tva',
  props: { rate: '10' },
  title: 'Calcul TVA 10 % : HT en TTC et TTC en HT',
  description: 'Calculez la TVA à 10 % : prix TTC à partir du HT, HT à partir du TTC et montant de TVA. Ce qui relève du taux intermédiaire, formules et tableau d’exemples.',
  h1: 'Calcul de TVA à 10 %',
  lede: 'Le calculateur est réglé sur le taux intermédiaire de 10 %. Saisissez un montant HT ou TTC ; vous pouvez changer de taux à tout moment.',
  sections: [
    { h2: 'À quoi s’applique la TVA à 10 % ?', paragraphs: ['Le taux intermédiaire de 10 % concerne la restauration sur place et la vente à emporter de plats à consommer immédiatement, l’hébergement hôtelier et les campings classés, les transports de voyageurs (train, bus, taxi), les travaux d’amélioration et d’entretien dans un logement de plus de deux ans, certains produits agricoles non transformés et les droits d’entrée des musées, zoos et sites culturels.'] },
    { h2: 'Formules et raccourci', paragraphs: ['TTC = HT × 1,1 et HT = TTC ÷ 1,1. Le montant de TVA vaut HT × 10 ÷ 100. Multiplier par 1,1 donne le TTC ; diviser par 1,1 donne le HT. La TVA représente un onzième du TTC (9,09 %) : sur 55 € TTC, elle vaut 5 €.'] },
    { h2: 'Exemple concret', paragraphs: ['Un artisan remplace les fenêtres simples d’un appartement ancien pour 6 000 € HT de main-d’œuvre et de fournitures. Hors travaux d’économie d’énergie éligibles au 5,5 %, la facture atteint 6 600 € TTC. Le client doit remettre une attestation simplifiée confirmant l’âge du logement.', 'Pour une facture qui mélange plusieurs taux, calculez chaque ligne séparément puis additionnez les totaux ; la [[/calcul-tva|page générale du calcul de TVA]] récapitule tous les taux en vigueur.'] },
    { h2: 'Sur la facture et la déclaration', paragraphs: ['Un restaurant ou un artisan qui applique 10 % doit pouvoir le justifier : pour des travaux dans un logement, le client atteste que le local est achevé depuis plus de deux ans et à usage d’habitation. Sur la facture, indiquez le taux ligne par ligne, car un même devis peut mélanger 10 % (pose), 5,5 % (isolation) et 20 % (équipement hors champ). La TVA collectée à 10 % est reportée sur une ligne distincte de la déclaration, et la TVA payée sur les achats reste déductible au taux auquel elle a été facturée.'] },
    { h2: 'Tableau HT, TVA et TTC', table: rateTable(10) },
  ],
  faqs: [
    ...tvaFaq,
    { q: 'Le taux de 10 % peut-il changer ?', a: 'Les taux et leur champ d’application sont fixés par la loi de finances et évoluent parfois. Vérifiez sur impots.gouv.fr avant d’émettre une facture si vous avez un doute sur un produit.' },
  ],
  related: ['calcul-tva', 'calcul-tva-20', 'calcul-tva-10', 'calcul-tva-5-5', 'calcul-marge'].filter((id) => id !== 'calcul-tva-10'),
}
