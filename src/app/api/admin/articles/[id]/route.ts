import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        tags: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const { tags, category_id, author_id, ...data } = body;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        ...data,
        category: category_id ? { connect: { id: category_id } } : undefined,
        author: author_id ? { connect: { id: author_id } } : undefined,
        tags: {
          set: tags.map((tagId: number) => ({ id: tagId })),
        },
      },
      include: {
        category: true,
        author: true,
        tags: true,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao atualizar artigo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    await prisma.article.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Artigo excluído com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao excluir artigo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}


