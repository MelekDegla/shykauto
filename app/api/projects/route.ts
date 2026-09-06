import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

const FALLBACK_PROJECTS = [
  {
    id: 'proj1',
    title: 'Transformation Isotherme & Groupe Frigo - Renault Master',
    slug: 'transformation-isotherme-renault-master',
    category: 'Fourgons transformés',
    type: 'BEFORE_AFTER',
    description: "Transformation d'un fourgon tôle standard Renault Master L2H2 en véhicule isotherme frigorifique classe FRC (-20°C) pour traiteur.",
    client: 'Société Traiteur Prestige',
    images: [],
    beforeImage: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    date: '2026-02',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj2',
    title: 'Rénovation Complète Système Clim - Autocar Mercedes',
    slug: 'renovation-clim-autocar-mercedes',
    category: 'Installations clim auto',
    type: 'BEFORE_AFTER',
    description: "Remise en état d'un circuit de climatisation plafonnier 28kW endommagé avec compresseur grippé et fuites multiples.",
    client: 'Transport Voyageurs Express',
    images: [],
    beforeImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80',
    date: '2026-04',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj3',
    title: 'Équipement Flotte Camions Frigorifiques Isuzu 3.5T',
    slug: 'flotte-camions-frigorifiques-isuzu',
    category: 'Camions frigorifiques',
    type: 'SIMPLE',
    description: "Installation de 5 groupes frigorifiques SHYK Polaris E-500 avec fonction Standby triphasée pour produits de mer.",
    client: 'Pêcheries de la Côte',
    images: [
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
    ],
    beforeImage: null,
    afterImage: null,
    date: '2026-05',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { ProjectType } = await import('@prisma/client');

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category) where.category = { equals: category, mode: 'insensitive' };
    if (type && Object.values(ProjectType).includes(type as any)) where.type = type;
    if (featured != null) where.featured = featured === 'true';

    const projects = await prisma.project.findMany({ where, orderBy: { createdAt: 'desc' } });

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    console.warn('DB unavailable for /api/projects — serving static fallback:', error?.message);
    return NextResponse.json({
      success: true,
      count: FALLBACK_PROJECTS.length,
      data: FALLBACK_PROJECTS,
      _fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const { prisma } = await import('@/lib/prisma');
    const { ProjectType } = await import('@prisma/client');
    const body = await req.json();
    const { title, slug, category, type, description, client, images, beforeImage, afterImage, date, featured } = body;

    if (!title || !category || !description) {
      return NextResponse.json({ success: false, error: 'Title, category, and description are required' }, { status: 400 });
    }

    const projectType = type === 'BEFORE_AFTER' ? ProjectType.BEFORE_AFTER : ProjectType.SIMPLE;

    if (projectType === ProjectType.BEFORE_AFTER && (!beforeImage || !afterImage)) {
      return NextResponse.json({ success: false, error: 'BEFORE_AFTER project requires both beforeImage and afterImage' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const project = await prisma.project.create({
      data: {
        title, slug: generatedSlug, category, type: projectType, description,
        client: client || null,
        images: Array.isArray(images) ? images : (images ? [images] : []),
        beforeImage: beforeImage || null,
        afterImage: afterImage || null,
        date: date || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, message: 'Project created successfully', data: project }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'A project with this slug or title already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
