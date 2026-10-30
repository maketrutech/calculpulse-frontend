import { useState } from 'react'
import * as c from '../lib/calc.js'
import { fmt, money, parseNum, pct } from '../lib/num.js'
import { decimalToWords, euroToWords } from '../lib/words.fr.js'
import { Block, NumField, Result, Seg, Select, ok, useNum } from './ui.jsx'

const NA = '—'

export function Pourcentage() {
  const p = useNum(20)
  const x = useNum(150)
  const a = useNum(30)
  const b = useNum(120)
  const r1 = ok(p.value, x.value) ? c.percentOf(p.value, x.value) : NaN
  const r2 = ok(a.value, b.value) ? c.whatPercent(a.value, b.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="Calculer un pourcentage d’un nombre">
        <div className="calc-row">
          <NumField label="Pourcentage" state={p} suffix="%" />
          <NumField label="de la valeur" state={x} />
        </div>
        <Result label={`${p.raw || '…'} % de ${x.raw || '…'} =`} value={fmt(r1, 4)} detail={ok(r1) ? `Calcul : ${x.raw} × ${p.raw} ÷ 100` : 'Saisissez deux nombres.'} />
      </Block>
      <Block title="Quel pourcentage représente une valeur ?">
        <div className="calc-row">
          <NumField label="Valeur" state={a} />
          <NumField label="sur un total de" state={b} />
        </div>
        <Result label={`${a.raw || '…'} sur ${b.raw || '…'} représente`} value={pct(r2, 4)} detail={ok(r2) ? `Calcul : ${a.raw} ÷ ${b.raw} × 100` : 'Le total doit être différent de zéro.'} />
      </Block>
    </div>
  )
}

export function Augmentation() {
  const [mode, setMode] = useState('hausse')
  const x = useNum(1500)
  const p = useNum(5)
  const sign = mode === 'hausse' ? 1 : -1
  const final = ok(x.value, p.value) ? c.applyRate(x.value, sign * p.value) : NaN
  const from = useNum(1800)
  const to = useNum(1950)
  const ev = ok(from.value, to.value) ? c.evolutionRate(from.value, to.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="Appliquer un pourcentage">
        <Seg label="Sens" value={mode} onChange={setMode} options={[{ value: 'hausse', label: 'Augmenter' }, { value: 'baisse', label: 'Diminuer' }]} />
        <div className="calc-row">
          <NumField label="Valeur de départ" state={x} />
          <NumField label={mode === 'hausse' ? 'Augmentation' : 'Baisse'} state={p} suffix="%" />
        </div>
        <Result label="Valeur finale" value={fmt(final, 2)} detail={ok(final) ? `Écart : ${sign > 0 ? '+' : '−'}${fmt(Math.abs(final - x.value), 2)} · coefficient ${fmt(c.coefficient(sign * p.value), 4)}` : 'Saisissez deux nombres.'} />
      </Block>
      <Block title="Pourcentage d’augmentation entre deux valeurs">
        <div className="calc-row">
          <NumField label="Ancienne valeur" state={from} />
          <NumField label="Nouvelle valeur" state={to} />
        </div>
        <Result label={ev >= 0 ? 'Augmentation' : 'Baisse'} value={ok(ev) ? `${ev > 0 ? '+' : ''}${pct(ev)}` : NA} detail={ok(ev) ? `(${to.raw} − ${from.raw}) ÷ ${from.raw} × 100` : 'L’ancienne valeur doit être différente de zéro.'} />
      </Block>
    </div>
  )
}

