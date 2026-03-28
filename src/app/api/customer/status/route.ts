import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { MOCK_CUSTOMER } from '@/lib/mock';

export async function GET() {
  try {
    const session = await getSession();
    
    let customerId;
    if (session && session.type === 'customer') {
      customerId = session.id;
    } else {
      // Fallback to mock phone for local/dev environment
      const customer = await prisma.customer.findUnique({
        where: { phone: MOCK_CUSTOMER.phone_number }
      });
      if (customer) {
        customerId = customer.id;
      }
    }

    if (!customerId) {
      return NextResponse.json({ 
        success: true, 
        hasTrustPass: false,
        message: 'No active session or mock customer found.' 
      });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { trustPassExpiry: true }
    });

    const hasTrustPass = customer?.trustPassExpiry 
      ? new Date(customer.trustPassExpiry) > new Date() 
      : false;

    return NextResponse.json({ 
      success: true, 
      hasTrustPass,
      expiry: customer?.trustPassExpiry 
    });

  } catch (error) {
    console.error('Customer Status API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
