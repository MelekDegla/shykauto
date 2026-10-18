import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { prisma } = await import('@/lib/prisma');

  const [
    totalProducts, totalServices, totalProjects,
    beforeAfterProjects, simpleProjects,
    totalMessages, unreadMessages, totalVisits,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.service.count(),
    prisma.project.count(),
    prisma.project.count({ where: { type: 'BEFORE_AFTER' } }),
    prisma.project.count({ where: { type: 'SIMPLE' } }),
    prisma.message.count(),
    prisma.message.count({ where: { status: 'NEW' } }),
    prisma.visitStat.count(),
  ]);

  const carouselProjects = await prisma.project.count({ where: { type: 'CAROUSEL' as any } }).catch(() => 0);

  const recentMessages = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, fullName: true, email: true, serviceType: true, status: true, createdAt: true },
  });

  return NextResponse.json({
    success: true,
    data: {
      products: { total: totalProducts },
      services: { total: totalServices },
      projects: {
        total: totalProjects,
        beforeAfter: beforeAfterProjects,
        simple: simpleProjects,
        carousel: carouselProjects,
      },
      messages: { total: totalMessages, unread: unreadMessages },
      visits: { total: totalVisits },
      recentMessages,
    },
  });
}