export function Evolution() {
  const from = useNum(250)
  const to = useNum(200)
  const ev = ok(from.value, to.value) ? c.evolutionRate(from.value, to.value) : NaN
  const r1 = useNum(10)
  const r2 = useNum(-5)
  const r3 = useNum('')
  const rates = [r1.value, r2.value, r3.raw.trim() ? r3.value : 0]
  const chained = ok(...rates) ? c.chainRates(rates) : NaN
  return (
    <div className="calc-stack">
      <Block title="Taux d’évolution entre deux valeurs">
        <div className="calc-row">
          <NumField label="Valeur de départ (V₀)" state={from} />
          <NumField label="Valeur d’arrivée (V₁)" state={to} />
        </div>
        <Result label="Taux d’évolution" value={ok(ev) ? `${ev > 0 ? '+' : ''}${pct(ev)}` : NA} detail={ok(ev) ? `Coefficient multiplicateur : ${fmt(to.value / from.value, 4)} · évolution réciproque : ${pct(c.reciprocalRate(ev))}` : 'V₀ doit être différente de zéro.'} />
      </Block>
      <Block title="Évolutions successives">
        <div className="calc-row three">
          <NumField label="1re évolution" state={r1} suffix="%" />
          <NumField label="2e évolution" state={r2} suffix="%" />
          <NumField label="3e (facultatif)" state={r3} suffix="%" />
        </div>
        <Result label="Évolution globale" value={ok(chained) ? `${chained > 0 ? '+' : ''}${pct(chained)}` : NA} detail={ok(chained) ? `Coefficient global : ${fmt(1 + chained / 100, 4)} (et non la somme des taux)` : 'Les taux négatifs indiquent une baisse.'} />
      </Block>
    </div>
  )
}

const RATES = [
  { value: '20', label: '20 % (taux normal)' },
  { value: '10', label: '10 % (taux intermédiaire)' },
  { value: '5.5', label: '5,5 % (taux réduit)' },
  { value: '2.1', label: '2,1 % (taux particulier)' },
  { value: '8.5', label: '8,5 % (DOM)' },
  { value: 'autre', label: 'Autre taux' },
]

export function Tva({ rate: fixed = '20' }) {
  const [from, setFrom] = useState('ht')
  const amount = useNum(100)
  const [rate, setRate] = useState(fixed)
  const custom = useNum(fixed)
  const r = rate === 'autre' ? custom.value : Number(rate)
  const res = ok(amount.value, r) ? c.tva(amount.value, r, from) : null
  return (
    <div className="calc-stack">
      <Block>
        <Seg label="Montant saisi" value={from} onChange={setFrom} options={[{ value: 'ht', label: 'HT → TTC' }, { value: 'ttc', label: 'TTC → HT' }]} />
        <div className="calc-row">
          <NumField label={from === 'ht' ? 'Montant hors taxes (HT)' : 'Montant toutes taxes comprises (TTC)'} state={amount} suffix="€" />
          <Select label="Taux de TVA" value={rate} onChange={setRate} options={RATES} />
        </div>
        {rate === 'autre' ? <div className="calc-row"><NumField label="Taux personnalisé" state={custom} suffix="%" /></div> : null}
        <div className="result-grid">
          <Result label="Montant HT" value={money(res?.ht)} big={from === 'ttc'} />
          <Result label={`TVA ${ok(r) ? fmt(r) : ''} %`} value={money(res?.tva)} big={false} />
          <Result label="Montant TTC" value={money(res?.ttc)} big={from === 'ht'} />
        </div>
        <p className="formula">{from === 'ht' ? `TTC = HT × ${ok(r) ? fmt(1 + r / 100, 4) : '…'}` : `HT = TTC ÷ ${ok(r) ? fmt(1 + r / 100, 4) : '…'}`}</p>
      </Block>
    </div>
  )
}

export function ProduitEnCroix() {
  const a = useNum(4)
  const b = useNum(6)
  const cc = useNum(10)
  const x = ok(a.value, b.value, cc.value) ? c.crossProduct(a.value, b.value, cc.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="Trouver la quatrième valeur">
        <div className="cross">
          <NumField label="Valeur A" state={a} />
          <NumField label="correspond à B" state={b} />
          <NumField label="Valeur C" state={cc} />
          <div className="field">
            <span>correspond à X</span>
            <output className="cross-x" aria-live="polite">{fmt(x, 6)}</output>
          </div>
        </div>
        <p className="formula">X = B × C ÷ A = {b.raw || '…'} × {cc.raw || '…'} ÷ {a.raw || '…'} = {fmt(x, 6)}</p>
      </Block>
    </div>
  )
}

