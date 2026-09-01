'use client'

import Link from 'next/link'
import { Eye, ArrowRight, Heart } from 'lucide-react'
import type { Product } from '@/lib/products'

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4 border-t border-border pt-8">
        <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Keep exploring</p><h2 className="mt-2 font-serif text-3xl">You may also like</h2></div>
        <Link href="/#shop" className="hidden items-center gap-2 text-sm font-medium text-accent sm:flex">View all <ArrowRight className="size-4" /></Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((item) => (
          <div key={item.slug} className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-md">
            <Link href={`/products/${item.slug}`}>
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={item.image} alt={item.name} className="size-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="truncate text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{item.brand}</p>
                <h3 className="mt-1 line-clamp-2 font-serif text-base leading-tight">{item.name}</h3>
                <p className="mt-1.5 text-sm font-medium">{item.price}</p>
              </div>
            </Link>
            <div className="flex items-center justify-between border-t border-border/60 px-3 py-2.5">
              <button type="button" aria-label={`Save ${item.name}`} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-rose-500"><Heart className="size-4" /> Save</button>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Eye className="size-3" />{item.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
