import { Suspense } from 'react';
import ShopContent from './ShopContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Capybara plushies, apparel, and accessories. Because you deserve cozy.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="h-12 w-48 bg-capy-warm rounded-2xl animate-pulse mb-4" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-capy-warm rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
