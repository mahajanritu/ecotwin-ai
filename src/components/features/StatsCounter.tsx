'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  suffix?: string
  prefix?: string
  format?: boolean
  duration?: number
  className?: string
  decimals?: number
}

export default function StatsCounter({
  end,
  suffix = '',
  prefix = '',
  format = false,
  duration = 2000,
  className = '',
  decimals = 0,
}: Props) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Use IntersectionObserver directly — more reliable than framer-motion useInView
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const tick = () => {
      const now = Date.now()
      const progress = Math.min(1, (now - startTime) / (endTime - startTime))
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * end)
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(end)
    }

    requestAnimationFrame(tick)
  }, [started, end, duration])

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : format
      ? Math.round(count).toLocaleString()
      : Math.round(count).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
