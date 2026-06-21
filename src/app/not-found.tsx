'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-eco-dark grid-bg px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-eco-gradient flex items-center justify-center mb-6">
          <Leaf size={28} className="text-eco-dark" />
        </div>
        <h1 className="text-6xl font-black text-white mb-2">404</h1>
        <p className="text-eco-muted-light text-lg mb-8 max-w-sm">
          This page seems to have a bigger carbon footprint than expected — it doesn&apos;t exist.
        </p>
        <Link href="/">
          <button className="flex items-center gap-2 px-6 py-3 bg-eco-green text-eco-dark font-semibold rounded-full">
            <Home size={16} /> Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
