import test from 'node:test'
import assert from 'node:assert/strict'
import { tools } from '../data/catalog.js'
import { pairs as conversions, convPath } from '../data/conversions.js'
import { pairs, switchTarget } from '../data/enMap.js'

test('english pairs use real french urls and skip france-only tools', () => {
  const french = new Set(['/', ...tools.map((tool) => tool.path), ...conversions.map((pair) => convPath(pair.slug))])
  const seen = new Set()
  for (const pair of pairs) {
    assert.ok(french.has(pair.fr), pair.fr)
    assert.equal(seen.has(pair.en), false)
    seen.add(pair.en)
    assert.ok(pair.en === '/en' || pair.en.startsWith('/en/'))
    assert.equal(pair.fr.includes('tva'), false)
    assert.equal(pair.fr.includes('note-sur-20'), false)
    assert.equal(pair.fr.includes('imc'), false)
    assert.equal(switchTarget(pair.fr), pair.en)
    assert.equal(switchTarget(pair.en), pair.fr)
  }
  assert.equal(switchTarget('/mentions-legales'), '/en')
  assert.equal(switchTarget('/en/missing'), '/')
})
