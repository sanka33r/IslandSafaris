import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import GlobalDataProvider from '@/providers/GlobalDataProvider';
import LocaleProvider from '@/providers/LocaleProvider';
import { getDirection, getRequestLocale } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { metadataBase } from '@/lib/seo';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Island Safaris Sri Lanka',
    template: '%s | Island Safaris Sri Lanka',
  },
  description: 'Sigiriya safari tours and authentic local experiences in Sri Lanka - private elephant jeep safaris to Minneriya, Kaudulla & Hurulu Eco Park.',
  alternates: {
    canonical: '/',
  },
  robots: {
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
  openGraph: {
    type: 'website',
    siteName: 'Island Safaris Sri Lanka',
    title: 'Island Safaris Sri Lanka',
    description: 'Sigiriya safari tours and authentic local experiences in Sri Lanka - private elephant jeep safaris to Minneriya, Kaudulla & Hurulu Eco Park.',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Island Safaris Sri Lanka',
    description: 'Sigiriya safari tours and authentic local experiences in Sri Lanka - private elephant jeep safaris to Minneriya, Kaudulla & Hurulu Eco Park.',
    images: ['/og-image.jpg'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();
  const dir = getDirection(locale);
  const messages = getMessages(locale);

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <body className={cn(outfit.variable, "font-sans min-h-screen bg-safari-950 text-secondary-50")}>
        <GlobalDataProvider>
          <LocaleProvider locale={locale} messages={messages}>
            {children}
          </LocaleProvider>
        </GlobalDataProvider>
      </body>
    </html>
  );
}
