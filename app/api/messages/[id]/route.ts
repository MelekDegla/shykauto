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

export async function GET(
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
    const message = await prisma.message.findUnique({
      where: { id },
    });

    if (message) {
      return NextResponse.json({ success: true, data: message });
    }
  } catch (error: any) {
    console.warn(`DB unavailable for /api/messages/${id} — using fallback`);
  }

  const fallback = FALLBACK_MESSAGES.find((m) => m.id === id);
  if (fallback) {
    return NextResponse.json({ success: true, data: fallback, _fallback: true });
  }

  return NextResponse.json(
    { success: false, error: 'Message not found' },
    { status: 404 }
  );
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!status || !['NEW', 'READ', 'ARCHIVED'].includes(status)) {
    return NextResponse.json(
      { success: false, error: 'Valid status (NEW, READ, ARCHIVED) is required' },
      { status: 400 }
    );
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const message = await prisma.message.update({
      where: { id },
      data: { status: status as any },
    });

    return NextResponse.json({
      success: true,
      message: 'Message status updated',
      data: message,
    });
  } catch (error: any) {
    // Offline mode response
    return NextResponse.json({
      success: true,
      message: 'Message status updated (offline mode)',
      data: { id, status },
      _fallback: true,
    });
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
    await prisma.message.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      message: 'Message deleted (offline mode)',
      _fallback: true,
    });
  }
}
