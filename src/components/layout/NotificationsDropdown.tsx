'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Award, TreePine, Flame, Users, Check } from 'lucide-react'

interface Notification {
  id: number
  icon: React.ElementType
  color: string
  title: string
  desc: string
  time: string
  unread: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    icon: Award,
    color: '#4ADE80',
    title: 'New badge unlocked!',
    desc: "You earned 'Walk the Talk' for a 7-day cycling streak. +250 XP",
    time: '2h ago',
    unread: true,
  },
  {
    id: 2,
    icon: TreePine,
    color: '#A3E635',
    title: 'Your ecosystem grew 🌳',
    desc: 'Forest health increased to 72% thanks to last week\'s actions.',
    time: '5h ago',
    unread: true,
  },
  {
    id: 3,
    icon: Flame,
    color: '#FCD34D',
    title: 'Streak reminder',
    desc: "You're on a 5-day streak — log an action today to keep it alive!",
    time: '1d ago',
    unread: true,
  },
  {
    id: 4,
    icon: Users,
    color: '#60A5FA',
    title: 'No Car Week update',
    desc: '2,841 people joined this challenge. You\'re 60% through!',
    time: '2d ago',
    unread: false,
  },
]

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const ref = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => n.unread).length

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-9 h-9 rounded-full border border-eco-border 
          bg-eco-card/50 flex items-center justify-center hover:border-eco-green/30 
          transition-colors group"
        aria-label="Notifications"
      >
        <Bell size={15} className="text-eco-muted-light group-hover:text-eco-text transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-eco-green rounded-full 
            flex items-center justify-center text-[9px] font-bold text-eco-dark">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 rounded-2xl border border-eco-border
              bg-eco-card/95 backdrop-blur-xl shadow-eco-lg overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-eco-border">
              <span className="text-[13px] font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-[11px] text-eco-green hover:text-eco-green/80 transition-colors"
                >
                  <Check size={11} /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-[12px] text-eco-muted-light">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = n.icon
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 border-b border-white/[0.03] last:border-0
                        transition-colors hover:bg-white/[0.02] ${n.unread ? 'bg-eco-green/[0.03]' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${n.color}15` }}>
                        <Icon size={14} style={{ color: n.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-semibold text-white">{n.title}</span>
                          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-eco-green flex-shrink-0" />}
                        </div>
                        <p className="text-[11px] text-eco-muted-light leading-relaxed mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-eco-muted mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-eco-border text-center">
              <button className="text-[11px] text-eco-muted-light hover:text-eco-green transition-colors">
                View all activity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
