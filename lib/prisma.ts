import { PrismaClient } from '@prisma/client';

const DEFAULT_DATABASE_URL =
  'postgresql://neondb_owner:npg_d9SvnLNGbsR8@ep-fancy-shadow-b52kplou.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: databaseUrl,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
