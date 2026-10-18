import { PrismaNeonHTTP } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';

// Use Neon's HTTP adapter — the correct approach for serverless environments
// (Netlify Functions, Vercel, etc.) where persistent WebSocket connections are unavailable.
function createPrismaClient() {
  const sql = neon(process.env.DATABASE_URL!);
  const adapter = new PrismaNeonHTTP(sql);
  return new PrismaClient({ adapter } as any);
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// In development, reuse across hot reloads to avoid connection exhaustion.
// In production serverless, a new client is created per cold start (correct behavior).
export const prisma =
  process.env.NODE_ENV === 'production'
    ? createPrismaClient()
    : (globalForPrisma.prisma ?? (globalForPrisma.prisma = createPrismaClient()));
