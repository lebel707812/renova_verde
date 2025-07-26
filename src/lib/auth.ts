import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'renova-verde-secret-key-2024';

export interface AuthUser {
  email: string;
  role: string;
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('admin_token');
  if (!token) return false;
  
  try {
    // Verificar se o token é válido decodificando-o
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp > currentTime) {
      // Token válido e não expirado
      return true;
    } else {
      // Token expirado
      localStorage.removeItem('admin_token');
      return false;
    }
  } catch (error) {
    // Token inválido
    localStorage.removeItem('admin_token');
    return false;
  }
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('admin_token');
  if (!token) return null;
  
  try {
    // Verificar se o token é válido decodificando-o
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp > currentTime) {
      // Token válido e não expirado
      return {
        email: payload.email,
        role: payload.role
      };
    } else {
      // Token expirado
      localStorage.removeItem('admin_token');
      return null;
    }
  } catch (error) {
    // Token inválido
    localStorage.removeItem('admin_token');
    return null;
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    window.location.href = '/';
  }
}

