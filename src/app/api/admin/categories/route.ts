import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Categorias hardcoded como fallback
const HARDCODED_CATEGORIES = [
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
  },
  {
    id: 'sustentabilidade-geral',
    name: 'Sustentabilidade Geral',
    slug: 'sustentabilidade-geral',
    description: 'Práticas gerais de sustentabilidade',
    color: '#10b981',
    icon: '♻️',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// GET - Listar categorias
export async function GET(request: NextRequest) {
  try {
    console.log('Tentando carregar categorias...');
    
    let categories = [];
    
    try {
      // Tentar carregar do banco primeiro
      await prisma.$connect();
      console.log('Conexão com banco estabelecida');
      
      categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      
      console.log('Categorias encontradas no banco:', categories.length);
    } catch (dbError) {
      console.log('Erro ao acessar banco, usando categorias hardcoded:', dbError.message);
    }

    // Se não encontrar categorias no banco, usar as hardcoded
    if (categories.length === 0) {
      console.log('Usando categorias hardcoded');
      categories = HARDCODED_CATEGORIES;
    }

    console.log('Categorias retornadas:', categories);

    return NextResponse.json({
      categories: categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Erro geral ao listar categorias:', error);
    
    // Em caso de erro, sempre retornar as categorias hardcoded
    return NextResponse.json({
      categories: HARDCODED_CATEGORIES,
      total: HARDCODED_CATEGORIES.length
    });
  }
}

