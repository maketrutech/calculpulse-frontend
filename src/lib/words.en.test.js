import test from 'node:test'
import assert from 'node:assert/strict'
import { decimalToWords, dollarsToWords, integerToWords } from './words.en.js'

test('american english integers', () => {
  assert.equal(integerToWords(0), 'zero')
  assert.equal(integerToWords(21), 'twenty-one')
  assert.equal(integerToWords(80), 'eighty')
  assert.equal(integerToWords(101), 'one hundred one')
  assert.equal(integerToWords(1000), 'one thousand')
  assert.equal(integerToWords(2026), 'two thousand twenty-six')
  assert.equal(integerToWords(1984), 'one thousand nine hundred eighty-four')
  assert.equal(integerToWords(1234567), 'one million two hundred thirty-four thousand five hundred sixty-seven')
  assert.equal(integerToWords(-1), null)
  assert.equal(integerToWords(1.5), null)
})

test('decimals and dollars', () => {
  assert.equal(decimalToWords('3.05'), 'three point zero five')
  assert.equal(decimalToWords('1,250.50'), 'one thousand two hundred fifty point five zero')
  assert.equal(decimalToWords('-12'), 'negative twelve')
  assert.equal(dollarsToWords(1), 'one dollar')
  assert.equal(dollarsToWords(0), 'zero dollars')
  assert.equal(dollarsToWords(20), 'twenty dollars')
  assert.equal(dollarsToWords(1.01), 'one dollar and one cent')
  assert.equal(dollarsToWords(0.5), 'fifty cents')
  assert.equal(dollarsToWords(1250.5), 'one thousand two hundred fifty dollars and fifty cents')
  assert.equal(dollarsToWords(1.005), 'one dollar and one cent')
  assert.equal(dollarsToWords(-2), null)
})
