import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Article } from '@/types';

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
      keywords: prismaArticle.seoKeywords || [],
      ogImage: prismaArticle.ogImage,
      canonicalUrl: prismaArticle.canonicalUrl,
      noIndex: prismaArticle.noIndex,
    },
    status: prismaArticle.status.toLowerCase() as 'draft' | 'published' | 'archived',
    views: prismaArticle.views,
    likes: prismaArticle.likes,
  };
}

// GET - Buscar artigo específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
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
    
    if (!article) {
      return NextResponse.json(
        { message: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    const convertedArticle = convertPrismaToArticle(article);

    return NextResponse.json({ article: convertedArticle });
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar artigo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const currentArticle = await prisma.article.findUnique({
      where: { id: params.id }
    });
    
    if (!currentArticle) {
      return NextResponse.json(
        { message: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    const updateData = await request.json();
    
    // Validações básicas
    if (!updateData.title || !updateData.content) {
      return NextResponse.json(
        { message: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se o slug já existe em outro artigo
    if (updateData.slug) {
      const existingArticle = await prisma.article.findUnique({
        where: { slug: updateData.slug }
      });
      if (existingArticle && existingArticle.id !== params.id) {
        return NextResponse.json(
          { message: 'Slug já existe' },
          { status: 400 }
        );
      }
    }
    
    // Atualizar o artigo
    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: updateData.title,
        slug: updateData.slug || currentArticle.slug,
        excerpt: updateData.excerpt || currentArticle.excerpt,
        content: updateData.content,
        featuredImage: updateData.featuredImage || currentArticle.featuredImage,
        categoryId: updateData.category?.id || currentArticle.categoryId,
        readingTime: updateData.readingTime || currentArticle.readingTime,
        status: updateData.status === 'published' ? 'PUBLISHED' : 'DRAFT',
        seoTitle: updateData.title,
        seoDescription: updateData.excerpt || currentArticle.excerpt,
        seoKeywords: updateData.tags?.map((t: any) => t.name) || [],
        publishedAt: updateData.status === 'published' && !currentArticle.publishedAt ? new Date() : currentArticle.publishedAt,
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

    // Atualizar tags
    if (updateData.tags) {
      // Remover tags existentes
      await prisma.articleTag.deleteMany({
        where: { articleId: params.id }
      });

      // Adicionar novas tags
      if (updateData.tags.length > 0) {
        await Promise.all(
          updateData.tags.map((tag: any) =>
            prisma.articleTag.create({
              data: {
                articleId: params.id,
                tagId: tag.id,
              },
            })
          )
        );
      }
    }

    // Buscar o artigo atualizado com as tags
    const completeArticle = await prisma.article.findUnique({
      where: { id: params.id },
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
      message: 'Artigo atualizado com sucesso',
      article: convertedArticle
    });

  } catch (error) {
    console.error('Erro ao atualizar artigo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir artigo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const article = await prisma.article.findUnique({
      where: { id: params.id }
    });
    
    if (!article) {
      return NextResponse.json(
        { message: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Excluir o artigo (as tags serão excluídas automaticamente devido ao cascade)
    await prisma.article.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      message: 'Artigo excluído com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir artigo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

