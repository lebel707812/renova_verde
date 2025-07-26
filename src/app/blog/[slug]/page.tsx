import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Heart, Eye } from 'lucide-react';

import Header from '@/components/landing/Header';
import { getArticleBySlug, getRelatedArticles } from '@/lib/mock-data';
import { formatDate, formatRelativeDate, generateArticleStructuredData, generateBreadcrumbs } from '@/lib/utils';
import { Article } from '@/types';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Função para gerar metadata dinâmica
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não foi encontrado.'
    };
  }

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: article.featuredImage ? [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : [],
      siteName: 'Renova Verde Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo.title,
      description: article.seo.description,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id);
  const breadcrumbs = generateBreadcrumbs(article);
  const structuredData = generateArticleStructuredData(article);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center">
                  {index > 0 && (
                    <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-500 truncate max-w-xs">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="text-primary hover:text-primary-700 transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Article Header */}
        <article className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary hover:text-primary-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o blog
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{article.author.name}</p>
                  <p className="text-sm text-gray-500">Autor</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{formatDate(article.publishedAt)}</span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{article.readingTime} min de leitura</span>
              </div>

              {/* Views */}
              <div className="flex items-center text-gray-500">
                <Eye className="w-4 h-4 mr-2" />
                <span className="text-sm">{article.views} visualizações</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 ml-auto">
                <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm">{article.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4 mr-1" />
                  <span className="text-sm">Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
                className="text-gray-800 leading-relaxed"
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.author.name}</h3>
                    <p className="text-gray-600 mb-4">{article.author.bio}</p>
                    {article.author.social && (
                      <div className="flex gap-4">
                        {article.author.social.website && (
                          <a 
                            href={article.author.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-700 text-sm"
                          >
                            Website
                          </a>
                        )}
                        {article.author.social.twitter && (
                          <a 
                            href={`https://twitter.com/${article.author.social.twitter.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-700 text-sm"
                          >
                            Twitter
                          </a>
                        )}
                        {article.author.social.linkedin && (
                          <a 
                            href={`https://linkedin.com/in/${article.author.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-700 text-sm"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/blog/${relatedArticle.slug}`}
                    className="group block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {relatedArticle.featuredImage && (
                      <div className="relative aspect-video">
                        <Image
                          src={relatedArticle.featuredImage}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="mb-2">
                        <span 
                          className="inline-block px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `${relatedArticle.category.color}20`,
                            color: relatedArticle.category.color 
                          }}
                        >
                          {relatedArticle.category.name}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedArticle.readingTime} min
                        <span className="mx-2">•</span>
                        {formatRelativeDate(relatedArticle.publishedAt)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

