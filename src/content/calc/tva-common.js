export const tvaTable = {
  caption: 'Taux de TVA en France métropolitaine',
  headers: ['Taux', 'Coefficient', 'Principaux cas'],
  rows: [
    ['20 %', '1,2', 'Taux normal : la plupart des biens et services'],
    ['10 %', '1,1', 'Restauration, travaux de rénovation, transports de voyageurs'],
    ['5,5 %', '1,055', 'Produits alimentaires, énergie, travaux de rénovation énergétique, livres'],
    ['2,1 %', '1,021', 'Médicaments remboursables, presse, 140 premières représentations d’un spectacle'],
  ],
}
export const tvaFaq = [
  { q: 'Comment passer du TTC au HT ?', a: 'Divisez le TTC par (1 + taux). Avec 20 % : 150 € TTC ÷ 1,2 = 125 € HT. Retirer 20 % du TTC donnerait 120 €, ce qui est faux.' },
  { q: 'Où trouver le montant de TVA sur une facture ?', a: 'Une facture doit indiquer, pour chaque taux, le total HT, le taux appliqué et le montant de TVA, puis le total TTC.' },
]
function money(n) {
  const [i, d] = n.toFixed(2).split('.')
  return `${i.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')},${d} €`
}
export function rateTable(rate) {
  const k = 1 + rate / 100
  return {
    caption: `Exemples de montants à ${String(rate).replace('.', ',')} %`,
    headers: ['HT', 'TVA', 'TTC'],
    rows: [10, 50, 100, 250, 1000, 5000].map((ht) => [money(ht), money(ht * rate / 100), money(ht * k)]),
  }
}
