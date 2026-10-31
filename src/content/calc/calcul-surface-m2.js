export default {
  tool: 'Surface',
  title: 'Calcul surface m² : rectangle, triangle, cercle et trapèze',
  description: 'Calculez une surface en mètres carrés : pièce rectangulaire, triangle, disque ou trapèze. Formules, méthode pour une pièce en L et quantité de peinture ou de parquet.',
  h1: 'Calcul de surface en m²',
  lede: 'Choisissez la forme et saisissez les dimensions en mètres : la surface en m² s’affiche aussitôt. Pratique pour un sol, un mur, un terrain ou une commande de parquet.',
  sections: [
    { h2: 'Les formules de surface', table: { caption: 'Formules par forme', headers: ['Forme', 'Formule', 'Exemple'], rows: [['Rectangle', 'longueur × largeur', '5 × 3,6 = 18 m²'], ['Carré', 'côté × côté', '4 × 4 = 16 m²'], ['Triangle', 'base × hauteur ÷ 2', '6 × 2,5 ÷ 2 = 7,5 m²'], ['Disque', 'π × rayon²', 'π × 1,5² ≈ 7,07 m²'], ['Trapèze', '(grande base + petite base) × hauteur ÷ 2', '(5 + 3) × 4 ÷ 2 = 16 m²']] } },
    { h2: 'Mesurer une pièce', steps: ['Mesurez la longueur et la largeur au sol, de mur à mur, en mètres.', 'Pour une pièce en L, découpez-la en deux rectangles, calculez chaque surface et additionnez-les.', 'Retirez les zones non concernées (placard intégré, îlot fixe) si vous calculez un revêtement.', 'Convertissez les centimètres : 360 cm = 3,6 m. Une erreur fréquente est de multiplier des mètres par des centimètres.'] },
    { h2: 'Combien de matériau commander ?', paragraphs: ['Pour un parquet ou un carrelage, ajoutez 5 à 10 % de chutes (jusqu’à 15 % pour une pose en diagonale ou en chevron). Une pièce de 18 m² demande donc environ 19,8 m², soit 10 paquets si un paquet couvre 2 m².', 'Pour la peinture, calculez la surface des murs : périmètre × hauteur sous plafond, moins les portes (environ 1,6 m² chacune) et les fenêtres. Une pièce de 5 × 3,6 m avec 2,5 m de hauteur a 43 m² de murs bruts. Avec un rendement de 10 m² par litre et deux couches, comptez environ 8 litres.'] },
    { h2: 'Surface habitable et loi Carrez', paragraphs: ['La surface « loi Carrez » d’un lot de copropriété exclut les murs, cloisons, gaines, embrasures et les parties de moins de 1,80 m de hauteur. Elle est souvent inférieure à la surface au sol mesurée pièce par pièce. Pour une vente, ce mesurage est obligatoire et une erreur de plus de 5 % ouvre droit à une baisse de prix ; faites-le réaliser par un professionnel.'] },
    { h2: 'Unités de surface', paragraphs: ['1 m² = 10 000 cm². 1 are = 100 m². 1 hectare = 10 000 m², voir [[/convertir/hectare-en-m2|hectare en m²]]. Pour les surfaces anglo-saxonnes, une acre vaut environ 4 047 m², voir [[/convertir/acre-en-m2|acre en m²]].'] },
  ],
  faqs: [
    { q: 'Comment calculer des m² à partir de cm ?', a: 'Convertissez d’abord en mètres (divisez par 100), puis multipliez. 420 cm × 310 cm = 4,2 × 3,1 = 13,02 m².' },
    { q: 'Comment calculer la surface d’un mur ?', a: 'Largeur × hauteur, moins les ouvertures. Un mur de 4 m sur 2,5 m avec une fenêtre de 1,2 × 1 m fait 10 − 1,2 = 8,8 m².' },
    { q: 'Mètres carrés et mètres cubes, quelle différence ?', a: 'Le m² mesure une surface (deux dimensions), le m³ un volume (trois dimensions) : surface × hauteur.' },
  ],
  related: ['convertir', 'racine-carree', 'produit-en-croix', 'calcul-pourcentage'],
}
