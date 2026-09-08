import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const bookingId = formData.get('bookingId') as String;
    const file = formData.get('file') as File;

    if (!bookingId || !file) {
      return NextResponse.json({ error: 'Missing bookingId or file' }, { status: 400 });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // In a real app, upload the file to Supabase Storage here.
    // const { data, error } = await supabase.storage.from('overrides').upload(`${bookingId}/${file.name}`, file)
    const mockVisualProofUrl = `https://sahiseva.mockstorage.com/overrides/${bookingId}/visual-proof.jpg`;

    // Forcefully transition the booking to IN_PROGRESS via the Override Protocol
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId.toString() },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        visualProofUrl: mockVisualProofUrl
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Visual Override Accepted. Booking is now IN_PROGRESS.',
      booking: updatedBooking
    }, { status: 200 });

  } catch (error: any) {
    console.error('Visual Override Error:', error);
    return NextResponse.json({ error: 'Failed to execute Visual Override' }, { status: 500 });
  }
}
