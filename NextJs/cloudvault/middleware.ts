import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/home'])
const isPublicApiRoute = createRouteMatcher(['/api/videos'])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()
    const currentPath = req.nextUrl.pathname
    const isApiRoute = currentPath.startsWith('/api')
    const isAccessingDashboard = currentPath === '/home'

    // Redirect logged-in users away from sign-in/up/public pages
    if (userId && isPublicRoute(req) && !isAccessingDashboard) {
        return Response.redirect(new URL('/home', req.url))
    }

    // If not logged in
    if (!userId) {
        if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
            return Response.redirect(new URL('/sign-in', req.url))
        }

        if (isApiRoute && !isPublicApiRoute(req)) {
            return new Response('Unauthorized', { status: 401 })
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        '/((?!_next|.*\\.(?:html?|css|js|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
