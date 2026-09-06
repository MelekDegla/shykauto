import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const contentType = req.headers.get('content-type') || '';

    let filename = '';
    let buffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = (formData.get('file') || formData.get('image')) as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided in form-data (key should be "file" or "image")' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      filename = `${Date.now()}_${originalName}`;
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      const { base64, fileName: name } = body;

      if (!base64) {
        return NextResponse.json(
          { success: false, error: 'Base64 string is required in JSON payload' },
          { status: 400 }
        );
      }

      const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let base64Data = base64;
      let ext = 'png';

      if (matches && matches.length === 3) {
        const mime = matches[1];
        ext = mime.split('/')[1] || 'png';
        base64Data = matches[2];
      }

      buffer = Buffer.from(base64Data, 'base64');
      const safeName = (name || 'upload').replace(/[^a-zA-Z0-9.-]/g, '_');
      filename = `${Date.now()}_${safeName}.${ext}`;
    } else {
      return NextResponse.json(
        { success: false, error: 'Unsupported Content-Type. Use multipart/form-data or application/json' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: publicUrl,
      filename,
    });
  } catch (error: any) {
    console.error('Error in /api/upload:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
