import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { getLocalProjectById, updateLocalProject, deleteLocalProject } from '@/lib/localStore';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { prisma } = await import('@/lib/prisma');
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (project) {
      return NextResponse.json({ success: true, data: project });
    }
  } catch (error: any) {
    console.warn(`DB unavailable for /api/projects/${id} — using local store`);
  }

  const localProject = getLocalProjectById(id);
  if (localProject) {
    return NextResponse.json({ success: true, data: localProject, _localStore: true });
  }

  return NextResponse.json(
    { success: false, error: 'Projet introuvable' },
    { status: 404 }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const { prisma } = await import('@/lib/prisma');
    const { ProjectType } = await import('@prisma/client');

    const validProjectTypes = ['BEFORE_AFTER', 'SIMPLE', 'CAROUSEL'];
    const resolvedType = body.type && validProjectTypes.includes(body.type)
      ? body.type
      : undefined;

    const prismaType = resolvedType && Object.values(ProjectType).includes(resolvedType as any)
      ? (resolvedType as any)
      : undefined;

    const updated = await prisma.project.update({
      where: { id },
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

    // Mirror to local store
    updateLocalProject(id, body);

    return NextResponse.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      data: updated,
    });
  } catch (dbError: any) {
    console.warn(`DB update failed for /api/projects/${id}, updating local store:`, dbError?.message);

    const localUpdated = updateLocalProject(id, body);
    if (localUpdated) {
      return NextResponse.json({
        success: true,
        message: 'Projet mis à jour avec succès dans le stockage persistant',
        data: localUpdated,
        _localStore: true,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Projet introuvable' },
      { status: 404 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  const { id } = await params;

  try {
    const { prisma } = await import('@/lib/prisma');
    await prisma.project.delete({ where: { id } });

    // Also remove from local store
    deleteLocalProject(id);

    return NextResponse.json({
      success: true,
      message: 'Projet supprimé avec succès',
    });
  } catch (dbError: any) {
    console.warn(`DB delete failed for /api/projects/${id}, removing from local store:`, dbError?.message);

    const deleted = deleteLocalProject(id);
    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'Projet supprimé avec succès du stockage local',
        _localStore: true,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Projet introuvable' },
      { status: 404 }
    );
  }
}