function parseList(text) {
  return text.split(/[\s;]+|(?<=\d),(?=\s)|\n/).map((t) => t.trim()).filter(Boolean).map(parseNum)
}

export function Moyenne() {
  const [text, setText] = useState('12 ; 15,5 ; 9 ; 14 ; 17')
  const values = parseList(text)
  const valid = values.filter(Number.isFinite)
  const bad = values.length - valid.length
  return (
    <div className="calc-stack">
      <Block>
        <label className="field" htmlFor="m-list">
          <span>Vos notes ou valeurs, séparées par un point-virgule ou un espace</span>
          <textarea id="m-list" className="grow" rows={3} value={text} onChange={(event) => setText(event.target.value)} aria-invalid={bad ? 'true' : undefined} />
        </label>
        <div className="result-grid">
          <Result label="Moyenne" value={fmt(c.mean(valid), 2)} />
          <Result label="Nombre de valeurs" value={String(valid.length)} big={false} />
          <Result label="Somme" value={fmt(valid.reduce((s, v) => s + v, 0), 4)} big={false} />
        </div>
        <p className="formula">{bad ? `${bad} saisie(s) ignorée(s) car non numérique(s).` : 'Moyenne = somme des valeurs ÷ nombre de valeurs'}</p>
      </Block>
    </div>
  )
}

const DEFAULT_ROWS = [['Mathématiques', '14', '4'], ['Français', '11,5', '3'], ['Histoire-géo', '13', '2'], ['Anglais', '16', '2'], ['EPS', '17', '1']]

export function MoyennePonderee() {
  const [rows, setRows] = useState(DEFAULT_ROWS)
  const set = (i, k, v) => setRows((cur) => cur.map((r, j) => (j === i ? r.map((x, n) => (n === k ? v : x)) : r)))
  const vals = []
  const ws = []
  rows.forEach((r) => {
    const v = parseNum(r[1])
    const w = parseNum(r[2])
    if (Number.isFinite(v) && Number.isFinite(w) && w >= 0) {
      vals.push(v)
      ws.push(w)
    }
  })
  const res = c.weightedMean(vals, ws)
  return (
    <div className="calc-stack">
      <Block>
        <div className="wtable" role="group" aria-label="Notes et coefficients">
          <div className="wrow whead" aria-hidden="true"><span>Matière (facultatif)</span><span>Note</span><span>Coef.</span><span /></div>
          {rows.map((r, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="wrow" key={i}>
              <input aria-label={`Libellé ligne ${i + 1}`} value={r[0]} onChange={(e) => set(i, 0, e.target.value)} />
              <input aria-label={`Note ligne ${i + 1}`} inputMode="decimal" value={r[1]} onChange={(e) => set(i, 1, e.target.value)} aria-invalid={r[1] && !Number.isFinite(parseNum(r[1])) ? 'true' : undefined} />
              <input aria-label={`Coefficient ligne ${i + 1}`} inputMode="decimal" value={r[2]} onChange={(e) => set(i, 2, e.target.value)} aria-invalid={r[2] && !Number.isFinite(parseNum(r[2])) ? 'true' : undefined} />
              <button type="button" className="icon-x" aria-label={`Supprimer la ligne ${i + 1}`} onClick={() => setRows((cur) => cur.filter((_, j) => j !== i))} disabled={rows.length < 2}>×</button>
            </div>
          ))}
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn-ghost" onClick={() => setRows((cur) => [...cur, ['', '', '1']])}>+ Ajouter une ligne</button>
        </div>
        <div className="result-grid">
          <Result label="Moyenne pondérée" value={fmt(res, 2)} />
          <Result label="Total des coefficients" value={fmt(ws.reduce((s, w) => s + w, 0), 2)} big={false} />
          <Result label="Moyenne simple (sans coef.)" value={fmt(c.mean(vals), 2)} big={false} />
        </div>
      </Block>
    </div>
  )
}

