'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/products';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const defaultVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariant.inStock) return;
    setAdding(true);
    addItem(product, defaultVariant.id, defaultVariant.label);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="card bg-white">
        {/* Product image / illustration */}
        <div
          className="relative aspect-square flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})`,
          }}
        >
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 badge ${
                product.badge === 'Bestseller'
                  ? 'badge-bestseller'
                  : product.badge === 'New'
                  ? 'badge-new'
                  : 'badge-limited'
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Emoji illustration */}
          <span
            className="text-[7rem] leading-none select-none transition-transform duration-500 group-hover:scale-110"
            role="img"
            aria-label={product.name}
          >
            {product.emoji}
          </span>

          {/* Quick-add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
            <button
              onClick={handleAdd}
              disabled={!defaultVariant.inStock || adding}
              className="w-full btn-primary py-2.5 text-sm shadow-lg"
            >
              {adding
                ? '✓ Added!'
                : defaultVariant.inStock
                ? 'Add to Cart'
                : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-capy-muted uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-heading font-bold text-capy-dark text-base leading-snug mb-1 group-hover:text-capy-terracotta transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-capy-muted leading-snug line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-capy-brown text-lg">
              ${product.price.toFixed(2)}
            </span>
            {product.variantType === 'size' && (
              <span className="text-xs text-capy-muted">
                {product.variants.filter((v) => v.inStock).length} sizes
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
