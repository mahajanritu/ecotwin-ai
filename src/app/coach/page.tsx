'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatCoach from '@/components/features/ChatCoach'
import ActionPlans from '@/components/features/ActionPlans'
import { Bot, Plane, Beef, SunMedium, ArrowRight } from 'lucide-react'

const INSIGHTS = [
  {
    icon: Plane,
    color: '#F87171',
    title: 'Flight footprint alert',
    text: 'Your 3 flights last year generated 2.8t CO₂ — 44% of your total. Consider train alternatives for routes under 700km.',
    cta: 'See alternatives',
    prompt: 'I took 3 flights last year generating 2.8 tonnes of CO2. What are good train or low-carbon alternatives for short routes under 700km?',
  },
  {
    icon: Beef,
    color: '#FCD34D',
    title: 'Diet swap opportunity',
    text: 'Replacing beef with chicken twice a week saves 0.4t CO₂ annually and cuts food costs by ~12%.',
    cta: 'Get meal ideas',
    prompt: 'Give me some easy meal ideas for replacing beef with chicken twice a week to reduce my carbon footprint.',
  },
  {
    icon: SunMedium,
    color: '#4ADE80',
    title: 'Solar ROI calculator',
    text: 'Based on your usage and local solar irradiance, panels could pay off in 4.2 years and save ₹1.2L over a decade.',
    cta: 'Calculate ROI',
    prompt: 'How is solar panel ROI calculated for a home in India? What factors affect payback period and savings?',
  },
]

export default function CoachPage() {
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null)

  const handleInsightClick = (prompt: string) => {
    setPendingPrompt(prompt)
    // Scroll the chat into view so the user sees their question land
    document.getElementById('coach-chat-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main id="main-content" className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
            bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-5">
            <Bot size={12} /> AI Sustainability Coach
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">
            Your guide to net zero
          </h1>
          <p className="text-eco-muted-light text-lg max-w-xl mx-auto">
            Personalized AI coaching that knows your habits and helps you build better ones — day by day.
          </p>
        </motion.div>

        <div id="coach-chat-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14 scroll-mt-24">
          <ChatCoach initialPrompt={pendingPrompt} onPromptConsumed={() => setPendingPrompt(null)} />
          <ActionPlans />
        </div>

        {/* AI Insights */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">AI-generated insights</h2>
          <p className="text-eco-muted-light text-[14px]">Specific, data-driven recommendations just for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INSIGHTS.map((ins, i) => {
            const Icon = ins.icon
            return (
              <motion.div
                key={ins.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-eco-border bg-eco-card/60"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${ins.color}15` }}>
                  <Icon size={18} style={{ color: ins.color }} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-white text-[14px] mb-2">{ins.title}</h3>
                <p className="text-[12px] text-eco-muted-light leading-relaxed mb-4">{ins.text}</p>
                <button
                  type="button"
                  onClick={() => handleInsightClick(ins.prompt)}
                  className="flex items-center gap-1.5 text-[12px] font-medium text-eco-green
                    hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-green
                    focus-visible:outline-offset-2 rounded"
                >
                  {ins.cta} <ArrowRight size={12} aria-hidden="true" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Footer />
    </main>
  )
}
