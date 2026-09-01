'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

type MenuGroup = { label: string; items: string[] }
const groups: MenuGroup[] = [
  { label: 'News', items: ['Celebrity', 'New launches', 'Treatment & FDA news', 'Industry & retail news'] },
  { label: 'Face', items: ['Acne', 'Anti-aging', 'Eye care', 'Hyperpigmentation', 'Makeup', 'Sensitive skin', 'Skin care', 'Skin conditions', 'Smile', 'Sun care'] },
  { label: 'Treatments', items: ['Neurotoxins', 'Fillers', 'Lasers & energy devices', 'Microneedling', 'Post-procedure skin care', 'Regenerative aesthetics', 'Skin lifting and tightening'] },
  { label: 'Body', items: ['Skin care', 'Body sculpting', 'Breasts', 'Butts', 'Cellulite', 'Fragrance', 'Hands + nails', 'Legs', 'Pregnancy'] },
  { label: 'Hair', items: ['Bond repair', 'Celebrity hair', 'Dry hair', 'Frizzy hair', 'Gray hair', 'Hair color', 'Hair growth', 'Hair repair', 'Scalp health', 'Tips + tutorials'] },
  { label: 'Awards', items: ['Best in class', 'Editor favorites', 'Reader favorites', 'New and notable'] },
  { label: 'Shopping', items: ['Best sellers', 'Under $25', 'Gifts', 'Everyday essentials'] },
  { label: 'Creams', items: ['Face creams', 'Moisturizers', 'Body creams', 'Night creams', 'Hand creams', 'Natural creams'] },
]

const toSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function DropdownGroup({ group, onNavigate }: { group: MenuGroup; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  return <div className="group relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}><button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-1 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-auto md:px-2 md:py-3"><span>{group.label}</span><ChevronDown className={`size-3 transition-transform md:hidden ${open ? 'rotate-180' : ''}`} /></button><div className={`${open ? 'block' : 'hidden'} relative mt-1 border-border bg-background md:absolute md:left-1/2 md:top-full md:z-50 md:mt-0 md:w-72 md:-translate-x-1/2 md:border md:shadow-xl`}><div className="max-h-80 overflow-y-auto p-4">{group.items.map((item) => <Link key={item} href={`/category/${toSlug(group.label)}/${toSlug(item)}`} onClick={onNavigate} className="block px-3 py-2.5 text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{item}</Link>)}</div></div></div>
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="fixed inset-x-0 top-0 z-[60] bg-primary px-4 py-2 text-center text-xs tracking-wide text-primary-foreground">Curated with care. Always independent.</div>
    <header className="fixed inset-x-0 top-8 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <button className="md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <Link href="/" className="font-serif text-2xl tracking-tight">Commonly.</Link>
        <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 top-full z-20 w-full flex-col gap-1 border-b border-border/80 bg-background p-3 shadow-lg md:static md:flex md:w-auto md:flex-1 md:flex-row md:justify-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Main navigation">{groups.map((group) => <DropdownGroup key={group.label} group={group} onNavigate={() => setOpen(false)} />)}</nav>
        <div className="size-8 md:hidden" />
      </div>
    </header>
  </>
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary px-5 py-14 text-primary-foreground lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-serif text-3xl">Commonly.</Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/70">Useful things, thoughtfully found. We make the everyday feel a little more considered.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Categories</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80">
            {['News','Face','Treatments','Body','Hair','Awards','Shopping','Creams'].map((cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="hover:text-primary-foreground">{cat}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80">
            <Link href="/#shop" className="hover:text-primary-foreground">Shop all</Link>
            <Link href="/#categories" className="hover:text-primary-foreground">Categories</Link>
            <Link href="/#guides" className="hover:text-primary-foreground">Guides</Link>
            <Link href="/auth/register" className="hover:text-primary-foreground">Join the community</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80">
            <Link href="/about" className="hover:text-primary-foreground">About us</Link>
            <Link href="/how-it-works" className="hover:text-primary-foreground">How it works</Link>
            <Link href="/contact" className="hover:text-primary-foreground">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Top picks</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80">
            <Link href="/category/shopping/best-sellers" className="hover:text-primary-foreground">Best sellers</Link>
            <Link href="/category/shopping/gifts" className="hover:text-primary-foreground">Gifts</Link>
            <Link href="/category/shopping/everyday-essentials" className="hover:text-primary-foreground">Everyday essentials</Link>
            <Link href="/category/awards/editor-favorites" className="hover:text-primary-foreground">Editor favorites</Link>
            <Link href="/category/creams/face-creams" className="hover:text-primary-foreground">Face creams</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-primary-foreground/20 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Commonly. All rights reserved.</span>
        <span>We may earn a commission from qualifying links.</span>
      </div>
    </footer>
  )
}

export function SiteChrome({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-background"><SiteHeader />{children}<SiteFooter /></div> }
export default SiteHeader
