import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

const FALLBACK_SERVICES = [
  {
    id: 'climatisation-automobile',
    title: 'Climatisation Automobile',
    slug: 'climatisation-automobile',
    shortDescription: 'Réparation, installation complète et recharge gaz frigorifique R134a / R1234yf.',
    fullDescription: 'ShykAuto propose des prestations complètes pour la climatisation de votre véhicule. De la recherche de fuite par azote/hydrogène au remplacement du compresseur ou détendeur, nos techniciens certifiés garantissent une fraîcheur et une efficacité énergétique optimales.',
    icon: 'wind',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    features: ['Recharge gaz R134a et R1234yf', 'Détection de fuite sous pression azote', 'Remplacement compresseurs & condensateurs', 'Nettoyage et désinfection du circuit'],
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'installation-frigorifique-utilitaires',
    title: 'Installation Frigorifique pour Utilitaires',
    slug: 'installation-frigorifique-utilitaires',
    shortDescription: 'Groupes frigorifiques poulie-moteur et électriques (positif +4°C & négatif -20°C).',
    fullDescription: 'Conception et montage de groupes de froid sur-mesure pour camionnettes et camions de livraison. Nos installations respectent les normes de transport sous chaîne du froid (ATP) pour les produits alimentaires et pharmaceutiques.',
    icon: 'snowflake',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    features: ['Entraînement direct poulie moteur', 'Mode Standby secteur 220V/380V', 'Régulation électronique de température PID', 'Homologation et certificat sanitaire'],
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'transformation-cabines-isothermes',
    title: 'Transformation Cabines Isothermes',
    slug: 'transformation-cabines-isothermes',
    shortDescription: 'Isolation thermique renforcée et aménagement sur-mesure de fourgons utilitaires.',
    fullDescription: "Transformez votre véhicule utilitaire standard en caisse ou cabine isotherme haute performance. Nous installons des panneaux sandwich en mousse polyuréthane expansée haute densité avec revêtement polyester lavable.",
    icon: 'shield-check',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1200&q=80',
    features: ['Isolation polyuréthane moulée haute densité', 'Revêtement intérieur étanche et lavable', "Écoulement d'eau et plancher antidérapant", 'Conformité aux exigences HACCP'],
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'maintenance-et-depannage',
    title: 'Maintenance & Dépannage Rapide',
    slug: 'maintenance-et-depannage',
    shortDescription: "Service d'entretien préventif et dépannage d'urgence 24/7 pour flottes professionnels.",
    fullDescription: "Pour éviter la rupture de la chaîne du froid et l'immobilisation de vos véhicules commerciaux, ShykAuto met à disposition un atelier mobile de dépannage d'urgence et des contrats d'entretien préventif.",
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    features: ['Intervention rapide sur site ou atelier', "Contrats d'entretien périodique flottes", 'Banc d\'essai thermique & télémétrie', 'Stock permanent de pièces de rechange'],
    order: 3,
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
    const service = await prisma.service.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (service) {
      return NextResponse.json({ success: true, data: service });
    }
  } catch (error: any) {
    console.warn(`DB unavailable for /api/services/${id} — using fallback`);
  }

  // Fallback search
  const fallback = FALLBACK_SERVICES.find((s) => s.id === id || s.slug === id);
  if (fallback) {
    return NextResponse.json({ success: true, data: fallback, _fallback: true });
  }

  return NextResponse.json(
    { success: false, error: 'Service not found' },
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
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        slug: body.slug !== undefined ? body.slug : existing.slug,
        shortDescription: body.shortDescription !== undefined ? body.shortDescription : existing.shortDescription,
        fullDescription: body.fullDescription !== undefined ? body.fullDescription : existing.fullDescription,
        icon: body.icon !== undefined ? body.icon : existing.icon,
        image: body.image !== undefined ? body.image : existing.image,
        features: body.features !== undefined ? body.features : (existing.features as any),
        order: body.order !== undefined ? Number(body.order) : existing.order,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
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
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    await prisma.service.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Service indisponible' },
      { status: 503 }
    );
  }
}
