import site from '../data/site.json'
import { plainText } from './words.js'

export function pageUrl(path) {
  if (!path || path === '/') return `${site.url}/`
  return `${site.url}${path}`
}

export function buildGraph({ title, description, path, crumbs, faqs, app, itemList }) {
  const url = pageUrl(path)
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.publisher,
      url: site.url,
      logo: `${site.url}/logo-512.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${site.url}/#organization` },
      description: 'Calculatrices et convertisseurs gratuits en français : pourcentage, TVA, moyenne, produit en croix, IMC et unités. Tout est calculé dans le navigateur.',
    },
  ]

  if (crumbs?.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: pageUrl(crumb.path),
      })),
    })
  }

  if (app) {
    graph.push({
      '@type': 'WebApplication',
      name: app.name,
      description: app.description || description,
      url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      inLanguage: 'fr-FR',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      publisher: { '@id': `${site.url}/#organization` },
    })
  }

  if (faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: plainText(faq.q),
        acceptedAnswer: {
          '@type': 'Answer',
          text: plainText(faq.a),
        },
      })),
    })
  }

  if (itemList?.length) {
    graph.push({
      '@type': 'ItemList',
      name: title,
      itemListElement: itemList.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: pageUrl(item.path),
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
