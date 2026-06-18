'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, CheckCircle2, Loader2, Upload, X, Zap } from 'lucide-react'

interface ScanResult {
  type: string
  amount: number
  co2Impact: number
  energyUsed?: number
  summary: string
  insights: string[]
}

export default function ReceiptScanner() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
    if (!validTypes.some(t => file.type === t || file.name.toLowerCase().endsWith('.pdf'))) {
      setErrorMsg('Please upload a JPG, PNG, WEBP, or PDF file.')
      setStatus('error')
      return
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large (max 10MB). Try a smaller image.')
      setStatus('error')
      return
    }

    setStatus('scanning')
    setResult(null)
    setErrorMsg('')

    // Read file as base64
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64 = e.target?.result as string

      // Show preview for images
      if (file.type.startsWith('image/')) {
        setPreview(base64)
      }

      try {
        const res = await fetch('/api/receipt/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            fileName: file.name,
          }),
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Analysis failed')
        }

        setResult(data.result)
        setStatus('done')
      } catch (err) {
        console.error('Receipt scan error:', err)
        setErrorMsg(err instanceof Error ? err.message : 'Analysis failed. Please try again.')
        setStatus('error')
      }
    }

    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please try again.')
      setStatus('error')
    }

    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const handleReset = () => {
    setStatus('idle')
    setResult(null)
    setPreview(null)
    setErrorMsg('')
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      electricity: '⚡ Electricity Bill',
      shopping: '🛍️ Shopping Receipt',
      transport: '🚗 Transport',
      food: '🍽️ Food / Restaurant',
      unknown: '📄 Receipt',
    }
    return labels[type] ?? '📄 Receipt'
  }

  const getCO2Color = (co2: number) => {
    if (co2 > 200) return '#F87171'
    if (co2 > 80) return '#FCD34D'
    return '#4ADE80'
  }

  return (
    <div className="p-5 rounded-2xl border border-eco-border bg-eco-card/60">
      <div className="mb-4">
        <h3 className="font-semibold text-white text-[14px] flex items-center gap-2">
          <Zap size={14} className="text-eco-green" /> AI Receipt Scanner
        </h3>
        <p className="text-[11px] text-eco-muted-light mt-0.5">
          Upload any bill, receipt, or ticket — AI will estimate its carbon impact
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">

        {/* Idle state */}
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
              transition-all duration-200 ${
              dragOver
                ? 'border-eco-green bg-eco-green/8'
                : 'border-eco-green/25 hover:border-eco-green/50 hover:bg-eco-green/[0.02]'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-eco-green/10 flex items-center justify-center
              mx-auto mb-3">
              <Camera size={22} className="text-eco-green" />
            </div>
            <div className="text-[13px] font-medium text-eco-text mb-1">
              Drop receipt here or click to upload
            </div>
            <div className="text-[11px] text-eco-muted-light">
              JPG, PNG, PDF · Max 10MB
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-eco-green">
              <Zap size={10} /> Powered by Gemini Vision AI
            </div>
          </motion.div>
        )}

        {/* Scanning state */}
        {status === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-eco-border bg-eco-surface/50 p-6 text-center"
          >
            {preview && (
              <div className="mb-4 rounded-xl overflow-hidden max-h-32 flex items-center justify-center bg-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Receipt preview" className="max-h-32 object-contain rounded-xl" />
              </div>
            )}
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="text-eco-green animate-spin" />
              <div>
                <div className="text-[13px] font-semibold text-white mb-0.5">
                  Analyzing with AI...
                </div>
                <div className="text-[11px] text-eco-muted-light">
                  Reading text → estimating CO₂ impact
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0">
                <X size={14} className="text-red-400" />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-red-400 mb-1">Analysis failed</div>
                <div className="text-[12px] text-eco-muted-light">{errorMsg}</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 w-full py-2 rounded-xl border border-eco-border text-[12px]
                text-eco-muted-light hover:text-eco-text transition-colors"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Done state */}
        {status === 'done' && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* Image preview */}
            {preview && (
              <div className="mb-3 rounded-xl overflow-hidden max-h-28 flex items-center justify-center bg-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Receipt" className="max-h-28 object-contain" />
              </div>
            )}

            {/* Result card */}
            <div className="p-4 rounded-xl bg-eco-green/[0.05] border border-eco-green/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-eco-green" />
                <span className="text-[12px] font-semibold text-eco-green">
                  {getTypeLabel(result.type)} analyzed
                </span>
              </div>

              <div className="text-[11px] text-eco-muted-light mb-3 italic">
                {result.summary}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 rounded-lg bg-eco-dark/50">
                  <div className="text-[14px] font-bold text-white">
                    {result.amount > 0 ? `₹${result.amount.toLocaleString()}` : '—'}
                  </div>
                  <div className="text-[9px] text-eco-muted-light uppercase">Amount</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-eco-dark/50">
                  <div className="text-[14px] font-bold" style={{ color: getCO2Color(result.co2Impact) }}>
                    {result.co2Impact}kg
                  </div>
                  <div className="text-[9px] text-eco-muted-light uppercase">CO₂</div>
                </div>
                {result.energyUsed ? (
                  <div className="text-center p-2 rounded-lg bg-eco-dark/50">
                    <div className="text-[14px] font-bold text-amber-400">{result.energyUsed}</div>
                    <div className="text-[9px] text-eco-muted-light uppercase">kWh</div>
                  </div>
                ) : (
                  <div className="text-center p-2 rounded-lg bg-eco-dark/50">
                    <div className="text-[14px] font-bold text-eco-green">
                      {result.type}
                    </div>
                    <div className="text-[9px] text-eco-muted-light uppercase">Type</div>
                  </div>
                )}
              </div>

              {/* Insights */}
              {result.insights?.length > 0 && (
                <div className="space-y-1.5">
                  {result.insights.map((ins, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-eco-muted-light">
                      <span className="text-eco-green mt-0.5">•</span>
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload another */}
            <button
              onClick={handleReset}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl
                border border-eco-border text-[12px] text-eco-muted-light hover:text-eco-text
                hover:border-eco-green/20 transition-all"
            >
              <Upload size={12} /> Scan another receipt
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
