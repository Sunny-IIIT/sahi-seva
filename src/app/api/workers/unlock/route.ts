export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    // SECURITY GUARD: Only authenticated users (customers or workers) can unlock contacts
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'You must be signed in to unlock contact details.' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { workerId } = data;

    if (!workerId || typeof workerId !== 'string') {
      return NextResponse.json({ success: false, error: 'Worker ID is required' }, { status: 400 });
    }

    const worker = await prisma.worker.findUnique({
      where: { id: workerId },
      select: { phone: true, status: true }
    });

    if (!worker || worker.status !== 'APPROVED') {
      return NextResponse.json({ success: false, error: 'Worker not found or not verified' }, { status: 404 });
    }

    return NextResponse.json({ success: true, phone: worker.phone });

  } catch (error) {
    console.error('Unlock Contact Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to unlock contact' }, { status: 500 });
  }
}

