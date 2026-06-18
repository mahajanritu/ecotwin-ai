import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Challenge from '@/models/Challenge'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import User from '@/models/User'

// GET /api/community/challenges?status=active
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    await connectDB()
    const query: Record<string, unknown> = {}
    if (status) query.status = status

    const challenges = await Challenge.find(query).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, challenges })
  } catch (err) {
    console.error('Challenges fetch error:', err)
    return NextResponse.json({ success: true, challenges: [], note: 'Database unavailable.' })
  }
}

// POST /api/community/challenges  — join a challenge
// Body: { challengeId: string }
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { challengeId } = await req.json()
    await connectDB()

    const user = await User.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    await Challenge.findByIdAndUpdate(challengeId, {
      $addToSet: { participants: user._id },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Join challenge error:', err)
    return NextResponse.json({ error: 'Failed to join challenge' }, { status: 500 })
  }
}
