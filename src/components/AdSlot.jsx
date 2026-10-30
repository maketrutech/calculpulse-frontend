import { useEffect, useRef } from 'react'
import { useConsent } from '../context/Consent.jsx'
import { ADSENSE_CLIENT, loadAdsense } from '../lib/adsense.js'

// Responsive AdSense unit (same pattern as SolarPulse's AdBanner). Space is reserved
// with a fixed height (.ad-reserve) once ads are accepted, so there is no layout shift.
// Placed after the tool, never above it.
export function AdSlot({ placement = 'content' }) {
  const slot = placement === 'bottom'
    ? import.meta.env.VITE_ADSENSE_SLOT_BOTTOM
    : import.meta.env.VITE_ADSENSE_SLOT
  const { ads } = useConsent()
  const pushed = useRef(false)

  useEffect(() => {
    if (!ADSENSE_CLIENT || !ads || pushed.current) return
    document.documentElement.dataset.ads = '1'
    loadAdsense()
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      /* ad blocker or script unavailable */
    }
  }, [ads])

  if (!ADSENSE_CLIENT) return null
  return (
    <aside className="ad-reserve" aria-label="Publicité" data-placement={placement}>
      <p className="ad-label">Publicité</p>
      {ads ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '240px' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot || undefined}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </aside>
  )
}
