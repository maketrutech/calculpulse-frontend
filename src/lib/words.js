export function plainText(text) {
  return String(text)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\{\{\w+\}\}/g, 'date')
}

export function countWords(sections) {
  const chunks = []
  for (const section of sections || []) {
    if (section.h2) chunks.push(section.h2)
    for (const paragraph of section.paragraphs || []) chunks.push(paragraph)
    for (const item of section.list || []) chunks.push(item)
    for (const item of section.steps || []) chunks.push(item)
    if (section.callout) chunks.push(section.callout)
    if (section.table) {
      if (section.table.caption) chunks.push(section.table.caption)
      chunks.push(...(section.table.headers || []))
      for (const row of section.table.rows || []) chunks.push(...row)
    }
  }
  return plainText(chunks.join(' '))
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}
