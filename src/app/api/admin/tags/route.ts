import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
    // Tentar buscar do banco de dados primeiro
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    // Se não houver tags no banco, usar hardcoded
    const finalTags = tags.length > 0 ? tags : hardcodedTags;

    return NextResponse.json({
      tags: finalTags,
      total: finalTags.length
    });
  } catch (error) {
    console.error('Erro ao buscar tags:', error);
    // Em caso de erro, usar fallback
    return NextResponse.json({
      tags: hardcodedTags,
      total: hardcodedTags.length
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

    const newTag = await prisma.tag.create({
      data: {
        name,
        slug
      }
    });

    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

