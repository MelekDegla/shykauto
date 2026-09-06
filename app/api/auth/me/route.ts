import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized || !auth.payload) {
    return auth.response!;
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findUnique({
      where: { id: auth.payload.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    if (user) {
      return NextResponse.json({
        success: true,
        user,
      });
    }
  } catch (error: any) {
    console.warn('DB unavailable in /api/auth/me — using JWT payload fallback');
  }

  // Fallback: return verified payload from JWT
  return NextResponse.json({
    success: true,
    user: {
      id: auth.payload.userId,
      email: auth.payload.email,
      name: auth.payload.name,
      role: auth.payload.role,
      createdAt: new Date().toISOString(),
    },
    _fallback: true,
  });
}
