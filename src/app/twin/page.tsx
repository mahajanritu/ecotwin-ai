'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TwinComparison from '@/components/features/TwinComparison'
import LifestyleSimulator from '@/components/features/LifestyleSimulator'
import EcoAvatar from '@/components/features/EcoAvatar'
import GamificationPanel from '@/components/features/GamificationPanel'
import { Sparkles } from 'lucide-react'

export default function TwinPage() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
            bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-5">
            <Sparkles size={12} /> AI Climate Twin
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">
            Meet Your Future Self
          </h1>
          <p className="text-eco-muted-light text-lg max-w-xl mx-auto">
            Two versions of you, side by side. The gap between them is entirely up to you.
          </p>
        </motion.div>

        {/* Twin Comparison */}
        <section className="mb-16">
          <TwinComparison />
        </section>

        {/* Lifestyle Simulator */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">AI Lifestyle Simulator</h2>
            <p className="text-eco-muted-light text-[14px]">Drag the sliders. Watch your future change in real time.</p>
          </div>
          <LifestyleSimulator />
        </section>

        {/* Eco Avatar */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Your Living Ecosystem</h2>
            <p className="text-eco-muted-light text-[14px]">A digital world that reflects your real-world choices.</p>
          </div>
          <EcoAvatar />
        </section>

        {/* Gamification */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Your Eco Journey</h2>
            <p className="text-eco-muted-light text-[14px]">Level up. Earn badges. Build streaks.</p>
          </div>
          <GamificationPanel />
        </section>
      </div>

      <Footer />
    </main>
  )
}
