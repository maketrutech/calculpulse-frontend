export default {
  tool: 'Imc',
  title: 'Calcul IMC : indice de masse corporelle en ligne',
  description: 'Calculez votre IMC (indice de masse corporelle) à partir de votre poids et de votre taille. Interprétation selon l’OMS, formule, limites et poids correspondant.',
  h1: 'Calcul de l’IMC',
  lede: 'Entrez votre poids en kilos et votre taille en centimètres : l’IMC s’affiche avec sa catégorie selon l’Organisation mondiale de la santé, pour les adultes de 18 à 65 ans.',
  sections: [
    { h2: 'La formule de l’IMC', paragraphs: ['L’indice de masse corporelle se calcule en divisant le poids en kilogrammes par la taille en mètres au carré : IMC = poids ÷ taille². Pour 70 kg et 1,75 m : 70 ÷ (1,75 × 1,75) = 70 ÷ 3,0625 ≈ 22,9.', 'Le résultat s’exprime en kg/m². Il donne une estimation de la corpulence, pas une mesure de la masse grasse.'] },
    { h2: 'Interpréter le résultat', table: { caption: 'Classification de l’OMS pour les adultes', headers: ['IMC', 'Catégorie'], rows: [['Moins de 18,5', 'Insuffisance pondérale'], ['18,5 à 24,9', 'Corpulence normale'], ['25 à 29,9', 'Surpoids'], ['30 à 34,9', 'Obésité modérée'], ['35 à 39,9', 'Obésité sévère'], ['40 et plus', 'Obésité morbide']] }, paragraphs: ['Pour une taille donnée, la plage « normale » correspond à un poids compris entre 18,5 × taille² et 24,9 × taille². À 1,70 m, cela va d’environ 53,5 kg à 72 kg.'] },
    { h2: 'Les limites de l’IMC', list: ['Il ne distingue pas les muscles de la graisse : un sportif très musclé peut être classé en surpoids.', 'Il ne tient pas compte de la répartition des graisses. Le tour de taille complète utilement l’IMC : au-delà de 80 cm chez la femme et 94 cm chez l’homme, le risque cardiovasculaire augmente.', 'Il ne s’applique pas tel quel aux enfants et aux adolescents, pour qui on utilise des courbes de corpulence selon l’âge et le sexe, ni aux femmes enceintes.', 'Chez les personnes âgées, un IMC légèrement plus élevé est souvent jugé acceptable.'] },
    { h2: 'Un indicateur, pas un diagnostic', paragraphs: ['L’IMC est un repère statistique utilisé pour des populations. Il ne remplace pas l’avis d’un médecin, qui tiendra compte de vos antécédents, de votre alimentation, de votre activité physique et d’autres mesures. Si votre résultat vous inquiète, parlez-en à votre médecin traitant. Ce calculateur n’enregistre ni votre poids ni votre taille : le calcul se fait uniquement dans votre navigateur.', 'Votre poids est en livres ? Convertissez-le avec [[/convertir/livre-en-kg|livre en kg]] ; votre taille en pieds avec [[/convertir/pied-en-cm|pied en cm]].'] },
  ],
  faqs: [
    { q: 'Quel est l’IMC idéal ?', a: 'L’OMS considère comme normale une valeur entre 18,5 et 24,9 pour un adulte. Il n’existe pas d’IMC idéal unique.' },
    { q: 'L’IMC est-il le même pour les hommes et les femmes ?', a: 'La formule et les seuils de l’OMS sont identiques. À IMC égal, la composition corporelle diffère toutefois souvent.' },
    { q: 'Comment calculer l’IMC d’un enfant ?', a: 'La formule est la même, mais le résultat se lit sur les courbes de corpulence du carnet de santé, selon l’âge et le sexe.' },
  ],
  related: ['convertir', 'calcul-pourcentage', 'calcul-moyenne', 'racine-carree'],
}
