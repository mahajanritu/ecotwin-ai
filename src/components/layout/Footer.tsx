'use client'

import Link from 'next/link'
import { Leaf, Github, Twitter, Linkedin, Heart } from 'lucide-react'

const LINKS = {
  Product: [
    { label: 'Calculator', href: '/calculator' },
    { label: 'My Twin', href: '/twin' },
    { label: 'AI Coach', href: '/coach' },
    { label: 'Community', href: '/community' },
    { label: 'Leaderboard', href: '/community#leaderboard' },
  ],
  Learn: [
    { label: 'Learning Hub', href: '/community#learn' },
    { label: 'Climate Science', href: '#' },
    { label: 'Green Living', href: '#' },
    { label: 'Carbon Offsets', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'GitHub', href: 'https://github.com/ecotwin-ai' },
    { label: 'Contact', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-eco-border bg-eco-surface/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-eco-gradient flex items-center justify-center">
                <Leaf size={16} className="text-eco-dark" />
              </div>
              <span className="font-bold text-white text-lg">EcoTwin <span className="text-eco-green">AI</span></span>
            </div>
            <p className="text-eco-muted-light text-sm leading-relaxed max-w-xs mb-5">
              The world's most comprehensive AI carbon intelligence platform. Free, open-source, and built for the planet.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com/ecotwin-ai' },
                { icon: Twitter, href: 'https://twitter.com/ecotwinai' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-eco-border flex items-center justify-center
                    text-eco-muted-light hover:text-eco-green hover:border-eco-green/30 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] font-semibold text-eco-muted-light uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
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
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-eco-border flex flex-col md:flex-row items-center 
          justify-between gap-4">
          <p className="text-[12px] text-eco-muted-light flex items-center gap-1">
            Made with <Heart size={11} className="text-eco-green" fill="#4ADE80" /> for the planet · 
            © 2025 EcoTwin AI · Open Source
          </p>
          <div className="flex gap-5 text-[12px] text-eco-muted-light">
            <Link href="#" className="hover:text-eco-green transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-eco-green transition-colors">Terms</Link>
            <Link href="#" className="hover:text-eco-green transition-colors">MIT License</Link>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-eco-muted-light">
            <div className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
            Zero-carbon hosting · Vercel Green
          </div>
        </div>
      </div>
    </footer>
  )
}
