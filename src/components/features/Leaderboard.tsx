'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const LEADERBOARD: Record<string, Array<{
  rank: number; name: string; loc: string; pts: number; level: string; avatar: string; color: string; badge?: string; you?: boolean
}>> = {
  City: [
    { rank: 1, name: 'Priya S.', loc: 'Surat, Gujarat', pts: 9840, level: 'Earth Hero', avatar: '🌿', color: '#4ADE80', badge: '🏆' },
    { rank: 2, name: 'Ravi M.', loc: 'Surat, Gujarat', pts: 8210, level: 'Planet Guardian', avatar: '💧', color: '#60A5FA', badge: '🌍' },
    { rank: 3, name: 'Ananya K.', loc: 'Surat, Gujarat', pts: 7650, level: 'Climate Warrior', avatar: '☀️', color: '#FCD34D', badge: '⚡' },
    { rank: 4, name: 'Mehul D.', loc: 'Surat, Gujarat', pts: 6890, level: 'Eco Explorer', avatar: '🌙', color: '#A78BFA' },
    { rank: 12, name: 'You', loc: 'Surat, Gujarat', pts: 1840, level: 'Climate Warrior', avatar: '👤', color: '#4ADE80', you: true },
  ],
  Country: [
    { rank: 1, name: 'Aarav P.', loc: 'Mumbai, India', pts: 24500, level: 'Earth Hero', avatar: '🌍', color: '#4ADE80', badge: '🏆' },
    { rank: 2, name: 'Sneha R.', loc: 'Bangalore, India', pts: 21300, level: 'Earth Hero', avatar: '🌳', color: '#2DD4BF', badge: '🌍' },
    { rank: 3, name: 'Priya S.', loc: 'Surat, India', pts: 9840, level: 'Earth Hero', avatar: '🌿', color: '#4ADE80', badge: '⚡' },
    { rank: 4, name: 'Karan V.', loc: 'Delhi, India', pts: 8900, level: 'Planet Guardian', avatar: '⚡', color: '#FCD34D' },
    { rank: 156, name: 'You', loc: 'Surat, India', pts: 1840, level: 'Climate Warrior', avatar: '👤', color: '#4ADE80', you: true },
  ],
  Global: [
    { rank: 1, name: 'Emma T.', loc: 'Stockholm, Sweden', pts: 48200, level: 'Earth Hero', avatar: '🌍', color: '#4ADE80', badge: '🏆' },
    { rank: 2, name: 'Lukas B.', loc: 'Berlin, Germany', pts: 41700, level: 'Earth Hero', avatar: '🌳', color: '#2DD4BF', badge: '🌍' },
    { rank: 3, name: 'Yuki S.', loc: 'Tokyo, Japan', pts: 38900, level: 'Earth Hero', avatar: '⚡', color: '#FCD34D', badge: '⚡' },
    { rank: 4, name: 'Aarav P.', loc: 'Mumbai, India', pts: 24500, level: 'Earth Hero', avatar: '🌍', color: '#A78BFA' },
    { rank: 2841, name: 'You', loc: 'Surat, India', pts: 1840, level: 'Climate Warrior', avatar: '👤', color: '#4ADE80', you: true },
  ],
}

export default function Leaderboard() {
  const [filter, setFilter] = useState<'City' | 'Country' | 'Global'>('City')

  return (
    <div className="rounded-2xl border border-eco-border bg-eco-card/60 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-eco-border">
        <h3 className="font-semibold text-white text-[15px]">Carbon Hero Leaderboard</h3>
        <div className="flex gap-1.5">
          {(['City', 'Country', 'Global'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                filter === f
                  ? 'bg-eco-green/10 border-eco-green/30 text-eco-green'
                  : 'border-eco-border text-eco-muted-light hover:text-eco-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        {LEADERBOARD[filter].map((entry, i) => (
          <motion.div
            key={`${filter}-${entry.rank}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.03] last:border-0 transition-colors
              ${entry.you ? 'bg-eco-green/[0.04] border-y border-eco-green/15' : 'hover:bg-white/[0.02]'}`}
          >
            <div className={`w-6 text-center text-[13px] font-bold ${
              entry.rank <= 3 ? 'text-amber-400' : entry.you ? 'text-eco-green' : 'text-eco-muted-light'
            }`}>
              {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]"
              style={{ background: `${entry.color}18`, border: `1px solid ${entry.color}30` }}>
              {entry.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white truncate">{entry.name}</div>
              <div className="text-[11px] text-eco-muted-light truncate">{entry.loc}</div>
            </div>
            <div className="text-right">
              <div className="text-[14px] font-bold text-eco-green">{entry.pts.toLocaleString()}</div>
              <div className="text-[10px] text-eco-muted-light">{entry.level}</div>
            </div>
            {entry.badge && <div className="text-[14px]">{entry.badge}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
