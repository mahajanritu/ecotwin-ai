'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const HEATMAP_DATA = [
  { icon: '✈️', name: 'Air Travel', co2: 2.8, unit: 't/year', level: 'HIGH', color: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)', tip: 'Take train for routes < 600km' },
  { icon: '🚗', name: 'Car Usage', co2: 1.6, unit: 't/year', level: 'HIGH', color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', tip: 'Carpool or use EV' },
  { icon: '🍔', name: 'Diet', co2: 0.9, unit: 't/year', level: 'MEDIUM', color: '#FCD34D', bg: 'rgba(252,211,77,0.08)', border: 'rgba(252,211,77,0.2)', tip: '3 meat-free days/week saves 0.4t' },
  { icon: '🏠', name: 'Home Energy', co2: 0.7, unit: 't/year', level: 'MEDIUM', color: '#A3E635', bg: 'rgba(163,230,53,0.07)', border: 'rgba(163,230,53,0.2)', tip: 'Solar ROI in ~4 years in India' },
  { icon: '🛍️', name: 'Shopping', co2: 0.3, unit: 't/year', level: 'LOW', color: '#4ADE80', bg: 'rgba(74,222,128,0.06)', border: 'rgba(74,222,128,0.15)', tip: 'Choose second-hand first' },
  { icon: '📱', name: 'Digital Life', co2: 0.1, unit: 't/year', level: 'LOW', color: '#2DD4BF', bg: 'rgba(45,212,191,0.06)', border: 'rgba(45,212,191,0.15)', tip: 'Streaming uses 0.5kg CO₂/hr' },
]

export default function HeatmapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const maxCO2 = Math.max(...HEATMAP_DATA.map(d => d.co2))

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
            bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-6">
            Carbon Heatmap
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Know your biggest leaks
          </h2>
          <p className="text-eco-muted-light text-lg max-w-xl mx-auto">
            Fix the right things first. Your emission sources ranked by impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {HEATMAP_DATA.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative p-5 rounded-2xl border cursor-default overflow-hidden"
              style={{ background: item.bg, borderColor: item.border }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-[12px] text-eco-muted-light mb-0.5">{item.name}</div>
                  <div className="text-2xl font-black" style={{ color: item.color }}>
                    {item.co2}<span className="text-xs font-normal ml-1">t</span>
                  </div>
                </div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  {item.level}
                </div>
              </div>

              {/* Bar */}
              <div className="h-1.5 rounded-full overflow-hidden"
                style={{ background: `${item.color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: item.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(item.co2 / maxCO2) * 100}%` } : { width: 0 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-eco-dark/95 border-t rounded-b-2xl
                translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ borderColor: item.border }}>
                <div className="text-[11px] text-eco-muted-light">💡 {item.tip}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 p-5 rounded-2xl border border-eco-border bg-eco-card/50 flex items-center justify-between"
        >
          <div className="text-[13px] text-eco-muted-light">
            Total annual footprint · Global average is <span className="text-white font-medium">4.0t</span>
          </div>
          <div>
            <span className="text-2xl font-black text-orange-400">6.4t</span>
            <span className="text-[11px] text-eco-muted-light ml-2">CO₂ / year</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
