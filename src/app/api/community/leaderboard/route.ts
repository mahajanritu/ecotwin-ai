import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const dynamic = 'force-dynamic'


// GET /api/community/leaderboard?scope=city|country|global&city=&country=&limit=20
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const scope = searchParams.get('scope') || 'global'
    const city = searchParams.get('city')
    const country = searchParams.get('country')
    const limit = parseInt(searchParams.get('limit') || '20')

    await connectDB()

    const query: Record<string, unknown> = {}
    if (scope === 'city' && city) query['location.city'] = city
    if (scope === 'country' && country) query['location.country'] = country

    const users = await User.find(query)
      .sort({ xp: -1, ecoScore: -1 })
      .limit(limit)
      .select('name image ecoScore level xp location')
      .lean()

    const leaderboard = users.map((u, i) => {
      const doc = u as unknown as {
        _id: { toString(): string }
        name: string
        image?: string
        ecoScore: number
        xp: number
        level: number
        location?: { city?: string; country?: string }
      }
      return {
        rank: i + 1,
        userId: doc._id.toString(),
        name: doc.name,
        image: doc.image,
        ecoScore: doc.ecoScore,
        xp: doc.xp,
        level: doc.level,
        city: doc.location?.city || 'Unknown',
        country: doc.location?.country || 'Unknown',
      }
    })

    return NextResponse.json({ success: true, scope, leaderboard })
  } catch (err) {
    console.error('Leaderboard error:', err)
    // Graceful fallback with demo data if DB is unavailable
    return NextResponse.json({
      success: true,
      scope: 'global',
      leaderboard: [],
      note: 'Database unavailable — connect MongoDB Atlas to enable live leaderboard.',
    })
  }
}
