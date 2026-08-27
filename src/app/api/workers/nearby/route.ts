import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Haversine formula to calculate distance between two coordinates in kilometers
function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    const radiusParam = searchParams.get('radiusKm') || '5'; // default 5km
    const category = searchParams.get('category');

    // If no coordinates provided, fallback to standard fetch
    if (!latParam || !lngParam) {
      const where: any = {
        isProfilePublic: true,
        status: 'APPROVED',
      };
      if (category) {
        where.category = category;
      }

      const workers = await prisma.worker.findMany({
        where,
        take: 20,
        orderBy: { trustScore: 'desc' },
      });
      return NextResponse.json(workers);
    }

    const lat = parseFloat(latParam);
    const lng = parseFloat(lngParam);
    const radiusKm = parseFloat(radiusParam);

    if (isNaN(lat) || isNaN(lng) || isNaN(radiusKm)) {
      return NextResponse.json({ error: 'Invalid coordinates or radius' }, { status: 400 });
    }

    // Fetch all approved workers (with basic filtering)
    // In a real production app with millions of workers, we'd use PostGIS
    // or bounding box queries. Here we fetch all and filter in memory.
    const where: any = {
      isProfilePublic: true,
      status: 'APPROVED',
      latitude: { not: null },
      longitude: { not: null },
    };
    if (category) {
      where.category = category;
    }

    const allWorkers = await prisma.worker.findMany({
      where,
    });

    // Filter by radius using Haversine formula
    const nearbyWorkers = allWorkers
      .map((worker) => {
        const distance = getDistanceInKm(
          lat,
          lng,
          worker.latitude as number,
          worker.longitude as number
        );
        return { ...worker, distance };
      })
      .filter((worker) => worker.distance <= radiusKm)
      .sort((a, b) => {
        // Sort by distance ascending, then by trust score descending
        if (a.distance === b.distance) {
          return b.trustScore - a.trustScore;
        }
        return a.distance - b.distance;
      });

    return NextResponse.json(nearbyWorkers);
  } catch (error) {
    console.error('Error fetching nearby workers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nearby workers' },
      { status: 500 }
    );
  }
}
