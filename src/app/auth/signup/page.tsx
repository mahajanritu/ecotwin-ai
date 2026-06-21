'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Leaf, Mail, Lock, User, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import AuthSidePanel from '@/components/features/AuthSidePanel'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3.01h3.86c2.26-2.08 3.59-5.15 3.59-8.66z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.86-3.01c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.79-2.11-6.74-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.26 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.6H1.27C.46 8.24 0 10.06 0 12s.46 3.76 1.27 5.4l3.99-3.12z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l3.99 3.12C6.21 6.86 8.87 4.75 12 4.75z" />
    </svg>
  )
}

const PASSWORD_MIN_LENGTH = 6

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const passwordTooShort = password.length > 0 && password.length < PASSWORD_MIN_LENGTH

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      setSuccess(true)

      // Auto sign-in right after successful signup
      const signInRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      setLoading(false)

      if (signInRes?.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        // Account created but auto sign-in failed — send them to sign in page
        router.push('/auth/signin')
      }
    } catch {
      setLoading(false)
      setError('Network error. Please check your connection and try again.')
    }
  }

  const handleGoogleSignIn = () => {
    setGoogleLoading(true)
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <AuthSidePanel />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-9 h-9 rounded-xl bg-eco-gradient flex items-center justify-center shadow-eco">
              <Leaf size={18} className="text-eco-dark" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">EcoTwin</span>
              <span className="text-eco-green font-bold text-lg"> AI</span>
            </div>
          </Link>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-black text-white mb-1.5">Create your account</h1>
            <p className="text-eco-muted-light text-[13px] mb-7">
              Start tracking your carbon footprint — free, forever.
            </p>

            {/* Google sign up */}
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-eco-border
                bg-white/[0.03] hover:bg-white/[0.06] transition-all text-[14px] font-medium text-eco-text
                disabled:opacity-60"
            >
              {googleLoading ? <Loader2 size={16} className="animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-eco-border" />
              <span className="text-[11px] text-eco-muted uppercase tracking-wider">or sign up with email</span>
              <div className="flex-1 h-px bg-eco-border" />
            </div>

            {/* Success */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl border border-eco-green/20
                  bg-eco-green/5 text-eco-green text-[12px] mb-4"
              >
                <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                <span>Account created! Signing you in...</span>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl border border-red-400/20
                  bg-red-400/5 text-red-400 text-[12px] mb-4"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-eco-muted" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-eco-surface border border-eco-border rounded-xl pl-10 pr-4 py-3 text-[13px]
                    text-eco-text placeholder:text-eco-muted outline-none focus:border-eco-green/40 transition-colors"
                />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-eco-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-eco-surface border border-eco-border rounded-xl pl-10 pr-4 py-3 text-[13px]
                    text-eco-text placeholder:text-eco-muted outline-none focus:border-eco-green/40 transition-colors"
                />
              </div>
              <div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-eco-muted" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password (min. 6 characters)"
                    className="w-full bg-eco-surface border border-eco-border rounded-xl pl-10 pr-4 py-3 text-[13px]
                      text-eco-text placeholder:text-eco-muted outline-none focus:border-eco-green/40 transition-colors"
                  />
                </div>
                {passwordTooShort && (
                  <p className="text-[11px] text-amber-400 mt-1.5 ml-1">
                    Password needs at least {PASSWORD_MIN_LENGTH} characters.
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-eco-green text-eco-dark
                  font-semibold rounded-xl text-[14px] disabled:opacity-60 transition-all"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <>Create account <ArrowRight size={15} /></>}
              </motion.button>
            </form>

            <p className="text-center text-[11px] text-eco-muted mt-5">
              By signing up, you agree to EcoTwin AI&apos;s Terms & Privacy Policy.
            </p>

            <p className="text-center text-[13px] text-eco-muted-light mt-4">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-eco-green font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
