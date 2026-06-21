'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, Check, Zap, Loader2 } from 'lucide-react'
import { calculateCarbonFootprint, type CalcInput } from '@/lib/carbon'
import ResultsPanel from '@/components/features/ResultsPanel'
import toast from 'react-hot-toast'

const STEPS = ['Transport', 'Food', 'Home', 'Shopping', 'Results']

const TRANSPORT_OPTIONS = [
  { id: 'car', label: 'Private Car', icon: '🚗', co2: '~2.4t/yr' },
  { id: 'bus', label: 'Bus / Metro', icon: '🚌', co2: '~0.3t/yr' },
  { id: 'train', label: 'Train', icon: '🚂', co2: '~0.1t/yr' },
  { id: 'bike', label: 'Bike / Walk', icon: '🚲', co2: '0t/yr' },
]
const FOOD_OPTIONS = [
  { id: 'high-meat', label: 'High Meat', icon: '🥩', co2: '~3.3t/yr', desc: 'Beef, lamb daily' },
  { id: 'mixed', label: 'Mixed Diet', icon: '🍗', co2: '~2.5t/yr', desc: 'Chicken, fish, some veg' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', co2: '~1.7t/yr', desc: 'No meat, dairy ok' },
  { id: 'vegan', label: 'Vegan', icon: '🌱', co2: '~1.5t/yr', desc: 'Plant-based only' },
]
const HOME_OPTIONS = [
  { id: 'grid', label: 'Grid Electricity', icon: '⚡', co2: '~1.2t/yr' },
  { id: 'lpg', label: 'LPG / Gas', icon: '🔥', co2: '~1.8t/yr' },
  { id: 'solar', label: 'Solar Panels', icon: '☀️', co2: '~0.2t/yr' },
  { id: 'mixed', label: 'Grid + Solar', icon: '🌤️', co2: '~0.7t/yr' },
]
const SHOPPING_OPTIONS = [
  { id: 'fast', label: 'Fast Fashion', icon: '🛒', co2: '~0.8t/yr' },
  { id: 'secondhand', label: 'Second-hand', icon: '♻️', co2: '~0.2t/yr' },
  { id: 'sustainable', label: 'Sustainable', icon: '🌿', co2: '~0.4t/yr' },
  { id: 'minimal', label: 'Minimalist', icon: '📦', co2: '~0.1t/yr' },
]

function OptionCard({ option, selected, onSelect }: {
  option: { id: string; label: string; icon: string; co2: string; desc?: string }
  selected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${
        selected
          ? 'border-eco-green bg-eco-green/8 shadow-eco'
          : 'border-eco-border bg-eco-card/50 hover:border-eco-green/30'
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-eco-green flex items-center justify-center">
          <Check size={11} className="text-eco-dark" />
        </div>
      )}
      <div className="text-3xl mb-3">{option.icon}</div>
      <div className="font-semibold text-white text-[14px] mb-1">{option.label}</div>
      {option.desc && <div className="text-eco-muted-light text-[11px] mb-2">{option.desc}</div>}
      <div className="text-[11px] font-medium" style={{ color: selected ? '#4ADE80' : '#74957B' }}>
        {option.co2}
      </div>
    </motion.div>
  )
}

function SliderField({ label, min, max, value, step, unit, onChange }: {
  label: string; min: number; max: number; value: number; step: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[14px] text-eco-text">{label}</span>
        <span className="text-[14px] font-semibold text-eco-green">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value} step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: '#4ADE80' }}
      />
      <div className="flex justify-between text-[10px] text-eco-muted mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

