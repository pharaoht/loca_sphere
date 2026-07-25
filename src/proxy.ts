import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {

    const refreshToken = request.cookies.get('refresh_token')?.value;

    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

    if (isDashboardRoute && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const requestHeaders = new Headers(request.headers);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    return response;
}

export const config = {
    matcher: ['/dashboard/:path*',],
};