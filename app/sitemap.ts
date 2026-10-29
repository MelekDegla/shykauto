import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shykauto.tn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/produits`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/realisations`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Try fetching dynamic items from NeonDB to include in sitemap
  try {
    const { prisma } = await import('@/lib/prisma');

    const [products, services, projects] = await Promise.all([
      prisma.product.findMany({
        select: { slug: true, updatedAt: true },
        take: 100,
      }).catch(() => []),
      prisma.service.findMany({
        select: { slug: true, updatedAt: true },
        take: 50,
      }).catch(() => []),
      prisma.project.findMany({
        select: { slug: true, updatedAt: true },
        take: 100,
      }).catch(() => []),
    ]);

    const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE_URL}/produits#${p.slug}`,
      lastModified: p.updatedAt || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${BASE_URL}/services#${s.slug}`,
      lastModified: s.updatedAt || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const projectUrls: MetadataRoute.Sitemap = projects.map((pr) => ({
      url: `${BASE_URL}/realisations#${pr.slug}`,
      lastModified: pr.updatedAt || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...serviceUrls, ...productUrls, ...projectUrls];
  } catch (e) {
    // Fallback cleanly to static routes if database is unreachable during sitemap build
    return staticRoutes;
  }
}
