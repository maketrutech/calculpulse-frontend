import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Google Analytics 4 via gtag.js. Consent Mode v2 defaults (all denied) are set inline in
// index.html before anything else; the consent context sends the "update" after a choice.
// The script is injected after the window load event so it never blocks rendering.
const GA_ID = import.meta.env.VITE_GA_ID

let started = false
function startGtag() {
  if (started || !GA_ID || typeof window === 'undefined') return
  started = true
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
  const inject = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
  }
  if (document.readyState === 'complete') setTimeout(inject, 0)
  else window.addEventListener('load', () => setTimeout(inject, 0), { once: true })
}

export function PageViews() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (!GA_ID) return undefined
    startGtag()
    // Let the page update its <title> before reading it.
    const t = setTimeout(() => {
      window.gtag('event', 'page_view', {
        send_to: GA_ID,
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      })
    }, 50)
    return () => clearTimeout(t)
  }, [pathname, search])
  return null
}
