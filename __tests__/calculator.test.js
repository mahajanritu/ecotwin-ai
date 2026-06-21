import { calculateCarbonFootprint, simulateLifestyleChange } from '@/lib/carbon'

describe('calculateCarbonFootprint', () => {
  const baseInput = {
    transport: { mode: 'car', weeklyKm: 200, flightsPerYear: 2, flightType: 'long' },
    food: { diet: 'mixed' },
    home: { source: 'grid', monthlyKwh: 300, householdSize: 3 },
    shopping: { habit: 'fast' },
  }

  test('returns a positive total CO2 value', () => {
    const result = calculateCarbonFootprint(baseInput)
    expect(result.total).toBeGreaterThan(0)
  })

  test('breaks down emissions into 4 categories', () => {
    const result = calculateCarbonFootprint(baseInput)
    expect(result.breakdown).toHaveProperty('transport')
    expect(result.breakdown).toHaveProperty('food')
    expect(result.breakdown).toHaveProperty('home')
    expect(result.breakdown).toHaveProperty('shopping')
  })

  test('breakdown sums up to the total', () => {
    const result = calculateCarbonFootprint(baseInput)
    const sum =
      result.breakdown.transport +
      result.breakdown.food +
      result.breakdown.home +
      result.breakdown.shopping
    expect(Math.round(sum)).toBe(Math.round(result.total))
  })

  test('ecoScore is always between 5 and 100', () => {
    const result = calculateCarbonFootprint(baseInput)
    expect(result.ecoScore).toBeGreaterThanOrEqual(5)
    expect(result.ecoScore).toBeLessThanOrEqual(100)
  })

  test('vegan diet produces less food CO2 than high-meat diet', () => {
    const veganResult = calculateCarbonFootprint({
      ...baseInput,
      food: { diet: 'vegan' },
    })
    const meatResult = calculateCarbonFootprint({
      ...baseInput,
      food: { diet: 'high-meat' },
    })
    expect(veganResult.breakdown.food).toBeLessThan(meatResult.breakdown.food)
  })

  test('bike commuting produces zero transport CO2 from driving', () => {
    const result = calculateCarbonFootprint({
      ...baseInput,
      transport: { mode: 'bike', weeklyKm: 200, flightsPerYear: 0, flightType: 'short' },
    })
    expect(result.breakdown.transport).toBe(0)
  })

  test('solar energy produces less home CO2 than grid electricity', () => {
    const solarResult = calculateCarbonFootprint({
      ...baseInput,
      home: { source: 'solar', monthlyKwh: 300, householdSize: 3 },
    })
    const gridResult = calculateCarbonFootprint({
      ...baseInput,
      home: { source: 'grid', monthlyKwh: 300, householdSize: 3 },
    })
    expect(solarResult.breakdown.home).toBeLessThan(gridResult.breakdown.home)
  })

  test('more flights increases transport CO2', () => {
    const fewFlights = calculateCarbonFootprint({
      ...baseInput,
      transport: { mode: 'car', weeklyKm: 200, flightsPerYear: 1, flightType: 'long' },
    })
    const manyFlights = calculateCarbonFootprint({
      ...baseInput,
      transport: { mode: 'car', weeklyKm: 200, flightsPerYear: 10, flightType: 'long' },
    })
    expect(manyFlights.breakdown.transport).toBeGreaterThan(fewFlights.breakdown.transport)
  })

  test('larger household reduces per-person home CO2', () => {
    const smallHousehold = calculateCarbonFootprint({
      ...baseInput,
      home: { source: 'grid', monthlyKwh: 300, householdSize: 1 },
    })
    const largeHousehold = calculateCarbonFootprint({
      ...baseInput,
      home: { source: 'grid', monthlyKwh: 300, householdSize: 5 },
    })
    expect(largeHousehold.breakdown.home).toBeLessThan(smallHousehold.breakdown.home)
  })

  test('minimal shopping produces less CO2 than fast fashion', () => {
    const minimalResult = calculateCarbonFootprint({
      ...baseInput,
      shopping: { habit: 'minimal' },
    })
    const fastResult = calculateCarbonFootprint({
      ...baseInput,
      shopping: { habit: 'fast' },
    })
    expect(minimalResult.breakdown.shopping).toBeLessThan(fastResult.breakdown.shopping)
  })

  test('calculates a positive trees needed value', () => {
    const result = calculateCarbonFootprint(baseInput)
    expect(result.treesNeeded).toBeGreaterThan(0)
  })

  test('calculates a positive money cost value', () => {
    const result = calculateCarbonFootprint(baseInput)
    expect(result.moneyCost).toBeGreaterThan(0)
  })
})

describe('simulateLifestyleChange', () => {
  const baseInput = {
    transport: { mode: 'car', weeklyKm: 200, flightsPerYear: 2, flightType: 'long' },
    food: { diet: 'mixed' },
    home: { source: 'grid', monthlyKwh: 300, householdSize: 3 },
    shopping: { habit: 'fast' },
  }
  const baseline = calculateCarbonFootprint(baseInput)

  test('no changes results in zero CO2 saved', () => {
    const sim = simulateLifestyleChange(baseline, {})
    expect(sim.co2Saved).toBeCloseTo(0, 1)
  })

  test('driving less reduces total CO2', () => {
    const sim = simulateLifestyleChange(baseline, { driveLess: 50 })
    expect(sim.newCO2).toBeLessThan(baseline.total)
  })

  test('100% plant-based reduces food emissions', () => {
    const sim = simulateLifestyleChange(baseline, { plantBased: 100 })
    expect(sim.co2Saved).toBeGreaterThan(0)
  })

  test('combining all lifestyle changes maximizes CO2 saved', () => {
    const partialSim = simulateLifestyleChange(baseline, { driveLess: 50 })
    const fullSim = simulateLifestyleChange(baseline, {
      driveLess: 80,
      plantBased: 80,
      solarAdoption: 80,
      reduceFlight: 80,
      sustainableShopping: 80,
    })
    expect(fullSim.co2Saved).toBeGreaterThan(partialSim.co2Saved)
  })

  test('newScore is always between 5 and 100', () => {
    const sim = simulateLifestyleChange(baseline, { driveLess: 100, plantBased: 100 })
    expect(sim.newScore).toBeGreaterThanOrEqual(5)
    expect(sim.newScore).toBeLessThanOrEqual(100)
  })

  test('treesSaved is non-negative for positive changes', () => {
    const sim = simulateLifestyleChange(baseline, { driveLess: 50 })
    expect(sim.treesSaved).toBeGreaterThanOrEqual(0)
  })

  test('percentReduction is between 0 and 100 for realistic changes', () => {
    const sim = simulateLifestyleChange(baseline, { driveLess: 50, plantBased: 50 })
    expect(sim.percentReduction).toBeGreaterThanOrEqual(0)
    expect(sim.percentReduction).toBeLessThanOrEqual(100)
  })
})