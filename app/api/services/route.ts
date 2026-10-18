import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(_req: NextRequest) {
  const { prisma } = await import('@/lib/prisma');
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ success: true, count: services.length, data: services });
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { prisma } = await import('@/lib/prisma');
  const body = await req.json();
  const { title, slug, shortDescription, fullDescription, icon, image, features, order } = body;

  if (!title || !shortDescription || !fullDescription) {
    return NextResponse.json(
      { success: false, error: 'Title, shortDescription, and fullDescription are required' },
      { status: 400 }
    );
  }

  const generatedSlug =
    slug ||
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  try {
    const service = await prisma.service.create({
      data: {
        title,
        slug: generatedSlug,
        shortDescription,
        fullDescription,
        icon: icon || null,
        image: image || null,
        features: features || [],
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Service created successfully', data: service },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'A service with this slug already exists' },
        { status: 400 }
      );
    }
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
