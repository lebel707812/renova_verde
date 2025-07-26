// Tipos para o sistema de artigos e CMS

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: SEOData;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  likes?: number;
}

export interface ArticleListResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SearchResult {
  articles: Article[];
  categories: Category[];
  tags: Tag[];
  total: number;
  query: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: Category;
  publishedAt: string;
  readingTime: number;
}

