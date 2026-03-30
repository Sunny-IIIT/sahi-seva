export const dynamic = 'force-dynamic'; 
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    // In SQLite, case-insensitive search involves `contains`
    const workersFromDb = await prisma.worker.findMany({
      where: {
        isProfilePublic: true, // Only show public profiles
        status: 'APPROVED', // Only show verified workers
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { area: { contains: query, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        phone: true,
        area: true,
        category: true,
        priceRate: true,
        trustScore: true,
        status: true,
        jobsDone: true,
        avgRating: true
      },
      orderBy: {
        trustScore: 'desc'
      }
    });

    // Map database models to UI component props
    const workers = workersFromDb.map(w => ({
      id: w.id,
      name: w.name,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=random&color=fff&rounded=true`,
      category: w.category,
      trust_score: w.trustScore,
      verified: w.status === 'APPROVED',
      phone_number: w.phone,
      price: w.priceRate || 'Price on request',
      ratings: w.avgRating,
      profile_views: Math.floor(w.jobsDone * 3.5) + 12 // Simulated views
    }));

    return NextResponse.json({ success: true, workers });
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
