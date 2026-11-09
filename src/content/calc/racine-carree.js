export default {
  tool: 'RacineCarree',
  title: 'Racine carrée : calcul en ligne et forme simplifiée',
  description: 'Calculez la racine carrée d’un nombre : valeur décimale précise, forme simplifiée a√b et vérification. Carrés parfaits, méthode et exemples.',
  h1: 'Calcul de racine carrée',
  lede: 'Entrez un nombre positif : sa racine carrée décimale s’affiche, ainsi que sa forme simplifiée quand c’est un entier (√72 = 6√2).',
  sections: [
    { h2: 'Définition', paragraphs: ['La racine carrée d’un nombre positif x est le nombre positif qui, multiplié par lui-même, donne x. √49 = 7 car 7 × 7 = 49. Elle répond à une question géométrique : quel est le côté d’un carré de surface x ? Une pièce carrée de 20 m² mesure √20 ≈ 4,47 m de côté.', 'Un nombre négatif n’a pas de racine carrée réelle, car un carré est toujours positif ou nul.'] },
    { h2: 'Simplifier une racine carrée', paragraphs: ['Pour simplifier √n, on cherche le plus grand carré parfait qui divise n. √72 = √(36 × 2) = √36 × √2 = 6√2. √50 = √(25 × 2) = 5√2. √45 = 3√5. Si aucun carré parfait autre que 1 ne divise n, la racine est déjà simplifiée, comme √30.'] },
    { h2: 'Carrés parfaits à connaître', table: { caption: 'Racines carrées des carrés parfaits', headers: ['n', '√n', 'n', '√n'], rows: [['1', '1', '121', '11'], ['4', '2', '144', '12'], ['9', '3', '169', '13'], ['16', '4', '196', '14'], ['25', '5', '225', '15'], ['36', '6', '256', '16'], ['49', '7', '400', '20'], ['64', '8', '625', '25'], ['81', '9', '900', '30'], ['100', '10', '10 000', '100']] } },
    { h2: 'Estimer une racine de tête', paragraphs: ['Encadrez le nombre entre deux carrés parfaits : 52 est entre 49 et 64, donc √52 est entre 7 et 8, plus proche de 7. Une meilleure approximation : 7 + (52 − 49) ÷ (2 × 7) ≈ 7,21 (valeur exacte 7,211). Cette méthode est celle de Héron d’Alexandrie, que les calculatrices appliquent en la répétant.'] },
    { h2: 'Usages pratiques', list: ['Théorème de Pythagore : la diagonale d’une pièce de 4 m × 3 m vaut √(16 + 9) = 5 m.', 'Diagonale d’écran : un écran de 16 sur 9 a une diagonale de √(16² + 9²) ≈ 18,36 unités, voir [[/convertir/55-pouces-en-cm|55 pouces en cm]].', 'Statistiques : l’[[/calcul-ecart-type|écart type]] est la racine carrée de la variance.'] },
  ],
  faqs: [
    { q: 'Quelle est la racine carrée de 2 ?', a: '√2 ≈ 1,414 213 562. C’est un nombre irrationnel : ses décimales ne s’arrêtent jamais et ne se répètent pas.' },
    { q: 'La racine carrée d’une somme est-elle la somme des racines ?', a: 'Non : √(9 + 16) = 5, alors que √9 + √16 = 7. En revanche, √(a × b) = √a × √b.' },
    { q: 'Comment calculer une racine carrée sans calculatrice ?', a: 'Encadrez entre deux carrés parfaits puis affinez avec la méthode de Héron : x ← (x + n ÷ x) ÷ 2.' },
  ],
  related: ['calcul-ecart-type', 'calcul-surface-m2', 'produit-en-croix', 'calcul-moyenne'],
}
