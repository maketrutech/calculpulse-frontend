import { fmtEn } from '../../lib/num.en.js'
import * as u from '../../lib/usConvert.js'

const name = (n, one, many) => (Math.abs(n) === 1 ? one : many)

function factorSteps(spec) {
  const k = spec.convert(1)
  const up = k >= 1
  return spec.examples.map((value) => {
    const result = spec.convert(value)
    const left = `${fmtEn(value, 4)} ${name(value, spec.one, spec.many)}`
    const right = `${fmtEn(result, 4)} ${name(result, spec.outOne, spec.outMany)}`
    return up
      ? `${left}: ${fmtEn(value, 4)} × ${fmtEn(k, 6)} = ${right}.`
      : `${left}: ${fmtEn(value, 4)} ÷ ${fmtEn(1 / k, 6)} = ${right}.`
  })
}

function factorFormula(spec) {
  const k = spec.convert(1)
  return k >= 1
    ? `${spec.outSymbol} = ${spec.symbol} × ${fmtEn(k, 6)}`
    : `${spec.outSymbol} = ${spec.symbol} ÷ ${fmtEn(1 / k, 6)}`
}

function table(spec) {
  return spec.values.map((value) => [
    `${fmtEn(value, 3)} ${spec.symbol}`,
    `${fmtEn(spec.convert(value), spec.digits)} ${spec.outSymbol}`,
  ])
}

