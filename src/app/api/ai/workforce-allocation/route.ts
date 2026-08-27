import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // In a real implementation, we would query historical bookings, 
    // run them through an ML model, and predict future demand.
    // This is a stub that analyzes recent bookings to find high-demand pin codes.
    
    // 1. Group bookings by pin code and category
    // Since Prisma groupBy doesn't easily support grouping by related model fields 
    // across multiple relations (booking -> worker -> category) in a simple query,
    // we'll fetch recent bookings and aggregate in memory for the stub.
    
    const recentBookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
        pinCode: { not: null },
      },
      include: {
        worker: {
          select: {
            category: true,
          }
        }
      }
    });

    const demandMap: Record<string, Record<string, number>> = {};

    recentBookings.forEach(booking => {
      const pin = booking.pinCode!;
      const cat = booking.worker.category;
      
      if (!demandMap[pin]) demandMap[pin] = {};
      if (!demandMap[pin][cat]) demandMap[pin][cat] = 0;
      
      demandMap[pin][cat] += 1;
    });

    // 2. Format the response for the UI/Dashboards
    const forecasts = Object.keys(demandMap).map(pinCode => {
      const categories = Object.keys(demandMap[pinCode]).map(category => ({
        category,
        demandScore: demandMap[pinCode][category], // stubbed as raw count
        predictedShortage: Math.max(0, demandMap[pinCode][category] - 2), // arbitrary logic for stub
      }));

      // Sort categories by demand within pin code
      categories.sort((a, b) => b.demandScore - a.demandScore);

      return {
        pinCode,
        topCategories: categories,
      };
    });

    // Sort pin codes by overall demand
    forecasts.sort((a, b) => {
      const totalA = a.topCategories.reduce((sum, c) => sum + c.demandScore, 0);
      const totalB = b.topCategories.reduce((sum, c) => sum + c.demandScore, 0);
      return totalB - totalA;
    });

    // Add some simulated future data for demonstration purposes if database is empty
    if (forecasts.length === 0) {
      forecasts.push(
        {
          pinCode: "395007",
          topCategories: [
            { category: "Electrician", demandScore: 45, predictedShortage: 12 },
            { category: "Plumber", demandScore: 30, predictedShortage: 5 },
          ]
        },
        {
          pinCode: "395009",
          topCategories: [
            { category: "Maid", demandScore: 60, predictedShortage: 20 },
            { category: "Carpenter", demandScore: 15, predictedShortage: 2 },
          ]
        }
      );
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      forecasts: forecasts.slice(0, 5), // Top 5 high demand areas
      metadata: {
        model: "SIH-Demand-Forecast-Stub-v1",
        confidence: 0.85
      }
    });
  } catch (error) {
    console.error('Error generating AI forecast:', error);
    return NextResponse.json(
      { error: 'Failed to generate demand forecast' },
      { status: 500 }
    );
  }
}
