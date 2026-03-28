const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const query = '';
  const workers = await prisma.worker.findMany({
    where: {
      isProfilePublic: true,
      status: 'APPROVED',
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
        { area: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
  console.log(`Results for query "${query}": ${workers.length}`);
  if (workers.length > 0) {
    console.log('Sample:', JSON.stringify(workers[0], null, 2));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
