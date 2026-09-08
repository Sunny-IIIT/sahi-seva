import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { bookingId, rating, comment, issueType } = await req.json();

    if (!bookingId || !rating) {
      return NextResponse.json({ error: 'Missing bookingId or rating' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch booking details to get customerId and workerId
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        select: { customerId: true, workerId: true, status: true }
      });

      if (!booking || !booking.workerId) {
        throw new Error('Booking or Worker not found');
      }

      // 2. Insert the standard Review
      const review = await tx.review.upsert({
        where: { bookingId },
        create: {
          bookingId,
          workerId: booking.workerId,
          rating,
          comment
        },
        update: {
          rating,
          comment
        }
      });

      // 3. Update the Worker's average rating 
      // Calculate new average rating (rough approximation or exact query)
      const allReviews = await tx.review.findMany({
        where: { workerId: booking.workerId },
        select: { rating: true }
      });
      
      const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
      const newAvg = allReviews.length > 0 ? totalRatings / allReviews.length : rating;

      await tx.worker.update({
        where: { id: booking.workerId },
        data: { avgRating: newAvg }
      });

      // 4. Smart Grievance Mechanism
      // If rating is 1 or 2, we immediately open a dispute ticket for the local admin
      let ticket = null;
      if (rating <= 2) {
        if (!issueType || !comment) {
          throw new Error('Issue type and description are required for poor ratings.');
        }

        ticket = await tx.ticket.create({
          data: {
            bookingId,
            customerId: booking.customerId,
            workerId: booking.workerId,
            issueType,
            description: comment,
            status: 'OPEN'
          }
        });
      }

      return { review, ticket };
    });

    return NextResponse.json(
      { 
        success: true, 
        message: rating <= 2 ? 'Review submitted and Ticket opened' : 'Review submitted successfully',
        data: result
      }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Review API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 400 });
  }
}
