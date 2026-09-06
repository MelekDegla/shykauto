import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

const FALLBACK_MESSAGES = [
  {
    id: 'msg1',
    fullName: 'Sami Ben Ali',
    email: 'sami.benali@company.tn',
    phone: '+216 98 123 456',
    companyName: 'Express Logistics',
    vehicleType: 'Renault Master L3H2',
    serviceType: 'Installation Frigorifique',
    message: "Bonjour, j'aimerais obtenir un devis pour l'installation d'un groupe frigorifique négatif (-20°C) sur deux camionnettes.",
    status: 'NEW',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'msg2',
    fullName: 'Karim Mansouri',
    email: 'k.mansouri@pharmatransport.com',
    phone: '+216 22 987 654',
    companyName: 'Pharma Transport',
    vehicleType: 'Peugeot Partner',
    serviceType: 'Transformation Isotherme',
    message: 'Demande de tarif et délais pour isolation cabine conforme transport de médicaments (+15°C à +25°C).',
    status: 'READ',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const { prisma } = await import('@/lib/prisma');
    const where: any = {};
    if (status && ['NEW', 'READ', 'ARCHIVED'].includes(status)) {
      where.status = status;
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = await prisma.message.count({
      where: { status: 'NEW' as any },
    });

    return NextResponse.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error: any) {
    console.warn('DB unavailable for /api/messages — using fallback data');
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const filtered = status
      ? FALLBACK_MESSAGES.filter((m) => m.status === status)
      : FALLBACK_MESSAGES;
    const unread = FALLBACK_MESSAGES.filter((m) => m.status === 'NEW').length;

    return NextResponse.json({
      success: true,
      count: filtered.length,
      unreadCount: unread,
      data: filtered,
      _fallback: true,
    });
  }
}
