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
  
  const user = verifyToken(token);
  return user !== null;
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('admin_token');
  if (!token) return null;
  
  return verifyToken(token);
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    window.location.href = '/';
  }
}

