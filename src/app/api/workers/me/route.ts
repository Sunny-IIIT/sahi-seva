import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.type !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const worker = await prisma.worker.findUnique({
      where: { id: session.id }
    });

    if (!worker) return NextResponse.json({ error: 'Worker not found' }, { status: 404 });

    return NextResponse.json({ success: true, worker });
  } catch (error) {
    console.error('Fetch Profile Error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { isProfilePublic, priceRate } = await request.json();

    const dataToUpdate: any = {};
    if (typeof isProfilePublic === 'boolean') {
      dataToUpdate.isProfilePublic = isProfilePublic;
    }
    if (typeof priceRate === 'string' && priceRate.length > 0 && priceRate.length <= 50) {
      // Basic input length validation for the pricing
      dataToUpdate.priceRate = priceRate.trim();
    }

    // Reject empty updates
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ error: 'No valid data to update or input too long' }, { status: 400 });
    }

    const worker = await prisma.worker.update({
      where: { id: session.id },
      data: dataToUpdate
    });

    return NextResponse.json({ success: true, worker });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
