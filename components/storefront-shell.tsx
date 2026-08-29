'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, Heart, Search, Sparkles, X } from 'lucide-react'
import { categories, products, type Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SiteHeader } from '@/components/site-header'

function ProductCard({ product, onPreview }: { product: Product; onPreview: (product: Product) => void }) {
  return (
    <Card className="group overflow-hidden border border-border/70 bg-card p-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link href={`/products/${product.slug}`} className="block size-full">
        <img src={product.image} alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 opacity-0 transition group-hover:opacity-100">
          <Badge variant="secondary" className="bg-background/90 text-xs">{product.tags[0]}</Badge>
          <button aria-label={`Save ${product.name}`} className="grid size-9 place-items-center rounded-full bg-background/90 text-foreground"><Heart className="size-4" /></button>
        </div>
        </Link>
        <button onClick={() => onPreview(product)} className="absolute inset-x-4 bottom-4 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground opacity-0 transition group-hover:opacity-100 hover:bg-primary/90">Quick view</button>
      </div>
      <CardContent className="flex min-w-0 items-start justify-between gap-4 px-4 pb-4 pt-4">
        <div className="min-w-0 flex-1"><p className="truncate text-xs uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</p><h3 className="mt-1 line-clamp-2 text-pretty font-serif text-xl leading-tight">{product.name}</h3><p className="mt-2 text-sm text-muted-foreground truncate">{product.category}</p></div>
        <p className="shrink-0 whitespace-nowrap font-medium">{product.price}</p>
      </CardContent>
      <div className="flex items-center justify-between border-t border-border/60 px-4 py-3">
        <button type="button" aria-label={`Save ${product.name}`} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-rose-500"><Heart className="size-4" /> Save</button>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground" title={`${product.views} people viewed this product`}><Eye className="size-3.5" aria-hidden="true" />{product.views} views</span>
      </div>
    </Card>
  )
}

export function StorefrontShell() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [preview, setPreview] = useState<Product | null>(null)
  // CSS-based marquee animation will handle infinite smooth scrolling.
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {searchOpen && <div className="border-b bg-card px-5 py-4"><div className="mx-auto flex max-w-7xl items-center gap-3"><Search className="size-4 text-muted-foreground" /><Input autoFocus placeholder="Search considered things..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" /><Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></Button></div></div>}
      <main className="pt-28">
        <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8 lg:pb-24"><div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-muted shadow-sm sm:min-h-[540px] lg:min-h-[620px]"><video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85" aria-label="Luxurious cream texture being applied"><source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4" type="video/mp4" /><source src="https://videos.pexels.com/video-files/4812195/4812195-hd_1920_1080_25fps.mp4" type="video/mp4" />Your browser does not support the video tag.</video><div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" /><div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16"><p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70"><Sparkles className="size-4" /> The good stuff</p><h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.98] tracking-tight text-pretty text-white sm:text-6xl lg:text-7xl">Less browsing. <em className="text-rose-300">Better</em> things.</h1><p className="mt-6 max-w-md text-base leading-7 text-white/75">A considered collection of useful, beautiful products — chosen by people who care about the details.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#shop" className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-sm font-medium text-black transition-all hover:bg-white/90">Explore the collection <ArrowRight data-icon="inline-end" /></Link><Link href="#guides" className="inline-flex h-10 items-center justify-center rounded-lg border border-white/40 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/20">Read our guides</Link></div></div></div></section>
        <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Start here</p>
              <h2 className="mt-2 font-serif text-4xl">Shop by feeling</h2>
            </div>
            <Link href="#shop" className="hidden text-sm underline underline-offset-4 sm:block">View all picks</Link>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="marquee flex gap-4 pb-4"
              aria-label="Shop by feeling carousel"
            >
              {[...categories, ...categories].map((category, idx) => (
                <Link href="#shop" key={`${category.name}-${idx}`} className="group relative min-w-[260px] flex-shrink-0 overflow-hidden rounded-lg">
                  <img src={category.image} alt={category.name} className="w-full h-44 object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-primary-foreground">
                    <h3 className="font-serif text-lg">{category.name}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/75">{category.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section id="shop" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The edit</p><h2 className="mt-2 font-serif text-4xl">Currently considered</h2></div><p className="hidden text-sm text-muted-foreground sm:block">{products.length} thoughtful picks</p></div><div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} onPreview={setPreview} />)}</div></section>
        <section id="guides" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-8 bg-secondary p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The common room</p><h2 className="mt-3 max-w-md font-serif text-4xl leading-tight">Good choices are easier with a little context.</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">Practical guides, honest comparisons, and the details that help you buy once and buy well.</p><Button variant="link" className="mt-4 px-0">Read the latest guide <ArrowRight data-icon="inline-end" /></Button></div><div className="grid gap-3 sm:grid-cols-2"><div className="bg-background p-5"><p className="text-xs text-muted-foreground">Field note 014</p><h3 className="mt-12 font-serif text-2xl">How to make a room feel finished</h3><ArrowRight className="mt-8 size-5" /></div><div className="bg-primary p-5 text-primary-foreground"><p className="text-xs text-primary-foreground/60">Buying guide</p><h3 className="mt-12 font-serif text-2xl">The everyday carry edit</h3><ArrowRight className="mt-8 size-5" /></div></div></div></section>
      </main>
      <footer className="mt-12 border-t border-primary/30 px-5 py-14 lg:px-8" style={{ backgroundColor: 'var(--primary)', position: 'relative', zIndex: 70 }}>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-serif text-3xl text-primary-foreground">Commonly.</Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/80">Useful things, thoughtfully found. We make the everyday feel a little more considered.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80"><Link href="#shop">Shop all</Link><Link href="#categories">Categories</Link><Link href="#guides">Guides</Link></div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90">Company</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80"><Link href="/about">About us</Link><Link href="/how-it-works">How it works</Link><Link href="/contact">Contact</Link></div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90">Community</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80"><Link href="/auth/register">Join the community</Link><Link href="/contact">Suggest a product</Link></div>
          </div>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-primary/20 pt-5 text-xs text-primary-foreground/80 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Commonly. All rights reserved.</span><span>We may earn a commission from qualifying links.</span></div>
      </footer>
      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle className="font-serif text-2xl">{preview?.name}</DialogTitle></DialogHeader>{preview && <div className="grid gap-6 sm:grid-cols-2"><img src={preview.image} alt={preview.name} className="aspect-square w-full object-cover" /><div className="flex flex-col justify-center"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{preview.brand}</p><p className="mt-3 text-2xl font-medium">{preview.price}</p><p className="mt-4 leading-7 text-muted-foreground">{preview.description}</p><Link href={`/products/${preview.slug}`} className="mt-8 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">See full details <ArrowRight data-icon="inline-end" /></Link></div></div>}</DialogContent></Dialog>
    </div>
  )
}

