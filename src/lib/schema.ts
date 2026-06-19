import { CONTACT_DETAILS } from '@/lib/constants';
import { Review } from '@/types/db';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.islandsafaris.com';
const BUSINESS_NAME = 'Island Safaris Sri Lanka';

export function getSiteUrl() {
  return SITE_URL;
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: CONTACT_DETAILS.phone,
    email: CONTACT_DETAILS.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Habarana',
      addressCountry: 'LK',
    },
    areaServed: 'Sri Lanka',
    priceRange: '$$',
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function touristTripSchema(input: {
  name: string;
  description: string;
  path: string;
  price: number;
  duration?: string;
  location?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    touristType: 'Wildlife travelers',
    itinerary: input.location || 'Sri Lanka',
    offers: {
      '@type': 'Offer',
      price: Number(input.price).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${input.path}`,
    },
    ...(input.duration ? { duration: input.duration } : {}),
  };
}

export function reviewSchemas(reviews: Review[], itemName: string, itemPath: string) {
  if (!reviews.length) return [];

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      itemReviewed: {
        '@type': 'Thing',
        name: itemName,
        url: `${SITE_URL}${itemPath}`,
      },
      ratingValue: average.toFixed(1),
      reviewCount: reviews.length,
    },
    ...reviews.slice(0, 5).map((review) => ({
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Thing',
        name: itemName,
      },
      author: {
        '@type': 'Person',
        name: review.name,
      },
      reviewBody: review.comment,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: review.created_at,
    })),
  ];
}
