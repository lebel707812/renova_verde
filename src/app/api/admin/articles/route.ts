import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { Article, Author } from '@/types';
import { articlesDataManager, mockCategories } from '@/lib/articles-data';

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// GET - Listar artigos
export async function GET(request: NextRequest) {
  try {
    const articles = articlesDataManager.getAllArticles();
    return NextResponse.json({
      articles,
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
    if (articlesDataManager.getArticleBySlug(articleData.slug)) {
      return NextResponse.json(
        { message: 'Slug já existe' },
        { status: 400 }
      );
    }

    const author: Author = {
      id: 'admin',
      name: 'Equipe Renova Verde',
      bio: 'Especialistas em sustentabilidade e jardinagem urbana',
      avatar: '/images/avatar-admin.jpg'
    };

    const newArticle: Article = {
      id: generateId(),
      title: articleData.title,
      slug: articleData.slug,
      excerpt: articleData.excerpt || '',
      content: articleData.content,
      featuredImage: articleData.featuredImage,
      author,
      category: articleData.category || mockCategories[0],
      tags: articleData.tags || [],
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readingTime: articleData.readingTime || 5,
      seo: {
        title: articleData.title,
        description: articleData.excerpt || '',
        keywords: articleData.tags?.map((t: any) => t.name) || []
      },
      status: articleData.status || 'draft',
      views: 0,
      likes: 0
    };

    articlesDataManager.addArticle(newArticle);

    return NextResponse.json({
      message: 'Artigo criado com sucesso',
      article: newArticle
    });

  } catch (error) {
    console.error('Erro ao criar artigo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

