import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { FooterEn } from './FooterEn.jsx'
import { isEnglishPath } from '../data/enMap.js'
import { normalizePath } from '../lib/path.js'

export function Layout({ children }) {
  const { pathname } = useLocation()
  const en = isEnglishPath(normalizePath(pathname))
  useEffect(() => {
    document.documentElement.lang = en ? 'en' : 'fr'
  }, [en])
  return (
    <>
      <Header />
      <main id="contenu" tabIndex={-1} className="wrap">
        {children}
      </main>
      {en ? <FooterEn /> : <Footer />}
    </>
  )
}
