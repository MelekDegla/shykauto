import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, hashPassword } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const { prisma } = await import('@/lib/prisma');
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.warn('DB unavailable for GET /api/users:', error?.message);
    return NextResponse.json({ success: false, error: 'Service indisponible' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const body = await req.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, error: 'Nom, email et mot de passe requis' }, { status: 400 });
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const { Role } = await import('@prisma/client');

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Un utilisateur avec cet email existe déjà' }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role === 'USER' ? Role.USER : Role.ADMIN,
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json({ success: true, message: 'Utilisateur créé avec succès', data: user }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Cet email est déjà utilisé' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
