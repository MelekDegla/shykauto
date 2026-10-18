import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { prisma } = await import('@/lib/prisma');

  const project = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!project) {
    return NextResponse.json({ success: false, error: 'Projet introuvable' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: project });
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
  const { ProjectType } = await import('@prisma/client');

  const validProjectTypes = ['BEFORE_AFTER', 'SIMPLE', 'CAROUSEL'];
  const resolvedType = body.type && validProjectTypes.includes(body.type) ? body.type : undefined;
  const prismaType =
    resolvedType && Object.values(ProjectType).includes(resolvedType as any)
      ? (resolvedType as any)
      : undefined;

  try {
    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Projet introuvable' }, { status: 404 });
    }

    const updated = await prisma.project.update({
      where: { id: existing.id },
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        type: prismaType,
        description: body.description,
        client: body.client,
        images: body.images !== undefined ? (Array.isArray(body.images) ? body.images : [body.images]) : undefined,
        beforeImage: body.beforeImage,
        afterImage: body.afterImage,
        date: body.date,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      data: updated,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Projet introuvable' }, { status: 404 });
    }
    console.error('Error updating project:', error);
    return NextResponse.json({ success: false, error: 'Erreur base de données' }, { status: 500 });
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

  try {
    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Projet introuvable' }, { status: 404 });
    }

    await prisma.project.delete({ where: { id: existing.id } });
    return NextResponse.json({ success: true, message: 'Projet supprimé avec succès' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Projet introuvable' }, { status: 404 });
    }
    console.error('Error deleting project:', error);
    return NextResponse.json({ success: false, error: 'Erreur base de données' }, { status: 500 });
  }
}
