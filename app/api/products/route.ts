import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const availability = searchParams.get('availability') || undefined;
  const featured = searchParams.get('featured');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const skip = (page - 1) * limit;

  const { prisma } = await import('@/lib/prisma');
  const { ProductAvailability } = await import('@prisma/client');

  const where: any = {};
  if (category) where.category = { equals: category, mode: 'insensitive' };
  if (availability && Object.values(ProductAvailability).includes(availability as any)) {
    where.availability = availability;
  }
  if (featured != null) where.featured = featured === 'true';
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    count: products.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: products,
  });
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const body = await req.json();
  const { name, slug, category, description, price, availability, images, specs, featured } = body;

  if (!name || !category || !description) {
    return NextResponse.json(
      { success: false, error: 'Name, category, and description are required' },
      { status: 400 }
    );
  }

  const generatedSlug =
    slug ||
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const { prisma } = await import('@/lib/prisma');
  const { ProductAvailability } = await import('@prisma/client');

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug: generatedSlug,
        category,
        description,
        price: price !== undefined && price !== null ? parseFloat(price) : null,
        availability: availability || ProductAvailability.IN_STOCK,
        images: Array.isArray(images) ? images : images ? [images] : [],
        specs: specs || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(
      { success: true, message: 'Product created successfully', data: product },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 400 }
      );
    }
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}
