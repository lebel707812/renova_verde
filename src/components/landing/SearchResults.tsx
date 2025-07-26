'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag as TagIcon, Search, Filter } from 'lucide-react';

import { searchArticles, mockCategories, mockTags } from '@/lib/mock-data';
import { formatRelativeDate } from '@/lib/utils';
import { Article } from '@/types';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    
    // Simular delay de busca
    const searchTimeout = setTimeout(() => {
      let filteredResults = searchArticles(query);
      
      // Filtrar por categoria se selecionada
      if (selectedCategory) {
        filteredResults = filteredResults.filter(
          article => article.category.slug === selectedCategory
        );
      }
      
      // Filtrar por tag se selecionada
      if (selectedTag) {
        filteredResults = filteredResults.filter(
          article => article.tags.some(tag => tag.slug === selectedTag)
        );
      }
      
      setResults(filteredResults);
      setLoading(false);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query, selectedCategory, selectedTag]);

  if (loading) {
    return <SearchResultsSkeleton />;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Summary */}
        <div className="mb-8">
          {query ? (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Resultados para "{query}"
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Todos os Artigos
            </h2>
          )}
          <p className="text-gray-600">
            {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {mockCategories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas as tags</option>
                {mockTags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedTag) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedTag('');
                }}
                className="text-primary hover:text-primary-700 text-sm font-medium"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Featured Image */}
                {article.featuredImage && (
                  <Link href={`/blog/${article.slug}`} className="block">
                    <div className="relative aspect-video">
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                )}

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <Link
                      href={`/categoria/${article.category.slug}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors"
                      style={{ 
                        backgroundColor: `${article.category.color}20`,
                        color: article.category.color 
                      }}
                    >
                      <span className="mr-1">{article.category.icon}</span>
                      {article.category.name}
                    </Link>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link 
                      href={`/blog/${article.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{article.readingTime} min</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatRelativeDate(article.publishedAt)}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tag/${tag.slug}`}
                        className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs hover:bg-gray-200 transition-colors"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag.name}
                      </Link>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{article.tags.length - 3} mais
                      </span>
                    )}
                  </div>

                  {/* Read More Button */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-primary font-semibold hover:text-primary-700 transition-colors"
                  >
                    Ler artigo completo
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {query 
                ? `Não encontramos artigos para "${query}". Tente usar outras palavras-chave ou remova os filtros.`
                : 'Não há artigos disponíveis no momento.'
              }
            </p>
            <div className="space-y-4">
              <Link
                href="/blog"
                className="inline-block bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ver Todos os Artigos
              </Link>
              {(selectedCategory || selectedTag) && (
                <div>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedTag('');
                    }}
                    className="text-primary hover:text-primary-700 font-medium"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Skeleton loading component
function SearchResultsSkeleton() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-8"></div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