const specs = [
  {
    path: '/en/convert/kg-to-lbs',
    from: 'kg',
    to: 'lb',
    title: 'Kg to Lbs Converter: Kilograms to Pounds',
    description: 'Convert kg to lbs with the exact avoirdupois pound (0.45359237 kg). Formula, worked examples, and a table for body weight, luggage, and gym plates.',
    h1: 'Kg to lbs',
    lede: 'Type a weight in kilograms or pounds. One kilogram is about 2.204623 pounds.',
    crumb: 'Kg to lbs',
    one: 'kilogram',
    many: 'kilograms',
    symbol: 'kg',
    outOne: 'pound',
    outMany: 'pounds',
    outSymbol: 'lb',
    digits: 2,
    initial: 70,
    reverse: '/en/convert/pounds-to-kg',
    related: ['/en/convert/pounds-to-kg', '/en/convert/cm-to-inches', '/en/convert', '/en/average-calculator'],
    convert: u.kgToLbs,
    values: [1, 2, 5, 10, 20, 50, 60, 70, 80, 90, 100],
    examples: [1, 70, 100],
    uses: 'In the United States, body weight, checked bags, and gym plates are quoted in pounds, while most other countries use kilograms. A clinic form, a shipping limit, and a recipe that calls for a pound of flour all need the same conversion. The international avoirdupois pound is defined as exactly 0.45359237 kilograms, so one kilogram is 1 ÷ 0.45359237, or about 2.204623 pounds. This converter uses that definition. A rough “times 2.2” is fine for a guess and about 0.2% low.',
    detail: 'Everyday speech says “weight” even though the kilogram is a unit of mass. For a person, a suitcase, or a package on Earth, converting the number is what the form is asking for. Do not use the old French livre of 500 grams, and do not use the troy ounce. Those are different units. Luggage is a common case: 23 kilograms is the usual checked-bag allowance on many international tickets, and 23 × 2.204623 is 50.71 pounds, just over the 50-pound limit some US carriers print on the tag.',
    careful: 'Doubling and adding 10% is a reliable mental check. For 70 kg, double is 140 and 10% of that is 14, so about 154 pounds. The exact result is 154.32 pounds, close enough to catch a decimal slip. If a result is smaller than the number you started with, the conversion was run backwards: pounds are the smaller unit, so the pound figure is always larger than the kilogram figure.',
    faqs: [
      { q: 'How many pounds are in a kilogram?', a: 'One kilogram is exactly 1 ÷ 0.45359237 pounds, about 2.204623 lb. Seventy kilograms is 154.32 lb.' },
      { q: 'Is a pound 2.2 kilograms?', a: 'No. A pound is 0.45359237 kg, and a kilogram is about 2.204623 lb. Multiplying by 2.2 is a shortcut, not the definition.' },
      { q: 'What is 23 kg in pounds?', a: '23 kilograms is 50.71 pounds. A 50-pound bag limit is 22.68 kilograms.' },
    ],
  },
  {
    path: '/en/convert/pounds-to-kg',
    from: 'lb',
    to: 'kg',
    title: 'Pounds to Kg Converter: Lbs to Kilograms',
    description: 'Convert pounds to kg with the exact pound of 0.45359237 kilograms. Useful for body weight, shipping, and recipes written in lbs.',
    h1: 'Pounds to kg',
    lede: 'Type a weight in pounds or kilograms. One pound is exactly 0.45359237 kilograms.',
    crumb: 'Pounds to kg',
    one: 'pound',
    many: 'pounds',
    symbol: 'lb',
    outOne: 'kilogram',
    outMany: 'kilograms',
    outSymbol: 'kg',
    digits: 3,
    initial: 150,
    reverse: '/en/convert/kg-to-lbs',
    related: ['/en/convert/kg-to-lbs', '/en/convert/inches-to-cm', '/en/convert', '/en/margin-calculator'],
    convert: u.lbsToKg,
    values: [1, 5, 10, 20, 50, 100, 120, 150, 180, 200, 250],
    examples: [1, 150, 200],
    uses: 'Pounds to kilograms is the conversion you need when a US scale, a gym plate, or a recipe says lbs and the other side of the conversation uses kilograms. The pound on this page is the international avoirdupois pound, exactly 0.45359237 kilograms, the same pound used for body weight and groceries in the United States. It is not the troy pound used for precious metals, and it is not a casual “half kilo.” Half a kilogram is about 1.102 pounds, so treating a pound as 500 grams is off by about 10%.',
    detail: 'Divide by 2.2 for a quick estimate, then remember the exact factor is a little under that. One hundred fifty pounds is 150 × 0.45359237 = 68.039 kilograms, while 150 ÷ 2.2 is about 68.18. For a medical form or a shipping label, use the exact factor and round to a tenth of a kilogram, or to the hundredth if the form asks for it. Two hundred pounds is 90.719 kilograms, which most people would report as 90.7 kg.',
    careful: 'The kilogram number is always smaller than the pound number, because a kilogram is heavier than a pound. If your result grew, the boxes were swapped. You can check any row by converting it back on the kg to lbs page: 68.039 kg returns to 150 lb, within ordinary rounding.',
    faqs: [
      { q: 'How do I convert pounds to kg?', a: 'Multiply the pounds by 0.45359237. One hundred fifty pounds is 68.039 kilograms.' },
      { q: 'How many kilograms is 200 pounds?', a: '200 × 0.45359237 = 90.719 kilograms.' },
      { q: 'Are lbs and pounds the same?', a: 'Yes. Lb is the abbreviation, from the Latin libra. Lbs is the plural form people write on labels.' },
    ],
  },
  {
    path: '/en/convert/cm-to-inches',
    from: 'cm',
    to: 'in',
    title: 'Cm to Inches Converter: Centimeters to Inches',
    description: 'Convert cm to inches with the exact inch of 2.54 centimeters. Includes a height example in feet and inches, a formula, and a table.',
    h1: 'Cm to inches',
    lede: 'Type a length in centimeters or inches. One inch is exactly 2.54 centimeters.',
    crumb: 'Cm to inches',
    one: 'centimeter',
    many: 'centimeters',
    symbol: 'cm',
    outOne: 'inch',
    outMany: 'inches',
    outSymbol: 'in',
    digits: 2,
    initial: 180,
    reverse: '/en/convert/inches-to-cm',
    related: ['/en/convert/inches-to-cm', '/en/convert/kg-to-lbs', '/en/square-footage-calculator', '/en/convert'],
    convert: u.cmToInches,
    values: [1, 2.54, 10, 30, 50, 100, 150, 160, 170, 180, 190, 200],
    examples: [2.54, 30, 180],
    uses: 'Centimeters to inches comes up for height, screen size, furniture, and anything sold with a metric measurement to a US buyer. The inch has been exactly 2.54 centimeters since the 1959 international yard and pound agreement, so the conversion is a division, not an estimate: inches = centimeters ÷ 2.54. Thirty centimeters is 11.81 inches. A meter, 100 centimeters, is 39.37 inches.',
    detail: 'Height is usually wanted in feet and inches, not as a long decimal. Divide the total inches by 12. The whole number is the feet, and the remainder is the inches. One hundred eighty centimeters is 70.87 inches. That is 5 feet, with 10.87 inches left over, because 5 × 12 = 60 and 70.87 − 60 = 10.87. Rounded to the nearest inch, 180 cm is 5 feet 11 inches. Five foot ten is 177.8 cm, so 180 cm is a little taller than 5′10″.',
    careful: 'A common shortcut is to multiply centimeters by 0.4. That gives 72 inches for 180 cm, about an inch too high. Dividing by 2.5 is closer: 180 ÷ 2.5 = 72 is still high, because the true divisor is 2.54, and 180 ÷ 2.54 = 70.87. For a doorway, a TV, or a tailoring measurement, use 2.54 and keep one decimal place. The inches-to-cm page runs the same factor in the other direction.',
    faqs: [
      { q: 'How many inches is 180 cm?', a: '180 ÷ 2.54 = 70.87 inches, which is 5 feet and 10.87 inches, or about 5′11″ when the inches are rounded.' },
      { q: 'How do you convert cm to inches?', a: 'Divide the centimeters by 2.54. One centimeter is 0.3937 inches.' },
      { q: 'Is 1 inch exactly 2.54 cm?', a: 'Yes. The international inch is defined as exactly 2.54 centimeters.' },
    ],
  },
  {
    path: '/en/convert/inches-to-cm',
    from: 'in',
    to: 'cm',
    title: 'Inches to Cm Converter: Inches to Centimeters',
    description: 'Convert inches to cm by multiplying by 2.54, the exact length of an inch. Formula, screen and height examples, and a conversion table.',
    h1: 'Inches to cm',
    lede: 'Type a length in inches or centimeters. Multiply inches by 2.54 to get centimeters.',
    crumb: 'Inches to cm',
    one: 'inch',
    many: 'inches',
    symbol: 'in',
    outOne: 'centimeter',
    outMany: 'centimeters',
    outSymbol: 'cm',
    digits: 2,
    initial: 55,
    reverse: '/en/convert/cm-to-inches',
    related: ['/en/convert/cm-to-inches', '/en/convert/km-to-miles', '/en/square-footage-calculator', '/en/convert'],
    convert: u.inchesToCm,
    values: [1, 6, 12, 24, 27, 32, 36, 48, 55, 60, 65, 72],
    examples: [1, 12, 55],
    uses: 'Inches to centimeters is the conversion behind TV sizes, monitor diagonals, tire sidewalls, and height written as feet and inches. The inch is exactly 2.54 centimeters, so a foot, which is 12 inches, is exactly 30.48 centimeters. A 55-inch screen is a 55-inch diagonal, not the width: 55 × 2.54 = 139.7 centimeters from corner to corner of the panel, frame not included.',
    detail: 'To convert a height such as 5 feet 10 inches, turn it into inches first. Five feet is 60 inches, plus 10 is 70 inches. Then 70 × 2.54 = 177.8 centimeters. Six feet is 72 × 2.54 = 182.88 centimeters, usually written 183 cm. For a piece of furniture, keep the tenth of a centimeter; for a conversation about height, the whole centimeter is enough.',
    careful: 'Multiplying by 2.5 instead of 2.54 drops 1.6%. On a 65-inch television that is more than 2.5 centimeters of diagonal, enough to matter if you are checking whether the set fits a cabinet. Also remember that a screen size is the diagonal of the display, measured corner to corner, not the width of the stand.',
    faqs: [
      { q: 'What is 1 inch in cm?', a: 'Exactly 2.54 centimeters.' },
      { q: 'How many centimeters is a foot?', a: 'Twelve inches × 2.54 = 30.48 centimeters.' },
      { q: 'How wide is a 55-inch TV in cm?', a: 'The diagonal is 55 × 2.54 = 139.7 cm. The width depends on the aspect ratio and the bezel, so check the manufacturer’s width before you buy a stand.' },
    ],
  },
  {
    path: '/en/convert/celsius-to-fahrenheit',
    from: 'c',
    to: 'f',
    temp: 'c2f',
    title: 'Celsius to Fahrenheit Converter (°C to °F)',
    description: 'Convert Celsius to Fahrenheit with °F = °C × 9/5 + 32. Weather, body temperature, and oven examples, plus a table of common temperatures.',
    h1: 'Celsius to Fahrenheit',
    lede: 'Type a temperature in Celsius or Fahrenheit. Water freezes at 32 °F and boils at 212 °F.',
    crumb: 'Celsius to Fahrenheit',
    symbol: '°C',
    outSymbol: '°F',
    digits: 1,
    initial: 20,
    reverse: '/en/convert/fahrenheit-to-celsius',
    related: ['/en/convert/fahrenheit-to-celsius', '/en/convert/km-to-miles', '/en/convert', '/en/percentage-calculator'],
    convert: u.celsiusToFahrenheit,
    values: [-40, -18, 0, 10, 20, 25, 30, 37, 100, 180, 200],
    examples: [0, 20, 180],
    uses: 'Celsius to Fahrenheit is the weather and kitchen conversion for anyone reading a US forecast or a US oven dial. The scales do not share a zero, so you cannot multiply by a single factor. The definition is °F = °C × 9/5 + 32, which is the same as multiplying by 1.8 and then adding 32. Zero degrees Celsius, the freezing point of water, is 32 °F. One hundred degrees Celsius, boiling at ordinary pressure, is 212 °F. The gap between those two points is 100 Celsius degrees and 180 Fahrenheit degrees.',
    detail: 'A room at 20 °C is 68 °F. A warm day at 30 °C is 86 °F. Normal body temperature, 37 °C, is 98.6 °F. An oven at 180 °C is 356 °F, and 200 °C is 392 °F. The two scales meet at −40: −40 °C is −40 °F, which is a useful check if a result looks impossible. A shortcut for weather is to double the Celsius figure and add 30. For 20 °C that gives 70 °F, two degrees above the real 68 °F. Use the full formula for an oven or a fever.',
    careful: 'Adding 32 without scaling is the usual mistake, and it is far off: 20 + 32 = 52, not 68. The 9/5 has to happen first. You can also go the other way on this page by typing in the Fahrenheit box. The dedicated Fahrenheit to Celsius page explains that direction with its own examples.',
    faqs: [
      { q: 'What is the formula for Celsius to Fahrenheit?', a: '°F = °C × 9/5 + 32. Twenty degrees Celsius is 20 × 1.8 + 32 = 68 °F.' },
      { q: 'What is 37 °C in Fahrenheit?', a: '37 × 9/5 + 32 = 98.6 °F, the usual figure for normal body temperature.' },
      { q: 'At what temperature are Celsius and Fahrenheit the same?', a: 'At −40 degrees. −40 °C = −40 °F.' },
    ],
  },
  {
    path: '/en/convert/fahrenheit-to-celsius',
    from: 'f',
    to: 'c',
    temp: 'f2c',
    title: 'Fahrenheit to Celsius Converter (°F to °C)',
    description: 'Convert Fahrenheit to Celsius with °C = (°F − 32) × 5/9. Weather, fever, and oven examples, with the exact formula and a table.',
    h1: 'Fahrenheit to Celsius',
    lede: 'Type a temperature in Fahrenheit or Celsius. Subtract 32, then multiply by 5/9.',
    crumb: 'Fahrenheit to Celsius',
    symbol: '°F',
    outSymbol: '°C',
    digits: 1,
    initial: 72,
    reverse: '/en/convert/celsius-to-fahrenheit',
    related: ['/en/convert/celsius-to-fahrenheit', '/en/convert/miles-to-km', '/en/convert', '/en/discount-calculator'],
    convert: u.fahrenheitToCelsius,
    values: [-40, 0, 32, 50, 68, 70, 72, 98.6, 212, 350, 400],
    examples: [32, 72, 350],
    uses: 'Fahrenheit to Celsius is how you read a US forecast, a US thermostat, or an American recipe when you think in Celsius. Subtract 32 first, then multiply by 5/9: °C = (°F − 32) × 5/9. Freezing, 32 °F, becomes 0 °C. Boiling, 212 °F, becomes 100 °C. A pleasant room at 72 °F is 22.2 °C. Body temperature of 98.6 °F is 37 °C.',
    detail: 'Ovens are where the order of operations matters most. A recipe set to 350 °F is (350 − 32) × 5/9 = 176.7 °C, which cooks like a 180 °C oven. Four hundred degrees Fahrenheit is 204.4 °C. For weather, a rough trick is to subtract 30 and divide by 2: 80 °F is about 25 °C, and the exact value is 26.7 °C. That shortcut is fine for deciding whether to take a jacket. It is not fine for a fever or a roast.',
    careful: 'Dividing by 2 before subtracting 32 gives nonsense, because the scales are shifted. Work from the formula in order: subtract 32, multiply by 5, divide by 9. Minus 40 is the identity check on both pages: −40 °F is −40 °C. If you need the other direction, the Celsius to Fahrenheit page adds 32 after scaling by 9/5.',
    faqs: [
      { q: 'How do you convert Fahrenheit to Celsius?', a: 'Subtract 32, then multiply by 5/9. For 72 °F: (72 − 32) × 5/9 = 22.2 °C.' },
      { q: 'What is 350 °F in Celsius?', a: '(350 − 32) × 5/9 = 176.7 °C, close to a 180 °C oven setting.' },
      { q: 'What is 98.6 °F in Celsius?', a: '98.6 °F is 37 °C.' },
    ],
  },
  {
    path: '/en/convert/km-to-miles',
    from: 'km',
    to: 'mi',
    title: 'Km to Miles Converter: Kilometers to Miles',
    description: 'Convert km to miles with the exact statute mile of 1.609344 kilometers. Road distances, a marathon example, and a conversion table.',
    h1: 'Km to miles',
    lede: 'Type a distance in kilometers or miles. One mile is exactly 1.609344 kilometers.',
    crumb: 'Km to miles',
    one: 'kilometer',
    many: 'kilometers',
    symbol: 'km',
    outOne: 'mile',
    outMany: 'miles',
    outSymbol: 'mi',
    digits: 2,
    initial: 5,
    reverse: '/en/convert/miles-to-km',
    related: ['/en/convert/miles-to-km', '/en/convert/celsius-to-fahrenheit', '/en/convert', '/en/proportion-calculator'],
    convert: u.kmToMiles,
    values: [1, 5, 10, 21.0975, 42.195, 50, 100, 200],
    examples: [1, 5, 42.195],
    uses: 'Kilometers to miles is the road and race conversion. The mile on this page is the international statute mile, exactly 1.609344 kilometers, or 5,280 feet. It is not the nautical mile of 1.852 kilometers, which is used at sea and in aviation. A kilometer is shorter than a mile, so the mile number is smaller: 5 kilometers is 3.11 miles, and 10 kilometers is 6.21 miles.',
    detail: 'A marathon is 42.195 kilometers by the standard course distance. Dividing by 1.609344 gives 26.219 miles, which is why the race is called 26.2 miles. A half marathon, 21.0975 km, is 13.109 miles. For a drive, multiplying kilometers by 0.62 is a fair mental estimate: 100 km is about 62 miles, and the exact figure is 62.14 miles. The error in that shortcut is under half a percent.',
    careful: 'If the result is larger than the kilometers you typed, the conversion ran toward kilometers instead of miles. Five miles is a bit over 8 kilometers, which is the Fibonacci memory trick in the other direction: 5 miles ≈ 8 km, so 8 km ≈ 5 miles and 5 km ≈ 3.1 miles. Use the miles to km page when the sign, the odometer, or the race is already in miles.',
    faqs: [
      { q: 'How many miles is 1 km?', a: 'One kilometer is 0.621371 miles, because a mile is exactly 1.609344 kilometers.' },
      { q: 'How many miles is a 5K?', a: 'Five kilometers is 3.11 miles.' },
      { q: 'Is a marathon 26.2 miles?', a: 'Yes, as a rounded figure. The exact course is 42.195 km, which is 26.219 miles.' },
    ],
  },
  {
    path: '/en/convert/miles-to-km',
    from: 'mi',
    to: 'km',
    title: 'Miles to Km Converter: Miles to Kilometers',
    description: 'Convert miles to km with the exact statute mile (1.609344 km). Road trips, running distances, and a table from 1 mile to 100 miles.',
    h1: 'Miles to km',
    lede: 'Type a distance in miles or kilometers. Multiply miles by 1.609344.',
    crumb: 'Miles to km',
    one: 'mile',
    many: 'miles',
    symbol: 'mi',
    outOne: 'kilometer',
    outMany: 'kilometers',
    outSymbol: 'km',
    digits: 2,
    initial: 10,
    reverse: '/en/convert/km-to-miles',
    related: ['/en/convert/km-to-miles', '/en/convert/gallons-to-liters', '/en/convert', '/en/simple-interest-calculator'],
    convert: u.milesToKm,
    values: [1, 3.1, 5, 10, 13.1, 26.2, 50, 60, 100],
    examples: [1, 26.2, 100],
    uses: 'Miles to kilometers turns a US road sign, a training plan, or a car’s range into the unit used on most of the rest of the world’s maps. The statute mile is exactly 1.609344 kilometers. One mile is a bit more than one and a half kilometers. Ten miles is 16.09 kilometers. One hundred miles is 160.93 kilometers. Multiplying by 1.6 is a good check; multiplying by 8/5 is the same shortcut, since 8/5 = 1.6.',
    detail: 'Race distances are often remembered in miles even when the course was measured in meters. The figure 26.2 miles is 42.16 kilometers, a hair under the official marathon of 42.195 km (which is 26.219 miles). A 5-mile park loop is 8.05 kilometers. A 60-mile drive is 96.56 kilometers. None of these use the nautical mile. If a chart says nmi or NM, do not use this factor.',
    careful: 'The kilometer result should be larger than the mile result. A result that shrank means the division was used instead of the multiplication. You can audit a number by sending it through km to miles: 16.09 km comes back as 10 miles, aside from rounding at the second decimal.',
    faqs: [
      { q: 'How do you convert miles to km?', a: 'Multiply by 1.609344. Ten miles is 16.09 kilometers.' },
      { q: 'How many kilometers is 26.2 miles?', a: '26.2 × 1.609344 = 42.16 kilometers. The certified marathon distance is 42.195 km.' },
      { q: 'Is a mile 1.6 km?', a: 'A mile is exactly 1.609344 km. Using 1.6 is about 0.6% low.' },
    ],
  },
  {
    path: '/en/convert/gallons-to-liters',
    from: 'gal',
    to: 'l',
    title: 'Gallons to Liters Converter (US Gallons)',
    description: 'Convert US gallons to liters. One US liquid gallon is exactly 3.785411784 liters. Formula, a full tank example, and a table.',
    h1: 'Gallons to liters',
    lede: 'Type a volume in US gallons or liters. One US gallon is 3.785411784 liters.',
    crumb: 'Gallons to liters',
    one: 'US gallon',
    many: 'US gallons',
    symbol: 'gal',
    outOne: 'liter',
    outMany: 'liters',
    outSymbol: 'L',
    digits: 3,
    initial: 15,
    reverse: '/en/convert/liters-to-gallons',
    related: ['/en/convert/liters-to-gallons', '/en/convert/miles-to-km', '/en/convert', '/en/discount-calculator'],
    convert: u.gallonsToLiters,
    values: [0.5, 1, 2, 5, 10, 15, 16, 20, 55],
    examples: [1, 15, 55],
    uses: 'This page converts the US liquid gallon, the gallon on American gas pumps, milk jugs, and aquarium labels. It is defined as exactly 3.785411784 liters, which is 231 cubic inches. It is not the British imperial gallon of 4.54609 liters. Using the imperial gallon here would overstate the volume by about 20%. A US gallon is a bit under 3.8 liters. Fifteen US gallons, a modest car tank, is 56.781 liters.',
    detail: 'Fuel prices need the same factor. A price per gallon divided by 3.785411784 is the price per liter. At $3.50 a gallon, that is $0.92 a liter, because 3.50 ÷ 3.785411784 = 0.9246. A 55-gallon drum is 208.198 liters, the figure people round to 208 liters. A 16-gallon fuel can is 60.567 liters. For cooking, a US gallon is 128 US fluid ounces, and this page stays with gallons and liters rather than cups.',
    careful: 'Multiply, do not divide, when you start from gallons: the liter number is almost four times the gallon number. If you got a smaller number, you converted liters to gallons instead. The imperial gallon still appears on some UK and Canadian labels. If the label says “imp gal” or the product is from Britain, do not use 3.785. This converter will say so in the result line by calling the unit a US gallon.',
    faqs: [
      { q: 'How many liters are in a gallon?', a: 'One US liquid gallon is exactly 3.785411784 liters. The imperial gallon is 4.54609 liters and is not used here.' },
      { q: 'How many liters is 15 gallons?', a: '15 × 3.785411784 = 56.781 liters.' },
      { q: 'How do I turn a price per gallon into a price per liter?', a: 'Divide the price by 3.785411784. At $3.50 per gallon, the price is about $0.92 per liter.' },
    ],
  },
  {
    path: '/en/convert/liters-to-gallons',
    from: 'l',
    to: 'gal',
    title: 'Liters to Gallons Converter (US Gallons)',
    description: 'Convert liters to US gallons. Divide by 3.785411784, the exact size of a US liquid gallon. Examples for fuel tanks and a conversion table.',
    h1: 'Liters to gallons',
    lede: 'Type a volume in liters or US gallons. Divide liters by 3.785411784.',
    crumb: 'Liters to gallons',
    one: 'liter',
    many: 'liters',
    symbol: 'L',
    outOne: 'US gallon',
    outMany: 'US gallons',
    outSymbol: 'gal',
    digits: 3,
    initial: 50,
    reverse: '/en/convert/gallons-to-liters',
    related: ['/en/convert/gallons-to-liters', '/en/convert/km-to-miles', '/en/convert', '/en/square-footage-calculator'],
    convert: u.litersToGallons,
    values: [1, 2, 5, 10, 20, 40, 50, 60, 100],
    examples: [1, 50, 100],
    uses: 'Liters to US gallons is the conversion for a fuel tank, a water heater, or a bottle size that was measured in liters and needs to be compared with a US capacity. Divide by 3.785411784, the exact number of liters in a US liquid gallon. One liter is 0.264172 gallons. Fifty liters is 13.209 gallons. One hundred liters is 26.417 gallons. The result is in US liquid gallons, not imperial gallons.',
    detail: 'A car with a 60-liter tank holds 15.850 US gallons. A 2-liter bottle is 0.528 gallons, a little over half a US gallon. An aquarium listed as 200 liters holds 52.835 US gallons. Dividing by 3.8 is a workable estimate: 50 ÷ 3.8 is 13.16, against the exact 13.209. The difference shows up when you are buying fuel for a long trip or comparing two tanks, so keep the exact factor for anything you will pay for.',
    careful: 'An imperial gallon is larger, so the same liters would be fewer imperial gallons. Fifty liters is about 11.0 imperial gallons, not 13.2. If you are reading a UK fuel figure, this page will not match it on purpose. Going back through gallons to liters should return your starting number, aside from rounding to three decimals in the table.',
    faqs: [
      { q: 'How many gallons is 1 liter?', a: 'One liter is 0.264172 US gallons.' },
      { q: 'How many gallons is 50 liters?', a: '50 ÷ 3.785411784 = 13.209 US gallons.' },
      { q: 'Why is a US gallon smaller than an imperial gallon?', a: 'They were defined separately. The US liquid gallon is 231 cubic inches (3.785411784 L). The imperial gallon is 4.54609 L.' },
    ],
  },
]

