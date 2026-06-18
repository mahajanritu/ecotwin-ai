'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import NotificationsDropdown from './NotificationsDropdown'
import UserMenu from './UserMenu'

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Twin', href: '/twin' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'AI Coach', href: '/coach' },
  { label: 'Community', href: '/community' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-eco-dark/90 backdrop-blur-xl border-b border-eco-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-eco-gradient flex items-center justify-center
              group-hover:scale-105 transition-transform shadow-eco">
              <Leaf size={16} className="text-eco-dark" />
            </div>
            <div>
              <span className="font-bold text-[15px] text-white tracking-tight">EcoTwin</span>
              <span className="text-eco-green font-bold text-[15px]"> AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-full text-[13px] font-medium transition-all',
                  pathname === link.href
                    ? 'text-eco-green bg-eco-green/10'
                    : 'text-eco-muted-light hover:text-eco-text hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <NotificationsDropdown />

            <UserMenu />

            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-eco-green text-eco-dark 
                  font-semibold rounded-full text-[13px] hover:shadow-eco transition-all"
              >
                <Zap size={13} />
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl border border-eco-border flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-eco-dark/95 backdrop-blur-xl
              border-b border-eco-border p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-xl text-[14px] font-medium transition-all',
                  pathname === link.href
                    ? 'text-eco-green bg-eco-green/10'
                    : 'text-eco-muted-light hover:text-eco-text hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/auth/signin" onClick={() => setMobileOpen(false)}>
              <div className="px-4 py-3 rounded-xl text-[14px] font-medium text-eco-muted-light
                hover:text-eco-text hover:bg-white/5 transition-all">
                Sign in / Account
              </div>
            </Link>
            <Link href="/calculator" onClick={() => setMobileOpen(false)}>
              <button className="w-full mt-2 py-3 bg-eco-green text-eco-dark font-semibold 
                rounded-xl text-[14px]">
                Start Free Assessment
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
