'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, AlertCircle } from 'lucide-react'

interface Message {
  role: 'ai' | 'user'
  text: string
  error?: boolean
  source?: string
}

interface ChatCoachProps {
  initialPrompt?: string | null
  onPromptConsumed?: () => void
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'ai',
    text: "👋 Hi! I'm your EcoCoach, powered by Groq AI. Ask me anything — carbon footprint, diet, transport, solar, shopping, or any sustainability topic!",
  },
]

const SUGGESTIONS = [
  'What is a carbon footprint?',
  'How can I reduce flight emissions?',
  'Is solar worth it in India?',
  'Best diet changes for climate?',
  'How to save energy at home?',
  'What is fast fashion impact?',
]

export default function ChatCoach({ initialPrompt, onPromptConsumed }: ChatCoachProps = {}) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      sendMessage(initialPrompt)
      onPromptConsumed?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    try {
      const res = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()

      if (!data.reply) {
        throw new Error('No reply received')
      }

      const isError = data.source === 'api-error' || data.source === 'no-key' || !res.ok
      setMessages(prev => [...prev, {
        role: 'ai',
        text: data.reply,
        error: isError,
        source: data.source,
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: '❌ Could not connect to AI. Check your internet connection and GEMINI_API_KEY in .env.local.',
        error: true,
      }])
    } finally {
      setTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const showSuggestions = messages.length <= 1

  return (
    <div className="rounded-2xl border border-eco-border bg-eco-card/60 overflow-hidden flex flex-col h-[540px]">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-eco-border bg-eco-surface/30">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-eco-green/15 border border-eco-green/30
            flex items-center justify-center">
            <Bot size={18} className="text-eco-green" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-eco-green rounded-full
            border-2 border-eco-card animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold text-white">EcoCoach AI</div>
          <div className="text-[11px] text-eco-green flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-eco-green rounded-full" />
            Powered by Groq AI
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-eco-muted-light
          px-2.5 py-1 rounded-full border border-eco-green/20 bg-eco-green/5">
          <span className="w-1.5 h-1.5 rounded-full bg-eco-green" aria-hidden="true" />
          Online
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        role="log"
        aria-live="polite"
        aria-label="Conversation with EcoCoach"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`max-w-[85%] ${m.role === 'user' ? 'self-end ml-auto' : 'self-start'}`}
          >
            <div className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
              m.role === 'user'
                ? 'bg-eco-green text-eco-dark font-medium'
                : m.error
                  ? 'bg-red-500/8 border border-red-500/20 text-red-300'
                  : 'bg-eco-surface border border-eco-border text-eco-text'
            }`}>
              {m.error && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertCircle size={12} className="text-red-400" />
                  <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">Error</span>
                </div>
              )}
              <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span>
            </div>
            <div className="text-[10px] text-eco-muted mt-1 px-1">
              {m.role === 'ai' ? (m.source === 'gemini' ? '✓ Gemini AI' : m.source === 'no-key' ? '⚠ No API key' : '') : 'You'}
            </div>
          </motion.div>
        ))}

        {/* Typing dots */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="self-start max-w-[60%] rounded-2xl px-4 py-3.5
                bg-eco-surface border border-eco-border flex items-center gap-1.5"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-eco-green/60 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-2 overflow-hidden"
          >
            <div className="text-[10px] text-eco-muted mb-2 uppercase tracking-wider">
              Try asking:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-eco-green/20
                    bg-eco-green/5 text-eco-green hover:bg-eco-green/15 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div className="p-4 border-t border-eco-border bg-eco-surface/20 flex gap-2">
        <label htmlFor="coach-chat-input" className="sr-only">Ask the AI coach a question</label>
        <input
          id="coach-chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about sustainability..."
          disabled={typing}
          className="flex-1 bg-eco-card border border-eco-border rounded-xl px-4 py-2.5 text-[13px]
            text-eco-text placeholder:text-eco-muted outline-none focus:border-eco-green/40
            transition-colors disabled:opacity-60"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => sendMessage(input)}
          disabled={typing || !input.trim()}
          className="px-4 py-2.5 bg-eco-green text-eco-dark rounded-xl flex items-center
            gap-1.5 font-semibold text-[13px] disabled:opacity-40 transition-all whitespace-nowrap"
        >
          <Send size={13} aria-hidden="true" />
          {typing ? 'Thinking...' : 'Send'}
        </motion.button>
      </div>
    </div>
  )
}
