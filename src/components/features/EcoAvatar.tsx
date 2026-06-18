'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const ECOSYSTEM_STATS = [
  { key: 'forest', label: 'Forest health', icon: '🌳', value: 72, color: '#4ADE80' },
  { key: 'river', label: 'River clarity', icon: '💧', value: 65, color: '#60A5FA' },
  { key: 'wildlife', label: 'Wildlife', icon: '🦋', value: 58, color: '#A78BFA' },
  { key: 'biodiversity', label: 'Biodiversity', icon: '🌿', value: 80, color: '#A3E635' },
]

export default function EcoAvatar() {
  const [stats] = useState(ECOSYSTEM_STATS)
  const avgHealth = Math.round(stats.reduce((a, s) => a + s.value, 0) / stats.length)

  const treeCount = 5
  const trees = Array.from({ length: treeCount }, (_, i) => ({
    size: 35 + (i % 3) * 12,
    delay: i * 0.15,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 p-6 rounded-3xl border border-eco-border bg-eco-card/60">
      {/* Visual scene */}
      <div className="relative rounded-2xl overflow-hidden h-64"
        style={{ background: 'linear-gradient(180deg, #0A1F12 0%, #0D2B19 50%, #112E1B 100%)' }}>
        {/* Sky particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-eco-green/40"
            style={{ width: 3, height: 3, left: `${10 + i * 11}%`, top: `${10 + (i % 3) * 8}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          />
        ))}

        {/* Sun */}
        <div className="absolute top-6 right-8 w-10 h-10 rounded-full"
          style={{ background: 'radial-gradient(circle, #FCD34D, #FCD34D00)', boxShadow: '0 0 30px rgba(252,211,77,0.4)' }} />

        {/* River */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: 'linear-gradient(180deg, rgba(96,165,250,0.15), rgba(96,165,250,0.05))' }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Trees */}
        <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center gap-3 px-6">
          {trees.map((tree, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: tree.delay, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity }}
                style={{
                  width: tree.size,
                  height: tree.size,
                  background: '#4ADE80',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  opacity: 0.85,
                }}
              />
              <div style={{ width: tree.size / 5, height: tree.size / 3, background: '#5C3D1E', borderRadius: '0 0 2px 2px' }} />
            </motion.div>
          ))}
        </div>

        {/* Health badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-eco-dark/60 backdrop-blur-sm
          border border-eco-green/20 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
          <span className="text-[11px] font-semibold text-eco-green">{avgHealth}% Ecosystem health</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-3 justify-center">
        <div>
          <h3 className="font-semibold text-white text-[15px] mb-1">Your Virtual Ecosystem</h3>
          <p className="text-[12px] text-eco-muted-light">Good habits grow it. Poor habits shrink it.</p>
        </div>
        {stats.map((s) => (
          <div key={s.key} className="p-3 rounded-xl border border-eco-border bg-eco-surface/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-eco-muted-light flex items-center gap-1.5">
                <span>{s.icon}</span> {s.label}
              </span>
              <span className="text-[12px] font-bold text-white">{s.value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: s.color }}
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
