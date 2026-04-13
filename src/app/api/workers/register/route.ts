import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!data.phone || !phoneRegex.test(data.phone.trim()) || !data.name || data.name.length > 50 || !data.category) {
      return NextResponse.json({ error: 'Invalid input. Phone must be a valid 10-digit Indian mobile number.' }, { status: 400 });
    }

    if (!data.fileToken || data.fileToken.length > 255) {
      return NextResponse.json({ error: 'Aadhaar document verification is required' }, { status: 400 });
    }

    const worker = await prisma.worker.create({
      data: {
        phone: data.phone.trim(),
        name: data.name.trim(),
        area: data.area ? data.area.substring(0, 100).trim() : null,
        category: data.category,
        priceRate: "₹300/visit", // Default rate
        aadhaarToken: data.fileToken // Save token securely
      }
    });

    // Set secure JWT cookie
    const sessionData = {
      id: worker.id,
      phone: worker.phone,
      type: 'worker'
    };
    
    await createSession(sessionData);

    return NextResponse.json({ success: true, message: 'Worker registered', worker });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Phone number already registered' }, { status: 400 });
    }
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Failed to register worker' }, { status: 500 });
  }
}
