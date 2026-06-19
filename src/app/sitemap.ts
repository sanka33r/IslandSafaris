import type { MetadataRoute } from 'next';
import { getDestinations } from '@/lib/queries/destinations';
import { getAllBlogArticles } from '@/lib/blog';
import { siteUrl } from '@/lib/seo';

export const revalidate = 3600;

const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/booking',
  '/destinations',
  '/gallery',
  '/packages',
  '/packages/booking',
  '/packages/cooking-class',
  '/packages/cooking-class/booking',
  '/packages/village-tour',
  '/packages/village-tour/booking',
  '/packages/bicycle-rental',
  '/packages/bicycle-rental/booking',
  '/blog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/booking' ? 0.95 : 0.8,
  }));

  let destinationEntries: MetadataRoute.Sitemap = [];
  try {
    const destinations = await getDestinations();
    destinationEntries = destinations.map((destination) => ({
      url: `${siteUrl}/destinations/${destination.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Failed to build destination sitemap entries', error);
  }

  const blogEntries: MetadataRoute.Sitemap = getAllBlogArticles().map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticEntries, ...destinationEntries, ...blogEntries];
}
