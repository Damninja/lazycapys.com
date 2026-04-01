import Link from 'next/link';

const SHOP_LINKS = [
  { href: '/shop?category=plushies',    label: 'Plushies' },
  { href: '/shop?category=apparel',     label: 'Apparel' },
  { href: '/shop?category=accessories', label: 'Accessories' },
];

export default function Footer() {
  return (
    <footer className="bg-capy-warm border-t border-capy-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🦫</span>
              <span className="font-heading font-bold text-xl text-capy-brown">Lazy Capys</span>
            </Link>
            <p className="text-sm text-capy-muted leading-relaxed max-w-xs">
              Bringing capybara energy to your everyday life. Cozy merch for people who get it.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-heading font-bold text-capy-brown mb-3 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-capy-muted hover:text-capy-brown transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-heading font-bold text-capy-brown mb-3 text-sm uppercase tracking-wider">
              Info
            </h3>
            <ul className="space-y-2">
              {[
                { href: '#', label: 'Shipping & Returns' },
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-capy-muted hover:text-capy-brown transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-capy-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-capy-muted">
            © {new Date().getFullYear()} Lazy Capys. All rights reserved.
          </p>
          <p className="text-xs text-capy-muted">
            Made with 🦫 and excessive amounts of relaxation.
          </p>
        </div>
      </div>
    </footer>
  );
}
