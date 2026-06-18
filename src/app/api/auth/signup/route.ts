import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const dynamic = 'force-dynamic'

// POST /api/auth/signup
// Body: { name: string, email: string, password: string }
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 })
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    await connectDB()

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Try signing in instead.' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedPassword,
      ecoScore: 50,
      level: 1,
      xp: 0,
      streak: 0,
      onboarded: false,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Signup error:', err)

    if (err instanceof Error && err.message.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database is not configured yet. Add MONGODB_URI to .env.local to enable sign up.' },
        { status: 503 }
      )
    }

    return NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 })
  }
}
