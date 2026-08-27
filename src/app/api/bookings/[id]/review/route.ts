import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const body = await request.json();
    const { rating, comment, workerId } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Valid rating between 1 and 5 is required' }, { status: 400 });
    }
    
    if (!workerId) {
      return NextResponse.json({ error: 'Worker ID is required' }, { status: 400 });
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'COMPLETED') {
        return NextResponse.json({ error: 'Can only review completed bookings' }, { status: 400 });
    }

    // Use a transaction to create the review and update worker's average rating
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Review
      const review = await tx.review.create({
        data: {
          bookingId,
          workerId,
          rating,
          comment
        }
      });

      // 2. Calculate new average rating and trust score
      const allReviews = await tx.review.aggregate({
        where: { workerId },
        _avg: { rating: true },
        _count: { id: true }
      });

      const avgRating = allReviews._avg.rating || rating;
      const reviewCount = allReviews._count.id;
      
      // Basic Trust Score calculation logic
      // Base: 80, Max: 100
      // 5-star bumps trust, 1-star drops trust
      let newTrustScore = 80;
      if (reviewCount > 0) {
         // Scale rating (1-5) to impact trust score
         // If avg is 5, score goes towards 100. If 1, goes towards 50.
         const ratingImpact = (avgRating - 3) * 10; // -20 to +20
         newTrustScore = Math.min(100, Math.max(0, 80 + ratingImpact));
      }

      // 3. Update Worker
      await tx.worker.update({
        where: { id: workerId },
        data: {
          avgRating,
          trustScore: Math.round(newTrustScore)
        }
      });

      return review;
    });

    return NextResponse.json({ success: true, review: result });
  } catch (error: any) {
    console.error('Error creating review:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Review already exists for this booking' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
