import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteChrome } from '@/components/site-header'
import { CategoryProductGrid } from '@/components/category-product-grid'
import { categories, getCategory, getCategoryProducts, getSubcategoryImage } from '@/lib/categories'
import { products } from '@/lib/products'

export function generateStaticParams() { return categories.flatMap((category) => category.items.map((item) => ({ slug: category.slug, subcategory: item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))) }

export default async function SubcategoryPage({ params }: { params: Promise<{ slug: string; subcategory: string }> }) {
  const { slug, subcategory } = await params
  const category = getCategory(slug)
  const item = category?.items.find((entry) => entry.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === subcategory)
  if (!category || !item) notFound()
  const categoryProducts = getCategoryProducts(category, products)
  const heroImage = getSubcategoryImage(subcategory, category.image)
  return <SiteChrome><main className="min-h-screen bg-background pt-28"><section className="relative min-h-[420px] overflow-hidden sm:min-h-[480px]"><img src={heroImage} alt={item} className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /><div className="relative mx-auto max-w-5xl px-5 py-20 text-center lg:py-28"><Link href={`/category/${category.slug}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><ArrowLeft className="size-4" /> Back to {category.label}</Link><p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">{category.label} / {item}</p><h1 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-white sm:text-6xl">The {item.toLowerCase()} edit.</h1><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75">Explore products selected for {item.toLowerCase()}, with clear details to help you choose what belongs in your routine.</p></div></section><section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><CategoryProductGrid products={categoryProducts.length ? categoryProducts : products.slice(0, 3)} title={`Shop ${item}`} /></section></main></SiteChrome>
}
