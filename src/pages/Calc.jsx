import { ToolPage } from '../components/ToolPage.jsx'
import { toolMap } from '../data/catalog.js'
import { TOOLS } from '../tools/tools.jsx'

export function makeCalc(id, content) {
  const tool = toolMap[id]
  const Widget = TOOLS[content.tool]
  function CalcPage() {
    return (
      <ToolPage
        title={content.title}
        description={content.description}
        path={tool.path}
        h1={content.h1}
        lede={content.lede}
        appName={tool.name}
        crumbs={[{ name: 'Accueil', path: '/' }, { name: tool.name, path: tool.path }]}
        sections={content.sections}
        faqs={content.faqs}
        related={content.related}
      >
        <Widget {...(content.props || {})} />
      </ToolPage>
    )
  }
  CalcPage.displayName = `Calc(${id})`
  return CalcPage
}
