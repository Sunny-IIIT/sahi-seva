import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check if the DATABASE_URL is set (masked)
    const envVar = process.env.DATABASE_URL;
    const isSet = !!envVar;
    const masked = isSet ? `${envVar?.split('@')[1] || 'URL exists but is malformed'}` : 'NOT SET';

    // Try a simple connection check
    await prisma.$connect();
    const count = await prisma.worker.count();

    return NextResponse.json({
      status: 'Connection Successful',
      dbUrlPresent: isSet,
      dbUrlDomain: masked,
      workerCount: count
    });

  } catch (error: any) {
    console.error('Debug API Error:', error);
    return NextResponse.json({
      status: 'Connection Failed',
      error: error.message || 'Unknown Error',
      stack: error.stack,
      dbUrlPresent: !!process.env.DATABASE_URL
    }, { status: 500 });
  }
}
