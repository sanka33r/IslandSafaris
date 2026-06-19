import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Safari Destinations in Sri Lanka',
  description:
    'Compare Minneriya, Kaudulla, and Hurulu Eco Park safari options in Sri Lanka and choose the best park for your travel dates.',
  path: '/destinations',
});

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
