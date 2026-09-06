import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

// Static fallback data used when the database is unavailable
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

function isDbError(error: any): boolean {
  return (
    error?.errorCode !== undefined ||
    error?.message?.includes('connect') ||
    error?.message?.includes('database') ||
    error?.message?.includes('ECONNREFUSED') ||
    error?.code === 'P1001' ||
    error?.code === 'P1002'
  );
}

export async function GET(_req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    console.warn('DB unavailable for /api/services — serving static fallback:', error?.message);
    return NextResponse.json({
      success: true,
      count: FALLBACK_SERVICES.length,
      data: FALLBACK_SERVICES,
      _fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const { prisma } = await import('@/lib/prisma');
    const body = await req.json();
    const { title, slug, shortDescription, fullDescription, icon, image, features, order } = body;

    if (!title || !shortDescription || !fullDescription) {
      return NextResponse.json(
        { success: false, error: 'Title, shortDescription, and fullDescription are required' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const service = await prisma.service.create({
      data: {
        title,
        slug: generatedSlug,
        shortDescription,
        fullDescription,
        icon: icon || null,
        image: image || null,
        features: features || [],
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Service created successfully', data: service },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating service:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'A service with this slug or title already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
