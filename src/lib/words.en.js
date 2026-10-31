import { roundTo } from './num.js'

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const SCALES = ['', 'thousand', 'million', 'billion']

function under100(n) {
  if (n < 20) return ONES[n]
  const ten = Math.floor(n / 10)
  const one = n % 10
  return one ? `${TENS[ten]}-${ONES[one]}` : TENS[ten]
}

function under1000(n) {
  if (n < 100) return under100(n)
  const hundreds = Math.floor(n / 100)
  const rest = n % 100
  const head = `${ONES[hundreds]} hundred`
  return rest ? `${head} ${under100(rest)}` : head
}

export function integerToWords(n) {
  if (!Number.isInteger(n) || n < 0 || n > 999_999_999_999) return null
  if (n === 0) return 'zero'
  const parts = []
  let rest = n
  let scale = 0
  while (rest > 0 && scale < SCALES.length) {
    const chunk = rest % 1000
    if (chunk) {
      const words = under1000(chunk)
      parts.unshift(SCALES[scale] ? `${words} ${SCALES[scale]}` : words)
    }
    rest = Math.floor(rest / 1000)
    scale += 1
  }
  if (rest > 0) return null
  return parts.join(' ')
}

export function decimalToWords(raw) {
  const cleaned = String(raw ?? '').trim().replace(/[$,\s\u00a0\u202f]/g, '').replace(/−/g, '-')
  if (!cleaned) return null
  const negative = cleaned.startsWith('-')
  const body = negative ? cleaned.slice(1) : cleaned
  if (!/^\d+(\.\d+)?$/.test(body)) return null
  const [whole, frac] = body.split('.')
  if (whole.length > 12) return null
  const wholeWords = integerToWords(Number(whole))
  if (!wholeWords) return null
  const signed = negative && !/^0+(\.0+)?$/.test(body) ? `negative ${wholeWords}` : wholeWords
  if (!frac) return signed
  if (frac.length > 8) return null
  const digits = [...frac].map((digit) => ONES[Number(digit)]).join(' ')
  return `${signed} point ${digits}`
}

export function dollarsToWords(amount) {
  if (!Number.isFinite(amount) || amount < 0 || amount >= 1e12) return null
  const centsTotal = Math.round(roundTo(amount, 2) * 100)
  const dollars = Math.floor(centsTotal / 100)
  const cents = centsTotal % 100
  const dollarWords = integerToWords(dollars)
  if (!dollarWords) return null
  const dollarUnit = dollars === 1 ? 'dollar' : 'dollars'
  if (cents === 0) return `${dollarWords} ${dollarUnit}`
  const centWords = integerToWords(cents)
  const centUnit = cents === 1 ? 'cent' : 'cents'
  if (dollars === 0) return `${centWords} ${centUnit}`
  return `${dollarWords} ${dollarUnit} and ${centWords} ${centUnit}`
}
