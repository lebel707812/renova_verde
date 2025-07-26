import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://renovaverdehub.com';
  
  // URLs estáticas
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/busca`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  try {
    // URLs dinâmicas dos artigos
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // URLs das categorias
    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/categoria/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticUrls, ...articleUrls, ...categoryUrls];
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    
    // Fallback para URLs estáticas + categorias hardcoded
    const fallbackCategoryUrls: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/categoria/jardinagem-urbana`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/categoria/energia-renovavel`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/categoria/reformas-ecologicas`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/categoria/sustentabilidade-geral`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];

    return [...staticUrls, ...fallbackCategoryUrls];
  }
}

