'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import SimpleArticleEditor from '@/components/SimpleArticleEditor';
import { Article } from '@/types';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/painel-renova-verde');
      return;
    }
    loadArticle();
  }, [router, params.id]);

  const loadArticle = async () => {
    try {
      const response = await fetch(`/api/admin/articles/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
      } else {
        router.push('/admin/articles');
      }
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
      router.push('/admin/articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (articleData: Partial<Article>) => {
    try {
      const response = await fetch(`/api/admin/articles/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(articleData)
      });

      if (response.ok) {
        router.push('/admin/articles');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar artigo');
      }
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.push('/admin/articles');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Artigo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleArticleEditor
        article={article}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

