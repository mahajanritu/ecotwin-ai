'use client'

import Link from 'next/link'
import { Leaf, Github, Heart, ArrowUpRight } from 'lucide-react'

const PRODUCT_LINKS = [
  { label: 'Carbon Calculator', href: '/calculator' },
  { label: 'AI Climate Twin', href: '/twin' },
  { label: 'Sustainability Coach', href: '/coach' },
  { label: 'Community & Challenges', href: '/community' },
]

const ACCOUNT_LINKS = [
  { label: 'Sign In', href: '/auth/signin' },
  { label: 'Create Account', href: '/auth/signup' },
  { label: 'Dashboard', href: '/dashboard' },
]

const RESOURCES_LINKS = [
  { label: 'Source Code', href: 'https://github.com/mahajanritu/ecotwin-ai' },
  { label: 'MIT License', href: 'https://github.com/mahajanritu/ecotwin-ai/blob/main/LICENSE' },
]

export default function Footer() {
  return (
    <footer className="border-t border-eco-border bg-eco-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-eco-gradient flex items-center justify-center flex-shrink-0 shadow-eco">
                <Leaf size={20} className="text-eco-dark" />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">
                EcoTwin <span className="text-eco-green">AI</span>
              </span>
            </div>
            <p className="text-eco-muted-light text-[14px] leading-relaxed mb-6 max-w-sm">
              The AI-powered carbon intelligence platform that shows you your future climate self, and exactly how to change it. Free, open-source, and built for the planet.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/mahajanritu/ecotwin-ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[13px] font-medium text-eco-text hover:text-eco-green transition-colors border border-eco-border hover:border-eco-green/30 rounded-full pl-3 pr-4 py-2">
                <Github size={15} />
                View on GitHub
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[12px] font-semibold text-white uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-3">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[14px] text-eco-muted-light hover:text-eco-green transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-white uppercase tracking-widest mb-4">Account</h4>
              <ul className="space-y-3">
                {ACCOUNT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[14px] text-eco-muted-light hover:text-eco-green transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-white uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-3">
                {RESOURCES_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[14px] text-eco-muted-light hover:text-eco-green transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-eco-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-eco-muted-light">
          <p className="flex items-center gap-2 order-2 sm:order-1">
            <Heart size={13} className="text-eco-green" fill="#4ADE80" />
            Built for the planet · (c) 2025 EcoTwin AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2 px-3 py-1.5 rounded-full border border-eco-green/20 bg-eco-green/5">
            <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
            <span className="text-eco-green font-medium">Zero-carbon hosting on Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}