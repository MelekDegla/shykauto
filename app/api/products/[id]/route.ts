import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import {
  getLocalProductById,
  updateLocalProduct,
  deleteLocalProduct,
} from '@/lib/localStore';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { prisma } = await import('@/lib/prisma');
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (product) {
      return NextResponse.json({ success: true, data: product });
    }
    // product not found in DB, fall through to localStore
  } catch (error: any) {
    console.warn(`DB unavailable for GET /api/products/${id} — using localStore`);
  }

  const local = getLocalProductById(id);
  if (local) {
    return NextResponse.json({ success: true, data: local, _fallback: true });
  }

  return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const body = await req.json();

  try {
    const { prisma } = await import('@/lib/prisma');
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      // Try localStore before returning 404
      const localUpdated = updateLocalProduct(id, body);
      if (localUpdated) {
        return NextResponse.json({ success: true, message: 'Product updated (local)', data: localUpdated });
      }
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : existing.name,
        slug: body.slug !== undefined ? body.slug : existing.slug,
        category: body.category !== undefined ? body.category : existing.category,
        description: body.description !== undefined ? body.description : existing.description,
        price: body.price !== undefined ? (body.price !== null ? parseFloat(body.price) : null) : existing.price,
        availability: body.availability !== undefined ? body.availability : existing.availability,
        images: body.images !== undefined ? (Array.isArray(body.images) ? body.images : [body.images]) : existing.images,
        specs: body.specs !== undefined ? body.specs : existing.specs,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
      },
    });

    return NextResponse.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error: any) {
    console.warn(`DB unavailable for PUT /api/products/${id} — using localStore`);
    // Fallback to localStore
    const localUpdated = updateLocalProduct(id, {
      name: body.name,
      slug: body.slug,
      category: body.category,
      description: body.description,
      price: body.price !== undefined && body.price !== null ? Number(body.price) : undefined,
      availability: body.availability,
      images: Array.isArray(body.images) ? body.images : body.images ? [body.images] : undefined,
      specs: body.specs,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
    });

    if (localUpdated) {
      return NextResponse.json({ success: true, message: 'Product updated (local)', data: localUpdated });
    }

    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;

  try {
    const { prisma } = await import('@/lib/prisma');
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      // Try localStore delete before returning 404
      const deleted = deleteLocalProduct(id);
      if (deleted) {
        return NextResponse.json({ success: true, message: 'Product deleted (local)' });
      }
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    // Also remove from localStore to keep them in sync
    deleteLocalProduct(id);

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.warn(`DB unavailable for DELETE /api/products/${id} — using localStore`);
    const deleted = deleteLocalProduct(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Product deleted (local)' });
    }
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }
}
