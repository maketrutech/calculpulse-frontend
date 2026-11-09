import { roundTo } from './num.js'

const nfCache = new Map()

function nf(min, max) {
  const key = `${min}:${max}`
  if (!nfCache.has(key)) {
    nfCache.set(key, new Intl.NumberFormat('en-US', { minimumFractionDigits: min, maximumFractionDigits: max }))
  }
  return nfCache.get(key)
}

export function parseNumEn(input) {
  if (typeof input === 'number') return Number.isFinite(input) ? input : NaN
  if (input === null || input === undefined) return NaN
  let s = String(input).trim().replace(/[\s\u00a0\u202f$€%°]/g, '').replace(/−/g, '-')
  if (!s) return NaN
  const commas = (s.match(/,/g) || []).length
  const dots = (s.match(/\./g) || []).length
  if (commas && dots) {
    if (s.lastIndexOf('.') > s.lastIndexOf(',')) s = s.replace(/,/g, '')
    else s = s.replace(/\./g, '').replace(',', '.')
  } else if (commas) {
    if (!/^[+-]?\d{1,3}(,\d{3})+$/.test(s)) return NaN
    s = s.replace(/,/g, '')
  } else if (dots > 1) {
    return NaN
  }
  if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return NaN
  return Number(s)
}

export function fmtEn(n, digits = 2) {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—'
  if (Math.abs(n) >= 1e15) return n.toExponential(4)
  const rounded = roundTo(n, digits)
  return nf(0, digits).format(rounded).replace('-', '−')
}

export function moneyUsd(n) {
  if (!Number.isFinite(n)) return '—'
  const rounded = roundTo(n, 2)
  const body = nf(2, 2).format(Math.abs(rounded))
  return rounded < 0 ? `−$${body}` : `$${body}`
}

export function pctEn(n, digits = 2) {
  return Number.isFinite(n) ? `${fmtEn(n, digits)}%` : '—'
}
