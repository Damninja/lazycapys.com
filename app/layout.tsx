import type { Metadata } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lazy Capys — Capybara Plushies & Merch',
    template: '%s | Lazy Capys',
  },
  description:
    'Cozy capybara plushies, apparel, and accessories. Because life is better when you chill like a capy.',
  keywords: ['capybara', 'plushie', 'stuffed animal', 'merch', 'cute', 'cozy'],
  openGraph: {
    title: 'Lazy Capys',
    description: 'Cozy capybara plushies & merch.',
    url: 'https://lazycapys.com',
    siteName: 'Lazy Capys',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
