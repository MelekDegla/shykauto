import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { prisma } = await import('@/lib/prisma');

  const product = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const body = await req.json();
  const { prisma } = await import('@/lib/prisma');

  const existing = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  try {
    let parsedPrice: number | null | undefined = undefined;
    if (body.price !== undefined) {
      if (body.price === null || body.price === '' || isNaN(Number(body.price))) {
        parsedPrice = null;
      } else {
        parsedPrice = Number(body.price);
      }
    }

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: {
        name: body.name !== undefined ? body.name : existing.name,
        slug: body.slug !== undefined ? body.slug : existing.slug,
        category: body.category !== undefined ? body.category : existing.category,
        description: body.description !== undefined ? body.description : existing.description,
        price: parsedPrice !== undefined ? parsedPrice : existing.price,
        availability: body.availability !== undefined ? body.availability : existing.availability,
        images: body.images !== undefined ? (Array.isArray(body.images) ? body.images : [body.images]) : existing.images,
        specs: body.specs !== undefined ? body.specs : existing.specs,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
      },
    });

    return NextResponse.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Database error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const { prisma } = await import('@/lib/prisma');

  const existing = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  await prisma.product.delete({ where: { id: existing.id } });
  return NextResponse.json({ success: true, message: 'Product deleted successfully' });
}
