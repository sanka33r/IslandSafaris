import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getDestinationBySlug } from '@/lib/queries/destinations';

interface DestinationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Curated SEO copy for the flagship parks; other active destinations fall back
// to their own name + summary so every real destination stays indexable.
const pageMap: Record<string, { title: string; description: string }> = {
  'minneriya-national-park': {
    title: 'Minneriya Elephant Safari Sri Lanka',
    description:
      'Book a Minneriya elephant safari in Sri Lanka for peak herd sightings, private jeep comfort, and expert local guidance.',
  },
  'kaudulla-national-park': {
    title: 'Kaudulla Safari Sri Lanka',
    description:
      'See Kaudulla National Park elephants in Sri Lanka on a private safari, with local experts who track migration timing for the best sightings.',
  },
  'hurulu-eco-park': {
    title: 'Hurulu Eco Park Safari',
    description:
      'Explore Hurulu Eco Park safari routes with private jeeps, trusted local drivers, and seasonal wildlife insight.',
  },
};

function truncate(value: string, max = 155): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata(props: DestinationLayoutProps): Promise<Metadata> {
  const params = await props.params;
  const path = `/destinations/${params.slug}`;
  const seo = pageMap[params.slug];

  if (seo) {
    return buildMetadata({ title: seo.title, description: seo.description, path });
  }

  // Not a flagship park — build indexable metadata from the real destination.
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    return buildMetadata({
      title: 'Sri Lanka Safari Destination',
      description: 'Explore this Sri Lanka safari destination with expert local guidance and flexible booking support.',
      path,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${destination.name} Safari Sri Lanka`,
    description: truncate(
      destination.summary ||
        destination.description ||
        `Plan a ${destination.name} safari in Sri Lanka with private jeeps, expert local guides, and flexible booking from Sigiriya.`,
    ),
    path,
  });
}

export default function DestinationSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
