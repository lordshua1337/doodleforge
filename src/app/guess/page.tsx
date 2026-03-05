'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTodaysGuess, type DailyGuess } from '@/lib/guess/data'

export default function GuessPage() {
  const [guess, setGuess] = useState<DailyGuess | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    setGuess(getTodaysGuess())
    const savedStreak = parseInt(localStorage.getItem('doodie-streak') || '0', 10)
    setStreak(savedStreak)

    // Check if already guessed today
    const lastGuessDate = localStorage.getItem('doodie-last-guess')
    const today = new Date().toISOString().split('T')[0]
    if (lastGuessDate === today) {
      setRevealed(true)
      setSelected(localStorage.getItem('doodie-last-answer') || null)
    }
  }, [])

  if (!guess) return null

  const options = [...guess.wrong_options, guess.answer].sort(() => Math.random() - 0.5)

  function handleGuess(answer: string) {
    setSelected(answer)
    setRevealed(true)

    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem('doodie-last-guess', today)
    localStorage.setItem('doodie-last-answer', answer)

    if (answer === guess!.answer) {
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('doodie-streak', String(newStreak))
    } else {
      setStreak(0)
      localStorage.setItem('doodie-streak', '0')
    }
  }

  const isCorrect = selected === guess.answer

  return (
    <div className="relative z-10 min-h-screen">
      <div className="d-section" style={{ background: '#FFF8F0' }}>
      <div className="d-container-sm" style={{ maxWidth: 512 }}>
        {/* Streak badge */}
        {streak > 0 && (
          <div className="d-center d-mb-lg">
            <span className="d-badge">
              {streak} day streak!
            </span>
          </div>
        )}

        {/* Question */}
        <h1 className="d-heading d-heading-lg d-center d-mb-sm">
          WHAT IS THIS MASTERPIECE?
        </h1>
        <p className="d-eyebrow d-eyebrow-blue d-center d-mb-xl" style={{ fontSize: '1.2rem' }}>
          {!revealed ? guess.hint : ''}
        </p>

        {/* The "drawing" placeholder */}
        <div className="d-center d-mb-xl">
          <div
            className="craft-card"
            style={{
              maxWidth: 400,
              margin: '0 auto',
              textAlign: 'center',
              transform: 'rotate(1deg)',
            }}
          >
            <div
              className="d-flex-center"
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 8,
                background: '#F5E6D3',
              }}
            >
              <span className="d-heading" style={{ fontSize: 64, color: '#7B2D8E' }}>
                {revealed ? guess.answer : '???'}
              </span>
            </div>
            {revealed && (
              <p className="d-eyebrow d-mt-lg" style={{ marginBottom: 0, color: '#2B2D42' }}>
                &ldquo;{guess.answer}&rdquo; -- by a very talented 5-year-old
              </p>
            )}
          </div>
        </div>

        {/* Options */}
        {!revealed ? (
          <div className="d-grid d-grid-2" style={{ maxWidth: 400, margin: '0 auto', gap: 12 }}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleGuess(option)}
                className="d-select-pill"
                style={{
                  padding: '16px 12px',
                  fontSize: 18,
                  justifyContent: 'center',
                  transform: `rotate(${(Math.random() - 0.5) * 3}deg)`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
            {/* Result */}
            <div className={isCorrect ? 'd-alert d-alert-success' : 'd-alert d-alert-error'} style={{ padding: 24, marginBottom: 24, borderRadius: 8, transform: 'rotate(-1deg)' }}>
              <h2 className="d-heading d-mb-sm" style={{ fontSize: 28, color: 'inherit' }}>
                {isCorrect ? 'YOU GOT IT!' : 'NOPE!'}
              </h2>
              <p className="d-body-sm" style={{ color: 'inherit', opacity: 0.9 }}>
                {guess.reveal_text}
              </p>
              {!isCorrect && (
                <p className="d-eyebrow d-mt-lg" style={{ marginBottom: 0, color: 'inherit', opacity: 0.8, fontSize: '1rem' }}>
                  {guess.roast}
                </p>
              )}
            </div>

            {/* Come back tomorrow */}
            <p className="d-eyebrow d-eyebrow-blue d-mb-lg" style={{ fontSize: '1.2rem' }}>
              Come back tomorrow for a new masterpiece!
            </p>

            <div className="d-btn-row">
              <Link href="/create" className="d-btn-primary">
                MAKE A DOODIE
              </Link>
              <Link href="/" className="d-btn-secondary">
                The Fridge
              </Link>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
