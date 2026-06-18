// ============================================
// EcoTwin AI — Core Types
// ============================================

export interface User {
  _id: string
  name: string
  email: string
  image?: string
  ecoScore: number
  level: number
  xp: number
  streak: number
  createdAt: Date
  location?: {
    city: string
    country: string
  }
}

export interface CarbonProfile {
  userId: string
  annualCO2: number
  transport: TransportData
  food: FoodData
  home: HomeData
  shopping: ShoppingData
  updatedAt: Date
}

export interface TransportData {
  primaryMode: 'car' | 'bus' | 'train' | 'bike' | 'walk' | 'metro'
  weeklyKm: number
  flightsPerYear: number
  electricVehicle: boolean
  co2: number
}

export interface FoodData {
  diet: 'vegan' | 'vegetarian' | 'mixed' | 'high-meat'
  localSourcing: number
  foodWaste: number
  co2: number
}

export interface HomeData {
  energySource: 'grid' | 'solar' | 'mixed' | 'lpg'
  monthlyKwh: number
  householdSize: number
  greenRating: number
  co2: number
}

export interface ShoppingData {
  fashionHabit: 'fast' | 'secondhand' | 'sustainable' | 'minimal'
  techPurchases: number
  packagingAwareness: number
  co2: number
}

export interface ClimateTwin {
  userId: string
  current: TwinScenario
  improved: TwinScenario
  netZero: TwinScenario
  generatedAt: Date
}

export interface TwinScenario {
  label: string
  annualCO2: number
  ecoScore: number
  moneySaved: number
  treesSaved: number
  waterSaved: number
  energySaved: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xp: number
  unlockedAt?: Date
  progress: number
  maxProgress: number
  category: 'transport' | 'food' | 'energy' | 'community' | 'streak' | 'milestone'
}

export interface Challenge {
  _id: string
  title: string
  description: string
  category: string
  co2Impact: number
  duration: string
  participants: number
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'active' | 'upcoming' | 'completed'
  endsAt: Date
  icon: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  image?: string
  ecoScore: number
  level: string
  co2Saved: number
  city: string
  country: string
}

export interface ReceiptScan {
  type: 'electricity' | 'shopping' | 'transport' | 'food' | 'unknown'
  amount: number
  co2Impact: number
  energyUsed?: number
  date: Date
  rawText: string
  insights: string[]
}

export interface WeatherData {
  city: string
  temp: number
  aqi: number
  aqiLevel: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous'
  description: string
  uvIndex: number
}

export interface EcoStats {
  totalUsers: number
  totalCO2Tracked: number
  totalTreesGrown: number
  totalCO2Saved: number
}

export type NavItem = {
  label: string
  href: string
  icon: string
}

export type ToastType = 'success' | 'error' | 'info' | 'warning'
