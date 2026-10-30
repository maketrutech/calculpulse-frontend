import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from '../context/Consent.jsx'

export function CookieBanner() {
  const consent = useConsent()
  const [ads, setAds] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  if (!consent.banner) return null

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
