import { useId, useState } from 'react'
import { parseNum } from '../lib/num.js'

export function useNum(initial) {
  const [raw, setRaw] = useState(String(initial).replace('.', ','))
  return { raw, setRaw, value: parseNum(raw) }
}

export function NumField({ label, state, suffix, hint, min }) {
  const id = useId()
  const bad = state.raw.trim() !== '' && (!Number.isFinite(state.value) || (min !== undefined && state.value < min))
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <span className="input-wrap">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck="false"
          value={state.raw}
          aria-invalid={bad ? 'true' : undefined}
          aria-describedby={hint ? `${id}-h` : undefined}
          onChange={(event) => state.setRaw(event.target.value)}
        />
        {suffix ? <span className="suffix" aria-hidden="true">{suffix}</span> : null}
      </span>
      {hint ? <small id={`${id}-h`} className="hint">{hint}</small> : null}
    </label>
  )
}

export function Select({ label, value, onChange, options }) {
  const id = useId()
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}

export function Seg({ label, value, onChange, options }) {
  return (
    <div className="seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={value === o.value ? 'is-on' : undefined}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Result({ label, value, detail, big = true }) {
  return (
    <div className={big ? 'result is-big' : 'result'}>
      <span className="result-label">{label}</span>
      <output className="result-value" aria-live="polite">{value}</output>
      {detail !== undefined ? <span className="result-detail">{detail || '\u00a0'}</span> : null}
    </div>
  )
}

export function Block({ title, children }) {
  return (
    <div className="calc-block">
      {title ? <h2 className="calc-title">{title}</h2> : null}
      {children}
    </div>
  )
}

export const ok = (...values) => values.every((v) => Number.isFinite(v))
