// Google AdSense, same publisher and integration as SolarPulse / WaterPulse.
// The script is only injected once the visitor has accepted advertising
// (Consent Mode v2 ad_storage / ad_user_data / ad_personalization = granted).
export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-7530851972602654'

export function loadAdsense() {
  if (typeof document === 'undefined' || !ADSENSE_CLIENT) return
  if (document.querySelector('script[data-adsense]')) return
  const script = document.createElement('script')
  script.async = true
  script.dataset.adsense = '1'
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`
  document.head.appendChild(script)
}
