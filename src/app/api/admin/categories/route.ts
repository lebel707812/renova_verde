import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Categorias hardcoded como fallback
const hardcodedCategories = [
  {
    id: 1,
    name: 'Jardinagem Urbana',
    slug: 'jardinagem-urbana',
    color: '#22c55e'
  },
  {
    id: 2,
    name: 'Energia Renovável',
    slug: 'energia-renovavel',
    color: '#3b82f6'
  },
  {
    id: 3,
    name: 'Sustentabilidade',
    slug: 'sustentabilidade',
    color: '#10b981'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Tentar buscar do banco de dados primeiro
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    // Se não houver categorias no banco, usar hardcoded
    const finalCategories = categories.length > 0 ? categories : hardcodedCategories;

    return NextResponse.json({
      categories: finalCategories,
      total: finalCategories.length
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    // Em caso de erro, usar fallback
    return NextResponse.json({
      categories: hardcodedCategories,
      total: hardcodedCategories.length
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const slug = name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        color: '#1a3f32'
      }
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

