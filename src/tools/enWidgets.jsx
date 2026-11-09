import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as c from '../lib/calc.js'
import { fmtEn, moneyUsd, parseNumEn, pctEn } from '../lib/num.en.js'
import * as u from '../lib/usConvert.js'
import { decimalToWords, dollarsToWords } from '../lib/words.en.js'
import { Block, NumField, Result, Seg, Select, ok } from './ui.jsx'

const NA = '—'

function useNumEn(initial) {
  const [raw, setRaw] = useState(initial === '' || initial === undefined ? '' : String(initial))
  return { raw, setRaw, value: parseNumEn(raw) }
}

function blankZero(state) {
  if (!state.raw.trim()) return 0
  return state.value
}

const UNIT = {
  kg: { label: 'Kilograms (kg)', one: 'kilogram', many: 'kilograms', symbol: 'kg' },
  lb: { label: 'Pounds (lb)', one: 'pound', many: 'pounds', symbol: 'lb' },
  cm: { label: 'Centimeters (cm)', one: 'centimeter', many: 'centimeters', symbol: 'cm' },
  in: { label: 'Inches (in)', one: 'inch', many: 'inches', symbol: 'in' },
  c: { label: 'Celsius (°C)', one: 'degree Celsius', many: 'degrees Celsius', symbol: '°C' },
  f: { label: 'Fahrenheit (°F)', one: 'degree Fahrenheit', many: 'degrees Fahrenheit', symbol: '°F' },
  km: { label: 'Kilometers (km)', one: 'kilometer', many: 'kilometers', symbol: 'km' },
  mi: { label: 'Miles (mi)', one: 'mile', many: 'miles', symbol: 'mi' },
  gal: { label: 'US gallons (gal)', one: 'US gallon', many: 'US gallons', symbol: 'gal' },
  l: { label: 'Liters (L)', one: 'liter', many: 'liters', symbol: 'L' },
}

function convertEn(value, from, to) {
  const table = {
    'kg:lb': u.kgToLbs,
    'lb:kg': u.lbsToKg,
    'cm:in': u.cmToInches,
    'in:cm': u.inchesToCm,
    'c:f': u.celsiusToFahrenheit,
    'f:c': u.fahrenheitToCelsius,
    'km:mi': u.kmToMiles,
    'mi:km': u.milesToKm,
    'gal:l': u.gallonsToLiters,
    'l:gal': u.litersToGallons,
  }
  if (from === to) return value
  const fn = table[`${from}:${to}`]
  return fn ? fn(value) : NaN
}

function show(n) {
  return Number.isFinite(n) ? fmtEn(n, 6) : ''
}

export function EnConverter({ from, to, initial = 1, reversePath }) {
  const a = UNIT[from]
  const b = UNIT[to]
  const [left, setLeft] = useState(String(initial))
  const [right, setRight] = useState(show(convertEn(initial, from, to)))
  const lv = parseNumEn(left)
  const rv = parseNumEn(right)
  const onLeft = (value) => {
    setLeft(value)
    setRight(show(convertEn(parseNumEn(value), from, to)))
  }
  const onRight = (value) => {
    setRight(value)
    setLeft(show(convertEn(parseNumEn(value), to, from)))
  }
  const result = convertEn(lv, from, to)
  const unit = (n, info) => (Math.abs(n) === 1 ? info.one : info.many)
  const sentence = Number.isFinite(lv) && Number.isFinite(result)
    ? `${fmtEn(lv, 6)} ${unit(lv, a)} = ${fmtEn(result, 6)} ${unit(result, b)}`
    : 'Enter a number. Decimals use a point.'
  return (
    <div className="calc-block">
      <div className="conv">
        <label className="field" htmlFor="cv-l">
          <span>{a.label}</span>
          <span className="input-wrap">
            <input id="cv-l" inputMode="decimal" autoComplete="off" value={left} onChange={(e) => onLeft(e.target.value)} aria-invalid={left && !Number.isFinite(lv) ? 'true' : undefined} />
            <span className="suffix" aria-hidden="true">{a.symbol}</span>
          </span>
        </label>
        <span className="conv-eq" aria-hidden="true">=</span>
        <label className="field" htmlFor="cv-r">
          <span>{b.label}</span>
          <span className="input-wrap">
            <input id="cv-r" inputMode="decimal" autoComplete="off" value={right} onChange={(e) => onRight(e.target.value)} aria-invalid={right && !Number.isFinite(rv) ? 'true' : undefined} />
            <span className="suffix" aria-hidden="true">{b.symbol}</span>
          </span>
        </label>
      </div>
      <p className="conv-line" aria-live="polite">{sentence}</p>
      {reversePath ? <p className="formula"><Link to={reversePath}>Reverse conversion</Link></p> : null}
    </div>
  )
}

