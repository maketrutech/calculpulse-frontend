// Saisie et affichage des nombres au format français, sans Intl pour un rendu identique serveur/navigateur.
const NBSP = '\u00a0'

export function parseNum(input) {
  if (typeof input === 'number') return Number.isFinite(input) ? input : NaN
  if (input === null || input === undefined) return NaN
  let s = String(input).trim().replace(/[\s\u00a0\u202f']/g, '').replace(/[€%°$]/g, '')
  if (!s) return NaN
  s = s.replace(/−/g, '-')
  const commas = (s.match(/,/g) || []).length
  const dots = (s.match(/\./g) || []).length
  if (commas && dots) {
    // « 1.234,56 » (point = milliers) ou « 1,234.56 » (virgule = milliers)
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.')
    else s = s.replace(/,/g, '')
  } else if (commas === 1) {
    s = s.replace(',', '.')
  } else if (commas > 1 || dots > 1) {
    return NaN
  }
  if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return NaN
  return Number(s)
}

export function roundTo(n, digits = 2) {
  if (!Number.isFinite(n)) return n
  const f = 10 ** digits
  const r = Math.round((n + Math.sign(n) * Number.EPSILON * Math.abs(n)) * f) / f
  return Object.is(r, -0) ? 0 : r
}

function group(intPart) {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)
}

export function fmt(n, digits = 2, { fixed = false } = {}) {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—'
  if (Math.abs(n) >= 1e15) return n.toExponential(4).replace('.', ',').replace('e+', ' × 10^')
  const r = roundTo(n, digits)
  let [i, d = ''] = Math.abs(r).toFixed(digits).split('.')
  if (!fixed) d = d.replace(/0+$/, '')
  const sign = r < 0 ? '−' : ''
  return `${sign}${group(i)}${d ? `,${d}` : ''}`
}

export function money(n) {
  return Number.isFinite(n) ? `${fmt(n, 2, { fixed: true })}${NBSP}€` : '—'
}

export function pct(n, digits = 2) {
  return Number.isFinite(n) ? `${fmt(n, digits)}${NBSP}%` : '—'
}
