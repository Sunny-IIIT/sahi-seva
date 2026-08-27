import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Twilio sends data as application/x-www-form-urlencoded
    const text = await request.text();
    const params = new URLSearchParams(text);

    // Extract the sender's phone number (Twilio format: whatsapp:+919876543210)
    const fromWhatsApp = params.get('From');
    const messageBody = params.get('Body')?.trim().toUpperCase();

    if (!fromWhatsApp || !messageBody) {
      return new NextResponse('Invalid request', { status: 400 });
    }

    // Clean up the phone number to match our DB format (e.g., remove 'whatsapp:' and country code if needed)
    // For this prototype, we'll assume the DB stores it with or without country code and do a simple string match
    const rawPhoneNumber = fromWhatsApp.replace('whatsapp:', '').replace('+91', '').trim();

    // 1. Find the worker by phone number
    const worker = await prisma.worker.findFirst({
      where: {
        phone: {
          contains: rawPhoneNumber
        }
      }
    });

    if (!worker) {
      // Not a registered worker
      return sendTwiMLResponse('You are not registered as a worker on SahiSeva.');
    }

    // 2. Find the worker's most recent PENDING booking
    const pendingBooking = await prisma.booking.findFirst({
      where: {
        workerId: worker.id,
        status: 'PENDING'
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        customer: true
      }
    });

    if (!pendingBooking) {
      return sendTwiMLResponse('You have no pending booking requests right now.');
    }

    // 3. Process YES or NO
    if (messageBody === 'YES') {
      // Update Booking to CONFIRMED
      await prisma.booking.update({
        where: { id: pendingBooking.id },
        data: { status: 'CONFIRMED' }
      });

      // (Optional) Here you would use the Twilio client to send an SMS to the customer:
      // const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
      // await twilioClient.messages.create({
      //   body: `SahiSeva: Your worker ${worker.name} has accepted the job and is on the way!`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: pendingBooking.customer.phone
      // });

      return sendTwiMLResponse('Booking Accepted! The customer has been notified that you are on the way.');
    } 
    
    if (messageBody === 'NO') {
      // Update Booking to CANCELLED
      await prisma.booking.update({
        where: { id: pendingBooking.id },
        data: { status: 'CANCELLED' }
      });

      return sendTwiMLResponse('Booking Rejected. We will assign another worker to the customer.');
    }

    // Unrecognized command
    return sendTwiMLResponse('Please reply with YES to accept the booking or NO to reject it.');

  } catch (error) {
    console.error('WhatsApp Webhook Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Helper to send a Twilio TwiML XML response back to the WhatsApp sender
function sendTwiMLResponse(message: string) {
  const twiml = `
    <Response>
      <Message>${message}</Message>
    </Response>
  `;
  
  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
