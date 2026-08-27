import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uanNumber } = body;

    // Validate 12-digit UAN format
    if (!uanNumber || !/^\d{12}$/.test(uanNumber)) {
      return NextResponse.json(
        { error: 'Invalid UAN Number. Must be exactly 12 digits.' },
        { status: 400 }
      );
    }

    // SIH Hackathon Mock: Simulate a delay to represent a real API call to Govt Servers
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock Response Data
    const mockGovtData = {
      verified: true,
      uan: uanNumber,
      workerDemographics: {
        fullName: 'Rajesh Kumar',
        dateOfBirth: '1985-06-15',
        gender: 'Male',
        state: 'Gujarat',
        district: 'Surat',
      },
      skills: [
        { name: 'Electrical Works', ncoCode: '7113.1000' },
        { name: 'General Maintenance', ncoCode: '9312.9900' }
      ],
      kycStatus: 'COMPLETED',
      insuranceActive: true,
      welfareScheme: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(mockGovtData);
  } catch (error) {
    console.error('e-Shram Mock API Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify with e-Shram portal' },
      { status: 500 }
    );
  }
}
