export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { workerId } = data;

    if (!workerId) {
       return NextResponse.json({ success: false, error: 'Worker ID is required' }, { status: 400 });
    }

    // Security Note: In a full production app, verify payment/session token here before querying.
    // e.g., const session = await getSession();

    const worker = await prisma.worker.findUnique({
      where: { id: workerId },
      select: { phone: true }
    });

    if (!worker) {
      return NextResponse.json({ success: false, error: 'Worker not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, phone: worker.phone });

  } catch (error) {
    console.error('Unlock Contact Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to unlock contact' }, { status: 500 });
  }
}
