import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, signToken } from '@/lib/auth';

const DEMO_ADMIN = {
  id: 'demo-admin-id',
  email: 'admin@shykauto.com',
  name: 'Admin ShykAuto',
  role: 'ADMIN',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      const { prisma } = await import('@/lib/prisma');
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (user) {
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return NextResponse.json(
            { success: false, error: 'Invalid email or password' },
            { status: 401 }
          );
        }

        const tokenPayload = {
          userId: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };

        const token = signToken(tokenPayload);

        const response = NextResponse.json({
          success: true,
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });

        // Set HTTP-Only Cookie
        response.cookies.set('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/',
        });

        return response;
      }
    } catch (dbError: any) {
      console.warn('DB unavailable in /api/auth/login — falling back to demo admin check:', dbError?.message);
    }

    // Demo admin fallback for offline / local testing without running PostgreSQL
    if (normalizedEmail === 'admin@shykauto.com' && password === 'Admin@123456') {
      const token = signToken({
        userId: DEMO_ADMIN.id,
        email: DEMO_ADMIN.email,
        role: DEMO_ADMIN.role,
        name: DEMO_ADMIN.name,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Login successful (Demo Mode)',
        token,
        user: DEMO_ADMIN,
        _demoMode: true,
      });

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Error in /api/auth/login:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