export function Percentage() {
  const p = useNumEn(18)
  const x = useNumEn(250)
  const part = useNumEn(45)
  const whole = useNumEn(250)
  const known = useNumEn(45)
  const rate = useNumEn(18)
  const r1 = ok(p.value, x.value) ? c.percentOf(p.value, x.value) : NaN
  const r2 = ok(part.value, whole.value) ? c.whatPercent(part.value, whole.value) : NaN
  const r3 = ok(known.value, rate.value) && rate.value !== 0 ? (known.value * 100) / rate.value : NaN
  return (
    <div className="calc-stack">
      <Block title="What is X% of a number?">
        <div className="calc-row">
          <NumField label="Percent" state={p} suffix="%" />
          <NumField label="of the number" state={x} />
        </div>
        <Result label={`${p.raw || '…'}% of ${x.raw || '…'} =`} value={fmtEn(r1, 4)} detail={ok(r1) ? `${x.raw} × ${p.raw} ÷ 100` : 'Enter two numbers.'} />
      </Block>
      <Block title="What percent is one number of another?">
        <div className="calc-row">
          <NumField label="Part" state={part} />
          <NumField label="Whole" state={whole} />
        </div>
        <Result label={`${part.raw || '…'} is this percent of ${whole.raw || '…'}`} value={pctEn(r2, 4)} detail={ok(r2) ? `${part.raw} ÷ ${whole.raw} × 100` : 'The whole cannot be zero.'} />
      </Block>
      <Block title="Find the whole">
        <div className="calc-row">
          <NumField label="Part" state={known} />
          <NumField label="is this percent" state={rate} suffix="%" />
        </div>
        <Result label="of" value={fmtEn(r3, 4)} detail={ok(r3) ? `${known.raw} × 100 ÷ ${rate.raw}` : 'The percent cannot be zero.'} />
      </Block>
    </div>
  )
}

export function Increase() {
  const oldV = useNumEn(1600)
  const neu = useNumEn(1760)
  const change = ok(oldV.value, neu.value) ? c.evolutionRate(oldV.value, neu.value) : NaN
  const [dir, setDir] = useState('up')
  const base = useNumEn(1600)
  const rate = useNumEn(10)
  const signed = dir === 'up' ? rate.value : -rate.value
  const applied = ok(base.value, rate.value) ? c.applyRate(base.value, signed) : NaN
  const final = useNumEn(115)
  const undo = useNumEn(15)
  const original = ok(final.value, undo.value) ? c.beforeRate(final.value, undo.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="Percent change between two numbers">
        <div className="calc-row">
          <NumField label="Original" state={oldV} />
          <NumField label="New" state={neu} />
        </div>
        <Result label={change >= 0 ? 'Increase' : 'Decrease'} value={ok(change) ? `${change > 0 ? '+' : ''}${pctEn(change)}` : NA} detail={ok(change) ? `(${neu.raw} − ${oldV.raw}) ÷ ${oldV.raw} × 100` : 'The original cannot be zero.'} />
      </Block>
      <Block title="Apply a percent increase or decrease">
        <Seg label="Direction" value={dir} onChange={setDir} options={[{ value: 'up', label: 'Increase' }, { value: 'down', label: 'Decrease' }]} />
        <div className="calc-row">
          <NumField label="Starting value" state={base} />
          <NumField label="Percent" state={rate} suffix="%" />
        </div>
        <Result label="Result" value={fmtEn(applied, 2)} detail={ok(applied) ? `Difference ${fmtEn(applied - base.value, 2)} · factor ${fmtEn(c.coefficient(signed), 4)}` : 'Enter two numbers.'} />
      </Block>
      <Block title="Value before a percent increase">
        <div className="calc-row">
          <NumField label="Value after the change" state={final} />
          <NumField label="Percent increase" state={undo} suffix="%" />
        </div>
        <Result label="Original value" value={fmtEn(original, 2)} detail={ok(original) ? `${final.raw} ÷ ${fmtEn(1 + undo.value / 100, 4)}` : 'A −100% change cannot be reversed.'} />
      </Block>
    </div>
  )
}

