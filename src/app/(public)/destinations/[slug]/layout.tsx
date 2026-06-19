import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

interface DestinationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const pageMap: Record<string, { title: string; description: string }> = {
  'minneriya-national-park': {
    title: 'Minneriya Elephant Safari Sri Lanka',
    description:
      'Book a Minneriya elephant safari in Sri Lanka for peak herd sightings, private jeep comfort, and expert local guidance.',
  },
  'kaudulla-national-park': {
    title: 'Kaudulla Safari Sri Lanka',
    description:
      'Plan your Kaudulla safari in Sri Lanka with local experts who track migration timing for better elephant sightings.',
  },
  'hurulu-eco-park': {
    title: 'Hurulu Eco Park Safari',
    description:
      'Explore Hurulu Eco Park safari routes with private jeeps, trusted local drivers, and seasonal wildlife insight.',
  },
};

export async function generateMetadata(props: DestinationLayoutProps): Promise<Metadata> {
  const params = await props.params;
  const seo = pageMap[params.slug];

  if (!seo) {
    return buildMetadata({
      title: 'Sri Lanka Safari Destination',
      description: 'Explore this Sri Lanka safari destination with expert local guidance and flexible booking support.',
      path: `/destinations/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/destinations/${params.slug}`,
  });
}

export default function DestinationSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
