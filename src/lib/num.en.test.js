import test from 'node:test'
import assert from 'node:assert/strict'
import { fmtEn, moneyUsd, parseNumEn, pctEn } from './num.en.js'

test('parseNumEn reads US numbers', () => {
  assert.equal(parseNumEn('1.5'), 1.5)
  assert.equal(parseNumEn('1,234'), 1234)
  assert.equal(parseNumEn('1,234.56'), 1234.56)
  assert.equal(parseNumEn('$1,250.50'), 1250.5)
  assert.equal(parseNumEn('18%'), 18)
  assert.equal(parseNumEn('−2.5'), -2.5)
  assert.ok(Number.isNaN(parseNumEn('1,5')))
  assert.ok(Number.isNaN(parseNumEn('')))
  assert.ok(Number.isNaN(parseNumEn('12.3.4')))
})

test('fmtEn and dollars', () => {
  assert.equal(fmtEn(1234.5), '1,234.5')
  assert.equal(fmtEn(2.2046226218, 6), '2.204623')
  assert.equal(fmtEn(-2.005, 2), '−2.01')
  assert.equal(moneyUsd(12), '$12.00')
  assert.equal(moneyUsd(-3.5), '−$3.50')
  assert.equal(moneyUsd(154.324), '$154.32')
  assert.equal(pctEn(37.5), '37.5%')
  assert.equal(fmtEn(NaN), '—')
})