export function NoteSur20() {
  const note = useNum(27)
  const bareme = useNum(40)
  const cible = useNum(20)
  const r = ok(note.value, bareme.value, cible.value) ? c.rescale(note.value, bareme.value, cible.value) : NaN
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row three">
          <NumField label="Note obtenue" state={note} />
          <NumField label="Sur (barème actuel)" state={bareme} />
          <NumField label="Ramener sur" state={cible} />
        </div>
        <Result label={`${note.raw || '…'}/${bareme.raw || '…'} équivaut à`} value={ok(r) ? `${fmt(r, 2)}/${fmt(cible.value)}` : NA} detail={ok(r) ? `Soit ${pct(c.whatPercent(note.value, bareme.value), 1)} de réussite` : 'Le barème doit être différent de zéro.'} />
      </Block>
    </div>
  )
}

export function ChiffresRomains() {
  const [arabic, setArabic] = useState('2026')
  const [roman, setRoman] = useState('MCMXCIV')
  const n = parseNum(arabic)
  const r = c.toRoman(n)
  const back = c.fromRoman(roman)
  return (
    <div className="calc-stack">
      <Block title="Nombre → chiffres romains">
        <label className="field" htmlFor="r-a"><span>Nombre entier de 1 à 3 999</span>
          <input id="r-a" inputMode="numeric" value={arabic} onChange={(e) => setArabic(e.target.value)} aria-invalid={arabic && !r ? 'true' : undefined} />
        </label>
        <Result label="En chiffres romains" value={r || NA} detail={r ? '' : 'Saisissez un entier entre 1 et 3 999.'} />
      </Block>
      <Block title="Chiffres romains → nombre">
        <label className="field" htmlFor="r-r"><span>Chiffres romains (I, V, X, L, C, D, M)</span>
          <input id="r-r" autoCapitalize="characters" spellCheck="false" value={roman} onChange={(e) => setRoman(e.target.value)} aria-invalid={roman && !back ? 'true' : undefined} />
        </label>
        <Result label="En chiffres arabes" value={back ? fmt(back, 0) : NA} detail={back ? '' : 'Écriture non valide (exemple : IIII s’écrit IV).'} />
      </Block>
    </div>
  )
}

export function Remise() {
  const price = useNum(79.9)
  const p = useNum(30)
  const p2 = useNum('')
  const res = ok(price.value, p.value) ? c.discount(price.value, p.value) : null
  const second = res && p2.raw.trim() && ok(p2.value) ? c.discount(res.final, p2.value) : null
  const before = useNum(120)
  const after = useNum(84)
  const rate = ok(before.value, after.value) ? -c.evolutionRate(before.value, after.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="Prix après remise">
        <div className="calc-row three">
          <NumField label="Prix initial" state={price} suffix="€" />
          <NumField label="Remise" state={p} suffix="%" />
          <NumField label="2e remise (facultatif)" state={p2} suffix="%" />
        </div>
        <div className="result-grid two">
          <Result label="Prix à payer" value={money(second ? second.final : res?.final)} />
          <Result label="Économie" value={money(res ? price.value - (second ? second.final : res.final) : NaN)} big={false} detail={second ? `Remise globale : ${pct(c.whatPercent(price.value - second.final, price.value))}` : ''} />
        </div>
      </Block>
      <Block title="Retrouver le pourcentage de remise">
        <div className="calc-row">
          <NumField label="Prix barré" state={before} suffix="€" />
          <NumField label="Prix soldé" state={after} suffix="€" />
        </div>
        <Result label="Pourcentage de réduction" value={pct(rate, 2)} detail={ok(rate) ? `Économie de ${money(before.value - after.value)}` : ''} />
      </Block>
    </div>
  )
}

