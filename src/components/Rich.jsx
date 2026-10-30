import { Link } from 'react-router-dom'

export function fill(text, vars = {}) {
  return String(text).replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

export function Rich({ text, vars }) {
  const source = fill(text, vars)
  const re = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
  const out = []
  let last = 0
  let match = re.exec(source)
  let index = 0
  while (match) {
    if (match.index > last) out.push(source.slice(last, match.index))
    const href = match[1]
    const label = match[2]
    if (href.startsWith('/')) {
      out.push(<Link key={index} to={href}>{label}</Link>)
    } else if (href.startsWith('mailto:')) {
      out.push(<a key={index} href={href}>{label}</a>)
    } else {
      out.push(<a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)
    }
    index += 1
    last = match.index + match[0].length
    match = re.exec(source)
  }
  if (last < source.length) out.push(source.slice(last))
  return out
}
