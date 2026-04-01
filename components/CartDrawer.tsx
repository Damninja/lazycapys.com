'use client';

import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } =
    useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-capy-dark/40 z-50 animate-fade-in"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-capy-cream z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-capy-border">
          <h2 className="font-heading font-bold text-xl text-capy-brown">
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal font-body text-capy-muted">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-capy-warm transition-colors"
          >
            <svg className="w-5 h-5 text-capy-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <span className="text-6xl">🦫</span>
              <p className="font-heading font-bold text-xl text-capy-brown">Your cart is empty</p>
              <p className="text-sm text-capy-muted max-w-xs">
                Even capybaras need to fill their baskets sometimes.
              </p>
              <button onClick={closeCart} className="btn-primary mt-2">
                Browse the Shop
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.variantId}`}
                  className="flex gap-4 py-4 border-b border-capy-border last:border-0"
                >
                  {/* Product image placeholder */}
                  <div
                    className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${item.product.bgFrom}, ${item.product.bgTo})`,
                    }}
                  >
                    {item.product.emoji}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-capy-dark text-sm leading-snug">
                      {item.product.name}
                    </p>
                    {item.product.variantType !== 'none' && (
                      <p className="text-xs text-capy-muted mt-0.5">{item.variantLabel}</p>
                    )}
                    <p className="font-bold text-capy-brown mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity + remove */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-capy-border rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-capy-muted hover:bg-capy-warm transition-colors text-lg leading-none"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-capy-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-capy-muted hover:bg-capy-warm transition-colors text-lg leading-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.variantId)}
                        className="text-xs text-capy-muted hover:text-capy-terracotta transition-colors underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-capy-border bg-white">
            {/* Free shipping notice */}
            {subtotal < 50 && (
              <p className="text-xs text-capy-muted text-center mb-3">
                Add{' '}
                <span className="font-bold text-capy-sage">
                  ${(50 - subtotal).toFixed(2)}
                </span>{' '}
                more for free shipping 🌿
              </p>
            )}
            {subtotal >= 50 && (
              <p className="text-xs text-capy-sage font-semibold text-center mb-3">
                ✓ You qualify for free shipping!
              </p>
            )}

            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm text-capy-muted">Subtotal</span>
              <span className="font-bold text-lg text-capy-brown">${subtotal.toFixed(2)}</span>
            </div>

            <button className="btn-primary w-full text-base py-3.5">
              Checkout — ${subtotal.toFixed(2)}
            </button>
            <p className="text-xs text-capy-muted text-center mt-3">
              Secure checkout powered by Stripe
            </p>
          </div>
        )}
      </div>
    </>
  );
}
