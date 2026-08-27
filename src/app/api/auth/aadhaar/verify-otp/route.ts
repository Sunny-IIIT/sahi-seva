import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aadhaarNumber, otp } = body;

    // High-impact delay for demo realism
    await new Promise(r => setTimeout(r, 1500));

    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      return NextResponse.json(
        { error: 'Invalid Aadhaar Number.' },
        { status: 400 }
      );
    }

    if (otp === '123456') {
      return NextResponse.json({
        status: 'success',
        data: { kycStatus: 'VERIFIED' }
      });
    }

    return NextResponse.json(
      { error: 'Invalid OTP. Please try again.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('UIDAI Verify OTP Mock API Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with UIDAI servers' },
      { status: 500 }
    );
  }
}
