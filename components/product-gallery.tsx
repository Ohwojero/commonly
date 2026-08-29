'use client'

import { useState } from 'react'
import { ChevronDown, Flag, Heart, Share2, Star, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'
import { RelatedProducts } from '@/components/related-products'
import { RegisterGate } from '@/components/register-gate'
import type { Product } from '@/lib/products'

const galleryImages = (product: Product) => [
  product.image,
  product.image.replace('w=1000', 'w=800') + '&sat=-20',
  product.image.replace('w=1000', 'w=800') + '&blur=0',
  product.image.replace('w=1000', 'w=800') + '&q=75',
]

export function ProductGallery({ product }: { product: Product }) {
  const router = useRouter()
  const images = galleryImages(product)
  const [activeImage, setActiveImage] = useState(0)
  const [openSection, setOpenSection] = useState<string | null>('highlights')
  const [zoomPoint, setZoomPoint] = useState({ x: 50, y: 50 })
  const [isZooming, setIsZooming] = useState(false)

  const toRows = (items: string[] | undefined, fallback: string[]) => (items?.length ? items : fallback).map((item) => {
    const [label, ...value] = item.split(':')
    return { label: value.length ? label.trim() : 'Details', value: (value.length ? value.join(':') : item).trim() }
  })
  const sections = [
    { id: 'highlights', title: 'Top highlights', rows: toRows(product.highlights, [product.description]) },
    { id: 'details', title: 'Item details', rows: toRows(product.itemDetails, [`Brand: ${product.brand}`, `Category: ${product.category}`, `Tags: ${product.tags.join(', ')}`]) },
    { id: 'specs', title: 'Features & Specs', rows: toRows(product.specs, ['Materials: Thoughtful, considered materials', 'Use: Made for everyday use']) },
  ]

  return (
    <div className="bg-background">
      <div className="h-[112px]" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground md:hidden">
          <ArrowLeft className="size-5" /> Back
        </button>
      </div>
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 pb-6 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)] lg:gap-10 lg:px-8 lg:pb-10 lg:pt-10">
        <section className="grid min-w-0 grid-cols-[56px_minmax(0,1fr)] gap-4 lg:grid-cols-[64px_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`View product image ${index + 1}`}
                onClick={() => setActiveImage(index)}
                className={`aspect-square overflow-hidden rounded-xl border bg-muted transition ${activeImage === index ? 'border-ring ring-2 ring-ring/20' : 'border-border hover:border-foreground/40'}`}
              >
                <img src={image} alt="" className="size-full object-cover" />
              </button>
            ))}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-primary">
              <img src={images[0]} alt="" className="size-full object-cover opacity-55 grayscale" />
              <span className="absolute inset-0 grid place-items-center text-sm font-medium text-primary-foreground">3+</span>
            </div>
          </div>
          <div
            className="group relative flex min-h-[280px] cursor-crosshair items-center justify-center overflow-hidden rounded-sm bg-muted sm:min-h-[400px] lg:min-h-[450px]"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              setZoomPoint({
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
              })
            }}
          >
            <img src={images[activeImage]} alt={product.name} className="size-full object-cover transition-transform duration-150" />
            {isZooming && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40 shadow-2xl sm:size-56"
                style={{
                  left: `${zoomPoint.x}%`,
                  top: `${zoomPoint.y}%`,
                  backgroundImage: `url(${images[activeImage]})`,
                  backgroundPosition: `${zoomPoint.x}% ${zoomPoint.y}%`,
                  backgroundSize: '250%',
                }}
              />
            )}
            <div className="absolute bottom-5 left-5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">Move over image to zoom</div>
            <div className="absolute right-5 top-5 flex gap-2">
              <Button variant="secondary" size="icon" aria-label="Share product"><Share2 /></Button>
              <Button variant="secondary" size="icon" aria-label="Save product"><Heart /></Button>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:pt-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Visit the {product.brand} Store</p>
              <h1 className="mt-3 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{product.name}</h1>
            </div>
            <Button variant="ghost" size="icon" aria-label="Share product"><Share2 /></Button>
          </div>
          <div className="mt-5 flex items-center gap-3 border-b border-border pb-5">
            <span className="text-2xl font-medium">{product.price}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Star className="size-4 fill-accent text-accent" /> {product.rating} ({product.reviews})</span>
          </div>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {sections.map((section) => {
              const isOpen = openSection === section.id
              return (
                <button key={section.id} type="button" onClick={() => setOpenSection(isOpen ? null : section.id)} className="block w-full text-left">
                  <div className="flex items-center justify-between gap-4 py-5 text-base font-extrabold tracking-tight"><span>{section.title}</span><ChevronDown className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} /></div>
                  {isOpen && <div className="-mt-1 divide-y divide-border/80 border-t border-border/70 pb-2 pr-2 text-sm"><div className="sr-only">{section.title} details</div>{section.rows.map((row, index) => <div key={`${row.label}-${index}`} className="grid grid-cols-[minmax(135px,.8fr)_minmax(0,1.5fr)] gap-4 border-border/80 py-3 leading-5 sm:grid-cols-[minmax(180px,.8fr)_minmax(0,1.5fr)]"><span className="font-extrabold tracking-tight text-foreground">{row.label}</span><span className="text-muted-foreground">{row.value}</span></div>)}</div>}
                </button>
              )
            })}
          </div>
          <RegisterGate productSlug={product.slug} affiliateUrl={product.affiliateUrl} />
          <Button variant="outline" className="mt-4 w-fit rounded-full">See all product specifications</Button>
          <button type="button" className="mt-6 flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Flag className="size-4" /> Report an issue with this product or seller</button>
          <Badge variant="secondary" className="mt-8 w-fit">{product.tags[0]}</Badge>
        </section>
      </div>
      <RelatedProducts products={products.filter((item) => item.slug !== product.slug).slice(0, 4)} />
    </div>
  )
}
