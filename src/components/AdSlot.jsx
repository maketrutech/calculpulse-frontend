import { useEffect, useRef } from 'react'
import { useConsent } from '../context/Consent.jsx'

export function AdSlot({ placement = 'content' }) {
  const client = import.meta.env.VITE_ADSENSE_CLIENT
  const slot = placement === 'bottom'
    ? import.meta.env.VITE_ADSENSE_SLOT_BOTTOM
    : import.meta.env.VITE_ADSENSE_SLOT
  const { ads } = useConsent()
  const pushed = useRef(false)

  useEffect(() => {
    if (!client || !slot || !ads) return undefined
    document.documentElement.dataset.ads = '1'
    if (!document.querySelector('script[data-cp-adsense]')) {
      const script = document.createElement('script')
      script.async = true
      script.dataset.cpAdsense = '1'
      script.crossOrigin = 'anonymous'
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`
      document.head.appendChild(script)
    }
    if (pushed.current) return undefined
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
      pushed.current = true
    } catch {
      /* AdSense not ready */
    }
    return undefined
  }, [ads, client, slot])

  if (!client || !slot) return null
  return (
    <aside className="ad-reserve" aria-label="Publicité" data-placement={placement}>
      <p className="ad-label">Publicité</p>
      {ads ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', height: '240px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="rectangle"
          data-full-width-responsive="false"
        />
      ) : null}
    </aside>
  )
}
