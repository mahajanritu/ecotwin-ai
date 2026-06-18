// ============================================
// EcoTwin AI — Carbon Calculation Engine
// Based on IPCC & EPA emission factors
// ============================================

export const EMISSION_FACTORS = {
  transport: {
    car: 0.21,        // kg CO2 per km
    bus: 0.089,
    metro: 0.041,
    train: 0.037,
    bike: 0,
    walk: 0,
    flight_short: 255, // kg CO2 per flight
    flight_long: 900,
  },
  food: {
    vegan: 1.5,        // tonnes CO2 per year
    vegetarian: 1.7,
    mixed: 2.5,
    'high-meat': 3.3,
  },
  home: {
    grid: 0.82,       // kg CO2 per kWh (India avg)
    solar: 0.04,
    lpg: 2.98,        // kg CO2 per kg LPG
    mixed: 0.45,
  },
  shopping: {
    fast: 0.8,         // tonnes CO2 per year
    secondhand: 0.2,
    sustainable: 0.4,
    minimal: 0.1,
  },
}

export interface CalcInput {
  transport: {
    mode: keyof typeof EMISSION_FACTORS.transport
    weeklyKm: number
    flightsPerYear: number
    flightType: 'short' | 'long'
  }
  food: {
    diet: keyof typeof EMISSION_FACTORS.food
  }
  home: {
    source: keyof typeof EMISSION_FACTORS.home
    monthlyKwh: number
    householdSize: number
  }
  shopping: {
    habit: keyof typeof EMISSION_FACTORS.shopping
  }
}

export interface CalcResult {
  total: number // kg CO2 per year
  breakdown: {
    transport: number
    food: number
    home: number
    shopping: number
  }
  ecoScore: number
  vsAverage: number // percentage difference from global average
  treesNeeded: number
  moneyCost: number // INR per year
}

const GLOBAL_AVG_CO2 = 4000 // kg per year

export function calculateCarbonFootprint(input: CalcInput): CalcResult {
  const transFactor = EMISSION_FACTORS.transport[input.transport.mode] as number
  const transportCO2 =
    transFactor * input.transport.weeklyKm * 52 +
    input.transport.flightsPerYear *
      (input.transport.flightType === 'short'
        ? EMISSION_FACTORS.transport.flight_short
        : EMISSION_FACTORS.transport.flight_long)

  const foodCO2 = (EMISSION_FACTORS.food[input.food.diet] as number) * 1000

  const homeCO2Factor = EMISSION_FACTORS.home[input.home.source] as number
  const homeCO2 =
    input.home.monthlyKwh * 12 * homeCO2Factor / input.home.householdSize

  const shoppingCO2 = (EMISSION_FACTORS.shopping[input.shopping.habit] as number) * 1000

  const total = transportCO2 + foodCO2 + homeCO2 + shoppingCO2
  const ecoScore = Math.max(5, Math.min(100, Math.round(100 - (total / 80)))  )
  const vsAverage = Math.round(((total - GLOBAL_AVG_CO2) / GLOBAL_AVG_CO2) * 100)
  const treesNeeded = Math.round(total / 21)
  const moneyCost = Math.round(total * 7.5)

  return {
    total,
    breakdown: {
      transport: transportCO2,
      food: foodCO2,
      home: homeCO2,
      shopping: shoppingCO2,
    },
    ecoScore,
    vsAverage,
    treesNeeded,
    moneyCost,
  }
}

export function simulateLifestyleChange(
  baseline: CalcResult,
  changes: {
    driveLess?: number       // 0-100%
    plantBased?: number      // 0-100%
    solarAdoption?: number   // 0-100%
    reduceFlight?: number    // 0-100%
    sustainableShopping?: number // 0-100%
  }
): {
  newCO2: number
  co2Saved: number
  moneySaved: number
  treesSaved: number
  percentReduction: number
  newScore: number
} {
  const {
    driveLess = 0,
    plantBased = 0,
    solarAdoption = 0,
    reduceFlight = 0,
    sustainableShopping = 0,
  } = changes

  const newTransport = baseline.breakdown.transport * (1 - driveLess / 100) * (1 - reduceFlight / 200)
  const newFood = baseline.breakdown.food * (1 - (plantBased / 100) * 0.45)
  const newHome = baseline.breakdown.home * (1 - solarAdoption / 100 * 0.92)
  const newShopping = baseline.breakdown.shopping * (1 - sustainableShopping / 100 * 0.75)

  const newCO2 = newTransport + newFood + newHome + newShopping
  const co2Saved = baseline.total - newCO2
  const moneySaved = Math.round(co2Saved * 7.5)
  const treesSaved = Math.round(co2Saved / 21)
  const percentReduction = Math.round((co2Saved / baseline.total) * 100)
  const newScore = Math.max(5, Math.min(100, Math.round(100 - newCO2 / 80)))

  return { newCO2, co2Saved, moneySaved, treesSaved, percentReduction, newScore }
}
