'use client'

import { useState, type FormEvent } from 'react'
import { supabase } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function RegisterGate({ productSlug, affiliateUrl }: { productSlug: string; affiliateUrl?: string }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '' })
  const [message, setMessage] = useState('')
  const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? (typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '/auth/callback')

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setMessage('')
    const result = mode === 'register'
      ? await supabase!.auth.signUp({ email: form.email, password: form.password, options: { emailRedirectTo: redirectUrl, data: { name: form.name, location: form.location } } })
      : await supabase!.auth.signInWithPassword({ email: form.email, password: form.password })
    if (result.error) { setMessage('We could not complete that request. Please check your details and try again.'); return }
    await fetch('/api/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventType: mode, eventName: mode === 'register' ? 'New registration' : 'Email login', email: form.email, location: form.location, productSlug }) })
    window.open(affiliateUrl || 'https://www.amazon.com/', '_blank', 'noopener,noreferrer'); setOpen(false)
  }

  const google = async () => {
    const { error } = await supabase!.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectUrl } })
    if (error) setMessage('Google sign-in is unavailable right now. Please try email instead.')
  }

  return <><Button type="button" onClick={() => setOpen(true)} className="mt-6 inline-flex rounded-full">Shop this pick</Button>{open && <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/40 p-4" role="dialog" aria-modal="true" aria-labelledby="register-title"><div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">One quick step</p><h2 id="register-title" className="mt-2 font-serif text-3xl">Join before you shop</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Close registration">×</button></div><form onSubmit={submit} className="mt-6 grid gap-3">{mode === 'register' && <Input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}{mode === 'register' && <Input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />}<Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><Input required minLength={8} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{message && <p className="text-sm text-destructive">{message}</p>}<Button type="submit">{mode === 'register' ? 'Register and continue' : 'Log in and continue'}</Button></form><div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div><Button type="button" variant="outline" className="w-full" onClick={google}>Continue with Google</Button><button type="button" className="mt-4 w-full text-sm text-muted-foreground underline" onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>{mode === 'register' ? 'Already registered? Log in' : 'Create an account'}</button></div></div>}</>
}
