const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.worker.count();
  console.log(`Current worker count: ${count}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
