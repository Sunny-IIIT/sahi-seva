import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Clean any stray whitespace/newlines from the URL (caused Vercel env var issues)
const cleanUrl = (url: string | undefined) => {
  return url ? url.replace(/\s+/g, '').trim() : url;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: cleanUrl(process.env.DATABASE_URL),
      },
    },
  })

// CRITICAL FIX: The old code had `!== 'production'` here which meant in production
// (Vercel serverless), the singleton was NEVER cached. Every request created a new
// PrismaClient with fresh DB connections, exhausting the Supabase connection pool.
// Now we ALWAYS cache the client globally.
globalForPrisma.prisma = prisma

export default prisma;