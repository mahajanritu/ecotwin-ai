'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  ecoScore: number
  level: number
  xp: number
  streak: number
  location?: { city: string; country: string }
  badges?: string[]
}

export interface CarbonProfileData {
  annualCO2: number
  breakdown: {
    transport: number
    food: number
    home: number
    shopping: number
  }
  ecoScore: number
  history?: Array<{ date: string; co2: number; score: number }>
}

interface UseUserProfileResult {
  user: UserProfile | null
  profile: CarbonProfileData | null
  loading: boolean
  hasProfile: boolean
  refetch: () => void
}

export function useUserProfile(): UseUserProfileResult {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [profile, setProfile] = useState<CarbonProfileData | null>(null)
  const [loading, setLoading] = useState(false)
  const [tick, setTick] = useState(0)

  const refetch = () => setTick(t => t + 1)

  useEffect(() => {
    if (status !== 'authenticated') {
      setUser(null)
      setProfile(null)
      return
    }

    setLoading(true)
    fetch('/api/carbon/profile')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
          setProfile(data.profile)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [status, tick])

  return {
    user,
    profile,
    loading,
    hasProfile: !!profile,
    refetch,
  }
}
