import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Por enquanto, permitir acesso a todas as rotas admin
  // A verificação de autenticação será feita no lado do cliente
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};

