import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Autores hardcoded como fallback
const hardcodedAuthors = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@renovaverde.com',
    bio: 'Especialista em sustentabilidade e jardinagem urbana'
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@renovaverde.com',
    bio: 'Engenheiro especializado em energia renovável'
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana@renovaverde.com',
    bio: 'Arquiteta sustentável e consultora ambiental'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Tentar buscar do banco de dados primeiro
    const authors = await prisma.author.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    // Se não houver autores no banco, usar hardcoded
    const finalAuthors = authors.length > 0 ? authors : hardcodedAuthors;

    return NextResponse.json({
      authors: finalAuthors,
      total: finalAuthors.length
    });
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    // Em caso de erro, usar fallback
    return NextResponse.json({
      authors: hardcodedAuthors,
      total: hardcodedAuthors.length
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, bio } = body;

    const newAuthor = await prisma.author.create({
      data: {
        name,
        email,
        bio: bio || null
      }
    });

    return NextResponse.json(newAuthor, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar autor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

