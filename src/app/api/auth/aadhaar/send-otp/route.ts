import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aadhaarNumber } = body;

    // High-impact delay for demo realism
    await new Promise(r => setTimeout(r, 1500));

    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      return NextResponse.json(
        { error: 'Invalid Aadhaar Number. Must be exactly 12 digits.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'OTP sent to linked mobile number ending in ****X987'
    });
  } catch (error) {
    console.error('UIDAI Send OTP Mock API Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with UIDAI servers' },
      { status: 500 }
    );
  }
}
