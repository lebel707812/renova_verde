'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleArticleEditor from '@/components/SimpleArticleEditor';

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (articleData: any) => {
    setLoading(true);
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
        alert('Artigo criado com sucesso!');
        router.push('/admin/dashboard');
      } else {
        const error = await response.json();
        alert(`Erro ao criar artigo: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      alert('Erro ao salvar artigo');
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

