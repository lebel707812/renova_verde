import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany({
      include: {
        category: true,
        author: true,
        tags: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      articles,
      total: articles.length,
      page: 1,
      per_page: 50,
    });
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '0');

  if (!id) {
    return NextResponse.json({ error: 'ID do artigo inválido' }, { status: 400 });
  }

  try {
    await prisma.article.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Artigo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir artigo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '0');

  if (!id) {
    return NextResponse.json({ error: 'ID do artigo inválido' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Erro ao atualizar status do artigo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tags, category_id, author_id, ...data } = body;

    const newArticle = await prisma.article.create({
      data: {
        ...data,
        category: category_id ? { connect: { id: category_id } } : undefined,
        author: author_id ? { connect: { id: author_id } } : undefined,
        tags: {
          connect: tags.map((tagId: number) => ({ id: tagId })),
        },
      },
      include: {
        category: true,
        author: true,
        tags: true,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar artigo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor ao criar artigo' },
      { status: 500 }
    );
  }
}


