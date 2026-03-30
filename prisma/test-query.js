const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const totalCount = await prisma.worker.count();
  const approvedCount = await prisma.worker.count({ where: { status: 'APPROVED' } });
  const pendingCount = await prisma.worker.count({ where: { status: 'PENDING' } });
  const publicCount = await prisma.worker.count({ where: { isProfilePublic: true } });
  
  console.log('--- Database Stats ---');
  console.log(`Total Workers: ${totalCount}`);
  console.log(`Approved Workers: ${approvedCount}`);
  console.log(`Pending Workers: ${pendingCount}`);
  console.log(`Public Profiles: ${publicCount}`);
  
  const query = '';
  const workers = await prisma.worker.findMany({
    where: {
      isProfilePublic: true,
      status: 'APPROVED',
    },
    take: 5
  });
  console.log(`\nFiltered Workers (Approved & Public): ${workers.length}`);
  if (workers.length > 0) {
    console.log('Sample Workers:', JSON.stringify(workers, null, 2));
  } else {
    // If none are approved/public, let's see some pending ones
    const pendingWorkers = await prisma.worker.findMany({
      where: { status: 'PENDING' },
      take: 5
    });
    console.log('\nSample Pending Workers:', JSON.stringify(pendingWorkers, null, 2));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
