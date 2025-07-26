import { NextRequest, NextResponse } from 'next/server';
import { Tag } from '@/types';

// Mock data para tags
let tags: Tag[] = [
  { id: 'jardim-vertical', name: 'Jardim Vertical', slug: 'jardim-vertical' },
  { id: 'plantas', name: 'Plantas', slug: 'plantas' },
  { id: 'diy', name: 'Faça Você Mesmo', slug: 'diy' },
  { id: 'energia-solar', name: 'Energia Solar', slug: 'energia-solar' },
  { id: 'compostagem', name: 'Compostagem', slug: 'compostagem' },
  { id: 'reciclagem', name: 'Reciclagem', slug: 'reciclagem' },
  { id: 'sustentabilidade', name: 'Sustentabilidade', slug: 'sustentabilidade' },
  { id: 'economia-energia', name: 'Economia de Energia', slug: 'economia-energia' },
  { id: 'agua', name: 'Água', slug: 'agua' },
  { id: 'materiais-ecologicos', name: 'Materiais Ecológicos', slug: 'materiais-ecologicos' }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      tags,
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