export function Interets() {
  const cap = useNum(10000)
  const rate = useNum(3)
  const years = useNum(5)
  const months = useNum(0)
  const duration = ok(years.value) ? years.value + (ok(months.value) ? months.value / 12 : 0) : NaN
  const i = ok(cap.value, rate.value, duration) ? c.simpleInterest(cap.value, rate.value, duration) : NaN
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row">
          <NumField label="Capital" state={cap} suffix="€" />
          <NumField label="Taux annuel" state={rate} suffix="%" />
        </div>
        <div className="calc-row">
          <NumField label="Durée (années)" state={years} />
          <NumField label="+ mois" state={months} />
        </div>
        <div className="result-grid two">
          <Result label="Intérêts simples" value={money(i)} />
          <Result label="Capital final" value={money(cap.value + i)} big={false} detail={ok(i) ? `Soit ${money(i / (duration || 1))} par an` : ''} />
        </div>
        <p className="formula">Intérêts = capital × taux × durée ÷ 100</p>
      </Block>
    </div>
  )
}

export function InteretsComposes() {
  const cap = useNum(5000)
  const rate = useNum(4)
  const years = useNum(10)
  const monthly = useNum(100)
  const [freq, setFreq] = useState('annuelle')
  const res = ok(cap.value, rate.value, years.value) && years.value > 0 && years.value <= 100
    ? c.compound({ capital: cap.value, rate: rate.value, years: years.value, monthly: ok(monthly.value) ? monthly.value : 0, freq })
    : null
  const shown = res ? res.yearly.filter((y, idx, arr) => arr.length <= 10 || y.year % Math.ceil(arr.length / 10) === 0 || idx === arr.length - 1) : []
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row">
          <NumField label="Capital de départ" state={cap} suffix="€" />
          <NumField label="Versement mensuel" state={monthly} suffix="€" />
        </div>
        <div className="calc-row three">
          <NumField label="Taux annuel" state={rate} suffix="%" />
          <NumField label="Durée (années)" state={years} />
          <Select label="Capitalisation" value={freq} onChange={setFreq} options={[{ value: 'annuelle', label: 'Annuelle' }, { value: 'mensuelle', label: 'Mensuelle' }]} />
        </div>
        <div className="result-grid">
          <Result label="Capital final" value={money(res?.final)} />
          <Result label="Total versé" value={money(res?.deposits)} big={false} />
          <Result label="Intérêts gagnés" value={money(res?.interest)} big={false} />
        </div>
        <div className="table-wrap fixed-rows">
          <table>
            <caption>Évolution année par année</caption>
            <thead><tr><th scope="col">Année</th><th scope="col">Versé</th><th scope="col">Capital</th></tr></thead>
            <tbody>
              {shown.map((y) => <tr key={y.year}><td>{y.year}</td><td>{money(y.deposits)}</td><td>{money(y.balance)}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Block>
    </div>
  )
}

export function Imc() {
  const kg = useNum(70)
  const cm = useNum(175)
  const v = ok(kg.value, cm.value) && cm.value > 50 ? c.bmi(kg.value, cm.value) : NaN
  const m = cm.value / 100
  const pos = ok(v) ? Math.max(0, Math.min(100, ((v - 15) / 25) * 100)) : 0
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row">
          <NumField label="Poids" state={kg} suffix="kg" />
          <NumField label="Taille" state={cm} suffix="cm" />
        </div>
        <Result label="Votre IMC" value={fmt(v, 1)} detail={ok(v) ? `${c.bmiClass(v)} · poids « normal » pour cette taille : ${fmt(18.5 * m * m, 1)} à ${fmt(24.9 * m * m, 1)} kg` : 'Taille en centimètres, par exemple 175.'} />
        <div className="gauge" aria-hidden="true">
          <span className="g1" /><span className="g2" /><span className="g3" /><span className="g4" />
          <i style={{ left: `${pos}%`, opacity: ok(v) ? 1 : 0 }} />
        </div>
        <div className="gauge-legend" aria-hidden="true"><span>15</span><span>18,5</span><span>25</span><span>30</span><span>40</span></div>
      </Block>
    </div>
  )
}

