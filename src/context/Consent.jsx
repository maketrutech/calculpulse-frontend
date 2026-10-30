import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { KEYS, STORAGE_KEYS } from '../lib/keys.js'
import { loadAdsense } from '../lib/adsense.js'
import { readJSON, removeKey, writeJSON } from '../lib/storage.js'

const ConsentContext = createContext(null)

function applyGtag(choice) {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    ad_storage: choice.ads ? 'granted' : 'denied',
    ad_user_data: choice.ads ? 'granted' : 'denied',
    ad_personalization: choice.ads ? 'granted' : 'denied',
    analytics_storage: choice.analytics ? 'granted' : 'denied',
  })
  if (choice.ads) {
    document.documentElement.dataset.ads = '1'
    loadAdsense()
  }
  else delete document.documentElement.dataset.ads
}

export function ConsentProvider({ children }) {
  const [state, setState] = useState({
    ads: false,
    analytics: false,
    banner: false,
    custom: false,
  })

  useEffect(() => {
    const stored = readJSON(KEYS.consent)
    if (stored && typeof stored === 'object') {
      const choice = { ads: Boolean(stored.ads), analytics: Boolean(stored.analytics) }
      applyGtag(choice)
      setState({ ...choice, banner: false, custom: false })
    } else {
      setState((current) => ({ ...current, banner: true }))
    }
  }, [])

  const api = useMemo(() => {
    const save = (choice) => {
      const next = { ads: Boolean(choice.ads), analytics: Boolean(choice.analytics), ts: Date.now() }
      writeJSON(KEYS.consent, next)
      applyGtag(next)
      setState({ ads: next.ads, analytics: next.analytics, banner: false, custom: false })
    }
    return {
      ads: state.ads,
      analytics: state.analytics,
      banner: state.banner,
      custom: state.custom,
      acceptAll: () => save({ ads: true, analytics: true }),
      refuseAll: () => save({ ads: false, analytics: false }),
      saveCustom: (choice) => save(choice),
      openBanner: () => setState((current) => ({ ...current, banner: true, custom: false })),
      showCustom: () => setState((current) => ({ ...current, banner: true, custom: true })),
      clearAll: () => {
        STORAGE_KEYS.forEach((key) => {
          if (key !== KEYS.theme) removeKey(key)
        })
        delete document.documentElement.dataset.ads
        applyGtag({ ads: false, analytics: false })
        setState({ ads: false, analytics: false, banner: true, custom: false })
      },
    }
  }, [state])

  return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>
}

export function useConsent() {
  const value = useContext(ConsentContext)
  if (!value) throw new Error('Consentement indisponible')
  return value
}
