

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Heart, Eye } from 'lucide-react';
import Header from '@/components/landing/Header';
import { getArticleBySlug, getRelatedArticles } from '@/lib/mock-data';
import { formatDate, formatRelativeDate, generateArticleStructuredData, generateBreadcrumbs } from '@/lib/utils';

// Interface simplificada e compatível
type PageProps = {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id);
  const breadcrumbs = generateBreadcrumbs(article.slug, article.title);
  const structuredData = generateArticleStructuredData({
    title: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: article.author.name,
    image: article.featuredImage
  });

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
      
      {/* Resto do seu código permanece igual */}
      <main className="min-h-screen bg-gray-50">
        {/* ... */}
      </main>
    </>
  );
}