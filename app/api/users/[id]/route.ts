import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, hashPassword } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const body = await req.json();
  const { name, email, password, role } = body;

  try {
    const { prisma } = await import('@/lib/prisma');
    const { Role } = await import('@prisma/client');

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Utilisateur introuvable' }, { status: 404 });
    }

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role === 'USER' ? Role.USER : Role.ADMIN;
    if (password && password.trim().length > 0) {
      data.password = await hashPassword(password);
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, message: 'Utilisateur mis à jour', data: updated });
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Cet email est déjà utilisé' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;

  // Prevent deleting yourself
  if (auth.payload?.userId === id) {
    return NextResponse.json({ success: false, error: 'Vous ne pouvez pas supprimer votre propre compte' }, { status: 400 });
  }

  try {
    const { prisma } = await import('@/lib/prisma');

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Utilisateur introuvable' }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
