import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Em uma aplicação real, você removeria do banco de dados
    // Por enquanto, apenas simulamos o sucesso
    console.log(`Simulando exclusão do artigo ID: ${id}`);
    
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

