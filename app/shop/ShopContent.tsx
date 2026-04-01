'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORY_LABELS, type ProductCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const CATEGORIES: Array<{ id: ProductCategory | 'all'; label: string; emoji: string }> = [
  { id: 'all',         label: 'All Products', emoji: '🦫' },
  { id: 'plushies',    label: 'Plushies',     emoji: '🧸' },
  { id: 'apparel',     label: 'Apparel',      emoji: '🧥' },
  { id: 'accessories', label: 'Accessories',  emoji: '✨' },
];

const SORT_OPTIONS = [
  { id: 'default',    label: 'Featured' },
  { id: 'price-asc',  label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name',       label: 'Name A–Z' },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const qCategory = searchParams.get('category') as ProductCategory | null;

  const validCategory = CATEGORIES.some((c) => c.id === qCategory) ? qCategory : 'all';
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    validCategory ?? 'all'
  );
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...PRODUCTS]
      : PRODUCTS.filter((p) => p.category === activeCategory);

    if (sortBy === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, sortBy]);

  const heading =
    activeCategory === 'all' ? 'All Products' : CATEGORY_LABELS[activeCategory];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="font-heading text-5xl font-bold text-capy-dark mb-3">Shop</h1>
        <p className="text-capy-muted text-lg">Everything your inner capybara needs.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                activeCategory === cat.id
                  ? 'bg-capy-brown text-white shadow-sm'
                  : 'bg-white text-capy-muted border border-capy-border hover:border-capy-brown hover:text-capy-brown'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort" className="text-sm text-capy-muted whitespace-nowrap">
            Sort:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-capy-border rounded-full px-3 py-1.5 bg-white text-capy-dark focus:outline-none focus:ring-2 focus:ring-capy-terracotta/30"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-capy-muted mb-6">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        {activeCategory !== 'all' && ` in ${heading}`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <span className="text-6xl">🦫</span>
          <p className="mt-4 font-heading text-xl text-capy-muted">No products here yet.</p>
        </div>
      )}
    </div>
  );
}
