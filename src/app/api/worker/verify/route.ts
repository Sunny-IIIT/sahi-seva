import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client for Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const skillsString = formData.get('skills') as string | null;

    if (!file || !skillsString) {
      return NextResponse.json({ error: 'Missing file or skills data' }, { status: 400 });
    }

    const skills = JSON.parse(skillsString);

    // 1. Upload to Supabase Storage Bucket ('certificates')
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename to prevent overwrites
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase Storage Error:', uploadError);
      throw new Error('Failed to upload certificate to secure storage.');
    }

    // 2. Retrieve the Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('certificates')
      .getPublicUrl(fileName);

    // 3. Update Prisma Worker Record
    // For demo purposes, we will just update the first worker in the database
    // In production, you would extract workerId from the auth session JWT
    const firstWorker = await prisma.worker.findFirst();
    if (!firstWorker) {
      throw new Error("No worker found in database to update.");
    }

    const updatedWorker = await prisma.worker.update({
      where: { id: firstWorker.id },
      data: {
        certificateUrl: publicUrl,
        skills: skills,
        verificationStatus: 'PENDING'
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Certificate uploaded and profile sent for admin review.',
        data: {
          workerId: updatedWorker.id,
          verificationStatus: updatedWorker.verificationStatus,
          url: publicUrl
        }
      }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Verification API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
