// Lazy Capys — Shared Cart Logic
// All pages include this file

(function () {
  const CART_KEY = 'lazycapys-cart';
  const FREE_SHIPPING_THRESHOLD = 50;

  // ── Persistence ──────────────────────────────────────────────────
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  // ── Cart operations ───────────────────────────────────────────────
  function addToCart(product, variant, qty) {
    const cart = loadCart();
    qty = qty || 1;
    const key = product.id + (variant ? '_' + variant : '');
    const existing = cart.find(i => i.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        category: product.category,
        variant: variant || null,
        qty,
      });
    }
    saveCart(cart);
    updateCartUI();
    flashCartBadge();
  }

  function removeFromCart(key) {
    const cart = loadCart().filter(i => i.key !== key);
    saveCart(cart);
    updateCartUI();
    renderDrawerItems();
  }

  function changeQty(key, delta) {
    const cart = loadCart();
    const item = cart.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      const idx = cart.indexOf(item);
      cart.splice(idx, 1);
    }
    saveCart(cart);
    updateCartUI();
    renderDrawerItems();
  }

  function getCartCount() {
    return loadCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function getCartSubtotal() {
    return loadCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  // ── UI: badge ─────────────────────────────────────────────────────
  function updateCartUI() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCartCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
    // also refresh subtotal in open drawer
    const subtotalEl = document.getElementById('drawer-subtotal');
    if (subtotalEl) {
      subtotalEl.textContent = '$' + getCartSubtotal().toFixed(2);
    }
    const progressEl = document.getElementById('shipping-progress');
    if (progressEl) renderShippingProgress(progressEl);
  }

  function flashCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.classList.remove('badge-pop');
      void b.offsetWidth;
      b.classList.add('badge-pop');
    });
  }

  // ── Drawer ────────────────────────────────────────────────────────
  function buildDrawer() {
    if (document.getElementById('cart-drawer')) return;

    const overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.addEventListener('click', closeDrawer);

    const drawer = document.createElement('aside');
    drawer.id = 'cart-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Shopping cart');
    drawer.setAttribute('aria-modal', 'true');
    drawer.innerHTML = `
      <div class="drawer-header">
        <h2 class="drawer-title">🛒 Your Cart</h2>
        <button class="drawer-close" aria-label="Close cart" id="drawer-close-btn">&times;</button>
      </div>
      <div id="drawer-items" class="drawer-items"></div>
      <div class="drawer-footer">
        <div id="shipping-progress" class="shipping-progress"></div>
        <div class="drawer-subtotal-row">
          <span>Subtotal</span>
          <span id="drawer-subtotal">$0.00</span>
        </div>
        <button class="btn-checkout" id="checkout-btn">Checkout</button>
        <p class="drawer-secure">🔒 Secure checkout &bull; Free returns</p>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById('drawer-close-btn').addEventListener('click', closeDrawer);
    document.getElementById('checkout-btn').addEventListener('click', () => {
      alert('Coming soon — Stripe checkout!');
    });

    // Inject drawer CSS if not already present
    if (!document.getElementById('cart-drawer-styles')) {
      const style = document.createElement('style');
      style.id = 'cart-drawer-styles';
      style.textContent = drawerCSS();
      document.head.appendChild(style);
    }
  }

  function openDrawer() {
    buildDrawer();
    renderDrawerItems();
    updateCartUI();
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    drawer.classList.add('open');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('drawer-close-btn').focus();
  }

  function closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderDrawerItems() {
    const container = document.getElementById('drawer-items');
    if (!container) return;
    const cart = loadCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="drawer-empty">
          <div class="drawer-empty-emoji">🦫</div>
          <p>Your cart is empty!</p>
          <a href="shop.html" class="btn-browse" onclick="closeDrawer()">Browse the shop</a>
        </div>
      `;
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="drawer-item" data-key="${escHtml(item.key)}">
        <div class="drawer-item-thumb">${item.emoji}</div>
        <div class="drawer-item-info">
          <div class="drawer-item-name">${escHtml(item.name)}</div>
          ${item.variant ? `<div class="drawer-item-variant">${escHtml(item.variant)}</div>` : ''}
          <div class="drawer-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="drawer-item-controls">
          <button class="qty-btn" data-key="${escHtml(item.key)}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-key="${escHtml(item.key)}" data-delta="1" aria-label="Increase quantity">+</button>
          <button class="remove-btn" data-key="${escHtml(item.key)}" aria-label="Remove item">🗑</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.key, parseInt(btn.dataset.delta)));
    });
    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
    });
  }

  function renderShippingProgress(el) {
    const subtotal = getCartSubtotal();
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    if (remaining <= 0) {
      el.innerHTML = `<span class="shipping-done">✓ You've got free shipping!</span>`;
      el.querySelector('.shipping-done').style.color = '#7A9E7E';
    } else {
      const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
      el.innerHTML = `
        <div class="shipping-text">Add <strong>$${remaining.toFixed(2)}</strong> more for free shipping!</div>
        <div class="shipping-bar-bg"><div class="shipping-bar-fill" style="width:${pct}%"></div></div>
      `;
    }
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Drawer CSS ────────────────────────────────────────────────────
  function drawerCSS() {
    return `
      #cart-overlay {
        display: none;
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.4);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      #cart-overlay.open {
        display: block;
        opacity: 1;
      }
      #cart-drawer {
        position: fixed;
        top: 0; right: 0; bottom: 0;
        width: min(420px, 100vw);
        background: #FFF8F0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: -4px 0 24px rgba(124,74,45,0.15);
      }
      #cart-drawer.open {
        transform: translateX(0);
      }
      .drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid #E8D0B8;
        background: #fff;
      }
      .drawer-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.3rem;
        color: #7C4A2D;
        margin: 0;
      }
      .drawer-close {
        background: none; border: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: #9B7B6B;
        line-height: 1;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.2s, color 0.2s;
      }
      .drawer-close:hover { background: #F5E6D3; color: #C4623A; }
      .drawer-items {
        flex: 1;
        overflow-y: auto;
        padding: 16px 24px;
      }
      .drawer-empty {
        text-align: center;
        padding: 48px 16px;
        color: #9B7B6B;
      }
      .drawer-empty-emoji { font-size: 3.5rem; margin-bottom: 12px; }
      .drawer-empty p { margin: 0 0 20px; font-size: 1rem; }
      .btn-browse {
        display: inline-block;
        background: #C4623A;
        color: #fff;
        padding: 10px 24px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 700;
        font-family: 'Nunito', sans-serif;
        transition: background 0.2s;
      }
      .btn-browse:hover { background: #7C4A2D; }
      .drawer-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 0;
        border-bottom: 1px solid #E8D0B8;
      }
      .drawer-item-thumb {
        width: 52px; height: 52px;
        background: linear-gradient(135deg, #F5E6D3, #E8D0B8);
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.8rem;
        flex-shrink: 0;
      }
      .drawer-item-info { flex: 1; min-width: 0; }
      .drawer-item-name {
        font-weight: 700;
        font-size: 0.9rem;
        color: #7C4A2D;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .drawer-item-variant { font-size: 0.78rem; color: #9B7B6B; margin-top: 2px; }
      .drawer-item-price { font-size: 0.9rem; color: #C4623A; font-weight: 700; margin-top: 4px; }
      .drawer-item-controls {
        display: flex; align-items: center; gap: 6px;
      }
      .qty-btn {
        width: 28px; height: 28px;
        background: #F5E6D3; border: 1px solid #E8D0B8;
        border-radius: 6px; cursor: pointer;
        font-size: 1rem; color: #7C4A2D; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s;
      }
      .qty-btn:hover { background: #E8D0B8; }
      .qty-num { font-weight: 700; color: #7C4A2D; min-width: 20px; text-align: center; font-size: 0.9rem; }
      .remove-btn {
        background: none; border: none; cursor: pointer;
        font-size: 1rem; padding: 4px; border-radius: 6px;
        transition: background 0.2s; margin-left: 4px;
      }
      .remove-btn:hover { background: #F5E6D3; }
      .drawer-footer {
        padding: 16px 24px 24px;
        border-top: 1px solid #E8D0B8;
        background: #fff;
      }
      .shipping-progress { margin-bottom: 14px; font-size: 0.85rem; color: #9B7B6B; }
      .shipping-text { margin-bottom: 8px; }
      .shipping-bar-bg {
        height: 6px; background: #E8D0B8; border-radius: 99px; overflow: hidden;
      }
      .shipping-bar-fill {
        height: 100%; background: linear-gradient(90deg, #C4623A, #7A9E7E);
        border-radius: 99px; transition: width 0.4s ease;
      }
      .drawer-subtotal-row {
        display: flex; justify-content: space-between;
        font-weight: 800; font-size: 1.05rem;
        color: #7C4A2D; margin-bottom: 14px;
      }
      .btn-checkout {
        width: 100%;
        background: linear-gradient(135deg, #C4623A, #7C4A2D);
        color: #fff; border: none;
        padding: 14px; border-radius: 50px;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem; font-weight: 800;
        cursor: pointer; letter-spacing: 0.5px;
        transition: opacity 0.2s, transform 0.2s;
        margin-bottom: 8px;
      }
      .btn-checkout:hover { opacity: 0.92; transform: translateY(-1px); }
      .drawer-secure { text-align: center; font-size: 0.78rem; color: #9B7B6B; margin: 0; }

      @keyframes badge-pop {
        0% { transform: scale(1); }
        40% { transform: scale(1.5); }
        100% { transform: scale(1); }
      }
      .badge-pop { animation: badge-pop 0.35s ease; }
    `;
  }

  // ── Product data (single source of truth) ─────────────────────────
  window.CAPY_PRODUCTS = [
    {
      id: 'classic-capy-plushie',
      name: 'Classic Capy Plushie',
      category: 'plushies',
      price: 29.99,
      emoji: '🦫',
      badge: 'Bestseller',
      badgeColor: '#C4623A',
      gradient: 'linear-gradient(135deg, #F5E6D3 0%, #E8D0B8 100%)',
      description: 'The OG Lazy Capy plushie — ultra-soft, squishable, and certified chill. Perfect desk companion.',
      longDescription: 'Meet your new favorite couch companion! Our Classic Capy Plushie is crafted from premium ultra-soft plush fabric that\'s incredibly huggable. Each capybara is filled with hypoallergenic polyfill for the perfect squish. Measures approximately 12 inches long — ideal for desks, shelves, or snuggling. Double-stitched seams and embroidered details ensure it stays cute for years.',
      variants: ['Small (8")', 'Medium (12")', 'Large (16")'],
    },
    {
      id: 'hot-spring-capy',
      name: 'Hot Spring Capy',
      category: 'plushies',
      price: 34.99,
      emoji: '🛁',
      badge: 'New',
      badgeColor: '#7A9E7E',
      gradient: 'linear-gradient(135deg, #d4eaf7 0%, #b3d4e8 100%)',
      description: 'Your capy comes with a tiny hot spring tub! The most relaxed plushie you\'ll ever own.',
      longDescription: 'Why just have a capybara when you can have a capybara IN A HOT SPRING? This deluxe plushie set comes with a capybara plush and a soft fabric hot spring tub accessory. The capy nestles perfectly inside, head resting on the edge in peak relaxation mode. Includes miniature orange slice accessory. Ultra-soft, machine washable.',
      variants: ['Standard Set', 'Deluxe Set (with extras)'],
    },
    {
      id: 'sleepy-capy-plushie',
      name: 'Sleepy Capy Plushie',
      category: 'plushies',
      price: 27.99,
      emoji: '😴',
      badge: null,
      gradient: 'linear-gradient(135deg, #e8d4f0 0%, #d4b8e8 100%)',
      description: 'Eyes closed, dreams big. This sleepy capy is in full relaxation mode — just like us.',
      longDescription: 'Inspired by every capybara video where they just... completely zone out — this sleepy capy plushie has closed embroidered eyes and the most peaceful expression you\'ve ever seen. Incredibly soft chenille fabric that feels like a cloud. Perfect for gifting to anyone who loves a good nap (so, everyone). Approximately 10 inches.',
      variants: ['Small (8")', 'Medium (10")', 'Large (14")'],
    },
    {
      id: 'lazy-capy-hoodie',
      name: 'Lazy Capy Hoodie',
      category: 'apparel',
      price: 54.99,
      emoji: '🧥',
      badge: 'New',
      badgeColor: '#7A9E7E',
      gradient: 'linear-gradient(135deg, #d4e8d4 0%, #b8d4bc 100%)',
      description: 'Cozy hoodie with our signature relaxed capy graphic. Be the capybara you were meant to be.',
      longDescription: 'Channel your inner capybara with this super-soft hoodie featuring our signature "Lazy Capy" graphic on the front and a small capy logo on the sleeve. Made from 80% cotton / 20% polyester fleece blend — it\'s warm, cozy, and perfect for those "I don\'t want to do anything today" days. Unisex sizing, printed via Printful.',
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    },
    {
      id: 'lazy-capy-tote',
      name: 'Lazy Capy Tote',
      category: 'accessories',
      price: 19.99,
      emoji: '👜',
      badge: null,
      gradient: 'linear-gradient(135deg, #F5E6D3 0%, #f0d4b8 100%)',
      description: 'Heavy-duty canvas tote with our chilling capy design. Carry your stuff in style.',
      longDescription: 'This sturdy canvas tote bag features our original "Chill Capy" illustration — the perfect everyday carry for groceries, books, or anything else. Made from 100% heavy canvas with reinforced straps. Machine washable. The print is fade-resistant and eco-friendly water-based ink. Approx. 15" x 16" with 3" gusset.',
      variants: ['Natural Canvas', 'Black Canvas'],
    },
    {
      id: 'capy-morning-mug',
      name: 'Capy Morning Mug',
      category: 'accessories',
      price: 16.99,
      emoji: '☕',
      badge: null,
      gradient: 'linear-gradient(135deg, #f7ddd4 0%, #f0c4b0 100%)',
      description: 'Start your morning with a capy. 11oz ceramic mug, dishwasher safe, big on vibes.',
      longDescription: 'Your morning coffee just got cuter. This 11oz ceramic mug features our "Good Morning, I Refuse" capy design — a capybara sitting unbothered with a tiny coffee cup. Dishwasher safe, microwave safe, and guaranteed to make your mornings at least 40% better. White ceramic with full-color wrap print.',
      variants: ['11oz', '15oz'],
    },
    {
      id: 'capy-enamel-pin-set',
      name: 'Capy Enamel Pin Set',
      category: 'accessories',
      price: 12.99,
      emoji: '📍',
      badge: 'Limited',
      badgeColor: '#C4623A',
      gradient: 'linear-gradient(135deg, #f7f0d4 0%, #e8d88a 100%)',
      description: 'Set of 3 hard enamel pins: Classic Capy, Hot Spring Capy, and Sleepy Capy.',
      longDescription: 'Collect all three in this limited-edition hard enamel pin set! Featuring our three most beloved capy characters: the Classic (sitting calmly), the Hot Spring (fully submerged in bliss), and the Sleepy (eyes closed, unbothered). Each pin is approximately 1.25 inches, hard enamel with gold metal base, and comes with a rubber clutch backing. Perfect for jackets, bags, and cork boards.',
      variants: ['Set of 3', 'Individual — Classic', 'Individual — Hot Spring', 'Individual — Sleepy'],
    },
  ];

  // ── Init ──────────────────────────────────────────────────────────
  function init() {
    // Wire up cart icon(s)
    document.querySelectorAll('.cart-icon-btn').forEach(btn => {
      btn.addEventListener('click', openDrawer);
    });

    // Build drawer early so it's ready
    buildDrawer();
    updateCartUI();
  }

  // Expose public API
  window.CapyCart = {
    addToCart,
    openDrawer,
    closeDrawer,
    getCartCount,
    getCartSubtotal,
    loadCart,
    updateCartUI,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
