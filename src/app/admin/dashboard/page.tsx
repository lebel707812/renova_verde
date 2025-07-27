'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Eye, 
  Heart, 
  TrendingUp,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  views: number;
  likes: number;
  category: {
    id: number;
    name: string;
    color: string;
  };
  author: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  totalLikes: number;
  totalAuthors: number;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    totalAuthors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Buscar artigos
      const articlesResponse = await fetch('/api/admin/articles');
      const articlesData = await articlesResponse.json();
      setArticles(articlesData.articles || []);

      // Buscar estatísticas
      const statsResponse = await fetch('/api/admin/stats');
      const statsData = await statsResponse.json();
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <Link href="/admin/articles/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Artigos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedArticles} publicados, {stats.draftArticles} rascunhos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Visualizações em todos os artigos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Curtidas</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Curtidas em todos os artigos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Artigos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Artigos Recentes</CardTitle>
          <CardDescription>
            Gerencie seus artigos mais recentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {articles.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Nenhum artigo encontrado. 
                <Link href="/admin/articles/new" className="text-green-600 hover:underline ml-1">
                  Criar primeiro artigo
                </Link>
              </p>
            ) : (
              articles.slice(0, 10).map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{article.title}</h3>
                      <Badge 
                        variant={article.status === 'published' ? 'default' : 'secondary'}
                        className={article.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Categoria: {article.category?.name}</span>
                      <span>Autor: {article.author?.name}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {article.likes}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Criado em {formatDate(article.created_at)} • 
                      Atualizado em {formatDate(article.updated_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
              ))
            )}
          </div>
          
          {articles.length > 10 && (
            <div className="mt-6 text-center">
              <Link href="/admin/articles">
                <Button variant="outline">
                  Ver Todos os Artigos
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

