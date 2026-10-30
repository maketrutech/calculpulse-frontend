import { rateTable, tvaFaq } from './tva-common.js'

export default {
  tool: 'Tva',
  props: { rate: '5.5' },
  title: 'Calcul TVA 5,5 % : HT en TTC et TTC en HT',
  description: 'Calculez la TVA à 5,5 % : prix TTC à partir du HT, HT à partir du TTC et montant de TVA. Ce qui relève du taux réduit, formules et tableau d’exemples.',
  h1: 'Calcul de TVA à 5,5 %',
  lede: 'Le calculateur est réglé sur le taux réduit de 5,5 %. Saisissez un montant HT ou TTC ; vous pouvez changer de taux à tout moment.',
  sections: [
    { h2: 'À quoi s’applique la TVA à 5,5 % ?', paragraphs: ['Le taux réduit de 5,5 % s’applique aux produits alimentaires (hors alcool, confiserie et certains produits de luxe), aux abonnements de gaz et d’électricité, aux livres, aux cantines scolaires, aux équipements pour personnes handicapées, et aux travaux d’amélioration de la qualité énergétique d’un logement de plus de deux ans (isolation, pompe à chaleur, chaudière performante).'] },
    { h2: 'Formules et raccourci', paragraphs: ['TTC = HT × 1,055 et HT = TTC ÷ 1,055. Le montant de TVA vaut HT × 5,5 ÷ 100. Multiplier par 1,055 donne le TTC ; diviser par 1,055 donne le HT. Le calcul de tête est moins simple : la TVA représente environ 5,21 % du TTC.'] },
    { h2: 'Exemple concret', paragraphs: ['Une isolation des combles est facturée 3 200 € HT. Avec la TVA à 5,5 %, le client paie 3 376 € TTC, dont 176 € de TVA, contre 3 840 € au taux normal.', 'Pour une facture qui mélange plusieurs taux, calculez chaque ligne séparément puis additionnez les totaux ; la [[/calcul-tva|page générale du calcul de TVA]] récapitule tous les taux en vigueur.'] },
    { h2: 'Sur la facture et la déclaration', paragraphs: ['Le taux de 5,5 % étant réservé à des biens et travaux précis, la facture doit décrire clairement l’opération : un « panier repas » ou des « travaux » sans détail ne suffisent pas en cas de contrôle. Pour les travaux de rénovation énergétique, conservez l’attestation du client et les caractéristiques techniques des matériaux posés. La TVA collectée à 5,5 % figure sur sa propre ligne de déclaration ; si une partie de la facture relève d’un autre taux, ventilez le total HT entre les taux avant de calculer chaque montant de TVA.'] },
    { h2: 'Tableau HT, TVA et TTC', table: rateTable(5.5) },
  ],
  faqs: [
    ...tvaFaq,
    { q: 'Le taux de 5,5 % peut-il changer ?', a: 'Les taux et leur champ d’application sont fixés par la loi de finances et évoluent parfois. Vérifiez sur impots.gouv.fr avant d’émettre une facture si vous avez un doute sur un produit.' },
  ],
  related: ['calcul-tva', 'calcul-tva-20', 'calcul-tva-10', 'calcul-tva-5-5', 'calcul-marge'].filter((id) => id !== 'calcul-tva-5-5'),
}
