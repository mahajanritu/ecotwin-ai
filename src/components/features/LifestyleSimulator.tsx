'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { simulateLifestyleChange, calculateCarbonFootprint } from '@/lib/carbon'
import { getScoreColor } from '@/lib/utils'

const SLIDERS = [
  { key: 'driveLess', label: 'Drive less', icon: '🚗', color: '#FCD34D' },
  { key: 'plantBased', label: 'Eat more plant-based', icon: '🥗', color: '#4ADE80' },
  { key: 'solarAdoption', label: 'Switch to solar', icon: '☀️', color: '#FCD34D' },
  { key: 'reduceFlight', label: 'Reduce flights', icon: '✈️', color: '#60A5FA' },
  { key: 'sustainableShopping', label: 'Shop sustainably', icon: '🛍️', color: '#A78BFA' },
] as const

const baseline = calculateCarbonFootprint({
  transport: { mode: 'car', weeklyKm: 200, flightsPerYear: 3, flightType: 'long' },
  food: { diet: 'mixed' },
  home: { source: 'grid', monthlyKwh: 300, householdSize: 3 },
  shopping: { habit: 'fast' },
})

export default function LifestyleSimulator() {
  const [values, setValues] = useState({
    driveLess: 50,
    plantBased: 40,
    solarAdoption: 0,
    reduceFlight: 30,
    sustainableShopping: 20,
  })

  const sim = useMemo(() => simulateLifestyleChange(baseline, values), [values])
  const scoreColor = getScoreColor(sim.newScore)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sliders */}
      <div className="p-6 rounded-2xl border border-eco-border bg-eco-card/60">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={16} className="text-eco-green" />
          <h3 className="font-semibold text-white text-[15px]">Adjust your lifestyle</h3>
        </div>
        <div className="space-y-6">
          {SLIDERS.map(({ key, label, icon, color }) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] text-eco-text flex items-center gap-2">
                  <span>{icon}</span> {label}
                </span>
                <span className="text-[13px] font-bold" style={{ color }}>{values[key]}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={values[key]}
                onChange={(e) => setValues(v => ({ ...v, [key]: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Live results */}
      <div className="p-6 rounded-2xl border border-eco-green/20 bg-eco-green/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(74,222,128,0.08), transparent 60%)' }} />

        <div className="flex items-center justify-between mb-6 relative">
          <h3 className="font-semibold text-white text-[15px]">Live AI prediction</h3>
          <div className="flex items-center gap-1.5 text-[11px] text-eco-green">
            <span className="w-1.5 h-1.5 bg-eco-green rounded-full animate-pulse" /> Real-time
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-5 mb-6 relative">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
              <motion.circle
                cx="48" cy="48" r="40" fill="none" stroke={scoreColor} strokeWidth="7" strokeLinecap="round"
                animate={{ strokeDasharray: `${(sim.newScore / 100) * 251.3} 251.3` }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <motion.span key={sim.newScore} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                className="text-2xl font-black" style={{ color: scoreColor }}>
                {sim.newScore}
              </motion.span>
              <span className="text-[10px] text-eco-muted-light">EcoScore</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-eco-muted-light uppercase tracking-wider mb-1">Projected CO₂</div>
            <motion.div key={sim.newCO2} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
              className="text-3xl font-black text-eco-green">
              {(sim.newCO2 / 1000).toFixed(1)}t
            </motion.div>
            <div className="text-[11px] text-eco-muted-light">
              down from {(baseline.total / 1000).toFixed(1)}t
            </div>
          </div>
        </div>

        {/* Savings grid */}
        <div className="grid grid-cols-3 gap-2 relative">
          {[
            { val: `${sim.percentReduction}%`, label: 'CO₂ reduction' },
            { val: `₹${(sim.moneySaved).toLocaleString()}`, label: 'saved / year' },
            { val: `${sim.treesSaved}`, label: 'trees equivalent' },
          ].map(({ val, label }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-eco-green/8 border border-eco-green/15 text-center">
              <div className="text-lg font-black text-eco-green">{val}</div>
              <div className="text-[10px] text-eco-muted-light leading-tight">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Impact bar */}
        <div className="mt-5 relative">
          <div className="flex justify-between text-[11px] text-eco-muted-light mb-1.5">
            <span>Impact level</span>
            <span className="font-semibold" style={{ color: scoreColor }}>
              {sim.percentReduction > 50 ? 'Excellent' : sim.percentReduction > 25 ? 'Good' : 'Getting started'}
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${scoreColor}, #2DD4BF)` }}
              animate={{ width: `${sim.percentReduction}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
