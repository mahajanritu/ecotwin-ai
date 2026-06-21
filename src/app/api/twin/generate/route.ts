import { NextRequest, NextResponse } from 'next/server'
import { calculateCarbonFootprint, simulateLifestyleChange, type CalcInput } from '@/lib/carbon'
import { generateClimateTwinNarrative } from '@/lib/groq'

// POST /api/twin/generate
// Body: { input: CalcInput }
// Generates 3 future scenarios (Current, Improved, Net Zero) for the AI Climate Twin
export async function POST(req: NextRequest) {
  try {
    const { input }: { input: CalcInput } = await req.json()

    if (!input) {
      return NextResponse.json({ error: 'Missing carbon profile input' }, { status: 400 })
    }

    const current = calculateCarbonFootprint(input)

    // Scenario B: Improved lifestyle (moderate changes)
    const improved = simulateLifestyleChange(current, {
      driveLess: 40,
      plantBased: 35,
      solarAdoption: 20,
      reduceFlight: 25,
      sustainableShopping: 30,
    })

    // Scenario C: Net Zero lifestyle (aggressive changes)
    const netZero = simulateLifestyleChange(current, {
      driveLess: 80,
      plantBased: 70,
      solarAdoption: 90,
      reduceFlight: 60,
      sustainableShopping: 70,
    })

    const narrative = await generateClimateTwinNarrative(current.total, current.ecoScore)

    return NextResponse.json({
      success: true,
      twin: {
        current: {
          label: 'Current You',
          co2: current.total,
          score: current.ecoScore,
          moneyCost: current.moneyCost,
          treesNeeded: current.treesNeeded,
        },
        improved: {
          label: 'Greener You',
          co2: improved.newCO2,
          score: improved.newScore,
          co2Saved: improved.co2Saved,
          moneySaved: improved.moneySaved,
          treesSaved: improved.treesSaved,
          percentReduction: improved.percentReduction,
        },
        netZero: {
          label: 'Net Zero You',
          co2: netZero.newCO2,
          score: netZero.newScore,
          co2Saved: netZero.co2Saved,
          moneySaved: netZero.moneySaved,
          treesSaved: netZero.treesSaved,
          percentReduction: netZero.percentReduction,
        },
      },
      narrative,
    })
  } catch (err) {
    console.error('Twin generation error:', err)
    return NextResponse.json({ error: 'Failed to generate climate twin' }, { status: 500 })
  }
}
