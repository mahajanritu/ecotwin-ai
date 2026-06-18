'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut, LayoutDashboard, Loader2 } from 'lucide-react'

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Loading state
  if (status === 'loading') {
    return (
      <div className="w-9 h-9 rounded-full border border-eco-border bg-eco-card/50 flex items-center justify-center">
        <Loader2 size={14} className="text-eco-muted-light animate-spin" />
      </div>
    )
  }

  // Not signed in
  if (!session) {
    return (
      <Link href="/auth/signin">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-eco-border
            bg-eco-card/50 hover:border-eco-green/30 transition-all text-[13px] font-medium text-eco-text cursor-pointer"
        >
          <User size={14} className="text-eco-green" />
          Sign in
        </motion.div>
      </Link>
    )
  }

  // Signed in
  const initials = session.user?.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'U'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-2.5 py-1.5 pr-3 rounded-full border border-eco-border
          bg-eco-card/50 hover:border-eco-green/30 transition-all"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? 'User'}
            width={26}
            height={26}
            className="rounded-full"
          />
        ) : (
          <div className="w-[26px] h-[26px] rounded-full bg-eco-green/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-eco-green">{initials}</span>
          </div>
        )}
        <span className="text-[13px] font-medium text-eco-text max-w-[100px] truncate">
          {session.user?.name?.split(' ')[0] ?? 'Profile'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-eco-border
              bg-eco-card/95 backdrop-blur-xl shadow-eco-lg overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-eco-border">
              <div className="text-[13px] font-semibold text-white truncate">{session.user?.name}</div>
              <div className="text-[11px] text-eco-muted-light truncate">{session.user?.email}</div>
              {typeof session.user?.ecoScore === 'number' && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-eco-green/10 border border-eco-green/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-green" />
                  <span className="text-[11px] text-eco-green font-medium">EcoScore: {session.user.ecoScore}</span>
                </div>
              )}
            </div>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 text-[13px] text-eco-text
                hover:bg-white/[0.03] transition-colors"
            >
              <LayoutDashboard size={14} className="text-eco-muted-light" />
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400
                hover:bg-red-400/5 transition-colors text-left"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
