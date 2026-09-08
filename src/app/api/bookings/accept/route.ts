import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, workerId } = body;

    if (!bookingId || !workerId) {
      return NextResponse.json({ error: 'Missing bookingId or workerId' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch the worker to check wallet balance
      const worker = await tx.worker.findUnique({
        where: { id: workerId },
        select: { walletBalance: true, status: true }
      });

      if (!worker) {
        throw new Error('Worker not found');
      }

      // Check if wallet balance is sufficient for the ₹50 Lead Fee (5000 paise if stored in paise, or 50 if stored in rupees. Schema has default 0, let's assume storing exactly 50)
      const LEAD_FEE = 50; 
      if (worker.walletBalance < LEAD_FEE) {
        throw new Error('INSUFFICIENT_FUNDS');
      }

      // 2. Fetch the booking to ensure it's still SEARCHING
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        select: { status: true }
      });

      if (!booking || booking.status !== 'SEARCHING') {
        throw new Error('Booking is no longer available');
      }

      // 3. Deduct the Lead Fee and update the booking to ACCEPTED
      const updatedWorker = await tx.worker.update({
        where: { id: workerId },
        data: {
          walletBalance: { decrement: LEAD_FEE }
        }
      });

      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: 'ACCEPTED',
          workerId: workerId,
          acceptedAt: new Date(),
        }
      });

      return { booking: updatedBooking, workerBalance: updatedWorker.walletBalance };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.message === 'INSUFFICIENT_FUNDS') {
      return NextResponse.json({ error: 'Payment Required: Please recharge your wallet with at least ₹50 to accept leads.' }, { status: 402 });
    }
    if (error.message === 'Booking is no longer available') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
