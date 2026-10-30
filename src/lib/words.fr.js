// Nombres en lettres (français). Orthographe traditionnelle ou rectifiée de 1990 (traits d'union partout).
const UNITS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize']
const TENS = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' }

function below100(n, j) {
  const et = j === '-' ? '-et-' : ' et '
  j = '-'
  if (n <= 16) return UNITS[n]
  if (n < 20) return `dix${j}${UNITS[n - 10]}`
  const t = Math.floor(n / 10)
  const u = n % 10
  if (t <= 6) {
    if (u === 0) return TENS[t]
    if (u === 1) return `${TENS[t]}${et}un`
    return `${TENS[t]}${j}${UNITS[u]}`
  }
  if (t === 7) {
    if (u === 1) return `soixante${et}onze`
    return `soixante-${below100(10 + u, et === ' et ' ? ' ' : '-')}`
  }
  if (t === 8) return u === 0 ? 'quatre-vingts' : `quatre-vingt${j}${UNITS[u]}`
  return `quatre-vingt-${below100(10 + u, et === ' et ' ? ' ' : '-')}`
}

function below1000(n, j, last) {
  const h = Math.floor(n / 100)
  const r = n % 100
  let out = ''
  if (h) {
    out = h === 1 ? 'cent' : `${UNITS[h]}${j}cent${r === 0 && last ? 's' : ''}`
    if (r) out += j
  }
  if (r || !h) {
    let w = below100(r, j)
    if (!last && w === 'quatre-vingts') w = 'quatre-vingt'
    out += w
  }
  return out
}

export function numberToWords(input, { rectified = false } = {}) {
  const j = rectified ? '-' : ' '
  const n = Math.floor(Math.abs(input))
  if (!Number.isFinite(n) || n > 999_999_999_999) return null
  if (n === 0) return 'zéro'
  const parts = []
  const scales = [[1e9, 'milliard'], [1e6, 'million']]
  let rest = n
  for (const [v, name] of scales) {
    const q = Math.floor(rest / v)
    if (q) {
      parts.push(`${below1000(q, j, true)}${j}${name}${q > 1 ? 's' : ''}`)
      rest %= v
    }
  }
  const th = Math.floor(rest / 1000)
  if (th) {
    parts.push(th === 1 ? 'mille' : `${below1000(th, j, false)}${j}mille`)
    rest %= 1000
  }
  if (rest) parts.push(below1000(rest, j, true))
  const text = parts.join(j)
  return input < 0 ? `moins${j}${text}` : text
}

export function decimalToWords(raw, opts) {
  const s = String(raw).trim().replace(/\s/g, '').replace('.', ',')
  const m = s.match(/^(-?)(\d+)(?:,(\d+))?$/)
  if (!m) return null
  const int = numberToWords(Number(m[2]), opts)
  if (int === null) return null
  let out = int
  if (m[3]) {
    const zeros = m[3].match(/^0*/)[0].length
    const dec = Number(m[3])
    out += ` virgule ${'zéro '.repeat(zeros)}${dec ? numberToWords(dec, opts) : ''}`.trimEnd()
  }
  return m[1] && (Number(m[2]) || Number(m[3] || 0)) ? `moins ${out}` : out
}

export function euroToWords(amount, opts) {
  if (!Number.isFinite(amount) || amount < 0) return null
  const cents = Math.round(amount * 100)
  const e = Math.floor(cents / 100)
  const c = cents % 100
  const ew = numberToWords(e, opts)
  if (ew === null) return null
  const unit = /(million|milliard)s?$/.test(ew) ? ' d’euros' : e > 1 ? ' euros' : ' euro'
  let out = `${ew}${unit}`
  if (c) out += ` et ${numberToWords(c, opts)} centime${c > 1 ? 's' : ''}`
  return out
}
