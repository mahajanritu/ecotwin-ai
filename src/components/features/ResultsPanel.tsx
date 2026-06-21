'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TreePine, Car, Plane, ArrowRight, TrendingDown } from 'lucide-react'
import { getScoreColor, getScoreLabel, co2ToTrees, co2ToKmDriving, co2ToFlights, formatCurrency } from '@/lib/utils'
import type { CalcResult } from '@/lib/carbon'

const CATEGORIES = [
  { key: 'transport', label: 'Transport', icon: '🚗', color: '#F97316' },
  { key: 'food', label: 'Food', icon: '🍽️', color: '#FCD34D' },
  { key: 'home', label: 'Home', icon: '🏠', color: '#60A5FA' },
  { key: 'shopping', label: 'Shopping', icon: '🛍️', color: '#A78BFA' },
]

export default function ResultsPanel({ result, onViewDashboard }: { result: CalcResult; onViewDashboard?: () => void }) {
  const scoreColor = getScoreColor(result.ecoScore)
  const scoreLabel = getScoreLabel(result.ecoScore)
  const totalKg = Math.round(result.total)
  const totalTonnes = (result.total / 1000).toFixed(1)

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-sm text-eco-muted-light mb-2 uppercase tracking-widest">Your result is ready</div>
        <h1 className="text-3xl font-black text-white mb-1">Your Carbon Footprint</h1>
        <p className="text-eco-muted-light text-[14px]">AI analysis complete — here&apos;s where you stand.</p>
      </div>

      {/* Main score */}
      <div className="relative p-8 rounded-2xl border border-eco-border bg-eco-card/80 mb-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${scoreColor}0A, transparent 70%)` }} />

        <div className="relative inline-flex items-center justify-center mb-4">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <motion.circle
              cx="60" cy="60" r="50" fill="none"
              stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(result.ecoScore / 100) * 314.2} 314.2`}
              initial={{ strokeDasharray: '0 314.2' }}
              animate={{ strokeDasharray: `${(result.ecoScore / 100) * 314.2} 314.2` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-black"
              style={{ color: scoreColor }}
            >
              {result.ecoScore}
            </motion.span>
            <span className="text-[10px] text-eco-muted-light uppercase tracking-wider">EcoScore</span>
          </div>
        </div>

        <div className="font-semibold text-lg mb-1" style={{ color: scoreColor }}>{scoreLabel}</div>
        <div className="text-3xl font-black text-white mb-1">{totalTonnes}t CO₂</div>
        <div className="text-eco-muted-light text-sm">per year · {totalKg.toLocaleString()} kg total</div>

        <div className="mt-4 inline-flex px-3 py-1.5 rounded-full text-[12px] font-medium"
          style={{ background: `${result.vsAverage > 0 ? '#F97316' : '#4ADE80'}15`,
            color: result.vsAverage > 0 ? '#F97316' : '#4ADE80',
            border: `1px solid ${result.vsAverage > 0 ? '#F97316' : '#4ADE80'}30` }}>
          {result.vsAverage > 0 ? '↑' : '↓'} {Math.abs(result.vsAverage)}% {result.vsAverage > 0 ? 'above' : 'below'} global average
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {CATEGORIES.map(c => {
          const val = result.breakdown[c.key as keyof typeof result.breakdown]
          const pct = Math.round((val / result.total) * 100)
          return (
            <div key={c.key} className="p-4 rounded-2xl border border-eco-border bg-eco-card/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{c.icon}</span>
                <span className="text-[13px] text-eco-muted-light">{c.label}</span>
              </div>
              <div className="text-xl font-bold text-white mb-2">
                {(val / 1000).toFixed(1)}t
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <div className="text-[11px] mt-1" style={{ color: c.color }}>{pct}% of total</div>
            </div>
          )
        })}
      </div>

      {/* Impact equivalents */}
      <div className="p-5 rounded-2xl border border-eco-border bg-eco-card/50 mb-4">
        <div className="text-[13px] font-semibold text-eco-muted-light uppercase tracking-wider mb-4">
          What this means
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <TreePine size={16} />, val: co2ToTrees(result.total), label: 'trees to offset', color: '#4ADE80' },
            { icon: <Car size={16} />, val: co2ToKmDriving(result.total).toLocaleString(), label: 'km of driving', color: '#FCD34D', suffix: '' },
            { icon: <Plane size={16} />, val: co2ToFlights(result.total), label: 'transatlantic flights', color: '#60A5FA' },
          ].map(({ icon, val, label, color }) => (
            <div key={label} className="text-center">
              <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center"
                style={{ background: `${color}15`, color }}>
                {icon}
              </div>
              <div className="text-xl font-black text-white">{val}</div>
              <div className="text-[10px] text-eco-muted-light leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial */}
      <div className="p-5 rounded-2xl border border-eco-border bg-eco-card/50 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[13px] text-eco-muted-light mb-1">Annual carbon cost estimate</div>
            <div className="text-2xl font-black text-white">{formatCurrency(result.moneyCost)}</div>
          </div>
          <TrendingDown size={32} className="text-eco-muted" />
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        {onViewDashboard && (
          <motion.button
            onClick={onViewDashboard}
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(74,222,128,0.3)' }}
            className="w-full py-4 bg-eco-green text-eco-dark font-bold rounded-2xl text-[15px]
              flex items-center justify-center gap-2"
          >
            View My Dashboard <ArrowRight size={16} />
          </motion.button>
        )}
        <Link href="/twin">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full py-3.5 border border-eco-green/30 text-eco-green font-semibold rounded-2xl text-[14px]
              flex items-center justify-center gap-2 hover:bg-eco-green/5 transition-all"
          >
            Generate My AI Climate Twin <ArrowRight size={15} />
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
