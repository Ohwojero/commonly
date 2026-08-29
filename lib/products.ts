export type Product = { slug: string; name: string; brand: string; category: string; subcategory?: string; price: string; rating: string; reviews: number; image: string; description: string; tags: string[]; views: number; affiliateUrl?: string; highlights?: string[]; itemDetails?: string[]; specs?: string[] }

export const products: Product[] = [
  { slug: 'aero-press-clear', name: 'AeroPress Clear', brand: 'AeroPress', category: 'Kitchen', price: '$39.95', rating: '4.8', reviews: 1842, image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=85', description: 'A beautifully simple brewer for a remarkably smooth cup, wherever the day takes you.', tags: ['Editor pick', 'Best for travel'], views: 124, highlights: ['Skin Type: All', 'Product Benefits: Brightening', 'Use: Face', 'Scent: Unscented', 'Special Ingredients: Premium materials'], itemDetails: ['Brand Name: AeroPress', 'Number of Items: 1', 'Manufacturer: AeroPress', 'Model Number: Clear', 'Manufacturer Part Number: AP-CLEAR', 'Best Sellers Rank: #1 in Coffee Makers', 'ASIN: B09ABC1234', 'Customer Reviews: 4.8 out of 5 stars (1,842)'], specs: ['Material: Tritan plastic', 'Product Benefits: Smooth, low-acidity coffee', 'Target Use Body Part: N/A', 'Scent Name: N/A', 'Special Ingredients: BPA-free Tritan plastic', 'Item Form: Brewer', 'Skin Tone: N/A'] },
  { slug: 'field-notes-utility-tote', name: 'Utility Tote 002', brand: 'Field Notes', category: 'Everyday carry', price: '$68', rating: '4.7', reviews: 328, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85', description: 'A durable canvas carryall with room for the essentials and then some.', tags: ['Built to last'], views: 86 },
  { slug: 'arc-bottle', name: 'Arc Bottle', brand: 'MiiR', category: 'Outdoors', price: '$30', rating: '4.9', reviews: 974, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=85', description: 'Double-wall insulation in a quiet, considered silhouette.', tags: ['Daily essential'], views: 203 },
  { slug: 'linen-throw', name: 'Washed Linen Throw', brand: 'Haptic', category: 'Home', price: '$124', rating: '4.6', reviews: 89, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85', description: 'Soft, breathable linen that gets better with every season.', tags: ['New'], views: 47 },
  { slug: 'mono-speaker', name: 'Mono Speaker', brand: 'Kanto', category: 'Tech', price: '$149', rating: '4.8', reviews: 412, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=85', description: 'Small footprint, generous sound, no unnecessary noise.', tags: ['Under $150'], views: 168 },
  { slug: 'stoneware-set', name: 'Stoneware Set', brand: 'East Fork', category: 'Kitchen', price: '$168', rating: '4.9', reviews: 221, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85', description: 'Four everyday pieces made to be reached for often.', tags: ['Made in USA'], views: 72 },
]

export const getProduct = (slug: string) => products.find((product) => product.slug === slug)

export const categories = [
  { name: 'Home objects', count: '42 picks', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85' },
  { name: 'Everyday carry', count: '28 picks', image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=85' },
  { name: 'Outdoors', count: '36 picks', image: 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=85' },
]

export const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)

export default products

