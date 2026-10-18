import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const type = searchParams.get('type') || undefined;
  const featured = searchParams.get('featured');
  const featuredBool = featured != null ? featured === 'true' : undefined;

  const { prisma } = await import('@/lib/prisma');
  const { ProjectType } = await import('@prisma/client');

  const where: any = {};
  if (category) where.category = { equals: category, mode: 'insensitive' };
  if (type && Object.values(ProjectType).includes(type as any)) where.type = type;
  if (featuredBool !== undefined) where.featured = featuredBool;

  const projects = await prisma.project.findMany({ where, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ success: true, count: projects.length, data: projects });
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const body = await req.json();
  const { title, slug, category, type, description, client, images, beforeImage, afterImage, date, featured } = body;

  if (!title || !category || !description) {
    return NextResponse.json(
      { success: false, error: 'Titre, catégorie et description sont requis' },
      { status: 400 }
    );
  }

  const validProjectTypes = ['BEFORE_AFTER', 'SIMPLE', 'CAROUSEL'];
  const resolvedType = validProjectTypes.includes(type) ? type : 'SIMPLE';

  if (resolvedType === 'BEFORE_AFTER' && (!beforeImage || !afterImage)) {
    return NextResponse.json(
      { success: false, error: 'Un projet AVANT / APRÈS requiert les deux images Avant et Après' },
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

  const imagesArray = Array.isArray(images) ? images : images ? [images] : [];

  const { prisma } = await import('@/lib/prisma');
  const { ProjectType } = await import('@prisma/client');

  const prismaType = Object.values(ProjectType).includes(resolvedType as any)
    ? (resolvedType as any)
    : (ProjectType as any).SIMPLE;

  try {
    const project = await prisma.project.create({
      data: {
        title,
        slug: generatedSlug,
        category,
        type: prismaType,
        description,
        client: client || null,
        images: imagesArray,
        beforeImage: beforeImage || null,
        afterImage: afterImage || null,
        date: date || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(
      { success: true, message: 'Projet créé avec succès', data: project },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
