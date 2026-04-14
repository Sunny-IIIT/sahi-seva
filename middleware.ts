import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limit store
// Note: This works per-serverless-instance. For cross-instance rate limiting,
// upgrade to Upstash Redis (@upstash/ratelimit) when scaling beyond MVP.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/workers/register': { max: 5,  windowMs: 60_000 }, // 5 registrations per minute per IP
  '/api/workers/unlock':   { max: 10, windowMs: 60_000 }, // 10 unlocks per minute per IP
  '/api/search':           { max: 30, windowMs: 60_000 }, // 30 searches per minute per IP
  'default':               { max: 60, windowMs: 60_000 }, // 60 requests per minute for everything else
};

function getLimit(pathname: string) {
  return RATE_LIMITS[pathname] ?? RATE_LIMITS['default'];
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only rate-limit API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const { max, windowMs } = getLimit(pathname);

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    // Fresh window
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return NextResponse.next();
  }

  if (entry.count >= max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.', retryAfterSeconds: retryAfter },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(max),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
