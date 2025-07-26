import { NextRequest, NextResponse } from 'next/server';
import { Category } from '@/types';

// Mock data para categorias
const categories: Category[] = [
  {
    id: 'jardinagem-urbana',
    name: 'Jardinagem Urbana',
    slug: 'jardinagem-urbana',
    description: 'Dicas e técnicas para jardins em espaços urbanos',
    color: '#10b981'
  },
  {
    id: 'energia-renovavel',
    name: 'Energia Renovável',
    slug: 'energia-renovavel',
    description: 'Soluções sustentáveis de energia para casa',
    color: '#f59e0b'
  },
  {
    id: 'reformas-ecologicas',
    name: 'Reformas Ecológicas',
    slug: 'reformas-ecologicas',
    description: 'Reformas sustentáveis e materiais ecológicos',
    color: '#8b5cf6'
  },
  {
    id: 'sustentabilidade',
    name: 'Sustentabilidade Geral',
    slug: 'sustentabilidade',
    description: 'Práticas sustentáveis para o dia a dia',
    color: '#06b6d4'
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

