'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

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
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startTime = Date.now()
    const endTime = startTime + duration

    const tick = () => {
      const now = Date.now()
      const progress = Math.min(1, (now - startTime) / (endTime - startTime))
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(eased * end)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, end, duration])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}{format ? Math.round(count).toLocaleString() : display}{suffix}
    </span>
  )
}
