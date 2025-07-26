// Dados centralizados dos artigos - integração entre mock-data e admin
import { Article, Category, Tag, Author } from '@/types';
import { mockArticles, mockCategories, mockTags, mockAuthors } from './mock-data';

// Classe para gerenciar os dados dos artigos
class ArticlesDataManager {
  private articles: Article[] = [...mockArticles];
  private categories: Category[] = [...mockCategories];
  private tags: Tag[] = [...mockTags];
  private authors: Author[] = [...mockAuthors];

  // Métodos para artigos
  getAllArticles(): Article[] {
    return this.articles;
  }

  getArticleById(id: string): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.articles.find(article => article.slug === slug);
  }

  addArticle(article: Article): void {
    this.articles.push(article);
  }

  updateArticle(id: string, updatedArticle: Partial<Article>): boolean {
    const index = this.articles.findIndex(article => article.id === id);
    if (index === -1) return false;

    this.articles[index] = { ...this.articles[index], ...updatedArticle };
    return true;
  }

  deleteArticle(id: string): boolean {
    const index = this.articles.findIndex(article => article.id === id);
    if (index === -1) return false;

    this.articles.splice(index, 1);
    return true;
  }

  // Métodos para categorias
  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(category => category.id === id);
  }

  // Métodos para tags
  getAllTags(): Tag[] {
    return this.tags;
  }

  addTag(tag: Tag): void {
    if (!this.tags.find(t => t.id === tag.id)) {
      this.tags.push(tag);
    }
  }

  // Métodos para autores
  getAllAuthors(): Author[] {
    return this.authors;
  }

  getAuthorById(id: string): Author | undefined {
    return this.authors.find(author => author.id === id);
  }

  // Métodos de busca
  searchArticles(query: string): Article[] {
    if (!query) return this.articles;
    
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
    );
  }

  getArticlesByCategory(categorySlug: string): Article[] {
    return this.articles.filter(article => article.category.slug === categorySlug);
  }

  getRelatedArticles(articleId: string, limit: number = 3): Article[] {
    const currentArticle = this.articles.find(article => article.id === articleId);
    if (!currentArticle) return [];
    
    return this.articles
      .filter(article => 
        article.id !== articleId && 
        (article.category.id === currentArticle.category.id ||
         article.tags.some(tag => currentArticle.tags.some(currentTag => currentTag.id === tag.id)))
      )
      .slice(0, limit);
  }
}

// Instância singleton para gerenciar os dados
export const articlesDataManager = new ArticlesDataManager();

// Funções de conveniência para manter compatibilidade
export const getAllArticles = () => articlesDataManager.getAllArticles();
export const getArticleBySlug = (slug: string) => articlesDataManager.getArticleBySlug(slug);
export const getArticlesByCategory = (categorySlug: string) => articlesDataManager.getArticlesByCategory(categorySlug);
export const getRelatedArticles = (articleId: string, limit?: number) => articlesDataManager.getRelatedArticles(articleId, limit);
export const searchArticles = (query: string) => articlesDataManager.searchArticles(query);

// Exportar dados para compatibilidade
export { mockArticles, mockCategories, mockTags, mockAuthors };

