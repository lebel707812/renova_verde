'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleArticleEditor from '@/components/SimpleArticleEditor';
import { articlesAPI } from '@/lib/api';

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (articleData: any) => {
    setLoading(true);
    try {
      await articlesAPI.create(articleData);
      alert('Artigo criado com sucesso!');
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Erro ao salvar artigo:', error);
      alert(`Erro ao criar artigo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleArticleEditor 
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}

