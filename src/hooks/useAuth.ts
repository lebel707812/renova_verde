import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (token) {
      try {
        // Verificar se o token é válido decodificando-o
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp > currentTime) {
          // Token válido e não expirado
          setIsAuthenticated(true);
        } else {
          // Token expirado
          localStorage.removeItem('admin_token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Token inválido
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    router.push('/painel-renova-verde');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    getAuthHeaders
  };
}

