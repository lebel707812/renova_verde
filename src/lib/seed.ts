import { prisma } from './prisma';
import { mockAuthors, mockCategories, mockTags, mockArticles } from './mock-data';

export async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Limpar dados existentes
    await prisma.articleTag.deleteMany();
    await prisma.article.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.category.deleteMany();
    await prisma.author.deleteMany();

    // Criar autores
    console.log('👤 Criando autores...');
    const authors = await Promise.all(
      mockAuthors.map(author =>
        prisma.author.create({
          data: {
            id: author.id,
            name: author.name,
            bio: author.bio,
            avatar: author.avatar,
            twitter: author.social?.twitter,
            linkedin: author.social?.linkedin,
            website: author.social?.website,
          },
        })
      )
    );

    // Criar categorias
    console.log('📂 Criando categorias...');
    const categories = await Promise.all(
      mockCategories.map(category =>
        prisma.category.create({
          data: {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            color: category.color,
            icon: category.icon,
          },
        })
      )
    );

    // Criar tags
    console.log('🏷️ Criando tags...');
    const tags = await Promise.all(
      mockTags.map(tag =>
        prisma.tag.create({
          data: {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
          },
        })
      )
    );

    // Criar artigos
    console.log('📝 Criando artigos...');
    for (const mockArticle of mockArticles) {
      const article = await prisma.article.create({
        data: {
          id: mockArticle.id,
          title: mockArticle.title,
          slug: mockArticle.slug,
          excerpt: mockArticle.excerpt,
          content: mockArticle.content,
          featuredImage: mockArticle.featuredImage,
          readingTime: mockArticle.readingTime,
          views: mockArticle.views || 0,
          likes: mockArticle.likes || 0,
          status: mockArticle.status === 'published' ? 'PUBLISHED' : 'DRAFT',
          seoTitle: mockArticle.seo.title,
          seoDescription: mockArticle.seo.description,
          seoKeywords: Array.isArray(mockArticle.seo.keywords) ? mockArticle.seo.keywords.join(', ') : mockArticle.seo.keywords || '',
          ogImage: mockArticle.seo.ogImage,
          canonicalUrl: mockArticle.seo.canonicalUrl,
          noIndex: mockArticle.seo.noIndex || false,
          authorId: mockArticle.author.id,
          categoryId: mockArticle.category.id,
          publishedAt: mockArticle.status === 'published' ? new Date(mockArticle.publishedAt) : null,
        },
      });

      // Criar relações com tags
      if (mockArticle.tags && mockArticle.tags.length > 0) {
        await Promise.all(
          mockArticle.tags.map(tag =>
            prisma.articleTag.create({
              data: {
                articleId: article.id,
                tagId: tag.id,
              },
            })
          )
        );
      }
    }

    console.log('✅ Seed concluído com sucesso!');
    console.log(`📊 Criados: ${authors.length} autores, ${categories.length} categorias, ${tags.length} tags, ${mockArticles.length} artigos`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

// Executar seed se chamado diretamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seed executado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erro no seed:', error);
      process.exit(1);
    });
}

