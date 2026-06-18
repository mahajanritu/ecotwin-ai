import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CarbonProfile, ClimateTwin, User } from '@/types'

interface EcoStore {
  // User
  user: User | null
  setUser: (user: User | null) => void

  // Carbon Profile
  profile: CarbonProfile | null
  setProfile: (profile: CarbonProfile | null) => void

  // Climate Twin
  twin: ClimateTwin | null
  setTwin: (twin: ClimateTwin | null) => void

  // Calculator state
  calculatorStep: number
  setCalculatorStep: (step: number) => void
  calculatorAnswers: Record<string, unknown>
  setCalculatorAnswer: (key: string, value: unknown) => void
  resetCalculator: () => void

  // UI
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void

  // Simulator sliders
  simulatorValues: {
    driveLess: number
    plantBased: number
    solarAdoption: number
    reduceFlight: number
    sustainableShopping: number
  }
  setSimulatorValue: (key: string, value: number) => void

  // Notifications
  unreadCount: number
  setUnreadCount: (count: number) => void
}

export const useEcoStore = create<EcoStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      profile: null,
      setProfile: (profile) => set({ profile }),

      twin: null,
      setTwin: (twin) => set({ twin }),

      calculatorStep: 0,
      setCalculatorStep: (step) => set({ calculatorStep: step }),
      calculatorAnswers: {},
      setCalculatorAnswer: (key, value) =>
        set((state) => ({ calculatorAnswers: { ...state.calculatorAnswers, [key]: value } })),
      resetCalculator: () => set({ calculatorStep: 0, calculatorAnswers: {} }),

      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),

      simulatorValues: {
        driveLess: 0,
        plantBased: 0,
        solarAdoption: 0,
        reduceFlight: 0,
        sustainableShopping: 0,
      },
      setSimulatorValue: (key, value) =>
        set((state) => ({
          simulatorValues: { ...state.simulatorValues, [key]: value },
        })),

      unreadCount: 3,
      setUnreadCount: (count) => set({ unreadCount: count }),
    }),
    {
      name: 'ecotwin-storage',
      partialize: (state) => ({
        calculatorAnswers: state.calculatorAnswers,
        simulatorValues: state.simulatorValues,
      }),
    }
  )
)
