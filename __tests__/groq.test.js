import { generateClimateTwinNarrative, generateActionPlan } from '@/lib/groq'

describe('generateClimateTwinNarrative (fallback path)', () => {
  test('returns a non-empty string when no API key is configured', async () => {
    const result = await generateClimateTwinNarrative(6400, 42)
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  test('fallback message mentions the tonnes value', async () => {
    const result = await generateClimateTwinNarrative(6400, 42)
    expect(result).toContain('6.4')
  })

  test('fallback message mentions the score', async () => {
    const result = await generateClimateTwinNarrative(6400, 42)
    expect(result).toContain('42')
  })
})

describe('generateActionPlan (fallback path)', () => {
  test('returns a non-empty string when no API key is configured', async () => {
    const result = await generateActionPlan(6400, 'transport')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  test('fallback message references the given category', async () => {
    const result = await generateActionPlan(6400, 'transport')
    expect(result.toLowerCase()).toContain('transport')
  })
})