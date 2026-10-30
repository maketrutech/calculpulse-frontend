export default {
  tool: 'Pourcentage',
  title: 'Calcul pourcentage : calculer X % d’un nombre en ligne',
  description: 'Calculez un pourcentage en un instant : X % d’un nombre, la part qu’un nombre représente en %, ou la valeur totale. Formules et exemples clairs.',
  h1: 'Calcul de pourcentage',
  lede: 'Trois calculs en un : combien font X % d’un nombre, quel pourcentage représente une part, et quel était le total. Le résultat s’affiche pendant la saisie.',
  sections: [
    { h2: 'Comment calculer un pourcentage', paragraphs: ['Un pourcentage est une fraction dont le dénominateur vaut 100. « 15 % » signifie donc 15 parts sur 100, soit 0,15. Pour calculer X % d’un nombre, on multiplie ce nombre par X puis on divise par 100. Exemple : 15 % de 80 € = 80 × 15 ÷ 100 = 12 €.', 'Pour savoir quel pourcentage une valeur représente dans un total, on fait l’inverse : on divise la part par le total, puis on multiplie par 100. Si 18 élèves sur 24 ont réussi un contrôle, le taux de réussite vaut 18 ÷ 24 × 100 = 75 %.'] },
    { h2: 'Les trois formules à retenir', list: ['Valeur = total × taux ÷ 100 (ex. : 20 % de 250 = 50).', 'Taux = part ÷ total × 100 (ex. : 50 sur 250 = 20 %).', 'Total = part × 100 ÷ taux (ex. : 50 représente 20 % de 250).'], paragraphs: ['Ces trois formules sont la même relation écrite de trois façons. C’est un [[/produit-en-croix|produit en croix]] : le taux est à 100 ce que la part est au total.'] },
    { h2: 'Astuces de calcul mental', paragraphs: ['10 % d’un nombre s’obtient en décalant la virgule d’un rang vers la gauche : 10 % de 64 = 6,4. On en déduit 5 % (la moitié, 3,2), 20 % (le double, 12,8) et 15 % (10 % + 5 % = 9,6). Pour 25 %, on divise par 4 ; pour 50 %, par 2 ; pour 1 %, on décale la virgule de deux rangs.', 'Un pourcentage se lit aussi dans les deux sens : 8 % de 50 est égal à 50 % de 8, soit 4. Ce retournement simplifie bien des calculs de tête.'] },
    { h2: 'Exemples courants', table: { caption: 'Pourcentages fréquents d’un montant de 200', headers: ['Pourcentage', 'Calcul', 'Résultat'], rows: [['1 %', '200 × 0,01', '2'], ['5 %', '200 × 0,05', '10'], ['12,5 %', '200 × 0,125', '25'], ['20 %', '200 × 0,2', '40'], ['33 %', '200 × 0,33', '66'], ['75 %', '200 × 0,75', '150']] } },
    { h2: 'Pourcentage et points de pourcentage', paragraphs: ['Quand un taux passe de 4 % à 5 %, il gagne 1 point de pourcentage, mais il augmente de 25 % en valeur relative. Les médias confondent souvent les deux. Pour mesurer une hausse ou une baisse en pourcentage, utilisez le calcul du [[/taux-d-evolution|taux d’évolution]] ; pour ajouter un pourcentage à un prix, celui de l’[[/calcul-augmentation|augmentation]].'] },
  ],
  faqs: [
    { q: 'Comment calculer 20 % d’un nombre ?', a: 'Multipliez le nombre par 0,2, ou divisez-le par 5. 20 % de 45 = 9.' },
    { q: 'Comment calculer un pourcentage entre deux nombres ?', a: 'Divisez la part par le total et multipliez par 100 : 30 sur 120 = 30 ÷ 120 × 100 = 25 %.' },
    { q: 'Un pourcentage peut-il dépasser 100 % ?', a: 'Oui, quand la part est plus grande que la référence : 150 représente 150 % de 100. Une hausse peut aussi dépasser 100 % : un prix qui triple augmente de 200 %.' },
    { q: 'Les calculs sont-ils envoyés quelque part ?', a: 'Non. Tous les calculs de CalculPulse sont faits dans votre navigateur ; les valeurs saisies ne quittent pas votre appareil.' },
  ],
  related: ['calcul-augmentation', 'taux-d-evolution', 'calcul-remise', 'produit-en-croix'],
}
