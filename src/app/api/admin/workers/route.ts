import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Basic protection (in prod use real sessions/roles)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'sahiseva-admin-secret';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (key !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const workers = await prisma.worker.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, workers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workers' }, { status: 500 });
  }
}
