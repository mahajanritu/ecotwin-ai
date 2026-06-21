import {
  formatCO2,
  formatNumber,
  formatCurrency,
  getEcoLevel,
  getScoreColor,
  getScoreLabel,
  co2ToTrees,
  co2ToKmDriving,
  co2ToFlights,
} from '@/lib/utils'

describe('formatCO2', () => {
  test('formats values under 1000 as kg', () => {
    expect(formatCO2(500)).toBe('500kg')
  })

  test('formats values 1000+ as tonnes', () => {
    expect(formatCO2(2500)).toBe('2.5t')
  })

  test('formats exactly 1000 as tonnes', () => {
    expect(formatCO2(1000)).toBe('1.0t')
  })
})

describe('formatNumber', () => {
  test('formats numbers under 1000 as-is', () => {
    expect(formatNumber(500)).toBe('500')
  })

  test('formats thousands with K suffix', () => {
    expect(formatNumber(12000)).toBe('12K')
  })

  test('formats millions with M suffix', () => {
    expect(formatNumber(2100000)).toBe('2.1M')
  })
})

describe('formatCurrency', () => {
  test('formats small amounts with rupee symbol', () => {
    expect(formatCurrency(500)).toBe('₹500')
  })

  test('formats thousands with K suffix', () => {
    expect(formatCurrency(15000)).toBe('₹15K')
  })

  test('formats lakhs with L suffix', () => {
    expect(formatCurrency(250000)).toBe('₹2.5L')
  })

  test('supports custom currency symbol', () => {
    expect(formatCurrency(500, '$')).toBe('$500')
  })
})

describe('getEcoLevel', () => {
  test('returns level 1 for 0 XP', () => {
    const result = getEcoLevel(0)
    expect(result.level).toBe(1)
    expect(result.title).toBe('Eco Starter')
  })

  test('returns higher level for higher XP', () => {
    const low = getEcoLevel(100)
    const high = getEcoLevel(5000)
    expect(high.level).toBeGreaterThan(low.level)
  })

  test('returns Earth Hero title for max XP', () => {
    const result = getEcoLevel(25000)
    expect(result.title).toBe('Earth Hero')
  })

  test('nextXP is greater than current XP for non-max levels', () => {
    const result = getEcoLevel(100)
    expect(result.nextXP).toBeGreaterThan(0)
  })
})

describe('getScoreColor', () => {
  test('returns green for excellent scores', () => {
    expect(getScoreColor(90)).toBe('#4ADE80')
  })

  test('returns red for critical scores', () => {
    expect(getScoreColor(10)).toBe('#F87171')
  })

  test('returns different colors for different score ranges', () => {
    const colors = [90, 70, 50, 30, 10].map(getScoreColor)
    const uniqueColors = new Set(colors)
    expect(uniqueColors.size).toBe(5)
  })
})

describe('getScoreLabel', () => {
  test('returns Excellent for high scores', () => {
    expect(getScoreLabel(85)).toBe('Excellent')
  })

  test('returns Critical for very low scores', () => {
    expect(getScoreLabel(5)).toBe('Critical')
  })

  test('returns Good for mid-high scores', () => {
    expect(getScoreLabel(65)).toBe('Good')
  })
})

describe('co2ToTrees', () => {
  test('converts CO2 kg to number of trees', () => {
    expect(co2ToTrees(2100)).toBe(100)
  })

  test('returns 0 trees for 0 CO2', () => {
    expect(co2ToTrees(0)).toBe(0)
  })
})

describe('co2ToKmDriving', () => {
  test('converts CO2 kg to driving km equivalent', () => {
    expect(co2ToKmDriving(210)).toBe(1000)
  })
})

describe('co2ToFlights', () => {
  test('converts CO2 kg to flight equivalent', () => {
    expect(co2ToFlights(900)).toBe(1.0)
  })

  test('returns fractional flights for partial CO2', () => {
    expect(co2ToFlights(450)).toBe(0.5)
  })
})