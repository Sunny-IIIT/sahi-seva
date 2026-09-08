import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // SECURE FILE UPLOAD CONSTRAINTS
    // ─────────────────────────────────────────────────────────────────────────────
    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSizeBytes = 2 * 1024 * 1024; // Strictly capped at 2MB

    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, JPEG, and PNG are allowed.' },
        { status: 400 }
      );
    }

    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: 'File size exceeds the strict 2MB limit.' },
        { status: 400 }
      );
    }

    // Process file upload here (e.g. pipe to Supabase Storage)
    // For now, mock a successful upload response
    
    return NextResponse.json({ 
      success: true, 
      url: 'https://mock-storage.com/verified-kyc.pdf'
    });

  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
