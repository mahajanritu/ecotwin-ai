import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import CarbonProfile from '@/models/CarbonProfile'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const user = await User.findOne({ email: session.user.email })
      .select('-password')
      .lean() as any

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const profile = await CarbonProfile.findOne({ userId: user._id })

    return NextResponse.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        image: user.image,
        ecoScore: user.ecoScore ?? 50,
        level: user.level ?? 1,
        xp: user.xp ?? 0,
        streak: user.streak ?? 0,
        location: user.location,
        badges: user.badges,
      },
      profile: profile || null,
    })
  } catch (err) {
    console.error('Profile fetch error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}