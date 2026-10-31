import { Link } from 'react-router-dom'
import { Seo } from '../../components/Seo.jsx'
import { enCatalog } from '../../data/enMap.js'

export function EnglishNotFound() {
  return (
    <>
      <Seo
        title="Page not found | CalculPulse"
        description="That address is not an English CalculPulse tool. The calculators and converters are listed on the English home page."
        path="/en/404"
        locale="en"
        noindex
      />
      <h1>This page does not exist</h1>
      <p className="lede">The link may be out of date. The calculators are still on the home page.</p>
      <ul className="related-grid">
        {enCatalog.filter((item) => item.featured).slice(0, 6).map((item) => (
          <li key={item.path}><Link to={item.path}><span className="tool-name">{item.name}</span><span className="tool-blurb">{item.blurb}</span></Link></li>
        ))}
      </ul>
      <p><Link to="/en">Back to the English home page</Link></p>
    </>
  )
}
