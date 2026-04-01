export const runtime = 'edge';

import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-capy-warm via-capy-cream to-capy-peach">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-capy-terra-pale opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-capy-sage-pale opacity-40 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <span className="inline-block bg-capy-terra-pale text-capy-terracotta text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                ✨ Free shipping over $50
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-capy-dark leading-[1.05] mb-6">
                Chill Out
                <br />
                <span className="text-capy-terracotta">with Lazy Capys.</span>
              </h1>
              <p className="text-capy-muted text-lg leading-relaxed mb-8 max-w-md">
                Premium plushies, cozy apparel, and accessories for people who live their best capybara life. Handcrafted. Adorable. Unbothered.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop" className="btn-primary text-base px-8 py-3.5">
                  Shop Now
                </Link>
                <Link href="/shop?category=plushies" className="btn-secondary text-base px-8 py-3.5">
                  See Plushies
                </Link>
              </div>
            </div>

            {/* Mascot illustration */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Main circle */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-capy-warm to-capy-peach border-4 border-white shadow-xl flex items-center justify-center">
                  <span className="text-[10rem] leading-none" role="img" aria-label="Capybara mascot">
                    🦫
                  </span>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-md px-3 py-2 text-sm font-bold text-capy-terracotta animate-[float_3s_ease-in-out_infinite]">
                  SO SOFT ✨
                </div>
                <div className="absolute -bottom-2 -left-2 bg-white rounded-2xl shadow-md px-3 py-2 text-sm font-bold text-capy-sage animate-[float_3s_ease-in-out_0.5s_infinite]">
                  Very Chill 🌿
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Shipping Banner ──────────────────────────────────── */}
      <div className="bg-capy-brown text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-1 text-sm font-semibold">
            <span>🚚 Free shipping on orders $50+</span>
            <span>♻️ Eco-friendly packaging</span>
            <span>🐾 Printed & fulfilled via Printful</span>
          </div>
        </div>
      </div>

      {/* ─── Featured Products ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-capy-terracotta text-sm font-bold tracking-widest uppercase mb-2">
              Fan Favourites
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-capy-dark">
              Featured Capys
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-capy-brown hover:text-capy-terracotta transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="btn-secondary">
            View all products
          </Link>
        </div>
      </section>

      {/* ─── Brand Story ──────────────────────────────────────── */}
      <section className="bg-capy-warm border-y border-capy-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Emoji art */}
            <div className="flex justify-center md:justify-start">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '🦫', bg: '#F5E6D3', label: 'Classic Capy' },
                  { emoji: '🛁', bg: '#E0EEF5', label: 'Hot Spring' },
                  { emoji: '🌿', bg: '#D4E8D0', label: 'Nature Lover' },
                  { emoji: '😴', bg: '#EDE0F5', label: 'Sleepy Mode' },
                ].map(({ emoji, bg, label }) => (
                  <div
                    key={label}
                    className="w-36 h-36 rounded-3xl flex items-center justify-center text-5xl shadow-sm"
                    style={{ background: bg }}
                    title={label}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div>
              <p className="text-capy-terracotta text-sm font-bold tracking-widest uppercase mb-3">
                Our Story
              </p>
              <h2 className="font-heading text-4xl font-bold text-capy-dark mb-5 leading-tight">
                Why a capybara?
              </h2>
              <div className="space-y-4 text-capy-muted leading-relaxed">
                <p>
                  Because capybaras are the most unbothered animals on the planet. They chill in hot springs. They let birds sit on them. They don't stress about anything.
                </p>
                <p>
                  We started Lazy Capys to bring that same energy into your life — through ridiculously soft plushies, cozy apparel, and accessories that remind you to slow down and just... be.
                </p>
                <p className="font-semibold text-capy-brown">
                  Be the capy. 🦫
                </p>
              </div>
              <Link href="/shop" className="btn-primary mt-8 inline-flex">
                Shop the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category Tiles ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-heading text-4xl font-bold text-capy-dark mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              href: '/shop?category=plushies',
              emoji: '🦫',
              label: 'Plushies',
              desc: 'Ultra-soft and totally huggable',
              bg: 'from-capy-warm to-capy-peach',
            },
            {
              href: '/shop?category=apparel',
              emoji: '🧥',
              label: 'Apparel',
              desc: 'Hoodies & tees for cozy days',
              bg: 'from-capy-sage-pale to-capy-sage-light',
            },
            {
              href: '/shop?category=accessories',
              emoji: '✨',
              label: 'Accessories',
              desc: 'Mugs, pins, bags & more',
              bg: 'from-capy-terra-pale to-capy-warm',
            },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group relative rounded-3xl bg-gradient-to-br ${cat.bg} p-8 flex flex-col items-center text-center border border-capy-border hover:shadow-md transition-shadow duration-200`}
            >
              <span className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {cat.emoji}
              </span>
              <h3 className="font-heading font-bold text-2xl text-capy-dark mb-1">{cat.label}</h3>
              <p className="text-sm text-capy-muted">{cat.desc}</p>
              <span className="mt-4 text-sm font-semibold text-capy-brown group-hover:text-capy-terracotta transition-colors">
                Shop {cat.label} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// Float keyframe via inline style for the hero badges
// (Tailwind doesn't have float by default; added in config)
