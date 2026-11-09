import test from 'node:test'
import assert from 'node:assert/strict'
import { convert } from './units.js'
import * as u from './usConvert.js'

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≠ ${b}`)

test('kilograms and pounds use the exact avoirdupois pound', () => {
  assert.equal(u.lbsToKg(1), u.POUND_IN_KG)
  near(u.kgToLbs(1), 1 / 0.45359237)
  near(u.kgToLbs(70), 154.3235835294143)
  near(u.lbsToKg(u.kgToLbs(70)), 70)
  assert.equal(u.kgToLbs(1), convert(1, 'kg', 'livre'))
  assert.equal(u.lbsToKg(154), convert(154, 'livre', 'kg'))
  assert.ok(Number.isNaN(u.kgToLbs(NaN)))
})

test('centimeters and inches use the exact international inch', () => {
  assert.equal(u.inchesToCm(1), 2.54)
  near(u.cmToInches(2.54), 1)
  near(u.cmToInches(180), 70.86614173228346)
  near(u.inchesToCm(12), 30.48)
  near(u.cmToInches(100), convert(100, 'cm', 'pouce'))
  near(u.inchesToCm(6), convert(6, 'pouce', 'cm'))
  near(u.inchesToCm(6), 15.24)
  const height = u.cmToFeetInches(180)
  assert.equal(height.feet, 5)
  near(height.inches, 10.86614173228346)
})

test('celsius and fahrenheit', () => {
  assert.equal(u.celsiusToFahrenheit(0), 32)
  assert.equal(u.celsiusToFahrenheit(100), 212)
  assert.equal(u.celsiusToFahrenheit(-40), -40)
  near(u.celsiusToFahrenheit(37), 98.6)
  near(u.fahrenheitToCelsius(32), 0)
  near(u.fahrenheitToCelsius(212), 100)
  near(u.fahrenheitToCelsius(98.6), 37)
  near(u.fahrenheitToCelsius(350), 176.66666666666666)
  assert.equal(u.celsiusToFahrenheit(20), convert(20, 'celsius', 'fahrenheit'))
  assert.equal(u.fahrenheitToCelsius(68), convert(68, 'fahrenheit', 'celsius'))
  assert.ok(Number.isNaN(u.celsiusToFahrenheit(undefined)))
})

test('kilometers and statute miles', () => {
  assert.equal(u.milesToKm(1), 1.609344)
  near(u.kmToMiles(1), 1 / 1.609344)
  near(u.kmToMiles(5), 3.1068559611866697)
  near(u.kmToMiles(42.195), 26.21875745645441)
  near(u.milesToKm(26.2), 42.1648128)
  assert.equal(u.kmToMiles(100), convert(100, 'km', 'mile'))
  assert.equal(u.milesToKm(60), convert(60, 'mile', 'km'))
  near(u.milesToKm(u.kmToMiles(42.195)), 42.195)
})

test('US liquid gallons and liters', () => {
  assert.equal(u.gallonsToLiters(1), 3.785411784)
  near(u.litersToGallons(3.785411784), 1)
  near(u.gallonsToLiters(15), 56.78117676)
  near(u.gallonsToLiters(55), 208.19764812)
  near(u.litersToGallons(50), 50 / u.US_GALLON_IN_L)
  assert.equal(u.gallonsToLiters(2), convert(2, 'gallon', 'litre'))
  assert.equal(u.litersToGallons(10), convert(10, 'litre', 'gallon'))
})

test('square feet', () => {
  assert.equal(u.SQFT_IN_M2, 0.3048 * 0.3048)
  assert.equal(u.squareFeet(12, 10), 120)
  assert.equal(u.squareFeet(12.5, 10), 125)
  assert.equal(u.toFeet(5, 6), 5.5)
  assert.equal(u.toFeet(12, 6), 12.5)
  assert.equal(u.squareFeet(u.toFeet(12, 6), u.toFeet(10, 0)), 125)
  assert.ok(Number.isNaN(u.squareFeet(-1, 4)))
  assert.ok(Number.isNaN(u.squareFeet(4, NaN)))
  assert.ok(Number.isNaN(u.toFeet(-1, 0)))
  assert.ok(Number.isNaN(u.toFeet(1, -2)))
  assert.equal(u.sqFtToM2(1), u.SQFT_IN_M2)
  near(u.m2ToSqFt(1), 1 / (0.3048 * 0.3048))
  near(u.m2ToSqFt(u.sqFtToM2(180)), 180)
  near(u.sqFtToM2(180), 16.7225472)
  near(u.m2ToSqFt(20), 215.27820833419443)
})
