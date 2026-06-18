'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Leaderboard from '@/components/features/Leaderboard'
import ReceiptScanner from '@/components/features/ReceiptScanner'
import CommunityChallenges from '@/components/features/CommunityChallenges'
import { Users, Flame } from 'lucide-react'

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
            bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-5">
            <Users size={12} /> Community
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">
            Compete. Collaborate. Change.
          </h1>
          <p className="text-eco-muted-light text-lg max-w-xl mx-auto">
            Join 847,000 people making their mark on the planet — for the better.
          </p>
        </motion.div>

        {/* Leaderboard + scanner/streak */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-14">
          <Leaderboard />
          <div className="flex flex-col gap-4">
            <ReceiptScanner />

            {/* Streak */}
            <div className="p-5 rounded-2xl border border-eco-border bg-eco-card/60">
              <h3 className="font-semibold text-white text-[14px] mb-3 flex items-center gap-2">
                <Flame size={15} className="text-orange-400" /> Your streak
              </h3>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-medium ${
                    i < 5 ? 'bg-eco-green text-eco-dark' :
                    i === 5 ? 'bg-eco-green/15 border border-eco-green/30 text-eco-green' :
                    'bg-white/[0.03] text-eco-muted'
                  }`}>
                    {i < 5 ? '✓' : i + 1}
                  </div>
                ))}
              </div>
              <div className="text-[12px] text-eco-muted-light mt-3">5-day streak 🔥 Keep it going!</div>
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Active Challenges</h2>
          <p className="text-eco-muted-light text-[14px]">Join thousands taking collective climate action.</p>
        </div>
        <CommunityChallenges />
      </div>

      <Footer />
    </main>
  )
}
