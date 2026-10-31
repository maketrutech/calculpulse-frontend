import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CookieBanner } from './components/CookieBanner.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { Layout } from './components/Layout.jsx'
import { ConsentProvider } from './context/Consent.jsx'
import { routes } from './data/routes.js'
import { enRoutes } from './data/enRoutes.js'
import { getCached, setCached } from './lib/routeCache.js'
import { NotFound } from './pages/NotFound.jsx'
import { PageViews } from './lib/analytics.js'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Routed({ path, load }) {
  const [Comp, setComp] = useState(() => getCached(path))
  useEffect(() => {
    let live = true
    const cached = getCached(path)
    if (cached) {
      setComp(() => cached)
      return undefined
    }
    load().then((mod) => {
      setCached(path, mod.default)
      if (live) setComp(() => mod.default)
    })
    return () => {
      live = false
    }
  }, [path, load])
  if (!Comp) return <p className="page-loading" role="status">{path.startsWith('/en') ? 'Loading the tool…' : 'Chargement de l’outil…'}</p>
  return <Comp />
}

export function App() {
  return (
    <ConsentProvider>
      <ErrorBoundary>
        <Layout>
          <ScrollTop />
          <PageViews />
          <Routes>
            {[...routes, ...enRoutes].map((route) => (
              <Route key={route.path} path={route.path} element={<Routed path={route.path} load={route.load} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
      <CookieBanner />
    </ConsentProvider>
  )
}
