const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const workers = await prisma.worker.findMany({
      select: { category: true },
      take: 20
    });
    const uniqueCategories = [...new Set(workers.map(w => w.category))];
    console.log('Categories in DB:', uniqueCategories);
    
    // Check for "Plumbers" which is what's in the categoryMap
    const countPlumbers = await prisma.worker.count({
      where: { category: 'Plumbers' }
    });
    console.log(`Count for 'Plumbers': ${countPlumbers}`);
    
    // Check for "Plumber" (singular)
    const countPlumber = await prisma.worker.count({
      where: { category: 'Plumber' }
    });
    console.log(`Count for 'Plumber': ${countPlumber}`);

    // Check for specific search logic
    const searchResult = await prisma.worker.findMany({
        where: {
            isProfilePublic: true,
            status: 'APPROVED',
            OR: [
              { name: { contains: '', mode: 'insensitive' } },
              { category: { contains: '', mode: 'insensitive' } },
              { area: { contains: '', mode: 'insensitive' } }
            ]
          },
          take: 5
    });
    console.log(`Search result for empty query: ${searchResult.length}`);

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
