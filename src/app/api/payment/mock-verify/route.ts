import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { MOCK_CUSTOMER } from '@/lib/mock';

export async function POST(req: Request) {
  try {
    // Attempt to get the authenticated user
    const session = await getSession();
    
    // We'll support both real session and fallback mock session for local testing
    let customerId;
    if (session && session.type === 'customer') {
      customerId = session.id;
    } else {
      // Fallback to exactly what was described for mock testing
      const defaultCustomerInfo = {
        phone: MOCK_CUSTOMER.phone_number,
        name: MOCK_CUSTOMER.name
      };
      
      // Ensure the mock customer exists in the DB so the flow doesn't crash
      let customer = await prisma.customer.findUnique({
        where: { phone: defaultCustomerInfo.phone }
      });
      
      if (!customer) {
        customer = await prisma.customer.create({
          data: defaultCustomerInfo
        });
      }
      customerId = customer.id;
    }

    // Update the customer's trustPassExpiry to 10 days from now
    const expiryDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    
    await prisma.customer.update({
      where: { id: customerId },
      data: { trustPassExpiry: expiryDate }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Trust Pass Activated',
      expiry: expiryDate
    });

  } catch (error) {
    console.error('Payment Mock Verification Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
