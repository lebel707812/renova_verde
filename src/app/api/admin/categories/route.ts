import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar categorias
export async function GET(request: NextRequest) {
  try {
    console.log('Tentando carregar categorias...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    
    // Teste de conexão
    await prisma.$connect();
    console.log('Conexão com banco estabelecida');
    
    let categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    console.log('Categorias encontradas:', categories.length);
    console.log('Categorias:', categories);

    // Solução temporária: se não encontrar categorias, retornar categorias padrão
    if (categories.length === 0) {
      console.log('Usando categorias padrão temporárias');
      categories = [
        {
          id: 'jardinagem-urbana',
          name: 'Jardinagem Urbana',
          slug: 'jardinagem-urbana',
          description: 'Dicas para cultivar plantas em espaços urbanos',
          color: '#22c55e',
          icon: '🌱',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'energia-renovavel',
          name: 'Energia Renovável',
          slug: 'energia-renovavel',
          description: 'Soluções sustentáveis de energia',
          color: '#3b82f6',
          icon: '⚡',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'reformas-ecologicas',
          name: 'Reformas Ecológicas',
          slug: 'reformas-ecologicas',
          description: 'Reformas sustentáveis para sua casa',
          color: '#f59e0b',
          icon: '🏠',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
    }

    return NextResponse.json({
      categories: categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor', error: error.message },
      { status: 500 }
    );
  }
}

