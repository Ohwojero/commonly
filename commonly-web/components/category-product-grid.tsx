import Link from 'next/link'
import { ArrowUpRight, Eye, Heart, Star } from 'lucide-react'
import type { Product } from '@/lib/products'

export function CategoryProductGrid({ products, title = 'Shop the edit' }: { products: Product[]; title?: string }) {
  return (
    <section className="mt-12 border-t pt-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Curated products</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">{title}</h2>
        </div>
        <span className="text-sm text-muted-foreground">{products.length} picks</span>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`} className="group block">
            <div className="overflow-hidden rounded-xl bg-secondary">
              <img src={product.image} alt={product.name} className="aspect-square size-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex items-start justify-between gap-3 pt-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{product.brand}</p>
                <h3 className="mt-1 font-medium group-hover:text-accent">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.price}</p>
              </div>
              <ArrowUpRight className="mt-1 size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><Star className="size-3 fill-current text-accent" /> {product.rating} · {product.reviews.toLocaleString()} reviews</div>
          <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
            <button type="button" aria-label={`Save ${product.name}`} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-rose-500">
              <Heart className="size-4" /> Save
            </button>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Eye className="size-3.5" aria-hidden="true" />{product.views} views</span>
          </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
