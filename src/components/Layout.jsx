import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="contenu" tabIndex={-1} className="wrap">
        {children}
      </main>
      <Footer />
    </>
  )
}
