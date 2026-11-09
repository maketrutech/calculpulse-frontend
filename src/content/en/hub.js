export const hub = {
  title: 'Unit Converter: kg, inches, miles, °F, gallons | CalculPulse',
  description: 'Free unit converter for the US: kg to lbs, cm to inches, Celsius to Fahrenheit, km to miles, and US gallons to liters. Exact factors, both directions.',
  h1: 'Unit converter',
  lede: 'Ten converters for the pairs US readers look up: weight, length, temperature, distance, and US gallons. Each one runs in both directions and shows the exact factor.',
  sections: [
    {
      h2: 'Exact factors, not rounded rules of thumb',
      paragraphs: [
        'These converters use the definitions, not a mnemonic. The international avoirdupois pound is exactly 0.45359237 kilograms, so a kilogram is about 2.204623 pounds. The inch is exactly 2.54 centimeters, and the foot, 12 inches, is exactly 30.48 centimeters. The statute mile is exactly 1.609344 kilometers. The US liquid gallon is exactly 3.785411784 liters. Temperature is not a factor at all: Fahrenheit equals Celsius times 9/5, plus 32, because the scales do not share a zero.',
        'A shortcut is useful for a guess and a poor substitute when the number will be typed on a form. Multiplying kilograms by 2.2 undershoots the pound by about 0.2%. Multiplying miles by 1.6 undershoots the kilometer by about 0.6%. Dividing centimeters by 2.5 instead of 2.54 overshoots the inches. Each conversion page shows the shortcut next to the exact result so you can see the gap on a real input, such as 70 kilograms or a 5 kilometer run.',
      ],
    },
    {
      h2: 'How to use a converter',
      steps: [
        'Pick the pair. Kilograms and pounds are weight. Centimeters and inches are length. Kilometers and miles are distance. Celsius and Fahrenheit are temperature. Gallons and liters are US liquid volume.',
        'Type in either box. The other box updates as you type. A point is the decimal separator, and a comma may group thousands.',
        'Use the reverse link if you want the page written from the other unit. Both pages share the same factor.',
        'Read the worked example and the table before you round. The table is the exact factor, displayed to a few decimal places.',
      ],
    },
    {
      h2: 'Which gallon, which mile',
      paragraphs: [
        '“Gallon” on this site means the US liquid gallon. The imperial gallon used in the United Kingdom is 4.54609 liters, about 20% larger. A 15-gallon US tank is 56.781 liters. The same 15 imperial gallons would be about 68 liters, and this converter will not produce that number. If a label says imp gal, do not use these pages for it.',
        '“Mile” means the statute mile of 5,280 feet, the mile on US road signs and running watches. The nautical mile is 1.852 kilometers and is a different unit, used at sea and in the air. A marathon is 42.195 kilometers, which is 26.219 statute miles and is commonly called 26.2. The km to miles page shows that figure explicitly so the rounded name and the exact course are not confused.',
      ],
    },
    {
      h2: 'What these pages do not convert',
      paragraphs: [
        'Screen sizes, recipe cups, and acres are left off this English set on purpose. The ten pages here are the high-volume pairs, each with its own explanation. Square footage of a room is a calculator rather than a unit pair: length times width, in feet and inches, with square meters as a second result. That tool lives with the other calculators, not in this list.',
        'Nothing is uploaded when you convert a number. The factor is applied in the browser. You can leave the page and the value is gone. For a percentage, a margin, or an average, go back to the English home and open that calculator. The unit list above stays available from the Convert link in the header.',
      ],
    },
  ],
  faqs: [
    { q: 'What does 1 kg equal in pounds?', a: 'About 2.204623 pounds. The pound is defined as exactly 0.45359237 kilograms.' },
    { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply by 9/5 and add 32. 20 °C is 68 °F. 0 °C is 32 °F.' },
    { q: 'Are these US gallons or imperial gallons?', a: 'US liquid gallons. One US gallon is exactly 3.785411784 liters. The imperial gallon is larger and is not used here.' },
  ],
}

export const hubGroups = [
  {
    id: 'weight',
    label: 'Weight',
    links: [
      ['/en/convert/kg-to-lbs', 'Kg to lbs'],
      ['/en/convert/pounds-to-kg', 'Pounds to kg'],
    ],
  },
  {
    id: 'length',
    label: 'Length and distance',
    links: [
      ['/en/convert/cm-to-inches', 'Cm to inches'],
      ['/en/convert/inches-to-cm', 'Inches to cm'],
      ['/en/convert/km-to-miles', 'Km to miles'],
      ['/en/convert/miles-to-km', 'Miles to km'],
    ],
  },
  {
    id: 'temp',
    label: 'Temperature',
    links: [
      ['/en/convert/celsius-to-fahrenheit', 'Celsius to Fahrenheit'],
      ['/en/convert/fahrenheit-to-celsius', 'Fahrenheit to Celsius'],
    ],
  },
  {
    id: 'volume',
    label: 'Volume',
    links: [
      ['/en/convert/gallons-to-liters', 'Gallons to liters'],
      ['/en/convert/liters-to-gallons', 'Liters to gallons'],
    ],
  },
]
