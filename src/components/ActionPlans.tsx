'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const PLANS = {
  daily: [
    { text: 'Take public transport to work', co2: '-1.2kg', done: true },
    { text: 'Eat a plant-based lunch', co2: '-0.4kg', done: true },
    { text: 'Turn off devices at night', co2: '-0.2kg', done: false },
    { text: 'Use reusable bags for shopping', co2: '-0.1kg', done: false },
    { text: 'Walk for trips under 2km', co2: '-0.6kg', done: false },
  ],
  weekly: [
    { text: 'Have 3 meat-free days', co2: '-2.1kg', done: false },
    { text: 'Use cold water laundry wash', co2: '-0.5kg', done: false },
    { text: 'Carpool at least once', co2: '-1.8kg', done: false },
    { text: 'Audit your unused subscriptions', co2: '-0.1kg', done: true },
  ],
  monthly: [
    { text: 'Switch to a green energy provider', co2: '-15kg', done: false },
    { text: 'Audit home insulation', co2: '-12kg', done: false },
    { text: 'Buy one second-hand item instead of new', co2: '-8kg', done: false },
    { text: 'Plant something in your garden or balcony', co2: '-2kg', done: false },
  ],
}

export default function ActionPlans() {
  const [tab, setTab] = useState<keyof typeof PLANS>('daily')
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const items = PLANS[tab]
  const totalSaved = items.reduce((acc, item) => {
    const isDone = checked[`${tab}-${item.text}`] ?? item.done
    return isDone ? acc + parseFloat(item.co2.replace('kg', '').replace('-', '')) : acc
  }, 0)

  return (
    <div className="p-6 rounded-2xl border border-eco-border bg-eco-card/60">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-white text-[15px]">Your AI action plan</h3>
        <div className="text-[12px] text-eco-green font-semibold">
          {totalSaved.toFixed(1)}kg CO₂ saved
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {(['daily', 'weekly', 'monthly'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-medium capitalize transition-all border ${
              tab === t
                ? 'bg-eco-green/10 border-eco-green/30 text-eco-green'
                : 'border-eco-border text-eco-muted-light hover:text-eco-text'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="space-y-2"
        >
          {items.map((item) => {
            const key = `${tab}-${item.text}`
            const isDone = checked[key] ?? item.done
            return (
              <button
                type="button"
                key={item.text}
                role="checkbox"
                aria-checked={isDone}
                onClick={() => setChecked(c => ({ ...c, [key]: !isDone }))}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-eco-surface/50 border border-white/5
                  cursor-pointer hover:border-eco-green/20 transition-all text-left
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-green focus-visible:outline-offset-2"
              >
                <div aria-hidden="true" className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone ? 'bg-eco-green border-eco-green' : 'border-eco-green/40'
                }`}>
                  {isDone && <Check size={11} className="text-eco-dark" />}
                </div>
                <span className={`text-[13px] flex-1 ${isDone ? 'text-eco-muted-light line-through' : 'text-eco-text'}`}>
                  {item.text}
                </span>
                <span className="text-[12px] font-semibold text-eco-green">
                  {item.co2}
                  <span className="sr-only"> CO2 impact</span>
                </span>
              </button>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}