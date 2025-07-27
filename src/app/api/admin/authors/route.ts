import { NextRequest, NextResponse } from 'next/server';

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
    return NextResponse.json({
      authors: hardcodedAuthors,
      total: hardcodedAuthors.length
    });
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, bio } = body;

    // Simular criação de novo autor
    const newAuthor = {
      id: hardcodedAuthors.length + 1,
      name,
      email,
      bio: bio || ''
    };

    return NextResponse.json(newAuthor, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar autor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

