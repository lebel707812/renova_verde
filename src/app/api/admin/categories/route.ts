import { NextRequest, NextResponse } from 'next/server';

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
    return NextResponse.json({
      categories: hardcodedCategories,
      total: hardcodedCategories.length
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    // Simular criação de nova categoria
    const newCategory = {
      id: hardcodedCategories.length + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      color: '#1a3f32'
    };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

