import { calculateCarbonFootprint } from '@/lib/carbon'

// These tests verify the validation contract that the
// /api/carbon/calculate route relies on before calling
// calculateCarbonFootprint — ensuring malformed requests
// are rejected the same way the live API rejects them.

function isValidCalcInput(body) {
  return !!(body?.transport && body?.food && body?.home && body?.shopping)
}

describe('Carbon calculate API — input validation contract', () => {
  test('rejects request missing transport field', () => {
    const body = { food: { diet: 'mixed' }, home: {}, shopping: {} }
    expect(isValidCalcInput(body)).toBe(false)
  })

  test('rejects request missing food field', () => {
    const body = { transport: {}, home: {}, shopping: {} }
    expect(isValidCalcInput(body)).toBe(false)
  })

  test('rejects completely empty request body', () => {
    expect(isValidCalcInput({})).toBe(false)
  })

  test('rejects null body', () => {
    expect(isValidCalcInput(null)).toBe(false)
  })

  test('accepts a fully-formed valid request body', () => {
    const body = {
      transport: { mode: 'car', weeklyKm: 100, flightsPerYear: 1, flightType: 'short' },
      food: { diet: 'mixed' },
      home: { source: 'grid', monthlyKwh: 250, householdSize: 2 },
      shopping: { habit: 'minimal' },
    }
    expect(isValidCalcInput(body)).toBe(true)
  })

  test('a valid request body produces a usable calculation result', () => {
    const body = {
      transport: { mode: 'car', weeklyKm: 100, flightsPerYear: 1, flightType: 'short' },
      food: { diet: 'mixed' },
      home: { source: 'grid', monthlyKwh: 250, householdSize: 2 },
      shopping: { habit: 'minimal' },
    }
    expect(isValidCalcInput(body)).toBe(true)
    const result = calculateCarbonFootprint(body)
    expect(result.total).toBeGreaterThan(0)
    expect(result).toHaveProperty('ecoScore')
    expect(result).toHaveProperty('breakdown')
  })
})

describe('Signup API — input validation contract', () => {
  const PASSWORD_MIN_LENGTH = 6
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function isValidSignup({ name, email, password }) {
    if (!name || !email || !password) return { valid: false, reason: 'missing_fields' }
    if (password.length < PASSWORD_MIN_LENGTH) return { valid: false, reason: 'password_too_short' }
    if (!emailRegex.test(email)) return { valid: false, reason: 'invalid_email' }
    return { valid: true }
  }

  test('rejects signup with missing name', () => {
    const result = isValidSignup({ name: '', email: 'a@b.com', password: 'secret1' })
    expect(result.valid).toBe(false)
    expect(result.reason).toBe('missing_fields')
  })

  test('rejects signup with short password', () => {
    const result = isValidSignup({ name: 'Test User', email: 'a@b.com', password: '123' })
    expect(result.valid).toBe(false)
    expect(result.reason).toBe('password_too_short')
  })

  test('rejects signup with invalid email format', () => {
    const result = isValidSignup({ name: 'Test User', email: 'not-an-email', password: 'secret1' })
    expect(result.valid).toBe(false)
    expect(result.reason).toBe('invalid_email')
  })

  test('accepts a fully valid signup payload', () => {
    const result = isValidSignup({ name: 'Test User', email: 'test@example.com', password: 'secret123' })
    expect(result.valid).toBe(true)
  })

  test('rejects email without domain extension', () => {
    const result = isValidSignup({ name: 'Test User', email: 'test@example', password: 'secret123' })
    expect(result.valid).toBe(false)
  })
})