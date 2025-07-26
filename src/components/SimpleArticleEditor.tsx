'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface SimpleArticleEditorProps {
  onSave: (articleData: any) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function SimpleArticleEditor({ onSave, onCancel, loading = false }: SimpleArticleEditorProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState('');

  // Carregar categorias e tags
  useEffect(() => {
    loadCategoriesAndTags();
  }, []);

  const loadCategoriesAndTags = async () => {
    try {
      console.log('Tentando carregar categorias...');
      const [categoriesRes, tagsRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/tags')
      ]);
      
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log('Categorias encontradas no banco:', categoriesData.categories?.length || 0);
        if (categoriesData.categories && categoriesData.categories.length > 0) {
          console.log('Usando categorias do banco de dados');
          setCategories(categoriesData.categories);
        }
      }
      
      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        console.log('Tags encontradas no banco:', tagsData.tags?.length || 0);
        setTags(tagsData.tags || []);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias e tags:', error);
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

  const addTag = () => {
    if (newTag.trim()) {
      const tagSlug = newTag.toLowerCase().replace(/\s+/g, '-');
      const newTagObj: Tag = {
        id: `tag-${Date.now()}`,
        name: newTag.trim(),
        slug: tagSlug
      };
      setTags([...tags, newTagObj]);
      setSelectedTags([...selectedTags, newTagObj.id]);
      setNewTag('');
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Título e conteúdo são obrigatórios');
      return;
    }

    if (!categoryId) {
      alert('Categoria é obrigatória');
      return;
    }

    const selectedCategory = categories.find(c => c.id === categoryId);
    const articleTags = tags.filter(t => selectedTags.includes(t.id));
    
    const articleData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      categoryId: categoryId,
      tags: articleTags,
      status,
      readingTime: Math.ceil(content.split(' ').length / 200),
    };

    await onSave(articleData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Novo Artigo
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
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nova tag"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Adicionar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center space-x-1">
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
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{tag.name}</span>
                    </label>
                  ))}
                </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