export function Marge() {
  const cost = useNum(50)
  const price = useNum(80)
  const r = ok(cost.value, price.value) ? c.margin(cost.value, price.value) : null
  const cost2 = useNum(60)
  const rate = useNum(25)
  const [kind, setKind] = useState('marque')
  const pv = ok(cost2.value, rate.value) ? (kind === 'marque' ? c.priceFromMarginRate(cost2.value, rate.value) : c.priceFromMarkup(cost2.value, rate.value)) : NaN
  return (
    <div className="calc-stack">
      <Block title="Marge à partir du prix d’achat et du prix de vente (HT)">
        <div className="calc-row">
          <NumField label="Prix d’achat HT" state={cost} suffix="€" />
          <NumField label="Prix de vente HT" state={price} suffix="€" />
        </div>
        <div className="result-grid four">
          <Result label="Marge" value={money(r?.margin)} />
          <Result label="Taux de marge" value={pct(r?.markupRate)} big={false} />
          <Result label="Taux de marque" value={pct(r?.marginRate)} big={false} />
          <Result label="Coefficient" value={fmt(r?.coef, 3)} big={false} />
        </div>
      </Block>
      <Block title="Prix de vente à partir d’un taux visé">
        <Seg label="Type de taux" value={kind} onChange={setKind} options={[{ value: 'marque', label: 'Taux de marque' }, { value: 'marge', label: 'Taux de marge' }]} />
        <div className="calc-row">
          <NumField label="Prix d’achat HT" state={cost2} suffix="€" />
          <NumField label={kind === 'marque' ? 'Taux de marque visé' : 'Taux de marge visé'} state={rate} suffix="%" />
        </div>
        <Result label="Prix de vente HT" value={money(pv)} detail={ok(pv) ? `Marge de ${money(pv - cost2.value)}` : 'Un taux de marque doit rester sous 100 %.'} />
      </Block>
    </div>
  )
}

export function EcartType() {
  const [text, setText] = useState('2 ; 4 ; 4 ; 4 ; 5 ; 5 ; 7 ; 9')
  const [sample, setSample] = useState('pop')
  const values = parseList(text).filter(Number.isFinite)
  const s = sample === 'ech'
  return (
    <div className="calc-stack">
      <Block>
        <label className="field" htmlFor="s-list">
          <span>Série de valeurs (séparées par un point-virgule ou un espace)</span>
          <textarea id="s-list" className="grow" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <Seg label="Type de série" value={sample} onChange={setSample} options={[{ value: 'pop', label: 'Population (÷ n)' }, { value: 'ech', label: 'Échantillon (÷ n − 1)' }]} />
        <div className="result-grid four">
          <Result label="Écart type" value={fmt(c.stdDev(values, s), 4)} />
          <Result label="Variance" value={fmt(c.variance(values, s), 4)} big={false} />
          <Result label="Moyenne" value={fmt(c.mean(values), 4)} big={false} />
          <Result label="Médiane" value={fmt(c.median(values), 4)} big={false} />
        </div>
        <p className="formula">n = {values.length} · min = {values.length ? fmt(Math.min(...values), 4) : NA} · max = {values.length ? fmt(Math.max(...values), 4) : NA} · étendue = {values.length ? fmt(Math.max(...values) - Math.min(...values), 4) : NA}</p>
      </Block>
    </div>
  )
}

