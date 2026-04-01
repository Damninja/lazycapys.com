export type ProductVariant = {
  id: string;
  label: string;
  inStock: boolean;
};

export type ProductCategory = 'plushies' | 'apparel' | 'accessories';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  longDescription: string;
  emoji: string;
  bgFrom: string;
  bgTo: string;
  variants: ProductVariant[];
  variantType: 'size' | 'none';
  featured: boolean;
  badge?: 'Bestseller' | 'New' | 'Limited';
};

export const PRODUCTS: Product[] = [
  {
    id: 'classic-capy-plushie',
    slug: 'classic-capy-plushie',
    name: 'Classic Capy Plushie',
    category: 'plushies',
    price: 29.99,
    description: 'Our most-loved plushie. Ultra-soft, huggable, and blissfully chill.',
    longDescription:
      'Meet your new best friend. The Classic Capy is crafted from premium ultra-soft plush fabric that gets even softer with every hug. Weighted just right so it sits with that signature lazy capybara energy. Perfect for your desk, your bed, or your hot spring.',
    emoji: '🦫',
    bgFrom: '#F5E6D3',
    bgTo: '#E8D0B8',
    variants: [
      { id: 'small',  label: 'Small (8 in)',  inStock: true },
      { id: 'medium', label: 'Medium (12 in)', inStock: true },
      { id: 'large',  label: 'Large (16 in)',  inStock: true },
    ],
    variantType: 'size',
    featured: true,
    badge: 'Bestseller',
  },
  {
    id: 'hot-spring-capy',
    slug: 'hot-spring-capy',
    name: 'Hot Spring Capy',
    category: 'plushies',
    price: 34.99,
    description: 'Includes a removable mini hot spring tub. The peak of relaxation.',
    longDescription:
      'Because capybaras belong in hot springs. This limited-edition plushie comes with a removable felt "hot spring" tub accessory so your capy can chill in ultimate comfort. A conversation piece and a cuddle buddy all in one.',
    emoji: '🛁',
    bgFrom: '#E0EEF5',
    bgTo: '#C8DFF0',
    variants: [
      { id: 'standard', label: 'Standard (10 in)', inStock: true },
      { id: 'xl',       label: 'XL (15 in)',       inStock: true },
    ],
    variantType: 'size',
    featured: true,
    badge: 'New',
  },
  {
    id: 'sleepy-capy-plushie',
    slug: 'sleepy-capy-plushie',
    name: 'Sleepy Capy Plushie',
    category: 'plushies',
    price: 27.99,
    description: 'Eyes closed, totally unbothered. A mood.',
    longDescription:
      'Inspired by that one capybara that refuses to open its eyes no matter what is happening around it. The Sleepy Capy is the same premium softness as our Classic, just with a little more "do not disturb" energy.',
    emoji: '😴',
    bgFrom: '#EDE0F5',
    bgTo: '#D8C8EC',
    variants: [
      { id: 'small',  label: 'Small (8 in)',   inStock: true },
      { id: 'medium', label: 'Medium (12 in)', inStock: false },
    ],
    variantType: 'size',
    featured: false,
  },
  {
    id: 'lazy-capy-hoodie',
    slug: 'lazy-capy-hoodie',
    name: 'Lazy Capy Hoodie',
    category: 'apparel',
    price: 54.99,
    description: 'Heavyweight fleece. Embroidered capy on the chest. Maximum cozy.',
    longDescription:
      'This hoodie is as unbothered as the animal it represents. Heavyweight 450gsm fleece, a relaxed oversized fit, and a chest-embroidered capybara graphic. Wear it everywhere. Never take it off. Become the capy.',
    emoji: '🧥',
    bgFrom: '#D4E8D0',
    bgTo: '#BAD8B6',
    variants: [
      { id: 'xs',  label: 'XS', inStock: true },
      { id: 's',   label: 'S',  inStock: true },
      { id: 'm',   label: 'M',  inStock: true },
      { id: 'l',   label: 'L',  inStock: true },
      { id: 'xl',  label: 'XL', inStock: true },
      { id: 'xxl', label: 'XXL', inStock: false },
    ],
    variantType: 'size',
    featured: true,
    badge: 'New',
  },
  {
    id: 'capy-tote-bag',
    slug: 'capy-tote-bag',
    name: 'Lazy Capy Tote',
    category: 'accessories',
    price: 19.99,
    description: 'Heavy canvas tote. Carry your stuff the capybara way — calmly.',
    longDescription:
      'A sturdy 12 oz canvas tote with our original Lazy Capy illustration screen-printed in earthy terracotta ink. Big enough for groceries, a laptop, or approximately 47 snacks. Machine washable.',
    emoji: '👜',
    bgFrom: '#F5E6D3',
    bgTo: '#EDD5BA',
    variants: [{ id: 'one-size', label: 'One Size', inStock: true }],
    variantType: 'none',
    featured: true,
  },
  {
    id: 'capy-ceramic-mug',
    slug: 'capy-ceramic-mug',
    name: 'Capy Morning Mug',
    category: 'accessories',
    price: 16.99,
    description: '11 oz ceramic mug. Start every day with capy energy.',
    longDescription:
      'Hand-illustrated capybara design wrapped around a sturdy 11 oz ceramic mug. Dishwasher safe. Microwave safe. Vibe safe. The perfect vessel for your morning coffee, matcha, or whatever you drink while doing absolutely nothing.',
    emoji: '☕',
    bgFrom: '#F0E8D8',
    bgTo: '#E5D5C0',
    variants: [{ id: 'one-size', label: '11 oz', inStock: true }],
    variantType: 'none',
    featured: false,
  },
  {
    id: 'capy-enamel-pin-set',
    slug: 'capy-enamel-pin-set',
    name: 'Capy Enamel Pin Set',
    category: 'accessories',
    price: 12.99,
    description: 'Set of 3 hard enamel pins. Tiny capys for your jacket, bag, or life.',
    longDescription:
      'Three original hard enamel pins: Classic Capy, Hot Spring Capy, and Sleepy Capy. Each pin is 1.5 inches, gold plated, with a rubber clutch back. Pin them to your jacket, your backpack, or your emotional support tote.',
    emoji: '📍',
    bgFrom: '#FFF0D8',
    bgTo: '#FFE0B8',
    variants: [{ id: 'set-of-3', label: 'Set of 3', inStock: true }],
    variantType: 'none',
    featured: false,
    badge: 'Limited',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  plushies:    'Plushies',
  apparel:     'Apparel',
  accessories: 'Accessories',
};
