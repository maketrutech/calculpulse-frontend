import { Rich } from './Rich.jsx'

export function Article({ sections, vars }) {
  return (
    <article className="copy">
      {sections.map((section, index) => (
        <section key={section.h2 || index}>
          {section.h2 ? <h2>{section.h2}</h2> : null}
          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p key={`${index}-p-${paragraphIndex}`}><Rich text={paragraph} vars={vars} /></p>
          ))}
          {section.list ? (
            <ul>
              {section.list.map((item, itemIndex) => <li key={`${index}-l-${itemIndex}`}><Rich text={item} vars={vars} /></li>)}
            </ul>
          ) : null}
          {section.steps ? (
            <ol>
              {section.steps.map((item, itemIndex) => <li key={`${index}-s-${itemIndex}`}><Rich text={item} vars={vars} /></li>)}
            </ol>
          ) : null}
          {section.callout ? <aside className="callout"><Rich text={section.callout} vars={vars} /></aside> : null}
          {section.table ? (
            <div className="table-wrap">
              <table>
                <caption>{section.table.caption}</caption>
                <thead>
                  <tr>
                    {section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rowIndex) => (
                    <tr key={`${index}-r-${rowIndex}`}>
                      {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}
    </article>
  )
}
