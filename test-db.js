const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const allWorkers = await prisma.worker.count();
  console.log(`Connection successful. Total workers: ${allWorkers}`);
}

main().catch(e => {
  console.error('\n--- DB CONNECTION FAILED ---');
  console.error(e.message);
}).finally(async () => await prisma.$disconnect());
