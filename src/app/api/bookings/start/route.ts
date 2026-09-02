import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { bookingId, serviceOtp, workerId } = await req.json();

    if (!bookingId || !serviceOtp || !workerId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    if (booking.workerId !== workerId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    if (booking.status !== 'PENDING' && booking.status !== 'ACCEPTED') {
      return NextResponse.json({ success: false, error: 'Booking is not in a startable state' }, { status: 400 });
    }

    if (booking.serviceOtp !== serviceOtp) {
      return NextResponse.json({ success: false, error: 'Invalid Service OTP' }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Service started successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Error starting booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
