import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const count = await prisma.worker.count();
    console.log(`TOTAL_WORKERS=${count}`);
  } catch (error: any) {
    console.error(`DB_ERROR=${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

check();
