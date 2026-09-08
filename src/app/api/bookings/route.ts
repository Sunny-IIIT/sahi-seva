import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { customerId, workerId, latitude, longitude } = data;

    // Check for double booking race condition
    if (workerId) {
      const activeBooking = await prisma.booking.findFirst({
        where: {
          workerId: workerId,
          status: {
            in: [
              BookingStatus.SEARCHING, 
              BookingStatus.ACCEPTED, 
              BookingStatus.ARRIVED, 
              BookingStatus.IN_PROGRESS
            ]
          }
        }
      });

      if (activeBooking) {
        return NextResponse.json(
          { error: 'Worker already booked for this slot.' },
          { status: 409 }
        );
      }
    }

    // Generate 4-digit service OTP
    const serviceOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const booking = await prisma.booking.create({
      data: {
        customerId,
        workerId: workerId || null,
        status: BookingStatus.SEARCHING,
        serviceOtp,
        latitude,
        longitude
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
