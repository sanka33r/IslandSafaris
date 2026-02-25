import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import GlobalDataProvider from '@/providers/GlobalDataProvider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Island Safaris Sri Lanka',
  description: 'Premium Safari Experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(outfit.variable, "font-sans min-h-screen bg-safari-950 text-secondary-50")}>
        <GlobalDataProvider>
          {children}
        </GlobalDataProvider>
      </body>
    </html>
  );
}
