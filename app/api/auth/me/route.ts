import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, hashPassword, signToken } from '@/lib/auth';

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
      return NextResponse.json({ success: true, user });
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

export async function PUT(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized || !auth.payload) return auth.response!;

  const body = await req.json();
  const { name, email, currentPassword, newPassword } = body;

  try {
    const { prisma } = await import('@/lib/prisma');
    const { comparePassword } = await import('@/lib/auth');

    const user = await prisma.user.findUnique({ where: { id: auth.payload.userId } });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Utilisateur introuvable' }, { status: 404 });
    }

    // If changing password, verify current password first
    if (newPassword && newPassword.trim().length > 0) {
      if (!currentPassword) {
        return NextResponse.json({ success: false, error: 'Mot de passe actuel requis pour changer le mot de passe' }, { status: 400 });
      }
      const valid = await comparePassword(currentPassword, user.password);
      if (!valid) {
        return NextResponse.json({ success: false, error: 'Mot de passe actuel incorrect' }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ success: false, error: 'Le nouveau mot de passe doit contenir au moins 8 caractères' }, { status: 400 });
      }
    }

    const data: any = {};
    if (name && name.trim()) data.name = name.trim();
    if (email && email.trim()) data.email = email.trim().toLowerCase();
    if (newPassword && newPassword.trim().length > 0) {
      data.password = await hashPassword(newPassword);
    }

    const updated = await prisma.user.update({
      where: { id: auth.payload.userId },
      data,
      select: { id: true, email: true, name: true, role: true },
    });

    // Issue a new token with updated info
    const newToken = signToken({
      userId: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
    });

    return NextResponse.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: updated,
      token: newToken,
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Cet email est déjà utilisé' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}

