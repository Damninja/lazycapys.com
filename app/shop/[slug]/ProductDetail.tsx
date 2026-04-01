'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product, ProductVariant } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetail({ product, related }: Props) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.inStock) ?? product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedVariant.inStock) return;
    setAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant.id, selectedVariant.label);
    }
    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-capy-muted mb-8">
        <Link href="/" className="hover:text-capy-brown transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-capy-brown transition-colors">Shop</Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-capy-brown transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-capy-dark font-medium truncate">{product.name}</span>
      </nav>

      {/* Product grid */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="relative">
          <div
            className="aspect-square rounded-3xl flex items-center justify-center shadow-sm overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})`,
            }}
          >
            <span
              className="text-[12rem] leading-none select-none"
              role="img"
              aria-label={product.name}
            >
              {product.emoji}
            </span>
          </div>
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span
                className={`badge ${
                  product.badge === 'Bestseller'
                    ? 'badge-bestseller'
                    : product.badge === 'New'
                    ? 'badge-new'
                    : 'badge-limited'
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs font-bold tracking-widest uppercase text-capy-terracotta mb-2">
            {product.category}
          </p>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-capy-dark leading-tight mb-3">
            {product.name}
          </h1>

          <p className="text-capy-muted leading-relaxed mb-6">
            {product.longDescription}
          </p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-heading font-bold text-3xl text-capy-brown">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-capy-muted">USD</span>
          </div>

          {/* Variant selector */}
          {product.variantType === 'size' && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-capy-dark mb-3">
                Size:{' '}
                <span className="text-capy-brown font-normal">{selectedVariant.label}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => { if (v.inStock) setSelectedVariant(v); }}
                    disabled={!v.inStock}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-150 ${
                      selectedVariant.id === v.id
                        ? 'border-capy-brown bg-capy-brown text-white'
                        : v.inStock
                        ? 'border-capy-border text-capy-dark hover:border-capy-brown hover:text-capy-brown'
                        : 'border-capy-border text-capy-muted opacity-40 cursor-not-allowed line-through'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              {!selectedVariant.inStock && (
                <p className="text-xs text-capy-terracotta mt-2">
                  This size is currently sold out.
                </p>
              )}
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-capy-dark mb-3">Quantity</p>
            <div className="flex items-center border border-capy-border rounded-full w-fit overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center text-capy-muted hover:bg-capy-warm transition-colors text-xl"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-capy-dark">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center text-capy-muted hover:bg-capy-warm transition-colors text-xl"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant.inStock || adding}
            className={`btn-primary w-full text-base py-4 mb-3 ${
              added ? '!bg-capy-sage hover:!bg-capy-sage' : ''
            }`}
          >
            {adding
              ? 'Adding…'
              : added
              ? '✓ Added to Cart!'
              : selectedVariant.inStock
              ? `Add to Cart — $${(product.price * quantity).toFixed(2)}`
              : 'Out of Stock'}
          </button>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-capy-muted">
            <span>🚚 Free shipping over $50</span>
            <span>🔒 Secure Stripe checkout</span>
            <span>♻️ Eco-friendly packaging</span>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="font-heading text-3xl font-bold text-capy-dark mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
