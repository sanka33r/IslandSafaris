import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
