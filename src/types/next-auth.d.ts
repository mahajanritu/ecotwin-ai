import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      ecoScore?: number
      level?: number
      xp?: number
    } & DefaultSession['user']
  }
}
