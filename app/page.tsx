'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Home() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Submission failed')
      setState('success')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setState('error')
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (state === 'success') {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-full bg-[#1A1A2E] flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#1A1A2E] mb-2">
            You&apos;re on the list!
          </h2>
          <p className="text-[#1C1C1E]/60 font-[family-name:var(--font-body)]">
            Bob will be in touch shortly to book your visit.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        <div className="mb-8">
          <span className="inline-block text-[#C41E3A] text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-body)] mb-3">
            Book a Visit
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[48px] font-extrabold leading-tight text-[#1A1A2E]">
            Bob&apos;s Bald<br />Barber
          </h1>
          <p className="mt-4 text-[#1C1C1E]/60 font-[family-name:var(--font-body)] text-base leading-relaxed">
            Leave your details and Bob will reach out to confirm your appointment.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-[#1C1C1E] font-[family-name:var(--font-body)]">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1C1C1E] placeholder:text-[#1C1C1E]/40 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] font-[family-name:var(--font-body)] text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-[#1C1C1E] font-[family-name:var(--font-body)]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1C1C1E] placeholder:text-[#1C1C1E]/40 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] font-[family-name:var(--font-body)] text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-[#1C1C1E] font-[family-name:var(--font-body)]">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className="border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1C1C1E] placeholder:text-[#1C1C1E]/40 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] font-[family-name:var(--font-body)] text-sm"
              />
            </div>

            {state === 'error' && (
              <p className="text-[#C41E3A] text-sm font-[family-name:var(--font-body)]">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="mt-2 bg-[#1A1A2E] text-white rounded-lg py-3 px-6 font-semibold text-sm shadow-sm hover:bg-[#2a2a4e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-[family-name:var(--font-body)]"
            >
              {state === 'loading' ? 'Sending...' : 'Request a Visit'}
            </button>

          </form>
        </div>

      </div>
    </main>
  )
}
