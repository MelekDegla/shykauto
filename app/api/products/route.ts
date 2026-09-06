import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

const FALLBACK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Compresseur Frigorifique QP7H15 Heavy Duty',
    slug: 'compresseur-qp7h15',
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
    slug: 'condensateur-cc-842',
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
    slug: 'kit-shyk-arctic-c350x',
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
    slug: 'groupe-shyk-polaris-e500',
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
    slug: 'panneau-polyurethane-80mm',
    category: 'Matériel pour cabines isothermes',
    description: 'Panneau sandwich isolant moulé haute densité avec peau polyester alimentaire.',
    price: 180.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Épaisseur': '80 mm', 'Norme': 'HACCP & ATP' },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    name: 'Thermostat Numérique & Data Logger',
    slug: 'thermostat-numerique',
    category: 'Accessoires véhicules',
    description: 'Afficheur numérique de cabine avec enregistreur de température télémétrique.',
    price: 450.0,
    availability: 'IN_STOCK',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    specs: { 'Sondes': '2 x NTC IP68', 'Connectivité': 'Bluetooth / 4G' },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const { ProductAvailability } = await import('@prisma/client');

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const availability = searchParams.get('availability');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const skip = (page - 1) * limit;

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

    return NextResponse.json({ success: true, count: products.length, total, page, totalPages: Math.ceil(total / limit), data: products });
  } catch (error: any) {
    console.warn('DB unavailable for /api/products — serving static fallback:', error?.message);
    return NextResponse.json({
      success: true,
      count: FALLBACK_PRODUCTS.length,
      total: FALLBACK_PRODUCTS.length,
      page: 1,
      totalPages: 1,
      data: FALLBACK_PRODUCTS,
      _fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const { prisma } = await import('@/lib/prisma');
    const { ProductAvailability } = await import('@prisma/client');
    const body = await req.json();
    const { name, slug, category, description, price, availability, images, specs, featured } = body;

    if (!name || !category || !description) {
      return NextResponse.json({ success: false, error: 'Name, category, and description are required' }, { status: 400 });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = await prisma.product.create({
      data: {
        name, slug: generatedSlug, category, description,
        price: price !== undefined && price !== null ? parseFloat(price) : null,
        availability: availability || ProductAvailability.IN_STOCK,
        images: Array.isArray(images) ? images : (images ? [images] : []),
        specs: specs || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, message: 'Product created successfully', data: product }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'A product with this slug or name already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
