'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Leaf, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
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

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError(
        res.error === 'CredentialsSignin'
          ? 'Incorrect email or password. Please try again.'
          : res.error
      )
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  const handleGoogleSignIn = () => {
    setGoogleLoading(true)
    signIn('google', { callbackUrl })
  }

  return (
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
        <h1 className="text-2xl font-black text-white mb-1.5">Welcome back</h1>
        <p className="text-eco-muted-light text-[13px] mb-7">
          Sign in to continue your climate journey.
        </p>

        {/* Google sign in */}
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
          <span className="text-[11px] text-eco-muted uppercase tracking-wider">or sign in with email</span>
          <div className="flex-1 h-px bg-eco-border" />
        </div>

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

        {/* Email/password form */}
        <form onSubmit={handleCredentialsSignIn} className="space-y-3">
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
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-eco-muted" />
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-eco-surface border border-eco-border rounded-xl pl-10 pr-4 py-3 text-[13px]
                text-eco-text placeholder:text-eco-muted outline-none focus:border-eco-green/40 transition-colors"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-eco-green text-eco-dark
              font-semibold rounded-xl text-[14px] disabled:opacity-60 transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <>Sign in <ArrowRight size={15} /></>}
          </motion.button>
        </form>

        <p className="text-center text-[13px] text-eco-muted-light mt-6">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-eco-green font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <AuthSidePanel />
      <div className="flex items-center justify-center px-6 py-16">
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  )
}
