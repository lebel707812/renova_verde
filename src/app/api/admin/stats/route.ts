import { NextRequest, NextResponse } from 'next/server';
import { mockArticles, mockAuthors } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    // Calcular estatísticas baseadas nos dados mock
    const totalArticles = mockArticles.length;
    const publishedArticles = mockArticles.filter(article => article.status === 'published').length;
    const draftArticles = totalArticles - publishedArticles;
    
    const totalViews = mockArticles.reduce((sum, article) => sum + (article.views || 0), 0);
    const totalLikes = mockArticles.reduce((sum, article) => sum + (article.likes || 0), 0);
    const totalAuthors = mockAuthors.length;

    const stats = {
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews,
      totalLikes,
      totalAuthors
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

