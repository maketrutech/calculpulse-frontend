// US conversion formulas. Length, mass, and volume factors are the
// international exact values (1959 yard/pound, US liquid gallon).
// Temperature uses the exact Celsius/Fahrenheit definition.

export const POUND_IN_KG = 0.45359237
export const INCH_IN_CM = 2.54
export const MILE_IN_KM = 1.609344
export const US_GALLON_IN_L = 3.785411784
export const FOOT_IN_M = 0.3048
export const SQFT_IN_M2 = FOOT_IN_M * FOOT_IN_M

const num = (value) => (Number.isFinite(value) ? value : NaN)

export function kgToLbs(kg) {
  return num(kg) / POUND_IN_KG
}

export function lbsToKg(lbs) {
  return num(lbs) * POUND_IN_KG
}

export function cmToInches(cm) {
  return num(cm) / INCH_IN_CM
}

export function inchesToCm(inches) {
  return num(inches) * INCH_IN_CM
}

export function celsiusToFahrenheit(celsius) {
  return (num(celsius) * 9) / 5 + 32
}

export function fahrenheitToCelsius(fahrenheit) {
  return ((num(fahrenheit) - 32) * 5) / 9
}

export function kmToMiles(km) {
  return num(km) / MILE_IN_KM
}

export function milesToKm(miles) {
  return num(miles) * MILE_IN_KM
}

export function gallonsToLiters(gallons) {
  return num(gallons) * US_GALLON_IN_L
}

export function litersToGallons(liters) {
  return num(liters) / US_GALLON_IN_L
}

export function m2ToSqFt(m2) {
  return num(m2) / SQFT_IN_M2
}

export function sqFtToM2(sqft) {
  return num(sqft) * SQFT_IN_M2
}

export function squareFeet(lengthFt, widthFt) {
  if (!Number.isFinite(lengthFt) || !Number.isFinite(widthFt)) return NaN
  if (lengthFt < 0 || widthFt < 0) return NaN
  return lengthFt * widthFt
}

export function toFeet(feet, inches = 0) {
  if (!Number.isFinite(feet) || !Number.isFinite(inches)) return NaN
  if (feet < 0 || inches < 0) return NaN
  return feet + inches / 12
}

export function cmToFeetInches(cm) {
  const total = cmToInches(cm)
  if (!Number.isFinite(total)) return null
  const negative = total < 0
  const abs = Math.abs(total)
  const feet = Math.floor(abs / 12 + 1e-12)
  const inches = abs - feet * 12
  return { feet: negative ? -feet : feet, inches }
}
