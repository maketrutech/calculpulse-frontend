import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fmt, parseNum } from '../lib/num.js'
import { UNITS, convert } from '../lib/units.js'

function clean(n) {
  return Number.isFinite(n) ? fmt(n, 6).replace(/\u00a0/g, ' ') : ''
}

export function Converter({ from, to, initial = 1, reversePath }) {
  const a = UNITS[from]
  const b = UNITS[to]
  const [left, setLeft] = useState(String(initial).replace('.', ','))
  const [right, setRight] = useState(clean(convert(initial, from, to)))
  const lv = parseNum(left)
  const rv = parseNum(right)
  const onLeft = (v) => {
    setLeft(v)
    setRight(clean(convert(parseNum(v), from, to)))
  }
  const onRight = (v) => {
    setRight(v)
    setLeft(clean(convert(parseNum(v), to, from)))
  }
  const sentence = Number.isFinite(lv) && Number.isFinite(rv)
    ? `${fmt(lv, 6)} ${Math.abs(lv) >= 2 ? a.p : a.s} = ${fmt(convert(lv, from, to), 6)} ${Math.abs(convert(lv, from, to)) >= 2 ? b.p : b.s}`
    : 'Saisissez un nombre (la virgule est acceptée).'
  return (
    <div className="calc-block">
      <div className="conv">
        <label className="field" htmlFor="cv-l">
          <span>{a.p.charAt(0).toUpperCase() + a.p.slice(1)} ({a.sym})</span>
          <span className="input-wrap">
            <input id="cv-l" inputMode="decimal" autoComplete="off" value={left} onChange={(e) => onLeft(e.target.value)} aria-invalid={left && !Number.isFinite(lv) ? 'true' : undefined} />
            <span className="suffix" aria-hidden="true">{a.sym}</span>
          </span>
        </label>
        <span className="conv-eq" aria-hidden="true">=</span>
        <label className="field" htmlFor="cv-r">
          <span>{b.p.charAt(0).toUpperCase() + b.p.slice(1)} ({b.sym})</span>
          <span className="input-wrap">
            <input id="cv-r" inputMode="decimal" autoComplete="off" value={right} onChange={(e) => onRight(e.target.value)} aria-invalid={right && !Number.isFinite(rv) ? 'true' : undefined} />
            <span className="suffix" aria-hidden="true">{b.sym}</span>
          </span>
        </label>
      </div>
      <p className="conv-line" aria-live="polite">{sentence}</p>
      {reversePath ? <p className="formula"><Link to={reversePath}>Conversion inverse : {b.s} en {a.s}</Link></p> : null}
    </div>
  )
}
