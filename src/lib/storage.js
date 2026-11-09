export function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota or private mode */
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}
