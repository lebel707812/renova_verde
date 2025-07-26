import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tags hardcoded como fallback
const HARDCODED_TAGS = [
  {
    id: 'plantas',
    name: 'Plantas',
    slug: 'plantas',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'energia-solar',
    name: 'Energia Solar',
    slug: 'energia-solar',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'compostagem',
    name: 'Compostagem',
    slug: 'compostagem',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'reciclagem',
    name: 'Reciclagem',
    slug: 'reciclagem',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'economia-energia',
    name: 'Economia de Energia',
    slug: 'economia-energia',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'jardim-vertical',
    name: 'Jardim Vertical',
    slug: 'jardim-vertical',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'diy',
    name: 'DIY',
    slug: 'diy',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// GET - Listar tags
export async function GET(request: NextRequest) {
  try {
    let tags = [];
    
    try {
      // Tentar carregar do banco primeiro
      tags = await prisma.tag.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      
      console.log('Tags encontradas no banco:', tags.length);
    } catch (dbError) {
      console.log('Erro ao acessar banco, usando tags hardcoded:', dbError.message);
    }

    // Se não encontrar tags no banco, usar as hardcoded
    if (tags.length === 0) {
      console.log('Usando tags hardcoded');
      tags = HARDCODED_TAGS;
    }

    return NextResponse.json({
      tags: tags,
      total: tags.length
    });
  } catch (error) {
    console.error('Erro geral ao listar tags:', error);
    
    // Em caso de erro, sempre retornar as tags hardcoded
    return NextResponse.json({
      tags: HARDCODED_TAGS,
      total: HARDCODED_TAGS.length
    });
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

    try {
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
    } catch (dbError) {
      console.log('Erro ao criar tag no banco, retornando tag simulada:', dbError.message);
      
      // Retornar uma tag simulada se não conseguir criar no banco
      const simulatedTag = {
        id: slug,
        name: tagData.name,
        slug: slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      return NextResponse.json({
        message: 'Tag criada (simulada)',
        tag: simulatedTag
      });
    }

  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

