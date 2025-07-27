'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Heart,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  views: number;
  likes: number;
  reading_time: number;
  category: {
    id: number;
    name: string;
    color: string;
  };
  author: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Buscar artigos
      const articlesResponse = await fetch('/api/admin/articles');
      const articlesData = await articlesResponse.json();
      setArticles(articlesData.articles || []);

      // Buscar categorias
      const categoriesResponse = await fetch('/api/admin/categories');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id));
      } else {
        alert('Erro ao excluir artigo');
      }
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      alert('Erro ao excluir artigo');
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'draft' | 'published') => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setArticles(articles.map(article => 
          article.id === id ? { ...article, status: newStatus } : article
        ));
      } else {
        alert('Erro ao atualizar status do artigo');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do artigo');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category?.id.toString() === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Artigos</h1>
        <Link href="/admin/articles/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Artigos */}
      <Card>
        <CardHeader>
          <CardTitle>Artigos ({filteredArticles.length})</CardTitle>
          <CardDescription>
            Gerencie todos os seus artigos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredArticles.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'Nenhum artigo encontrado com os filtros aplicados.'
                  : 'Nenhum artigo encontrado.'
                }
                {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
                  <Link href="/admin/articles/new" className="text-green-600 hover:underline ml-1">
                    Criar primeiro artigo
                  </Link>
                )}
              </p>
            ) : (
              filteredArticles.map((article) => (
                <div key={article.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-xl">{article.title}</h3>
                        <Badge 
                          variant={article.status === 'published' ? 'default' : 'secondary'}
                          className={article.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                      
                      {article.excerpt && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span 
                          className="px-2 py-1 rounded text-white text-xs"
                          style={{ backgroundColor: article.category?.color || '#1a3f32' }}
                        >
                          {article.category?.name}
                        </span>
                        <span>Por: {article.author?.name}</span>
                        <span>{article.reading_time} min de leitura</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views} visualizações
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {article.likes} curtidas
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.created_at)}
                        </span>
                      </div>
                      
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag.id} variant="outline" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Select 
                        value={article.status} 
                        onValueChange={(value: 'draft' | 'published') => handleStatusChange(article.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Rascunho</SelectItem>
                          <SelectItem value="published">Publicado</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

