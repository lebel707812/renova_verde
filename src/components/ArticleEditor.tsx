'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Article, Category, Tag } from '@/types';

// Importação dinâmica do ReactQuill para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import '@/styles/quill-custom.css';

interface ArticleEditorProps {
  article?: Article;
  onSave: (articleData: Partial<Article>) => Promise<void>;
  onCancel: () => void;
}

export default function ArticleEditor({ article, onSave, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '');
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage || '');
  const [categoryId, setCategoryId] = useState(article?.category.id || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(article?.tags.map(t => t.id) || []);
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status || 'draft');
  const [mode, setMode] = useState<'wysiwyg' | 'markdown'>('wysiwyg');
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar categorias e tags
  useEffect(() => {
    loadCategoriesAndTags();
  }, []);

  const loadCategoriesAndTags = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/tags')
      ]);
      
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.categories || []);
      }
      
      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        setTags(tagsData.tags || []);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias e tags:', error);
    }
  };

  // Gerar slug automaticamente a partir do título
  useEffect(() => {
    if (title && !article) {
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
  }, [title, article]);

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        throw new Error('Erro no upload');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem');
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await handleImageUpload(file);
      if (url) {
        setFeaturedImage(url);
      }
    }
  };

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

    setLoading(true);
    
    try {
      const selectedCategory = categories.find(c => c.id === categoryId);
      const articleTags = tags.filter(t => selectedTags.includes(t.id));
      
      const articleData: Partial<Article> = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        featuredImage: featuredImage || undefined,
        category: selectedCategory || categories[0],
        tags: articleTags,
        status,
        readingTime: Math.ceil(content.split(' ').length / 200), // Estimativa de tempo de leitura
      };

      await onSave(articleData);
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      alert('Erro ao salvar artigo');
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
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

          {/* Imagem destacada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem Destacada
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFeaturedImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {imageUploading ? 'Enviando...' : 'Escolher Imagem'}
              </button>
              {featuredImage && (
                <div className="flex items-center space-x-2">
                  <img src={featuredImage} alt="Preview" className="h-10 w-10 object-cover rounded" />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
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
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Conteúdo *
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setMode('wysiwyg')}
                  className={`px-3 py-1 text-sm rounded ${
                    mode === 'wysiwyg' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  WYSIWYG
                </button>
                <button
                  onClick={() => setMode('markdown')}
                  className={`px-3 py-1 text-sm rounded ${
                    mode === 'markdown' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Markdown
                </button>
              </div>
            </div>

            {mode === 'wysiwyg' ? (
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={quillModules}
                style={{ height: '400px', marginBottom: '50px' }}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm text-gray-900"
                    placeholder="Digite o conteúdo em Markdown"
                  />
                </div>
                <div className="border border-gray-300 rounded-md p-4 h-96 overflow-y-auto bg-gray-50">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="prose prose-sm max-w-none"
                  >
                    {content || '*Preview do conteúdo aparecerá aqui*'}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