export function RacineCarree() {
  const n = useNum(72)
  const [rootN, setRootN] = useState('2')
  const k = Number(rootN)
  const v = n.value
  const r = ok(v) ? (k === 2 ? (v >= 0 ? Math.sqrt(v) : NaN) : Math.cbrt(v)) : NaN
  const simp = k === 2 && Number.isInteger(v) && v >= 0 ? c.simplifySqrt(v) : null
  let exact = ''
  if (simp) {
    if (simp.inside === 1) exact = `√${v} = ${simp.outside} (carré parfait)`
    else if (simp.outside > 1) exact = `√${v} = ${simp.outside}√${simp.inside}`
    else exact = `√${v} ne se simplifie pas`
  }
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row">
          <NumField label="Nombre" state={n} />
          <Select label="Racine" value={rootN} onChange={setRootN} options={[{ value: '2', label: 'Carrée (√)' }, { value: '3', label: 'Cubique (∛)' }]} />
        </div>
        <Result label={k === 2 ? `√${n.raw || '…'} =` : `∛${n.raw || '…'} =`} value={fmt(r, 8)} detail={ok(r) ? exact || `Vérification : ${fmt(r, 8)}${k === 2 ? '²' : '³'} ≈ ${fmt(r ** k, 6)}` : 'La racine carrée d’un nombre négatif n’est pas un nombre réel.'} />
      </Block>
    </div>
  )
}

const SHAPES = [
  { value: 'rectangle', label: 'Rectangle', f: ['Longueur', 'Largeur'] },
  { value: 'carre', label: 'Carré', f: ['Côté'] },
  { value: 'triangle', label: 'Triangle', f: ['Base', 'Hauteur'] },
  { value: 'cercle', label: 'Disque', f: ['Rayon'] },
  { value: 'trapeze', label: 'Trapèze', f: ['Grande base', 'Petite base', 'Hauteur'] },
]

export function Surface() {
  const [shape, setShape] = useState('rectangle')
  const a = useNum(4,)
  const b = useNum(3,)
  const h = useNum(2)
  const def = SHAPES.find((s) => s.value === shape)
  const states = [a, b, h]
  const vals = def.f.map((_, i) => states[i].value)
  const res = ok(...vals) ? c.area(shape, ...vals) : NaN
  return (
    <div className="calc-stack">
      <Block>
        <Select label="Forme" value={shape} onChange={setShape} options={SHAPES} />
        <div className="calc-row three">
          {def.f.map((label, i) => <NumField key={label} label={label} state={states[i]} suffix="m" />)}
        </div>
        <Result label="Surface" value={ok(res) ? `${fmt(res, 3)} m²` : NA} detail={ok(res) ? `Soit ${fmt(res * 10000, 0)} cm² · ${fmt(res / 10000, 6)} ha` : 'Saisissez les dimensions en mètres.'} />
      </Block>
    </div>
  )
}

export function NombreEnLettres() {
  const [raw, setRaw] = useState('1 980,50')
  const [mode, setMode] = useState('nombre')
  const [rect, setRect] = useState('trad')
  const opts = { rectified: rect === '1990' }
  const value = parseNum(raw)
  const out = mode === 'euro' ? euroToWords(value, opts) : decimalToWords(String(raw).replace(/[\s\u00a0\u202f]/g, ''), opts)
  return (
    <div className="calc-stack">
      <Block>
        <label className="field" htmlFor="w-n"><span>Nombre ou montant (jusqu’à 999 milliards)</span>
          <input id="w-n" inputMode="decimal" value={raw} onChange={(e) => setRaw(e.target.value)} aria-invalid={raw && !out ? 'true' : undefined} />
        </label>
        <div className="calc-row">
          <Seg label="Format" value={mode} onChange={setMode} options={[{ value: 'nombre', label: 'Nombre' }, { value: 'euro', label: 'Montant en euros' }]} />
          <Seg label="Orthographe" value={rect} onChange={setRect} options={[{ value: 'trad', label: 'Traditionnelle' }, { value: '1990', label: 'Rectifiée 1990' }]} />
        </div>
        <Result label="En toutes lettres" value={out || NA} detail={out ? '' : 'Saisissez un nombre positif, par exemple 1250,50.'} />
      </Block>
    </div>
  )
}

export const TOOLS = {
  Pourcentage, Augmentation, Evolution, Tva, ProduitEnCroix, Moyenne, MoyennePonderee, NoteSur20, ChiffresRomains, Remise, Interets, InteretsComposes, Imc, Marge, EcartType, RacineCarree, Surface, NombreEnLettres,
}
