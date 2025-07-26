import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag as TagIcon, ArrowLeft } from 'lucide-react';

import Header from '@/components/landing/Header';
import { getArticlesByCategory, mockCategories } from '@/lib/mock-data';
import { formatRelativeDate } from '@/lib/utils';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Função para gerar metadata dinâmica
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = mockCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Categoria não encontrada',
      description: 'A categoria solicitada não foi encontrada.'
    };
  }

  return {
    title: `${category.name} - Renova Verde Hub | Artigos sobre ${category.name}`,
    description: category.description || `Descubra artigos sobre ${category.name.toLowerCase()} e sustentabilidade. Dicas práticas e projetos inspiradores.`,
    keywords: [category.name.toLowerCase(), 'sustentabilidade', 'casa ecológica', 'meio ambiente'],
    openGraph: {
      title: `${category.name} - Renova Verde Hub`,
      description: category.description || `Artigos sobre ${category.name.toLowerCase()} e sustentabilidade`,
      type: 'website',
      siteName: 'Renova Verde Hub',
    },
    alternates: {
      canonical: `/categoria/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(params.slug);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-primary hover:text-primary-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="text-primary hover:text-primary-700 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-500">{category.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Category Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary hover:text-primary-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o blog
            </Link>

            <div className="text-center">
              {/* Category Icon */}
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-6"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>

              {/* Category Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>

              {/* Category Description */}
              {category.description && (
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  {category.description}
                </p>
              )}

              {/* Articles Count */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm">
                {articles.length} {articles.length === 1 ? 'artigo' : 'artigos'}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
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
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${category.color}20`,
                            color: category.color 
                          }}
                        >
                          <span className="mr-1">{category.icon}</span>
                          {category.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link 
                          href={`/blog/${article.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h2>

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
                <div 
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full text-5xl mb-6"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Nenhum artigo encontrado
                </h2>
                <p className="text-gray-600 mb-8">
                  Ainda não temos artigos nesta categoria, mas em breve teremos conteúdo incrível sobre {category.name.toLowerCase()}.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Ver Todos os Artigos
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Outras Categorias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories
                .filter(cat => cat.slug !== params.slug)
                .map((otherCategory) => (
                  <Link
                    key={otherCategory.id}
                    href={`/categoria/${otherCategory.slug}`}
                    className="group block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl mb-4"
                      style={{ backgroundColor: `${otherCategory.color}20` }}
                    >
                      {otherCategory.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {otherCategory.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {otherCategory.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

