import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { Article } from '@/types';
import { articlesDataManager } from '@/lib/articles-data';

// GET - Buscar artigo específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = articlesDataManager.getArticleById(params.id);
    
    if (!article) {
      return NextResponse.json(
        { message: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
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

    const currentArticle = articlesDataManager.getArticleById(params.id);
    
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
      const existingArticle = articlesDataManager.getArticleBySlug(updateData.slug);
      if (existingArticle && existingArticle.id !== params.id) {
        return NextResponse.json(
          { message: 'Slug já existe' },
          { status: 400 }
        );
      }
    }
    
    // Atualizar o artigo
    const updatedFields = {
      title: updateData.title,
      slug: updateData.slug || currentArticle.slug,
      excerpt: updateData.excerpt || currentArticle.excerpt,
      content: updateData.content,
      featuredImage: updateData.featuredImage || currentArticle.featuredImage,
      category: updateData.category || currentArticle.category,
      tags: updateData.tags || currentArticle.tags,
      status: updateData.status || currentArticle.status,
      readingTime: updateData.readingTime || currentArticle.readingTime,
      updatedAt: new Date().toISOString(),
      seo: {
        title: updateData.title,
        description: updateData.excerpt || currentArticle.excerpt,
        keywords: updateData.tags?.map((t: any) => t.name) || currentArticle.seo.keywords
      }
    };

    const success = articlesDataManager.updateArticle(params.id, updatedFields);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Erro ao atualizar artigo' },
        { status: 500 }
      );
    }

    const updatedArticle = articlesDataManager.getArticleById(params.id);

    return NextResponse.json({
      message: 'Artigo atualizado com sucesso',
      article: updatedArticle
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

    const success = articlesDataManager.deleteArticle(params.id);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

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

