'use client'

import { motion } from 'framer-motion'

const BADGES = [
  { icon: '🌱', name: 'Eco Starter', desc: 'Completed your first carbon assessment', xp: 100, progress: 100, unlocked: true },
  { icon: '🚶', name: 'Walk the Talk', desc: 'Walked or cycled for 7 days straight', xp: 250, progress: 100, unlocked: true },
  { icon: '☀️', name: 'Sun Chaser', desc: 'Explore solar energy options', xp: 500, progress: 45, unlocked: false },
  { icon: '🌍', name: 'Planet Guardian', desc: 'Reduce CO₂ by 50% for 30 days', xp: 1000, progress: 18, unlocked: false },
  { icon: '🏆', name: 'Earth Hero', desc: 'Reach Level 10', xp: 2000, progress: 50, unlocked: false },
  { icon: '🔥', name: 'Streak Master', desc: '30-day activity streak', xp: 750, progress: 47, unlocked: false },
]

export default function GamificationPanel() {
  return (
    <div>
      {/* XP Bar */}
      <div className="p-5 rounded-2xl border border-eco-border bg-eco-card/60 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-eco-green text-[12px] font-semibold mb-0.5">Level 5</div>
            <div className="text-white font-bold text-lg">Climate Warrior</div>
          </div>
          <div className="text-right">
            <div className="text-[13px] text-eco-muted-light">1,840 / 2,700 XP</div>
            <div className="text-[11px] text-eco-green">860 XP to next level</div>
          </div>
        </div>
        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #4ADE80, #2DD4BF)' }}
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {BADGES.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`relative p-5 rounded-2xl border overflow-hidden ${
              b.unlocked ? 'border-eco-green/25 bg-eco-green/[0.04]' : 'border-eco-border bg-eco-card/50'
            }`}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top, rgba(74,222,128,0.05), transparent 60%)' }} />
            <div className="text-3xl mb-3">{b.icon}</div>
            <div className="font-semibold text-white text-[14px] mb-1">{b.name}</div>
            <div className="text-[12px] text-eco-muted-light leading-relaxed mb-3">{b.desc}</div>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                b.unlocked ? 'text-eco-green bg-eco-green/10' : 'text-eco-muted-light bg-white/5'
              }`}>
                +{b.xp} XP
              </span>
              {b.unlocked && <span className="text-eco-green text-[11px]">✓ Unlocked</span>}
            </div>
            {!b.unlocked && (
              <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-eco-green/40 rounded-full" style={{ width: `${b.progress}%` }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
