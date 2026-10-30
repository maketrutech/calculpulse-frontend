export default {
  tool: 'NombreEnLettres',
  title: 'Nombre en lettres : écrire un nombre ou un chèque en toutes lettres',
  description: 'Écrivez un nombre en toutes lettres en français, selon l’orthographe traditionnelle ou rectifiée de 1990, et un montant en euros pour un chèque.',
  h1: 'Écrire un nombre en lettres',
  lede: 'Saisissez un nombre ou un montant : son écriture en toutes lettres s’affiche, en orthographe traditionnelle ou rectifiée, avec une version « euros et centimes » pour vos chèques.',
  sections: [
    { h2: 'Les règles des traits d’union', paragraphs: ['En orthographe traditionnelle, on met un trait d’union entre les dizaines et les unités inférieures à cent, sauf quand ils sont reliés par « et » : dix-sept, quarante-deux, vingt et un, soixante et onze. Les mots au-delà de cent ne prennent pas de trait d’union : cent deux, mille trois cent vingt-cinq.', 'Les rectifications orthographiques de 1990, recommandées par l’Académie française et en usage à l’école, simplifient la règle : tous les nombres composés sont reliés par des traits d’union, y compris autour de « et », de cent et de mille. On écrit donc vingt-et-un, deux-cent-trois, mille-trois-cent-vingt-cinq.'] },
    { h2: 'Accord de vingt et de cent', list: ['Vingt et cent prennent un « s » quand ils sont multipliés et terminent le nombre : quatre-vingts, deux cents, trois cents euros.', 'Ils restent invariables s’ils sont suivis d’un autre nombre : quatre-vingt-trois, deux cent cinq.', 'Ils restent invariables quand le nombre est ordinal : la page quatre-vingt, l’an deux cent.', 'Mille est toujours invariable : deux mille, trois mille euros.', 'Million et milliard sont des noms et s’accordent : deux millions, trois milliards.'] },
    { h2: 'Remplir un chèque', paragraphs: ['Sur un chèque, le montant en lettres fait foi en cas de différence avec le montant en chiffres. Écrivez-le sans laisser d’espace, et tirez un trait après le dernier mot pour éviter tout ajout. Exemple : 1 280,50 € s’écrit « mille deux cent quatre-vingts euros et cinquante centimes ». Après million ou milliard, on écrit « d’euros » : un million d’euros.'], table: { caption: 'Exemples de montants en lettres', headers: ['Chiffres', 'Lettres (traditionnelle)'], rows: [['21', 'vingt et un'], ['71', 'soixante et onze'], ['80', 'quatre-vingts'], ['91', 'quatre-vingt-onze'], ['200', 'deux cents'], ['250', 'deux cent cinquante'], ['1 000', 'mille'], ['2 000 000', 'deux millions']] } },
    { h2: 'Belgique et Suisse', paragraphs: ['En Belgique et en Suisse romande, on dit septante (70) et nonante (90) ; en Suisse, on entend aussi huitante (80) dans certains cantons. Le calculateur utilise l’usage de France. Pour une autre notation des nombres, voir les [[/chiffres-romains|chiffres romains]].'] },
  ],
  faqs: [
    { q: 'Faut-il écrire vingt-et-un ou vingt et un ?', a: 'Les deux sont corrects. « Vingt et un » suit l’orthographe traditionnelle, « vingt-et-un » l’orthographe rectifiée de 1990.' },
    { q: 'Comment écrire 1 000 en lettres sur un chèque ?', a: '« Mille euros », sans « un » devant et sans « s ».' },
    { q: 'Jusqu’à quel nombre fonctionne l’outil ?', a: 'Jusqu’à 999 999 999 999 (neuf cent quatre-vingt-dix-neuf milliards…), avec deux décimales pour les montants.' },
  ],
  related: ['chiffres-romains', 'calcul-tva', 'calcul-pourcentage', 'calcul-moyenne'],
}
