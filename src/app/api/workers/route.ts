export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    let where: any = {
      isProfilePublic: true,
      status: 'APPROVED',
    };

    if (categoryId) {
      // Map category IDs (e.g., "1") to category names (e.g., "Maids")
      const categoryMap: Record<string, string> = {
        "1": "Maids",
        "2": "Cooks",
        "3": "Plumbers",
        "4": "Electricians",
        "5": "Carpenters",
        "6": "Painters",
        "7": "Drivers",
        "8": "Mechanics",
        "9": "Gardeners",
        "10": "Guards",
        "11": "Nannies",
        "12": "Nurses",
        "13": "Delivery",
        "14": "Loaders",
        "15": "Tailors",
        "16": "Beauticians",
        "17": "Masons",
        "18": "Welders",
        "19": "Cleaners",
        "20": "Pest Control"
      };

      const categoryName = categoryMap[categoryId];
      if (categoryName) {
        where.category = categoryName;
      }
    }

    const workersFromDb = await prisma.worker.findMany({
      where,
      take: limit,
      orderBy: {
        trustScore: 'desc'
      }
    });

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
      profile_views: Math.floor(w.jobsDone * 3.5) + 12
    }));

    return NextResponse.json({ success: true, workers });
  } catch (error) {
    console.error('Fetch Workers Error:', error);
    return NextResponse.json({ error: 'Failed to fetch workers', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
