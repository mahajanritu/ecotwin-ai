'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Leaf, Zap, TreePine, Wind, ChevronDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import HeroEarth from '@/components/features/HeroEarth'
import FeatureShowcase from '@/components/features/FeatureShowcase'
import TwinPreview from '@/components/features/TwinPreview'
import HeatmapSection from '@/components/features/HeatmapSection'
import TestimonialsSection from '@/components/features/TestimonialsSection'
import Footer from '@/components/layout/Footer'

const PARTICLE_COUNT = 20

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yEarth = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Global grid background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Radial glow at top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] 
        bg-radial-[ellipse_80%_60%_at_50%_0%] 
        from-eco-green/[0.07] to-transparent pointer-events-none" />

      <Navbar />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
      >
        {/* Floating particles */}
        {mounted && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: i % 3 === 0 ? '#4ADE80' : i % 3 === 1 ? '#2DD4BF' : '#A3E635',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              y: [0, -(40 + Math.random() * 60)],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-eco-green/20 
            bg-eco-green/5 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-green" />
          </span>
          <span className="text-eco-green text-xs font-medium tracking-wide">
            AI-Powered · 847,000+ Users · Free Forever
          </span>
        </motion.div>

        {/* Earth 3D Visual */}
        <motion.div style={{ y: yEarth }} className="mb-10">
          <HeroEarth />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-5">
            <span className="text-white">Meet Your</span>
            <br />
            <span className="eco-gradient-text">Future Climate Self</span>
          </h1>
          <p className="text-eco-muted-light text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8">
            Your AI Climate Twin predicts your environmental future — and shows you exactly how
            to change it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(74,222,128,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-eco-green text-eco-dark 
                  font-semibold rounded-full text-[15px] transition-all"
              >
                Start Free Assessment
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link href="/twin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-7 py-3.5 border border-white/10 
                  bg-white/[0.03] rounded-full text-[15px] font-medium text-eco-text 
                  hover:bg-white/[0.07] transition-all"
              >
                View My Twin
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Hero stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 divide-x divide-eco-border overflow-hidden
            rounded-2xl border border-eco-border bg-eco-card/50 backdrop-blur-sm"
        >
          {[
            { icon: <Leaf size={14} />, value: 847000, label: 'Users tracking', display: '847,000+' },
            { icon: <Zap size={14} />, value: 124, label: 'Tonnes CO₂ saved', display: '124K' },
            { icon: <TreePine size={14} />, value: 2.1, label: 'Virtual trees grown', display: '2.1M' },
          ].map((stat, i) => (
            <div key={i} className="px-8 py-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-eco-green text-xs mb-1">
                {stat.icon}
                <span className="uppercase tracking-wider">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-white">
                {stat.display}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-eco-muted flex flex-col items-center gap-1"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── FEATURE SECTIONS ── */}
      <FeatureShowcase />
      <TwinPreview />
      <HeatmapSection />
      <TestimonialsSection />

      <Footer />
    </main>
  )
}
