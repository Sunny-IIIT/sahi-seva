import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, subject, description, customerId, workerId } = body;

    if (!bookingId || !subject || !description) {
      return NextResponse.json(
        { error: 'Booking ID, subject, and description are required.' },
        { status: 400 }
      );
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    // Create the ticket
    const ticket = await prisma.ticket.create({
      data: {
        bookingId,
        customerId: customerId || null,
        workerId: workerId || null,
        subject,
        description,
        status: 'OPEN'
      }
    });

    return NextResponse.json({ success: true, ticket }, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to submit grievance ticket' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const customerId = searchParams.get('customerId');
    const workerId = searchParams.get('workerId');

    const where: any = {};
    if (bookingId) where.bookingId = bookingId;
    if (customerId) where.customerId = customerId;
    if (workerId) where.workerId = workerId;

    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}
