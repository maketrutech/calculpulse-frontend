import { Rich } from './Rich.jsx'

export function Faq({ items, vars, title = 'Questions fréquentes' }) {
  if (!items?.length) return null
  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">{title}</h2>
      {items.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p><Rich text={item.a} vars={vars} /></p>
        </div>
      ))}
    </section>
  )
}
