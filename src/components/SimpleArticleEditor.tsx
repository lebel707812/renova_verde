'use client';

import { useState, useEffect } from 'react';
import { categoriesAPI, tagsAPI } from '@/lib/api';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface SimpleArticleEditorProps {
  article?: any; // Artigo existente para edição
  onSave: (articleData: any) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function SimpleArticleEditor({ article, onSave, onCancel, loading = false }: SimpleArticleEditorProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '');
  const [categoryId, setCategoryId] = useState(article?.category_id || '');
  const [selectedTags, setSelectedTags] = useState<number[]>(article?.tags?.map((t: any) => t.id) || []);
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  // Carregar categorias e tags
  useEffect(() => {
    loadCategoriesAndTags();
  }, []);

  const loadCategoriesAndTags = async () => {
    try {
      const [categoriesData, tagsData] = await Promise.all([
        categoriesAPI.getAll(),
        tagsAPI.getAll()
      ]);
      
      setCategories(categoriesData);
      setTags(tagsData);
    } catch (error) {
      console.error('Erro ao carregar categorias e tags:', error);
      // Fallback para categorias hardcoded
      setCategories([
        { id: 1, name: 'Jardinagem Urbana', slug: 'jardinagem-urbana' },
        { id: 2, name: 'Energia Renovável', slug: 'energia-renovavel' },
        { id: 3, name: 'Reformas Ecológicas', slug: 'reformas-ecologicas' }
      ]);
    }
  };

  // Gerar slug automaticamente a partir do título
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Título e conteúdo são obrigatórios');
      return;
    }

    if (!categoryId) {
      alert('Categoria é obrigatória');
      return;
    }
    
    const articleData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category_id: parseInt(categoryId.toString()),
      tag_ids: selectedTags,
      status,
    };

    await onSave(articleData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {article ? 'Editar Artigo' : 'Novo Artigo'}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite o título do artigo"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="slug-do-artigo"
            />
          </div>

          {/* Resumo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resumo
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Breve descrição do artigo"
            />
          </div>

          {/* Categoria e Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag.id]);
                        } else {
                          setSelectedTags(selectedTags.filter(id => id !== tag.id));
                        }
                      }}
                      className="mr-2"
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          {/* Editor de Conteúdo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              placeholder="Digite o conteúdo do artigo aqui. Você pode usar HTML ou Markdown."
            />
            <p className="text-sm text-gray-500 mt-1">
              Suporte para HTML e Markdown. Exemplo: &lt;h2&gt;Título&lt;/h2&gt; ou ## Título
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

