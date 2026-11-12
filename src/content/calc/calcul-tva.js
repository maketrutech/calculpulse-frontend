import { tvaTable } from './tva-common.js'

export default {
  tool: 'Tva',
  props: { rate: '20', both: true },
  title: 'Calcul HT → TTC et TTC → HT : convertisseur de TVA',
  description: 'Conversion HT → TTC et TTC → HT aux taux de 20 %, 10 %, 5,5 % et 2,1 %. Formules TTC = HT × (1 + taux) et HT = TTC ÷ (1 + taux), exemples au centime.',
  h1: 'Calcul HT → TTC et TTC → HT',
  lede: 'Saisissez un montant hors taxes ou toutes taxes comprises : l’autre montant et la TVA se recalculent ensemble, au centime près.',
  sections: [
    {
      h2: 'Calcul HT → TTC',
      paragraphs: [
        'Le taux entre dans la formule en décimal : 20 % s’écrit 0,20, 10 % s’écrit 0,10, 5,5 % s’écrit 0,055 et 2,1 % s’écrit 0,021. On l’appelle taux dans la formule ci-dessous.',
        'TTC = HT × (1 + taux). Le montant de TVA est HT × taux. À 20 %, 1 + taux vaut 1,20 : une prestation de 175 € HT devient 175 × 1,20 = 210 € TTC, dont 35 € de TVA (175 × 0,20).',
      ],
    },
    {
      h2: 'Conversion TTC en HT',
      paragraphs: [
        'HT = TTC ÷ (1 + taux). La TVA est alors la différence TTC − HT. À 20 %, une facture de 360 € TTC correspond à 360 ÷ 1,20 = 300 € HT, et à 60 € de TVA.',
        'Ces 60 € sont un sixième du TTC (60 ÷ 360), pas 20 % de 360 €. Retirer 20 % du TTC donnerait 72 € de taxe et 288 € de hors taxes : le hors taxes serait trop bas de 12 €. Le calculateur du haut évite ce piège : le champ TTC et le champ HT se suivent.',
      ],
    },
    {
      h2: 'Quatre taux, les deux sens',
      paragraphs: [
        'Même relation aux quatre taux de France métropolitaine. Chaque TTC de la deuxième colonne, divisé par (1 + taux), redonne le HT de départ.',
      ],
      table: {
        caption: 'Conversion HT → TTC et TTC → HT',
        headers: ['Taux', 'HT → TTC', 'TTC → HT'],
        rows: [
          ['20 % (taux = 0,20)', '100 € × 1,20 = 120 €', '120 € ÷ 1,20 = 100 €'],
          ['10 % (taux = 0,10)', '50 € × 1,10 = 55 €', '55 € ÷ 1,10 = 50 €'],
          ['5,5 % (taux = 0,055)', '20 € × 1,055 = 21,10 €', '21,10 € ÷ 1,055 = 20 €'],
          ['2,1 % (taux = 0,021)', '100 € × 1,021 = 102,10 €', '102,10 € ÷ 1,021 = 100 €'],
        ],
      },
    },
    {
      h2: 'Quel taux appliquer',
      paragraphs: [
        'Le taux dépend de l’opération, pas de la personne qui achète. Le taux normal de 20 % (article 278 du CGI) s’applique dès qu’aucun autre taux n’est prévu par la loi. Les cas les plus demandés ont une page : [[/calcul-tva-20|TVA à 20 %]], [[/calcul-tva-10|TVA à 10 %]] (restauration, transports de voyageurs, travaux d’entretien d’un logement) et [[/calcul-tva-5-5|TVA à 5,5 %]] (alimentation, livres, énergie, rénovation énergétique). Le taux particulier de 2,1 % vise notamment les médicaments remboursables, la presse et les 140 premières représentations de certains spectacles.',
        'En Guadeloupe, en Martinique et à La Réunion, le taux normal est de 8,5 % et le taux réduit de 2,1 % (article 296 du CGI) ; quelques opérations ont un taux particulier plus bas. La TVA ne s’applique pas en Guyane ni à Mayotte. La Corse a ses propres taux (article 297 du CGI). Le champ exact d’un bien se vérifie sur impots.gouv.fr.',
      ],
      table: tvaTable,
    },
    {
      h2: 'Arrondir au centime',
      paragraphs: [
        'On arrondit au centime le plus proche, en pratique sur le total hors taxes de chaque taux. À 5,5 %, 42,80 € HT donnent 42,80 × 0,055 = 2,354 € de TVA, arrondis à 2,35 €. Le TTC est 42,80 + 2,35 = 45,15 €, soit aussi 42,80 × 1,055 = 45,154 € ramené au centime.',
        'Un micro-entrepreneur en franchise en base ne fait pas ce calcul : il ne facture pas de TVA et porte la mention « TVA non applicable, art. 293 B du CGI ». Pour partir d’un coût d’achat et fixer un prix HT, le [[/calcul-marge|calcul de marge]] vient avant la TVA.',
      ],
    },
  ],
  faqs: [
    { q: 'Comment convertir un TTC en HT ?', a: 'Divisez le TTC par (1 + taux), avec le taux en décimal. À 10 %, 33 € TTC ÷ 1,10 = 30 € HT. Retirer 10 % de 33 € donnerait 29,70 €, ce qui n’est pas le hors taxes.' },
    { q: 'Comment calculer un HT en TTC ?', a: 'Multipliez le HT par (1 + taux). À 20 %, 80 € HT × 1,20 = 96 € TTC, dont 16 € de TVA. Dans le calculateur, modifier le champ HT ou le champ TTC lance l’autre sens.' },
    { q: 'La TVA à 20 % représente-t-elle 20 % du TTC ?', a: 'Elle se calcule sur le HT. Rapportée au TTC, elle vaut 20 ÷ 120, soit un sixième. Sur 120 € TTC, la TVA est 20 € et le HT est 100 €.' },
    { q: 'Où voir le détail des taux 20 %, 10 % et 5,5 % ?', a: 'Chaque taux a ses exemples : [[/calcul-tva-20|TVA 20 %]], [[/calcul-tva-10|TVA 10 %]] et [[/calcul-tva-5-5|TVA 5,5 %]]. Le taux de 2,1 % se règle dans la liste du calculateur.' },
  ],
  related: ['calcul-tva-20', 'calcul-tva-10', 'calcul-tva-5-5', 'calcul-marge'],
}
