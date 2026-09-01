'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, ImageIcon, LayoutDashboard, Package, Plus, Save, Settings, Trash2, Upload, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { products as seedProducts, type Product } from '@/lib/products'
import { categories as seedCategories, type Category, subcategoryImages as seedSubcategoryImages } from '@/lib/categories'
import { ActivityLog } from '@/components/activity-log'

const emptyProduct = { name: '', brand: '', category: 'Face', subcategory: '', price: '', image: '', affiliateUrl: '', description: '', highlights: '', itemDetails: '', specs: '', tags: '', rating: '5.0', reviews: '0', views: '0' }
type ProductForm = typeof emptyProduct
type View = 'overview' | 'catalog' | 'categories' | 'subcategory-images' | 'settings'

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const split = (value: string) => value.split(',').map((part) => part.trim()).filter(Boolean)

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function ImagePicker({ value, onChange, label = 'Image' }: { value: string; onChange: (val: string) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    onChange(base64)
  }
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div
        onClick={() => ref.current?.click()}
        className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/40 transition hover:border-primary hover:bg-muted"
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
              <p className="text-sm font-medium text-white">Click to change</p>
            </div>
          </>
        ) : (
          <>
            <Upload className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload from device</p>
            <p className="text-xs text-muted-foreground">or paste a URL below</p>
          </>
        )}
      </div>
      <Input
        value={value.startsWith('data:') ? '' : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL..."
        className="text-xs"
      />
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

export default function DashboardPage() {
  const [items, setItems] = useState<Product[]>(seedProducts)
  const [groups, setGroups] = useState<Category[]>(seedCategories)
  const [subImages, setSubImages] = useState<Record<string, string>>(seedSubcategoryImages)
  const [subImageForm, setSubImageForm] = useState({ slug: '', url: '' })
  const [form, setForm] = useState<ProductForm>(emptyProduct)
  const [categoryForm, setCategoryForm] = useState({ label: '', items: '', image: '' })
  const [editing, setEditing] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [view, setView] = useState<View>('overview')
  const [query, setQuery] = useState('')
  const [showProductForm, setShowProductForm] = useState(false)

  useEffect(() => {
    const savedProducts = localStorage.getItem('commonly-products')
    const savedCategories = localStorage.getItem('commonly-categories')
    const savedSubImages = localStorage.getItem('commonly-subcategory-images')
    if (savedProducts) setItems(JSON.parse(savedProducts))
    if (savedCategories) setGroups(JSON.parse(savedCategories))
    if (savedSubImages) setSubImages(JSON.parse(savedSubImages))
  }, [])
  useEffect(() => { localStorage.setItem('commonly-products', JSON.stringify(items)) }, [items])
  useEffect(() => { localStorage.setItem('commonly-categories', JSON.stringify(groups)) }, [groups])
  useEffect(() => { localStorage.setItem('commonly-subcategory-images', JSON.stringify(subImages)) }, [subImages])

  const filtered = useMemo(() => items.filter((item) => `${item.name} ${item.brand} ${item.category} ${item.subcategory || ''}`.toLowerCase().includes(query.toLowerCase())), [items, query])
  const update = (key: keyof ProductForm, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const openEdit = (item: Product) => {
    setEditing(item.slug)
    setForm({ ...emptyProduct, ...item, subcategory: item.subcategory || '', highlights: item.highlights?.join(', ') || '', itemDetails: item.itemDetails?.join(', ') || '', specs: item.specs?.join(', ') || '', tags: item.tags.join(', '), reviews: String(item.reviews), views: String(item.views) })
    setShowProductForm(true)
    setView('catalog')
  }
  const submitProduct = (event: FormEvent) => {
    event.preventDefault()
    const slug = editing || slugify(form.name) || `product-${Date.now()}`
    const product: Product = { slug, name: form.name, brand: form.brand, category: form.category, subcategory: form.subcategory, price: form.price, image: form.image || seedProducts[0].image, affiliateUrl: form.affiliateUrl, description: form.description, highlights: split(form.highlights), itemDetails: split(form.itemDetails), specs: split(form.specs), tags: split(form.tags), rating: form.rating, reviews: Number(form.reviews) || 0, views: Number(form.views) || 0 }
    setItems((current) => editing ? current.map((item) => item.slug === editing ? product : item) : [product, ...current])
    setForm(emptyProduct)
    setEditing(null)
    setShowProductForm(false)
  }
  const removeProduct = (slug: string) => { if (confirm('Delete this product?')) setItems((current) => current.filter((item) => item.slug !== slug)) }
  const saveCategory = (event: FormEvent) => {
    event.preventDefault()
    if (!categoryForm.label.trim()) return
    const slug = slugify(categoryForm.label)
    const next: Category = { slug, label: categoryForm.label.trim(), eyebrow: `The ${categoryForm.label.toLowerCase()} edit`, title: `Explore ${categoryForm.label.toLowerCase()} more intentionally.`, description: `A considered collection of ${categoryForm.label.toLowerCase()} picks, guidance, and useful details.`, image: categoryForm.image || seedCategories[0].image, items: split(categoryForm.items), tone: 'bg-secondary' }
    setGroups((current) => editingCategory ? current.map((item) => item.slug === editingCategory ? { ...item, ...next, slug: editingCategory } : item) : [...current, next])
    setCategoryForm({ label: '', items: '', image: '' })
    setEditingCategory(null)
  }
  const removeCategory = (slug: string) => { if (confirm('Remove this dropdown category?')) setGroups((current) => current.filter((item) => item.slug !== slug)) }
  const saveSubImage = (event: FormEvent) => {
    event.preventDefault()
    if (!subImageForm.slug || !subImageForm.url) return
    setSubImages((prev) => ({ ...prev, [subImageForm.slug]: subImageForm.url }))
    setSubImageForm({ slug: '', url: '' })
  }
  const removeSubImage = (slug: string) => setSubImages((prev) => { const next = { ...prev }; delete next[slug]; return next })

  const nav = [
    { id: 'overview' as View, label: 'Overview', icon: LayoutDashboard },
    { id: 'catalog' as View, label: 'Product catalog', icon: Package },
    { id: 'categories' as View, label: 'Dropdown categories', icon: Settings },
    { id: 'subcategory-images' as View, label: 'Subcategory images', icon: ImageIcon },
    { id: 'settings' as View, label: 'Settings', icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-secondary/50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-20 items-center border-b border-border px-6">
          <Link href="/" className="font-serif text-2xl">Commonly.</Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => setView(id)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${view === id ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
              <Icon className="size-4" />{label}
            </button>
          ))}
          <Link href="/" className="mt-auto flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" />Back to storefront</Link>
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="border-b bg-background px-5 py-5 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Admin workspace</p>
              <h1 className="mt-1 font-serif text-2xl">{nav.find((item) => item.id === view)?.label}</h1>
            </div>
            <Badge variant="secondary">Catalog editor</Badge>
          </div>
        </header>

        <section className="p-5 lg:p-8">

          {/* OVERVIEW */}
          {view === 'overview' && (
            <>
              <div className="grid gap-5 sm:grid-cols-3">
                <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Products</p><p className="mt-2 text-3xl font-medium">{items.length}</p></CardContent></Card>
                <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Dropdown categories</p><p className="mt-2 text-3xl font-medium">{groups.length}</p></CardContent></Card>
                <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Subcategory images</p><p className="mt-2 text-3xl font-medium">{Object.keys(subImages).length}</p></CardContent></Card>
              </div>
              <ActivityLog />
            </>
          )}

          {/* CATALOG */}
          {view === 'catalog' && (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Products</CardTitle>
                <Button onClick={() => { setEditing(null); setForm(emptyProduct); setShowProductForm(true) }}><Plus className="size-4" />Add product</Button>
              </CardHeader>
              <CardContent>
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, categories, subcategories" className="mb-5" />
                <div className="space-y-3">
                  {filtered.map((item) => (
                    <div key={item.slug} className="flex items-center gap-4 rounded-xl border p-3">
                      <img src={item.image} alt="" className="size-16 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}{item.subcategory ? ` / ${item.subcategory}` : ''} · {item.price}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => openEdit(item)}>Edit</Button>
                      <Button variant="ghost" size="icon" onClick={() => removeProduct(item.slug)} aria-label={`Delete ${item.name}`}><Trash2 className="size-4" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CATEGORIES */}
          {view === 'categories' && (
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <Card>
                <CardHeader><CardTitle>{editingCategory ? 'Edit category' : 'Add category'}</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={saveCategory} className="space-y-4">
                    <Input value={categoryForm.label} onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })} placeholder="Category name, e.g. Creams" required />
                    <Input value={categoryForm.items} onChange={(e) => setCategoryForm({ ...categoryForm, items: e.target.value })} placeholder="Subcategories, comma separated" />
                    <ImagePicker value={categoryForm.image} onChange={(val) => setCategoryForm({ ...categoryForm, image: val })} label="Category hero image" />
                    <div className="flex gap-2">
                      <Button type="submit"><Save className="size-4" />{editingCategory ? 'Save changes' : 'Add category'}</Button>
                      {editingCategory && <Button type="button" variant="ghost" onClick={() => { setEditingCategory(null); setCategoryForm({ label: '', items: '', image: '' }) }}>Cancel</Button>}
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Navigation categories</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {groups.map((group) => (
                    <div key={group.slug} className="overflow-hidden rounded-xl border">
                      {group.image && <img src={group.image} alt={group.label} className="aspect-[3/1] w-full object-cover" />}
                      <div className="flex items-center justify-between gap-3 p-4">
                        <div>
                          <p className="font-medium">{group.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{group.items.join(' · ') || 'No subcategories yet'}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => { setEditingCategory(group.slug); setCategoryForm({ label: group.label, items: group.items.join(', '), image: group.image }) }}>Edit</Button>
                          <Button variant="ghost" size="icon" onClick={() => removeCategory(group.slug)} aria-label={`Delete ${group.label}`}><Trash2 className="size-4" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* SUBCATEGORY IMAGES */}
          {view === 'subcategory-images' && (
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>{subImageForm.slug ? `Editing: ${subImageForm.slug}` : 'Add / update subcategory hero image'}</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={saveSubImage} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Subcategory slug</label>
                      <Input value={subImageForm.slug} onChange={(e) => setSubImageForm({ ...subImageForm, slug: e.target.value })} placeholder="e.g. acne, face-creams, best-sellers" required />
                      <p className="text-xs text-muted-foreground">Use the slug exactly as it appears in the URL (e.g. /category/face/<strong>acne</strong>)</p>
                    </div>
                    <ImagePicker value={subImageForm.url} onChange={(val) => setSubImageForm({ ...subImageForm, url: val })} label="Hero image" />
                    <div className="flex gap-2">
                      <Button type="submit"><Save className="size-4" /> Save image</Button>
                      {subImageForm.slug && <Button type="button" variant="ghost" onClick={() => setSubImageForm({ slug: '', url: '' })}>Cancel</Button>}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>All subcategory images ({Object.keys(subImages).length})</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(subImages).map(([slug, url]) => (
                      <div key={slug} className="overflow-hidden rounded-xl border">
                        <img src={url} alt={slug} className="aspect-video w-full object-cover" />
                        <div className="flex items-center justify-between gap-2 p-3">
                          <p className="truncate text-sm font-medium">{slug}</p>
                          <div className="flex shrink-0 gap-1">
                            <Button variant="outline" size="sm" onClick={() => setSubImageForm({ slug, url })}>Edit</Button>
                            <Button variant="ghost" size="icon" onClick={() => removeSubImage(slug)} aria-label={`Delete ${slug}`}><Trash2 className="size-4" /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SETTINGS */}
          {view === 'settings' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl">Storefront publishing</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Products, categories, and subcategory images are saved in this browser and are available to the public catalog immediately after saving.</p>
              </CardContent>
            </Card>
          )}

        </section>
      </div>

      {/* PRODUCT FORM MODAL */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 p-4">
          <Card className="max-h-[90vh] w-full max-w-3xl overflow-auto">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{editing ? 'Edit product' : 'Add product'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowProductForm(false)} aria-label="Close"><X className="size-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitProduct} className="grid gap-4 sm:grid-cols-2">
                {(['name', 'brand', 'price', 'affiliateUrl', 'subcategory', 'rating', 'reviews', 'views'] as const).map((key) => (
                  <Input key={key} value={form[key]} onChange={(e) => update(key, e.target.value)} placeholder={key === 'affiliateUrl' ? 'Amazon affiliate URL' : key} required={['name', 'brand', 'price'].includes(key)} />
                ))}
                <select value={form.category} onChange={(e) => update('category', e.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm">
                  {groups.map((group) => <option key={group.slug}>{group.label}</option>)}
                </select>
                <div className="sm:col-span-2">
                  <ImagePicker value={form.image} onChange={(val) => update('image', val)} label="Product image" />
                </div>
                <textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Description" className="min-h-24 rounded-md border bg-background p-3 text-sm sm:col-span-2" />
                {(['highlights', 'itemDetails', 'specs', 'tags'] as const).map((key) => (
                  <textarea key={key} value={form[key]} onChange={(e) => update(key, e.target.value)} placeholder={`${key} — comma separated; use Label: Value`} className="min-h-24 rounded-md border bg-background p-3 text-sm" />
                ))}
                <Button type="submit" className="sm:col-span-2"><Save className="size-4" />Save product</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
