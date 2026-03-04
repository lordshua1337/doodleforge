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
    <div className="min-h-screen px-4 py-12" style={{ background: 'var(--paper-white, #FFF8F0)' }}>
      <div className="max-w-lg mx-auto">
        {/* Streak badge */}
        {streak > 0 && (
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-bold"
              style={{
                background: 'var(--crayon-yellow, #FFD166)',
                color: 'var(--ink-dark, #2B2D42)',
                fontFamily: 'Gaegu, cursive',
                transform: 'rotate(-2deg)',
                display: 'inline-block',
              }}>
              {streak} day streak!
            </span>
          </div>
        )}

        {/* Question */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2"
          style={{ fontFamily: 'Gaegu, cursive', color: 'var(--ink-dark, #2B2D42)' }}>
          WHAT IS THIS MASTERPIECE?
        </h1>
        <p className="text-center mb-8" style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)', fontSize: '1.2rem' }}>
          {!revealed ? guess.hint : ''}
        </p>

        {/* The "drawing" placeholder */}
        <div className="mx-auto mb-8 p-8 rounded-lg text-center"
          style={{
            background: 'white',
            border: '3px solid var(--ink-dark, #2B2D42)',
            maxWidth: '400px',
            transform: 'rotate(1deg)',
            boxShadow: '4px 4px 0 var(--ink-dark, #2B2D42)',
          }}>
          <div className="w-full aspect-square flex items-center justify-center rounded-lg"
            style={{ background: 'var(--paper-cream, #F5E6D3)' }}>
            <span className="text-6xl" style={{ fontFamily: 'Gaegu, cursive', color: 'var(--crayon-purple, #7B2D8E)' }}>
              {revealed ? guess.answer : '???'}
            </span>
          </div>
          {revealed && (
            <p className="mt-4 text-sm" style={{ fontFamily: 'Caveat, cursive', color: 'var(--ink-dark, #2B2D42)', fontSize: '1rem' }}>
              &ldquo;{guess.answer}&rdquo; -- by a very talented 5-year-old
            </p>
          )}
        </div>

        {/* Options */}
        {!revealed ? (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {options.map((option) => (
              <button key={option} onClick={() => handleGuess(option)}
                className="p-4 rounded-lg font-bold text-lg transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--paper-cream, #F5E6D3)',
                  border: '3px solid var(--ink-dark, #2B2D42)',
                  fontFamily: 'Gaegu, cursive',
                  color: 'var(--ink-dark, #2B2D42)',
                  transform: `rotate(${(Math.random() - 0.5) * 3}deg)`,
                }}>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            {/* Result */}
            <div className="p-6 rounded-lg mb-6"
              style={{
                background: isCorrect ? 'var(--crayon-green, #06D6A0)' : 'var(--crayon-red, #E63946)',
                color: 'white',
                transform: 'rotate(-1deg)',
              }}>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Gaegu, cursive' }}>
                {isCorrect ? 'YOU GOT IT!' : 'NOPE!'}
              </h2>
              <p className="text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {guess.reveal_text}
              </p>
              {!isCorrect && (
                <p className="text-xs mt-2 opacity-80" style={{ fontFamily: 'Caveat, cursive', fontSize: '1rem' }}>
                  {guess.roast}
                </p>
              )}
            </div>

            {/* Come back tomorrow */}
            <p className="mb-6" style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)', fontSize: '1.2rem' }}>
              Come back tomorrow for a new masterpiece!
            </p>

            <div className="flex gap-3 justify-center">
              <Link href="/create"
                className="px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105"
                style={{ background: 'var(--crayon-red, #E63946)', fontFamily: 'Gaegu, cursive', fontSize: '1.2rem' }}>
                MAKE A DOODIE
              </Link>
              <Link href="/"
                className="px-6 py-3 rounded-lg font-bold transition-transform hover:scale-105"
                style={{
                  background: 'var(--paper-cream, #F5E6D3)',
                  border: '3px solid var(--ink-dark, #2B2D42)',
                  fontFamily: 'Gaegu, cursive',
                  color: 'var(--ink-dark, #2B2D42)',
                  fontSize: '1.2rem',
                }}>
                The Fridge
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
