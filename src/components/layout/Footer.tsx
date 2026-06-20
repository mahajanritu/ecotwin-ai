'use client'

import Link from 'next/link'
import { Leaf, Github, Heart, ArrowUpRight } from 'lucide-react'

const PRODUCT_LINKS = [
  { label: 'Calculator', href: '/calculator' },
  { label: 'My Twin', href: '/twin' },
  { label: 'AI Coach', href: '/coach' },
  { label: 'Community', href: '/community' },
]

const ACCOUNT_LINKS = [
  { label: 'Sign In', href: '/auth/signin' },
  { label: 'Sign Up', href: '/auth/signup' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Footer() {
  return (
    <footer className="border-t border-eco-border bg-eco-surface/20">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Top row: brand + link columns, tightly aligned */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">

          {/* Brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-eco-gradient flex items-center justify-center flex-shrink-0">
                <Leaf size={16} className="text-eco-dark" />
              </div>
              <span className="font-bold text-white text-base">
                EcoTwin <span className="text-eco-green">AI</span>
              </span>
            </div>
            <p className="text-eco-muted-light text-[13px] leading-relaxed mb-4">
              AI-powered carbon intelligence platform. Free, open-source, and built for the planet.
            </p>
            <a
              href="https://github.com/mahajanritu/ecotwin-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] text-eco-muted-light
                hover:text-eco-green transition-colors border border-eco-border hover:border-eco-green/30
                rounded-full px-3 py-1.5"
            >
              <Github size={13} />
              View on GitHub
              <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Link columns — compact, side by side */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[11px] font-semibold text-eco-muted-light uppercase tracking-widest mb-3">
                Product
              </h4>
              <ul className="space-y-2">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-eco-muted-light hover:text-eco-green transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold text-eco-muted-light uppercase tracking-widest mb-3">
                Account
              </h4>
              <ul className="space-y-2">
                {ACCOUNT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-eco-muted-light hover:text-eco-green transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar — single compact row */}
        <div className="pt-6 border-t border-eco-border flex flex-col sm:flex-row items-center
          justify-between gap-3 text-[12px] text-eco-muted-light">
          <p className="flex items-center gap-1.5 order-2 sm:order-1">
            <Heart size={11} className="text-eco-green" fill="#4ADE80" />
            Built for the planet · © 2025 EcoTwin AI
          </p>
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
            MIT License · Zero-carbon hosting on Vercel
          </div>
        </div>
      </div>
    </footer>
  )
}
