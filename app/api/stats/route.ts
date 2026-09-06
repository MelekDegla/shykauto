import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
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
        projects: { total: totalProjects, beforeAfter: beforeAfterProjects, simple: simpleProjects },
        messages: { total: totalMessages, unread: unreadMessages },
        visits: { total: totalVisits },
        recentMessages,
      },
    });
  } catch (error: any) {
    console.warn('DB unavailable for /api/stats — returning zero stats:', error?.message);
    return NextResponse.json({
      success: true,
      data: {
        products: { total: 0 },
        services: { total: 0 },
        projects: { total: 0, beforeAfter: 0, simple: 0 },
        messages: { total: 0, unread: 0 },
        visits: { total: 0 },
        recentMessages: [],
      },
      _fallback: true,
    });
  }
}
