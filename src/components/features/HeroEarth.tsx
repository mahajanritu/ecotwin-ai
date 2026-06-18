'use client'

import { motion } from 'framer-motion'

export default function HeroEarth() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-eco-green/10"
        style={{ margin: '-40px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
          rounded-full bg-eco-green shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
          rounded-full bg-eco-teal" />
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-full border border-eco-green/5"
        style={{ margin: '-70px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-4 right-0 w-2 h-2 rounded-full bg-eco-lime/70" />
      </motion.div>

      {/* Main earth body */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-48 h-48 rounded-full overflow-hidden
          border border-eco-green/25 shadow-eco-lg"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #1a4a2c 0%, #0e2e1c 40%, #071a0e 80%, #030d07 100%)',
        }}
      >
        {/* Ocean */}
        <div className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 60% 70%, rgba(45,212,191,0.12) 0%, transparent 60%)',
          }}
        />
        {/* Continent shapes */}
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 200">
          <ellipse cx="80" cy="80" rx="35" ry="45" fill="#2d6a3f" opacity="0.8" transform="rotate(-20 80 80)" />
          <ellipse cx="140" cy="100" rx="20" ry="28" fill="#247a3a" opacity="0.7" transform="rotate(15 140 100)" />
          <ellipse cx="60" cy="140" rx="18" ry="12" fill="#1e5c30" opacity="0.6" transform="rotate(-10 60 140)" />
          <ellipse cx="120" cy="50" rx="12" ry="8" fill="#2d6a3f" opacity="0.5" />
          <circle cx="155" cy="155" rx="8" fill="#1e5c30" opacity="0.5" />
        </svg>
        {/* Shine overlay */}
        <div className="absolute top-[8%] left-[12%] w-16 h-16 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent)' }}
        />
        {/* Green pulse glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(74,222,128,0.06), transparent)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* CO2 score badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        className="absolute -bottom-3 -right-3 bg-eco-card border border-eco-green/30
          rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-eco"
      >
        <div className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
        <span className="text-xs font-semibold text-eco-green">Live CO₂</span>
      </motion.div>

      {/* Score badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="absolute -top-2 -left-4 bg-eco-card border border-eco-green/30
          rounded-2xl px-3 py-1.5 shadow-eco"
      >
        <div className="text-[10px] text-eco-muted-light">EcoScore</div>
        <div className="text-base font-bold text-eco-green leading-none">72 / 100</div>
      </motion.div>
    </div>
  )
}
