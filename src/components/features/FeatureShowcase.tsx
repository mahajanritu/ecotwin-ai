'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Brain, ScanLine, BarChart3, Sliders, Map, Bot,
  Leaf, Trophy, Users, Globe, BookOpen, TrendingDown, ArrowUpRight
} from 'lucide-react'

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Climate Twin',
    desc: 'Your digital twin predicts emissions across 3 future scenarios — Current, Improved, and Net Zero.',
    color: '#4ADE80',
    glow: 'rgba(74,222,128,0.15)',
    tag: 'Core Feature',
    href: '/twin',
  },
  {
    icon: ScanLine,
    title: 'Receipt Scanner',
    desc: 'Upload bills and tickets. Our AI instantly extracts carbon impact using OCR + Gemini analysis.',
    color: '#2DD4BF',
    glow: 'rgba(45,212,191,0.15)',
    tag: 'AI Powered',
    href: '/community',
  },
  {
    icon: BarChart3,
    title: 'Carbon Calculator',
    desc: 'Precise footprint from transport, food, home energy, and shopping — with visual breakdowns.',
    color: '#A3E635',
    glow: 'rgba(163,230,53,0.15)',
    tag: 'Free Tool',
    href: '/calculator',
  },
  {
    icon: Sliders,
    title: 'Lifestyle Simulator',
    desc: 'Move sliders in real-time. Watch your CO₂, costs, and eco-score change instantly.',
    color: '#60A5FA',
    glow: 'rgba(96,165,250,0.15)',
    tag: 'Interactive',
    href: '/twin',
  },
  {
    icon: Map,
    title: 'Carbon Heatmap',
    desc: 'Visual breakdown of your highest to lowest emission categories — know where to act first.',
    color: '#FCD34D',
    glow: 'rgba(252,211,77,0.15)',
    tag: 'Visual',
    href: '/dashboard',
  },
  {
    icon: Bot,
    title: 'Sustainability Coach',
    desc: 'AI-generated daily, weekly, and monthly action plans personalized to your lifestyle.',
    color: '#A78BFA',
    glow: 'rgba(167,139,250,0.15)',
    tag: 'AI Coach',
    href: '/coach',
  },
  {
    icon: Leaf,
    title: 'Eco Avatar',
    desc: 'Your virtual ecosystem grows with your actions. See forests, rivers, and wildlife thrive.',
    color: '#4ADE80',
    glow: 'rgba(74,222,128,0.12)',
    tag: 'Gamified',
    href: '/twin',
  },
  {
    icon: Trophy,
    title: 'Achievements & XP',
    desc: 'Earn badges, level up from Eco Starter to Earth Hero. Streaks, challenges, and rewards.',
    color: '#FCD34D',
    glow: 'rgba(252,211,77,0.12)',
    tag: 'Gamified',
    href: '/twin',
  },
  {
    icon: Users,
    title: 'Community Challenges',
    desc: 'No Car Week, Plastic Free July — join thousands in collective climate action.',
    color: '#F87171',
    glow: 'rgba(248,113,113,0.12)',
    tag: 'Social',
    href: '/community',
  },
  {
    icon: Globe,
    title: 'Global Leaderboard',
    desc: 'Compete with friends, city, and country users. Anonymous participation always supported.',
    color: '#2DD4BF',
    glow: 'rgba(45,212,191,0.12)',
    tag: 'Social',
    href: '/community',
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    desc: 'Interactive climate modules with quizzes. Earn digital certificates on completion.',
    color: '#A3E635',
    glow: 'rgba(163,230,53,0.12)',
    tag: 'Education',
    href: '/coach',
  },
  {
    icon: TrendingDown,
    title: 'Impact Visualizer',
    desc: 'Convert your CO₂ into trees, flights, km of driving — real metrics that hit differently.',
    color: '#60A5FA',
    glow: 'rgba(96,165,250,0.12)',
    tag: 'Insights',
    href: '/dashboard',
  },
]

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = feature.icon

  return (
    <Link href={feature.href} className="block rounded-2xl focus-visible:outline focus-visible:outline-2
      focus-visible:outline-eco-green focus-visible:outline-offset-2">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="relative group p-6 rounded-2xl border border-eco-border bg-eco-card/50
          hover:border-opacity-100 transition-all cursor-pointer overflow-hidden h-full"
        style={{
          '--glow': feature.glow,
        } as React.CSSProperties}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at top left, ${feature.glow}, transparent 60%)` }}
        />

        {/* Arrow indicator on hover */}
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: feature.color }}
        />

        {/* Tag */}
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold
          uppercase tracking-wider mb-4 border"
          style={{
            color: feature.color,
            borderColor: `${feature.color}30`,
            background: `${feature.color}0F`,
          }}
        >
          {feature.tag}
        </div>

        {/* Icon */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform
          group-hover:scale-110"
          style={{ background: `${feature.color}15`, boxShadow: `0 0 20px ${feature.color}20` }}
        >
          <Icon size={18} style={{ color: feature.color }} aria-hidden="true" />
        </div>

        <h3 className="text-[15px] font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-sm text-eco-muted-light leading-relaxed">{feature.desc}</p>
      </motion.div>
    </Link>
  )
}

export default function FeatureShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
          bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-6">
          Everything you need
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
          Built for real impact
        </h2>
        <p className="text-eco-muted-light text-lg max-w-xl mx-auto">
          14 powerful features — all free, all AI-powered, all designed to make going green effortless.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}
