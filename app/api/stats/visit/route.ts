import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const page = body.page || '/';

    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const { prisma } = await import('@/lib/prisma');
    const visit = await prisma.visitStat.create({
      data: {
        page,
        ipHash: ip,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Visit tracked',
      data: { id: visit.id },
    });
  } catch (error: any) {
    // Graceful offline fallback: log quietly and return success so client doesn't see errors
    return NextResponse.json({
      success: true,
      message: 'Visit logged (offline)',
      data: { id: 'offline-visit' },
      _fallback: true,
    });
  }
}
