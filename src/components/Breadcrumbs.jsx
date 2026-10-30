import { Link } from 'react-router-dom'

export function Breadcrumbs({ items }) {
  if (!items || items.length < 2) return null
  return (
    <nav className="crumbs" aria-label="Fil d’Ariane">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.path}>
              {last ? <span aria-current="page">{item.name}</span> : <Link to={item.path}>{item.name}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
