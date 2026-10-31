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
  locale,
  faqTitle,
  relatedTitle,
  crumbLabel,
  adLabel,
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
        locale={locale}
      />
      <Breadcrumbs items={crumbs} label={crumbLabel} />
      <h1>{h1}</h1>
      <p className="lede">{lede}</p>
      <section className="tool-stage" aria-label={h1}>
        {children}
      </section>
      <Article sections={sections} vars={vars} />
      <AdSlot placement="content" label={adLabel} />
      <Faq items={faqs} vars={vars} title={faqTitle} />
      <AdSlot placement="bottom" label={adLabel} />
      <Related ids={related} items={relatedItems} title={relatedTitle} />
    </>
  )
}
