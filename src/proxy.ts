import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // We only want to protect paths under /api/admin
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    
    // In a real app, you would verify a JWT, session cookie, or Auth header here.
    // Example: const token = request.headers.get('authorization');
    const authCookie = request.cookies.get('admin-session');

    // If no valid session exists, reject immediately with a 401 Unauthorized
    if (!authCookie) {
      return NextResponse.json(
        { 
          error: 'Unauthorized', 
          message: 'Missing or invalid admin authentication token' 
        }, 
        { status: 401 }
      );
    }

    // You can also add role-based checks here (e.g., ensuring they are a 'FEDERATION_ADMIN')
  }

  // If validation passes, or if it's not an admin route, continue the request
  return NextResponse.next();
}

// Configure the middleware to run specifically on Admin API routes to save edge function execution time
export const config = {
  matcher: [
    '/api/admin/:path*'
  ],
};
