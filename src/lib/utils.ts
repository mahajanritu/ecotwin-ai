import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCO2(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}t`
  return `${value.toFixed(0)}kg`
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

export function formatCurrency(n: number, currency = '₹'): string {
  if (n >= 100_000) return `${currency}${(n / 100_000).toFixed(1)}L`
  if (n >= 1_000) return `${currency}${(n / 1_000).toFixed(0)}K`
  return `${currency}${n.toLocaleString()}`
}

export function getEcoLevel(xp: number): { level: number; title: string; nextXP: number } {
  const levels = [
    { xp: 0, title: 'Eco Starter' },
    { xp: 500, title: 'Green Explorer' },
    { xp: 1500, title: 'Climate Aware' },
    { xp: 3000, title: 'Eco Warrior' },
    { xp: 6000, title: 'Planet Guardian' },
    { xp: 10000, title: 'Climate Champion' },
    { xp: 20000, title: 'Earth Hero' },
  ]
  let level = 0
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xp) level = i
    else break
  }
  return {
    level: level + 1,
    title: levels[level].title,
    nextXP: levels[Math.min(level + 1, levels.length - 1)].xp,
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#4ADE80'
  if (score >= 60) return '#2DD4BF'
  if (score >= 40) return '#FCD34D'
  if (score >= 20) return '#F97316'
  return '#F87171'
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  if (score >= 20) return 'Poor'
  return 'Critical'
}

export function co2ToTrees(co2Kg: number): number {
  return Math.round(co2Kg / 21)
}

export function co2ToKmDriving(co2Kg: number): number {
  return Math.round(co2Kg / 0.21)
}

export function co2ToFlights(co2Kg: number): number {
  return parseFloat((co2Kg / 900).toFixed(1))
}

export function interpolateColor(color1: string, color2: string, t: number): string {
  const hex = (c: string) => parseInt(c, 16)
  const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7))
  const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7))
  const r = Math.round(r1 + (r2 - r1) * t).toString(16).padStart(2, '0')
  const g = Math.round(g1 + (g2 - g1) * t).toString(16).padStart(2, '0')
  const b = Math.round(b1 + (b2 - b1) * t).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
