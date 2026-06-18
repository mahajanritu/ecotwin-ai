import { NextRequest, NextResponse } from 'next/server'
import { calculateCarbonFootprint, type CalcInput } from '@/lib/carbon'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import CarbonProfile from '@/models/CarbonProfile'
import User from '@/models/User'

// POST /api/carbon/calculate
// Body: CalcInput
// Calculates the carbon footprint and (if authenticated) persists it to MongoDB
export async function POST(req: NextRequest) {
  try {
    const body: CalcInput = await req.json()

    if (!body?.transport || !body?.food || !body?.home || !body?.shopping) {
      return NextResponse.json({ error: 'Invalid input. Missing required fields.' }, { status: 400 })
    }

    const result = calculateCarbonFootprint(body)

    // Try to persist if user is logged in — fail silently otherwise (free-tier friendly)
    try {
      const session = await getServerSession(authOptions)
      if (session?.user?.email) {
        await connectDB()
        const user = await User.findOne({ email: session.user.email })
        if (user) {
          await CarbonProfile.findOneAndUpdate(
            { userId: user._id },
            {
              userId: user._id,
              annualCO2: result.total,
              breakdown: result.breakdown,
              inputs: body,
              ecoScore: result.ecoScore,
              $push: { history: { date: new Date(), co2: result.total, score: result.ecoScore } },
            },
            { upsert: true, new: true }
          )
          await User.findByIdAndUpdate(user._id, { ecoScore: result.ecoScore })
        }
      }
    } catch (dbErr) {
      console.warn('Carbon profile not persisted (DB unavailable):', dbErr)
    }

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('Carbon calculation error:', err)
    return NextResponse.json({ error: 'Failed to calculate carbon footprint' }, { status: 500 })
  }
}
