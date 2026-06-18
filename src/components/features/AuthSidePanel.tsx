'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Leaf, TreePine, Zap, Award } from 'lucide-react'

export default function AuthSidePanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden
      border-r border-eco-border bg-eco-surface/30">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 20%, rgba(74,222,128,0.08), transparent 70%)' }} />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="relative flex items-center gap-2.5 z-10">
        <div className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center shadow-eco">
          <Leaf size={18} className="text-eco-dark" />
        </div>
        <div>
          <span className="font-bold text-lg text-white tracking-tight">EcoTwin</span>
          <span className="text-eco-green font-bold text-lg"> AI</span>
        </div>
      </Link>

      {/* Center content */}
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tighter text-white mb-4 leading-tight"
        >
          Your future self<br />
          is <span className="eco-gradient-text">one click away</span>
        </motion.h2>
        <p className="text-eco-muted-light text-[15px] max-w-sm leading-relaxed mb-8">
          Sign in to save your Climate Twin, track real progress, and join 847,000+ people
          building a greener future.
        </p>

        <div className="space-y-3">
          {[
            { icon: Zap, text: 'Personalized AI Climate Twin & lifestyle simulator', color: '#4ADE80' },
            { icon: TreePine, text: 'Track CO₂, savings, and your living ecosystem', color: '#A3E635' },
            { icon: Award, text: 'Earn XP, badges, and climb the leaderboard', color: '#FCD34D' },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${item.color}15` }}>
                <item.icon size={14} style={{ color: item.color }} />
              </div>
              <span className="text-[13px] text-eco-text">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-[12px] text-eco-muted-light">
        © 2025 EcoTwin AI · Free forever · Open source
      </div>
    </div>
  )
}
