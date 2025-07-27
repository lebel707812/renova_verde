import { NextRequest, NextResponse } from 'next/server';

// Tags hardcoded como fallback
const hardcodedTags = [
  {
    id: 1,
    name: 'Plantas',
    slug: 'plantas'
  },
  {
    id: 2,
    name: 'Energia Solar',
    slug: 'energia-solar'
  },
  {
    id: 3,
    name: 'Compostagem',
    slug: 'compostagem'
  },
  {
    id: 4,
    name: 'Reciclagem',
    slug: 'reciclagem'
  },
  {
    id: 5,
    name: 'Jardim Vertical',
    slug: 'jardim-vertical'
  },
  {
    id: 6,
    name: 'Economia de Água',
    slug: 'economia-agua'
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      tags: hardcodedTags,
      total: hardcodedTags.length
    });
  } catch (error) {
    console.error('Erro ao buscar tags:', error);
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

    // Simular criação de nova tag
    const newTag = {
      id: hardcodedTags.length + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    };

    // Adicionar à lista hardcoded para simular persistência
    hardcodedTags.push(newTag);

    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

