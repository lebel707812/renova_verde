
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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching articles and stats...');
      const [articlesResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/articles'),
        fetch('/api/admin/stats')
      ]);

      console.log('Articles response status:', articlesResponse.status);
      console.log('Stats response status:', statsResponse.status);

      if (!articlesResponse.ok) {
        const errorText = await articlesResponse.text();
        console.error('Articles API error response:', errorText);
        throw new Error(`Falha ao carregar artigos: ${articlesResponse.status} ${articlesResponse.statusText} - ${errorText}`);
      }

      if (!statsResponse.ok) {
        const errorText = await statsResponse.text();
        console.error('Stats API error response:', errorText);
        throw new Error(`Falha ao carregar estatísticas: ${statsResponse.status} ${statsResponse.statusText} - ${errorText}`);
      }

      const [articlesData, statsData] = await Promise.all([
        articlesResponse.json(),
        statsResponse.json()
      ]);

      console.log('Articles data:', articlesData);
      console.log('Stats data:', statsData);

      setArticles(articlesData.articles || []);
      setStats(statsData);
    } catch (error: any) {
      console.error('Erro ao carregar dados do dashboard:', error.message);
      setError(`Falha ao carregar dados: ${error.message}. Tente novamente mais tarde.`);
      toast.error('Erro ao carregar dados do dashboard');
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
        toast.success('Artigo excluído com sucesso');
      } else {
        throw new Error('Falha ao excluir artigo');
      }
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      toast.error('Erro ao excluir artigo');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString; // Fallback caso a data seja inválida
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-lg text-red-600">{error}</div>
        <Button onClick={fetchDashboardData}>Tentar novamente</Button>
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
        <StatCard 
          title="Total de Artigos"
          value={stats.totalArticles}
          description={`${stats.publishedArticles} publicados, ${stats.draftArticles} rascunhos`}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />

        <StatCard 
          title="Total de Visualizações"
          value={stats.totalViews.toLocaleString()}
          description="Visualizações em todos os artigos"
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />

        <StatCard 
          title="Total de Curtidas"
          value={stats.totalLikes.toLocaleString()}
          description="Curtidas em todos os artigos"
          icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Lista de Artigos Recentes */}
      <RecentArticles 
        articles={articles}
        onDelete={handleDeleteArticle}
        formatDate={formatDate}
      />
    </div>
  );
}

// Componente de Estatística
function StatCard({ title, value, description, icon }: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// Componente de Artigos Recentes
function RecentArticles({ articles, onDelete, formatDate }: {
  articles: Article[];
  onDelete: (id: number) => void;
  formatDate: (dateString: string) => string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artigos Recentes</CardTitle>
        <CardDescription>Gerencie seus artigos mais recentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.length === 0 ? (
            <NoArticlesMessage />
          ) : (
            articles.slice(0, 10).map((article) => (
              <ArticleItem 
                key={article.id}
                article={article}
                onDelete={onDelete}
                formatDate={formatDate}
              />
            ))
          )}
        </div>
        
        {articles.length > 10 && <ViewAllArticlesButton />}
      </CardContent>
    </Card>
  );
}

// Componente de Mensagem quando não há artigos
function NoArticlesMessage() {
  return (
    <p className="text-center text-gray-500 py-8">
      Nenhum artigo encontrado. 
      <Link href="/admin/articles/new" className="text-green-600 hover:underline ml-1">
        Criar primeiro artigo
      </Link>
    </p>
  );
}

// Componente de Item de Artigo
function ArticleItem({ article, onDelete, formatDate }: {
  article: Article;
  onDelete: (id: number) => void;
  formatDate: (dateString: string) => string;
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
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
      <ArticleActions articleId={article.id} onDelete={onDelete} />
    </div>
  );
}

// Componente de Ações do Artigo
function ArticleActions({ articleId, onDelete }: {
  articleId: number;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/articles/${articleId}/edit`}>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onDelete(articleId)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Componente do Botão "Ver Todos"
function ViewAllArticlesButton() {
  return (
    <div className="mt-6 text-center">
      <Link href="/admin/articles">
        <Button variant="outline">Ver Todos os Artigos</Button>
      </Link>
    </div>
  );
}