export function Discount() {
  const price = useNumEn(80)
  const p = useNumEn(25)
  const p2 = useNumEn('')
  const res = ok(price.value, p.value) ? c.discount(price.value, p.value) : null
  const second = res && p2.raw.trim() && ok(p2.value) ? c.discount(res.final, p2.value) : null
  const pay = second ? second.final : res?.final
  const before = useNumEn(120)
  const after = useNumEn(84)
  const rate = ok(before.value, after.value) ? -c.evolutionRate(before.value, after.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="Price after percent off">
        <div className="calc-row three">
          <NumField label="Original price" state={price} suffix="$" />
          <NumField label="Percent off" state={p} suffix="%" />
          <NumField label="Second discount (optional)" state={p2} suffix="%" />
        </div>
        <div className="result-grid two">
          <Result label="You pay" value={moneyUsd(pay)} />
          <Result label="You save" value={moneyUsd(res ? price.value - pay : NaN)} big={false} detail={second ? `Combined discount: ${pctEn(c.whatPercent(price.value - second.final, price.value))}` : ''} />
        </div>
      </Block>
      <Block title="Percent off from two prices">
        <div className="calc-row">
          <NumField label="Original price" state={before} suffix="$" />
          <NumField label="Sale price" state={after} suffix="$" />
        </div>
        <Result label="Discount" value={pctEn(rate)} detail={ok(rate) ? `Saved ${moneyUsd(before.value - after.value)}` : ''} />
      </Block>
    </div>
  )
}

export function Proportion() {
  const a = useNumEn(3)
  const b = useNumEn(5.4)
  const cc = useNumEn(8)
  const x = ok(a.value, b.value, cc.value) ? c.crossProduct(a.value, b.value, cc.value) : NaN
  return (
    <div className="calc-stack">
      <Block title="A is to B as C is to X">
        <div className="cross">
          <NumField label="A" state={a} />
          <NumField label="is to B" state={b} />
          <NumField label="C" state={cc} />
          <div className="field">
            <span>is to X</span>
            <output className="cross-x" aria-live="polite">{fmtEn(x, 6)}</output>
          </div>
        </div>
        <p className="formula">X = B × C ÷ A = {b.raw || '…'} × {cc.raw || '…'} ÷ {a.raw || '…'} = {fmtEn(x, 6)}</p>
      </Block>
    </div>
  )
}

function parseListEn(text) {
  return text.split(/[;\n\s]+/).map((token) => token.replace(/,+$/g, '').trim()).filter(Boolean).map(parseNumEn)
}

export function Average() {
  const [text, setText] = useState('78 85 90 73 88')
  const values = parseListEn(text)
  const valid = values.filter(Number.isFinite)
  const bad = values.length - valid.length
  return (
    <div className="calc-stack">
      <Block>
        <label className="field" htmlFor="avg-list">
          <span>Numbers, separated by spaces or semicolons</span>
          <textarea id="avg-list" className="grow" rows={3} value={text} onChange={(event) => setText(event.target.value)} aria-invalid={bad ? 'true' : undefined} />
        </label>
        <div className="result-grid">
          <Result label="Mean" value={fmtEn(c.mean(valid), 4)} />
          <Result label="Median" value={fmtEn(c.median(valid), 4)} big={false} />
          <Result label="Sum" value={fmtEn(valid.reduce((s, v) => s + v, 0), 4)} big={false} />
        </div>
        <p className="formula">{bad ? `${bad} entry ignored because it is not a number.` : `Count ${valid.length} · min ${valid.length ? fmtEn(Math.min(...valid), 4) : NA} · max ${valid.length ? fmtEn(Math.max(...valid), 4) : NA}`}</p>
      </Block>
    </div>
  )
}

