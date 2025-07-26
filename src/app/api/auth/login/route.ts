import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Credenciais hardcoded para o admin
const ADMIN_EMAIL = 'admin@renovaverde.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('637664asdf', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'renova-verde-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Verificar se as credenciais estão corretas
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        email: ADMIN_EMAIL,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        email: ADMIN_EMAIL,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

