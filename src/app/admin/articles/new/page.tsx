'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import ArticleEditor from '@/components/ArticleEditor';
import { Article } from '@/types';

export default function NewArticlePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/painel-renova-verde');
    }
  }, [router]);

  const handleSave = async (articleData: Partial<Article>) => {
    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(articleData)
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/admin/articles');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao criar artigo');
      }
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.push('/admin/articles');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleEditor
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

