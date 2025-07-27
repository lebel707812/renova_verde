import { NextRequest, NextResponse } from 'next/server';
import { mockArticles, mockAuthors, mockCategories } from '@/lib/mock-data';

// Simulando dados de artigos com estrutura compatível com o dashboard
const transformArticleForAdmin = (article: any) => ({
  id: parseInt(article.id),
  title: article.title,
  slug: article.slug,
  status: article.status,
  views: article.views || 0,
  likes: article.likes || 0,
  category: {
    id: parseInt(article.category.id),
    name: article.category.name,
    color: article.category.color
  },
  author: {
    id: parseInt(article.author.id),
    name: article.author.name
  },
  created_at: article.publishedAt,
  updated_at: article.updatedAt
});

export async function GET(request: NextRequest) {
  try {
    // Transformar os dados mock para o formato esperado pelo dashboard
    const transformedArticles = mockArticles.map(transformArticleForAdmin);
    
    // Ordenar por data de criação (mais recentes primeiro)
    const sortedArticles = transformedArticles.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      articles: sortedArticles,
      total: sortedArticles.length,
      page: 1,
      per_page: 50
    });
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Esta é uma simulação - em produção, você removeria do banco de dados
  return NextResponse.json({ success: true });
}

