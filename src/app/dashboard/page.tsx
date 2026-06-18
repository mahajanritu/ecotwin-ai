'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useUserProfile } from '@/hooks/useUserProfile'
import {
  TrendingDown, Flame, Award, TreePine,
  Zap, Car, Target, ArrowRight, Plus,
  Calculator, Loader2
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts'
import { getScoreColor, getScoreLabel, formatCurrency, co2ToTrees } from '@/lib/utils'

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-eco-green/10 border border-eco-green/20
        flex items-center justify-center mb-6">
        <Calculator size={32} className="text-eco-green" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">No data yet</h2>
      <p className="text-eco-muted-light max-w-sm mb-8 text-[15px] leading-relaxed">
        Complete the carbon footprint calculator to see your personalized dashboard,
        Climate Twin, and AI coaching.
      </p>
      <Link href="/calculator">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-7 py-3.5 bg-eco-green text-eco-dark
            font-bold rounded-full text-[15px] shadow-eco"
        >
          <Plus size={16} /> Start Carbon Assessment
        </motion.button>
      </Link>
    </motion.div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const color = getScoreColor(score)
  const circumference = 2 * Math.PI * 40
  const filled = (score / 100) * circumference
  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
        <motion.circle
          cx="48" cy="48" r="40" fill="none"
          stroke={color} strokeWidth="7" strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${filled} ${circumference}` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black" style={{ color }}>{score}</span>
        <span className="text-[9px] text-eco-muted-light uppercase tracking-wide">Score</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { user, profile, loading, hasProfile } = useUserProfile()

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard')
    }
  }, [status, router])

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-eco-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="text-eco-green animate-spin" />
          <p className="text-eco-muted-light text-sm">Loading your dashboard...</p>
        </div>
      </main>
    )
  }

  if (!session) return null

  // First name for greeting
  const firstName = (user?.name || session.user?.name || 'there').split(' ')[0]
  const score = profile?.ecoScore ?? user?.ecoScore ?? 50
  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)
  const annualCO2 = profile?.annualCO2 ?? 0
  const annualCO2Tonnes = (annualCO2 / 1000).toFixed(1)
  const xp = user?.xp ?? 0
  const level = user?.level ?? 1
  const streak = user?.streak ?? 0

  // Build chart data from history or empty
  const history = (profile as { history?: Array<{ date: string; co2: number; score: number }> })?.history ?? []
  const chartData = history.length > 1
    ? history.slice(-7).map((h) => ({
        month: new Date(h.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        co2: Math.round(h.co2 / 1000 * 10) / 10,
        score: h.score,
      }))
    : []

  // Breakdown percentages
  const breakdown = profile?.breakdown
  const totalBreakdown = breakdown
    ? Object.values(breakdown).reduce((a: number, b: number) => a + b, 0)
    : 0

  const categories = breakdown ? [
    { label: 'Transport', val: breakdown.transport, color: '#F97316', icon: '🚗' },
    { label: 'Food', val: breakdown.food, color: '#FCD34D', icon: '🍽️' },
    { label: 'Home', val: breakdown.home, color: '#60A5FA', icon: '🏠' },
    { label: 'Shopping', val: breakdown.shopping, color: '#A78BFA', icon: '🛍️' },
  ] : []

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* Header greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <div className="text-eco-muted-light text-sm mb-1">
              Welcome back 👋
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Hey, {firstName}!
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-eco-border bg-eco-card/50">
                <Flame size={14} className="text-orange-400" />
                <span className="text-[13px] font-semibold text-white">{streak}-day streak</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-eco-green/20 bg-eco-green/5">
              <Award size={14} className="text-eco-green" />
              <span className="text-[13px] font-semibold text-eco-green">Level {level}</span>
            </div>
          </div>
        </motion.div>

        {/* XP bar */}
        {xp > 0 && (
          <div className="p-4 rounded-2xl border border-eco-border bg-eco-card/50 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] text-eco-muted-light">Level {level} · {xp.toLocaleString()} XP earned</span>
              <span className="text-[13px] font-semibold text-eco-green">Keep going!</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #4ADE80, #2DD4BF)' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((xp % 1000) / 10, 100)}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Empty state if no calculator done yet */}
        {!hasProfile ? (
          <EmptyState />
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                {
                  label: 'Annual CO₂',
                  value: `${annualCO2Tonnes}t`,
                  icon: TrendingDown,
                  color: '#F97316',
                  sub: annualCO2 > 4000 ? 'Above average' : 'Below average',
                },
                {
                  label: 'EcoScore',
                  value: `${score}/100`,
                  icon: Zap,
                  color: scoreColor,
                  sub: scoreLabel,
                },
                {
                  label: 'Trees to offset',
                  value: `${co2ToTrees(annualCO2)}`,
                  icon: TreePine,
                  color: '#A3E635',
                  sub: 'per year',
                },
                {
                  label: 'Streak',
                  value: streak > 0 ? `${streak} days` : 'Start today',
                  icon: Flame,
                  color: '#FCD34D',
                  sub: streak > 0 ? '🔥 Keep it up!' : 'Log an action',
                },
              ].map((stat) => (
                <div key={stat.label}
                  className="p-5 rounded-2xl border border-eco-border bg-eco-card/60 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top right, ${stat.color}08, transparent 60%)` }} />
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${stat.color}15` }}>
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
                  <div className="text-[11px] text-eco-muted-light">{stat.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: stat.color }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

              {/* Score + breakdown */}
              <div className="p-6 rounded-2xl border border-eco-border bg-eco-card/60">
                <h3 className="font-semibold text-white mb-5 text-[15px]">Your footprint</h3>
                <div className="flex items-center gap-5 mb-6">
                  <ScoreRing score={score} />
                  <div>
                    <div className="text-3xl font-black" style={{ color: scoreColor }}>
                      {annualCO2Tonnes}t
                    </div>
                    <div className="text-[12px] text-eco-muted-light">CO₂ per year</div>
                    <div className="mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full inline-block"
                      style={{ color: scoreColor, background: `${scoreColor}15` }}>
                      {scoreLabel}
                    </div>
                  </div>
                </div>
                {/* Breakdown bars */}
                <div className="space-y-2.5">
                  {categories.map((c) => {
                    const pct = totalBreakdown > 0 ? Math.round((c.val / totalBreakdown) * 100) : 0
                    return (
                      <div key={c.label}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-eco-muted-light flex items-center gap-1">
                            {c.icon} {c.label}
                          </span>
                          <span className="text-white font-medium">
                            {(c.val / 1000).toFixed(1)}t · {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: c.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Money saved estimate */}
                <div className="mt-5 p-3 rounded-xl bg-eco-surface/60 border border-eco-border">
                  <div className="text-[11px] text-eco-muted-light mb-0.5">Annual carbon cost</div>
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(Math.round(annualCO2 * 7.5))}
                  </div>
                </div>
              </div>

              {/* Chart — only if history exists */}
              <div className="lg:col-span-2 p-6 rounded-2xl border border-eco-border bg-eco-card/60">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-white text-[15px]">CO₂ History</h3>
                    <p className="text-[12px] text-eco-muted-light">Your assessments over time</p>
                  </div>
                  <Link href="/calculator">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-eco-border
                      text-[12px] text-eco-muted-light hover:text-eco-green hover:border-eco-green/30 transition-all">
                      <Plus size={12} /> New assessment
                    </button>
                  </Link>
                </div>

                {chartData.length >= 2 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="month" tick={{ fill: '#5A7A63', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#5A7A63', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: '#0C1410', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: 12 }}
                        labelStyle={{ color: '#E2F0E8', fontWeight: 600 }}
                        itemStyle={{ color: '#8FA897' }}
                      />
                      <Area type="monotone" dataKey="co2" stroke="#F97316" strokeWidth={2}
                        fill="url(#co2Grad)" name="CO₂ (tonnes)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <div className="text-[13px] text-eco-muted-light text-center">
                      Complete the calculator a few more times to see your CO₂ trend over time.
                    </div>
                    <Link href="/calculator">
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-eco-green/10 border border-eco-green/20
                        text-eco-green rounded-xl text-[13px] font-medium hover:bg-eco-green/20 transition-all">
                        <Calculator size={14} /> Go to Calculator
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { icon: Calculator, label: 'Recalculate footprint', color: '#4ADE80', href: '/calculator' },
                { icon: Target, label: 'View my Climate Twin', color: '#2DD4BF', href: '/twin' },
                { icon: Car, label: 'AI Coach', color: '#60A5FA', href: '/coach' },
                { icon: Award, label: 'Community', color: '#FCD34D', href: '/community' },
              ].map(({ icon: Icon, label, color, href }) => (
                <Link key={label} href={href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-eco-border
                    bg-eco-card/50 hover:border-eco-green/20 transition-all group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center
                      transition-transform group-hover:scale-110"
                      style={{ background: `${color}15` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <span className="text-[11px] text-eco-muted-light text-center leading-tight group-hover:text-eco-text transition-colors">
                      {label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Impact row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: '🌳', val: `${co2ToTrees(annualCO2)}`, label: 'Trees needed to offset', color: '#4ADE80' },
                { icon: '🚗', val: `${Math.round(annualCO2 / 0.21 / 1000)}K km`, label: 'Driving equivalent', color: '#FCD34D' },
                { icon: '💧', val: `${Math.round(annualCO2 * 0.018)}K L`, label: 'Water footprint', color: '#60A5FA' },
                { icon: '⚡', val: `${Math.round(annualCO2 / 0.82 / 100) * 100} kWh`, label: 'Energy equivalent', color: '#A78BFA' },
              ].map(({ icon, val, label, color }) => (
                <div key={label} className="p-5 rounded-2xl border border-eco-border bg-eco-card/50 text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-xl font-black mb-1" style={{ color }}>{val}</div>
                  <div className="text-[11px] text-eco-muted-light leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
