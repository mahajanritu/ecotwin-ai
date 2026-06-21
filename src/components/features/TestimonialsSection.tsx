'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Product Designer, Bangalore',
    avatar: 'PS',
    color: '#4ADE80',
    rating: 5,
    text: 'The Climate Twin absolutely blew my mind. Seeing my 2030 self with a 91 EcoScore made sustainability feel real and achievable, not abstract.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Software Engineer, Pune',
    avatar: 'RM',
    color: '#2DD4BF',
    rating: 5,
    text: 'I used EcoTwin for our hackathon project and it completely changed how I think about carbon. The receipt scanner alone is worth it.',
  },
  {
    name: 'Anika Patel',
    role: 'Climate Researcher, Delhi',
    avatar: 'AP',
    color: '#A3E635',
    rating: 5,
    text: 'As someone who works in sustainability, this is the most accessible and accurate carbon tool I\'ve ever used. The AI coaching is exceptional.',
  },
  {
    name: 'David Chen',
    role: 'Student, Singapore',
    avatar: 'DC',
    color: '#60A5FA',
    rating: 5,
    text: 'The gamification got me hooked. I\'m on a 14-day streak and genuinely competing on the leaderboard. Never thought going green could be this fun.',
  },
  {
    name: 'Lena Müller',
    role: 'Sustainability Consultant, Berlin',
    avatar: 'LM',
    color: '#A78BFA',
    rating: 5,
    text: 'I recommend EcoTwin to all my clients now. The lifestyle simulator is incredibly powerful for showing the financial side of going green.',
  },
  {
    name: 'Carlos Rivera',
    role: 'Teacher, Mexico City',
    avatar: 'CR',
    color: '#FCD34D',
    rating: 5,
    text: 'My students use EcoTwin in class for our climate change curriculum. The learning hub and quizzes are perfectly pitched for engagement.',
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-24 px-6 bg-eco-surface/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-eco-green/20
            bg-eco-green/5 text-eco-green text-xs font-medium uppercase tracking-widest mb-6">
            Loved globally
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white mb-3">
            847,000 climate champions
          </h2>
          <p className="text-eco-muted-light">and counting.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-eco-border bg-eco-card/60 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} fill={t.color} style={{ color: t.color }} />
                ))}
              </div>
                <p className="text-[14px] text-eco-muted-light leading-relaxed flex-1">&quot;{t.text}&quot;</p>              <div className="flex items-center gap-3 pt-2 border-t border-eco-border">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold"
                  style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-eco-muted-light">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
