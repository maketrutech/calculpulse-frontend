import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App.jsx'
import { preloadRoute, routes } from './data/routes.js'
import { normalizePath } from './lib/path.js'

export { routes }

export async function render(url) {
  const path = normalizePath(url)
  await preloadRoute(path)
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
  const { helmet } = helmetContext
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('\n')
  return { html, head, path }
}
