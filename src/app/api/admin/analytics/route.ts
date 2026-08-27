import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // We are simulating fetching all bookings over the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const recentBookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        worker: {
          select: { category: true }
        }
      }
    });

    // 1. Calculate Pin Code Demand
    const pinCodeMap: Record<string, number> = {};
    recentBookings.forEach(booking => {
      if (booking.pinCode) {
        pinCodeMap[booking.pinCode] = (pinCodeMap[booking.pinCode] || 0) + 1;
      }
    });

    const highDemandPinCodes = Object.keys(pinCodeMap)
      .map(pinCode => ({
        pinCode,
        demand: pinCodeMap[pinCode]
      }))
      .sort((a, b) => b.demand - a.demand)
      .slice(0, 10); // Top 10

    // 2. Calculate Service Distribution
    const serviceMap: Record<string, number> = {};
    recentBookings.forEach(booking => {
      const category = booking.worker.category;
      serviceMap[category] = (serviceMap[category] || 0) + 1;
    });

    const serviceDistribution = Object.keys(serviceMap)
      .map(category => ({
        name: category,
        value: serviceMap[category]
      }))
      .sort((a, b) => b.value - a.value);

    // If database is empty, return dummy data for SIH presentation
    if (highDemandPinCodes.length === 0) {
      return NextResponse.json({
        highDemandPinCodes: [
          { pinCode: '395007', demand: 120 },
          { pinCode: '395009', demand: 95 },
          { pinCode: '395001', demand: 80 },
          { pinCode: '395003', demand: 65 },
          { pinCode: '395015', demand: 50 },
        ],
        serviceDistribution: [
          { name: 'Electrician', value: 300 },
          { name: 'Plumber', value: 250 },
          { name: 'Maid', value: 450 },
          { name: 'Carpenter', value: 150 },
          { name: 'Painter', value: 200 },
        ]
      });
    }

    return NextResponse.json({
      highDemandPinCodes,
      serviceDistribution
    });

  } catch (error) {
    console.error('Analytics API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
