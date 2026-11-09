import { useLocation } from 'react-router-dom'
import { ToolPage } from '../../components/ToolPage.jsx'
import { convertPage } from '../../content/en/convertPages.js'
import { enLink } from '../../data/enMap.js'
import { normalizePath } from '../../lib/path.js'
import { EnConverter } from '../../tools/enWidgets.jsx'

export default function EnglishConvert() {
  const { pathname } = useLocation()
  const page = convertPage(normalizePath(pathname))
  const crumbs = [
    { name: 'Home', path: '/en' },
    { name: 'Unit converter', path: '/en/convert' },
    { name: page.crumb, path: page.path },
  ]
  return (
    <ToolPage
      key={page.path}
      locale="en"
      title={page.title}
      description={page.description}
      path={page.path}
      h1={page.h1}
      lede={page.lede}
      appName={page.h1}
      crumbs={crumbs}
      sections={page.sections}
      faqs={page.faqs}
      relatedItems={page.related.map(enLink).filter(Boolean)}
      faqTitle="Common questions"
      relatedTitle="Related tools"
      crumbLabel="Breadcrumb"
      adLabel="Advertisement"
    >
      <EnConverter key={page.path} {...page.converter} />
    </ToolPage>
  )
}
