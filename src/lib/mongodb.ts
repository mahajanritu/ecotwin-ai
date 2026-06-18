import mongoose from 'mongoose'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

/**
 * Connects to MongoDB Atlas.
 *
 * Throws if MONGODB_URI is not configured — callers should wrap this in
 * try/catch and gracefully degrade (the app's API routes already do this,
 * falling back to demo data when the DB is unavailable).
 *
 * IMPORTANT: We deliberately do NOT throw at module-load time. Throwing at
 * import time would crash `next build` and any route that imports this file,
 * even ones that never call connectDB(). The check happens lazily here.
 */
async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it to your .env.local file to enable database features (leaderboard, saved profiles, etc).'
    )
  }

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  return cached.conn
}

export default connectDB
