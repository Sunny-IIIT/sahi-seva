import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Yeh function kisi bhi hidden 'Enter' ya spaces ko URL se nikaal dega
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

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;