import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Article, Author, Category, Tag } from '@/types';

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Função para converter artigo do Prisma para o tipo Article
function convertPrismaToArticle(prismaArticle: any): Article {
  return {
    id: prismaArticle.id,
    title: prismaArticle.title,
    slug: prismaArticle.slug,
    excerpt: prismaArticle.excerpt || '',
    content: prismaArticle.content,
    featuredImage: prismaArticle.featuredImage,
    author: {
      id: prismaArticle.author.id,
      name: prismaArticle.author.name,
      bio: prismaArticle.author.bio,
      avatar: prismaArticle.author.avatar,
      social: {
        twitter: prismaArticle.author.twitter,
        linkedin: prismaArticle.author.linkedin,
        website: prismaArticle.author.website,
      }
    },
    category: {
      id: prismaArticle.category.id,
      name: prismaArticle.category.name,
      slug: prismaArticle.category.slug,
      description: prismaArticle.category.description,
      color: prismaArticle.category.color,
      icon: prismaArticle.category.icon,
    },
    tags: prismaArticle.tags.map((articleTag: any) => ({
      id: articleTag.tag.id,
      name: articleTag.tag.name,
      slug: articleTag.tag.slug,
    })),
    publishedAt: prismaArticle.publishedAt?.toISOString() || prismaArticle.createdAt.toISOString(),
    updatedAt: prismaArticle.updatedAt.toISOString(),
    readingTime: prismaArticle.readingTime,
    seo: {
      title: prismaArticle.seoTitle || prismaArticle.title,
      description: prismaArticle.seoDescription || prismaArticle.excerpt || '',
      keywords: prismaArticle.seoKeywords ? prismaArticle.seoKeywords.split(',') : [],
      ogImage: prismaArticle.ogImage,
      canonicalUrl: prismaArticle.canonicalUrl,
      noIndex: prismaArticle.noIndex,
    },
    status: prismaArticle.status.toLowerCase() as 'draft' | 'published' | 'archived',
    views: prismaArticle.views,
    likes: prismaArticle.likes,
  };
}

// GET - Listar artigos
export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const convertedArticles = articles.map(convertPrismaToArticle);

    return NextResponse.json({
      articles: convertedArticles,
      total: articles.length
    });
  } catch (error) {
    console.error('Erro ao listar artigos:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar novo artigo
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token de autorização necessário' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }

    const articleData = await request.json();
    
    // Validações básicas
    if (!articleData.title || !articleData.content) {
      return NextResponse.json(
        { message: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se o slug já existe
    const existingArticle = await prisma.article.findUnique({
      where: { slug: articleData.slug }
    });

    if (existingArticle) {
      return NextResponse.json(
        { message: 'Slug já existe' },
        { status: 400 }
      );
    }

    // Buscar ou criar autor padrão
    let author = await prisma.author.findFirst({
      where: { name: 'Equipe Renova Verde' }
    });

    if (!author) {
      author = await prisma.author.create({
        data: {
          name: 'Equipe Renova Verde',
          bio: 'Especialistas em sustentabilidade e jardinagem urbana',
          avatar: '/images/avatar-admin.jpg'
        }
      });
    }

    // Criar o artigo
    const newArticle = await prisma.article.create({
      data: {
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt || '',
        content: articleData.content,
        featuredImage: articleData.featuredImage,
        readingTime: articleData.readingTime || 5,
        status: articleData.status === 'published' ? 'PUBLISHED' : 'DRAFT',
        seoTitle: articleData.title,
        seoDescription: articleData.excerpt || '',
        seoKeywords: articleData.tags?.map((t: any) => t.name).join(',') || '',
        authorId: author.id,
        categoryId: articleData.categoryId || 'jardinagem-urbana',
        publishedAt: articleData.status === 'published' ? new Date() : null,
      },
      include: {
        author: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Criar relações com tags
    if (articleData.tags && articleData.tags.length > 0) {
      await Promise.all(
        articleData.tags.map((tag: any) =>
          prisma.articleTag.create({
            data: {
              articleId: newArticle.id,
              tagId: tag.id,
            },
          })
        )
      );
    }

    // Buscar o artigo completo com as tags
    const completeArticle = await prisma.article.findUnique({
      where: { id: newArticle.id },
      include: {
        author: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const convertedArticle = convertPrismaToArticle(completeArticle);

    return NextResponse.json({
      message: 'Artigo criado com sucesso',
      article: convertedArticle
    });

  } catch (error) {
    console.error('Erro ao criar artigo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

