'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Loader2, Trophy } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  image?: string
  ecoScore: number
  xp: number
  level: number
  city: string
  country: string
}

const AVATAR_COLORS = ['#4ADE80', '#60A5FA', '#FCD34D', '#A78BFA', '#2DD4BF', '#F97316']

function getInitial(name: string) {
  return name?.charAt(0)?.toUpperCase() ?? '?'
}

export default function Leaderboard() {
  const { data: session } = useSession()
  const [filter, setFilter] = useState<'City' | 'Country' | 'Global'>('Global')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const scope = filter.toLowerCase()
    fetch(`/api/community/leaderboard?scope=${scope}&limit=10`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setEntries(data.leaderboard ?? [])
          setNote(data.note ?? null)
        }
      })
      .catch(() => setNote('Could not load leaderboard right now.'))
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <div className="rounded-2xl border border-eco-border bg-eco-card/60 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-eco-border">
        <h3 className="font-semibold text-white text-[15px]">Carbon Hero Leaderboard</h3>
        <div className="flex gap-1.5">
          {(['City', 'Country', 'Global'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-green ${
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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <Loader2 size={20} className="text-eco-green animate-spin" />
          <span className="text-[12px] text-eco-muted-light">Loading rankings...</span>
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-2">
          <Trophy size={24} className="text-eco-muted" />
          <p className="text-[13px] text-eco-muted-light">
            {note ?? 'No rankings yet for this scope. Complete an assessment to be the first!'}
          </p>
        </div>
      ) : (
        <div>
          {entries.map((entry, i) => {
            const isYou = session?.user?.email && entry.userId === (session.user as { id?: string })?.id
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length]
            return (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.03] last:border-0 transition-colors
                  ${isYou ? 'bg-eco-green/[0.04] border-y border-eco-green/15' : 'hover:bg-white/[0.02]'}`}
              >
                <div className={`w-6 text-center text-[13px] font-bold ${
                  entry.rank <= 3 ? 'text-amber-400' : isYou ? 'text-eco-green' : 'text-eco-muted-light'
                }`}>
                  {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
                  {getInitial(entry.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-white truncate">
                    {entry.name} {isYou && <span className="text-eco-green">(You)</span>}
                  </div>
                  <div className="text-[11px] text-eco-muted-light truncate">
                    {entry.city}, {entry.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-bold text-eco-green">{entry.xp.toLocaleString()} XP</div>
                  <div className="text-[10px] text-eco-muted-light">Level {entry.level}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
