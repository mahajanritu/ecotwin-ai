'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, TrendingDown, DollarSign, TreePine, Droplets } from 'lucide-react'
import Link from 'next/link'

const SCENARIOS = [
  {
    id: 'current',
    label: 'Current You',
    emoji: '😐',
    year: '2025',
    co2: 6.4,
    score: 42,
    cost: '₹4.8L',
    trees: '24 needed',
    water: '145K L',
    color: '#F97316',
    border: 'border-orange-500/20',
    bg: 'bg-orange-500/5',
  },
  {
    id: 'improved',
    label: 'Greener You',
    emoji: '🌿',
    year: '2027',
    co2: 3.8,
    score: 68,
    cost: '₹2.9L',
    trees: '10 needed',
    water: '80K L',
    color: '#2DD4BF',
    border: 'border-teal-400/30',
    bg: 'bg-teal-400/5',
  },
  {
    id: 'netzero',
    label: 'Net Zero You',
    emoji: '🌟',
    year: '2030',
    co2: 1.8,
    score: 91,
    cost: '₹1.4L',
    trees: '3 needed',
    water: '32K L',
    color: '#4ADE80',
    border: 'border-eco-green/40',
    bg: 'bg-eco-green/8',
    featured: true,
  },
]

export default function TwinPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [active, setActive] = useState('netzero')

  return (
    <section className="py-24 px-6 bg-eco-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
            bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-6">
            Core Feature
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Your AI Climate Twin
          </h2>
          <p className="text-eco-muted-light text-lg max-w-xl mx-auto">
            Three versions of you — same person, radically different futures.
            AI calculates every number in real time.
          </p>
        </motion.div>

        {/* Twin cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {SCENARIOS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              onClick={() => setActive(s.id)}
              className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300
                ${s.featured ? 'border-eco-green/40 bg-eco-green/5 shadow-eco' : `${s.border} ${s.bg}`}
                ${active === s.id ? 'ring-1' : ''}`}
              style={active === s.id ? { '--tw-ring-color': s.color } as React.CSSProperties : undefined}
            >
              {s.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 
                  bg-eco-green text-eco-dark text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Target
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl
                  border" style={{ borderColor: `${s.color}40`, background: `${s.color}15` }}>
                  {s.emoji}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{s.label}</div>
                  <div className="text-[11px]" style={{ color: s.color }}>{s.year}</div>
                </div>
              </div>

              {/* Score ring */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                    <circle
                      cx="30" cy="30" r="24" fill="none"
                      stroke={s.color} strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(s.score / 100) * 150.8} 150.8`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15px] font-bold" style={{ color: s.color }}>{s.score}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-eco-muted-light mb-0.5">EcoScore</div>
                  <div className="text-2xl font-black" style={{ color: s.color }}>{s.co2}t</div>
                  <div className="text-[11px] text-eco-muted-light">CO₂ / year</div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { icon: DollarSign, label: '10yr cost', val: s.cost },
                  { icon: TreePine, label: 'Trees offset', val: s.trees },
                  { icon: Droplets, label: 'Water equiv', val: s.water },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-[12px] text-eco-muted-light">
                      <Icon size={12} /> {label}
                    </div>
                    <span className="text-[12px] font-semibold text-white">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Savings callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl
            border border-eco-green/20 bg-eco-green/[0.04]"
        >
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {[
                { val: '−64%', label: 'CO₂ reduction' },
                { val: '₹3.4L', label: 'saved / 10 years' },
                { val: '21', label: 'trees saved' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center px-4 py-2 rounded-xl border border-eco-green/15 bg-eco-green/5">
                  <div className="text-xl font-black text-eco-green">{val}</div>
                  <div className="text-[10px] text-eco-muted-light">{label}</div>
                </div>
              ))}
            </div>
            <TrendingDown className="text-eco-green" size={32} />
          </div>
          <Link href="/calculator">
            <motion.button
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 px-6 py-3 bg-eco-green text-eco-dark font-bold 
                rounded-full text-[14px] shadow-eco whitespace-nowrap"
            >
              Generate My Twin <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
