'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Home, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console for debugging — in production this could be wired to
    // an error-tracking service (Sentry, etc.)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-eco-dark grid-bg px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-eco-gradient flex items-center justify-center mb-6">
          <Leaf size={28} className="text-eco-dark" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Something went wrong</h1>
        <p className="text-eco-muted-light text-[15px] mb-8 max-w-sm leading-relaxed">
          We hit an unexpected error calculating your impact. Your data is safe —
          try again or head back home.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 bg-eco-green text-eco-dark font-semibold rounded-full
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <RotateCcw size={16} aria-hidden="true" /> Try Again
          </button>
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 border border-eco-border text-eco-text font-semibold rounded-full
              hover:border-eco-green/30 transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-green">
              <Home size={16} aria-hidden="true" /> Back to Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
