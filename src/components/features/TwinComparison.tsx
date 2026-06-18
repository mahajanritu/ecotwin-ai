'use client'

import { motion } from 'framer-motion'
import { DollarSign, TreePine, Droplets, Zap } from 'lucide-react'

interface TwinData {
  label: string
  subtitle: string
  emoji: string
  co2: number
  score: number
  money: string
  trees: string
  water: string
  energy: string
  color: string
  accent: 'current' | 'future'
}

const DATA: Record<'current' | 'future', TwinData> = {
  current: {
    label: 'Current You',
    subtitle: '2025 · Scenario A',
    emoji: '😐',
    co2: 6.4,
    score: 42,
    money: '₹4.8L',
    trees: '24 🌳',
    water: '145K L',
    energy: '4,200 kWh',
    color: '#F97316',
    accent: 'current',
  },
  future: {
    label: 'Net Zero You',
    subtitle: '2030 · Scenario C',
    emoji: '🌟',
    co2: 1.8,
    score: 91,
    money: '₹1.4L',
    trees: '3 🌳',
    water: '32K L',
    energy: '1,100 kWh',
    color: '#4ADE80',
    accent: 'future',
  },
}

function TwinCard({ data }: { data: TwinData }) {
  const isFuture = data.accent === 'future'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-3xl border overflow-hidden ${
        isFuture ? 'border-eco-green/30 bg-eco-green/[0.04]' : 'border-orange-500/15 bg-orange-500/[0.02]'
      }`}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at ${isFuture ? 'top right' : 'top left'}, ${data.color}12, transparent 60%)` }} />

      <div className="flex items-center gap-3 mb-6 relative">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border"
          style={{ borderColor: `${data.color}40`, background: `${data.color}15` }}>
          {data.emoji}
        </div>
        <div>
          <div className="font-semibold text-white text-[15px]">{data.label}</div>
          <div className="text-[12px]" style={{ color: data.color }}>{data.subtitle}</div>
        </div>
        {isFuture && (
          <div className="ml-auto px-2.5 py-1 bg-eco-green text-eco-dark text-[10px] font-bold rounded-full uppercase">
            Target
          </div>
        )}
      </div>

      {/* Score ring + CO2 */}
      <div className="flex items-center gap-5 mb-6 relative">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <motion.circle
              cx="40" cy="40" r="34" fill="none" stroke={data.color} strokeWidth="6" strokeLinecap="round"
              initial={{ strokeDasharray: '0 213.6' }}
              animate={{ strokeDasharray: `${(data.score / 100) * 213.6} 213.6` }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-lg font-black" style={{ color: data.color }}>{data.score}</span>
          </div>
        </div>
        <div>
          <div className="text-[11px] text-eco-muted-light uppercase tracking-wider mb-0.5">EcoScore</div>
          <div className="text-3xl font-black" style={{ color: data.color }}>{data.co2}t</div>
          <div className="text-[11px] text-eco-muted-light">CO₂ per year</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2.5">
        {[
          { icon: DollarSign, label: '10-year cost', val: data.money },
          { icon: TreePine, label: 'Trees required', val: data.trees },
          { icon: Droplets, label: 'Water footprint', val: data.water },
          { icon: Zap, label: 'Energy use', val: data.energy },
        ].map(({ icon: Icon, label, val }) => (
          <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-2 text-[12px] text-eco-muted-light">
              <Icon size={13} /> {label}
            </div>
            <span className="text-[13px] font-semibold text-white">{val}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function TwinComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <TwinCard data={DATA.current} />

      {/* VS column */}
      <div className="hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-12 bg-eco-border" />
        <div className="w-12 h-12 rounded-full border border-eco-border bg-eco-card flex items-center justify-center text-[12px] font-bold text-eco-muted-light">
          VS
        </div>
        <div className="px-3 py-2 rounded-xl bg-eco-green/10 border border-eco-green/25 text-center">
          <div className="text-sm font-bold text-eco-green">−72%</div>
          <div className="text-[9px] text-eco-muted-light uppercase">CO₂ cut</div>
        </div>
        <div className="px-3 py-2 rounded-xl bg-eco-green/10 border border-eco-green/25 text-center">
          <div className="text-sm font-bold text-eco-green">₹3.4L</div>
          <div className="text-[9px] text-eco-muted-light uppercase">saved</div>
        </div>
        <div className="w-12 h-12 rounded-full border border-eco-border bg-eco-card flex items-center justify-center text-eco-green text-lg">
          →
        </div>
        <div className="w-px h-12 bg-eco-border" />
      </div>

      {/* Mobile VS */}
      <div className="md:hidden flex items-center justify-center gap-3 py-2">
        <div className="px-3 py-1.5 rounded-full bg-eco-green/10 border border-eco-green/25 text-[11px] font-bold text-eco-green">
          −72% CO₂
        </div>
        <div className="px-3 py-1.5 rounded-full bg-eco-green/10 border border-eco-green/25 text-[11px] font-bold text-eco-green">
          ₹3.4L saved
        </div>
      </div>

      <TwinCard data={DATA.future} />
    </div>
  )
}
