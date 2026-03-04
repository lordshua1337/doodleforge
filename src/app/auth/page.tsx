'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/auth/client'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createSupabaseBrowser()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the login link!')
    }
    setLoading(false)
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--paper-white, #FFF8F0)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Gaegu, cursive', color: 'var(--ink-dark, #2B2D42)' }}>
            DOODIE
          </h1>
          <p className="text-sm" style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)', fontSize: '1.2rem' }}>
            sign in to save your kid&apos;s masterpieces
          </p>
        </div>

        <div className="p-6 rounded-lg" style={{
          background: 'var(--paper-cream, #F5E6D3)',
          border: '3px solid var(--ink-dark, #2B2D42)',
          transform: 'rotate(-0.5deg)',
        }}>
          <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-transform hover:scale-105 mb-4"
            style={{
              background: 'white',
              border: '2px solid var(--ink-dark, #2B2D42)',
              fontFamily: 'Nunito, sans-serif',
            }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-0.5" style={{ background: 'var(--ink-dark, #2B2D42)', opacity: 0.2 }} />
            <span className="text-xs" style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)' }}>or</span>
            <div className="flex-1 h-0.5" style={{ background: 'var(--ink-dark, #2B2D42)', opacity: 0.2 }} />
          </div>

          <form onSubmit={handleMagicLink}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@email.com"
              className="w-full px-3 py-3 rounded-lg text-sm mb-3"
              style={{
                background: 'white',
                border: '2px solid var(--ink-dark, #2B2D42)',
                fontFamily: 'Nunito, sans-serif',
              }} />
            <button type="submit" disabled={loading || !email}
              className="w-full px-4 py-3 font-bold rounded-lg transition-transform hover:scale-105 disabled:opacity-50 text-white"
              style={{
                background: 'var(--crayon-red, #E63946)',
                fontFamily: 'Gaegu, cursive',
                fontSize: '1.2rem',
              }}>
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          {message && (
            <p className="mt-3 text-xs text-center" style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '1rem',
              color: message.includes('Check') ? 'var(--crayon-green, #06D6A0)' : 'var(--crayon-red, #E63946)',
            }}>
              {message}
            </p>
          )}
        </div>

        <p className="text-center text-sm mt-4" style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)' }}>
          <Link href="/" className="hover:underline">just browsing</Link>
          {' '} -- 3 free forges, no card needed
        </p>
      </div>
    </div>
  )
}
