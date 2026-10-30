import { Helmet } from 'react-helmet-async'
import site from '../data/site.json'
import { buildGraph, pageUrl } from '../lib/seo.js'

export function Seo({
  title,
  description,
  path,
  crumbs,
  faqs,
  app,
  itemList,
  noindex = false,
}) {
  const url = pageUrl(path)
  const graph = buildGraph({ title, description, path, crumbs, faqs, app, itemList })
  const json = JSON.stringify(graph).replace(/</g, '\\u003c')
  const image = `${site.url}/og.png`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <meta name="robots" content="index, follow" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="CalculPulse, calculatrices et convertisseurs en ligne" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{json}</script>
    </Helmet>
  )
}
