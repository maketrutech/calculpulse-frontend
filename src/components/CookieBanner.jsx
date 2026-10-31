import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useConsent } from '../context/Consent.jsx'
import { isEnglishPath } from '../data/enMap.js'
import { normalizePath } from '../lib/path.js'

export function CookieBanner() {
  const consent = useConsent()
  const { pathname } = useLocation()
  const en = isEnglishPath(normalizePath(pathname))
  const [ads, setAds] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  if (!consent.banner) return null
  if (en) {
    return (
      <div className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
        <p id="cookie-title">
          Advertising and measurement are off until you choose. <Link to="/cookies">Cookies</Link>
          {' · '}
          <button type="button" className="linkish" onClick={consent.showCustom}>Customize</button>
        </p>
        {consent.custom ? (
          <div>
            <label className="check"><input type="checkbox" checked disabled /> Necessary, always on (choice saved on this device)</label>
            <label className="check"><input type="checkbox" checked={ads} onChange={(event) => setAds(event.target.checked)} /> Advertising (Google AdSense)</label>
            <label className="check"><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /> Audience measurement</label>
          </div>
        ) : null}
        <div className="btn-row">
          <button type="button" className="btn btn-ink" onClick={consent.refuseAll}>Reject all</button>
          <button type="button" className="btn btn-primary" onClick={consent.acceptAll}>Accept all</button>
          {consent.custom ? (
            <button type="button" className="btn btn-ghost" onClick={() => consent.saveCustom({ ads, analytics })}>Save</button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <p id="cookie-title">
        Publicité et mesure bloquées par défaut. <Link to="/cookies">Cookies</Link>
        {' · '}
        <button type="button" className="linkish" onClick={consent.showCustom}>Personnaliser</button>
      </p>
      {consent.custom ? (
        <div>
          <label className="check"><input type="checkbox" checked disabled /> Nécessaires, toujours actifs (choix enregistré sur cet appareil)</label>
          <label className="check"><input type="checkbox" checked={ads} onChange={(event) => setAds(event.target.checked)} /> Publicité (Google AdSense)</label>
          <label className="check"><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /> Mesure d’audience</label>
        </div>
      ) : null}
      <div className="btn-row">
        <button type="button" className="btn btn-ink" onClick={consent.refuseAll}>Tout refuser</button>
        <button type="button" className="btn btn-primary" onClick={consent.acceptAll}>Tout accepter</button>
        {consent.custom ? (
          <button type="button" className="btn btn-ghost" onClick={() => consent.saveCustom({ ads, analytics })}>Enregistrer</button>
        ) : null}
      </div>
    </div>
  )
}
