import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch booking to ensure it's IN_PROGRESS and get price details
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        select: { status: true, amount: true, workerId: true }
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status !== 'IN_PROGRESS') {
        throw new Error('Booking must be IN_PROGRESS to complete');
      }

      if (!booking.workerId) {
        throw new Error('Booking has no assigned worker');
      }

      // Default to 1000 if amount is missing just to ensure math works for mocked data
      const finalPrice = booking.amount || 1000;
      
      // Calculate split: 95% to Worker, 5% to Welfare Fund
      const welfareCut = finalPrice * 0.05;
      const workerCut = finalPrice * 0.95;

      // 2. Update Booking Status
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        }
      });

      // 3. Atomically Update Worker's Earnings and Welfare Balance
      const updatedWorker = await tx.worker.update({
        where: { id: booking.workerId },
        data: {
          totalEarnings: { increment: workerCut },
          welfareBalance: { increment: welfareCut }
        }
      });

      // 4. Atomically Update the Society Master Fund
      // Upsert ensures the fund row exists, creating it if it doesn't
      const societyFund = await tx.societyFund.upsert({
        where: { branchName: 'Master Branch' },
        create: {
          branchName: 'Master Branch',
          totalPoolAmount: welfareCut
        },
        update: {
          totalPoolAmount: { increment: welfareCut }
        }
      });

      return {
        booking: updatedBooking,
        worker: updatedWorker,
        societyFund: societyFund
      };
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job Completed successfully. 95/5 Revenue Split executed.', 
        data: result 
      }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Completion Engine Error:', error);
    if (error.message === 'Booking must be IN_PROGRESS to complete' || error.message === 'Booking has no assigned worker') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
