import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Basic In-Memory Rate Limiter: IP/Phone -> { count, timestamp }
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    
    // --- Rate Limiting Logic ---
    const clientIP = request.headers.get('x-forwarded-for') || 'local';
    const rateKey = `${clientIP}_${phone}`;
    const now = Date.now();
    
    if (rateLimitMap.has(rateKey)) {
      const data = rateLimitMap.get(rateKey)!;
      // Reset if 5 minutes have passed
      if (now - data.timestamp > 5 * 60 * 1000) {
        rateLimitMap.set(rateKey, { count: 1, timestamp: now });
      } else {
        if (data.count >= 3) {
          return NextResponse.json({ error: 'Too many requests. Please try again after 5 minutes.' }, { status: 429 });
        }
        data.count += 1;
        rateLimitMap.set(rateKey, data);
      }
    } else {
      rateLimitMap.set(rateKey, { count: 1, timestamp: now });
    }
    // ---------------------------

    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    }

    // Generate a 4 digit mock OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Make expire in 5 min
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save/UPSERT to DB
    await prisma.verificationToken.upsert({
      where: {
        phone_otp: { phone, otp }
      },
      update: {
        otp, expiresAt
      },
      create: {
        phone, otp, expiresAt
      }
    });
    
    // In production, send `otp` via SMS here.
    console.log(`[MOCK SMS] OTP for ${phone} is ${otp}`);

    return NextResponse.json({ success: true, message: 'OTP sent successfully. Check server console.' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
