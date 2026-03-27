import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { phone, otp, type } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    if (otp.length < 4) {
      return NextResponse.json({ error: 'Invalid OTP format' }, { status: 400 });
    }

    // Verify OTP from database
    const tokenRecord = await prisma.verificationToken.findUnique({
      where: { phone_otp: { phone, otp } }
    });

    if (!tokenRecord) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (new Date() > tokenRecord.expiresAt) {
      await prisma.verificationToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Delete token after successful use
    await prisma.verificationToken.delete({
      where: { id: tokenRecord.id }
    });

    // Determine target collection
    let user;
    if (type === 'worker') {
      user = await prisma.worker.findUnique({ where: { phone } });
    } else {
      user = await prisma.customer.findUnique({ where: { phone } });
    }

    if (!user) {
      // If user does not exist, they need to register
      return NextResponse.json({ 
        success: false, 
        registered: false,
        message: 'Account not found, please register.' 
      }, { status: 404 });
    }

    // Set secure JWT cookie
    const sessionData = {
      id: user.id,
      phone: user.phone,
      type: type
    };
    
    await createSession(sessionData);

    return NextResponse.json({ 
      success: true, 
      registered: true,
      message: 'Logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
