import { notFound } from 'next/navigation'
import { getProduct, products } from '@/lib/products'
import { ProductGallery } from '@/components/product-gallery'
import { SiteChrome } from '@/components/site-header'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <SiteChrome>
      <main className="min-h-screen bg-background">
        <ProductGallery product={product} />
      </main>
    </SiteChrome>
  )
}
