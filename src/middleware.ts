import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Verificar se é uma rota administrativa
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Verificar se há token no header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Se não há token, redirecionar para login
      return NextResponse.redirect(new URL('/painel-renova-verde', request.url));
    }

    const token = authHeader.substring(7);
    
    try {
      const user = verifyToken(token);
      if (!user) {
        // Token inválido, redirecionar para login
        return NextResponse.redirect(new URL('/painel-renova-verde', request.url));
      }
    } catch (error) {
      // Erro na verificação do token, redirecionar para login
      return NextResponse.redirect(new URL('/painel-renova-verde', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};

