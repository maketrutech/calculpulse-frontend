export function normalizePath(input) {
  if (!input) return '/'
  const raw = String(input).split('?')[0].split('#')[0]
  if (raw.length > 1 && raw.endsWith('/')) return raw.slice(0, -1)
  return raw || '/'
}
