import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Explore safari destinations and booking options instead.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-safari-50 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-secondary-600 font-bold uppercase tracking-wider text-sm mb-2">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4">This page is no longer here</h1>
        <p className="max-w-2xl mx-auto text-safari-600 mb-8">
          The link may be outdated or the page may have moved. Use the options below to continue planning your Sri Lanka safari.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold transition-colors"
          >
            Go to Safari Booking
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-safari-200 text-safari-900 font-semibold hover:bg-safari-100 transition-colors"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </main>
  );
}
