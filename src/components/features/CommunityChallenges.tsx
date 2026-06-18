'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock } from 'lucide-react'

const CHALLENGES = [
  { id: 1, name: 'No Car Week', desc: 'Use only public transport or walk for an entire week', icon: '🚲', participants: 2841, time: '4 days left', progress: 60, badge: 'Active', badgeColor: '#4ADE80', joined: true },
  { id: 2, name: 'Plastic Free July', desc: 'Eliminate single-use plastics for the whole month', icon: '🌊', participants: 5200, time: 'Starts in 3d', progress: 0, badge: 'New', badgeColor: '#60A5FA', joined: false },
  { id: 3, name: 'Energy Save Month', desc: 'Reduce home energy use by 20% this month', icon: '💡', participants: 8910, time: 'Ongoing', progress: 35, badge: '🔥 Hot', badgeColor: '#FCD34D', joined: false },
  { id: 4, name: 'Meatless Mondays', desc: 'Skip meat every Monday for 4 weeks straight', icon: '🥗', participants: 1440, time: 'Weekly', progress: 0, badge: 'New', badgeColor: '#60A5FA', joined: false },
]

export default function CommunityChallenges() {
  const [joined, setJoined] = useState<Set<number>>(new Set([1]))

  const toggle = (id: number) => {
    setJoined(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {CHALLENGES.map((c, i) => {
        const isJoined = joined.has(c.id)
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl border border-eco-border bg-eco-card/60"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">{c.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ color: c.badgeColor, background: `${c.badgeColor}15`, border: `1px solid ${c.badgeColor}30` }}>
                {c.badge}
              </span>
            </div>
            <h3 className="font-semibold text-white text-[15px] mb-1">{c.name}</h3>
            <p className="text-[12px] text-eco-muted-light leading-relaxed mb-3">{c.desc}</p>
            <div className="flex items-center justify-between text-[11px] text-eco-muted-light mb-2.5">
              <span className="flex items-center gap-1"><Users size={11} /> {c.participants.toLocaleString()} joined</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {c.time}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #4ADE80, #2DD4BF)' }}
                initial={{ width: 0 }}
                animate={{ width: `${c.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <button
              onClick={() => toggle(c.id)}
              className={`w-full py-2 rounded-xl text-[12px] font-semibold transition-all border ${
                isJoined
                  ? 'bg-eco-green/10 border-eco-green/30 text-eco-green'
                  : 'border-eco-green/20 text-eco-green hover:bg-eco-green/10'
              }`}
            >
              {isJoined ? 'Joined ✓' : 'Join Challenge'}
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}
