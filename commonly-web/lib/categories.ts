import type { Product } from '@/lib/products'

export type Category = { slug: string; label: string; eyebrow: string; title: string; description: string; image: string; items: string[]; tone: string }

export const subcategoryImages: Record<string, string> = {
  // News
  'celebrity': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1400&q=85',
  'new-launches': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85',
  'treatment-fda-news': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=85',
  'industry-retail-news': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85',
  // Face
  'acne': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=85',
  'anti-aging': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=85',
  'eye-care': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1400&q=85',
  'hyperpigmentation': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1400&q=85',
  'makeup': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85',
  'sensitive-skin': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
  'skin-care': 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85',
  'skin-conditions': 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1400&q=85',
  'smile': 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=85',
  'sun-care': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
  // Treatments
  'neurotoxins': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85',
  'fillers': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=85',
  'lasers-energy-devices': 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1400&q=85',
  'microneedling': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=85',
  'post-procedure-skin-care': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=85',
  'regenerative-aesthetics': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=85',
  'skin-lifting-and-tightening': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1400&q=85',
  // Body
  'body-skin-care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
  'body-sculpting': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=85',
  'breasts': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85',
  'butts': 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1400&q=85',
  'cellulite': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=85',
  'fragrance': 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=1400&q=85',
  'hands-nails': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85',
  'legs': 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1400&q=85',
  'pregnancy': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1400&q=85',
  // Hair
  'bond-repair': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85',
  'celebrity-hair': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1400&q=85',
  'dry-hair': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=85',
  'frizzy-hair': 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=85',
  'gray-hair': 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1400&q=85',
  'hair-color': 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1400&q=85',
  'hair-growth': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85',
  'hair-repair': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=85',
  'scalp-health': 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=85',
  'tips-tutorials': 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1400&q=85',
  // Awards
  'best-in-class': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=85',
  'editor-favorites': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85',
  'reader-favorites': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85',
  'new-and-notable': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
  // Shopping
  'best-sellers': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1400&q=85',
  'under-25': 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=85',
  'gifts': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1400&q=85',
  'everyday-essentials': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
  // Creams
  'face-creams': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=85',
  'moisturizers': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
  'body-creams': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1400&q=85',
  'night-creams': 'https://images.unsplash.com/photo-1631390163780-e5e2c9e5e8e8?auto=format&fit=crop&w=1400&q=85',
  'hand-creams': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85',
  'natural-creams': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=85',
}

export function getSubcategoryImage(subcategorySlug: string, categoryImage: string): string {
  return subcategoryImages[subcategorySlug] ?? categoryImage
}

export const categories: Category[] = [
  { slug: 'news', label: 'News', eyebrow: 'The latest edit', title: 'What is worth knowing now.', description: 'New launches, cultural shifts, and considered finds from the worlds shaping how we live.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85', items: ['Celebrity', 'New launches', 'Treatment & FDA news', 'Industry & retail news'], tone: 'bg-secondary' },
  { slug: 'face', label: 'Face', eyebrow: 'The face edit', title: 'Care for the skin you are in.', description: 'Thoughtful routines and proven essentials for every complexion, concern, and daily ritual.', image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85', items: ['Acne', 'Anti-aging', 'Eye care', 'Hyperpigmentation', 'Makeup', 'Sensitive skin', 'Skin care', 'Skin conditions', 'Smile', 'Sun care'], tone: 'bg-accent/10' },
  { slug: 'treatments', label: 'Treatments', eyebrow: 'The treatment edit', title: 'Research before the ritual.', description: 'A clearer way to understand treatments, devices, ingredients, and what comes next.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85', items: ['Neurotoxins', 'Fillers', 'Lasers & energy devices', 'Microneedling', 'Post-procedure skin care', 'Regenerative aesthetics', 'Skin lifting and tightening'], tone: 'bg-primary/10' },
  { slug: 'body', label: 'Body', eyebrow: 'The body edit', title: 'Good care, from head to toe.', description: 'The products and practices that make everyday body care feel more intentional.', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85', items: ['Skin care', 'Body sculpting', 'Breasts', 'Butts', 'Cellulite', 'Fragrance', 'Hands + nails', 'Legs', 'Pregnancy'], tone: 'bg-secondary' },
  { slug: 'hair', label: 'Hair', eyebrow: 'The hair edit', title: 'A better hair day starts here.', description: 'Useful guidance for healthier hair, calmer scalps, and routines that fit real life.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85', items: ['Bond repair', 'Celebrity hair', 'Dry hair', 'Frizzy hair', 'Gray hair', 'Hair color', 'Hair growth', 'Hair repair', 'Scalp health', 'Tips + tutorials'], tone: 'bg-accent/10' },
  { slug: 'awards', label: 'Awards', eyebrow: 'The Commonly awards', title: 'The things we would buy again.', description: 'Our highest-conviction picks, recognized for doing one thing exceptionally well.', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=85', items: ['Best in class', 'Editor favorites', 'Reader favorites', 'New and notable'], tone: 'bg-primary/10' },
  { slug: 'shopping', label: 'Shopping', eyebrow: 'The shopping edit', title: 'Buy less. Choose better.', description: 'A focused collection of products selected for usefulness, longevity, and quiet delight.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85', items: ['Best sellers', 'Under $25', 'Gifts', 'Everyday essentials'], tone: 'bg-secondary' },
  { slug: 'creams', label: 'Creams', eyebrow: 'The cream edit', title: 'The right cream changes everything.', description: 'From rich body butters to featherlight face creams, discover textures made for every ritual and skin need.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=85', items: ['Face creams', 'Moisturizers', 'Body creams', 'Night creams', 'Hand creams', 'Natural creams'], tone: 'bg-accent/10' },
]

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug) }
export function getCategoryProducts(category: Category, products: Product[]) { return products.filter((product) => product.category.toLowerCase() === category.label.toLowerCase()).slice(0, 6) }
