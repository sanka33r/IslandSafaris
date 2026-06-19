import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, localeCookieName, locales } from '@/i18n/config';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude login page and api login
    if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const session = request.cookies.get('island_safaris_admin');
    const secret = process.env.SESSION_SECRET || 'fallback-secret-do-not-use-in-prod';

    if (!session || session.value !== secret) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Keep a stable locale cookie for all non-admin routes.
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    const existing = request.cookies.get(localeCookieName)?.value;
    const response = NextResponse.next();

    if (!existing) {
      const preferred = request.headers
        .get('accept-language')
        ?.split(',')
        .map((part) => part.split(';')[0]?.trim())
        .filter(Boolean) ?? [];

      const matched =
        preferred.find((candidate) => locales.includes(candidate as (typeof locales)[number])) ??
        preferred
          .map((candidate) => candidate.split('-')[0]?.toLowerCase())
          .map((base) => locales.find((locale) => locale.toLowerCase().startsWith(base ?? '')))
          .find(Boolean) ??
        defaultLocale;

      response.cookies.set(localeCookieName, matched, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