const GRADE_ROWS = [['Quiz', '90', '3'], ['Midterm', '84', '3'], ['Final', '76', '4']]

export function Weighted() {
  const [rows, setRows] = useState(GRADE_ROWS)
  const set = (i, k, v) => setRows((cur) => cur.map((r, j) => (j === i ? r.map((x, n) => (n === k ? v : x)) : r)))
  const vals = []
  const ws = []
  rows.forEach((r) => {
    const v = parseNumEn(r[1])
    const w = parseNumEn(r[2])
    if (Number.isFinite(v) && Number.isFinite(w) && w >= 0) {
      vals.push(v)
      ws.push(w)
    }
  })
  const res = c.weightedMean(vals, ws)
  return (
    <div className="calc-stack">
      <Block>
        <div className="wtable" role="group" aria-label="Values and weights">
          <div className="wrow whead" aria-hidden="true"><span>Label (optional)</span><span>Value</span><span>Weight</span><span /></div>
          {rows.map((r, i) => (
            <div className="wrow" key={i}>
              <input aria-label={`Label row ${i + 1}`} value={r[0]} onChange={(e) => set(i, 0, e.target.value)} />
              <input aria-label={`Value row ${i + 1}`} inputMode="decimal" value={r[1]} onChange={(e) => set(i, 1, e.target.value)} aria-invalid={r[1] && !Number.isFinite(parseNumEn(r[1])) ? 'true' : undefined} />
              <input aria-label={`Weight row ${i + 1}`} inputMode="decimal" value={r[2]} onChange={(e) => set(i, 2, e.target.value)} aria-invalid={r[2] && !Number.isFinite(parseNumEn(r[2])) ? 'true' : undefined} />
              <button type="button" className="icon-x" aria-label={`Remove row ${i + 1}`} onClick={() => setRows((cur) => cur.filter((_, j) => j !== i))} disabled={rows.length < 2}>×</button>
            </div>
          ))}
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn-ghost" onClick={() => setRows((cur) => [...cur, ['', '', '1']])}>Add a row</button>
        </div>
        <div className="result-grid">
          <Result label="Weighted average" value={fmtEn(res, 4)} />
          <Result label="Total weight" value={fmtEn(ws.reduce((s, w) => s + w, 0), 2)} big={false} />
          <Result label="Unweighted mean" value={fmtEn(c.mean(vals), 4)} big={false} />
        </div>
      </Block>
    </div>
  )
}

export function StdDev() {
  const [text, setText] = useState('2 4 4 4 5 5 7 9')
  const [sample, setSample] = useState('pop')
  const values = parseListEn(text).filter(Number.isFinite)
  const s = sample === 'sample'
  return (
    <div className="calc-stack">
      <Block>
        <label className="field" htmlFor="sd-list">
          <span>Values, separated by spaces or semicolons</span>
          <textarea id="sd-list" className="grow" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <Seg label="Divide by" value={sample} onChange={setSample} options={[{ value: 'pop', label: 'Population (n)' }, { value: 'sample', label: 'Sample (n − 1)' }]} />
        <div className="result-grid">
          <Result label="Standard deviation" value={fmtEn(c.stdDev(values, s), 4)} />
          <Result label="Variance" value={fmtEn(c.variance(values, s), 4)} big={false} />
          <Result label="Mean" value={fmtEn(c.mean(values), 4)} big={false} />
        </div>
        <p className="formula">n = {values.length} · median {fmtEn(c.median(values), 4)}</p>
      </Block>
    </div>
  )
}

