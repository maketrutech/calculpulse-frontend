const cache = new Map()

export function getCached(path) {
  return cache.get(path) || null
}

export function setCached(path, component) {
  cache.set(path, component)
}