export default function CalculatorPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [answers, setAnswers] = useState({
    transportMode: 'car',
    weeklyKm: 200,
    flightsPerYear: 3,
    flightType: 'long' as 'short' | 'long',
    diet: 'mixed',
    energySource: 'grid',
    monthlyKwh: 300,
    householdSize: 3,
    shoppingHabit: 'fast',
  })
  const [result, setResult] = useState<ReturnType<typeof calculateCarbonFootprint> | null>(null)

  const set = (key: string, val: unknown) => setAnswers(a => ({ ...a, [key]: val }))

  const handleNext = async () => {
    if (step < 3) {
      setStep(s => s + 1)
      return
    }

    // Step 3 → calculate + save
    const input: CalcInput = {
      transport: {
        mode: answers.transportMode as CalcInput['transport']['mode'],
        weeklyKm: answers.weeklyKm,
        flightsPerYear: answers.flightsPerYear,
        flightType: answers.flightType,
      },
      food: { diet: answers.diet as CalcInput['food']['diet'] },
      home: {
        source: answers.energySource as CalcInput['home']['source'],
        monthlyKwh: answers.monthlyKwh,
        householdSize: answers.householdSize,
      },
      shopping: { habit: answers.shoppingHabit as CalcInput['shopping']['habit'] },
    }

    const calculated = calculateCarbonFootprint(input)
    setResult(calculated)
    setStep(4)

    // Save to MongoDB if logged in
    if (session) {
      setSaving(true)
      try {
        const res = await fetch('/api/carbon/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        })
        if (res.ok) {
          toast.success('Results saved to your profile!')
        }
      } catch {
        // Silently ignore — result still shown locally
      } finally {
        setSaving(false)
      }
    }
  }

  const handleViewDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* Progress */}
        {step < 4 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              {STEPS.slice(0, 4).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border transition-all
                    ${i < step ? 'bg-eco-green border-eco-green text-eco-dark' :
                    i === step ? 'border-eco-green text-eco-green' :
                    'border-eco-border text-eco-muted'}`}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-[13px] hidden sm:block ${i === step ? 'text-eco-green font-medium' : 'text-eco-muted'}`}>
                    {s}
                  </span>
                  {i < 3 && <div className="w-6 sm:w-10 h-px bg-eco-border mx-1" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* Step 0: Transport */}
          {step === 0 && (
            <motion.div key="transport" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-black text-white mb-2">How do you get around?</h1>
              <p className="text-eco-muted-light mb-8">Transport is usually the biggest chunk of your footprint.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {TRANSPORT_OPTIONS.map(o => (
                  <OptionCard key={o.id} option={o} selected={answers.transportMode === o.id}
                    onSelect={() => set('transportMode', o.id)} />
                ))}
              </div>
              <SliderField label="Weekly driving distance" min={0} max={1000} value={answers.weeklyKm}
                step={10} unit=" km" onChange={v => set('weeklyKm', v)} />
              <SliderField label="Flights per year" min={0} max={20} value={answers.flightsPerYear}
                step={1} unit=" flights" onChange={v => set('flightsPerYear', v)} />
            </motion.div>
          )}

          {/* Step 1: Food */}
          {step === 1 && (
            <motion.div key="food" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-black text-white mb-2">What do you eat?</h1>
              <p className="text-eco-muted-light mb-8">Diet accounts for 20–30% of the average footprint.</p>
              <div className="grid grid-cols-2 gap-3">
                {FOOD_OPTIONS.map(o => (
                  <OptionCard key={o.id} option={o} selected={answers.diet === o.id}
                    onSelect={() => set('diet', o.id)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Home */}
          {step === 2 && (
            <motion.div key="home" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-black text-white mb-2">How is your home powered?</h1>
              <p className="text-eco-muted-light mb-8">Home energy is often overlooked but very actionable.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {HOME_OPTIONS.map(o => (
                  <OptionCard key={o.id} option={o} selected={answers.energySource === o.id}
                    onSelect={() => set('energySource', o.id)} />
                ))}
              </div>
              <SliderField label="Monthly electricity usage" min={50} max={1000} value={answers.monthlyKwh}
                step={10} unit=" kWh" onChange={v => set('monthlyKwh', v)} />
              <SliderField label="Household size" min={1} max={10} value={answers.householdSize}
                step={1} unit=" people" onChange={v => set('householdSize', v)} />
            </motion.div>
          )}

          {/* Step 3: Shopping */}
          {step === 3 && (
            <motion.div key="shopping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-black text-white mb-2">How do you shop?</h1>
              <p className="text-eco-muted-light mb-8">Fast fashion alone generates 10% of global CO₂.</p>
              <div className="grid grid-cols-2 gap-3">
                {SHOPPING_OPTIONS.map(o => (
                  <OptionCard key={o.id} option={o} selected={answers.shoppingHabit === o.id}
                    onSelect={() => set('shoppingHabit', o.id)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Saving indicator */}
              {saving && (
                <div className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-xl bg-eco-green/10
                  border border-eco-green/20 text-eco-green text-[13px]">
                  <Loader2 size={14} className="animate-spin" />
                  Saving your results to your profile...
                </div>
              )}

              {/* Login nudge if not signed in */}
              {!session && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-eco-card border border-eco-border
                  flex items-center justify-between gap-4">
                  <p className="text-[13px] text-eco-muted-light">
                    Sign in to save your results and track progress over time.
                  </p>
                  <a href="/auth/signin" className="text-[13px] font-semibold text-eco-green whitespace-nowrap hover:underline">
                    Sign in →
                  </a>
                </div>
              )}

              <ResultsPanel result={result} onViewDashboard={handleViewDashboard} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep(s => Math.max(s - 1, 0))}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-eco-border
                text-eco-muted-light hover:text-eco-text transition-all disabled:opacity-30"
            >
              <ArrowLeft size={15} /> Back
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3 bg-eco-green text-eco-dark font-bold
                rounded-full text-[14px] shadow-eco"
            >
              {step === 3 ? (<><Zap size={15} /> Calculate My Footprint</>) : (<>Next <ArrowRight size={15} /></>)}
            </motion.button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
