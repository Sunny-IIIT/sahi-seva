import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aadhaarNumber } = body;

    // High-impact delay for demo realism
    await new Promise(r => setTimeout(r, 2000));

    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      return NextResponse.json(
        { error: 'Invalid Aadhaar Number. Must be exactly 12 digits.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Verified via UIDAI',
      data: { kycStatus: 'VERIFIED' }
    });
  } catch (error) {
    console.error('UIDAI Mock API Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify with UIDAI servers' },
      { status: 500 }
    );
  }
}
