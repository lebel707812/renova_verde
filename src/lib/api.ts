const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Função para obter o token do localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Função para fazer requisições autenticadas
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  verify: async () => {
    return apiRequest('/auth/verify');
  },
};

// Articles API
export const articlesAPI = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    category_id?: number;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return apiRequest(`/articles${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return apiRequest(`/articles/${id}`);
  },

  getBySlug: async (slug: string) => {
    return apiRequest(`/articles/slug/${slug}`);
  },

  create: async (articleData: any) => {
    return apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  },

  update: async (id: number, articleData: any) => {
    return apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  },

  delete: async (id: number) => {
    return apiRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    return apiRequest('/categories');
  },
};

// Tags API
export const tagsAPI = {
  getAll: async () => {
    return apiRequest('/tags');
  },
};

// Authors API
export const authorsAPI = {
  getAll: async () => {
    return apiRequest('/authors');
  },
};

export default {
  auth: authAPI,
  articles: articlesAPI,
  categories: categoriesAPI,
  tags: tagsAPI,
  authors: authorsAPI,
};

