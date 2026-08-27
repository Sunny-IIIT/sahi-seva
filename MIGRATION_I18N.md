# Next-Intl Migration Guide

I have installed `next-intl` and set up the foundational translation structure (`messages/en.json`, `src/i18n.ts`, and `next.config.ts`) to prepare your app for multilingual support (English, Hindi, Gujarati).

## Why isn't it active yet?
Activating the multi-language router requires moving **every single route file** in your `src/app/` folder into a new dynamic segment: `src/app/[locale]/`. 

Doing this automatically right now would break all your existing URLs and routes during your pivot. You must do this migration manually when you are ready to update your UI layout.

## How to execute the final migration:

1. **Move Files**:
   Create a folder `src/app/[locale]/` and move all your route groups, `page.tsx`, and `layout.tsx` files into it. 
   Leave `api/` outside of `[locale]/`! (e.g., `src/app/api/`)

2. **Update Middleware**:
   Add this routing interceptor to your `middleware.ts`. It will automatically redirect users to `/en/...` or `/hi/...` based on their browser language.

```typescript
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'hi', 'gu'],
  defaultLocale: 'en'
});

// Update your main middleware export to pipe requests through both 
// your existing rate-limiter and the intlMiddleware.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/')) {
    // Keep your existing rate limit logic here
    // ...
  } else {
    // For non-API routes, handle language routing
    return intlMiddleware(request);
  }
}
```

3. **Update Layout**:
   Modify `src/app/[locale]/layout.tsx` to accept `params.locale` and pass it to Next-Intl providers.
