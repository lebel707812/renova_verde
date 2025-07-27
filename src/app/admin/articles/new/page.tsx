'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Save,
  Eye,
  ArrowLeft,
  Upload,
  X,
  Plus
} from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface ArticleForm {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  category_id: number | null;
  author_id: number | null;
  reading_time: number;
  tags: number[];
}

export default function NewArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [newTagName, setNewTagName] = useState('');
  
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    status: 'draft',
    category_id: null,
    author_id: null,
    reading_time: 5,
    tags: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Auto-gerar slug baseado no título
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  useEffect(() => {
    // Calcular tempo de leitura baseado no conteúdo
    if (formData.content) {
      const words = formData.content.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / 200)); // 200 palavras por minuto
      setFormData(prev => ({ ...prev, reading_time: readingTime }));
    }
  }, [formData.content]);

  const fetchData = async () => {
    try {
      // Buscar categorias
      const categoriesResponse = await fetch('/api/admin/categories');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData.categories || []);

      // Buscar autores
      const authorsResponse = await fetch('/api/admin/authors');
      const authorsData = await authorsResponse.json();
      setAuthors(authorsData.authors || []);

      // Buscar tags
      const tagsResponse = await fetch('/api/admin/tags');
      const tagsData = await tagsResponse.json();
      setTags(tagsData.tags || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleInputChange = (field: keyof ArticleForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const response = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTagName.trim() }),
      });

      if (response.ok) {
        const newTag = await response.json();
        setTags(prev => [...prev, newTag]);
        setSelectedTags(prev => [...prev, newTag.id]);
        setNewTagName('');
      }
    } catch (error) {
      console.error('Erro ao criar tag:', error);
    }
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleInputChange('featured_image', data.url);
      } else {
        alert('Erro ao fazer upload da imagem');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem');
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content || !formData.category_id || !formData.author_id) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status,
          tags: selectedTags
        }),
      });

      if (response.ok) {
        const article = await response.json();
        router.push('/admin/articles');
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao criar artigo');
      }
    } catch (error) {
      console.error('Erro ao criar artigo:', error);
      alert('Erro ao criar artigo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/articles">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Novo Artigo</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Digite o título do artigo"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-do-artigo"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Breve descrição do artigo"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="content">Conteúdo do Artigo *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Escreva o conteúdo do artigo aqui..."
                  rows={20}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tempo de leitura estimado: {formData.reading_time} minutos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ações */}
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => handleSubmit('draft')}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Rascunho
              </Button>
              <Button 
                onClick={() => handleSubmit('published')}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                Publicar
              </Button>
            </CardContent>
          </Card>

          {/* Imagem Destacada */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem Destacada</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featured_image ? (
                <div className="space-y-3">
                  <img 
                    src={formData.featured_image} 
                    alt="Imagem destacada" 
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleInputChange('featured_image', '')}
                    className="w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Clique para fazer upload</p>
                    </div>
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Categoria *</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.category_id?.toString() || ''} 
                onValueChange={(value) => handleInputChange('category_id', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Autor */}
          <Card>
            <CardHeader>
              <CardTitle>Autor *</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.author_id?.toString() || ''} 
                onValueChange={(value) => handleInputChange('author_id', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um autor" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id.toString()}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Nova tag"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

