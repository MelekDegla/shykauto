import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'shykauto_super_secret_jwt_key_2026_secure';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getAuthTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  const cookieToken = req.cookies.get('auth_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

export async function verifyAdminAuth(req: NextRequest): Promise<{ authorized: boolean; payload?: TokenPayload; response?: NextResponse }> {
  const token = getAuthTokenFromRequest(req);

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: 'Unauthorized: Missing token' },
        { status: 401 }
      ),
    };
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') {
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, payload };
}
