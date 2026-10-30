import { Link, useLocation } from 'react-router-dom'
import { navTools } from '../data/catalog.js'
import { preloadRoute } from '../data/routes.js'
import { normalizePath } from '../lib/path.js'
import { KEYS } from '../lib/keys.js'

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#2a2f86" />
      <path d="M17 24h12M23 18v12M35 24h12M17 42h12M35 38h12M35 46h12" stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M8 56h48" stroke="#f2b632" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function active(path, current) {
  if (path === '/') return current === '/'
  return current === path || current.startsWith(`${path}/`)
}

export function Header() {
  const { pathname } = useLocation()
  const current = normalizePath(pathname)
  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem(KEYS.theme, next ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }
  return (
    <header className="site-header">
      <div className="header-row">
        <Link to="/" className="brand" onMouseEnter={() => preloadRoute('/')} onFocus={() => preloadRoute('/')}>
          <Mark />
          <span>
            <span className="brand-calcul">Calcul</span>
            <span className="brand-pulse">pulse</span>
          </span>
        </Link>
        <button type="button" className="icon-btn" aria-label="Changer le thème" onClick={toggleTheme}>
          <svg className="icon-moon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M14.5 2.5a8.5 8.5 0 1 0 7 12.2A8 8 0 0 1 14.5 2.5z" />
          </svg>
          <svg className="icon-sun" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path stroke="currentColor" strokeWidth="2" d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
          </svg>
        </button>
      </div>
      <nav className="nav-row" aria-label="Outils">
        {navTools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className={active(tool.path, current) ? 'nav-link is-active' : 'nav-link'}
            aria-current={active(tool.path, current) ? 'page' : undefined}
            onMouseEnter={() => preloadRoute(tool.path)}
            onFocus={() => preloadRoute(tool.path)}
          >
            {tool.short}
          </Link>
        ))}
      </nav>
    </header>
  )
}
