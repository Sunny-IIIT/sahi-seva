import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'sahiseva-admin-secret';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (key !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { status } = await request.json();

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const worker = await prisma.worker.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Worker ${worker.name} is now ${status}`,
      worker 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