export function SquareRoot() {
  const n = useNumEn(72)
  const [rootN, setRootN] = useState('2')
  const k = Number(rootN)
  const v = n.value
  const r = ok(v) ? (k === 2 ? (v >= 0 ? Math.sqrt(v) : NaN) : Math.cbrt(v)) : NaN
  const simp = k === 2 && Number.isInteger(v) && v >= 0 ? c.simplifySqrt(v) : null
  let exact = ''
  if (simp) {
    if (simp.inside === 1) exact = `√${v} = ${simp.outside} (perfect square)`
    else if (simp.outside > 1) exact = `√${v} = ${simp.outside}√${simp.inside}`
    else exact = `√${v} does not simplify`
  }
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row">
          <NumField label="Number" state={n} />
          <Select label="Root" value={rootN} onChange={setRootN} options={[{ value: '2', label: 'Square root' }, { value: '3', label: 'Cube root' }]} />
        </div>
        <Result label={k === 2 ? `√${n.raw || '…'} =` : `∛${n.raw || '…'} =`} value={fmtEn(r, 8)} detail={ok(r) ? exact || `Check: ${fmtEn(r, 8)}${k === 2 ? '²' : '³'} ≈ ${fmtEn(r ** k, 6)}` : 'A negative number has no real square root.'} />
      </Block>
    </div>
  )
}

function romanParts(n) {
  const parts = []
  for (const v of [1000, 100, 10, 1]) {
    const d = Math.floor(n / v) % 10
    if (d) parts.push(`${c.toRoman(d * v)} = ${fmtEn(d * v, 0)}`)
  }
  return parts.join(' · ')
}

export function Roman() {
  const [arabic, setArabic] = useState('2026')
  const [roman, setRoman] = useState('MCMXCIV')
  const n = parseNumEn(arabic)
  const r = c.toRoman(n)
  const back = c.fromRoman(roman)
  return (
    <div className="calc-stack">
      <Block title="Number to Roman numerals">
        <label className="field" htmlFor="r-a"><span>Whole number from 1 to 3,999</span>
          <input id="r-a" inputMode="numeric" value={arabic} onChange={(e) => setArabic(e.target.value)} aria-invalid={arabic && !r ? 'true' : undefined} />
        </label>
        <Result label="Roman numerals" value={r || NA} detail={r ? romanParts(Math.round(n)) : 'Enter a whole number from 1 to 3,999.'} />
      </Block>
      <Block title="Roman numerals to number">
        <label className="field" htmlFor="r-r"><span>Roman numerals (I, V, X, L, C, D, M)</span>
          <input id="r-r" autoCapitalize="characters" spellCheck="false" value={roman} onChange={(e) => setRoman(e.target.value)} aria-invalid={roman && !back ? 'true' : undefined} />
        </label>
        <Result label="Number" value={back ? fmtEn(back, 0) : NA} detail={back ? '' : 'Not a standard form. 4 is IV, not IIII.'} />
      </Block>
    </div>
  )
}

export function NumberWords() {
  const [raw, setRaw] = useState('1,250.50')
  const [mode, setMode] = useState('number')
  const value = parseNumEn(raw)
  const out = mode === 'dollars' ? dollarsToWords(value) : decimalToWords(raw)
  return (
    <div className="calc-stack">
      <Block>
        <label className="field" htmlFor="w-n"><span>Number or amount, up to 999 billion</span>
          <input id="w-n" inputMode="decimal" value={raw} onChange={(e) => setRaw(e.target.value)} aria-invalid={raw && !out ? 'true' : undefined} />
        </label>
        <Seg label="Format" value={mode} onChange={setMode} options={[{ value: 'number', label: 'Number' }, { value: 'dollars', label: 'US dollars' }]} />
        <Result label="In words" value={out || NA} detail={out ? '' : 'Enter a positive amount, for example 1250.50.'} />
      </Block>
    </div>
  )
}

const SHAPES = [
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'square', label: 'Square' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'circle', label: 'Circle' },
  { value: 'trapezoid', label: 'Trapezoid' },
]

