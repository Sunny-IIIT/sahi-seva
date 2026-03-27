import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    // In SQLite, case-insensitive search involves `contains`
    const workers = await prisma.worker.findMany({
      where: {
        isProfilePublic: true, // Only show public profiles
        status: 'APPROVED', // Only show verified workers
        OR: [
          { name: { contains: query } },
          { category: { contains: query } },
          { area: { contains: query } }
        ]
      },
      select: {
        id: true,
        name: true,
        category: true,
        priceRate: true,
        trustScore: true,
        verified: true,
        jobsDone: true,
        avgRating: true
      },
      orderBy: {
        trustScore: 'desc'
      }
    });

    return NextResponse.json({ success: true, workers });
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
