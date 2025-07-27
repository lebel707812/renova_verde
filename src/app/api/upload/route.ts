import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo foi enviado' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Criar nome único para o arquivo
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', fileName);

    // Salvar o arquivo
    await writeFile(path, buffer);

    // Retornar a URL do arquivo
    const url = `/uploads/${fileName}`;
    
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

