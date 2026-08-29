import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { SiteChrome } from '@/components/site-header'
import { CategoryProductGrid } from '@/components/category-product-grid'
import { categories, getCategory, getCategoryProducts } from '@/lib/categories'
import { products } from '@/lib/products'

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })) }

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()
  const categoryProducts = getCategoryProducts(category, products)
  return <SiteChrome><main className="min-h-screen bg-background pt-20"><section className={`border-b ${category.tone}`}><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{category.eyebrow}</p><h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.03] tracking-tight sm:text-6xl">{category.title}</h1><p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">{category.description}</p><div className="mt-8 flex flex-wrap gap-2">{category.items.map((item) => <Link key={item} href={`/category/${category.slug}/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-background">{item}</Link>)}</div></div><div className="overflow-hidden rounded-2xl"><img src={category.image} alt={`${category.label} editorial feature`} className="aspect-[5/4] size-full object-cover" /></div></div></section><section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="flex items-end justify-between gap-6 border-b pb-5"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Curated for you</p><h2 className="mt-3 font-serif text-4xl tracking-tight">Explore the edit</h2></div><Link href="/" className="hidden items-center gap-2 text-sm font-medium sm:flex">View homepage <ArrowRight className="size-4" /></Link></div>{categoryProducts.length ? <CategoryProductGrid products={categoryProducts} /> : <p className="mt-8 text-muted-foreground">New picks are coming soon.</p>}</section></main></SiteChrome>
}
