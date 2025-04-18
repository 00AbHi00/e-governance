// I pulled this directly from next js documentation
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: '/admin/:path*'
}