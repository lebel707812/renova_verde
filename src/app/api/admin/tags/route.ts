import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar tags
export async function GET(request: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      tags: tags,
      total: tags.length
    });
  } catch (error) {
    console.error('Erro ao listar tags:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar nova tag
export async function POST(request: NextRequest) {
  try {
    const tagData = await request.json();
    
    if (!tagData.name) {
      return NextResponse.json(
        { message: 'Nome da tag é obrigatório' },
        { status: 400 }
      );
    }

    // Gerar slug a partir do nome
    const slug = tagData.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Verificar se a tag já existe
    const existingTag = await prisma.tag.findUnique({
      where: { slug: slug }
    });

    if (existingTag) {
      return NextResponse.json({
        tag: existingTag
      });
    }

    // Criar nova tag
    const newTag = await prisma.tag.create({
      data: {
        name: tagData.name,
        slug: slug,
      },
    });

    return NextResponse.json({
      message: 'Tag criada com sucesso',
      tag: newTag
    });

  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

