import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limit map (Suitable for Single Server / Dev Instances)
const rateLimitMap = new Map();

export function proxy(request: NextRequest) {
  // Simple Rate Limiting Firewall Pattern for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const currentTime = Date.now();
    
    if (rateLimitMap.has(ip)) {
      const windowData = rateLimitMap.get(ip);
      if (currentTime - windowData.startTime < 60000) {
        windowData.count += 1;
        if (windowData.count > 100) { 
          console.warn(`[Firewall] Blocked IP ${ip} for exceeding rate limit`);
          return NextResponse.json({ error: 'Too Many Requests - Security Firewall Active' }, { status: 429 });
        }
      } else {
        rateLimitMap.set(ip, { count: 1, startTime: currentTime });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}
