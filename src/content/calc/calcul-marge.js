export default {
  tool: 'Marge',
  title: 'Calcul de marge : taux de marge, taux de marque et coefficient',
  description: 'Calculez la marge commerciale, le taux de marge, le taux de marque et le coefficient multiplicateur à partir d’un prix d’achat et d’un prix de vente HT.',
  h1: 'Calcul de marge commerciale',
  lede: 'Entrez un prix d’achat et un prix de vente hors taxes : la marge en euros, le taux de marge, le taux de marque et le coefficient s’affichent. Vous pouvez aussi partir d’un taux pour fixer un prix.',
  sections: [
    { h2: 'Marge, taux de marge et taux de marque', paragraphs: ['La marge commerciale est la différence entre le prix de vente HT et le coût d’achat HT. Un article acheté 40 € et vendu 60 € HT dégage 20 € de marge.', 'Le taux de marge rapporte cette marge au coût d’achat : 20 ÷ 40 × 100 = 50 %. Le taux de marque la rapporte au prix de vente : 20 ÷ 60 × 100 = 33,33 %. Les deux décrivent la même vente, mais avec une base différente ; le taux de marque est donc toujours plus faible que le taux de marge.'] },
    { h2: 'Le coefficient multiplicateur', paragraphs: ['Le coefficient est le rapport entre prix de vente et coût d’achat : 60 ÷ 40 = 1,5. Les commerçants l’utilisent pour étiqueter vite : un coefficient de 2 double le coût, soit un taux de marge de 100 % et un taux de marque de 50 %. Si le coefficient est appliqué au prix TTC, pensez à inclure la TVA : un coefficient HT de 2 avec 20 % de TVA donne un coefficient TTC de 2,4.'] },
    { h2: 'Fixer un prix de vente', list: ['À partir d’un taux de marge : prix = coût × (1 + taux ÷ 100). Coût 25 €, marge 60 % → 40 € HT.', 'À partir d’un taux de marque : prix = coût ÷ (1 − taux ÷ 100). Coût 25 €, marque 40 % → 41,67 € HT.', 'Le prix TTC s’obtient ensuite avec le [[/calcul-tva|calcul de TVA]].'] },
    { h2: 'Correspondance entre les taux', table: { caption: 'Taux de marge, taux de marque et coefficient', headers: ['Coefficient', 'Taux de marge', 'Taux de marque'], rows: [['1,2', '20 %', '16,67 %'], ['1,25', '25 %', '20 %'], ['1,5', '50 %', '33,33 %'], ['1,8', '80 %', '44,44 %'], ['2', '100 %', '50 %'], ['2,5', '150 %', '60 %'], ['3', '200 %', '66,67 %']] } },
    { h2: 'Marge brute et rentabilité', paragraphs: ['La marge commerciale ne mesure pas le bénéfice : il faut encore payer le loyer, les salaires, la publicité, les frais bancaires et les impôts. Une activité peut afficher 50 % de taux de marque et perdre de l’argent si ses volumes sont trop faibles. Pour mesurer l’effet d’une promotion sur votre marge, combinez ce calcul avec celui de la [[/calcul-remise|remise]].'] },
  ],
  faqs: [
    { q: 'Comment passer du taux de marge au taux de marque ?', a: 'Taux de marque = taux de marge ÷ (1 + taux de marge). Avec 50 % de marge : 0,5 ÷ 1,5 = 33,33 % de marque.' },
    { q: 'La marge se calcule-t-elle en HT ou en TTC ?', a: 'En HT. La TVA n’appartient pas à l’entreprise ; l’inclure gonflerait artificiellement la marge.' },
    { q: 'Qu’est-ce qu’un bon taux de marge ?', a: 'Il varie beaucoup selon le secteur : une grande surface alimentaire vit avec un taux de marque de 20 à 30 %, quand la bijouterie ou l’optique dépassent souvent 60 %.' },
  ],
  related: ['calcul-tva', 'calcul-remise', 'calcul-augmentation', 'calcul-pourcentage'],
}
