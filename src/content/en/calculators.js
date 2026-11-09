import * as c from '../../lib/calc.js'
import { fmtEn, moneyUsd, pctEn } from '../../lib/num.en.js'
import * as u from '../../lib/usConvert.js'
import { dollarsToWords, integerToWords } from '../../lib/words.en.js'

const scores = [78, 85, 90, 73, 88]
const scoreSum = scores.reduce((s, n) => s + n, 0)
const scoreMean = c.mean(scores)
const scoreMedian = c.median(scores)

const weights = [90, 84, 76]
const credits = [3, 3, 4]
const weighted = c.weightedMean(weights, credits)

const series = [2, 4, 4, 4, 5, 5, 7, 9]
const popSd = c.stdDev(series, false)
const sampleSd = c.stdDev(series, true)
const popVar = c.variance(series, false)
const sampleVar = c.variance(series, true)

const room = u.squareFeet(12, 15)
const roomM2 = u.sqFtToM2(room)
const inchesRoom = u.squareFeet(u.toFeet(12, 6), u.toFeet(10, 0))
const fromM2 = u.m2ToSqFt(20)

const marginEx = c.margin(50, 80)
const priceAtMargin = c.priceFromMarginRate(60, 25)
const priceAtMarkup = c.priceFromMarkup(60, 25)

const interest = c.simpleInterest(10000, 5, 3)
const sqrt72 = c.simplifySqrt(72)

