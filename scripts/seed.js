/**
 * EcoTwin AI — Database Seed Script
 *
 * Populates MongoDB Atlas with demo challenges and sample leaderboard users.
 * Run with: npm run seed
 *
 * Requires MONGODB_URI to be set in .env.local
 */

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const ChallengeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
    category: String,
    co2Impact: Number,
    difficulty: String,
    status: String,
    startsAt: Date,
    endsAt: Date,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    ecoScore: Number,
    level: Number,
    xp: Number,
    streak: Number,
    location: { city: String, country: String },
    badges: [String],
    onboarded: Boolean,
  },
  { timestamps: true }
)

const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema)
const User = mongoose.models.User || mongoose.model('User', UserSchema)

const CHALLENGES = [
  {
    title: 'No Car Week',
    description: 'Use only public transport, bike, or walk for an entire week.',
    icon: '🚲',
    category: 'transport',
    co2Impact: 12000,
    difficulty: 'medium',
    status: 'active',
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Plastic Free July',
    description: 'Eliminate single-use plastics for the whole month.',
    icon: '🌊',
    category: 'shopping',
    co2Impact: 8000,
    difficulty: 'medium',
    status: 'upcoming',
    startsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Energy Save Month',
    description: 'Reduce home energy use by 20% this month.',
    icon: '💡',
    category: 'home',
    co2Impact: 25000,
    difficulty: 'hard',
    status: 'active',
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Meatless Mondays',
    description: 'Skip meat every Monday for 4 weeks straight.',
    icon: '🥗',
    category: 'food',
    co2Impact: 6000,
    difficulty: 'easy',
    status: 'active',
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
  },
]

const DEMO_USERS = [
  { name: 'Priya Sharma', email: 'priya.demo@ecotwin.ai', ecoScore: 87, level: 7, xp: 9840, streak: 42, location: { city: 'Surat', country: 'India' }, onboarded: true, badges: ['eco-starter', 'planet-guardian', 'earth-hero'] },
  { name: 'Ravi Mehta', email: 'ravi.demo@ecotwin.ai', ecoScore: 81, level: 6, xp: 8210, streak: 30, location: { city: 'Surat', country: 'India' }, onboarded: true, badges: ['eco-starter', 'planet-guardian'] },
  { name: 'Ananya Kapoor', email: 'ananya.demo@ecotwin.ai', ecoScore: 75, level: 5, xp: 7650, streak: 18, location: { city: 'Surat', country: 'India' }, onboarded: true, badges: ['eco-starter'] },
  { name: 'Aarav Patel', email: 'aarav.demo@ecotwin.ai', ecoScore: 92, level: 9, xp: 24500, streak: 90, location: { city: 'Mumbai', country: 'India' }, onboarded: true, badges: ['eco-starter', 'planet-guardian', 'earth-hero', 'streak-master'] },
  { name: 'Emma Thompson', email: 'emma.demo@ecotwin.ai', ecoScore: 96, level: 12, xp: 48200, streak: 180, location: { city: 'Stockholm', country: 'Sweden' }, onboarded: true, badges: ['eco-starter', 'planet-guardian', 'earth-hero', 'streak-master'] },
]

async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local')
    process.exit(1)
  }

  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(uri)

  console.log('🌱 Seeding challenges...')
  await Challenge.deleteMany({ title: { $in: CHALLENGES.map(c => c.title) } })
  await Challenge.insertMany(CHALLENGES)

  console.log('🌱 Seeding demo leaderboard users...')
  for (const u of DEMO_USERS) {
    await User.findOneAndUpdate({ email: u.email }, u, { upsert: true })
  }

  console.log('✅ Seed complete!')
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