function tempSteps(spec) {
  return spec.examples.map((value) => {
    const result = spec.convert(value)
    if (spec.temp === 'c2f') {
      return `${fmtEn(value, 2)} °C: ${fmtEn(value, 2)} × 9/5 + 32 = ${fmtEn(result, 2)} °F.`
    }
    return `${fmtEn(value, 2)} °F: (${fmtEn(value, 2)} − 32) × 5/9 = ${fmtEn(result, 2)} °C.`
  })
}

function build(spec) {
  const formula = spec.temp === 'c2f'
    ? '°F = °C × 9/5 + 32'
    : spec.temp === 'f2c'
      ? '°C = (°F − 32) × 5/9'
      : factorFormula(spec)
  const steps = spec.temp ? tempSteps(spec) : factorSteps(spec)
  const sections = [
    {
      h2: 'The exact conversion',
      paragraphs: [spec.uses, `The formula used above is ${formula}. Both boxes stay in step, so you can start from either unit. Results are rounded for display; the factor itself is the legal definition, not a rounded shortcut.`],
    },
    {
      h2: 'Worked examples',
      paragraphs: ['Each line is the same formula with a new starting number. You can match it against the converter by typing the value on the left.'],
      list: steps,
    },
    {
      h2: 'Where the rounding matters',
      paragraphs: [spec.detail, spec.careful],
    },
    {
      h2: `Conversion table: ${spec.h1.toLowerCase()}`,
      table: {
        caption: `${spec.h1} for common values`,
        headers: [spec.symbol, spec.outSymbol],
        rows: table(spec),
      },
    },
  ]
  return {
    path: spec.path,
    title: `${spec.title} | CalculPulse`,
    description: spec.description,
    h1: spec.h1,
    lede: spec.lede,
    crumb: spec.crumb,
    converter: { from: spec.from, to: spec.to, initial: spec.initial, reversePath: spec.reverse },
    sections,
    faqs: spec.faqs,
    related: spec.related,
  }
}

export const convertPages = specs.map(build)

const byPath = new Map(convertPages.map((page) => [page.path, page]))

export function convertPage(path) {
  return byPath.get(path) || null
}
