// Fonctions de calcul pures, testées dans calc.test.js.

export const percentOf = (p, x) => (x * p) / 100
export const whatPercent = (part, total) => (total === 0 ? NaN : (part / total) * 100)
export const evolutionRate = (from, to) => (from === 0 ? NaN : ((to - from) / Math.abs(from)) * 100)
export const applyRate = (x, p) => x * (1 + p / 100)
export const beforeRate = (final, p) => (p === -100 ? NaN : final / (1 + p / 100))
export const coefficient = (p) => 1 + p / 100
export const reciprocalRate = (p) => (p === -100 ? NaN : (1 / (1 + p / 100) - 1) * 100)
export const chainRates = (rates) => (rates.reduce((c, p) => c * (1 + p / 100), 1) - 1) * 100

export function tva(amount, rate, from = 'ht') {
  if (from === 'ht') {
    const tax = (amount * rate) / 100
    return { ht: amount, tva: tax, ttc: amount + tax }
  }
  const ht = amount / (1 + rate / 100)
  return { ht, tva: amount - ht, ttc: amount }
}

// a est à b ce que c est à x
export const crossProduct = (a, b, c) => (a === 0 ? NaN : (b * c) / a)

export function mean(values) {
  if (!values.length) return NaN
  return values.reduce((s, v) => s + v, 0) / values.length
}

export function weightedMean(values, weights) {
  let sw = 0
  let s = 0
  values.forEach((v, i) => {
    const w = weights[i]
    s += v * w
    sw += w
  })
  return sw === 0 ? NaN : s / sw
}

export function median(values) {
  if (!values.length) return NaN
  const s = [...values].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

export function variance(values, sample = false) {
  const n = values.length
  if (n < (sample ? 2 : 1)) return NaN
  const m = mean(values)
  const ss = values.reduce((s, v) => s + (v - m) ** 2, 0)
  return ss / (sample ? n - 1 : n)
}

export const stdDev = (values, sample = false) => Math.sqrt(variance(values, sample))

export const rescale = (note, from, to = 20) => (from === 0 ? NaN : (note * to) / from)

const ROMAN = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null
  let rest = n
  let out = ''
  for (const [v, s] of ROMAN) {
    while (rest >= v) {
      out += s
      rest -= v
    }
  }
  return out
}

export function fromRoman(input) {
  const s = String(input || '').trim().toUpperCase()
  if (!/^[MDCLXVI]+$/.test(s)) return null
  const val = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
  let total = 0
  for (let i = 0; i < s.length; i += 1) {
    const cur = val[s[i]]
    const next = val[s[i + 1]] || 0
    total += cur < next ? -cur : cur
  }
  return toRoman(total) === s ? total : null
}

export function discount(price, p) {
  const saving = (price * p) / 100
  return { final: price - saving, saving }
}

export const simpleInterest = (capital, rate, years) => (capital * rate * years) / 100

// Versement mensuel en début de mois. Capitalisation mensuelle ou annuelle (intérêts du mois cumulés et crédités en fin d'année).
export function compound({ capital, rate, years, monthly = 0, freq = 'annuelle' }) {
  const months = Math.round(years * 12)
  let balance = capital
  let pending = 0
  let deposits = capital
  const yearly = []
  for (let m = 1; m <= months; m += 1) {
    balance += monthly
    deposits += monthly
    const interest = (balance * rate) / 1200
    if (freq === 'mensuelle') balance += interest
    else pending += interest
    if (m % 12 === 0 || m === months) {
      if (freq !== 'mensuelle') {
        balance += pending
        pending = 0
      }
      if (m % 12 === 0) yearly.push({ year: m / 12, balance, deposits })
    }
  }
  return { final: balance, deposits, interest: balance - deposits, yearly }
}

export function bmi(kg, cm) {
  const m = cm / 100
  return m > 0 ? kg / (m * m) : NaN
}

export function bmiClass(v) {
  if (!Number.isFinite(v)) return ''
  if (v < 18.5) return 'Insuffisance pondérale'
  if (v < 25) return 'Corpulence normale'
  if (v < 30) return 'Surpoids'
  if (v < 35) return 'Obésité modérée'
  if (v < 40) return 'Obésité sévère'
  return 'Obésité morbide'
}

export function margin(cost, price) {
  const m = price - cost
  return {
    margin: m,
    markupRate: cost === 0 ? NaN : (m / cost) * 100,
    marginRate: price === 0 ? NaN : (m / price) * 100,
    coef: cost === 0 ? NaN : price / cost,
  }
}

export const priceFromMarkup = (cost, markupRate) => cost * (1 + markupRate / 100)
export const priceFromMarginRate = (cost, marginRate) => (marginRate >= 100 ? NaN : cost / (1 - marginRate / 100))

export function area(shape, a, b = 0, c = 0) {
  switch (shape) {
    case 'rectangle': return a * b
    case 'carre': return a * a
    case 'triangle': return (a * b) / 2
    case 'cercle': return Math.PI * a * a
    case 'trapeze': return ((a + b) * c) / 2
    default: return NaN
  }
}

export function simplifySqrt(n) {
  if (!Number.isInteger(n) || n < 0) return null
  let outside = 1
  let inside = n
  for (let f = 2; f * f <= inside; f += 1) {
    while (inside % (f * f) === 0) {
      outside *= f
      inside /= f * f
    }
  }
  return { outside, inside }
}
