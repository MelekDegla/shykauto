import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

const FALLBACK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Compresseur Frigorifique QP7H15 Heavy Duty',
    slug: 'compresseur-qp7h15-heavy-duty',
    category: 'Pièces de climatisation auto',
    description: 'Compresseur 7 pistons à cylindrée fixe 155cc avec embrayage électromagnétique renforcé.',
    price: 1250.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Cylindrée': '155 cc/rev', 'Tension': '12V / 24V', 'Fluides': 'R134a, R452A' },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'Condensateur Micro-canaux CC-842-HD',
    slug: 'condensateur-micro-canaux-cc-842-hd',
    category: 'Pièces de climatisation auto',
    description: "Échangeur thermique ultra-performant à micro-canaux en alliage d'aluminium.",
    price: 480.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'],
    specs: { "Débit d'air": '1,850 m³/h', 'Pression max': '32 bar' },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    name: 'Kit Frigorifique SHYK ARCTIC C-350X',
    slug: 'kit-frigorifique-shyk-arctic-c-350x',
    category: 'Kits frigorifiques',
    description: "Groupe frigorifique de toit à entraînement direct poulie moteur pour fourgons jusqu'à 18 m³.",
    price: 3850.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Puissance à 0°C': '3,850 W', 'Volume max': '18 m³' },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    name: 'Groupe Mixte SHYK POLARIS E-500 Standby',
    slug: 'groupe-mixte-shyk-polaris-e-500-standby',
    category: 'Kits frigorifiques',
    description: 'Système frigorifique à double motorisation route + prise secteur 380V Triphasé.',
    price: 5900.0,
    availability: 'ON_REQUEST',
    images: ['https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Puissance à 0°C': '4,950 W', 'Secteur': '380V Triphasé' },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p5',
    name: 'Panneau Polyuréthane Isotherme 80mm',
    slug: 'panneau-polyurethane-isotherme-80mm',
    category: 'Matériel pour cabines isothermes',
    description: 'Panneau sandwich isolant moulé haute densité avec peau polyester blanche.',
    price: 180.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Épaisseur': '80 mm', 'Conductivité': 'λ = 0.022 W/m.K' },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    name: 'Bouteille Gaz Frigorifique R452A (10kg)',
    slug: 'bouteille-gaz-frigorifique-r452a-10kg',
    category: 'Pièces de climatisation auto',
    description: 'Fluide frigorigène R452A conforme F-Gas à faible GWP.',
    price: 320.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Contenance': '10 kg', 'Pureté': '99.9%' },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p7',
    name: 'Thermostat Numérique & Data Logger',
    slug: 'thermostat-numerique-data-logger',
    category: 'Accessoires véhicules',
    description: 'Afficheur numérique de cabine avec enregistreur de température.',
    price: 450.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Sondes': '2 x NTC IP68', 'Mémoire': '32,000 enregistrements' },
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
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (product) {
      return NextResponse.json({ success: true, data: product });
    }
  } catch (error: any) {
    console.warn(`DB unavailable for /api/products/${id} — using fallback`);
  }

  const fallback = FALLBACK_PRODUCTS.find((p) => p.id === id || p.slug === id);
  if (fallback) {
    return NextResponse.json({ success: true, data: fallback, _fallback: true });
  }

  return NextResponse.json(
    { success: false, error: 'Product not found' },
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
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
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

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
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
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Service indisponible' },
      { status: 503 }
    );
  }
}