export function SquareFootage() {
  const [shape, setShape] = useState('rectangle')
  const lengthFt = useNumEn(12)
  const lengthIn = useNumEn(0)
  const widthFt = useNumEn(15)
  const widthIn = useNumEn(0)
  const sideFt = useNumEn(10)
  const sideIn = useNumEn(0)
  const base = useNumEn(12)
  const height = useNumEn(8)
  const radius = useNumEn(5)
  const top = useNumEn(8)
  const bottom = useNumEn(14)
  const trapH = useNumEn(6)
  let area = NaN
  let detail = 'Enter the measurements in feet.'
  if (shape === 'rectangle') {
    const L = u.toFeet(lengthFt.value, blankZero(lengthIn))
    const W = u.toFeet(widthFt.value, blankZero(widthIn))
    area = u.squareFeet(L, W)
    if (ok(area)) detail = `${fmtEn(L, 4)} ft × ${fmtEn(W, 4)} ft`
  } else if (shape === 'square') {
    const side = u.toFeet(sideFt.value, blankZero(sideIn))
    area = u.squareFeet(side, side)
    if (ok(area)) detail = `${fmtEn(side, 4)} ft × ${fmtEn(side, 4)} ft`
  } else if (shape === 'triangle') {
    area = ok(base.value, height.value) ? u.squareFeet(base.value, height.value) / 2 : NaN
    if (ok(area)) detail = `${fmtEn(base.value, 4)} × ${fmtEn(height.value, 4)} ÷ 2`
  } else if (shape === 'circle') {
    area = ok(radius.value) && radius.value >= 0 ? Math.PI * radius.value * radius.value : NaN
    if (ok(area)) detail = `π × ${fmtEn(radius.value, 4)}²`
  } else if (ok(top.value, bottom.value, trapH.value) && top.value >= 0 && bottom.value >= 0 && trapH.value >= 0) {
    area = ((top.value + bottom.value) / 2) * trapH.value
    detail = `(${fmtEn(top.value, 4)} + ${fmtEn(bottom.value, 4)}) ÷ 2 × ${fmtEn(trapH.value, 4)}`
  }
  const [m2raw, setM2] = useState('20')
  const [sfraw, setSf] = useState(fmtEn(u.m2ToSqFt(20), 4))
  const m2v = parseNumEn(m2raw)
  const sfv = parseNumEn(sfraw)
  return (
    <div className="calc-stack">
      <Block title="Area in square feet">
        <Select label="Shape" value={shape} onChange={setShape} options={SHAPES} />
        {shape === 'rectangle' || shape === 'square' ? (
          <div className="calc-row">
            <NumField label={shape === 'square' ? 'Side, feet' : 'Length, feet'} state={shape === 'square' ? sideFt : lengthFt} />
            <NumField label="Inches" state={shape === 'square' ? sideIn : lengthIn} />
            {shape === 'rectangle' ? <NumField label="Width, feet" state={widthFt} /> : null}
            {shape === 'rectangle' ? <NumField label="Inches" state={widthIn} /> : null}
          </div>
        ) : null}
        {shape === 'triangle' ? (
          <div className="calc-row">
            <NumField label="Base, feet" state={base} />
            <NumField label="Height, feet" state={height} />
          </div>
        ) : null}
        {shape === 'circle' ? <NumField label="Radius, feet" state={radius} /> : null}
        {shape === 'trapezoid' ? (
          <div className="calc-row three">
            <NumField label="Base a, feet" state={top} />
            <NumField label="Base b, feet" state={bottom} />
            <NumField label="Height, feet" state={trapH} />
          </div>
        ) : null}
        <div className="result-grid">
          <Result label="Square feet" value={ok(area) ? fmtEn(area, 3) : NA} detail={ok(area) ? detail : 'Measurements cannot be negative.'} />
          <Result label="Square yards" value={ok(area) ? fmtEn(area / 9, 3) : NA} big={false} />
          <Result label="Square meters" value={ok(area) ? fmtEn(u.sqFtToM2(area), 3) : NA} big={false} />
        </div>
      </Block>
      <Block title="Square meters and square feet">
        <div className="conv">
          <label className="field" htmlFor="m2-in">
            <span>Square meters</span>
            <input id="m2-in" inputMode="decimal" value={m2raw} onChange={(e) => { const next = e.target.value; setM2(next); setSf(show(u.m2ToSqFt(parseNumEn(next)))) }} />
          </label>
          <span className="conv-eq" aria-hidden="true">=</span>
          <label className="field" htmlFor="sf-in">
            <span>Square feet</span>
            <input id="sf-in" inputMode="decimal" value={sfraw} onChange={(e) => { setSf(e.target.value); setM2(show(u.sqFtToM2(parseNumEn(e.target.value)))) }} />
          </label>
        </div>
        <p className="formula">{ok(m2v, sfv) ? `${fmtEn(m2v, 4)} m² = ${fmtEn(u.m2ToSqFt(m2v), 4)} sq ft` : 'One square meter is about 10.764 square feet.'}</p>
      </Block>
    </div>
  )
}

