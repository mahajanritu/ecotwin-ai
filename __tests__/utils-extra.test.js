import { cn, interpolateColor, sleep } from '@/lib/utils'

describe('cn (classname merger)', () => {
  test('merges multiple class strings', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  test('handles conditional classes', () => {
    const result = cn('base-class', false && 'hidden-class', 'visible-class')
    expect(result).toContain('base-class')
    expect(result).toContain('visible-class')
    expect(result).not.toContain('hidden-class')
  })

  test('deduplicates conflicting tailwind classes', () => {
    const result = cn('text-sm', 'text-lg')
    expect(result).toBe('text-lg')
  })

  test('handles empty input', () => {
    expect(cn()).toBe('')
  })
})

describe('interpolateColor', () => {
  test('returns first color at t=0', () => {
    expect(interpolateColor('#000000', '#ffffff', 0)).toBe('#000000')
  })

  test('returns second color at t=1', () => {
    expect(interpolateColor('#000000', '#ffffff', 1)).toBe('#ffffff')
  })

  test('returns a midpoint color at t=0.5', () => {
    const result = interpolateColor('#000000', '#ffffff', 0.5)
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })

  test('interpolates between two distinct theme colors', () => {
    const result = interpolateColor('#F87171', '#4ADE80', 0.5)
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
    expect(result).not.toBe('#F87171')
    expect(result).not.toBe('#4ADE80')
  })
})

describe('sleep', () => {
  test('resolves after the given time', async () => {
    const start = Date.now()
    await sleep(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(45)
  })

  test('returns a promise', () => {
    const result = sleep(0)
    expect(result).toBeInstanceOf(Promise)
  })
})