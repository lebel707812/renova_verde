import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, User, Tag as TagIcon } from 'lucide-react';

import Header from '@/components/landing/Header';
import { mockArticles, mockCategories, mockTags } from '@/lib/mock-data';
import { formatDate, formatRelativeDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog - Renova Verde Hub | Artigos sobre Sustentabilidade',
  description: 'Descubra artigos sobre jardinagem urbana, energia solar, reformas ecológicas e sustentabilidade. Conteúdo prático para transformar sua casa.',
  keywords: ['blog sustentabilidade', 'jardinagem urbana', 'energia solar', 'reformas ecológicas', 'casa sustentável'],
  openGraph: {
    title: 'Blog - Renova Verde Hub | Artigos sobre Sustentabilidade',
    description: 'Descubra artigos sobre jardinagem urbana, energia solar, reformas ecológicas e sustentabilidade. Conteúdo prático para transformar sua casa.',
    type: 'website',
    siteName: 'Renova Verde Hub',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const articles = mockArticles;
  const categories = mockCategories;
  const tags = mockTags;

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Blog Sustentável
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Descubra dicas práticas, projetos inspiradores e guias completos sobre 
                sustentabilidade, jardinagem urbana e energia renovável
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar artigos..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-700 transition-colors"
              >
                Todos os Artigos
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-medium text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-primary hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Carregar Mais Artigos
              </button>
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Tags Populares
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors"
                >
                  <TagIcon className="w-4 h-4 mr-2" />
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-primary text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Não Perca Nenhum Artigo
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Receba nossos melhores conteúdos sobre sustentabilidade diretamente no seu email
            </p>
            <Link
              href="#newsletter"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Inscrever-se na Newsletter
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