export function Margin() {
  const cost = useNumEn(50)
  const price = useNumEn(80)
  const r = ok(cost.value, price.value) ? c.margin(cost.value, price.value) : null
  const cost2 = useNumEn(60)
  const rate = useNumEn(25)
  const [kind, setKind] = useState('margin')
  const pv = ok(cost2.value, rate.value) ? (kind === 'margin' ? c.priceFromMarginRate(cost2.value, rate.value) : c.priceFromMarkup(cost2.value, rate.value)) : NaN
  return (
    <div className="calc-stack">
      <Block title="Margin from cost and selling price">
        <div className="calc-row">
          <NumField label="Cost" state={cost} suffix="$" />
          <NumField label="Selling price" state={price} suffix="$" />
        </div>
        <div className="result-grid">
          <Result label="Profit" value={moneyUsd(r?.margin)} />
          <Result label="Margin" value={pctEn(r?.marginRate)} big={false} />
          <Result label="Markup" value={pctEn(r?.markupRate)} big={false} />
        </div>
      </Block>
      <Block title="Price from a target rate">
        <Seg label="Rate type" value={kind} onChange={setKind} options={[{ value: 'margin', label: 'Margin on price' }, { value: 'markup', label: 'Markup on cost' }]} />
        <div className="calc-row">
          <NumField label="Cost" state={cost2} suffix="$" />
          <NumField label={kind === 'margin' ? 'Target margin' : 'Target markup'} state={rate} suffix="%" />
        </div>
        <Result label="Selling price" value={moneyUsd(pv)} detail={ok(pv) ? `Profit ${moneyUsd(pv - cost2.value)}` : 'Margin has to stay under 100%.'} />
      </Block>
    </div>
  )
}

export function SimpleInterest() {
  const cap = useNumEn(10000)
  const rate = useNumEn(5)
  const years = useNumEn(3)
  const months = useNumEn(0)
  const duration = ok(years.value) ? years.value + (ok(months.value) ? months.value / 12 : 0) : NaN
  const i = ok(cap.value, rate.value, duration) ? c.simpleInterest(cap.value, rate.value, duration) : NaN
  return (
    <div className="calc-stack">
      <Block>
        <div className="calc-row">
          <NumField label="Principal" state={cap} suffix="$" />
          <NumField label="Annual rate" state={rate} suffix="%" />
        </div>
        <div className="calc-row">
          <NumField label="Years" state={years} />
          <NumField label="Extra months" state={months} />
        </div>
        <div className="result-grid two">
          <Result label="Simple interest" value={moneyUsd(i)} />
          <Result label="Total" value={moneyUsd(ok(i) ? cap.value + i : NaN)} big={false} detail={ok(i) && duration ? `${moneyUsd(i / duration)} per year` : ''} />
        </div>
        <p className="formula">Interest = principal × rate × time ÷ 100</p>
      </Block>
    </div>
  )
}

export const EN_WIDGETS = {
  percentage: Percentage,
  increase: Increase,
  discount: Discount,
  proportion: Proportion,
  average: Average,
  weighted: Weighted,
  stdev: StdDev,
  sqrt: SquareRoot,
  roman: Roman,
  words: NumberWords,
  sqft: SquareFootage,
  margin: Margin,
  interest: SimpleInterest,
}
