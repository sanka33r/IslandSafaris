import type { Metadata } from 'next';

const SITE_NAME = 'Island Safaris Sri Lanka';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.islandsafarisl.com';

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  titleAbsolute?: boolean;
};

export const metadataBase = new URL(SITE_URL);
export const siteUrl = SITE_URL;

export function buildMetadata({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
  noIndex = false,
  titleAbsolute = false,
}: SeoInput): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type,
      siteName: SITE_NAME,
      url: canonicalPath,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}
