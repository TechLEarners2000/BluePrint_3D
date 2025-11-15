import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to login and register pages and API routes
  if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Check for sessionId cookie
  const sessionCookie = request.cookies.get("sessionId")

  if (!sessionCookie) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
