import { AdSlot } from './AdSlot.jsx'
import { Article } from './Article.jsx'
import { Breadcrumbs } from './Breadcrumbs.jsx'
import { Faq } from './Faq.jsx'
import { Related } from './Related.jsx'
import { Seo } from './Seo.jsx'

export function ToolPage({
  title,
  description,
  path,
  h1,
  lede,
  appName,
  crumbs,
  sections,
  faqs,
  related,
  relatedItems,
  vars,
  children,
}) {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        crumbs={crumbs}
        faqs={faqs}
        app={{ name: appName || h1, description }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>{h1}</h1>
      <p className="lede">{lede}</p>
      <section className="tool-stage" aria-label={h1}>
        {children}
      </section>
      <Article sections={sections} vars={vars} />
      <AdSlot placement="content" />
      <Faq items={faqs} vars={vars} />
      <AdSlot placement="bottom" />
      <Related ids={related} items={relatedItems} />
    </>
  )
}