const pages = [
  {
    path: '/en/percentage-calculator',
    widget: 'percentage',
    title: 'Percentage Calculator | CalculPulse',
    description: 'Percentage calculator: find X% of a number, what percent one number is of another, or the whole when you know the part. Formulas and a worked example.',
    h1: 'Percentage calculator',
    lede: 'Three related questions: what is 18% of 250, what percent 45 is of 250, and what number 45 is 18% of.',
    crumb: 'Percentage calculator',
    related: ['/en/percentage-increase-calculator', '/en/discount-calculator', '/en/proportion-calculator', '/en/margin-calculator'],
    sections: [
      {
        h2: 'How to calculate a percentage',
        paragraphs: [
          'A percentage is a fraction with a denominator of 100. Eighteen percent means 18 parts out of 100, or 0.18. To find X% of a number, multiply the number by X and divide by 100. Eighteen percent of 250 is 250 × 18 ÷ 100. First, 250 × 18 = 4,500. Then 4,500 ÷ 100 = 45. So 18% of 250 is 45. In money, 18% of $250.00 is $45.00.',
          'The other two questions are the same relationship rearranged. The part divided by the whole, times 100, is the percent: 45 ÷ 250 × 100 = 18%. If you know the part and the percent, the whole is part × 100 ÷ percent: 45 × 100 ÷ 18 = 250. All three are one proportion. The part is to the whole as the percent is to 100.',
        ],
      },
      {
        h2: 'Worked example',
        paragraphs: ['A shop adds an 8.5% charge to a $64.00 order. The charge is not the whole bill. It is 8.5% of 64.'],
        list: [
          'Write 8.5% as 8.5 ÷ 100 = 0.085.',
          `Multiply: 64 × 0.085 = ${fmtEn(c.percentOf(8.5, 64), 2)}.`,
          `The charge is ${moneyUsd(c.percentOf(8.5, 64))}. The total to pay is ${moneyUsd(64 + c.percentOf(8.5, 64))}.`,
          'Check the reverse: the charge divided by 64, times 100, returns 8.5%.',
        ],
      },
      {
        h2: 'A few anchors worth memorizing',
        paragraphs: [
          'Ten percent is the number with the decimal point moved one place left: 10% of 64 is 6.4. Five percent is half of that, 3.2. Fifteen percent is the 10% plus the 5%, so 9.6. Twenty-five percent is the same as dividing by 4, and 50% is dividing by 2. One percent is the decimal moved two places. These anchors make a tip or a tax estimate fast, and the calculator is there when the rate is not a friendly fraction.',
          'A percentage can be larger than 100%. If the part is bigger than the reference, the result is over 100: 300 is 150% of 200. That is different from a percent increase, which compares a new value with an old one. For “up 15%” or “down 20%,” use the percentage increase calculator. For a sale sticker, use the discount calculator. Both start from this same definition.',
        ],
      },
      {
        h2: 'Common percentages of 200',
        table: {
          caption: 'Percent of 200',
          headers: ['Percent', 'Calculation', 'Result'],
          rows: [1, 5, 8.5, 12.5, 15, 18, 20, 25].map((p) => [`${fmtEn(p)}%`, `200 × ${fmtEn(p / 100, 4)}`, fmtEn(c.percentOf(p, 200), 2)]),
        },
      },
    ],
    faqs: [
      { q: 'How do I calculate a percentage of a number?', a: 'Multiply the number by the percent and divide by 100. Eighteen percent of 250 is 45.' },
      { q: 'How do I find what percent one number is of another?', a: 'Divide the part by the whole and multiply by 100. 45 is 18% of 250 because 45 ÷ 250 × 100 = 18.' },
      { q: 'Can a percentage be more than 100%?', a: 'Yes, whenever the part is larger than the whole you are comparing it with. 300 is 150% of 200.' },
    ],
  },
  {
    path: '/en/percentage-increase-calculator',
    widget: 'increase',
    title: 'Percentage Increase Calculator | CalculPulse',
    description: 'Percentage increase calculator for the percent change between two numbers, and for applying a percent increase or decrease. Includes the reverse rate.',
    h1: 'Percentage increase calculator',
    lede: 'Compare two numbers, or apply a percent increase or decrease. A rise from 1,600 to 1,760 is a 10% increase.',
    crumb: 'Percentage increase',
    related: ['/en/percentage-calculator', '/en/discount-calculator', '/en/margin-calculator', '/en/proportion-calculator'],
    sections: [
      {
        h2: 'Percent change between two numbers',
        paragraphs: [
          'Percentage increase compares a new number with an old one. Subtract the old value from the new one, divide by the old value, and multiply by 100. A bill that goes from $1,600 to $1,760 has increased by 160. Then 160 ÷ 1,600 × 100 = 10%. The formula is (new − old) ÷ old × 100. The old value has to be the starting point. Dividing by the new value instead answers a different question.',
          `The same formula reports a decrease as a negative number. From 100 down to 80, the change is −20, and −20 ÷ 100 × 100 = −20%, a 20% decrease. From 80 back to 100 is (100 − 80) ÷ 80 × 100 = ${fmtEn(c.evolutionRate(80, 100), 2)}%. A 20% drop is not undone by a 20% rise. The reverse of a 10% increase is a decrease of about ${fmtEn(Math.abs(c.reciprocalRate(10)), 2)}%, because you divide by 1.10 and the extra tenth is now part of a larger base.`,
        ],
      },
      {
        h2: 'Worked example: applying the increase',
        paragraphs: ['Once you know the rate, applying it is a multiplication. A 10% increase means the new value is 110% of the old one, or the old value times 1.10.'],
        list: [
          'Start at $1,600.',
          'Ten percent of 1,600 is 160.',
          'Add it: 1,600 + 160 = 1,760. Equivalently, 1,600 × 1.10 = 1,760.',
          `A further 10% increase is not 20% overall. 1,760 × 1.10 = ${fmtEn(c.applyRate(1760, 10), 2)}, and the change from the original 1,600 is ${pctEn(c.evolutionRate(1600, c.applyRate(1760, 10)))}, not 20%.`,
        ],
      },
      {
        h2: 'Finding the number before the change',
        paragraphs: [
          'If a price is $115 after a 15% increase, the original is not 115 minus 15% of 115. That would subtract the percent from the wrong base. Divide by 1.15 instead: 115 ÷ 1.15 = 100. In general, the original equals the final value divided by (1 + rate/100). For a decrease, the rate is negative: a price of $80 after a 20% decrease started at 80 ÷ 0.80 = 100.',
          'Keep percent change separate from percentage points. A rate that moves from 4% to 5% has gained 1 percentage point. Relative to 4, that is a 25% increase in the rate itself. Headlines mix those up. This calculator does the relative change, (new − old) ÷ old.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate a percentage increase?', a: 'Subtract the original from the new value, divide by the original, and multiply by 100. From 1,600 to 1,760 is a 10% increase.' },
      { q: 'Why is a 20% decrease not reversed by a 20% increase?', a: 'They use different bases. 100 decreased by 20% is 80. Then 80 increased by 20% is 96, not 100. The reverse of −20% is +25%.' },
      { q: 'How do I undo a percent increase?', a: 'Divide by 1 plus the rate. After a 15% increase, divide by 1.15. A final price of $115 started at $100.' },
    ],
  },
  {
    path: '/en/discount-calculator',
    widget: 'discount',
    title: 'Discount Calculator: Percent Off a Price',
    description: 'Discount calculator for a percent-off sale. See the price you pay, the dollars saved, and what two stacked discounts really take off.',
    h1: 'Discount calculator',
    lede: 'Take a percent off a price, stack a second discount, or find the percent off from the original and sale prices.',
    crumb: 'Discount calculator',
    related: ['/en/percentage-calculator', '/en/percentage-increase-calculator', '/en/margin-calculator', '/en/proportion-calculator'],
    sections: [
      {
        h2: 'Price after a percent off',
        paragraphs: [
          'A discount removes a percentage of the original price. Twenty-five percent off $80.00 saves 80 × 0.25 = $20.00, so the sale price is 80 − 20 = $60.00. You can also multiply by what remains: 25% off leaves 75%, and 80 × 0.75 = 60. Both routes are the same arithmetic. The calculator shows the sale price and the dollars saved together, because a “25% off” sign does not print the dollar amount.',
          'The percent is always of the price you start from, not of the price you end at. Taking 25% off and then asking what percent $20 is of $60 gives 33%, which is a different question. The discount rate on this page is savings divided by the original price.',
        ],
      },
      {
        h2: 'Worked example: two discounts in a row',
        paragraphs: ['A tag says 20% off, and the register takes another 10% off the reduced price. The combined discount is not 30%.'],
        list: [
          'Start at $100.00.',
          'Twenty percent off leaves 80: 100 × 0.80 = 80.',
          'Ten percent of the new price is $8.00, so the second price is 80 × 0.90 = $72.00.',
          'You saved $28.00 on the original $100.00, which is 28% off, not 30%. The missing 2% is the overlap: the second discount does not apply to the $20 already removed.',
        ],
      },
      {
        h2: 'Working backward from a sale price',
        paragraphs: [
          'If a shirt was $120 and is now $84, the savings are 120 − 84 = $36. The discount rate is 36 ÷ 120 × 100 = 30%. Enter the original in the first box of the second block and the sale price in the second. A “compare at” price that was never the real selling price still produces a percentage, but the percentage only describes those two numbers. It does not prove the earlier price was charged.',
          'Tax is separate. A 20% discount and an 8% sales tax do not cancel. Apply the discount first, then the tax to the reduced price, unless the sign says the tax is included. This page stops at the discount. For a plain “what is 8% of the total,” use the percentage calculator.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I calculate a percent-off discount?', a: 'Multiply the price by the percent and subtract. Twenty-five percent off $80 is $20 off, so you pay $60.' },
      { q: 'Do two 10% discounts equal 20% off?', a: 'No. Ten percent off, then another 10% off the reduced price, leaves 81% of the original: 0.90 × 0.90 = 0.81, which is 19% off.' },
      { q: 'How do I find the discount from two prices?', a: 'Subtract the sale price from the original, divide by the original, and multiply by 100. From $120 to $84 is 30% off.' },
    ],
  },
  {
    path: '/en/proportion-calculator',
    widget: 'proportion',
    title: 'Proportion Calculator | CalculPulse',
    description: 'Proportion calculator for A is to B as C is to X. Solves the missing term of a ratio, with a price example you can check by unit price.',
    h1: 'Proportion calculator',
    lede: 'If 3 pounds cost $5.40, 8 pounds cost $14.40. Enter A, B, and C. X is B × C ÷ A.',
    crumb: 'Proportion calculator',
    related: ['/en/percentage-calculator', '/en/percentage-increase-calculator', '/en/average-calculator', '/en/square-footage-calculator'],
    sections: [
      {
        h2: 'The fourth term of a proportion',
        paragraphs: [
          'A proportion says two ratios are equal: A/B = C/X. Cross-multiplying gives A × X = B × C, so X = B × C ÷ A, as long as A is not zero. That is the whole calculator. If 3 pounds of apples cost $5.40, then 3 is to 5.40 as 8 is to X. X = 5.40 × 8 ÷ 3 = 43.20 ÷ 3 = 14.40. Eight pounds cost $14.40.',
          'The unit-price check is the same arithmetic written out. One pound costs 5.40 ÷ 3 = $1.80. Eight pounds cost 8 × 1.80 = $14.40. If those two routes disagree, a digit was mistyped. The proportion does not know about bulk discounts. It assumes the ratio stays constant, which is right for a unit price, a recipe, a map scale, or similar triangles, and wrong for a price that changes at a quantity break.',
        ],
      },
      {
        h2: 'Worked example: scaling a recipe',
        paragraphs: ['A recipe uses 2 cups of broth for 6 servings. You want 15 servings and need the new amount of broth.'],
        list: [
          'Set it up as 6 servings is to 2 cups as 15 servings is to X cups.',
          'Here A = 6, B = 2, and C = 15.',
          'X = 2 × 15 ÷ 6 = 30 ÷ 6 = 5.',
          'The scaled recipe needs 5 cups of broth. Per serving that is still 2 ÷ 6 = 1/3 cup, and 15 × 1/3 = 5.',
        ],
      },
      {
        h2: 'Which number goes in which box',
        paragraphs: [
          'Keep the matching units on a diagonal that makes sense to you, and then be consistent. “3 pounds correspond to $5.40” means pounds are in A and C, and dollars are in B and X. Swapping B and C computes a different ratio and a wrong price. A has to be the number you will divide by, the one paired with B in the known ratio. If A is zero, there is no ratio to extend, and the calculator leaves the result blank.',
          'Percentages are proportions too. “18 out of 100” is the same shape as “45 out of 250.” When the second term of the known ratio is 100, you are doing a percentage. The percentage calculator is labeled for that case. Use this page when neither side of the ratio is 100.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you solve a proportion?', a: 'If A is to B as C is to X, then X = B × C ÷ A. For 3/5.40 = 8/X, X = 5.40 × 8 ÷ 3 = 14.40.' },
      { q: 'What is a ratio calculator doing differently?', a: 'Nothing mathematical. A ratio A:B equal to C:X is the same statement as the proportion A/B = C/X. This page solves for X.' },
      { q: 'Why did I get a huge number?', a: 'A and B were probably swapped, so the calculator divided by the small number. Check that A is the known quantity that matches C, and B is the known quantity that matches X.' },
    ],
  },
  {
    path: '/en/average-calculator',
    widget: 'average',
    title: 'Average Calculator: Mean and Median',
    description: 'Average calculator for the mean of a list, plus the median, sum, minimum, and maximum. A five-score example shows why mean and median can differ.',
    h1: 'Average calculator',
    lede: 'Enter numbers separated by spaces. The mean of 78, 85, 90, 73, and 88 is 82.8.',
    crumb: 'Average calculator',
    related: ['/en/weighted-average-calculator', '/en/standard-deviation-calculator', '/en/percentage-calculator', '/en/proportion-calculator'],
    sections: [
      {
        h2: 'Mean, the usual average',
        paragraphs: [
          `The average most people mean is the arithmetic mean: add the numbers and divide by how many there are. For the scores 78, 85, 90, 73, and 88, the sum is ${fmtEn(scoreSum, 0)}. There are 5 scores, so the mean is ${fmtEn(scoreSum, 0)} ÷ 5 = ${fmtEn(scoreMean, 1)}. One low score pulls the mean down. Replacing 73 with 93 would raise the sum by 20 and the mean by 4, to ${fmtEn(c.mean([78, 85, 90, 93, 88]), 1)}. Every value has the same influence. If some scores should count more than others, that is a weighted average, not this average.`,
          'Type the numbers with spaces or semicolons between them. A thousands separator has to stay attached to its number, as in 1,200 1,450, because a comma followed by a space starts a new value. Decimals use a point: 82.5 is eighty-two and a half, not eighty-two thousand five hundred.',
        ],
      },
      {
        h2: 'Worked example, including the median',
        paragraphs: [`The median is the middle value after sorting, and it ignores how extreme the ends are. Sort ${scores.join(', ')} and you get 73, 78, 85, 88, 90. The middle of five values is 85. The mean was ${fmtEn(scoreMean, 1)}, so the low 73 pulled the mean ${fmtEn(scoreMedian - scoreMean, 1)} points below the median.`],
        list: [
          `Sum: 78 + 85 = 163; 163 + 90 = 253; 253 + 73 = 326; 326 + 88 = ${fmtEn(scoreSum, 0)}.`,
          `Mean: ${fmtEn(scoreSum, 0)} ÷ 5 = ${fmtEn(scoreMean, 1)}.`,
          `Median: the third of the sorted list is ${fmtEn(scoreMedian, 0)}.`,
          `Minimum 73, maximum 90, range ${fmtEn(90 - 73, 0)}.`,
        ],
      },
      {
        h2: 'When the mean is the wrong summary',
        paragraphs: [
          'With an even count, the median is the mean of the two middle numbers. The median of 4, 1, 3, and 2 is the mean of 2 and 3 after sorting, which is 2.5. The mean of those four numbers is also 2.5, but that agreement is a coincidence of this particular list. One very large value, such as a single $10,000 invoice in a stack of $20 invoices, will drag the mean up and leave the median near the typical invoice. Report the one the question asked for. “Average” with no other word almost always means the mean. “Typical” often means the median.',
          'The mean does not say how spread out the numbers are. Two classes can share a mean of 82 while one is a tight cluster and the other runs from 40 to 100. The standard deviation calculator measures that spread. This page stops at the center, the sum, and the extremes.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate an average?', a: `Add the values and divide by the count. The average of 78, 85, 90, 73, and 88 is ${fmtEn(scoreSum, 0)} ÷ 5 = ${fmtEn(scoreMean, 1)}.` },
      { q: 'What is the difference between mean and median?', a: 'The mean uses every value equally. The median is the middle value after sorting. A single very high or low number moves the mean more than the median.' },
      { q: 'Do I include zeros?', a: 'Yes, if zero is a real observation. A zero on a quiz lowers the mean. Leave it out only if that attempt should not be in the list at all.' },
    ],
  },
  {
    path: '/en/weighted-average-calculator',
    widget: 'weighted',
    title: 'Weighted Average Calculator',
    description: 'Weighted average calculator for grades and credits, or any values that should not count equally. Shows the weighted mean and the plain mean side by side.',
    h1: 'Weighted average calculator',
    lede: 'Multiply each value by its weight, add those products, and divide by the total weight. A 4-credit 76 pulls harder than a 3-credit 90.',
    crumb: 'Weighted average',
    related: ['/en/average-calculator', '/en/standard-deviation-calculator', '/en/percentage-calculator', '/en/proportion-calculator'],
    sections: [
      {
        h2: 'Why the weights change the result',
        paragraphs: [
          `A weighted average is the sum of (value × weight) divided by the sum of the weights. Take a quiz score of 90 worth 3 credits, a midterm of 84 worth 3 credits, and a final of 76 worth 4 credits. The products are 90 × 3 = 270, 84 × 3 = 252, and 76 × 4 = 304. The sum of the products is 270 + 252 + 304 = 826. The credits add to 3 + 3 + 4 = 10. The weighted average is 826 ÷ 10 = ${fmtEn(weighted, 1)}.`,
          `The plain mean of 90, 84, and 76 is ${fmtEn(c.mean(weights), 2)}, higher than ${fmtEn(weighted, 1)}, because that mean pretends the final counts the same as the quiz. It does not. The extra credit on the lower score is exactly what the weights are for. If every weight is 1, the weighted average and the ordinary average match.`,
        ],
      },
      {
        h2: 'Worked example, step by step',
        list: [
          'Write the three rows: 90 with weight 3, 84 with weight 3, 76 with weight 4.',
          'Multiply across: 270, 252, and 304.',
          'Add the products: 826. Add the weights: 10.',
          `Divide: 826 ÷ 10 = ${fmtEn(weighted, 1)}. On a 0–100 grade scale, that is the course average.`,
        ],
        paragraphs: [
          'Weights do not have to be credits. They can be percentages that add to 100: homework 20%, quizzes 30%, final 50%. Then each score is multiplied by that percent and the products are added, which is the same formula because dividing by 100 at the end is already built into using weights that sum to 100. If your weights are 20, 30, and 50, the calculator divides by 100 for you. You do not also divide by 100 by hand.',
        ],
      },
      {
        h2: 'Bad weights',
        paragraphs: [
          'A negative weight reverses the meaning of that row and is rarely what a grade sheet intends. A weight of zero drops the row, which is correct if the assignment is excused. Leaving the weight blank drops the row too. The label column is only a reminder; it is not part of the math. Two rows can share a label.',
          'Percent weights that sum to 90 or 110 are a common syllabus mistake. The calculator will still divide by whatever the weights add up to, so the result is a true weighted mean of the rows you typed. It will not silently force the weights to 100. If the syllabus is supposed to sum to 100, fix the weights before you trust the number.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate a weighted average?', a: `Add up value times weight for every row, then divide by the total weight. For 90, 84, and 76 with weights 3, 3, and 4, the result is ${fmtEn(weighted, 1)}.` },
      { q: 'What if my weights are percentages?', a: 'Enter 20, 30, and 50 as the weights. Dividing by their sum, 100, is the percentage weighting. They do not need a percent sign.' },
      { q: 'Is a weighted average the same as a GPA?', a: 'Only if each row is already a grade-point value and the weight is the credits. This page averages the numbers you type. It does not convert letter grades to points.' },
    ],
  },
  {
    path: '/en/standard-deviation-calculator',
    widget: 'stdev',
    title: 'Standard Deviation Calculator',
    description: 'Standard deviation calculator for a population (divide by n) or a sample (divide by n − 1), with variance, mean, and a fully worked list.',
    h1: 'Standard deviation calculator',
    lede: 'Paste a list of numbers. Choose population or sample. For 2, 4, 4, 4, 5, 5, 7, 9 the population standard deviation is 2.',
    crumb: 'Standard deviation',
    related: ['/en/average-calculator', '/en/weighted-average-calculator', '/en/square-root-calculator', '/en/percentage-calculator'],
    sections: [
      {
        h2: 'What the standard deviation measures',
        paragraphs: [
          `The standard deviation is the square root of the average squared distance from the mean. It uses the same units as the data. For the list 2, 4, 4, 4, 5, 5, 7, 9, the mean is ${fmtEn(c.mean(series), 0)}, because the eight numbers add to 40 and 40 ÷ 8 = 5. The distances from 5 are −3, −1, −1, −1, 0, 0, 2, and 4. Squared, they are 9, 1, 1, 1, 0, 0, 4, and 16, which add to 32.`,
          `If these eight numbers are the entire population, divide by n = 8. The variance is 32 ÷ 8 = ${fmtEn(popVar, 0)}, and the standard deviation is the square root of 4, which is ${fmtEn(popSd, 0)}. If they are a sample from a larger population, divide by n − 1 = 7. The sample variance is 32 ÷ 7 = ${fmtEn(sampleVar, 4)}, and the sample standard deviation is ${fmtEn(sampleSd, 4)}. The sample version is larger because dividing by a smaller number is the usual correction for using a sample mean.`,
        ],
      },
      {
        h2: 'Worked example',
        list: [
          'Add the values: 2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40.',
          'Mean: 40 ÷ 8 = 5.',
          'Square each difference from 5 and add them: 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32.',
          `Population: variance 32 ÷ 8 = 4, standard deviation √4 = 2. Sample: variance 32 ÷ 7 = ${fmtEn(sampleVar, 4)}, standard deviation ${fmtEn(sampleSd, 4)}.`,
        ],
        paragraphs: [
          'Use the population setting when the list is everyone you care about: every score in one small class, every measurement in a finished batch. Use the sample setting when the list is a subset and you want a estimate for a wider group. Spreadsheets call these STDEV.P and STDEV.S. Mixing them up will not change a large data set by much, and it will change a list of three or four numbers a lot.',
        ],
      },
      {
        h2: 'What this number is not',
        paragraphs: [
          'A standard deviation of 2 does not mean every value is within 2 of the mean. In the example, 2 and 9 are 3 and 4 away from 5. It also does not require the data to be a bell curve. The calculation above did not assume a shape. Rules of thumb such as “about 68% of values fall within one standard deviation” belong to a normal distribution, and they are a poor description of a short, lumpy list.',
          'The variance is the square of the standard deviation, so it is in squared units. People report the standard deviation because “2 points” is easier to read than “4 points squared.” The calculator shows both, along with the mean and the median, so you can see the center and the spread on one screen.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate standard deviation?', a: 'Find the mean, square each difference from the mean, average those squares, and take the square root. For 2, 4, 4, 4, 5, 5, 7, 9 the population standard deviation is 2.' },
      { q: 'Should I divide by n or n − 1?', a: 'Divide by n for a population and by n − 1 for a sample. On this list, that is 2 versus about 2.138.' },
      { q: 'Can the standard deviation be zero?', a: 'Yes. It is zero when every value equals the mean. A single number has a population standard deviation of zero and no sample standard deviation, because n − 1 would be zero.' },
    ],
  },
  {
    path: '/en/square-root-calculator',
    widget: 'sqrt',
    title: 'Square Root Calculator',
    description: 'Square root calculator with a decimal value and a simplified radical. √144 = 12 and √72 = 6√2. Cube roots are included.',
    h1: 'Square root calculator',
    lede: 'Enter a number. The square root of 144 is 12, because 12 × 12 = 144. The square root of 72 simplifies to 6√2.',
    crumb: 'Square root',
    related: ['/en/standard-deviation-calculator', '/en/average-calculator', '/en/proportion-calculator', '/en/square-footage-calculator'],
    sections: [
      {
        h2: 'Square roots and perfect squares',
        paragraphs: [
          'The square root of a number n is the non-negative number which, multiplied by itself, gives n. The square root of 144 is 12, because 12 × 12 = 144. The square root of 0 is 0. A negative number has no real square root: no real number squares to −4. The calculator refuses those instead of inventing an imaginary result. Cube roots are different. The cube root of −8 is −2, because −2 × −2 × −2 = −8, and that option is in the menu.',
          `Numbers that are not perfect squares still have a decimal square root. The square root of 2 is about ${fmtEn(Math.sqrt(2), 6)}. The square root of 50 is about ${fmtEn(Math.sqrt(50), 4)}. You can check a result by squaring it. Squaring a rounded root will land very near the original number, and the last digits may differ because the display stopped at eight decimal places.`,
        ],
      },
      {
        h2: 'Worked example: simplifying √72',
        paragraphs: ['An integer under a radical can often be rewritten as a smaller radical times a whole number. Factor out the largest perfect square.'],
        list: [
          '72 = 36 × 2, and 36 is 6 × 6.',
          `So √72 = √(36 × 2) = 6√2.`,
          `The decimal is 6 × ${fmtEn(Math.sqrt(2), 6)} = ${fmtEn(6 * Math.sqrt(2), 6)}.`,
          `Check: ${fmtEn(6 * Math.sqrt(2), 6)} squared is 72, within display rounding. The simplified form is ${sqrt72.outside}√${sqrt72.inside}.`,
        ],
      },
      {
        h2: 'Estimating before you trust the screen',
        paragraphs: [
          'A square root sits between the roots of the perfect squares around it. √50 is between √49 = 7 and √64 = 8, and closer to 7 because 50 is just above 49. The calculator’s value, about 7.071, matches that guess. √10 is between 3 and 4, closer to 3, and the value is about 3.162. If a result falls outside the neighboring perfect squares, it is wrong.',
          'Square roots show up in distance (the straight-line form of the Pythagorean theorem), in standard deviation (the square root of variance), and in any formula that undoes a square. This page does the root only. It does not solve an equation. For the spread of a list of numbers, use the standard deviation calculator, which takes the root of the variance for you.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I calculate a square root?', a: 'Find the non-negative number that squares to your value. √144 = 12 because 12 × 12 = 144. For other numbers the calculator gives the decimal.' },
      { q: 'What is √72 simplified?', a: '√72 = 6√2, about 8.485282, because 72 = 36 × 2 and √36 = 6.' },
      { q: 'Why is there no square root of a negative number?', a: 'No real number multiplied by itself is negative. A positive times a positive is positive, and a negative times a negative is positive.' },
    ],
  },
  {
    path: '/en/roman-numeral-converter',
    widget: 'roman',
    title: 'Roman Numeral Converter',
    description: 'Roman numeral converter from 1 to 3,999 and back. 2026 is MMXXVI, 1994 is MCMXCIV, and 4 is IV, not IIII.',
    h1: 'Roman numeral converter',
    lede: 'Convert a whole number up to 3,999 into Roman numerals, or type a numeral such as MCMXCIV to get 1,994.',
    crumb: 'Roman numerals',
    related: ['/en/number-to-words', '/en/square-root-calculator', '/en/average-calculator', '/en/proportion-calculator'],
    sections: [
      {
        h2: 'The seven symbols',
        paragraphs: [
          'Standard Roman numerals use seven symbols: I is 1, V is 5, X is 10, L is 50, C is 100, D is 500, and M is 1,000. You build a number by addition, with a subtraction when a smaller symbol stands before a larger one. VI is 5 + 1 = 6. IV is 5 − 1 = 4. The subtractive pairs in common use are IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). This converter accepts those and rejects strings that are not the standard form, including IIII for 4 and IC for 99.',
          'The practical upper end of this system, without an overline for thousands, is 3,999, written MMMCMXCIX. Zero has no Roman numeral. Decimals and negatives are not part of the system, so the number box accepts whole numbers from 1 through 3,999 only.',
        ],
      },
      {
        h2: 'Worked examples',
        list: [
          '2026 = 1,000 + 1,000 + 10 + 10 + 5 + 1 = MMXXVI.',
          '1994 = 1,000 + 900 + 90 + 4 = M + CM + XC + IV = MCMXCIV.',
          '58 = 50 + 5 + 3 = LVIII. It is not ILVIII or LVIIII.',
          'Reading MCMXCIV from the left: M = 1,000, CM = 900, XC = 90, IV = 4, and 1,000 + 900 + 90 + 4 = 1,994.',
        ],
        paragraphs: [
          'A reliable way to convert a number is to peel off the largest symbol that still fits, including the subtractive pairs, and repeat. For 2026, M fits twice (2,000), XX fits (20), V fits (5), and I fits once. Nothing is left. The same procedure fixes a numeral you are reading: add each symbol, but subtract it when the next symbol is larger. That is why the C in CM is subtracted from the following M.',
        ],
      },
      {
        h2: 'Forms this page will not invent',
        paragraphs: [
          'Clock faces sometimes use IIII, and some older inscriptions are more additive than the schoolbook form. Those variants are readable to a person and ambiguous to a strict converter, so they are treated as invalid here. The round trip is the test: a numeral is accepted only when converting it to a number and back produces the same string. IIII becomes nothing, because the standard form of 4 is IV. VV is not 10; X is.',
          'Years are the everyday use. 2026 is MMXXVI, 2000 is MM, and 1999 is MCMXCIX. Superbowl-style numerals and book chapters use the same rules. If you need the number spelled in English words instead of Roman symbols, that is the number to words page.',
        ],
      },
    ],
    faqs: [
      { q: 'What is 2026 in Roman numerals?', a: 'MMXXVI. That is 1,000 + 1,000 + 10 + 10 + 5 + 1.' },
      { q: 'What is MCMXCIV?', a: '1,994. M is 1,000, CM is 900, XC is 90, and IV is 4.' },
      { q: 'Is IIII a valid 4?', a: 'It appears on some clocks. The standard form is IV, and this converter accepts only the standard form.' },
    ],
  },
  {
    path: '/en/number-to-words',
    widget: 'words',
    title: 'Number to Words Converter',
    description: 'Convert a number to words in American English, or write a dollar amount as words and cents. 1,250.50 is one thousand two hundred fifty dollars and fifty cents.',
    h1: 'Number to words',
    lede: 'Spell a whole number, a decimal, or a dollar amount. 1,984 is one thousand nine hundred eighty-four.',
    crumb: 'Number to words',
    related: ['/en/roman-numeral-converter', '/en/percentage-calculator', '/en/simple-interest-calculator', '/en/average-calculator'],
    sections: [
      {
        h2: 'American English spelling',
        paragraphs: [
          `This page spells numbers the way US English does on a check or in a sentence. Compound numbers under 100 take a hyphen: 21 is twenty-one, 84 is eighty-four. Hundreds do not take the word “and”: 101 is one hundred one, not one hundred and one. The word “and” is reserved, on the dollar setting, for the cents. ${integerToWords(1984)} is the spelling of 1,984. ${integerToWords(2026)} is the spelling of 2,026. One million is 1,000,000, and 1,000,001 is one million one.`,
          'Decimals are read digit by digit after the point, so trailing zeros stay visible. The number 3.05 is “three point zero five,” not “three point five.” That matters for a serial number or a batting average. The dollar setting is different: it rounds to the cent and says the cents as a number of cents, not as digits.',
        ],
      },
      {
        h2: 'Worked example: a dollar amount',
        paragraphs: [`Take $1,250.50. The dollar part is 1,250, spelled “${integerToWords(1250)}.” There is more than one dollar, so the unit is “dollars.” The cents are 50, spelled “${integerToWords(50)}.” The full line a check uses is “${dollarsToWords(1250.5)}.”`],
        list: [
          'One dollar even is “one dollar,” singular, with no cents clause.',
          'One dollar and one cent stays singular on both units.',
          'Fifty cents, with no dollars, is “fifty cents,” not “zero dollars and fifty cents.”',
          'Zero dollars even is “zero dollars.”',
        ],
      },
      {
        h2: 'What the converter will not guess',
        paragraphs: [
          'The limit is 999,999,999,999, just under one trillion. Scientific notation and fractions like 1/2 are not read; write 0.5 if you want a half. A negative number is spelled with the word “negative” on the number setting. The dollar setting accepts only a positive amount, because a check is not written for a negative sum. Rounding uses ordinary half-up on the cent, so 1.005 dollars becomes one dollar and one cent.',
          'Roman numerals are a different encoding. 2026 in Roman numerals is MMXXVI, which the Roman numeral converter will produce. This page never mixes the two. If you only need a result in digits, you do not need either tool.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you write 1,250.50 in words on a check?', a: `“${dollarsToWords(1250.5)}.”` },
      { q: 'Do you use “and” in American number words?', a: 'Not inside the whole-number part. 101 is “one hundred one.” “And” appears before the cents in a dollar amount.' },
      { q: 'How is 3.05 spoken?', a: '“Three point zero five,” so the zero in the tenths place is not dropped.' },
    ],
  },
  {
    path: '/en/square-footage-calculator',
    widget: 'sqft',
    title: 'Square Footage Calculator',
    description: 'Square footage calculator for a room in feet and inches, plus square yards and square meters. A 12 by 15 foot room is 180 square feet.',
    h1: 'Square footage calculator',
    lede: 'Multiply length by width. A room 12 feet by 15 feet is 180 square feet, or 16.72 square meters.',
    crumb: 'Square footage',
    related: ['/en/convert/inches-to-cm', '/en/convert/cm-to-inches', '/en/proportion-calculator', '/en/margin-calculator'],
    sections: [
      {
        h2: 'Length times width',
        paragraphs: [
          `Square footage is the area of a rectangle: length in feet times width in feet. A room 12 feet long and 15 feet wide is 12 × 15 = ${fmtEn(room, 0)} square feet. Divide by 9 for square yards, because a square yard is 3 feet by 3 feet: ${fmtEn(room, 0)} ÷ 9 = ${fmtEn(room / 9, 0)} square yards. The international foot is exactly 0.3048 meters, so one square foot is 0.3048 × 0.3048 = 0.09290304 square meters. Those ${fmtEn(room, 0)} square feet are ${fmtEn(roomM2, 2)} square meters.`,
          'Measure each wall in feet and inches, then convert inches to a fraction of a foot before you multiply. Six inches is half a foot. A length of 12 feet 6 inches is 12.5 feet. A width of 10 feet 0 inches stays 10. The area is 12.5 × 10 = 125 square feet. Forgetting to convert the inches, and multiplying 12 × 10 while ignoring the extra 6 inches, drops 5 square feet on this room.',
        ],
      },
      {
        h2: 'Worked example',
        list: [
          'Length: 12 feet 6 inches = 12 + 6/12 = 12.5 feet.',
          'Width: 10 feet = 10 feet.',
          `Area: 12.5 × 10 = ${fmtEn(inchesRoom, 0)} square feet.`,
          `In square meters: ${fmtEn(inchesRoom, 0)} × 0.09290304 = ${fmtEn(u.sqFtToM2(inchesRoom), 2)} m².`,
          `The other way: a 20 m² room is ${fmtEn(fromM2, 2)} square feet, because 1 ÷ 0.09290304 is about ${fmtEn(u.m2ToSqFt(1), 4)} square feet per square meter.`,
        ],
        paragraphs: [
          'An L-shaped room is two rectangles. Measure each rectangle, compute each area, and add them. Do not multiply the longest length by the longest width. That rectangle contains floor you do not have. A triangle, such as a gable end, is base times height divided by 2, with both measurements in feet. A circle is π times the radius squared. The shape menu uses those formulas in feet and reports square feet.',
        ],
      },
      {
        h2: 'Flooring, paint, and the extra you actually buy',
        paragraphs: [
          'Square footage of the floor is the starting number for tile, carpet, or hardwood, not the number of boxes to buy. Installers add waste for cuts and pattern match, often 10% for a straight lay and more for a diagonal. This calculator does not add waste, because the right allowance depends on the material and the room. Take the square footage it gives you and apply the percentage your supplier asks for with the percentage calculator.',
          'Walls are a different rectangle: width of the wall times height, minus doors and windows if you are buying paint. A 12-foot wall that is 8 feet high is 96 square feet before openings. Ceilings use the same footprint as the floor in a room with a flat ceiling. Keep the feet consistent. Mixing inches on one side and feet on the other, without converting, is the error that makes a room look ten times too small or too large.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I calculate square footage?', a: 'Multiply length in feet by width in feet. A 12 by 15 foot room is 180 square feet.' },
      { q: 'How do I handle inches?', a: 'Divide the inches by 12 and add them to the feet. Twelve feet 6 inches is 12.5 feet. Then multiply.' },
      { q: 'How many square feet are in a square meter?', a: `One square meter is about ${fmtEn(u.m2ToSqFt(1), 3)} square feet. Twenty square meters is ${fmtEn(fromM2, 1)} square feet.` },
    ],
  },
  {
    path: '/en/margin-calculator',
    widget: 'margin',
    title: 'Margin Calculator: Margin and Markup',
    description: 'Margin calculator for profit, profit margin, and markup. A $50 cost and an $80 price is a 37.5% margin and a 60% markup.',
    h1: 'Margin calculator',
    lede: 'Enter cost and selling price. Profit is price minus cost. Margin divides that profit by the price. Markup divides it by the cost.',
    crumb: 'Margin calculator',
    related: ['/en/discount-calculator', '/en/percentage-calculator', '/en/percentage-increase-calculator', '/en/simple-interest-calculator'],
    sections: [
      {
        h2: 'Margin and markup are different percents',
        paragraphs: [
          `Profit is the selling price minus the cost. On a cost of $50.00 and a price of $80.00, the profit is $30.00. Profit margin divides that profit by the selling price: 30 ÷ 80 × 100 = ${fmtEn(marginEx.marginRate, 1)}%. Markup divides the same profit by the cost: 30 ÷ 50 × 100 = ${fmtEn(marginEx.markupRate, 0)}%. The price is ${fmtEn(marginEx.coef, 1)} times the cost. Both percents describe one sale. They are not interchangeable, and quoting a 60% margin when you mean a 60% markup overstates the margin.`,
          'Retail conversation often says “margin” for both. On a quote or a spreadsheet, pin it down: margin is on the price (the money you receive), markup is on the cost (the money you laid out). A 100% markup doubles the cost and is a 50% margin, because the profit is half of the new price. A 100% margin would mean the cost was zero.',
        ],
      },
      {
        h2: 'Worked example: pricing from a target',
        paragraphs: ['You buy an item for $60.00 and you want either a 25% margin or a 25% markup. Those targets produce different shelf prices.'],
        list: [
          `Twenty-five percent markup: price = 60 × (1 + 0.25) = ${moneyUsd(priceAtMarkup)}. Profit is ${moneyUsd(priceAtMarkup - 60)}.`,
          `Twenty-five percent margin: the cost is 75% of the price, so price = 60 ÷ 0.75 = ${moneyUsd(priceAtMargin)}. Profit is ${moneyUsd(priceAtMargin - 60)}.`,
          'Check the margin on that second price: profit 20 ÷ price 80 = 25%.',
          'A target margin of 100% or more is impossible. The cost would have to be zero or negative. The calculator leaves that price blank.',
        ],
      },
      {
        h2: 'What to leave out of the cost',
        paragraphs: [
          'The percentages are only as honest as the cost you type. If the cost is the supplier invoice and you also pay freight, packaging, and a card fee, those belong in the cost before you talk about margin. Leaving them out makes the margin look healthier than the bank account. This page does not guess your overhead. It divides the two numbers you enter.',
          'Sales tax collected from a customer and sent to the state is not part of the selling price for a margin. Use the price before that tax, and the cost before any tax you can reclaim. A discount changes the price you actually receive. If you sell the $80 item at 25% off, the money you receive is $60, the profit on a $50 cost is $10, and the margin is 10 ÷ 60 × 100, about 16.7%, not the 37.5% on the undiscounted ticket.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate profit margin?', a: 'Subtract the cost from the selling price, then divide by the selling price. On a $50 cost and an $80 price, the margin is 30 ÷ 80 = 37.5%.' },
      { q: 'What is the difference between margin and markup?', a: 'Margin divides profit by the selling price. Markup divides profit by the cost. The same $30 profit is a 37.5% margin and a 60% markup.' },
      { q: 'How do I set a price for a 25% margin?', a: 'Divide the cost by 1 − 0.25, which is 0.75. A $60 cost at a 25% margin sells for $80.' },
    ],
  },
  {
    path: '/en/simple-interest-calculator',
    widget: 'interest',
    title: 'Simple Interest Calculator',
    description: 'Simple interest calculator using I = P × r × t. A $10,000 principal at 5% for 3 years earns $1,500. No compounding.',
    h1: 'Simple interest calculator',
    lede: 'Interest = principal × annual rate × time. $10,000 at 5% for 3 years earns $1,500, for a total of $11,500.',
    crumb: 'Simple interest',
    related: ['/en/margin-calculator', '/en/percentage-calculator', '/en/percentage-increase-calculator', '/en/discount-calculator'],
    sections: [
      {
        h2: 'Interest only on the original principal',
        paragraphs: [
          `Simple interest pays the rate on the original principal, and only on that principal, for the whole term. The formula is I = P × r × t, with r written as a decimal, or I = P × rate × years ÷ 100 when the rate is in percent. For P = $10,000, a rate of 5% a year, and t = 3 years: I = 10,000 × 5 × 3 ÷ 100 = ${fmtEn(interest, 0)}. The interest is ${moneyUsd(interest)}. The amount at the end is the principal plus the interest, ${moneyUsd(10000 + interest)}. Nothing in that total was itself earning interest.`,
          'That last point is the definition. Compound interest would add each period’s interest to the principal and then pay interest on the new, larger balance. Three years at 5% compounded annually turns $10,000 into $11,576.25, which is $76.25 more than simple interest. This page does not do that. If a note, a bond, or a loan says “simple interest,” the $1,500 figure is the one that matches the contract. If it says “compounded monthly” or “APY,” it does not.',
        ],
      },
      {
        h2: 'Worked example with part of a year',
        paragraphs: ['The same 5% note on $10,000 held for 3 years and 6 months uses a time of 3.5 years, because 6 months is half a year.'],
        list: [
          'Time = 3 + 6/12 = 3.5 years.',
          `Interest = 10,000 × 5 × 3.5 ÷ 100 = ${moneyUsd(c.simpleInterest(10000, 5, 3.5))}.`,
          `Total = 10,000 + ${fmtEn(c.simpleInterest(10000, 5, 3.5), 0)} = ${moneyUsd(10000 + c.simpleInterest(10000, 5, 3.5))}.`,
          'Per year, the interest is still $500, because 5% of $10,000 is $500. The extra half year adds another $250.',
        ],
      },
      {
        h2: 'Read the rate before you type it',
        paragraphs: [
          'The rate box is an annual rate in percent. A monthly rate of 1% is not 1 in that box. Twelve times 1% is 12% a year, and you would enter 12 if the contract really is simple interest at 1% a month. Some consumer loans quote a daily rate and a 365-day year. Convert that to a yearly percent, or enter the time as a fraction of a year that matches the contract, before you compare offers. Two loans with the same “5%” can differ if one counts a year as 360 days and the other as 365.',
          'The result is the interest charge or the interest earned, not a monthly payment on an amortizing loan. An installment loan applies each payment to interest and principal, which is a different schedule. Use this page for a note that charges simple interest on a fixed principal, a short-term loan quoted that way, or a textbook problem that says “simple interest.”',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate simple interest?', a: 'Multiply principal, annual rate, and time. $10,000 at 5% for 3 years is 10,000 × 0.05 × 3 = $1,500.' },
      { q: 'Does this compound?', a: 'No. Interest is calculated on the original principal only. Compound interest would add each period’s interest back into the balance.' },
      { q: 'How do I enter 18 months?', a: 'Use 1 year and 6 months, or think of the time as 1.5 years. Eighteen months at 5% on $10,000 is $750.' },
    ],
  },
]

export function calcPage(path) {
  return pages.find((page) => page.path === path) || null
}

export const calcPages = pages
