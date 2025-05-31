import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const publicPaths = ['/login', '/signup']
    const token = request.cookies.get('token')?.value

    const isPublicPath = publicPaths.includes(path)

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile/:path*', // ✅ Matches /profile and all nested routes
    ]
}
