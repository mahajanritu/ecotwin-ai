import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        await connectDB()

        const user = await User.findOne({ email: credentials.email }).select('+password')

        if (!user || !user.password) {
          throw new Error('No account found with this email')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Incorrect password')
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Credentials users are created via /api/auth/signup — nothing to do here.
      if (account?.provider !== 'google') return true

      try {
        await connectDB()
        const existing = await User.findOne({ email: user.email })
        if (!existing) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            ecoScore: 50,
            level: 1,
            xp: 0,
            streak: 0,
          })
        }
        return true
      } catch (err) {
        console.error('SignIn error:', err)
        return true // allow sign in even if DB write fails (graceful degradation)
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: session.user.email })
          if (dbUser) {
            session.user.id = dbUser._id.toString()
            session.user.ecoScore = dbUser.ecoScore
            session.user.level = dbUser.level
            session.user.xp = dbUser.xp
          }
        } catch (err) {
          console.error('Session callback error:', err)
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
