import { useLocation } from 'react-router-dom'
import { AdSlot } from '../components/AdSlot.jsx'
import { Article } from '../components/Article.jsx'
import { Breadcrumbs } from '../components/Breadcrumbs.jsx'
import { Seo } from '../components/Seo.jsx'
import { useConsent } from '../context/Consent.jsx'
import { legalPages } from '../content/legal.js'
import site from '../data/site.json'

const vars = {
  url: site.url,
  publisher: site.publisher,
  director: site.director,
  email: site.email,
  address: site.address,
  legalForm: site.legalForm,
  updated: site.legalUpdated,
  hostName: site.host.name,
  hostService: site.host.service,
  hostAddress: site.host.address,
  hostPhone: site.host.phone,
  hostWebsite: site.host.website,
}

export default function LegalPage() {
  const { pathname } = useLocation()
  const page = legalPages[pathname]
  const consent = useConsent()
  if (!page) return null
  const showChoices = pathname === '/cookies' || pathname === '/politique-de-confidentialite'
  return (
    <>
      <Seo title={page.title} description={page.description} path={page.path} crumbs={page.crumbs} />
      <Breadcrumbs items={page.crumbs} />
      <h1>{page.h1}</h1>
      <p className="lede">{page.lede}</p>
      <Article sections={page.sections} vars={vars} />
      {showChoices ? (
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={consent.openBanner}>Modifier mon choix</button>
          <button type="button" className="btn btn-ghost" onClick={consent.clearAll}>Effacer les données locales</button>
        </div>
      ) : null}
      {pathname === '/contact' ? (
        <p><a className="btn btn-primary" href={`mailto:${site.email}`}>Écrire à {site.email}</a></p>
      ) : null}
      <AdSlot placement="content" />
    </>
  )
}
