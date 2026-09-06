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
  {
    id: 'proj4',
    title: 'Installation Bi-Température Multi-Zone - Peugeot Boxer',
    slug: 'installation-bi-temperature-peugeot-boxer',
    category: 'Fourgons transformés',
    type: 'SIMPLE',
    description: "Installation d'une cloison amovible avec double évaporateur indépendant permettant le transport de produits frais (+4°C) et surgelés (-18°C).",
    client: 'Distrib-Bio Tunisie',
    images: [
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80'
    ],
    beforeImage: null,
    afterImage: null,
    date: '2026-06',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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
    console.warn(`DB unavailable for /api/projects/${id} — using fallback`);
  }

  const fallback = FALLBACK_PROJECTS.find((p) => p.id === id || p.slug === id);
  if (fallback) {
    return NextResponse.json({ success: true, data: fallback, _fallback: true });
  }

  return NextResponse.json(
    { success: false, error: 'Project not found' },
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
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const newType = body.type ? (body.type === 'BEFORE_AFTER' ? 'BEFORE_AFTER' : 'SIMPLE') : existing.type;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        slug: body.slug !== undefined ? body.slug : existing.slug,
        category: body.category !== undefined ? body.category : existing.category,
        type: newType as any,
        description: body.description !== undefined ? body.description : existing.description,
        client: body.client !== undefined ? body.client : existing.client,
        images: body.images !== undefined ? (Array.isArray(body.images) ? body.images : [body.images]) : existing.images,
        beforeImage: body.beforeImage !== undefined ? body.beforeImage : existing.beforeImage,
        afterImage: body.afterImage !== undefined ? body.afterImage : existing.afterImage,
        date: body.date !== undefined ? body.date : existing.date,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Service indisponible' },
      { status: 503 }
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
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Service indisponible' },
      { status: 503 }
    );
  }
}
