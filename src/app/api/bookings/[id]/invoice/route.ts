import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const body = await request.json();
    const { subtotal, paymentMethod, paymentRef } = body;

    if (!subtotal || subtotal <= 0) {
      return NextResponse.json({ error: 'Valid subtotal is required' }, { status: 400 });
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { worker: true }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // SIH Logic: Calculate welfare deduction (e.g., 2% of subtotal goes to cooperative welfare fund)
    const welfareFeePercentage = 0.02; 
    const platformFeePercentage = 0.05; // 5% platform fee
    const gstPercentage = 0.18;

    const welfareFeeDeducted = subtotal * welfareFeePercentage;
    const platformFee = subtotal * platformFeePercentage;
    const preGstTotal = subtotal + platformFee;
    const gst = preGstTotal * gstPercentage;
    const totalAmount = preGstTotal + gst;

    // Use a transaction to ensure all related updates succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Invoice
      const invoice = await tx.invoice.create({
        data: {
          bookingId,
          subtotal,
          platformFee,
          welfareFeeDeducted,
          gst,
          totalAmount,
          paymentMethod: paymentMethod || 'CASH',
          paymentRef,
          paidAt: new Date(),
        }
      });

      // 2. Update Booking Status to COMPLETED
      await tx.booking.update({
        where: { id: bookingId },
        data: { 
          status: 'COMPLETED',
          amount: totalAmount
        }
      });

      // 3. Update Worker Welfare and Earnings records
      await tx.worker.update({
        where: { id: booking.workerId },
        data: {
          welfareFundContribution: {
            increment: welfareFeeDeducted
          },
          totalEarnings: {
            increment: subtotal // Subtotal is what the worker nominally earns before deductions
          },
          jobsDone: {
            increment: 1
          }
        }
      });

      return invoice;
    });

    return NextResponse.json({ success: true, invoice: result });
  } catch (error: any) {
    console.error('Error generating invoice:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Invoice already exists for this booking' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    );
  }
}
