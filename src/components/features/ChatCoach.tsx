'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, AlertCircle } from 'lucide-react'

interface Message {
  role: 'ai' | 'user'
  text: string
  error?: boolean
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'ai',
    text: "👋 Hi! I'm your EcoCoach, powered by Google Gemini AI. Ask me anything about reducing your carbon footprint — flights, diet, energy, shopping, or anything else climate-related!",
  },
]

export default function ChatCoach() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = async () => {
    const text = input.trim()
    if (!text || typing) return

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setTyping(true)

    try {
      const res = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()

      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'No response from coach')
      }

      setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: 'Sorry, I had trouble connecting. Please check your GEMINI_API_KEY in .env.local and try again.',
          error: true,
        },
      ])
    } finally {
      setTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="rounded-2xl border border-eco-border bg-eco-card/60 overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-eco-border">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-eco-green/15 border border-eco-green/30
            flex items-center justify-center">
            <Bot size={18} className="text-eco-green" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-eco-green rounded-full
            border-2 border-eco-card" />
        </div>
        <div>
          <div className="text-[14px] font-semibold text-white">EcoCoach AI</div>
          <div className="text-[11px] text-eco-green flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-eco-green rounded-full animate-pulse" />
            Online · Powered by Google Gemini
          </div>
        </div>
        <div className="ml-auto text-[10px] text-eco-muted-light bg-eco-surface px-2 py-1
          rounded-full border border-eco-border">
          AI · Real-time
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-3"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
              m.role === 'ai'
                ? m.error
                  ? 'bg-red-500/8 border border-red-500/20 text-red-400 self-start flex items-start gap-2'
                  : 'bg-eco-green/[0.07] border border-eco-green/15 text-eco-text self-start'
                : 'bg-white/[0.06] border border-white/8 text-eco-text self-end ml-auto'
            }`}
          >
            {m.error && <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />}
            <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="self-start max-w-[60%] rounded-2xl px-4 py-3
                bg-eco-green/[0.07] border border-eco-green/15 flex items-center gap-1.5"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-eco-green rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {[
            'How can I reduce flight emissions?',
            'Best diet changes for climate?',
            'Is solar worth it in India?',
            'How to save energy at home?',
          ].map(s => (
            <button
              key={s}
              onClick={() => { setInput(s); }}
              className="text-[11px] px-3 py-1.5 rounded-full border border-eco-green/20
                bg-eco-green/5 text-eco-green hover:bg-eco-green/15 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-eco-border flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about sustainability..."
          disabled={typing}
          className="flex-1 bg-eco-surface border border-eco-border rounded-xl px-4 py-2.5 text-[13px]
            text-eco-text placeholder:text-eco-muted outline-none focus:border-eco-green/40
            transition-colors disabled:opacity-60"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={send}
          disabled={typing || !input.trim()}
          className="px-4 py-2.5 bg-eco-green text-eco-dark rounded-xl flex items-center
            gap-1.5 font-semibold text-[13px] disabled:opacity-50 transition-all"
        >
          <Send size={14} />
          {typing ? 'Thinking...' : 'Send'}
        </motion.button>
      </div>
    </div>
  )
}
